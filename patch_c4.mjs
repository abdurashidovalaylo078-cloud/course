import fs from 'fs';

const vidsData = JSON.parse(fs.readFileSync('vids.json', 'utf8'));

// clean up titles
const cleanVids = vidsData.slice(1).map(v => { // Start from second video (index 1)
    return {
        id: v.id,
        title: v.title.split('"}')[0].trim()
    }
});

let dataJs = fs.readFileSync('src/data.js', 'utf8');

const course4Start = dataJs.indexOf('id: 4,');
const course5Start = dataJs.length; // Course 4 is the last course in the array

if (course4Start === -1) process.exit(1);

const course4Str = dataJs.substring(course4Start, course5Start);

let newModules = `[
            {
                title: "1-Modul. Asosiy modellashtirish",
                lessons: [`;

let lId = 1401;

// We have 35 videos now. Let's divide them into 3 logical modules for a better UI experience.
// Module 1: 12 videos, Module 2: 12 videos, Module 3: 11 videos

for(let i = 0; i < 12; i++) {
    const v = cleanVids[i];
    newModules += `
                    {
                        id: ${lId++},
                        title: "${v.title}",
                        completed: ${i < 2 ? 'true' : 'false'},
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/${v.id}"
                    },`;
}

newModules = newModules.slice(0, -1) + `
                ]
            },
            {
                title: "2-Modul. 3D obyektlar va dizayn",
                lessons: [`;

for(let i = 12; i < 24; i++) {
    const v = cleanVids[i];
    newModules += `
                    {
                        id: ${lId++},
                        title: "${v.title}",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/${v.id}"
                    },`;
}

newModules = newModules.slice(0, -1) + `
                ]
            },
            {
                title: "3-Modul. Fasad, landshaft va vizualizatsiya",
                lessons: [`;

for(let i = 24; i < 35; i++) {
    const v = cleanVids[i];
    newModules += `
                    {
                        id: ${lId++},
                        title: "${v.title}",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/${v.id}"
                    },`;
}

newModules = newModules.slice(0, -1) + `
                ]
            }
        ]`;

const modulesStart = course4Str.indexOf('modules: [');
const endIdx = course4Str.indexOf('        ]', modulesStart) + 9;

if (modulesStart !== -1 && endIdx !== -1) {
    const beforeMod = dataJs.substring(0, course4Start + modulesStart);
    const afterMod = dataJs.substring(course4Start + endIdx);
    
    // Also, update totalLessons dynamically to 35 for course 4!
    // We can just regex replace totalLessons: 36, completedLessons: 2 -> totalLessons: 35
    let patchedData = beforeMod + newModules + afterMod;
    
    // We only want to replace in Course 4 block...
    patchedData = patchedData.replace(
        /id: 4,[\s\S]*?totalLessons: \d+,[\s\S]*?completedLessons: \d+,/,
        (match) => {
            return match
                .replace(/totalLessons: \d+/, 'totalLessons: 35')
                .replace(/completedLessons: \d+/, 'completedLessons: 2');
        }
    );
    
    fs.writeFileSync('src/data.js', patchedData);
    console.log("Course 4 patched with videos successfully.");
} else {
    console.log("Could not find modules array in Course 4.");
}
