/* =========================================================================
   map.js —— 中国高校分布地图（ECharts）
   两种模式：bubble = 院校气泡（按层次配色、按层级定大小）；heat = 各省数量热力。
   同时导出共享工具 window.UU，供 app.js 复用配色 / 层级判定。
   ========================================================================= */

/* ---------- 共享工具（app.js 复用） ---------- */
window.UU = (function () {
  const L = window.META.levels;
  const colorByKey = Object.fromEntries(L.map(l => [l.key, l.color]));

  // 院校的「最高层次」键，用于配色与徽章
  function topLevel(u) {
    for (const k of ['清北', '华五', 'C9', '985', '211', '双一流']) {
      if (u.tags.includes(k)) return k;
    }
    return '其他';
  }
  function levelColor(u) { return colorByKey[topLevel(u)] || '#94a3b8'; }

  // 气泡大小（按 tier 综合层级）
  function tierSize(t) { return [26, 21, 18, 14, 11, 9][t] ?? 9; }

  // 省份简称 → geoJSON 全名
  const SPECIAL = {
    内蒙古: '内蒙古自治区', 广西: '广西壮族自治区', 西藏: '西藏自治区',
    宁夏: '宁夏回族自治区', 新疆: '新疆维吾尔自治区',
    北京: '北京市', 天津: '天津市', 上海: '上海市', 重庆: '重庆市',
    香港: '香港特别行政区', 澳门: '澳门特别行政区',
  };
  function fullProv(s) { return SPECIAL[s] || (s + '省'); }

  return { colorByKey, topLevel, levelColor, tierSize, fullProv };
})();

/* ---------- 地图模块 ---------- */
window.UniMap = (function () {
  let chart = null;
  let ready = false;
  let curList = [], curMode = 'bubble', renderedMode = null;
  const legendEl = document.getElementById('mapLegend');
  const resetBtn = document.getElementById('mapReset');

  function init() {
    const dom = document.getElementById('map');
    if (!dom || typeof echarts === 'undefined') {
      if (dom) dom.innerHTML = '<p style="padding:40px;text-align:center;color:#888">地图组件未能加载。</p>';
      return;
    }
    if (!window.CHINA_GEO) {
      dom.innerHTML = '<p style="padding:40px;text-align:center;color:#888">中国地图数据未能加载。</p>';
      return;
    }
    echarts.registerMap('china', window.CHINA_GEO);
    chart = echarts.init(dom, null, { renderer: 'canvas' });
    ready = true;

    chart.on('click', (p) => {
      if (p.seriesType === 'scatter' && p.data && p.data.id && window.App) {
        window.App.openDetail(p.data.id);                      // 点击院校气泡 → 详情（点击底图不再缩放）
      }
    });
    chart.on('georoam', () => { if (resetBtn) resetBtn.hidden = false; });  // 滚轮/拖拽后显示复位
    if (resetBtn) resetBtn.addEventListener('click', resetView);
    window.addEventListener('resize', () => chart && chart.resize());
  }
  function resetView() {
    renderedMode = null;                        // 强制整图重建 → 复位缩放/平移
    update(curList, curMode);
    if (resetBtn) resetBtn.hidden = true;
  }

  /* 把同城院校做轻微散开，避免气泡完全重叠 */
  function jitter(list) {
    const seen = {};
    return list.map(u => {
      const key = (u.lng.toFixed(2)) + ',' + (u.lat.toFixed(2));
      const n = seen[key] = (seen[key] || 0);
      seen[key]++;
      if (n === 0) return [u.lng, u.lat];
      const ang = n * 2.399, r = 0.18 + 0.05 * n;        // 黄金角螺旋散开
      return [u.lng + Math.cos(ang) * r, u.lat + Math.sin(ang) * r];
    });
  }

  function bubbleOption(list) {
    const coords = jitter(list);
    const data = list.map((u, i) => ({
      name: u.name, id: u.id,
      value: [coords[i][0], coords[i][1], window.UU.tierSize(u.tier)],
      uni: u,
      itemStyle: { color: window.UU.levelColor(u) },
      label: { show: u.tier <= 2, formatter: u.abbr, position: 'right',
               fontSize: 11, color: '#1b1f27', fontWeight: 600,
               textBorderColor: '#fff', textBorderWidth: 2 },
    }));

    return {
      tooltip: {
        trigger: 'item', confine: true, borderColor: '#eee',
        textStyle: { color: '#1b1f27' },
        formatter: (p) => {
          const u = p.data && p.data.uni; if (!u) return '';
          const wl = u.score && u.score.wl ? `物理类 <b>${u.score.wl.min}</b>` : '';
          const ls = u.score && u.score.ls ? `历史类 <b>${u.score.ls.min}</b>` : '';
          const sc = (wl || ls) ? `<div style="margin-top:4px;color:#555">${[wl, ls].filter(Boolean).join('　')}<span style="color:#aaa">（25重庆参考）</span></div>` : '';
          const tags = u.tags.slice(0, 4).map(t =>
            `<span style="background:${window.UU.colorByKey[t] || '#eef0f5'};color:${window.UU.colorByKey[t] ? '#fff' : '#555'};border-radius:4px;padding:0 6px;font-size:11px;margin-right:4px">${t}</span>`).join('');
          return `<div style="font-weight:700;font-size:14px;margin-bottom:3px">${u.name}</div>
                  <div style="color:#777;font-size:12px;margin-bottom:6px">${u.province}·${u.city}　${u.type}　${u.founded}年</div>
                  <div>${tags}</div>${sc}
                  <div style="color:#b3122a;font-size:11px;margin-top:6px">点击查看详情 →</div>`;
        },
      },
      geo: {
        map: 'china', roam: true, zoom: 1.15,
        scaleLimit: { min: 1, max: 60 },
        itemStyle: { areaColor: '#eef1f6', borderColor: '#cfd6e2', borderWidth: .8 },
        emphasis: { itemStyle: { areaColor: '#e3e8f1' }, label: { show: false } },
        select: { itemStyle: { areaColor: '#dfe6f2' }, label: { show: false } },
      },
      series: [{
        type: 'scatter', coordinateSystem: 'geo', data,
        symbolSize: (val) => val[2],
        emphasis: { scale: 1.4, itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,.3)' } },
        z: 5,
      }],
    };
  }

  function heatOption(list) {
    const counts = {};
    list.forEach(u => { counts[u.province] = (counts[u.province] || 0) + 1; });
    const data = Object.keys(counts).map(p => ({ name: window.UU.fullProv(p), value: counts[p], short: p }));
    const max = Math.max(1, ...Object.values(counts));

    return {
      tooltip: {
        trigger: 'item', confine: true,
        formatter: (p) => `${p.data ? p.data.short : p.name}：<b>${p.value || 0}</b> 所`,
      },
      visualMap: {
        left: 18, bottom: 24, min: 0, max,
        text: ['多', '少'], calculable: true,
        inRange: { color: ['#f3f5f9', '#f6c6cd', '#d4445a', '#8a0d20'] },
        textStyle: { color: '#767c8e', fontSize: 12 },
      },
      series: [{
        type: 'map', map: 'china', roam: true, zoom: 1.15,
        scaleLimit: { min: 1, max: 60 }, data,
        label: { show: false },
        itemStyle: { borderColor: '#cfd6e2', borderWidth: .8, areaColor: '#f3f5f9' },
        emphasis: { label: { show: true, color: '#1b1f27', fontSize: 11 },
                    itemStyle: { areaColor: '#f0b8c0' } },
        select: { disabled: true },
      }],
    };
  }

  function renderLegend(mode) {
    if (!legendEl) return;
    if (mode === 'heat') {
      legendEl.innerHTML = '<span class="legend-item" style="color:#767c8e">颜色越深 = 该省入选院校越多</span>';
      return;
    }
    legendEl.innerHTML = window.META.levels.map(l =>
      `<span class="legend-item"><i style="background:${l.color}"></i>${l.name}</span>`).join('');
  }

  function update(list, mode) {
    if (!ready) return;
    curList = list; curMode = mode;
    if (mode !== renderedMode) {                 // 模式切换 / 首次：整图重建
      renderLegend(mode);
      chart.setOption(mode === 'heat' ? heatOption(list) : bubbleOption(list), { notMerge: true });
      renderedMode = mode;
      if (resetBtn) resetBtn.hidden = true;
    } else if (mode === 'heat') {                // 同为热力：仅更新数据 + 色阶（merge，避免整图重建的卡顿）
      const o = heatOption(list);
      chart.setOption({ series: [{ data: o.series[0].data }], visualMap: o.visualMap });
    } else {                                     // 同为气泡：仅更新散点数据（merge）
      const o = bubbleOption(list);
      chart.setOption({ series: [{ data: o.series[0].data }] });
    }
  }

  function setMode(mode) {                      // 仅切换显示模式，复用已存数据（配合「随筛选联动」开关）
    renderedMode = null;                        // 强制整图重建以切换模式
    update(curList, mode);
  }

  return { init, update, setMode };
})();
