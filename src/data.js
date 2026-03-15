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
        totalLessons: 57,
        completedLessons: 7,
        thumbnail: "/3dmax_thumb.png",
        description: "Ushbu kursda siz 3D Max dasturini o'rnatishdan boshlab, murakkab interyerlarni vizualizatsiya qilishgacha o'rganasiz.",
        modules: [
            {
                title: "1-Modul. Kirish va Interfeys",
                lessons: [
                    {
                        id: 101,
                        title: "3D Max va V-Ray o'rnatish",
                        completed: true,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/9NmZNUSG1_E"
                    },
                    {
                        id: 102,
                        title: "3Ds Max | VIEWPORT lar bilan tanishish | UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ZsTmxKRbQew"
                    },
                    {
                        id: 103,
                        title: "3Ds Max | INTERFEYS qismini sozlash | UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/zSm6YKAYjco"
                    },
                    {
                        id: 104,
                        title: "3Ds Max | PRIMITIVE elementlarni hosil qilish | UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/oM4de1jTOFc"
                    },
                    {
                        id: 105,
                        title: "3Ds Max | SELECT, MOVE, ROTATE, SCALE | UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/0JzqsCxVgJo"
                    },
                    {
                        id: 106,
                        title: "3Ds Max | SELECT, MOVE, ROTATE, SCALE (2-qism) | UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/QplwibWqmjQ"
                    },
                    {
                        id: 107,
                        title: "3Ds Max | UNDO, REDO va AUTOBACK (Orqaga, Oldinga va Autoback) | UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ldxTE-hvDLA"
                    },
                    {
                        id: 108,
                        title: "3Ds Max I SAVE (faylni saqlash) turlari I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/KK9_Atg94O8"
                    },
                    {
                        id: 109,
                        title: "3Ds Max COPY  I  INSTANCE  I  REFERENCE I Update",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ZALaAluQlWA"
                    },
                    {
                        id: 110,
                        title: "3Ds Max Snaps (Magnitlar) I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/N3Mh41bxnc8"
                    },
                    {
                        id: 111,
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
                    {
                        id: 201,
                        title: "3Ds Max I Editable Poly va Editable Splinega konvert qilish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/8TbHQklYMts"
                    },
                    {
                        id: 202,
                        title: "3Ds Max I Editable Poly ning Selection bo'limi I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/9H1SCJNeS3Y"
                    },
                    {
                        id: 203,
                        title: "3Ds Max I Extrude (surib chiqarish) I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/nqWfTyTg3TM"
                    },
                    {
                        id: 204,
                        title: "3Ds Max I Connect, Cut, Quick slice, Slice plane I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/OMd3sLkoUDM"
                    },
                    {
                        id: 205,
                        title: "3Ds Max I Ortiqcha NUQTA va SEGMENT larni to'g'ri olib tashlash I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/Z6u5HLn2fqg"
                    },
                    {
                        id: 206,
                        title: "3Ds Max I NUQTA va SEGMENT larni ulash va bir-biridan ajratish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/4w2Ax9fZkMQ"
                    },
                    {
                        id: 207,
                        title: "3Ds MAx I Insert, Outline va Bevel I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/JomBusgVqlc"
                    },
                    {
                        id: 208,
                        title: "3Ds Max I Bridge va Chamfer I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/rfVdrUJ8rnE"
                    },
                    {
                        id: 209,
                        title: "3Ds Max I  Attach va Detach",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/Pv1LtVg-qCg"
                    },
                    {
                        id: 210,
                        title: "Uyga vazifa: Xona devorlarini ko'tarish",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            },
            {
                title: "3-Modul. Teksturalash va Materiallar",
                lessons: [
                    {
                        id: 301,
                        title: "3Ds Max I  Qo'shimcha dars",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/BgbEuLxIIIo"
                    },
                    {
                        id: 302,
                        title: "3Ds Max I Proboolean",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/nOxjZyJbw3g"
                    },
                    {
                        id: 303,
                        title: "3Ds Max I Pivot o'qlarini yo'nalishini o'zgartirish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/mipEdKoh8WE"
                    },
                    {
                        id: 304,
                        title: "3Ds Max I Import va Export I Update",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/kj16RAbNLL8"
                    },
                    {
                        id: 305,
                        title: "3Ds Max I  Obyektni boshqa bir yuzaga aniq va tez joylashtirish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/lEELlnAkrJE"
                    },
                    {
                        id: 306,
                        title: "3Ds Max I Mirror (aksini o'girish) I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/fDRJp6zrTlo"
                    },
                    {
                        id: 307,
                        title: "3Ds Max I Array I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/zjlQ6DVUfQM"
                    },
                    {
                        id: 308,
                        title: "3Ds Max I Use pivot point center I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/vowkuuZEte0"
                    },
                    {
                        id: 309,
                        title: "3Ds Max I Align, Quick align va Normal align I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/6PrCqzRwnnA"
                    },
                    {
                        id: 310,
                        title: "3Ds Max I Spline hozil qilish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ExkQg-IOPqk"
                    },
                    {
                        id: 311,
                        title: "Uyga vazifa: Xona interyeri materiallari",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            },
            {
                title: "4-Modul. Yoritish va Kamera",
                lessons: [
                    {
                        id: 401,
                        title: "3Ds Max I Outline I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/sTIOEleh6Qo"
                    },
                    {
                        id: 402,
                        title: "3Ds Max I Splinedagi nuqtalarning turlari I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/R6ya299wP3k"
                    },
                    {
                        id: 403,
                        title: "3Ds Max I Linega qo'shimcha nuqtalar qo'shish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/0OU1uVpWZ6o"
                    },
                    {
                        id: 404,
                        title: "3Ds Max I Splinedagi Chamfer va Filled I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/JBM_ZapEjCQ"
                    },
                    {
                        id: 405,
                        title: "3Ds Max I  Modifikatorlar nima ? I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/glOshtPPjHs"
                    },
                    {
                        id: 406,
                        title: "3Ds Max I  Edit Poly Modifikatori I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/Kuf_B3oynXE"
                    },
                    {
                        id: 407,
                        title: "3Ds Max I  Extrude  I  UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/dVT1QXkRMGA"
                    },
                    {
                        id: 408,
                        title: "3Ds Max I Shell Modifikatori I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/xPc4BDkzdnI"
                    },
                    {
                        id: 409,
                        title: "3Ds Max I  Sweep  I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/V4HW_yoIXCg"
                    },
                    {
                        id: 410,
                        title: "3Ds Max I  Sweep dagi xatoliklar I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/Uj1NoedmPcs"
                    }
                ]
            },
            {
                title: "5-Modul. Render va Post-ishlov",
                lessons: [
                    {
                        id: 501,
                        title: "3Ds Max  I  Bevel Profile  I  UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/BAVQbOnG1q0"
                    },
                    {
                        id: 502,
                        title: "3Ds Max I  Bevel Profile 2 I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/7eB6SGfHvH4"
                    },
                    {
                        id: 503,
                        title: "3Ds Max I Lathe modifikatori I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/KNHnUlbQeEo"
                    },
                    {
                        id: 504,
                        title: "3Ds Max I FFD modifikatori I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/s6HpFLU_kwc"
                    },
                    {
                        id: 505,
                        title: "3Ds Max I  Symmetry  I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/AGQDWMkOKfg"
                    },
                    {
                        id: 506,
                        title: "3Ds Max I AutoCad yordamida PDF dan DWG ga import qilish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ItTdePugJsU"
                    },
                    {
                        id: 507,
                        title: "3Ds Max I  DWG plan yordamida Devor ko'tarish I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/e6Mi3qXzoxU"
                    },
                    {
                        id: 508,
                        title: "3Ds Max I JPEG chizma yordamida devor ko'tarish  I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/EMf-4eUFBMg"
                    },
                    {
                        id: 509,
                        title: "3Ds Max I  Interfeysni sozlash 2  I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/CjCXekM4_IQ"
                    },
                    {
                        id: 510,
                        title: "3Ds Max I  Floor Generator  I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/B0qtQR2t9SM"
                    },
                    {
                        id: 511,
                        title: "3Ds Max I Relink Bitmap, Sweep Profile, Copy Paste I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/xeZeF6wJ4pM"
                    },
                    {
                        id: 512,
                        title: "3Ds Max  I  Interior Modeling  I UPDATE",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/8ibSxJ2cYU4"
                    },
                    {
                        id: 513,
                        title: "3Ds Max da No'ldan Interyer Vizualizatsiya qilish I  3Ds Max + Corona Render",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/kowD1lC67eg"
                    },
                    {
                        id: 514,
                        title: "3Ds Max I Oshxona mebelini yasash (Kitchen Modeling)",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/QvRIiM7Vukw"
                    },
                    {
                        id: 515,
                        title: "Yakuniy loyiha: To'liq interyer",
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
    },
    {
        id: 2,
        title: "Interyer Vizualizatsiyasi (Corona Render)",
        instructor: "Malika Karimova",
        progress: 0,
        totalLessons: 33,
        completedLessons: 0,
        thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
        description: "Fotorealistik interyer vizualizatsiyasi sirlari.",
        modules: [
            {
                title: "1-Modul. Yorug'lik (Corona Lights)",
                lessons: [
                    {
                        id: 601,
                        title: "3D MAX Interyer. 1-dars. Kirish va corona render haqida",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/FXG1rTKkrWs"
                    },
                    {
                        id: 602,
                        title: "3D MAX Interyer. 2-dars. Autocad. Faylni import qilish",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/DXbZVgh4e64"
                    },
                    {
                        id: 603,
                        title: "3D MAX Interyer. 3-dars. Modeling. (Xonani modellashtirish) 1-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/1emfvYVLCbc"
                    },
                    {
                        id: 604,
                        title: "3D MAX Interyer. 4-dars. Modeling. 2-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/s2eGI24X96w"
                    },
                    {
                        id: 605,
                        title: "3D MAX Interyer. 5-dars. Modeling. 3-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/POWgY50lpf0"
                    },
                    {
                        id: 606,
                        title: "3D MAX Interyer. 6-dars. Modeling. 4-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/jRA-BB91ad4"
                    },
                    {
                        id: 607,
                        title: "3D MAX Interyer. 7-dars. Modeling. 5-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/p6tT9-jP_uw"
                    },
                    {
                        id: 608,
                        title: "3D MAX Interyer. 8-dars. Modeling. 6-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/5DmNktpMw-g"
                    },
                    {
                        id: 609,
                        title: "Uyga vazifa: Yoritish sxemasi",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            },
            {
                title: "2-Modul. Materiallar",
                lessons: [
                    {
                        id: 701,
                        title: "3D MAX Interyer. 9-dars. Modeling. 7-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/mhQ8nromKQw"
                    },
                    {
                        id: 702,
                        title: "3D MAX Interyer. 10-dars. Modeling. 8-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/MYE7YmQDTwA"
                    },
                    {
                        id: 703,
                        title: "3D MAX Interyer. 11-dars. Modeling. 9-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/VfBX9SJetx8"
                    },
                    {
                        id: 704,
                        title: "3D MAX Interyer. 12-dars. Modeling. 10-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/5iICQJrvQGQ"
                    },
                    {
                        id: 705,
                        title: "3D MAX Interyer. 13-dars. Modellar optimizatsiyasi",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/BcnFq1lTCY8"
                    },
                    {
                        id: 706,
                        title: "3D MAX Interyer. 14-dars. Yorug'lik (Lighting). 1-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/lk_SZdRWRIo"
                    },
                    {
                        id: 707,
                        title: "3D MAX Interyer. 15-dars. Yorug'lik (Lighting). 2-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/H5fj-RgRgXo"
                    },
                    {
                        id: 708,
                        title: "3D MAX Interyer. 16-dars. Yorug'lik (Lighting). 3-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/FbHgtLeOj_4"
                    },
                    {
                        id: 709,
                        title: "Uyga vazifa: Material yaratish",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            },
            {
                title: "3-Modul. Render Sozlamalari",
                lessons: [
                    {
                        id: 801,
                        title: "3D MAX Interyer. 17-dars. Yorug'lik (Lighting). 4-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/fEKwJYwvlvU"
                    },
                    {
                        id: 802,
                        title: "3D MAX Interyer. 18-dars. Shading (Materiallar) oyna, xrom, tilla",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/avD14XbrHeo"
                    },
                    {
                        id: 803,
                        title: "3D MAX Interyer. 19-dars. Teksturalar haqida",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/RZVAmBlNAvM"
                    },
                    {
                        id: 804,
                        title: "3D MAX Interyer. 20-dars. Shading. Devor, lightmatte, mato, charm, g'isht",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/BOPG1jjUlHc"
                    },
                    {
                        id: 805,
                        title: "3D MAX Interyer. 21-dars. Shading. Opacity, milti sub, blend material",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/z-WB9jrVi-g"
                    },
                    {
                        id: 806,
                        title: "3D MAX Interyer. 22-dars. Shading. Corona AO, wood material",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/5ljSmwAd2N4"
                    },
                    {
                        id: 807,
                        title: "3D MAX Interyer. 23-dars. Tayyor materiallar",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/6LK3hlNgKwI"
                    },
                    {
                        id: 808,
                        title: "Yakuniy loyiha: Premium interyer",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            },
            {
                title: "4-Modul. Animatsiya va Walkthrough",
                lessons: [
                    {
                        id: 901,
                        title: "3D MAX Interyer. 24-dars. Interyer materiallari-1",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/G3zUd50PtxE"
                    },
                    {
                        id: 902,
                        title: "3D MAX Interyer. 25-dars. Interyer materiallari-2",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/E1kiN6IyRlc"
                    },
                    {
                        id: 903,
                        title: "3D MAX Interyer. 26-dars. Interyer materiallari-3",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/mZoHPplfuqY"
                    },
                    {
                        id: 904,
                        title: "3D MAX Interyer. 27-dars. Interyer materiallari-4",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/cOc4gwwzeZo"
                    },
                    {
                        id: 905,
                        title: "3D MAX Interyer. 28-dars. Render-1",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/w55UDLOq70c"
                    },
                    {
                        id: 906,
                        title: "3D MAX Interyer. 29-dars. Render-2",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/nIj8ayNOm6s"
                    },
                    {
                        id: 907,
                        title: "3D MAX Interyer. 30-dars. Post production",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/L77fpbeGV68"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Eksteryer va Landshaft Dizayni",
        instructor: "Davronbek",
        progress: 0,
        totalLessons: 33,
        completedLessons: 0,
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        description: "Katta binolar va bog'larni loyihalash.",
        modules: [
            {
                title: "1-Modul. Landscape Asoslari",
                lessons: [
                    {
                        id: 701,
                        title: "3D MAX Eksteryer. 1-dars. Autocaddan import va maxstart",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/zOlTy-8XBJc"
                    },
                    {
                        id: 702,
                        title: "3D MAX Eksteryer. 2-dars. Modeling. 1-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/T9-5KT1l3Zc"
                    },
                    {
                        id: 703,
                        title: "3D MAX Eksteryer. 3-dars. Modelling. 2-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/nDGDoJYE9o4"
                    },
                    {
                        id: 704,
                        title: "3D MAX Eksteryer. 4-dars. Modeling. 3-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/9GW78gw4Ezo"
                    },
                    {
                        id: 705,
                        title: "3D MAX Eksteryer. 5-dars. Modeling. 4-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/1BfNtmWXQrU"
                    },
                    {
                        id: 706,
                        title: "3D MAX Eksteryer. 6-dars. Modeling. 5-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/8HT1uKZIGuI"
                    },
                    {
                        id: 707,
                        title: "3D MAX Eksteryer. 7-dars. Modeling. 6-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/AHOFSmcz8bg"
                    },
                    {
                        id: 708,
                        title: "3D MAX Eksteryer. 8-dars. Modeling. 7-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/d-dBJyOMYeE"
                    },
                    {
                        id: 709,
                        title: "Uyga vazifa: Bog' loyihasi",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            },
            {
                title: "2-Modul. Eksteryer Vizualizatsiyasi",
                lessons: [
                    {
                        id: 801,
                        title: "3D MAX Eksteryer. 9-dars. Modeling. 8-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/catsRB5Twmo"
                    },
                    {
                        id: 802,
                        title: "3D MAX Eksteryer. 10-dars. Modeling. 9-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/TH6OYbQpaU4"
                    },
                    {
                        id: 803,
                        title: "3D MAX Eksteryer. 11-dars. Modeling. 10-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/0WqavsbwDZY"
                    },
                    {
                        id: 804,
                        title: "3D MAX Eksteryer. 12-dars. Modeling. 11-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/HQv5BGJkfbk"
                    },
                    {
                        id: 805,
                        title: "3D MAX Eksteryer. 13-dars. Modeling. 12-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/-kP7qwczLD4"
                    },
                    {
                        id: 806,
                        title: "3D MAX Eksteryer. 14-dars. Modeling. 13-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/FMcB5OdTxlY"
                    },
                    {
                        id: 807,
                        title: "3D MAX Eksteryer. 15-dars. Modeling. 14-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/PyRqcWOSAvI"
                    },
                    {
                        id: 808,
                        title: "3D MAX Eksteryer. 16-dars. Modeling. 15-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/f9Td4zAolBE"
                    }
                ]
            },
            {
                title: "3-Modul. Bino Fasadi va Detallar",
                lessons: [
                    {
                        id: 901,
                        title: "3D MAX Eksteryer. 17-dars. Modeling. 16-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/aCeyrM66r-A"
                    },
                    {
                        id: 902,
                        title: "3D MAX Eksteryer. 18-dars. Modeling. 17-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/YPhpPa62khA"
                    },
                    {
                        id: 903,
                        title: "3D MAX Eksteryer. 19-dars. Modeling. 18-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/EKSszBSEMWs"
                    },
                    {
                        id: 904,
                        title: "3D MAX Eksteryer. 20-dars. Modeling. 19-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/N1LueopuI0A"
                    },
                    {
                        id: 905,
                        title: "3D MAX Eksteryer. 21-dars. Lightning. 1-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ILXtQgBDZtw"
                    },
                    {
                        id: 906,
                        title: "3D MAX Eksteryer. 22-dars. Lightning. 2-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/rtsYN2R5HcE"
                    },
                    {
                        id: 907,
                        title: "3D MAX Eksteryer. 23-dars. Lightning. 3-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/Y3jBuoUFzWM"
                    },
                    {
                        id: 908,
                        title: "Amaliy ish: Kottej vizualizatsiyasi",
                        completed: false,
                        type: "homework",
                        status: "pending",
                        reviewStatus: "not_checked",
                        reviewGrade: null,
                        reviewComment: null
                    }
                ]
            },
            {
                title: "4-Modul. Aerial va Panorama",
                lessons: [
                    {
                        id: 1001,
                        title: "3D MAX Eksteryer. 24-dars. Shading. 1-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/tZVEon4_0uA"
                    },
                    {
                        id: 1002,
                        title: "3D MAX Eksteryer. 25-dars. Shading. 2-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/JCAUcQdUElg"
                    },
                    {
                        id: 1003,
                        title: "3D MAX Eksteryer. 26-dars. Shading. 3-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/zoPTv-DPFWc"
                    },
                    {
                        id: 1004,
                        title: "3D MAX Eksteryer. 27-dars. Shading. 4-qism.",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/I0jORBqEq04"
                    },
                    {
                        id: 1005,
                        title: "3D MAX Eksteryer. 28-dars. Render. 1-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/XCCqZbV4OOM"
                    },
                    {
                        id: 1006,
                        title: "3D MAX Eksteryer. 29-dars. Render. 2-qism",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/SbUVoDDmM1I"
                    },
                    {
                        id: 1007,
                        title: "3D MAX Eksteryer. 30-dars. Post production",
                        completed: false,
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/O38prUYKX_g"
                    },
                    {
                        id: 1008,
                        title: "Yakuniy loyiha: Ko'p qavatli bino",
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
        {
            id: 1,
            name: "3D Max General",
            type: "group",
            unread: 3,
            avatar: "https://ui-avatars.com/api/?name=3D+Max&background=random"
        },
        {
            id: 2,
            name: "Interyer Dizayni",
            type: "group",
            unread: 0,
            avatar: "https://ui-avatars.com/api/?name=Interyer&background=random"
        },
        {
            id: 3,
            name: "Alisher Uzoqov (Mentor)",
            type: "direct",
            unread: 1,
            avatar: "https://ui-avatars.com/api/?name=Alisher+Uzoqov&background=0D8ABC&color=fff"
        }
    ],
    messages: [
        {
            id: 1,
            sender: "Alisher Uzoqov",
            text: "Hammaga salom! Yangi dars yuklandi.",
            time: "10:30",
            isMe: false
        },
        {
            id: 2,
            sender: "Olimjon Sobirov",
            text: "Rahmat ustoz, ko'rib chiqaman.",
            time: "10:32",
            isMe: true
        },
        {
            id: 3,
            sender: "Malika Karimova",
            text: "Uyga vazifani qayerga yuklaymiz?",
            time: "10:35",
            isMe: false
        },
        {
            id: 4,
            sender: "Alisher Uzoqov",
            text: "Har bir darsning pastki qismida maxsus oynaga.",
            time: "10:36",
            isMe: false
        }
    ]
};

export { currentUser, coursesData, certificatesData, chatData };
