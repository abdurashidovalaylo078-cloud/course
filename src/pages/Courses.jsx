import React, { useState, useEffect } from 'react';
import { PlayCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { coursesData } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Courses = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [courses, setCourses] = useState(coursesData);

    useEffect(() => {
        const updatedCourses = coursesData.map(course => {
            // ALWAYS calculate counts dynamically from the modules to prevent data mismatch bugs
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const totalVideos = course.modules.reduce((acc, m) => 
                acc + m.lessons.filter(l => l.type === 'video').length, 0
            );

            let completedVideos = 0;
            let currentCompleted = course.completedLessons;
            let currentProgress = course.progress;

            const saved = localStorage.getItem(`course_progress_${course.id}`);
            if (saved) {
                try {
                    const savedCourse = JSON.parse(saved);
                    // Recalculate completed count from saved modules for accuracy
                    currentCompleted = savedCourse.modules.reduce((acc, m) => 
                        acc + m.lessons.filter(l => l.completed).length, 0
                    );
                    
                    completedVideos = savedCourse.modules.reduce((acc, m) => 
                        acc + m.lessons.filter(l => l.type === 'video' && l.completed).length, 0
                    );

                    currentProgress = Math.round((currentCompleted / totalLessons) * 100);
                } catch (e) {
                    console.error("Error parsing saved progress for course", course.id, e);
                }
            } else {
                currentCompleted = course.modules.reduce((acc, m) => 
                    acc + m.lessons.filter(l => l.completed).length, 0
                );
                completedVideos = course.modules.reduce((acc, m) => 
                    acc + m.lessons.filter(l => l.type === 'video' && l.completed).length, 0
                );
                currentProgress = Math.round((currentCompleted / totalLessons) * 100);
            }

            return {
                ...course,
                totalLessons, // Override static count
                totalVideos,
                completedLessons: currentCompleted,
                completedVideos,
                progress: currentProgress
            };
        });
        setCourses(updatedCourses);
    }, []);

    return (
        <div>
            <h2 className="section-title">{t('courses.title')}</h2>
            <div className="grid-3">
                {courses.map(course => (
                    <div
                        key={course.id}
                        className="card course-card"
                        onClick={() => navigate(`/app/courses/${course.id}`)}
                        style={{ cursor: 'pointer', overflow: 'hidden', padding: 0 }}
                    >
                        <div
                            className="course-thumb"
                            style={{
                                backgroundImage: `url('${course.thumbnail}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '180px',
                                position: 'relative'
                            }}
                        >
                            <div
                                className="play-overlay"
                                style={{
                                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    opacity: 0, transition: '0.3s'
                                }}
                            >
                                <PlayCircle weight="fill" style={{ fontSize: '3rem', color: 'white' }} />
                            </div>
                        </div>

                        <div className="course-info" style={{ padding: '1.2rem' }}>
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t(`course.${course.id}.title`) || course.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {t(`course.${course.id}.instructor`) || course.instructor}
                            </p>

                            <div className="progress-container">
                                <div style={{ background: 'var(--color-bg-dark)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                                    <div style={{ width: `${course.progress}%`, background: 'var(--color-primary)', height: '100%' }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    <span>{course.progress}% {t('courses.completed')}</span>
                                    <span>{course.completedVideos}/{course.totalVideos} {t('courses.lessons')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .course-card:hover .play-overlay { opacity: 1 !important; }
      `}</style>
        </div>
    );
};

export default Courses;
