import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Play,
    CheckCircle,
    Lock,
    Monitor,
    FileText,
    ChatCircleDots,
    CaretRight,
    SealCheck,
    Sparkle,
    Trophy,
    X,
    Folder,
    PencilLine,
    ArrowLeft,
    Check,
    Quotes,
    Clock,
    PaperPlaneTilt,
    ArrowClockwise,
    UploadSimple,
    FileZip,
    DownloadSimple,
    PlayCircle,
    FileArrowUp,
    BookBookmark,
    CheckSquare
} from '@phosphor-icons/react';
import { coursesData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import '../styles/CoursePlayer.css';

const currentUser = { name: "Abdurashidova Laylo" }; // Mock user for now

const CongratsModal = ({ setShowCongrats, navigate, showCongrats }) => (
    <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.3s ease-out'
    }}>
        <div className="CongratsModal-content" style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
            width: '90%',
            maxWidth: '500px',
            borderRadius: '24px',
            padding: '3rem 2rem',
            position: 'relative',
            textAlign: 'center',
            border: '1px solid rgba(245,158,11,0.3)',
            boxShadow: '0 25px 50px -12px rgba(245,158,11,0.25)',
            overflow: 'hidden'
        }}>
            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: 'rgba(245,158,11,0.15)', filter: 'blur(60px)', borderRadius: '50%' }}></div>

            {/* Close Button */}
            <button
                onClick={() => setShowCongrats(false)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
                <X size={20} />
            </button>

            <div style={{ position: 'relative' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #F59E0B, #d97706)',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 15px 35px rgba(245,158,11,0.4)',
                    transform: 'rotate(-5deg)'
                }}>
                    <Trophy size={50} weight="fill" color="#fff" />
                </div>

                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.8rem', background: 'linear-gradient(to bottom, #fff, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Super! Tabriklaymiz!
                </h2>

                <p style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>
                    {currentUser.name}, siz kursni muvaffaqiyatli yakunladingiz!
                </p>

                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                    Siz o'z mahoratingizni isbotladingiz. Endi o'z yutuqlaringizni tasdiqlovchi sertifikatni yuklab olishingiz mumkin.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={() => {
                            setShowCongrats(false);
                            navigate('/app/certificates');
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #F59E0B, #d97706)',
                            color: '#000',
                            border: 'none',
                            padding: '1.2rem',
                            borderRadius: '14px',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            boxShadow: '0 10px 20px rgba(245,158,11,0.2)'
                        }}
                    >
                        <SealCheck weight="fill" size={24} /> Sertifikatni yuklab olish
                    </button>

                    <button
                        onClick={() => setShowCongrats(false)}
                        style={{
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '1rem',
                            borderRadius: '14px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Keyinroq
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const CoursePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    
    // Original course finding logic
    const initialCourse = (() => {
        const course = coursesData.find(c => c.id === parseInt(id));
        if (course) {
            course.totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            return course;
        }
        return null;
    })();
    const firstLesson = initialCourse?.modules.find(m => m.lessons.length > 0)?.lessons[0];

    // State management
    const [courseState, setCourseState] = useState(() => {
        const saved = localStorage.getItem(`course_progress_${id}`);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // ALWAYS RECALCULATE totalLessons to prevent mismatch bugs
                parsed.totalLessons = parsed.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                return parsed;
            } catch (e) {
                console.error("Error parsing saved course progress:", e);
            }
        }
        return initialCourse;
    });
    const [activeLesson, setActiveLesson] = useState(() => {
        const savedActiveId = localStorage.getItem(`course_active_lesson_${id}`);
        if (savedActiveId && courseState) {
            for (const module of courseState.modules) {
                const lesson = module.lessons.find(l => l.id === parseInt(savedActiveId));
                if (lesson) return lesson;
            }
        }
        
        // Default to first incomplete lesson
        if (courseState) {
            for (const module of courseState.modules) {
                const incomplete = module.lessons.find(l => !l.completed);
                if (incomplete) return incomplete;
            }
        }
        return firstLesson;
    });

    const [showCongrats, setShowCongrats] = useState(false);
    const [isFloating, setIsFloating] = useState(false);
    
    // Homework local states
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showReuploader, setShowReuploader] = useState(false);
    const [activeTab, setActiveTab] = useState('about');

    // Persistence
    useEffect(() => {
        if (courseState) {
            localStorage.setItem(`course_progress_${id}`, JSON.stringify(courseState));
        }
    }, [courseState, id]);

    useEffect(() => {
        if (activeLesson) {
            localStorage.setItem(`course_active_lesson_${id}`, activeLesson.id.toString());
            
            // Auto-mark video as watched/completed after 3 seconds
            if (activeLesson.type === 'video' && !activeLesson.completed) {
                const timer = setTimeout(() => {
                    markAsComplete();
                }, 3000); // 3 seconds delay
                return () => clearTimeout(timer);
            }
        }
    }, [activeLesson, id]);

    if (!courseState) {
        return <h2>Kurs topilmadi</h2>;
    }
    if (!activeLesson) {
        return <h2>Ushbu kursda hali darslar yo'q.</h2>;
    }

    const handleLessonChange = (lesson) => {
        setActiveLesson(lesson);
        setUploadProgress(0);
        setIsUploading(false);
        setShowReuploader(false);
        setActiveTab('about');
    };

    const goToNextLesson = () => {
        const currentModuleIndex = courseState.modules.findIndex(m => m.lessons.some(l => l.id === activeLesson.id));
        if (currentModuleIndex === -1) return;
        const currentLessonIndex = courseState.modules[currentModuleIndex].lessons.findIndex(l => l.id === activeLesson.id);
        
        let nextLesson = null;
        if (currentLessonIndex + 1 < courseState.modules[currentModuleIndex].lessons.length) {
            nextLesson = courseState.modules[currentModuleIndex].lessons[currentLessonIndex + 1];
        } else if (currentModuleIndex + 1 < courseState.modules.length) {
            if (courseState.modules[currentModuleIndex + 1].lessons.length > 0) {
                nextLesson = courseState.modules[currentModuleIndex + 1].lessons[0];
            }
        }

        if (nextLesson) {
            handleLessonChange(nextLesson);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert("Siz oxirgi darsdasiz!");
        }
    };

    const markAsComplete = React.useCallback(() => {
        setCourseState(prevCourse => {
            if (!prevCourse || !activeLesson) return prevCourse;
            
            // Check if already completed in the current state
            const mIdx = prevCourse.modules.findIndex(m => m.lessons.some(l => l.id === activeLesson.id));
            if (mIdx === -1) return prevCourse;
            
            const lIdx = prevCourse.modules[mIdx].lessons.findIndex(l => l.id === activeLesson.id);
            if (prevCourse.modules[mIdx].lessons[lIdx].completed) return prevCourse;

            const newCourse = { ...prevCourse };
            newCourse.modules = [...newCourse.modules];
            newCourse.modules[mIdx] = { ...newCourse.modules[mIdx] };
            newCourse.modules[mIdx].lessons = [...newCourse.modules[mIdx].lessons];
            
            const updatedLesson = { ...newCourse.modules[mIdx].lessons[lIdx], completed: true };
            newCourse.modules[mIdx].lessons[lIdx] = updatedLesson;
            
            newCourse.completedLessons = newCourse.modules.reduce((acc, m) => 
                acc + m.lessons.filter(l => l.completed).length, 0
            );
            
            const oldProgress = newCourse.progress;
            newCourse.progress = Math.round((newCourse.completedLessons / newCourse.totalLessons) * 100);

            // Update active lesson if it's the one we just completed
            setActiveLesson(prevActive => {
                if (prevActive && prevActive.id === updatedLesson.id) {
                    return updatedLesson;
                }
                return prevActive;
            });

            const threshold = newCourse.minProgressToUnlock || 100;
            if (newCourse.progress >= threshold && oldProgress < threshold) {
                setShowCongrats(true);
            }

            return newCourse;
        });
    }, [activeLesson?.id]);

    const handleFileUpload = (e) => {
        const file = e.target.files ? e.target.files[0] : e.dataTransfer?.files[0];
        if (!file) return;

        // Validate size (50MB)
        if (file.size > 50 * 1024 * 1024) {
            alert('❌ Fayl hajmi 50MB dan oshmasligi kerak!');
            return;
        }

        setIsUploading(true);
        let progress = 0;

        const interval = setInterval(() => {
            const remaining = 100 - progress;
            progress += remaining * 0.18 + Math.random() * 4;

            if (progress >= 97) {
                progress = 97;
                setUploadProgress(progress);
                clearInterval(interval);

                setTimeout(() => {
                    setUploadProgress(100);

                    setTimeout(() => {
                        // Mark as uploaded
                        setIsUploading(false);
                        const newLesson = {
                            ...activeLesson,
                            status: 'submitted',
                            uploadedFile: {
                                name: file.name,
                                size: file.size < 1024 * 1024 ? (file.size / 1024).toFixed(1) + ' KB' : (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                                blobUrl: URL.createObjectURL(file), // Memory leak risk in real app without revoke
                                isImage: file.type.startsWith('image/')
                            }
                        };
                        setActiveLesson(newLesson);

                        // Update course state
                        const newCourse = { ...courseState };
                        const mIdx = newCourse.modules.findIndex(m => m.lessons.some(l => l.id === activeLesson.id));
                        const lIdx = newCourse.modules[mIdx].lessons.findIndex(l => l.id === activeLesson.id);
                        newCourse.modules[mIdx].lessons[lIdx] = newLesson;
                        setCourseState(newCourse);

                        alert('📤 Uyga vazifangiz muvaffaqiyatli yuklandi!');
                    }, 500);
                }, 500);
            } else {
                setUploadProgress(progress);
            }
        }, 80);
    };

    return (
        <div className="course-player-wrapper">
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes slideDown {
                        from { transform: translateY(-30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .CongratsModal-content {
                        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                `}
            </style>
            {showCongrats && <CongratsModal setShowCongrats={setShowCongrats} navigate={navigate} />}
            <button className="btn-primary" style={{ marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => navigate(-1)}>
                <ArrowLeft style={{ marginRight: '0.5rem' }} /> {t('coursePlayer.backToCourses')}
            </button>

            <div className="player-container">
                <div className="video-section">
                    {courseState.progress === 100 && (
                        <div style={{
                            background: 'linear-gradient(90deg, #059669, #10B981)',
                            color: 'white',
                            padding: '1rem 1.5rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 10px 25px rgba(16,185,129,0.3)',
                            animation: 'slideDown 0.5s ease-out'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Sparkle weight="fill" style={{ fontSize: '1.8rem' }} />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Tabriklaymiz! Kursni muvaffaqiyatli yakunladingiz!</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>Sertifikatingiz tayyor va yuklab olish uchun ochiq.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/app/certificates')}
                                style={{ background: 'white', color: '#059669', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                            >
                                <SealCheck weight="fill" /> Sertifikatni ko'rish
                            </button>
                        </div>
                    )}

                    <div className="video-wrapper">
                        {activeLesson.type === 'video' && activeLesson.videoUrl ? (
                            <iframe
                                src={`${activeLesson.videoUrl}?autoplay=1&rel=0`}
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={activeLesson.title}
                            ></iframe>
                        ) : activeLesson.type === 'homework' ? (
                            <div className="video-placeholder-content" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 100%)', border: '2px dashed rgba(245,158,11,0.3)' }}>
                                <FileArrowUp weight="fill" style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '1rem' }} />
                                <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem' }}>{t('coursePlayer.homework')}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t('coursePlayer.homeworkDesc')}</p>
                            </div>
                        ) : (
                            <div className="video-placeholder-content">
                                <PlayCircle weight="fill" />
                                <p>{t('coursePlayer.loadingVideo')} {activeLesson.title}</p>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', marginBottom: '1rem' }}>
                        <button onClick={goToNextLesson} style={{ color: '#3B82F6', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '1rem', fontWeight: 600 }}>
                            Keyingi darsni boshlash <CaretRight weight="bold" />
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--color-surface, #f9fafb)', borderRadius: '12px', padding: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--color-border, #e5e7eb)', flexWrap: 'wrap' }}>
                        <button onClick={() => setActiveTab('about')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', background: activeTab === 'about' ? 'var(--color-bg, white)' : 'transparent', border: activeTab === 'about' ? '1px solid var(--color-border, #e5e7eb)' : 'none', color: activeTab === 'about' ? '#3B82F6' : 'var(--color-text-muted, #4B5563)', fontWeight: activeTab === 'about' ? 700 : 600, cursor: 'pointer', borderRadius: '8px', boxShadow: activeTab === 'about' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s', minWidth: '130px' }}>
                            <FileText weight={activeTab === 'about' ? 'fill' : 'regular'} size={20} /> Kurs haqida
                        </button>
                        <button onClick={() => setActiveTab('qa')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', background: activeTab === 'qa' ? 'var(--color-bg, white)' : 'transparent', border: activeTab === 'qa' ? '1px solid var(--color-border, #e5e7eb)' : 'none', color: activeTab === 'qa' ? '#3B82F6' : 'var(--color-text-muted, #4B5563)', fontWeight: activeTab === 'qa' ? 700 : 600, cursor: 'pointer', borderRadius: '8px', boxShadow: activeTab === 'qa' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s', minWidth: '130px' }}>
                            <ChatCircleDots weight={activeTab === 'qa' ? 'fill' : 'regular'} size={20} /> Q&A
                        </button>
                        <button onClick={() => setActiveTab('notes')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', background: activeTab === 'notes' ? 'var(--color-bg, white)' : 'transparent', border: activeTab === 'notes' ? '1px solid var(--color-border, #e5e7eb)' : 'none', color: activeTab === 'notes' ? '#3B82F6' : 'var(--color-text-muted, #4B5563)', fontWeight: activeTab === 'notes' ? 700 : 600, cursor: 'pointer', borderRadius: '8px', boxShadow: activeTab === 'notes' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s', minWidth: '130px' }}>
                            <BookBookmark weight={activeTab === 'notes' ? 'fill' : 'regular'} size={20} /> Daftarcha
                        </button>
                        <button onClick={() => setActiveTab('homework')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', background: activeTab === 'homework' ? 'var(--color-bg, white)' : 'transparent', border: activeTab === 'homework' ? '1px solid var(--color-border, #e5e7eb)' : 'none', color: activeTab === 'homework' ? '#3B82F6' : 'var(--color-text-muted, #4B5563)', fontWeight: activeTab === 'homework' ? 700 : 600, cursor: 'pointer', borderRadius: '8px', boxShadow: activeTab === 'homework' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s', minWidth: '130px' }}>
                            <CheckSquare weight={activeTab === 'homework' ? 'fill' : 'regular'} size={20} /> Uyga vazifa
                        </button>
                    </div>

                    <div className="lesson-details card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <h2>{t(`lesson.${activeLesson.id}.title`) !== `lesson.${activeLesson.id}.title` ? t(`lesson.${activeLesson.id}.title`) : activeLesson.title}</h2>
                                <div className="lesson-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Folder /> {t(`course.${courseState.id}.title`) !== `course.${courseState.id}.title` ? t(`course.${courseState.id}.title`) : courseState.title}</span>
                                    {activeLesson.type === 'homework' && (
                                        <span style={{ marginLeft: '0.5rem', background: 'rgba(245,158,11,0.15)', color: 'var(--color-primary)', padding: '0.15rem 0.7rem', borderRadius: '999px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <PencilLine /> {t('coursePlayer.homework')}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                {courseState.progress >= 100 && (
                                    <button
                                        className="btn-primary"
                                        style={{ background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none' }}
                                        onClick={() => navigate('/app/certificates')}
                                    >
                                        <SealCheck weight="fill" style={{ marginRight: '0.3rem' }} /> {t('certificates.view')}
                                    </button>
                                )}
                                <button
                                    className="btn-primary"
                                    onClick={markAsComplete}
                                    disabled={activeLesson.completed}
                                    style={activeLesson.completed ? { opacity: 0.7, cursor: 'default' } : {}}
                                >
                                    {activeLesson.completed ? <><Check weight="bold" style={{ marginRight: '0.3rem' }} /> {t('coursePlayer.completed')}</> : t('coursePlayer.markCompleted')}
                                </button>
                            </div>
                        </div>

                        {activeTab === 'about' && (
                            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', marginTop: '1rem' }}>
                                    {activeLesson.type === 'homework'
                                        ? "Vazifani bajaring va faylingizni uyga vazifa bo'limiga yuklang. Bu darsda siz amaliy vazifani qanday bajarish kerakligini ko'rib chiqasiz."
                                        : `Ushbu darsda siz ${activeLesson.title.toLowerCase()} haqida batafsil ma'lumot olasiz. Diqqat bilan kuzating va amaliyotda qo'llang.`}
                                </p>
        
                                {activeLesson.criteria && (
                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(245,158,11,0.04)', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.15)' }}>
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                                            <Sparkle weight="fill" /> Baholanish talablari:
                                        </h4>
                                        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                            {activeLesson.criteria.map((item, idx) => (
                                                <li key={idx} style={{ marginBottom: '0.4rem' }}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'qa' && (
                            <div style={{ animation: 'fadeIn 0.3s ease-out', textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
                                <ChatCircleDots weight="light" style={{ fontSize: '3.5rem', opacity: 0.5, marginBottom: '1rem' }} />
                                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Hozircha savollar yo'q</p>
                                <p style={{ margin: '0.3rem 0 1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Dars bo'yicha savollaringiz bo'lsa bemalol so'rang.</p>
                                <button style={{ background: 'var(--color-surface, #f9fafb)', border: '1px solid var(--color-border, #e5e7eb)', padding: '0.7rem 1.4rem', borderRadius: '8px', color: 'var(--color-text, #111827)', cursor: 'pointer', fontWeight: 600 }}>Savol berish</button>
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div style={{ animation: 'fadeIn 0.3s ease-out', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <textarea 
                                        placeholder="Ushbu dars uchun o'z shaxsiy qaydlaringizni yozing..." 
                                        style={{ width: '100%', minHeight: '180px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-border, #e5e7eb)', background: 'var(--color-surface, #f9fafb)', color: 'var(--color-text, #111827)', resize: 'vertical', fontFamily: 'inherit', outline: 'none' }}
                                    ></textarea>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Saqlash</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* HOMEWORK LOGIC */}
                        {activeTab === 'homework' && (
                            <div style={{ animation: 'fadeIn 0.3s ease-out', marginTop: '1rem' }}>
                                {activeLesson.type !== 'homework' ? (
                                    <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--color-text-muted)' }}>
                                        <CheckSquare weight="light" style={{ fontSize: '3.5rem', opacity: 0.5, marginBottom: '1rem' }} />
                                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Ushbu darsda majburiy uyga vazifa yo'q</p>
                                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', opacity: 0.8 }}>Darsni tushungan bo'lsangiz, keyingisiga o'tishingiz mumkin.</p>
                                    </div>
                                ) : (
                                    <>
                                        {activeLesson.criteria && (
                                            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(245,158,11,0.04)', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.15)' }}>
                                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                                                    <Sparkle weight="fill" /> Baholanish talablari:
                                                </h4>
                                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                                    {activeLesson.criteria.map((item, idx) => (
                                                        <li key={idx} style={{ marginBottom: '0.4rem' }}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <div style={{ marginBottom: '1.2rem' }}>
                                    {activeLesson.reviewStatus === 'checked' ? (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.2rem', borderRadius: '12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginTop: '0.1rem' }}>
                                                <SealCheck weight="fill" style={{ fontSize: '1.6rem', color: '#10B981' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                                                    <span style={{ fontWeight: 700, color: '#10B981', fontSize: '0.95rem' }}>O'qituvchi tekshirdi</span>
                                                    {activeLesson.reviewGrade && <span style={{ background: '#10B981', color: '#fff', fontWeight: 700, padding: '0.1rem 0.65rem', borderRadius: '999px', fontSize: '0.82rem' }}>Baho: {activeLesson.reviewGrade}</span>}
                                                </div>
                                                {activeLesson.reviewComment && <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}><Quotes weight="fill" style={{ color: '#10B981', marginRight: '0.3rem' }} /> {activeLesson.reviewComment}</p>}
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.2rem', borderRadius: '12px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)' }}>
                                            <Clock style={{ fontSize: '1.3rem', color: 'var(--color-primary)', flexShrink: 0 }} />
                                            <div>
                                                <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>O'qituvchi hali tekshirmadi</p>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Vazifangiz yuborilgandan so'ng o'qituvchi tekshirib, baho qo'yadi</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submitted State Header */}
                                {activeLesson.status === 'submitted' && !showReuploader && !isUploading && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 1.2rem', borderRadius: '12px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' }}>
                                        <PaperPlaneTilt weight="fill" style={{ fontSize: '1.4rem', color: '#3B82F6', flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: 0, fontWeight: 600, color: '#3B82F6', fontSize: '0.9rem' }}>Vazifa yuborilgan</p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Ish topshirildi. Yangi fayl yuklash uchun quyidagi tugmani bosing.</p>
                                        </div>
                                        <button
                                            onClick={() => setShowReuploader(true)}
                                            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)', color: '#3B82F6', borderRadius: '8px', padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: '0.82rem', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                        >
                                            <ArrowClockwise /> Qayta yuklash
                                        </button>
                                    </div>
                                )}

                                {/* Upload Box */}
                                {(!activeLesson.status || activeLesson.status !== 'submitted' || showReuploader) && !isUploading && (
                                    <label
                                        htmlFor={`hw-file-input-${activeLesson.id}`}
                                        style={{ display: 'block', position: 'relative', overflow: 'hidden', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease', marginTop: showReuploader ? '1rem' : 0 }}
                                        onDragOver={e => e.preventDefault()}
                                        onDrop={e => { e.preventDefault(); handleFileUpload(e); }}
                                    >
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(217,119,6,0.03) 50%, rgba(245,158,11,0.08) 100%)', border: '1.5px dashed rgba(245,158,11,0.4)', borderRadius: '16px', pointerEvents: 'none' }}></div>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)', borderRadius: '16px 16px 0 0', pointerEvents: 'none' }}></div>

                                        <div style={{ position: 'relative', padding: '2.2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.35)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(245,158,11,0.12)' }}>
                                                <UploadSimple style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <p style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.3rem', letterSpacing: '-0.2px' }}>Faylni bu yerga tashlang</p>
                                                <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-muted)', margin: 0 }}>yoki <span style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>kompyuterdan tanlang</span></p>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                                                {['RAR', 'ZIP', 'MAX', 'JPG', 'PNG', 'PDF'].map(f => (
                                                    <span key={f} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: 'rgba(245,158,11,0.85)' }}>{f}</span>
                                                ))}
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, opacity: 0.7 }}>Maksimal hajm: <strong style={{ color: 'var(--color-text)' }}>50 MB</strong></p>
                                        </div>

                                        <input type="file" id={`hw-file-input-${activeLesson.id}`} style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }} accept=".rar,.zip,.max,.jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} />
                                    </label>
                                )}

                                {/* Progress Bar */}
                                {isUploading && (
                                    <div style={{ display: 'block', marginTop: '1rem', padding: '1.2rem 1.4rem', borderRadius: '14px', background: 'var(--color-surface, rgba(255,255,255,0.04))', border: '1px solid var(--color-border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <FileZip weight="fill" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <span style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Yuklanmoqda...</span>
                                                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{uploadProgress < 97 ? 'Yuklanmoqda...' : 'Tekshirilmoqda...'}</span>
                                            </div>
                                            <span style={{ fontSize: '1rem', color: 'var(--color-primary)', fontWeight: 700, flexShrink: 0 }}>{Math.floor(uploadProgress)}%</span>
                                        </div>
                                        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'linear-gradient(90deg,#F59E0B,#fbbf24,#d97706)', borderRadius: '999px', transition: 'width 0.25s ease', position: 'relative' }}>
                                                <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 6px rgba(245,158,11,0.8)' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Success Final State */}
                                {activeLesson.status === 'submitted' && !isUploading && !showReuploader && activeLesson.uploadedFile && (
                                    <div style={{ display: 'flex', marginTop: '1rem', padding: '1.2rem 1.4rem', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.06))', border: '1px solid rgba(16,185,129,0.3)', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                                            {activeLesson.uploadedFile.isImage ? (
                                                <img src={activeLesson.uploadedFile.blobUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
                                            ) : (
                                                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10B981' }}>FILE</span>
                                            )}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontWeight: 700, color: '#10B981', margin: '0 0 0.15rem', fontSize: '0.92rem' }}>Muvaffaqiyatli yuklandi!</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activeLesson.uploadedFile.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.1rem 0 0', opacity: 0.7 }}>{activeLesson.uploadedFile.size}</p>
                                        </div>
                                        <a
                                            href={activeLesson.uploadedFile.blobUrl}
                                            download={activeLesson.uploadedFile.name}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#10B981', borderRadius: '8px', padding: '0.45rem 0.85rem', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', flexShrink: 0, cursor: 'pointer' }}
                                        >
                                            <DownloadSimple /> Yuklab olish
                                        </a>
                                    </div>
                                )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Playlist aside */}
                <aside className="course-playlist">
                    <div className="playlist-header">
                        <h3>{t('coursePlayer.syllabus')}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{courseState.completedLessons}/{courseState.totalLessons} {t('coursePlayer.lessonsCompleted')}</p>
                    </div>
                    <div className="playlist-content">
                        {courseState.modules.map((module, mIdx) => (
                            <div key={mIdx}>
                                <div className="module-title">{t(`course.${courseState.id}.module.${mIdx}.title`) !== `course.${courseState.id}.module.${mIdx}.title` ? t(`course.${courseState.id}.module.${mIdx}.title`) : module.title}</div>
                                {module.lessons.map(lesson => {
                                    const isActive = lesson.id === activeLesson.id;
                                    const isCompleted = lesson.completed;
                                    const IconComp = lesson.type === 'video' ? PlayCircle : FileText;

                                    return (
                                        <div
                                            key={lesson.id}
                                            className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                            onClick={() => handleLessonChange(lesson)}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle weight="fill" className="status-icon" />
                                            ) : (
                                                <IconComp weight="fill" className="status-icon" />
                                            )}

                                            <div className="lesson-info">
                                                <span className="lesson-title">{t(`lesson.${lesson.id}.title`) !== `lesson.${lesson.id}.title` ? t(`lesson.${lesson.id}.title`) : lesson.title}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CoursePlayer;
