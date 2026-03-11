import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Bell, Moon, Sun, ChatCircleDots, CheckCircle, User, Gear, SignOut, Translate } from '@phosphor-icons/react';
import { currentUser } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isDark, setIsDark] = useState(true); // Default dark theme
    
    const { language, setLanguage, t } = useLanguage();

    const notifRef = useRef(null);
    const profileRef = useRef(null);
    const langRef = useRef(null);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsLangOpen(false);
    };

    return (
        <header className="top-header">
            <div className="search-bar">
                <MagnifyingGlass />
                <input type="text" placeholder={t('header.search')} />
            </div>

            <div className="header-actions">
                {/* Language Switcher */}
                <div style={{ position: 'relative' }} ref={langRef}>
                    <button className="icon-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                        <Translate />
                    </button>

                    <div className={`dropdown-menu ${isLangOpen ? 'active' : ''}`} style={{ display: isLangOpen ? 'block' : 'none', right: 0, width: '150px' }}>
                        <ul className="menu-list" style={{ padding: '0.5rem' }}>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleLanguageChange('uz'); }} style={{ color: language === 'uz' ? 'var(--color-primary)' : '' }}>
                                    O'zbekcha
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleLanguageChange('ru'); }} style={{ color: language === 'ru' ? 'var(--color-primary)' : '' }}>
                                    Русский
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleLanguageChange('en'); }} style={{ color: language === 'en' ? 'var(--color-primary)' : '' }}>
                                    English
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Notifications */}
                <div style={{ position: 'relative' }} ref={notifRef}>
                    <button className="icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                        <Bell />
                        <span className="badge">2</span>
                    </button>

                    <div className={`dropdown-menu notifications-dropdown ${isNotifOpen ? 'active' : ''}`} style={{ display: isNotifOpen ? 'block' : 'none' }}>
                        <div className="dropdown-header">
                            <span>{t('header.notifications')}</span>
                            <button className="read-all-btn">{t('header.readAll')}</button>
                        </div>
                        <ul className="notification-list">
                            <li className="notification-item unread">
                                <div className="notif-icon"><ChatCircleDots weight="fill" /></div>
                                <div className="notif-content">
                                    <p><strong>Alisher Uzoqov</strong> guruhga xabar yozdi.</p>
                                    <span className="time">5 daqiqa oldin</span>
                                </div>
                            </li>
                            <li className="notification-item unread">
                                <div className="notif-icon success"><CheckCircle weight="fill" /></div>
                                <div className="notif-content">
                                    <p>Sizning uyga vazifangiz tasdiqlandi.</p>
                                    <span className="time">1 soat oldin</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Theme Toggle */}
                <button className="icon-btn theme-toggle" onClick={toggleTheme}>
                    {isDark ? <Moon /> : <Sun />}
                </button>

                {/* Profile */}
                <div style={{ position: 'relative' }} ref={profileRef}>
                    <div className="profile-dropdown" onClick={() => setIsProfileOpen(!isProfileOpen)} style={{ cursor: 'pointer' }}>
                        <img src={currentUser.avatar} alt="User" className="avatar-sm" />
                    </div>

                    <div className={`dropdown-menu profile-menu ${isProfileOpen ? 'active' : ''}`} style={{ display: isProfileOpen ? 'block' : 'none' }}>
                        <div className="profile-header">
                            <img src={currentUser.avatar} alt="User" className="avatar-sm" />
                            <div>
                                <p className="name">{currentUser.name}</p>
                                <p className="role">{currentUser.role}</p>
                            </div>
                        </div>
                        <ul className="menu-list">
                            <li><Link to="/app/settings" onClick={() => setIsProfileOpen(false)}><User /> {t('header.edit')}</Link></li>
                            <li><Link to="/app/settings" onClick={() => setIsProfileOpen(false)}><Gear /> {t('sidebar.settings')}</Link></li>
                            <li className="divider"></li>
                            <li><Link to="/" className="danger"><SignOut /> {t('header.logout')}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
