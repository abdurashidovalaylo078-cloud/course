import { NavLink } from 'react-router-dom';
import { Cube, Video, Certificate, ChatsCircle, Gear } from '@phosphor-icons/react';
import { currentUser } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
    const { t } = useLanguage();

    return (
        <aside className="sidebar">
            <div className="logo-area">
                <div className="logo-icon">
                    <Cube weight="fill" />
                </div>
                <h1>3D Max Pro</h1>
            </div>

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

            <div className="user-profile-mini">
                <img src={currentUser.avatar} alt="User" className="avatar" />
                <div className="user-info">
                    <p className="name">{currentUser.name}</p>
                    <p className="role">{currentUser.role}</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
