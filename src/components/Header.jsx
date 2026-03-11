import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Bell, Moon, Sun, ChatCircleDots, CheckCircle, User, Gear, SignOut } from '@phosphor-icons/react';
import { currentUser } from '../data';

const Header = () => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(true); // Default dark theme

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
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

    return (
        <header className="top-header">
            <div className="search-bar">
                <MagnifyingGlass />
                <input type="text" placeholder="Qidirish..." />
            </div>

            <div className="header-actions">
                {/* Notifications */}
                <div style={{ position: 'relative' }} ref={notifRef}>
                    <button className="icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                        <Bell />
                        <span className="badge">2</span>
                    </button>

                    <div className={`dropdown-menu notifications-dropdown ${isNotifOpen ? 'active' : ''}`} style={{ display: isNotifOpen ? 'block' : 'none' }}>
                        <div className="dropdown-header">
                            <span>Bildirishnomalar</span>
                            <button className="read-all-btn">Barchasini o'qish</button>
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
                            <li><Link to="/app/settings"><User /> Tahrirlash</Link></li>
                            <li><Link to="/app/settings"><Gear /> Sozlamalar</Link></li>
                            <li className="divider"></li>
                            <li><Link to="/" className="danger"><SignOut /> Chiqish</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
