/*
 * tools/gen-logos.js —— 归集校徽并生成 data/logos.js + 覆盖率报告
 * ① 把项目根目录新放入的校徽（开头为中文校名，如「中文名-logo.svg / 中文名.svg / 中文名-logo中文版.svg」
 *    或已知英文名文件）改名为「中文名 英文简称.svg」，归入 assets/logos-new/（新一批，独立保存）并清理根目录；
 *    数据中不存在的院校 → 移入 assets/logos-unused/ 备用，不参与显示；
 * ② 扫描 assets/logos-new（优先）与 assets/logos（兜底，原始套图保留不动），按中文校名匹配 150 所院校；
 * ③ 输出 window.LOGOS = { 院校id: { f:'文件名.svg', en:'英文简称', dir:'logos-new'|'logos' } }。
 * 用法：node tools/gen-logos.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OLD = path.join(ROOT, 'assets/logos');
const NEW = path.join(ROOT, 'assets/logos-new');
const UNUSED = path.join(ROOT, 'assets/logos-unused');
fs.mkdirSync(NEW, { recursive: true });

// 载入院校数据
global.window = {};
const load = f => eval(fs.readFileSync(path.join(ROOT, f), 'utf8'));
load('data/meta.js');
window.UNIVERSITIES = window.UNIVERSITIES || [];
['data/universities.js', 'data/uni-211.js', 'data/uni-special.js', 'data/uni-extra.js', 'data/uni-extra2.js'].forEach(load);
const U = window.UNIVERSITIES;
const nameToSchool = Object.fromEntries(U.map(u => [u.name, u]));

// 校名别名：数据名 → 校徽规范中文名（扫描匹配用，须与 logos-new / logos 文件名一致）
const ALIAS = { '国防科技大学': '国防科学技术大学' };
// 入库修正：文件里提取到的中文名 → 数据名
const INGEST_FIX = { '中国人民解放军国防科技大学': '国防科技大学' };
// 根目录英文名文件 → 中文校名（大小写不敏感）
const EN_FILE = {
  'beihang_university_logo.svg': '北京航空航天大学',
  'beijing_institute_of_technology_f.c.svg': '北京理工大学',
  'beijing_normal_university_logo.svg': '北京师范大学',
  'fudan_university_logo.svg': '复旦大学',
  'renmin_university_of_china_logo.svg': '中国人民大学',
  'tsinghua_university_logo.svg': '清华大学',
  'the emblem of scnu.svg': '华南师范大学',
  'cityu_vertical_logo_cmyk.svg': '香港城市大学（东莞）',
  'the emblem of the hong kong university of science and technology, the hong kong university of science and technology (guangzhou).svg': '香港科技大学（广州）',
};
// 英文 slug（去掉 -logo-1024px /（1）等后缀后）→ 中文校名
const EN_SLUG = {
  'chengdu-university-of-tcm': '成都中医药大学',
  'china-conservatory-of-music': '中国音乐学院',
  'hainan-university': '海南大学',
  'henan-university': '河南大学',
  'liaoning-university': '辽宁大学',
  'nanchang-university': '南昌大学',
  'northeast-agricultural-university': '东北农业大学',
  'northeast-forestry-university': '东北林业大学',
  'shihezi-university': '石河子大学',
  'south-central-minzu-university': '中南民族大学',
  'naval-medical-university': '海军军医大学',
  'air-force-medical-university': '空军军医大学',
  'army-medical-university': '陆军军医大学',
};
function zhNameOf(fn) {
  const low = fn.toLowerCase();
  if (EN_FILE[low]) return EN_FILE[low];
  // 英文命名（如 xxx-logo-1024px.png / xxx_logo.png / xxx (1).png）→ 归一化 slug 查表
  const slug = low.replace(/\.(svg|png)$/, '').replace(/[_\s]+/g, '-').replace(/-logo.*$/, '').replace(/\(\d+\)$/, '').replace(/-+$/, '');
  if (EN_SLUG[slug]) return EN_SLUG[slug];
  // 中文命名：开头连续中文（含可能的（分校））
  const m = fn.match(/^([一-龥]+(?:（[一-龥]+）)?)/);
  return m ? m[1] : null;
}

// ① 归集根目录新校徽（支持 .svg / .png）
let ingested = 0; const skipped = [];
for (const fn of fs.readdirSync(ROOT)) {
  const low = fn.toLowerCase();
  if (!low.endsWith('.svg') && !low.endsWith('.png')) continue;
  const raw = zhNameOf(fn);
  if (!raw) continue;                                   // 非校徽文件，忽略
  const dataName = INGEST_FIX[raw] || raw;
  const u = nameToSchool[dataName];
  if (!u) {                                             // 数据中无此校 → 移入备用夹
    fs.mkdirSync(UNUSED, { recursive: true });
    fs.renameSync(path.join(ROOT, fn), path.join(UNUSED, fn));
    skipped.push(raw); continue;
  }
  const abbr = (u.enAbbr || '').toUpperCase();
  const canon = ALIAS[dataName] || dataName;            // 文件名中文部分须与扫描匹配键一致
  const ext = low.endsWith('.png') ? '.png' : '.svg';
  ['.svg', '.png'].forEach(e => {                       // 清掉该校已有旧徽标，避免重复
    const p = path.join(NEW, `${canon} ${abbr}${e}`);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  });
  fs.copyFileSync(path.join(ROOT, fn), path.join(NEW, `${canon} ${abbr}${ext}`));
  fs.unlinkSync(path.join(ROOT, fn));
  ingested++;
}
if (ingested) console.log(`归集新校徽 → assets/logos-new/：${ingested} 个`);
if (skipped.length) console.log(`移入备用 assets/logos-unused/（数据中无此校 ${skipped.length}）：${skipped.join('、')}`);

// ② 扫描：新文件夹优先，旧文件夹兜底
const zhToEntry = {};
function scan(dir, tag) {
  if (!fs.existsSync(dir)) return;
  for (const fn of fs.readdirSync(dir)) {
    if (!/\.(svg|png)$/i.test(fn)) continue;
    const b = fn.replace(/\.(svg|png)$/i, ''); const i = b.indexOf(' ');
    const zh = i < 0 ? b : b.slice(0, i), en = i < 0 ? '' : b.slice(i + 1);
    if (!zhToEntry[zh]) zhToEntry[zh] = { f: fn, en, dir: tag };
  }
}
scan(NEW, 'logos-new');
scan(OLD, 'logos');

// ③ 匹配并输出
const logos = {}, matched = [], unmatched = [];
let useNew = 0;
U.forEach(u => {
  const zh = ALIAS[u.name] || u.name;
  const e = zhToEntry[zh];
  if (e) { logos[u.id] = { f: e.f, en: e.en, dir: e.dir }; matched.push(u.name); if (e.dir === 'logos-new') useNew++; }
  else unmatched.push(u.name);
});
fs.writeFileSync(path.join(ROOT, 'data/logos.js'),
  '/* 自动生成：tools/gen-logos.js —— 院校id → {f:文件名, en:英文简称, dir:所在文件夹} */\nwindow.LOGOS = ' + JSON.stringify(logos) + ';\n');

const cnt = d => fs.readdirSync(d).filter(f => /\.(svg|png)$/i.test(f)).length;
console.log(`\n校徽：新 ${cnt(NEW)} + 旧 ${cnt(OLD)}`);
console.log(`✓ 匹配 ${matched.length}/${U.length}（其中用新徽标 ${useNew} 所，其余沿用旧徽标 / 字徽）`);
console.log(`✗ 仍无徽标（${unmatched.length}）：${unmatched.join('、')}`);
