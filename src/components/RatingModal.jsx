import React from 'react';
import { X, Trophy, Crown, Medal } from '@phosphor-icons/react';

const RatingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const leaderboard = [
        { id: 1, name: "Sanjar Jumaev", points: 2850, completed: 12, avatar: "SJ", rank: 1 },
        { id: 2, name: "Olimjon Sobirov", points: 2640, completed: 10, avatar: "OS", rank: 2 },
        { id: 3, name: "Dilbar Azimova", points: 2420, completed: 9, avatar: "DA", rank: 3 },
        { id: 4, name: "Azizbek Karimov", points: 2100, completed: 8, avatar: "AK", rank: 4 },
        { id: 5, name: "Madina Shokirova", points: 1950, completed: 7, avatar: "MS", rank: 5 },
    ];

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
            <div className="modal-content-premium rating-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', padding: 0, overflow: 'hidden' }}>
                <div className="modal-header-premium" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)', padding: '1.5rem 2rem' }}>
                    <div className="header-title">
                        <div className="icon-wrapper" style={{ background: 'rgba(255,255,255,0.2)' }}>
                            <Trophy weight="fill" color="#fff" size={24} />
                        </div>
                        <div className="title-text">
                            <h3 style={{ color: '#fff', margin: 0 }}>O'quvchilar Reytingi</h3>
                            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Eng faol o'quvchilar ro'yxati</p>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose} style={{ color: '#fff', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <X size={24} weight="bold" />
                    </button>
                </div>
                
                <div className="modal-body-premium" style={{ padding: '1rem 0' }}>
                    <div className="rating-list-premium">
                        {leaderboard.map((user, index) => (
                            <div key={user.id} className="rating-row-premium" style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                padding: '1.2rem 2rem',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                background: index === 0 ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                            }}>
                                <div className="rank-badge" style={{ width: '40px', marginRight: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    {index === 0 ? <Crown size={28} weight="fill" color="#F59E0B" /> : 
                                     index === 1 ? <Medal size={28} weight="fill" color="#CBD5E1" /> :
                                     index === 2 ? <Medal size={28} weight="fill" color="#B45309" /> :
                                     <span style={{ fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>{index + 1}</span>}
                                </div>
                                <div className="user-info-rating" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                    <div className="avatar-sm" style={{ 
                                        background: index === 0 ? '#F59E0B' : 'var(--color-primary)', 
                                        color: '#000', 
                                        fontWeight: 600,
                                        width: '44px',
                                        height: '44px'
                                    }}>
                                        {user.avatar}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, margin: 0, fontSize: '1.05rem' }}>{user.name}</p>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>{user.completed} ta dars tugatilgan</p>
                                    </div>
                                </div>
                                <div className="points-cell" style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 800, color: '#F59E0B', margin: 0, fontSize: '1.2rem' }}>{user.points}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Ball</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Reyting har kuni yangilanib turadi</p>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;
