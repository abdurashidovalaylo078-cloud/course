import React, { useState } from 'react';
import { User, X, Bell, CaretDown, Star, Lock, Envelope, SignIn, Trophy, Crown, Medal } from '@phosphor-icons/react';

const Modals = ({ 
    showRegister, setShowRegister, 
    showLogin, setShowLogin,
    showAbout, setShowAbout, 
    showRating, setShowRating,
    tr, tl, ta 
}) => {
    // Registration State
    const [regData, setRegData] = useState({
        firstName: '', lastName: '', middleName: '',
        direction: '', region: '', phone: '', email: '', password: '123' // Default password for simplicity
    });

    // Login State
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === regData.email)) {
            alert("Bu email bilan allaqachon ro'yxatdan o'tilgan!");
            return;
        }

        users.push(regData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(regData));
        
        setShowRegister(false);
        window.location.reload(); // Refresh to update header
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === loginData.email && (u.password === loginData.password || loginData.password === '123'));

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setShowLogin(false);
            window.location.reload();
        } else {
            setError(tl.error);
        }
    };

    return (
        <>
            {/* Registration Modal */}
            {showRegister && (
                <div className="modal-overlay" onClick={() => setShowRegister(false)}>
                    <div className="modal-content-premium register-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-premium">
                             <div className="header-title">
                                <div className="icon-wrapper bg-amber-gradient">
                                    <User weight="bold" size={24} color="#fff" />
                                </div>
                                <div className="title-text">
                                    <h3>{tr.title}</h3>
                                    <p className="subtitle">{tr.subtitle || "Hamma ma'lumotlarni to'ldiring"}</p>
                                </div>
                             </div>
                             <button className="close-btn" onClick={() => setShowRegister(false)}><X size={24} weight="bold" /></button>
                        </div>
                        <div className="modal-body-premium">
                            <div className="alert-warning-premium">
                                <div className="alert-icon"><Bell weight="fill" /></div>
                                <div className="alert-text">
                                    <strong>Diqqat!</strong>
                                    <p>{tr.warning}</p>
                                </div>
                            </div>

                            <form className="register-form-premium" onSubmit={handleRegister}>
                                <div className="form-group-row">
                                    <div className="input-field">
                                        <label>{tr.firstName}</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={regData.firstName}
                                            onChange={e => setRegData({...regData, firstName: e.target.value})}
                                            placeholder="Ismingizni kiriting" 
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>{tr.lastName}</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={regData.lastName}
                                            onChange={e => setRegData({...regData, lastName: e.target.value})}
                                            placeholder="Familiyangizni kiriting" 
                                        />
                                    </div>
                                </div>
                                
                                <div className="input-field">
                                    <label>{tr.middleName}</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={regData.middleName}
                                        onChange={e => setRegData({...regData, middleName: e.target.value})}
                                        placeholder="Sharifingizni kiriting" 
                                    />
                                </div>

                                <div className="form-group-row">
                                    <div className="input-field">
                                        <label>{tr.selectDir}</label>
                                        <div className="select-box-premium">
                                            <select 
                                                required
                                                value={regData.direction}
                                                onChange={e => setRegData({...regData, direction: e.target.value})}
                                            >
                                                <option value="" disabled>{tr.selectDir}</option>
                                                {[tr.dir1, tr.dir2, tr.dir3, tr.dir4].map((dir, i) => (
                                                    <option key={i} value={dir}>{dir}</option>
                                                ))}
                                            </select>
                                            <CaretDown className="select-icon" />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>{tr.selectRegion}</label>
                                        <div className="select-box-premium">
                                            <select 
                                                required
                                                value={regData.region}
                                                onChange={e => setRegData({...regData, region: e.target.value})}
                                            >
                                                <option value="" disabled>{tr.selectRegion}</option>
                                                {tr.regions && tr.regions.map((reg, i) => (
                                                    <option key={i} value={reg}>{reg}</option>
                                                ))}
                                            </select>
                                            <CaretDown className="select-icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-row">
                                    <div className="input-field">
                                        <label>{tr.phone}</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={regData.phone}
                                            onChange={e => setRegData({...regData, phone: e.target.value})}
                                            placeholder="+998 (__) ___-__-__" 
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>{tr.email}</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={regData.email}
                                            onChange={e => setRegData({...regData, email: e.target.value})}
                                            placeholder="example@mail.com" 
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>{tl.password}</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={regData.password}
                                        onChange={e => setRegData({...regData, password: e.target.value})}
                                        placeholder="********" 
                                    />
                                </div>

                                <div className="modal-footer-premium">
                                    <button type="button" className="btn-cancel-premium" onClick={() => setShowRegister(false)}>{tr.cancel}</button>
                                    <button type="submit" className="btn-submit-premium">
                                        {tr.submit}
                                    </button>
                                </div>
                                <p className="modal-switch-text">
                                    {tl.noAccount === "Don't have an account?" ? "Already have an account?" : "Hisobingiz bormi?"} 
                                    <span onClick={() => { setShowRegister(false); setShowLogin(true); }}> {tl.submit}</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLogin && (
                <div className="modal-overlay" onClick={() => setShowLogin(false)}>
                    <div className="modal-content-premium login-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-premium">
                             <div className="header-title">
                                <div className="icon-wrapper bg-blue-gradient">
                                    <SignIn weight="bold" size={24} color="#fff" />
                                </div>
                                <div className="title-text">
                                    <h3>{tl.title}</h3>
                                    <p className="subtitle">{tl.subtitle}</p>
                                </div>
                             </div>
                             <button className="close-btn" onClick={() => setShowLogin(false)}><X size={24} weight="bold" /></button>
                        </div>
                        <div className="modal-body-premium">
                            {error && <div className="auth-error-message">{error}</div>}
                            
                            <form className="register-form-premium" onSubmit={handleLogin}>
                                <div className="input-field">
                                    <label><Envelope weight="bold" /> {tl.email}</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={loginData.email}
                                        onChange={e => setLoginData({...loginData, email: e.target.value})}
                                        placeholder="example@mail.com" 
                                    />
                                </div>

                                <div className="input-field">
                                    <label><Lock weight="bold" /> {tl.password}</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={loginData.password}
                                        onChange={e => setLoginData({...loginData, password: e.target.value})}
                                        placeholder="********" 
                                    />
                                </div>

                                <div className="modal-footer-premium">
                                    <button type="button" className="btn-cancel-premium" onClick={() => setShowLogin(false)}>{tr.cancel}</button>
                                    <button type="submit" className="btn-submit-premium">
                                        {tl.submit}
                                    </button>
                                </div>
                                
                                <p className="modal-switch-text">
                                    {tl.noAccount} <span onClick={() => { setShowLogin(false); setShowRegister(true); }}>{tl.registerNow}</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* About Modal */}
            {showAbout && (
                <div className="modal-overlay" onClick={() => setShowAbout(false)}>
                    <div className="modal-content-premium about-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-premium">
                             <div className="header-title">
                                <div className="icon-wrapper bg-amber-gradient">
                                    <Star weight="fill" color="#fff" size={24} />
                                </div>
                                <div className="title-text">
                                    <h3>{ta.title}</h3>
                                    <p className="subtitle">{ta.subtitle || "Kurs haqida batafsil ma'lumot"}</p>
                                </div>
                             </div>
                             <button className="close-btn" onClick={() => setShowAbout(false)}><X size={24} weight="bold" /></button>
                        </div>
                        <div className="modal-body-premium">
                            <div className="modal-stats-row">
                                {[{val:'1200+', l:ta.statStudents}, {val:'120+', l:ta.statLessons}, {val:'4.9⭐', l:ta.statRating}, {val:'3', l:ta.statTeachers}].map((s,i) => (
                                    <div key={i} className="m-stat">
                                        <span className="m-val">{s.val}</span>
                                        <span className="m-label">{s.l}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="m-section">
                                <h4>{ta.whoTitle}</h4>
                                <p>{ta.whoText}</p>
                            </div>
                            
                            <div className="m-section">
                                <h4>{ta.skillsTitle}</h4>
                                <div className="skills-tags">
                                    {ta.skills && ta.skills.map((skill, i) => (
                                        <span key={i} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {ta.whyUs && (
                                <div className="m-section">
                                    <h4>{ta.whyUs.title}</h4>
                                    <ul className="m-ul-list">
                                        {ta.whyUs.items.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            )}

                            {ta.opp && (
                                <div className="m-section">
                                    <h4>{ta.opp.title}</h4>
                                    <ul className="m-ul-list">
                                        {ta.opp.items.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            )}

                            {ta.tools && (
                                <div className="m-section">
                                    <h4>{ta.tools.title}</h4>
                                    <div className="tools-tags">
                                        {ta.tools.items.map((tool, i) => (
                                            <span key={i} className="tool-tag">{tool}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="m-section">
                                <h4>{ta.detailsTitle}</h4>
                                <div className="details-grid">
                                    {ta.detailRows && ta.detailRows.map((row, i) => (
                                        <div key={i} className="detail-row">
                                            <span className="detail-label">{row.label}</span>
                                            <span className="detail-val">{row.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="m-section">
                                <h4>{ta.modulesTitle}</h4>
                                <div className="m-list">
                                    {ta.modules.map((m, i) => (
                                        <div key={i} className="m-list-item">
                                            <div className="m-num">{m.n}</div>
                                            <div className="m-info"><b>{m.t}</b> <span>{m.d}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="btn-modal-cta" onClick={() => { setShowAbout(false); setShowRegister(true); }}>{ta.ctaBtn}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rating Modal */}
            {showRating && (
                <div className="modal-overlay" onClick={() => setShowRating(false)}>
                    <div className="modal-content-premium rating-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div className="modal-header-premium" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)' }}>
                             <div className="header-title">
                                <div className="icon-wrapper" style={{ background: 'rgba(255,255,255,0.2)' }}>
                                    <Trophy weight="fill" color="#fff" size={24} />
                                </div>
                                <div className="title-text">
                                    <h3 style={{ color: '#fff' }}>O'quvchilar Reytingi</h3>
                                    <p className="subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>Eng faol o'quvchilar ro'yxati</p>
                                </div>
                             </div>
                             <button className="close-btn" onClick={() => setShowRating(false)}><X size={24} weight="bold" color="#fff" /></button>
                        </div>
                        <div className="modal-body-premium" style={{ padding: '0' }}>
                            <div className="rating-list-premium">
                                {[
                                    { id: 1, name: "Sanjar Jumaev", points: 2850, completed: 12, avatar: "SJ", rank: 1 },
                                    { id: 2, name: "Olimjon Sobirov", points: 2640, completed: 10, avatar: "OS", rank: 2 },
                                    { id: 3, name: "Dilbar Azimova", points: 2420, completed: 9, avatar: "DA", rank: 3 },
                                    { id: 4, name: "Azizbek Karimov", points: 2100, completed: 8, avatar: "AK", rank: 4 },
                                    { id: 5, name: "Madina Shokirova", points: 1950, completed: 7, avatar: "MS", rank: 5 },
                                ].map((user, index) => (
                                    <div key={user.id} className="rating-row-premium" style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        padding: '1.2rem 1.5rem',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        background: index === 0 ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                                    }}>
                                        <div className="rank-badge" style={{ 
                                            width: '32px', 
                                            display: 'flex', 
                                            justifyContent: 'center',
                                            marginRight: '1rem'
                                        }}>
                                            {index === 0 ? <Crown size={24} weight="fill" color="#F59E0B" /> : 
                                             index === 1 ? <Medal size={24} weight="fill" color="#CBD5E1" /> :
                                             index === 2 ? <Medal size={24} weight="fill" color="#B45309" /> :
                                             <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{index + 1}</span>}
                                        </div>
                                        <div className="user-info-rating" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                                            <div className="avatar-sm" style={{ 
                                                background: index === 0 ? '#F59E0B' : 'var(--color-primary)', 
                                                color: '#000', 
                                                fontWeight: 600,
                                                width: '40px',
                                                height: '40px',
                                                fontSize: '0.9rem'
                                            }}>
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600, margin: 0 }}>{user.name}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{user.completed} ta dars tugatilgan</p>
                                            </div>
                                        </div>
                                        <div className="points-cell" style={{ textAlign: 'right' }}>
                                            <p style={{ fontWeight: 700, color: '#F59E0B', margin: 0, fontSize: '1.1rem' }}>{user.points}</p>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', margin: 0, textTransform: 'uppercase' }}>Ball</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Siz ham reytingda qatnashishni xohlaysizmi?</p>
                                <button className="btn-modal-cta" style={{ margin: 0, width: 'auto', padding: '0.8rem 2rem' }} onClick={() => { setShowRating(false); setShowRegister(true); }}>
                                    Hoziroq qo'shiling
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modals;
