import fs from 'fs';

let landingCss = fs.readFileSync('src/assets/css/landing.css', 'utf8');

// The Amber values:
// #f59e0b -> #8b5cf6
// #fbbf24 -> #c084fc
// #d97706 -> #ec4899
// #EA580C -> #f72585
// 245, 158, 11 -> 139, 92, 246

landingCss = landingCss.replace(/#f59e0b/ig, '#8b5cf6')
                       .replace(/#fbbf24/ig, '#c084fc')
                       .replace(/#d97706/ig, '#ec4899')
                       .replace(/#EA580C/ig, '#f72585')
                       .replace(/245, 158, 11/g, '139, 92, 246')
                       .replace(/234, 88, 12/g, '236, 72, 153');

fs.writeFileSync('src/assets/css/landing.css', landingCss);

let styleCss = fs.readFileSync('src/assets/css/style.css', 'utf8');

styleCss = styleCss.replace(/#f59e0b/ig, '#8b5cf6')
                   .replace(/#fbbf24/ig, '#c084fc')
                   .replace(/#d97706/ig, '#ec4899')
                   .replace(/#EA580C/ig, '#f72585')
                   .replace(/245, 158, 11/g, '139, 92, 246')
                   .replace(/234, 88, 12/g, '236, 72, 153');

fs.writeFileSync('src/assets/css/style.css', styleCss);

console.log("Colors successfully replaced with deep purple and pink neon.");
