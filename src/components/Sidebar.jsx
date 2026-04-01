import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Cube, Video, Certificate, ChatsCircle, Gear, SignOut, WarningCircle } from '@phosphor-icons/react';
import { currentUser } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
    const { t } = useLanguage();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="logo-area">
                    <div className="logo-icon">
                        <Cube weight="fill" />
                    </div>
                    <h1>3D Max Pro</h1>
                </div>
            </Link>

            <nav className="nav-menu">
                <NavLink to="/app" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Video />
                    <span>{t('sidebar.myCourses')}</span>
                </NavLink>
                <NavLink to="/app/certificates" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Certificate />
                    <span>{t('sidebar.certificates')}</span>
                </NavLink>
                <NavLink to="/app/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <ChatsCircle />
                    <span>{t('sidebar.groupChat')}</span>
                </NavLink>
                <NavLink to="/app/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Gear />
                    <span>{t('sidebar.settings')}</span>
                </NavLink>
            </nav>

            <div className="logout-section" style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                {showLogoutConfirm && (
                    <>
                        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowLogoutConfirm(false)}></div>
                        <div style={{
                            position: 'absolute',
                            bottom: 'calc(100% + 5px)',
                            left: '5px',
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '1.2rem',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                            zIndex: 100,
                            width: 'max-content',
                            color: '#1F2937'
                        }}>
                            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                                <WarningCircle size={28} weight="fill" color="#F59E0B" style={{ flexShrink: 0, marginTop: '-2px' }} />
                                <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.4, whiteSpace: 'nowrap' }}>Haqiqatan ham tizimdan chiqmoqchimisiz?</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                                <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#fff', color: '#1F2937', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', outline: 'none' }}>
                                    Yo'q
                                </button>
                                <button onClick={() => navigate('/')} style={{ padding: '0.5rem 1.2rem', borderRadius: '6px', border: 'none', background: '#F05234', color: '#fff', fontSize: '1.05rem', fontWeight: 500, cursor: 'pointer', outline: 'none' }}>
                                    Ha
                                </button>
                            </div>
                            {/* Down arrow caret */}
                            <div style={{ position: 'absolute', bottom: '-6px', left: '190px', width: '14px', height: '14px', background: '#fff', transform: 'rotate(45deg)', borderRadius: '2px' }}></div>
                        </div>
                    </>
                )}
                <div onClick={() => setShowLogoutConfirm(!showLogoutConfirm)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: 'transparent', borderRadius: '8px', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Chiqish</span>
                    <SignOut size={24} color="#9CA3AF" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
