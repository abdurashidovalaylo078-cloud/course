const fs = require('fs');

const dataContent = fs.readFileSync('src/data.js', 'utf8');

// The file has export { ... } at the end. We can evaluate it by replacing export with module.exports
let evalCode = dataContent.replace(/export \{[^}]+\};/g, '');
evalCode += '\nmodule.exports = { coursesData };';

try {
  let mod = { exports: {} };
  let fn = new Function('module', 'exports', evalCode);
  fn(mod, mod.exports);
  const coursesData = mod.exports.coursesData;

  const translationDict = {
    uz: {},
    ru: {},
    en: {}
  };

  coursesData.forEach(c => {
    c.modules.forEach((m, mIdx) => {
        translationDict.uz[`course.${c.id}.module.${mIdx}.title`] = m.title;
        // Basic static translation mapping (I'll do manual regex replace later or just basic replacements)
        translationDict.ru[`course.${c.id}.module.${mIdx}.title`] = m.title + ' (RU)';
        translationDict.en[`course.${c.id}.module.${mIdx}.title`] = m.title + ' (EN)';

        m.lessons.forEach(l => {
             translationDict.uz[`lesson.${l.id}.title`] = l.title;
             translationDict.ru[`lesson.${l.id}.title`] = l.title + ' (RU)';
             translationDict.en[`lesson.${l.id}.title`] = l.title + ' (EN)';
        });
    });
  });

  const uzStr = Object.entries(translationDict.uz).map(([k,v]) => `        "${k}": "${v.replace(/"/g, '\\"')}"`).join(',\n');
  const ruStr = Object.entries(translationDict.ru).map(([k,v]) => `        "${k}": "${v.replace(/"/g, '\\"')}"`).join(',\n');
  const enStr = Object.entries(translationDict.en).map(([k,v]) => `        "${k}": "${v.replace(/"/g, '\\"')}"`).join(',\n');

  console.log('UZ Count:', Object.keys(translationDict.uz).length);
  fs.writeFileSync('extraUz.txt', uzStr);
  fs.writeFileSync('extraRu.txt', ruStr);
  fs.writeFileSync('extraEn.txt', enStr);
} catch (e) {
  console.error(e);
}
