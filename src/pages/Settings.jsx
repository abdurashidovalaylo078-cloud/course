import { useState } from 'react';
import { User, ShieldCheck, BellRinging, AppWindow, Check } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [toastMessage, setToastMessage] = useState('');
    const { language, setLanguage, t } = useLanguage();

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleSave = (e) => {
        e.preventDefault();
        showToast(t('settings.savedConfig'));
    };

    return (
        <div>
            <h2 className="section-title">{t('settings.title')}</h2>
            <div className="settings-container card">
                {/* Settings Sidebar */}
                <div className="settings-sidebar">
                    <div
                        className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User /> {t('settings.profile')}
                    </div>
                    <div
                        className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <ShieldCheck /> {t('settings.security')}
                    </div>
                    <div
                        className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <BellRinging /> {t('settings.notifications')}
                    </div>
                    <div
                        className={`settings-tab ${activeTab === 'app' ? 'active' : ''}`}
                        onClick={() => setActiveTab('app')}
                    >
                        <AppWindow /> {t('settings.app')}
                    </div>
                </div>

                {/* Settings Content */}
                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-panel active">
                            <h3>{t('settings.profileSettings')}</h3>
                            <form className="settings-form" onSubmit={handleSave}>
                                <div className="profile-avatar-section">
                                    <img src="https://ui-avatars.com/api/?name=User+Name&background=F59E0B&color=fff" alt="Avatar" className="profile-avatar" />
                                    <div className="profile-avatar-actions">
                                        <button type="button" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>{t('settings.uploadPic')}</button>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{t('settings.maxSize')}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>{t('settings.fullName')}</label>
                                    <input type="text" defaultValue="Olimjon Sobirov" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label>{t('settings.profession')}</label>
                                    <input type="text" defaultValue="3D Artist / Talaba" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label>{t('settings.about')}</label>
                                    <textarea rows="4" className="form-control" defaultValue="Men 3D dizayn va interyer vizualizatsiyasiga qiziqaman..."></textarea>
                                </div>

                                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>{t('settings.save')}</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-panel active">
                            <h3>{t('settings.security')}</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{t('settings.securityDesc')}</p>
                            <form className="settings-form" onSubmit={handleSave}>
                                <div className="form-group">
                                    <label>{t('settings.currentPass')}</label>
                                    <input type="password" placeholder="••••••••" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>{t('settings.newPass')}</label>
                                    <input type="password" placeholder="..." className="form-control" />
                                </div>
                                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>{t('settings.updatePass')}</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-panel active">
                            <h3>{t('settings.notifications')}</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{t('settings.notifDesc')}</p>
                            <div className="checkbox-group">
                                {[t('settings.notif1'), t('settings.notif2'), t('settings.notif3'), t('settings.notif4')].map((label, i) => (
                                    <label key={i} className="checkbox-label">
                                        <input type="checkbox" defaultChecked={i !== 3} className="checkbox-input" />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'app' && (
                        <div className="settings-panel active">
                            <h3>{t('settings.appSettings')}</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{t('settings.appDesc')}</p>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label>{t('settings.selectLang')}</label>
                                    <select 
                                        className="form-control" 
                                        style={{ maxWidth: '300px' }} 
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="uz" style={{ background: '#0f172a', color: '#f8fafc' }}>O'zbekcha</option>
                                        <option value="ru" style={{ background: '#0f172a', color: '#f8fafc' }}>Русский</option>
                                        <option value="en" style={{ background: '#0f172a', color: '#f8fafc' }}>English</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {toastMessage && (
                <div className={`toast-notification ${toastMessage ? 'show' : ''}`}>
                    <Check color="#10B981" weight="bold" /> {toastMessage}
                </div>
            )}
        </div>
    );
};

export default Settings;
