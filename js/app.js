/* =========================================================================
   app.js —— 主控制器
   多维筛选（层次 / 类型 / 特色群 / 地区，跨维 AND、同维 OR）+ 分面计数
   + 搜索 + 排序 + 院校卡片 + 详情抽屉 + 与地图实时联动。
   ========================================================================= */
(function () {
  const U = window.UNIVERSITIES;
  const M = window.META;
  const UU = window.UU;
  const $ = (s, r = document) => r.querySelector(s);

  // 校徽 + 英文简写
  const LOGOS = window.LOGOS || {};
  const enAbbr = (u) => {
    let s = u.enAbbr || (LOGOS[u.id] && LOGOS[u.id].en) || '';
    if (/\s/.test(s)) s = u.enAbbr || '';     // 含空格 = 全名而非缩写，忽略
    return s.toUpperCase();                    // 英文简称统一大写
  };
  function logoHTML(u, cls) {
    const L = LOGOS[u.id];
    if (L) return `<img class="logo ${cls}" src="assets/${L.dir || 'logos'}/${encodeURIComponent(L.f)}" alt="${u.name}校徽" loading="lazy" decoding="async">`;
    const t = (u.abbr || u.name).replace(/[（(][^）)]*[）)]/g, '').slice(0, 3);   // 无徽标 → 中文字徽兜底
    return `<span class="logo ${cls} mono" style="--mono:${UU.levelColor(u)}">${t}</span>`;
  }
  const groupColor = Object.fromEntries(M.groups.map(g => [g.key, g.color]));   // 特色群标签配色

  /* ---------------- 状态 ---------------- */
  const state = {
    levels: new Set(), types: new Set(), groups: new Set(), regions: new Set(),
    q: '', sort: 'tier', mapMode: 'bubble', linkMap: true,
  };

  /* ---------------- 工具 ---------------- */
  const hasAny = (arr, set) => { for (const x of arr) if (set.has(x)) return true; return false; };
  function regionOf(prov) {
    for (const r in M.regions) if (M.regions[r].includes(prov)) return r;
    return '其他';
  }
  function matchQ(u, q) {
    const hay = [u.name, u.abbr, u.en, u.city, u.province, u.type,
      ...(u.tags || []), ...(u.firstClass || []), ...(u.aplus || [])].join(' ').toLowerCase();
    return hay.includes(q);
  }
  // 应用除某一维度外的所有筛选（用于分面计数）；except=null 时为全量筛选
  function passExcept(u, except) {
    if (except !== 'levels' && state.levels.size && !hasAny(u.tags, state.levels)) return false;
    if (except !== 'types' && state.types.size && !state.types.has(u.type)) return false;
    if (except !== 'groups' && state.groups.size && !hasAny(u.tags, state.groups)) return false;
    if (except !== 'regions' && state.regions.size && !state.regions.has(regionOf(u.province))) return false;
    if (state.q && !matchQ(u, state.q)) return false;
    return true;
  }
  const passAll = (u) => passExcept(u, null);

  function sortList(list) {
    const byScore = (k) => (a, b) => {
      const av = a.score && a.score[k] ? a.score[k].min : -1;
      const bv = b.score && b.score[k] ? b.score[k].min : -1;
      return bv - av;
    };
    const cmp = {
      tier: (a, b) => (a.tier - b.tier) ||
        ((b.score?.wl?.min || 0) - (a.score?.wl?.min || 0)) || a.id.localeCompare(b.id),
      scoreWl: byScore('wl'),
      scoreLs: byScore('ls'),
      founded: (a, b) => a.founded - b.founded || a.id.localeCompare(b.id),
      name: (a, b) => a.id.localeCompare(b.id),
    }[state.sort] || (() => 0);
    return list.slice().sort(cmp);
  }

  /* ---------------- 维度定义（驱动筛选 UI） ---------------- */
  const DIMS = [
    { key: 'levels', title: '层次', opts: M.levels.map(l => ({ k: l.key, name: l.name, color: l.color,
        test: u => u.tags.includes(l.key) })) },
    { key: 'types', title: '院校类型', opts: M.types.map(t => ({ k: t.key, name: t.name, color: t.color,
        test: u => u.type === t.key })) },
    { key: 'groups', title: '特色院校群', opts: M.groups.map(g => ({ k: g.key, name: g.name, color: g.color,
        test: u => u.tags.includes(g.key) })) },
    { key: 'regions', title: '所在地区', opts: Object.keys(M.regions).map(r => ({ k: r, name: r, color: '#64748b',
        test: u => regionOf(u.province) === r })) },
  ];
  const dimOf = (key) => DIMS.find(d => d.key === key);

  /* ---------------- 渲染：筛选侧栏 ---------------- */
  function renderFilters() {
    const html = DIMS.map(dim => {
      const opts = dim.opts.map(o => {
        const cnt = U.filter(u => passExcept(u, dim.key) && o.test(u)).length;
        const on = state[dim.key].has(o.k);
        const disabled = cnt === 0 && !on;
        return `<button class="opt ${on ? 'is-on' : ''}" data-dim="${dim.key}" data-k="${o.k}"
                  type="button" ${disabled ? 'style="opacity:.4;pointer-events:none"' : ''}>
                  <i class="dot" style="background:${o.color}"></i>${o.name}<span class="cnt">${cnt}</span>
                </button>`;
      }).join('');
      return `<div class="filter-group"><h4>${dim.title}</h4><div class="opt-list">${opts}</div></div>`;
    }).join('');
    $('#filterGroups').innerHTML = html;
  }

  /* ---------------- 渲染：层次快捷 chips ---------------- */
  function renderChips() {
    $('#quickChips').innerHTML = M.levels.map(l =>
      `<button class="chip ${state.levels.has(l.key) ? 'is-on' : ''}" data-dim="levels" data-k="${l.key}" type="button">
         <span class="dot" style="background:${l.color}"></span>${l.name}</button>`).join('');
  }

  /* ---------------- 渲染：已选标签 ---------------- */
  function renderActiveTags() {
    const tags = [];
    DIMS.forEach(dim => state[dim.key].forEach(k => {
      const o = dim.opts.find(x => x.k === k);
      tags.push({ dim: dim.key, k, name: o ? o.name : k });
    }));
    $('#activeTags').innerHTML = tags.map(t =>
      `<span class="atag">${t.name}<button data-dim="${t.dim}" data-k="${t.k}" aria-label="移除">×</button></span>`).join('');
  }

  /* ---------------- 渲染：院校卡片 ---------------- */
  function scoreBox(label, s) {
    if (!s) return `<div class="score-box na"><div class="lab">${label}</div><div class="val">—</div></div>`;
    return `<div class="score-box"><div class="lab">${label}</div>
              <div class="val">${s.min}<small> / 位次约${fmtRank(s.rank)}</small></div></div>`;
  }
  function fmtRank(r) { return r >= 10000 ? (r / 10000).toFixed(r % 10000 ? 1 : 0) + '万' : r; }

  function cardHTML(u) {
    const accent = UU.levelColor(u);
    const badge = UU.topLevel(u);
    const typeMeta = M.types.find(t => t.key === u.type);
    const ea = enAbbr(u);
    const tagChips = [
      ea ? `<span class="tg abbr">${ea}</span>` : '',
      `<span class="tg" style="background:${typeMeta ? typeMeta.color : '#888'}">${u.type}类</span>`,
      ...u.tags.filter(t => groupColor[t])
        .map(t => `<span class="tg" style="background:${groupColor[t]}">${t}</span>`),
    ].filter(Boolean).slice(0, 5).join('');
    return `<article class="uni-card" style="--accent:${accent}" data-id="${u.id}" tabindex="0">
      <div class="uc-top">
        ${logoHTML(u, 'uc-logo')}
        <div class="uc-titles">
          <div class="uc-name">${u.name}</div>
          <div class="uc-en">${u.en}</div>
        </div>
        <span class="uc-rank" style="background:${accent}">${badge}</span>
      </div>
      <div class="uc-meta">
        <span>📍 ${u.province}·${u.city}</span>
        <span>🏛 ${u.admin}</span>
        <span>📅 ${u.founded}</span>
      </div>
      <div class="uc-tags">${tagChips}</div>
      <div class="uc-score">
        ${scoreBox('物理类 · 2025渝', u.score && u.score.wl)}
        ${scoreBox('历史类 · 2025渝', u.score && u.score.ls)}
      </div>
    </article>`;
  }

  function renderCards(list) {
    const grid = $('#cardGrid');
    grid.innerHTML = list.map(cardHTML).join('');
    $('#emptyState').hidden = list.length > 0;
    $('#resultsCount').innerHTML = `共 <b>${list.length}</b> 所院校`;
  }

  /* ---------------- 详情抽屉 ---------------- */
  function discList(items, plain) {
    if (!items || !items.length) return '<span style="color:#aaa;font-size:13px">—</span>';
    return `<div class="disc-list">${items.map(d => `<span class="disc ${plain ? 'plain' : ''}">${d}</span>`).join('')}</div>`;
  }
  // 学科评估分级（A+/A/A-），无数据返回空串
  function discTier(label, items, color) {
    if (!items || !items.length) return '';
    return `<div class="grade-row"><span class="grade-tag" style="background:${color}">${label}</span>
      <div class="disc-list">${items.map(d => `<span class="disc" style="--c:${color}">${d}</span>`).join('')}</div></div>`;
  }
  function gradeBlock(u) {
    const html = discTier('A+', u.aplus, '#b3122a') + discTier('A', u.a, '#c2410c') + discTier('A-', u.aminus, '#a16207');
    return html || '<span style="color:#aaa;font-size:13px">暂无 A 类学科，以双一流建设学科 / 行业特色见长。</span>';
  }
  function dwScore(label, s) {
    if (!s) return `<div class="dw-score"><div class="lab">${label}</div><div class="big" style="color:#bbb">—</div>
                    <div class="sub">该类基本不招生 / 暂无参考</div></div>`;
    return `<div class="dw-score"><div class="lab">${label}</div><div class="big">${s.min}</div>
            <div class="sub">最低分 · 全市位次约 ${fmtRank(s.rank)}</div></div>`;
  }
  function openDetail(id) {
    const u = U.find(x => x.id === id); if (!u) return;
    const ea = enAbbr(u);
    const tags = (ea ? `<span class="tg abbr">${ea}</span>` : '') + u.tags.map(t => `<span class="tg">${t}</span>`).join('');
    $('#drawerBody').innerHTML = `
      <div class="dw-hero" style="background:linear-gradient(150deg, ${UU.levelColor(u)}, ${shade(UU.levelColor(u))})">
        <div class="dw-hero-row">
          ${logoHTML(u, 'dw-logo')}
          <div class="dw-hero-meta">
            <div class="dw-en">${u.en}</div>
            <h2>${u.name}<span class="dw-abbr"> · ${u.abbr}</span></h2>
            <div class="dw-tags">${tags}</div>
          </div>
        </div>
      </div>
      <div class="dw-section">
        <p class="drawer-intro">${u.intro}</p>
      </div>
      <div class="dw-section">
        <h3>基本信息</h3>
        <dl class="kv">
          <dt>所在地</dt><dd>${u.province} · ${u.city}</dd>
          <dt>创立时间</dt><dd>${u.founded} 年</dd>
          <dt>院校类型</dt><dd>${u.type}类</dd>
          <dt>主管部门</dt><dd>${u.admin}</dd>
        </dl>
      </div>
      <div class="dw-section">
        <h3>双一流建设学科</h3>${discList(u.firstClass)}
      </div>
      <div class="dw-section">
        <h3>教育部学科评估 · A 类学科</h3>${gradeBlock(u)}
      </div>
      <div class="dw-section">
        <h3>2025 重庆录取参考分</h3>
        <div class="dw-score-grid">${dwScore('物理类', u.score && u.score.wl)}${dwScore('历史类', u.score && u.score.ls)}</div>
        <p class="dw-note">⚠ 上述为 2025 年重庆普通类本科批录取最低分的参考整理值，仅供大致定位；2026 年真实分数线将于出分后更新，一切以官方公布为准。</p>
      </div>
      <div class="dw-section">
        <h3>就业概况</h3>
        <p class="drawer-intro">${u.emp}</p>
      </div>`;
    $('#drawer').hidden = false;
    $('#drawer').setAttribute('aria-hidden', 'false');
    $('#drawerBackdrop').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeDetail() {
    $('#drawer').hidden = true;
    $('#drawer').setAttribute('aria-hidden', 'true');
    $('#drawerBackdrop').hidden = true;
    document.body.style.overflow = '';
  }
  // 颜色加深（详情页渐变用）
  function shade(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, (n >> 16) - 40), g = Math.max(0, ((n >> 8) & 255) - 30), b = Math.max(0, (n & 255) - 30);
    return `rgb(${r},${g},${b})`;
  }

  /* ---------------- 志愿填报辅助（冲稳保） ---------------- */
  let applyKind = 'wl';
  function computeBands(kind, rank, score) {
    const elig = [];
    U.forEach(u => { const s = u.score && u.score[kind]; if (s) elig.push({ u, s }); });
    const chong = [], wen = [], bao = [];
    elig.forEach(it => {
      const s = it.s;
      if (rank) {
        const m = s.rank / rank;          // >1 院校更易（你更靠前），<1 院校更难
        if (m < 0.5) return;              // 远高于你的水平、基本无望 → 略去
        if (m < 0.9) chong.push(it);
        else if (m <= 1.3) wen.push(it);
        else bao.push(it);               // 你明显强于该校 → 保（不设上限）
      } else {
        const d = s.min - score;          // 院校线 - 你的分；>0 更难
        if (d > 30) return;               // 高出你 30 分以上、基本无望 → 略去
        if (d > 5) chong.push(it);
        else if (d >= -15) wen.push(it);
        else bao.push(it);
      }
    });
    const strong = (a, b) => (a.s.rank - b.s.rank) || (b.s.min - a.s.min);   // 院校越强越靠前
    [chong, wen, bao].forEach(arr => arr.sort(strong));
    // 智能兜底：你强于所有院校（冲、稳皆空）→ 把最强的若干所提为「稳」（如位次=1 → 清北华五）
    if (!chong.length && !wen.length && bao.length) {
      wen.push(...bao.splice(0, Math.min(8, bao.length)));
    }
    return { chong, wen, bao };
  }
  function applyCard(item, kind) {
    const { u, s } = item;
    const sub = kind === 'wl' ? '物理类' : '历史类';
    return `<div class="apply-card" data-id="${u.id}">
      ${logoHTML(u, 'ac-logo')}
      <div class="ac-main">
        <div class="ac-name">${u.name}</div>
        <div class="ac-sub">${enAbbr(u) ? enAbbr(u) + ' · ' : ''}${u.province}·${u.city}　${UU.topLevel(u)}</div>
      </div>
      <div class="ac-score"><b>${s.min}</b><small>${sub}·位次${fmtRank(s.rank)}</small></div>
    </div>`;
  }
  function runApply() {
    const rank = parseInt($('#applyRank').value, 10) || 0;
    const score = parseInt($('#applyScore').value, 10) || 0;
    const tip = $('#applyTip');
    if (!rank && !score) { tip.textContent = '请先输入你的位次或分数。'; tip.style.color = '#b3122a'; return; }
    tip.style.color = '';
    const kindName = applyKind === 'wl' ? '物理类' : '历史类';
    tip.innerHTML = rank
      ? `按 <b>${kindName} · 位次 ${rank}</b> 测算（位次越小越靠前；仅参考 2025 数据）：`
      : `按 <b>${kindName} · 分数 ${score}</b> 测算（仅参考 2025 数据）：`;
    const bands = computeBands(applyKind, rank, rank ? 0 : score);
    const CAP = 15;
    ['chong', 'wen', 'bao'].forEach(b => {
      const col = $(`.apply-col[data-band="${b}"]`);
      const arr = bands[b];
      col.querySelector('.apply-cnt').textContent = arr.length + ' 所';
      col.querySelector('.apply-list').innerHTML =
        arr.slice(0, CAP).map(it => applyCard(it, applyKind)).join('') ||
        '<div class="apply-empty">该档暂无匹配院校（或超出本站收录范围）。</div>';
    });
    $('#applyResults').hidden = false;
  }
  function clearApply() {
    $('#applyRank').value = ''; $('#applyScore').value = '';
    $('#applyResults').hidden = true;
    const tip = $('#applyTip'); tip.style.color = '';
    tip.textContent = '提示：位次比分数更能反映真实竞争力，建议优先填位次；两者都填则以位次为准。';
  }

  /* ---------------- 主渲染 ---------------- */
  function render() {
    const list = sortList(U.filter(passAll));
    renderFilters();
    renderChips();
    renderActiveTags();
    renderCards(list);
    if (state.linkMap && window.UniMap) window.UniMap.update(list, state.mapMode);
  }
  // 重渲染并保持滚动位置：仅当视口完全位于卡片网格下方时，按网格高度差补偿，避免页面缩短时跳到页脚；
  // 其余情况（视口在网格内或上方）不动，避免大幅缩短时被补偿到页面顶部。
  function renderPreserve() {
    const grid = document.getElementById('cardGrid');
    const y = window.scrollY || window.pageYOffset || 0;
    const gridBottom = grid ? grid.getBoundingClientRect().bottom + y : 0;   // 网格底部文档坐标
    const hBefore = grid ? grid.offsetHeight : 0;
    render();
    if (!grid || !window.scrollTo) return;
    const delta = grid.offsetHeight - hBefore;
    if (delta && y >= gridBottom) window.scrollTo(0, Math.max(0, y + delta));
  }

  /* ---------------- 顶部统计 & 数据说明 ---------------- */
  function renderHeroStats() {
    const n = (k) => U.filter(u => u.tags.includes(k)).length;
    const provinces = new Set(U.map(u => u.province)).size;
    const stats = [
      [U.length, '收录院校'], [n('985'), '985 高校'], [n('211'), '211 高校'],
      [n('双一流'), '双一流'], [provinces, '覆盖省份'],
    ];
    $('#heroStats').innerHTML = stats.map(s => `<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');
  }
  function renderAbout() {
    const cards = [
      ['分数口径', M.meta.scoreNote],
      ['资料来源', M.meta.dataNote],
      ['分类维度', '层次维度（清北 / 华五 / C9 / 985 / 211 / 双一流）可叠加；类型与特色分类（国防七子、政法五院、两财一贸等）依据社会主流认知进行整理，便于横向对比。'],
      ['更新时间', `本页数据整理截至 ${M.meta.updated}。2026 年高考于 6 月 9 日结束，真实录取分数线将于 6 月下旬陆续公布，届时可据官方数据更新。`],
    ];
    $('#aboutGrid').innerHTML = cards.map(c => `<div class="about-card"><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('');
    $('#footerNote').textContent = `数据整理截至 ${M.meta.updated} · 分数参照 ${M.meta.scoreYear} 年${M.meta.scoreRegion} · 共收录 ${U.length} 所院校`;
  }

  /* ---------------- 事件 ---------------- */
  function toggle(dim, k) {
    const set = state[dim];
    set.has(k) ? set.delete(k) : set.add(k);
    renderPreserve();
  }
  function bind() {
    // 筛选侧栏 + chips + 已选标签（事件委托）
    document.addEventListener('click', (e) => {
      const opt = e.target.closest('[data-dim][data-k]');
      if (opt) { toggle(opt.dataset.dim, opt.dataset.k); return; }
      const card = e.target.closest('.uni-card, .apply-card');
      if (card) { openDetail(card.dataset.id); }
    });
    $('#cardGrid').addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('uni-card')) {
        e.preventDefault(); openDetail(e.target.dataset.id);
      }
    });
    // 重置
    $('#resetFilters').addEventListener('click', () => {
      ['levels', 'types', 'groups', 'regions'].forEach(d => state[d].clear());
      state.q = ''; $('#globalSearch').value = ''; renderPreserve();
    });
    // 搜索
    let t; $('#globalSearch').addEventListener('input', (e) => {
      clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim().toLowerCase(); renderPreserve(); }, 160);
    });
    // 排序
    $('#sortSelect').addEventListener('change', (e) => { state.sort = e.target.value; renderPreserve(); });
    // 地图模式（仅切换地图，不重排卡片）
    $('#mapModeSeg').addEventListener('click', (e) => {
      const b = e.target.closest('.seg-btn'); if (!b) return;
      $('#mapModeSeg').querySelectorAll('.seg-btn').forEach(x => x.classList.toggle('is-active', x === b));
      state.mapMode = b.dataset.mode;
      if (window.UniMap) window.UniMap.setMode(state.mapMode);
    });
    // 是否随筛选联动地图（关闭后点击分类不再改动地图，避免重绘）
    $('#mapLinkToggle').addEventListener('change', (e) => {
      state.linkMap = e.target.checked;
      if (state.linkMap && window.UniMap) window.UniMap.update(sortList(U.filter(passAll)), state.mapMode);
    });
    // 志愿填报
    $('#applyKind').addEventListener('click', (e) => {
      const b = e.target.closest('.seg-btn'); if (!b) return;
      $('#applyKind').querySelectorAll('.seg-btn').forEach(x => x.classList.toggle('is-active', x === b));
      applyKind = b.dataset.kind;
      if (!$('#applyResults').hidden) runApply();
    });
    $('#applyBtn').addEventListener('click', runApply);
    $('#applyClear').addEventListener('click', clearApply);
    ['applyRank', 'applyScore'].forEach(id =>
      $('#' + id).addEventListener('keydown', e => { if (e.key === 'Enter') runApply(); }));
    // 抽屉关闭
    $('#drawerClose').addEventListener('click', closeDetail);
    $('#drawerBackdrop').addEventListener('click', closeDetail);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });
    // 左上角品牌（徽标 + 文字）：点击平滑回到顶部
    const brand = document.querySelector('.brand');
    if (brand) brand.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------------- 启动 ---------------- */
  function start() {
    if (window.UniMap) window.UniMap.init();
    renderHeroStats();
    renderAbout();
    bind();
    render();
  }
  window.App = { openDetail };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
