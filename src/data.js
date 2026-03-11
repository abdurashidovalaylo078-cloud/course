// Mock Data for User
const currentUser = {
    name: "Olimjon Sobirov",
    role: "Talaba",
    avatar: "https://ui-avatars.com/api/?name=Olimjon+Sobirov&background=F59E0B&color=fff"
};

// Course Data with Lessons
const coursesData = [
    {
        id: 1,
        title: "3D Max Asoslari: Noldan Pro darajasigacha",
        instructor: "Alisher Uzoqov",
        progress: 15,
        totalLessons: 28,
        completedLessons: 7,
        thumbnail: "https://images.unsplash.com/photo-1626075908678-f7b539c32f81?q=80&w=1000&auto=format&fit=crop",
        description: "Ushbu kursda siz 3D Max dasturini o'rnatishdan boshlab, murakkab interyerlarni vizualizatsiya qilishgacha o'rganasiz.",
        modules: [
            {
                title: "1-Modul. Kirish va Interfeys",
                lessons: [
                    { id: 101, title: "3D Max va V-Ray o'rnatish", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/9NmZNUSG1_E" },
                    { id: 102, title: "Interfeys bilan tanishuv", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/nkjDoWXD4ZM" },
                    { id: 103, title: "Viewport navigatsiyasi", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/pnqOa_MerWM?si=y7AAHWmqRoGJ8EN-" },
                    { id: 104, title: "Obyektlarni yaratish va o'zgartirish", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/9qtlX5_Okds?si=ngaX9xiTR-Xx9Orq" },
                    {
                        id: 105,
                        title: "Uyga vazifa: Oddiy stol yasash",
                        completed: true,
                        type: "homework",
                        status: "submitted",
                        reviewStatus: "checked",
                        reviewGrade: "A",
                        reviewComment: "Ajoyib ish! Stol nisbatlari to'g'ri, modellash sifatli bajarilgan.",
                        criteria: [
                            "Stol oyoqlari va ustki qismi nisbatlari to'g'ri bo'lishi",
                            "Editable Poly modifikatoridan to'g'ri foydalanilganligi",
                            "Modelda ortiqcha polygon va vertexlar yo'qligi",
                            "Chamfer modifikatori orqali qirralarga ishlov berilganligi"
                        ]
                    }
                ]
            },
            {
                title: "2-Modul. Modellashtirish Asoslari",
                lessons: [
                    { id: 201, title: "Editable Poly modifikatori", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/9H1SCJNeS3Y?si=3RkGgCDzBeAa9iDb" },
                    { id: 202, title: "Spline modellashtirish", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/apbzpfyk7SE?si=UTl__tAUWrnawpQA" },
                    { id: 203, title: "Modifierlar steck'i bilan ishlash", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/qiLRXERyXA0" },
                    { id: 204, title: "Boolean operatsiyalar", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/ID8-eEozNGg?si=juhvQC7HFa6QQ3VK" },
                    { id: 205, title: "Uyga vazifa: Xona devorlarini ko'tarish", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            },
            {
                title: "3-Modul. Teksturalash va Materiallar",
                lessons: [
                    { id: 301, title: "Material Editor bilan ishlash", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/VsH5SBo5UoY" },
                    { id: 302, title: "UVW Map va teksturalar", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/qiLRXERyXA0" },
                    { id: 303, title: "Bitmaps va procedural teksturalar", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/hFqoPbCDMF8" },
                    { id: 304, title: "Shisha va metall materiallar", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/wmF3iDIBVME" },
                    { id: 305, title: "Uyga vazifa: Xona interyeri materiallari", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            },
            {
                title: "4-Modul. Yoritish va Kamera",
                lessons: [
                    { id: 401, title: "Standart yorug'lik manbalari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/M_bMnvJAqIw" },
                    { id: 402, title: "V-Ray yoritish asoslari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/TsolN2DWJOA" },
                    { id: 403, title: "Kamera sozlamalari va kompozitsiya", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/9NmZNUSG1_E" },
                    { id: 404, title: "DOF (Depth of Field) effekti", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/YOiMoECgDTQ" }
                ]
            },
            {
                title: "5-Modul. Render va Post-ishlov",
                lessons: [
                    { id: 501, title: "V-Ray Render sozlamalari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/VsH5SBo5UoY" },
                    { id: 502, title: "Render Elements bilan ishlash", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/m-J_OILNBQY" },
                    { id: 503, title: "Photoshop da post-ishlov", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/hFqoPbCDMF8" },
                    { id: 504, title: "Yakuniy loyiha: To'liq interyer", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Interyer Vizualizatsiyasi (Corona Render)",
        instructor: "Malika Karimova",
        progress: 0,
        totalLessons: 22,
        completedLessons: 0,
        thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
        description: "Fotorealistik interyer vizualizatsiyasi sirlari.",
        modules: [
            {
                title: "1-Modul. Yorug'lik (Corona Lights)",
                lessons: [
                    { id: 601, title: "Corona Sun va Sky sozlamalari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/WevQn4R_3GU" },
                    { id: 602, title: "HDRI xaritalar bilan ishlash", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/W6EbCGHKhCY" },
                    { id: 603, title: "Sun'iy yorug'lik manbalari (IES)", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/U8oCXkV-_AI" },
                    { id: 604, title: "Portals va Volume yorug'lik", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/WevQn4R_3GU" },
                    { id: 605, title: "Uyga vazifa: Yoritish sxemasi", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            },
            {
                title: "2-Modul. Materiallar",
                lessons: [
                    { id: 606, title: "Corona Material asoslari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/a7BRXqBgH-E" },
                    { id: 607, title: "Murakkab matolar va teksturalar", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/SfEJZCaD2g4" },
                    { id: 608, title: "Shaffof va aks ettiruvchi materiallar", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/a7BRXqBgH-E" },
                    { id: 609, title: "Yog'och va tosh teksturalari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/SfEJZCaD2g4" },
                    { id: 610, title: "Uyga vazifa: Material yaratish", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            },
            {
                title: "3-Modul. Render Sozlamalari",
                lessons: [
                    { id: 611, title: "Corona Render Setup va Denoising", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/1I4FSfpF9ls" },
                    { id: 612, title: "LightMix bilan ishlash", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/oRbKBMTiKS8" },
                    { id: 613, title: "Corona Bloom va Glare effektlari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/1I4FSfpF9ls" },
                    { id: 614, title: "Yakuniy render va post-ishlov", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/oRbKBMTiKS8" },
                    { id: 615, title: "Yakuniy loyiha: Premium interyer", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            },
            {
                title: "4-Modul. Animatsiya va Walkthrough",
                lessons: [
                    { id: 616, title: "Kamera animatsiyasi asoslari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/W6EbCGHKhCY" },
                    { id: 617, title: "Interyer walkthrough animatsiyasi", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/U8oCXkV-_AI" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Eksteryer va Landshaft Dizayni",
        instructor: "Davronbek",
        progress: 0,
        totalLessons: 24,
        completedLessons: 0,
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        description: "Katta binolar va bog'larni loyihalash.",
        modules: [
            {
                title: "1-Modul. Landscape Asoslari",
                lessons: [
                    { id: 701, title: "Relyef va terrain yaratish", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/bHIkXJn4jJc" },
                    { id: 702, title: "O'simliklar va daraxtlar (Forest Pack)", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/Nk8pObrm7Ro" },
                    { id: 703, title: "Suv havzalari va favvoralar", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/DHB4xkhrffc" },
                    { id: 704, title: "Yo'llar va piyodalar yo'laklari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/bHIkXJn4jJc" },
                    { id: 705, title: "Uyga vazifa: Bog' loyihasi", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            },
            {
                title: "2-Modul. Eksteryer Vizualizatsiyasi",
                lessons: [
                    { id: 706, title: "Eksteryer yoritish (Kunduzgi)", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/kqz01_hLc0Q" },
                    { id: 707, title: "Eksteryer yoritish (Tungi)", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/O1mhBYQhFRQ" },
                    { id: 708, title: "Bulutli ob-havo simulyatsiyasi", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/kqz01_hLc0Q" },
                    { id: 709, title: "Atmosfera va tuman effektlari", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/O1mhBYQhFRQ" }
                ]
            },
            {
                title: "3-Modul. Bino Fasadi va Detallar",
                lessons: [
                    { id: 710, title: "Bino fasadini modellash", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/Nk8pObrm7Ro" },
                    { id: 711, title: "Deraza va eshiklarni qo'shish", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/DHB4xkhrffc" },
                    { id: 712, title: "Arxitektura detallarini ishlov berish", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/bHIkXJn4jJc" },
                    { id: 713, title: "Amaliy ish: Kottej vizualizatsiyasi", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            },
            {
                title: "4-Modul. Aerial va Panorama",
                lessons: [
                    { id: 714, title: "Aerial (yuqoridan) ko'rinish", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/kqz01_hLc0Q" },
                    { id: 715, title: "360° panorama render", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/O1mhBYQhFRQ" },
                    { id: 716, title: "Yakuniy loyiha: Ko'p qavatli bino", completed: false, type: "homework", status: "pending", reviewStatus: "not_checked", reviewGrade: null, reviewComment: null }
                ]
            }
        ]
    }
];

// Certificates Data
const certificatesData = [
    {
        id: 1,
        title: "3D Max Basic Course",
        issueDate: "2023-12-10",
        url: "#"
    }
];

// Chat Data
const chatData = {
    groups: [
        { id: 1, name: "3D Max General", type: "group", unread: 3, avatar: "https://ui-avatars.com/api/?name=3D+Max&background=random" },
        { id: 2, name: "Interyer Dizayni", type: "group", unread: 0, avatar: "https://ui-avatars.com/api/?name=Interyer&background=random" },
        { id: 3, name: "Alisher Uzoqov (Mentor)", type: "direct", unread: 1, avatar: "https://ui-avatars.com/api/?name=Alisher+Uzoqov&background=0D8ABC&color=fff" }
    ],
    messages: [
        { id: 1, sender: "Alisher Uzoqov", text: "Hammaga salom! Yangi dars yuklandi.", time: "10:30", isMe: false },
        { id: 2, sender: "Olimjon Sobirov", text: "Rahmat ustoz, ko'rib chiqaman.", time: "10:32", isMe: true },
        { id: 3, sender: "Malika Karimova", text: "Uyga vazifani qayerga yuklaymiz?", time: "10:35", isMe: false },
        { id: 4, sender: "Alisher Uzoqov", text: "Har bir darsning pastki qismida maxsus oynaga.", time: "10:36", isMe: false }
    ]
};

export { currentUser, coursesData, certificatesData, chatData };
