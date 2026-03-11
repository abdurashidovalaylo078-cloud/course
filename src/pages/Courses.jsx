import { PlayCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { coursesData } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Courses = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div>
            <h2 className="section-title">{t('courses.title')}</h2>
            <div className="grid-3">
                {coursesData.map(course => (
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
                                    <span>{course.completedLessons}/{course.totalLessons} {t('courses.lessons')}</span>
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
