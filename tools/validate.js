/*
 * tools/validate.js —— 数据与脚本校验
 * 用法：node tools/validate.js
 * 检查院校数据的字段完整性、id 唯一性、类型/省份/标签合法性，并打印统计。
 */
const fs = require('fs');
const path = require('path');

global.window = {};
const load = f => eval(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'));
load('data/meta.js');
window.UNIVERSITIES = window.UNIVERSITIES || [];
['data/universities.js', 'data/uni-211.js', 'data/uni-special.js', 'data/uni-extra.js', 'data/uni-extra2.js'].forEach(f => {
  if (fs.existsSync(path.join(__dirname, '..', f))) load(f);
});

const M = window.META, U = window.UNIVERSITIES;
const errs = [], warns = [];
const ids = new Set();
const validTypes = new Set(M.types.map(t => t.key));
const validLevels = new Set(M.levels.map(l => l.key));
const validGroups = new Set(M.groups.map(g => g.key));
const allProv = new Set(Object.values(M.regions).flat());

U.forEach((u, i) => {
  const w = `[${i}] ${u.name || u.id || '?'}`;
  ['id', 'name', 'en', 'abbr', 'province', 'city', 'lng', 'lat', 'founded', 'type', 'admin', 'tags', 'tier']
    .forEach(f => { if (u[f] === undefined || u[f] === null) errs.push(`${w}: 缺字段 ${f}`); });
  if (ids.has(u.id)) errs.push(`${w}: id 重复 → ${u.id}`); ids.add(u.id);
  if (u.type && !validTypes.has(u.type)) errs.push(`${w}: 未知类型 → ${u.type}`);
  if (u.province && !allProv.has(u.province)) errs.push(`${w}: 省份不在 regions → ${u.province}`);
  (u.tags || []).forEach(t => { if (!validLevels.has(t) && !validGroups.has(t)) warns.push(`${w}: 标签未登记 → ${t}`); });
  if (typeof u.lng !== 'number' || u.lng < 70 || u.lng > 140) warns.push(`${w}: lng 可疑 → ${u.lng}`);
  if (typeof u.lat !== 'number' || u.lat < 15 || u.lat > 55) warns.push(`${w}: lat 可疑 → ${u.lat}`);
  if (!(u.tier >= 0 && u.tier <= 5)) warns.push(`${w}: tier 超范围 → ${u.tier}`);
});

const cnt = k => U.filter(u => u.tags.includes(k)).length;
console.log(`院校总数：${U.length}　覆盖省份：${new Set(U.map(u => u.province)).size}`);
console.log(`清北 ${cnt('清北')}　华五 ${cnt('华五')}　C9 ${cnt('C9')}　985 ${cnt('985')}　211 ${cnt('211')}　双一流 ${cnt('双一流')}`);
if (warns.length) { console.log('\n⚠ 警告：'); warns.forEach(x => console.log('  ' + x)); }
if (errs.length) { console.log('\n✗ 错误：'); errs.forEach(x => console.log('  ' + x)); process.exit(1); }
console.log('\n✓ 数据校验通过');
