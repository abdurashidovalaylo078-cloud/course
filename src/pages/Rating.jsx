import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, Star, Medal, Robot } from '@phosphor-icons/react';
import AIRatingBot from '../components/AIRatingBot';

const Rating = () => {
    const { t } = useLanguage();
    const [isBotOpen, setIsBotOpen] = useState(false);

    const leaderboard = [
        { id: 1, name: "Sanjar Jumaev", points: 2850, completed: 4, avatar: "SJ" },
        { id: 2, name: "Olimjon Sobirov", points: 2640, completed: 3, avatar: "OS" },
        { id: 3, name: "Dilbar Azimova", points: 2420, completed: 3, avatar: "DA" },
        { id: 4, name: "Azizbek Karimov", points: 2100, completed: 2, avatar: "AK" },
        { id: 5, name: "Madina Shokirova", points: 1950, completed: 2, avatar: "MS" },
    ];

    return (
        <div className="rating-page">
            <div className="section-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Trophy size={32} weight="fill" color="var(--color-primary)" />
                        {t('sidebar.rating')}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>O'quvchilar orasidagi faollik reytingi</p>
                </div>
                
                <button 
                    onClick={() => setIsBotOpen(true)}
                    className="btn-primary"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.7rem 1.2rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, var(--color-primary), #b400ff)',
                        boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)'
                    }}
                >
                    <Robot size={20} weight="fill" />
                    AI Tahlil
                </button>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>O'rin</th>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>O'quvchi</th>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Ballar</th>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Tugatilgan kurslar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((user, index) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ 
                                            width: '24px', 
                                            height: '24px', 
                                            borderRadius: '50%', 
                                            background: index === 0 ? 'rgba(245, 158, 11, 0.2)' : index === 1 ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                            color: index === 0 ? '#F59E0B' : index === 1 ? '#3B82F6' : 'inherit',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 600,
                                            fontSize: '0.9rem'
                                        }}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div className="avatar-sm" style={{ background: 'var(--color-primary)', color: '#fff', fontWeight: 600 }}>
                                                {user.avatar}
                                            </div>
                                            <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{user.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                                        {user.points.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <span style={{ 
                                            padding: '4px 10px', 
                                            borderRadius: '99px', 
                                            background: 'var(--color-bg-hover)', 
                                            color: 'var(--color-text-main)',
                                            fontSize: '0.85rem' 
                                        }}>
                                            {user.completed} ta kurs
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI Rating Bot */}
            <AIRatingBot 
                leaderboard={leaderboard} 
                isOpen={isBotOpen} 
                onClose={() => setIsBotOpen(false)} 
            />
        </div>
    );
};

export default Rating;
