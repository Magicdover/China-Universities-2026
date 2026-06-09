/*
 * tools/smoke.js —— 无浏览器冒烟测试
 * 桩掉 DOM 与 ECharts，真实执行 map.js / app.js 的初始化、渲染与详情逻辑，
 * 捕捉运行时错误（而非仅语法）。用法：node tools/smoke.js
 */
const fs = require('fs');
const path = require('path');

/* ---- 极简 DOM 桩 ---- */
function fakeEl() {
  return {
    innerHTML: '', value: '', hidden: false, textContent: '', style: {}, dataset: {},
    addEventListener() {}, setAttribute() {}, removeAttribute() {}, appendChild() {}, focus() {},
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    querySelector() { return fakeEl(); }, querySelectorAll() { return []; }, closest() { return null; },
  };
}
const cache = {};
global.document = {
  readyState: 'complete',
  querySelector(s) { return cache[s] || (cache[s] = fakeEl()); },
  getElementById(id) { const k = '#' + id; return cache[k] || (cache[k] = fakeEl()); },
  addEventListener() {}, body: { style: {} },
};
global.window = global;
global.window.addEventListener = () => {};
global.echarts = {
  registerMap() {},
  init() {
    const c = {
      _h: {}, _last: null,
      on(e, f) { this._h[e] = f; return this; },
      setOption(o) { this._last = o; return this; },
      getOption() { return { geo: [{ zoom: 1.15 }], series: [{ zoom: 1.15 }] }; },
      dispatchAction() {}, resize() {},
    };
    global.__chart = c;
    return c;
  },
};
global.window.CHINA_GEO = { type: 'FeatureCollection', features: [] };

/* ---- 按页面顺序加载 ---- */
const load = f => eval(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'));
['data/meta.js', 'data/universities.js', 'data/uni-211.js', 'data/uni-special.js', 'data/uni-extra.js',
  'data/uni-extra2.js', 'data/logos.js', 'js/map.js', 'js/app.js'].forEach(load);

/* ---- 断言 ---- */
const assert = (cond, msg) => { if (!cond) { console.error('✗ ' + msg); process.exit(1); } };

const grid = cache['#cardGrid'].innerHTML;
const cards = (grid.match(/<article/g) || []).length;
assert(cards === window.UNIVERSITIES.length, `卡片数 ${cards} ≠ 院校数 ${window.UNIVERSITIES.length}`);
assert(/班|大学|学院/.test(grid), '卡片未渲染校名');
assert(cache['#heroStats'].innerHTML.includes('收录院校'), '顶部统计未渲染');
assert(cache['#filterGroups'].innerHTML.includes('层次'), '筛选维度未渲染');
assert(cache['#aboutGrid'].innerHTML.includes('分数口径'), '数据说明未渲染');

/* 详情抽屉：覆盖普通校、空分数军校、艺术校 */
['tsinghua', 'nudt', 'cafa', 'swufe', 'westlake'].forEach(id => {
  window.App.openDetail(id);
  const body = cache['#drawerBody'].innerHTML;
  const u = window.UNIVERSITIES.find(x => x.id === id);
  assert(body.includes(u.name), `详情未渲染：${id}`);
});

/* UI 细节：英文简称在标签行（非校名旁）、详情页 A 类学科分级 */
assert(grid.includes('tg abbr'), '英文简称标签未渲染');
assert(!grid.includes('uc-abbr'), '英文简称不应再出现在校名旁');
window.App.openDetail('tsinghua');
const thu = cache['#drawerBody'].innerHTML;
assert(thu.includes('grade-tag') && thu.includes('A+'), '详情页 A+ 学科分级未渲染');

/* 地图点击：点击气泡应打开详情（点击底图放大逻辑已移除）*/
const ch = global.__chart;
assert(ch && ch._h.click, '地图点击回调未注册');
ch._h.click({ seriesType: 'scatter', data: { id: 'pku' } });   // 模拟点击院校气泡
assert(cache['#drawerBody'].innerHTML.includes('北京大学'), '点击气泡未打开院校详情');

console.log(`✓ 冒烟测试通过：渲染 ${cards} 张卡片，详情 / 筛选 / 点击气泡正常，无运行时错误`);
