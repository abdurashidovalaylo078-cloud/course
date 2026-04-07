import fs from 'fs';
let dataJs = fs.readFileSync('src/data.js', 'utf8');

const course4Start = dataJs.indexOf('id: 4,');
const course5Start = dataJs.length;

if (course4Start === -1) process.exit(1);

const beforeMod = dataJs.substring(0, course4Start);
// Define exact Course 4 structure
const course4Content = `id: 4,
        title: "3ds Max: arxitektura kursi",
        instructor: "Ustoz AI",
        progress: 6,
        totalLessons: 36,
        completedLessons: 2,
        thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
        description: "Arxitektura va bino loyihalarini 3ds Max dasturida modellashtirish va vizualizatsiya qilish asoslari.",
        modules: [
            {
                title: "1-Modul. Barcha Darsliklar (Playlist)",
                lessons: [
                    {
                        id: 1401,
                        title: "1-Dars. Arxitektura loyihasini AutoCad dan 3ds Max ga o'tkazish",
                        completed: true,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/DXbZVgh4e64"
                    },
                    {
                        id: 1402,
                        title: "2-Dars. Asosiy devorlarni (wall) ko'tarish texnikasi",
                        completed: true,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/1emfvYVLCbc"
                    },
                    {
                        id: 1403,
                        title: "3-Dars. Oyna va eshiklar uchun joy ochish (ProBoolean)",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/nOxjZyJbw3g"
                    }
                ]
            },
            {
                title: "2-Modul. Amaliyot va Fasad modellash",
                lessons: [
                    {
                        id: 1404,
                        title: "4-Dars. Uy tomini (Roof) modellash usullari",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/s2eGI24X96w"
                    },
                    {
                        id: 1405,
                        title: "5-Dars. Fasad bezaklari, karniz va balkonlar",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/AHOFSmcz8bg"
                    },
                    {
                        id: 1406,
                        title: "Yakuniy amaliyot: 2 qavatli binoni to'liq modellashtirish",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            }
        ]
    }
];
`;

fs.writeFileSync('src/data.js', beforeMod + course4Content);
console.log("Course 4 reverted");
