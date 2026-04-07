import fs from 'fs';

const vidsData = JSON.parse(fs.readFileSync('vids.json', 'utf8'));

// clean up titles
const cleanVids = vidsData.map(v => {
    return {
        id: v.id,
        title: v.title.split('"}')[0].trim()
    }
});

let dataJs = fs.readFileSync('src/data.js', 'utf8');

// The replacement logic:
// I need to rebuild the Course 1 modules starting from the 2nd video.
// First: get the first module, first lesson.
const course1Start = dataJs.indexOf('id: 1,');
const course2Start = dataJs.indexOf('id: 2,');

if (course1Start === -1) process.exit(1);

const course1Str = dataJs.substring(course1Start, course2Start);

// Let's formulate new modules. We have 36 videos in the playlist.
// The user wants starting from the 2nd video of the course?
// Wait, the user said: "2 videodan boshlab hamma videolarni linkini va nomini youtube playlistdagi videolar bilan joylashtirish kerak. "
// Meaning, lesson 102, 103... will be replaced with course elements from the playlist.
// Playlist has 36 items.
// Let's divide 36 items into say 3 modules of 12 items each.
// Module 1 will have lesson 101 (the original) + 11 from the playlist.

let newModules = `[
            {
                title: "1-Modul. Kirish va Interfeys",
                lessons: [
                    {
                        id: 101,
                        title: "3D Max va V-Ray o'rnatish",
                        completed: true,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/9NmZNUSG1_E"
                    },`;

let lId = 102;
for(let i = 0; i < 11; i++) {
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
                title: "2-Modul. Asosiy modellashtirish",
                lessons: [`;

for(let i = 11; i < 23; i++) {
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
                title: "3-Modul. Murakkab obyektlar va render",
                lessons: [`;

for(let i = 23; i < 36; i++) {
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

// Find modules: [ ... ] inside course 1
const modulesStart = course1Str.indexOf('modules: [');
const modulesEndMatch = course1Str.match(/\n\s*\]\n\s*\},/);
const EndIdx = course1Str.indexOf('        ]', modulesStart) + 9;

if (modulesStart !== -1 && EndIdx !== -1) {
    const newDataJs = dataJs.substring(0, course1Start + modulesStart) + newModules + course1Str.substring(EndIdx) + dataJs.substring(course2Start - 8);
    // actually, let's just do a string replace on dataJs using substring properly
    const beforeMod = dataJs.substring(0, course1Start + modulesStart);
    const afterMod = dataJs.substring(course1Start + EndIdx);
    
    fs.writeFileSync('src/data.js', beforeMod + newModules + afterMod);
    console.log("data.js patched successfully.");
} else {
    console.log("Could not find modules array.");
}
