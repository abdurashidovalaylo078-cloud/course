import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, Star, Medal } from '@phosphor-icons/react';

const Rating = () => {
    const { t } = useLanguage();

    const leaderboard = [
        { id: 1, name: "Sanjar Jumaev", points: 2850, completed: 4, avatar: "SJ" },
        { id: 2, name: "Olimjon Sobirov", points: 2640, completed: 3, avatar: "OS" },
        { id: 3, name: "Dilbar Azimova", points: 2420, completed: 3, avatar: "DA" },
        { id: 4, name: "Azizbek Karimov", points: 2100, completed: 2, avatar: "AK" },
        { id: 5, name: "Madina Shokirova", points: 1950, completed: 2, avatar: "MS" },
    ];

    return (
        <div className="rating-page">
            <div className="section-header" style={{ marginBottom: '2rem' }}>
                <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Trophy size={32} weight="fill" color="var(--color-primary)" />
                    {t('sidebar.rating')}
                </h2>
                <p style={{ color: 'var(--color-text-muted)' }}>O'quvchilar orasidagi faollik reytingi</p>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>O'rin</th>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>O'quvchi</th>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Ballar</th>
                                <th style={{ padding: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Tugatilgan kurslar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((user, index) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
                                            <div className="avatar-sm" style={{ background: 'var(--color-primary)', color: '#000', fontWeight: 600 }}>
                                                {user.avatar}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{user.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                                        {user.points.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <span style={{ 
                                            padding: '4px 10px', 
                                            borderRadius: '99px', 
                                            background: 'rgba(255,255,255,0.05)', 
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
        </div>
    );
};

export default Rating;
