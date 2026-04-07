const fs = require('fs');
const https = require('https');

https.get('https://www.youtube.com/playlist?list=PLtJ-ufoDnA2DDcPhReJXU06cCF6KtE6eo', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const regex = /"title":{"runs":\[{"text":"(.*?)"}\]}.*?"videoId":"([a-zA-Z0-9_-]{11})"/g;
        let match;
        const seen = new Set();
        const vids = [];
        
        while ((match = regex.exec(data)) !== null) {
            const t = match[1].replace(/\\u0026/g, '&');
            const v = match[2];
            if (!seen.has(v) && t !== 'Private video') {
                seen.add(v);
                vids.append? vids.push({id: v, title: t}) : vids.push({id: v, title: t});
            }
        }
        
        fs.writeFileSync('vids.json', JSON.stringify(vids, null, 2));
        console.log('Saved', vids.length);
    });
}).on('error', err => console.log(err));
