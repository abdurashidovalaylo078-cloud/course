import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cube, Flag, RocketLaunch, VideoCamera, Users, Certificate, Briefcase, BookOpen, Star, User, X, Bell, CaretDown, GearSix, ChatsCircle, Globe } from '@phosphor-icons/react';
import AIAssistant from '../components/AIAssistant';

/* ═══════════════════ TRANSLATIONS ═══════════════════ */
const translations = {
    uz: {
        flag: '🇺🇿', name: "O'zbek",
        nav: { certs: "Sertifikatlar", chat: "Guruh Chat", settings: "Sozlamalar", profile: "Profil" },
        hero: {
            title: "Ijodkorlik olamiga birinchi qadamingizni qo'ying!",
            subtitle: "3D modellashtirish, animatsiya, o'yin dizayni, VFX va boshqa\nijodiy yo'nalishlarni o'rganmoqchimisiz?",
            btnRegister: "Ro'yxatdan o'tish",
            btnAbout: "Kurs Haqida",
        },
        courses: {
            title: "Bizning Kurslar",
            subtitle: "Eng ko'p talab qilinadigan yo'nalishlar bo'yicha professional ta'lim",
            lessons: "ta dars", modules: "ta modul", start: "Boshlash",
            badge1: "Yangi", badge2: "Top", badge3: "Pro",
            c1title: "3D Max Asoslari: Noldan Pro",
            c1desc: "Dasturni noldan o'rnatishdan boshlab murakkab interyerlarni vizualizatsiya qilishgacha bo'lgan barcha bilimlarni qamrab oladi.",
            c2title: "Interyer Vizualizatsiyasi (Corona)",
            c2desc: "Fotorealistik interyer vizualizatsiyasi sirlari va Corona Render'da yorug'lik hamda materiallar bilan ishlash chuqur o'rgatiladi.",
            c3title: "Eksteryer va Landshaft Dizayni",
            c3desc: "Katta bino va inshootlar, shuningdek mintaqa va xususiy bog'larni (landshaft) loyihalash bo'yicha maxsus darslar to'plami.",
        },
        features: {
            title: "Nega aynan 3D Max Pro?",
            subtitle: "Biz sizga eng tajribali ustozlar va zamonaviy o'quv dasturini taqdim etamiz.",
            f1title: "Sifatli darslar", f1desc: "Barcha darslar professional darajada tayyorlangan, amaliyotga asoslangan va tushunarli tilda yozib olingan.",
            f2title: "Kuchli hamjamiyat", f2desc: "Boshqa o'quvchilar va ustozlar bilan doimiy aloqada bo'ling, savollaringizga tezkor javob oling.",
            f3title: "Maxsus sertifikat", f3desc: "Kursni muvaffaqiyatli tugatganingizdan so'ng, bilimlaringizni tasdiqlovchi rasmiy sertifikatga ega bo'ling.",
            f4title: "Karyera uchun qadam", f4desc: "O'rganilgan bilimlar orqali real loyihalarda qatnashib, daromad topishni boshlash imkoniyati.",
        },
        register: {
            title: "Ro'yxatdan o'tish",
            warning: "Diqqat! Shaxsiy ma'lumotlaringizni pasportingizdagi kabi to'liq va aniq kiriting.",
            firstName: "Ism*", lastName: "Familiya*", middleName: "Sharifi*",
            selectDir: "Yo'nalishni tanlang*", selectRegion: "Yashash hududingizni tanlang",
            phone: "+998", email: "Pochta manzilingizni kiriting*",
            cancel: "Bekor qilish", submit: "Jo'natish",
            dir1: "3D Max Asoslari", dir2: "Interyer Vizualizatsiyasi", dir3: "Eksteryer va Landshaft Dizayni",
        },
        about: {
            title: "Kurs haqida ma'lumot",
            statStudents: "O'quvchi", statLessons: "Dars", statRating: "Reyting", statTeachers: "Ustoz",
            whoTitle: "🎯 Bu kurs kimlar uchun?",
            whoText: "Ushbu kurs 3D dizayn va vizualizatsiya olamiga yangi kirib kelayotganlar, shuningdek o'z mahoratini oshirmoqchi bo'lgan arxitektor, qurilish muhandisi va interyer dizaynerlar uchun mo'ljallangan.",
            modulesTitle: "📚 Kurs modullari",
            skillsTitle: "✅ Nimalarni o'rganasiz?",
            detailsTitle: "📋 Kurs tafsilotlari",
            ctaBtn: "🚀 Hoziroq Ro'yxatdan O'tish",
            detailRows: [
                { label: "Darslar soni", val: "120+ ta video dars" },
                { label: "Umumiy davomiyligi", val: "3–6 oy (o'z sur'atingizda)" },
                { label: "Daraja", val: "Boshlang'ich → Professional" },
                { label: "Til", val: "O'zbek tili" },
                { label: "Sertifikat", val: "Kurs yakunida taqdim etiladi ✅" },
            ],
            skills: ["3D Max interfeysi va tezkor menyu","Noldan interyer modellashtirish","Fotorealistik vizualizatsiya","Materiallar va UV mapping","HDRI va Studio yorug'lik","Corona Render professional sozlash","Eksteryer va fasad dizayni","Photoshop post-processing","Portfolio loyiha yaratish","Freelance va ish topish sirlari"],
            modules: [
                { n: "1-modul", t: "3D Max bilan tanishish", d: "10 dars · Interfeys, sozlamalar, asosiy buyruqlar" },
                { n: "2-modul", t: "Geometrik modellashtirish", d: "18 dars · Primitiv shakllar, Modify paneli, Boolean" },
                { n: "3-modul", t: "Interyer loyihalash", d: "25 dars · Xona dizayni, mebelь, devorlar, pollar" },
                { n: "4-modul", t: "Materiallar va teksturalar", d: "20 dars · Material Editor, UV mapping, procedural" },
                { n: "5-modul", t: "Yorug'lik va kamera", d: "15 dars · HDRI yorug'lik, VRay/Corona koerentligi" },
                { n: "6-modul", t: "Corona Render", d: "18 dars · Render sozlamalari, Denoise, Final output" },
                { n: "7-modul", t: "Eksteryer va landshaft", d: "14 dars · Bino fasadi, bog', suv yuzasi effektlari" },
            ],
        },
    },
    ru: {
        flag: '🇷🇺', name: "Русский",
        nav: { certs: "Сертификаты", chat: "Групп чат", settings: "Настройки", profile: "Профиль" },
        hero: {
            title: "Сделайте первый шаг в мир творчества!",
            subtitle: "Хотите изучить 3D-моделирование, анимацию,\nгеймдизайн, VFX и другие творческие направления?",
            btnRegister: "Зарегистрироваться",
            btnAbout: "О курсе",
        },
        courses: {
            title: "Наши курсы",
            subtitle: "Профессиональное образование по самым востребованным направлениям",
            lessons: " уроков", modules: " модулей", start: "Начать",
            badge1: "Новый", badge2: "Топ", badge3: "Про",
            c1title: "Основы 3D Max: с нуля до Pro",
            c1desc: "Охватывает все знания — от установки программы с нуля до визуализации сложных интерьеров.",
            c2title: "Визуализация интерьера (Corona)",
            c2desc: "Углублённое обучение секретам фотореалистичной визуализации интерьеров и работе со светом и материалами в Corona Render.",
            c3title: "Экстерьер и ландшафтный дизайн",
            c3desc: "Специальный набор уроков по проектированию крупных зданий, сооружений, а также ландшафтному дизайну.",
        },
        features: {
            title: "Почему именно 3D Max Pro?",
            subtitle: "Мы предоставляем вам опытных преподавателей и современную учебную программу.",
            f1title: "Качественные уроки", f1desc: "Все уроки подготовлены профессионально, ориентированы на практику и записаны на понятном языке.",
            f2title: "Сильное сообщество", f2desc: "Будьте в постоянном контакте с другими учениками и преподавателями, получайте быстрые ответы.",
            f3title: "Специальный сертификат", f3desc: "После успешного завершения курса вы получите официальный сертификат, подтверждающий ваши знания.",
            f4title: "Шаг к карьере", f4desc: "Участвуйте в реальных проектах с полученными знаниями и начните зарабатывать.",
        },
        register: {
            title: "Регистрация",
            warning: "Внимание! Введите свои личные данные полностью и точно, как в паспорте.",
            firstName: "Имя*", lastName: "Фамилия*", middleName: "Отчество*",
            selectDir: "Выберите направление*", selectRegion: "Выберите регион проживания",
            phone: "+998", email: "Введите адрес электронной почты*",
            cancel: "Отмена", submit: "Отправить",
            dir1: "Основы 3D Max", dir2: "Визуализация интерьера", dir3: "Экстерьер и ландшафтный дизайн",
        },
        about: {
            title: "Информация о курсе",
            statStudents: "Учеников", statLessons: "Уроков", statRating: "Рейтинг", statTeachers: "Преподов",
            whoTitle: "🎯 Для кого этот курс?",
            whoText: "Этот курс предназначен для новичков в мире 3D-дизайна и визуализации, а также для архитекторов, строительных инженеров и дизайнеров интерьеров, желающих повысить мастерство.",
            modulesTitle: "📚 Модули курса",
            skillsTitle: "✅ Чему вы научитесь?",
            detailsTitle: "📋 Детали курса",
            ctaBtn: "🚀 Зарегистрироваться сейчас",
            detailRows: [
                { label: "Количество уроков", val: "120+ видеоуроков" },
                { label: "Общая продолжительность", val: "3–6 месяцев (в своём темпе)" },
                { label: "Уровень", val: "Начальный → Профессиональный" },
                { label: "Язык", val: "Узбекский" },
                { label: "Сертификат", val: "Выдаётся по окончании курса ✅" },
            ],
            skills: ["Интерфейс 3D Max и быстрые меню","Моделирование интерьера с нуля","Фотореалистичная визуализация","Материалы и UV-маппинг","HDRI и студийное освещение","Профессиональная настройка Corona Render","Экстерьер и дизайн фасадов","Постобработка в Photoshop","Создание портфолио","Секреты фриланса и поиска работы"],
            modules: [
                { n: "Модуль 1", t: "Знакомство с 3D Max", d: "10 уроков · Интерфейс, настройки, основные команды" },
                { n: "Модуль 2", t: "Геометрическое моделирование", d: "18 уроков · Примитивы, панель Modify, Boolean" },
                { n: "Модуль 3", t: "Проектирование интерьера", d: "25 уроков · Дизайн комнаты, мебель, стены, полы" },
                { n: "Модуль 4", t: "Материалы и текстуры", d: "20 уроков · Material Editor, UV mapping, процедурные" },
                { n: "Модуль 5", t: "Освещение и камера", d: "15 уроков · HDRI освещение, VRay/Corona" },
                { n: "Модуль 6", t: "Corona Render", d: "18 уроков · Настройки рендера, Denoise, Final output" },
                { n: "Модуль 7", t: "Экстерьер и ландшафт", d: "14 уроков · Фасад здания, сад, эффекты воды" },
            ],
        },
    },
    en: {
        flag: '🇬🇧', name: "English",
        nav: { certs: "Certificates", chat: "Group Chat", settings: "Settings", profile: "Profile" },
        hero: {
            title: "Take your first step into the world of creativity!",
            subtitle: "Want to learn 3D modeling, animation,\ngame design, VFX and other creative fields?",
            btnRegister: "Register now",
            btnAbout: "About Course",
        },
        courses: {
            title: "Our Courses",
            subtitle: "Professional education in the most in-demand fields",
            lessons: " lessons", modules: " modules", start: "Start",
            badge1: "New", badge2: "Top", badge3: "Pro",
            c1title: "3D Max Basics: From Zero to Pro",
            c1desc: "Covers everything from installing the software from scratch to visualising complex interiors.",
            c2title: "Interior Visualization (Corona)",
            c2desc: "In-depth training in the secrets of photorealistic interior visualization and working with lights and materials in Corona Render.",
            c3title: "Exterior & Landscape Design",
            c3desc: "A special set of lessons on designing large buildings, structures and landscape design for private gardens.",
        },
        features: {
            title: "Why 3D Max Pro?",
            subtitle: "We provide you with experienced teachers and a modern curriculum.",
            f1title: "Quality lessons", f1desc: "All lessons are prepared professionally, practice-oriented and recorded in clear language.",
            f2title: "Strong community", f2desc: "Stay in constant contact with other students and teachers, get quick answers to your questions.",
            f3title: "Special certificate", f3desc: "After successfully completing the course, you will receive an official certificate confirming your knowledge.",
            f4title: "Step toward a career", f4desc: "Participate in real projects with the knowledge you've gained and start earning.",
        },
        register: {
            title: "Registration",
            warning: "Attention! Enter your personal data fully and accurately, as in your passport.",
            firstName: "First Name*", lastName: "Last Name*", middleName: "Middle Name*",
            selectDir: "Select direction*", selectRegion: "Select your region",
            phone: "+998", email: "Enter your email address*",
            cancel: "Cancel", submit: "Submit",
            dir1: "3D Max Basics", dir2: "Interior Visualization", dir3: "Exterior & Landscape Design",
        },
        about: {
            title: "Course Information",
            statStudents: "Students", statLessons: "Lessons", statRating: "Rating", statTeachers: "Teachers",
            whoTitle: "🎯 Who is this course for?",
            whoText: "This course is designed for newcomers to the world of 3D design and visualization, as well as architects, civil engineers and interior designers who want to improve their skills.",
            modulesTitle: "📚 Course modules",
            skillsTitle: "✅ What will you learn?",
            detailsTitle: "📋 Course details",
            ctaBtn: "🚀 Register Now",
            detailRows: [
                { label: "Number of lessons", val: "120+ video lessons" },
                { label: "Total duration", val: "3–6 months (at your own pace)" },
                { label: "Level", val: "Beginner → Professional" },
                { label: "Language", val: "Uzbek" },
                { label: "Certificate", val: "Provided upon course completion ✅" },
            ],
            skills: ["3D Max interface & quick menus","Interior modelling from scratch","Photorealistic visualization","Materials & UV mapping","HDRI & Studio lighting","Professional Corona Render setup","Exterior & facade design","Photoshop post-processing","Portfolio project creation","Freelance & job-finding tips"],
            modules: [
                { n: "Module 1", t: "Introduction to 3D Max", d: "10 lessons · Interface, settings, basic commands" },
                { n: "Module 2", t: "Geometric modelling", d: "18 lessons · Primitives, Modify panel, Boolean" },
                { n: "Module 3", t: "Interior design", d: "25 lessons · Room design, furniture, walls, floors" },
                { n: "Module 4", t: "Materials & textures", d: "20 lessons · Material Editor, UV mapping, procedural" },
                { n: "Module 5", t: "Lighting & camera", d: "15 lessons · HDRI lighting, VRay/Corona" },
                { n: "Module 6", t: "Corona Render", d: "18 lessons · Render settings, Denoise, Final output" },
                { n: "Module 7", t: "Exterior & landscape", d: "14 lessons · Building facade, garden, water effects" },
            ],
        },
    },
};

/* ═══════════════════ COMPONENT ═══════════════════ */
const Landing = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showAbout,    setShowAbout]    = useState(false);
    const [lang,         setLang]         = useState('uz');
    const [showLangMenu, setShowLangMenu] = useState(false);

    const t  = translations[lang];
    const tr = t.register;
    const ta = t.about;
    const tc = t.courses;
    const tf = t.features;

    return (
        <>
            {/* ── HEADER ── */}
            <header className="container header">
                <div className="logo">
                    <div className="logo-icon"><Cube weight="fill" /></div>
                    <span>3D Max Pro</span>
                </div>

                <div className="header-right">
                    <Link to="/app/certificates" className="lang-selector" style={{ textDecoration: 'none' }}>
                        <Certificate weight="fill" /> {t.nav.certs}
                    </Link>
                    <Link to="/app/chat" className="lang-selector" style={{ textDecoration: 'none' }}>
                        <ChatsCircle weight="fill" /> {t.nav.chat}
                    </Link>
                    <Link to="/app/settings" className="lang-selector" style={{ textDecoration: 'none' }}>
                        <GearSix weight="fill" /> {t.nav.settings}
                    </Link>

                    {/* Language switcher */}
                    <div style={{ position: 'relative' }}>
                        <div
                            className="lang-selector"
                            onClick={() => setShowLangMenu(v => !v)}
                            style={{ cursor: 'pointer', userSelect: 'none', gap: '6px' }}
                        >
                            <Globe weight="fill" />
                            <span>{t.name}</span>
                            <CaretDown size={14} style={{ transition: 'transform 0.2s', transform: showLangMenu ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </div>

                        {showLangMenu && (
                            <>
                                {/* backdrop */}
                                <div onClick={() => setShowLangMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 999 }} />
                                {/* dropdown */}
                                <div style={{
                                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                                    background: '#1a2035', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 12, overflow: 'hidden', zIndex: 1000,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)', minWidth: 160,
                                }}>
                                    {Object.entries(translations).map(([key, val]) => (
                                        <div key={key}
                                            onClick={() => { setLang(key); setShowLangMenu(false); }}
                                            style={{
                                                padding: '0.7rem 1.1rem',
                                                display: 'flex', alignItems: 'center', gap: 10,
                                                cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
                                                color: lang === key ? '#F59E0B' : '#D1D5DB',
                                                background: lang === key ? 'rgba(245,158,11,0.1)' : 'transparent',
                                                transition: 'background 0.15s',
                                            }}
                                            onMouseEnter={e => { if (lang !== key) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                            onMouseLeave={e => { if (lang !== key) e.currentTarget.style.background = 'transparent'; }}
                                        >
                                            <span style={{ fontSize: '1.3rem' }}>{val.flag}</span>
                                            {val.name}
                                            {lang === key && <span style={{ marginLeft: 'auto', fontSize: 12, color: '#F59E0B' }}>✓</span>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <Link to="/app" className="btn btn-primary">{t.nav.profile}</Link>
                </div>
            </header>

            {/* ── HERO ── */}
            <main className="container hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="highlight">{t.hero.title}</span>
                    </h1>
                    <p className="hero-subtitle">
                        {t.hero.subtitle.split('\n').map((line, i) => (
                            <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                        ))}
                    </p>
                    <div className="hero-buttons">
                        <button onClick={() => setShowRegister(true)} className="btn btn-white" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {t.hero.btnRegister} <RocketLaunch size={20} />
                        </button>
                        <button onClick={() => setShowAbout(true)} className="btn btn-outline" style={{ cursor: 'pointer', fontFamily: 'inherit' }}>
                            {t.hero.btnAbout} <Star size={20} color="#FBBF24" weight="fill" />
                        </button>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img 
                        src="/hero-3d.png" 
                        alt="Creative 3D Assets" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '500px', 
                            objectFit: 'contain', 
                            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))',
                            clipPath: 'inset(5px)'
                        }} 
                    />
                </div>
            </main>

            {/* ── COURSES ── */}
            <section className="container courses-section" id="kurslar" style={{ padding: '8rem 2rem 5rem', zIndex: 10, position: 'relative' }}>
                <div className="section-header">
                    <h2>{tc.title}</h2>
                    <p>{tc.subtitle}</p>
                </div>
                <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>

                    {/* Course 1 */}
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Star weight="fill" color="#FBBF24" /> {tc.badge1}
                            </div>
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234,88,12,0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>57{tc.lessons}</span>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234,88,12,0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>5{tc.modules}</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{tc.c1title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{tc.c1desc}</p>
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Alisher Uzoqov</span>
                                </div>
                                <Link to="/app" style={{ color: 'var(--color-accent)', fontWeight: 'bold', textDecoration: 'none' }}>{tc.start} →</Link>
                            </div>
                        </div>
                    </div>

                    {/* Course 2 */}
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <RocketLaunch weight="fill" color="#10B981" /> {tc.badge2}
                            </div>
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234,88,12,0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>33{tc.lessons}</span>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234,88,12,0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>4{tc.modules}</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{tc.c2title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{tc.c2desc}</p>
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>M</div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Malika Karimova</span>
                                </div>
                                <Link to="/app" style={{ color: 'var(--color-accent)', fontWeight: 'bold', textDecoration: 'none' }}>{tc.start} →</Link>
                            </div>
                        </div>
                    </div>

                    {/* Course 3 */}
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Briefcase weight="fill" color="#3B82F6" /> {tc.badge3}
                            </div>
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234,88,12,0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>28{tc.lessons}</span>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234,88,12,0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>4{tc.modules}</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{tc.c3title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{tc.c3desc}</p>
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>D</div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Davronbek</span>
                                </div>
                                <Link to="/app" style={{ color: 'var(--color-accent)', fontWeight: 'bold', textDecoration: 'none' }}>{tc.start} →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="container features-section" id="asosiy">
                <div className="section-header">
                    <h2>{tf.title}</h2>
                    <p>{tf.subtitle}</p>
                </div>
                <div className="features-grid">
                    {[
                        { icon: <VideoCamera weight="fill"/>, title: tf.f1title, desc: tf.f1desc },
                        { icon: <Users weight="fill"/>,       title: tf.f2title, desc: tf.f2desc },
                        { icon: <Certificate weight="fill"/>, title: tf.f3title, desc: tf.f3desc },
                        { icon: <Briefcase weight="fill"/>,   title: tf.f4title, desc: tf.f4desc },
                    ].map((f, i) => (
                        <div key={i} className="feature-card">
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="bg-shape shape-1" />
            <div className="bg-shape shape-2" />
            <AIAssistant />

            {/* ══════════ REGISTER MODAL ══════════ */}
            {showRegister && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', animation: 'fadeIn 0.2s ease-out' }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '650px', maxHeight: '95vh', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
                        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, background: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ background: '#F3F4F6', padding: '0.5rem', borderRadius: '10px', display: 'flex' }}><User color="#111827" weight="bold" size={22} /></div>
                                <h3 style={{ margin: 0, color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>{tr.title}</h3>
                            </div>
                            <button onClick={() => setShowRegister(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '0.2rem' }}>
                                <X size={24} weight="bold" />
                            </button>
                        </div>
                        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                            <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                <div style={{ marginTop: '0.1rem', flexShrink: 0 }}><Bell color="#D97706" weight="fill" size={20} /></div>
                                <p style={{ margin: 0, color: '#111827', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 }}>{tr.warning}</p>
                            </div>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                                    <input type="text" placeholder={tr.firstName} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500 }} />
                                    <input type="text" placeholder={tr.lastName}  style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500 }} />
                                </div>
                                <input type="text" placeholder={tr.middleName} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500 }} />
                                <div style={{ position: 'relative' }}>
                                    <select defaultValue="" style={{ appearance: 'none', padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#9CA3AF', width: '100%', outline: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500 }} onChange={e => e.target.style.color='#111827'}>
                                        <option value="" disabled>{tr.selectDir}</option>
                                        <option value="1">{tr.dir1}</option>
                                        <option value="2">{tr.dir2}</option>
                                        <option value="3">{tr.dir3}</option>
                                    </select>
                                    <CaretDown size={20} color="#6B7280" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <select defaultValue="" style={{ appearance: 'none', padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#9CA3AF', width: '100%', outline: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500 }} onChange={e => e.target.style.color='#111827'}>
                                        <option value="" disabled>{tr.selectRegion}</option>
                                        <option value="tashkent">Toshkent viloyati</option>
                                        <option value="samarkand">Samarqand viloyati</option>
                                        <option value="andijan">Andijon viloyati</option>
                                        <option value="fergana">Farg'ona viloyati</option>
                                    </select>
                                    <CaretDown size={20} color="#6B7280" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                </div>
                                <input type="text" placeholder="DD-MM-YYYY" style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500 }} onFocus={e => { e.target.type = 'date'; }} onBlur={e => { if (!e.target.value) e.target.type = 'text'; }} />
                                <input type="text" placeholder={tr.phone} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500 }} />
                                <input type="email" placeholder={tr.email} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500 }} />
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                                    <button onClick={e => { e.preventDefault(); setShowRegister(false); }} style={{ flex: 1, padding: '1.2rem', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        {tr.cancel}
                                    </button>
                                    <button onClick={e => { e.preventDefault(); setShowRegister(false); }} style={{ flex: 2, padding: '1.2rem', background: 'linear-gradient(135deg,#F59E0B,#EA580C)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        {tr.submit}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════ ABOUT MODAL ══════════ */}
            {showAbout && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', animation: 'fadeIn 0.2s ease-out' }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '600px', maxHeight: '95vh', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
                        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ background: '#FEF3C7', padding: '0.5rem', borderRadius: '10px', display: 'flex' }}><Star color="#D97706" weight="fill" size={22} /></div>
                                <h3 style={{ margin: 0, color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>{ta.title}</h3>
                            </div>
                            <button onClick={() => setShowAbout(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                                <X size={24} weight="bold" />
                            </button>
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1, color: '#4B5563', lineHeight: '1.6' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: 'linear-gradient(135deg,#1e1b4b,#312e81)', padding: '1.2rem 1.5rem', gap: '0.5rem', textAlign: 'center' }}>
                                {[
                                    { val: '1200+', label: ta.statStudents },
                                    { val: '120+',  label: ta.statLessons },
                                    { val: '4.9⭐', label: ta.statRating },
                                    { val: '3',     label: ta.statTeachers },
                                ].map((s, i) => (
                                    <div key={i}>
                                        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>{s.val}</div>
                                        <div style={{ color: '#a5b4fc', fontSize: '0.75rem' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.6rem' }}>{ta.whoTitle}</h4>
                                <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>{ta.whoText}</p>

                                <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.8rem' }}>{ta.modulesTitle}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                    {ta.modules.map((m, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.8rem 1rem', background: '#F9FAFB', borderRadius: '10px', border: '1px solid #F3F4F6', alignItems: 'flex-start' }}>
                                            <div style={{ background: 'linear-gradient(135deg,#F59E0B,#EA580C)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '30px', whiteSpace: 'nowrap', marginTop: '2px' }}>{m.n}</div>
                                            <div>
                                                <div style={{ color: '#111827', fontWeight: 600, fontSize: '0.9rem' }}>{m.t}</div>
                                                <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>{m.d}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.8rem' }}>{ta.skillsTitle}</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    {ta.skills.map((s, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#10B981', fontWeight: 700, flexShrink: 0 }}>✓</span>
                                            <span>{s}</span>
                                        </div>
                                    ))}
                                </div>

                                <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.8rem' }}>{ta.detailsTitle}</h4>
                                <div style={{ background: '#F9FAFB', borderRadius: '10px', border: '1px solid #F3F4F6', overflow: 'hidden', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    {ta.detailRows.map((row, i, arr) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 1rem', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, color: '#6B7280' }}>{row.label}</span>
                                            <span style={{ color: '#111827', fontWeight: 500, textAlign: 'right' }}>{row.val}</span>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => { setShowAbout(false); setShowRegister(true); }} style={{ width: '100%', padding: '1.1rem', background: 'linear-gradient(135deg,#F59E0B,#EA580C)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(245,158,11,0.4)', fontFamily: 'inherit' }}>
                                    {ta.ctaBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Landing;
