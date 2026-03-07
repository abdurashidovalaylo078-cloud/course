import { NavLink } from 'react-router-dom';
import { Cube, Video, Certificate, ChatsCircle, Gear } from '@phosphor-icons/react';
import { currentUser } from '../data';

const Sidebar = () => {
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
                    <span>Mening Kurslarim</span>
                </NavLink>
                <NavLink to="/app/certificates" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Certificate />
                    <span>Sertifikatlar</span>
                </NavLink>
                <NavLink to="/app/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <ChatsCircle />
                    <span>Guruh Chat</span>
                </NavLink>
                <NavLink to="/app/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Gear />
                    <span>Sozlamalar</span>
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
