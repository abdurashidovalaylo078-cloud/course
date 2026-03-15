import fs from 'fs';

let dataContent = fs.readFileSync('src/data.js', 'utf-8');

// Replace standard embedded youtube urls with vq=hd1080 parameter appended
dataContent = dataContent.replace(/https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)(?!\?vq=hd1080)/g, 'https://www.youtube.com/embed/$1?vq=hd1080');

fs.writeFileSync('src/data.js', dataContent);
console.log('Videos updated to 1080p format.');
