const ts=require('typescript'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const m={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/timezones.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:m.exports,module:m,Date,Intl});const {standardTimezones,isStandardTimezone,timezoneLabel,timezoneOptions}=m.exports;
for(const offset of ['-12:00','+14:00','+08:00','+05:30','+05:45','-03:30','+12:45','+13:45']){assert.equal(isStandardTimezone(offset),true);assert.equal(timezoneLabel(offset),'UTC'+offset)}
assert.equal(isStandardTimezone('+25:00'),false);assert.equal(isStandardTimezone('Asia/Shanghai'),false);assert.equal(new Set(standardTimezones.map(z=>z.value)).size,standardTimezones.length);
assert.equal(timezoneLabel('Asia/Shanghai',new Date('2026-01-01T00:00:00Z')),'UTC+08:00');assert.equal(timezoneLabel('America/New_York',new Date('2026-01-01T00:00:00Z')),'UTC-05:00');assert.equal(timezoneLabel('America/New_York',new Date('2026-07-01T00:00:00Z')),'UTC-04:00');
console.log('PASS: standard UTC choices, half/quarter-hour offsets, invalid values, and legacy IANA/DST display.');

for(const [date,offset] of [['2026-01-01T00:00:00Z','-05:00'],['2026-07-01T00:00:00Z','-04:00']]){const options=timezoneOptions(new Date(date));assert.match(options.find(z=>z.value===offset).label,/纽约/);assert.match(options.find(z=>z.value==='+08:00').label,/北京.*上海.*新加坡/)}
