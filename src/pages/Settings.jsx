import { useState } from 'react';
import { User, ShieldCheck, BellRinging, AppWindow, Check } from '@phosphor-icons/react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleSave = (e) => {
        e.preventDefault();
        showToast('Sozlamalar saqlandi!');
    };

    return (
        <div>
            <h2 className="section-title">Sozlamalar</h2>
            <div className="settings-container card">
                {/* Settings Sidebar */}
                <div className="settings-sidebar">
                    <div
                        className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User /> Profil
                    </div>
                    <div
                        className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <ShieldCheck /> Xavfsizlik
                    </div>
                    <div
                        className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <BellRinging /> Bildirishnomalar
                    </div>
                    <div
                        className={`settings-tab ${activeTab === 'app' ? 'active' : ''}`}
                        onClick={() => setActiveTab('app')}
                    >
                        <AppWindow /> Ilova
                    </div>
                </div>

                {/* Settings Content */}
                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-panel active">
                            <h3>Profil Sozlamalari</h3>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }} onSubmit={handleSave}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                    <img src="https://ui-avatars.com/api/?name=User+Name&background=F59E0B&color=fff" alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                                    <div>
                                        <button type="button" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Rasm yuklash</button>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Maksimal hajm: 2MB (JPG, PNG)</p>
                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Ism Familiya</label>
                                    <input type="text" defaultValue="Olimjon Sobirov" className="form-control" style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }} />
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Kasb / Yonalish</label>
                                    <input type="text" defaultValue="3D Artist / Talaba" className="form-control" style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }} />
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>O'zingiz haqingizda</label>
                                    <textarea rows="4" className="form-control" style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', resize: 'vertical' }} defaultValue="Men 3D dizayn va interyer vizualizatsiyasiga qiziqaman..."></textarea>
                                </div>

                                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Saqlash</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-panel active">
                            <h3>Xavfsizlik</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Parolingizni va akkaunt xavfsizligini boshqaring.</p>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }} onSubmit={handleSave}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Joriy parol</label>
                                    <input type="password" placeholder="••••••••" className="form-control" style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Yangi parol</label>
                                    <input type="password" placeholder="Yangi parolni kiriting" className="form-control" style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
                                </div>
                                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Parolni yangilash</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-panel active">
                            <h3>Bildirishnomalar</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Qaysi xabarlarni olishni xohlaysiz?</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['Yangi dars qo\'shilganda', 'Uyga vazifa tekshirilganda', 'Chatda xabar kelganda', 'Email orqali yangiliklar'].map((label, i) => (
                                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                                        <input type="checkbox" defaultChecked={i !== 3} style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }} />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'app' && (
                        <div className="settings-panel active">
                            <h3>Ilova sozlamalari</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Tashqi ko'rinish va til parametrlarini boshqaring.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Tilni tanlang</label>
                                    <select style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', width: '100%', maxWidth: '300px', outline: 'none' }}>
                                        <option value="uz">O'zbekcha</option>
                                        <option value="ru">Русский</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {toastMessage && (
                <div style={{
                    position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--color-surface)', color: 'var(--color-text)',
                    padding: '0.8rem 1.5rem', borderRadius: '999px', fontSize: '0.9rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 99999,
                    border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                    <Check color="#10B981" /> {toastMessage}
                </div>
            )}
        </div>
    );
};

export default Settings;
