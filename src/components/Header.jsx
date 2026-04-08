import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Bell, Moon, Sun, ChatCircleDots, CheckCircle, User, Gear, SignOut, Translate, BookOpen } from '@phosphor-icons/react';
import { currentUser } from '../data';
import { useLanguage } from '../context/LanguageContext';

const initialNotifications = [
    {
        id: 1,
        type: 'lesson',
        text: "Yangi kurs: '3ds Max: arxitektura kursi' qo'shildi.",
        time: '5 daqiqa oldin',
        read: false,
    },
    {
        id: 2,
        type: 'success',
        text: "Sizning uyga vazifangiz tekshirilib, bahosi qo'yildi.",
        time: '1 soat oldin',
        read: false,
    },
    {
        id: 3,
        type: 'lesson',
        text: "3-Modul: Yangi dars qo'shildi.",
        time: 'Kecha',
        read: true,
    },
];

const Header = () => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [notifications, setNotifications] = useState(initialNotifications);

    // Dynamic user data
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) return JSON.parse(savedUser);
        return currentUser; // Fallback to mock data
    });

    const { language, setLanguage, t } = useLanguage();

    const notifRef = useRef(null);
    const profileRef = useRef(null);
    const langRef = useRef(null);

    // Sync with localStorage changes (optional but good for multi-tab or immediate updates)
    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) setUser(JSON.parse(savedUser));
        };
        window.addEventListener('storage', handleStorageChange);
        
        // Polling as a fallback for same-tab updates if not using global state
        const interval = setInterval(handleStorageChange, 1000);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;
    
    const userName = user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : (user.name || "User");
    const userRole = user.profession || user.role || "Talaba";
    const userAvatar = user.firstName 
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=F59E0B&color=fff`
        : user.avatar;

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

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markOneRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const notifIcon = (type) => {
        if (type === 'message') return <ChatCircleDots weight="fill" />;
        if (type === 'success') return <CheckCircle weight="fill" />;
        return <BookOpen weight="fill" />;
    };

    const notifIconClass = (type) => {
        if (type === 'success') return 'notif-icon success';
        if (type === 'lesson') return 'notif-icon info';
        return 'notif-icon';
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
                    {isLangOpen && (
                        <div className="dropdown-menu active" style={{ right: 0, width: '150px' }}>
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
                    )}
                </div>

                {/* Notifications */}
                <div style={{ position: 'relative' }} ref={notifRef}>
                    <button className="icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                        <Bell weight={isNotifOpen ? 'fill' : 'regular'} />
                        {unreadCount > 0 && (
                            <span className="badge">{unreadCount}</span>
                        )}
                    </button>

                    {isNotifOpen && (
                        <div className="dropdown-menu notifications-dropdown active">
                            <div className="dropdown-header">
                                <span>
                                    {t('header.notifications')}
                                    {unreadCount > 0 && (
                                        <span style={{ fontSize: '0.75rem', background: 'var(--color-primary)', color: '#000', borderRadius: '99px', padding: '1px 7px', marginLeft: '6px' }}>
                                            {unreadCount}
                                        </span>
                                    )}
                                </span>
                                {unreadCount > 0 && (
                                    <button className="read-all-btn" onClick={markAllRead}>
                                        {t('header.readAll')}
                                    </button>
                                )}
                            </div>
                            <ul className="notification-list">
                                {notifications.length === 0 && (
                                    <li style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                        Bildirishnomalar yo'q
                                    </li>
                                )}
                                {notifications.map(notif => (
                                    <li
                                        key={notif.id}
                                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                                        onClick={() => markOneRead(notif.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={notifIconClass(notif.type)}>
                                            {notifIcon(notif.type)}
                                        </div>
                                        <div className="notif-content">
                                            <p style={{ fontWeight: !notif.read ? '600' : '400' }}>{notif.text}</p>
                                            <span className="time">{notif.time}</span>
                                        </div>
                                        {!notif.read && (
                                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0, alignSelf: 'center' }} />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <button className="icon-btn theme-toggle" onClick={toggleTheme}>
                    {isDark ? <Moon /> : <Sun />}
                </button>

                {/* Profile */}
                <div style={{ position: 'relative' }} ref={profileRef}>
                    <div className="profile-dropdown" onClick={() => setIsProfileOpen(!isProfileOpen)} style={{ cursor: 'pointer' }}>
                        <img src={userAvatar} alt="User" className="avatar-sm" />
                    </div>

                    {isProfileOpen && (
                        <div className="dropdown-menu profile-menu active">
                            <div className="profile-header">
                                <img src={userAvatar} alt="User" className="avatar-sm" />
                                <div>
                                    <p className="name">{userName}</p>
                                    <p className="role">{userRole}</p>
                                </div>
                            </div>
                            <ul className="menu-list">
                                <li><Link to="/app/settings" onClick={() => setIsProfileOpen(false)}><User /> {t('header.edit')}</Link></li>
                                <li><Link to="/app/settings" onClick={() => setIsProfileOpen(false)}><Gear /> {t('sidebar.settings')}</Link></li>
                                <li className="divider"></li>
                                <li><a href="/" className="danger" onClick={(e) => { e.preventDefault(); localStorage.removeItem('currentUser'); window.location.href = '/'; }}><SignOut /> {t('header.logout')}</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
