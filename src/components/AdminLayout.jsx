import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link, NavLink } from 'react-router-dom';
import { 
    Layout as LayoutIcon, Users, BookOpen, 
    CheckSquare, ChartPie, Gear, SignOut, Cube 
} from '@phosphor-icons/react';
import Header from './Header';

const AdminLayout = () => {
    const navigate = useNavigate();
    
    // Simple admin check demo
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            // In a real app, you'd redirect. For demo, we'll allow it or set a flag.
            console.warn("Admin access only!");
        }
    }, [user, navigate]);

    return (
        <div className="app-container">
            {/* Admin Sidebar */}
            <aside className="sidebar">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div className="logo-area">
                        <div className="logo-icon" style={{ background: 'linear-gradient(to top right, #3b82f6, #10b981)' }}>
                            <Cube weight="fill" />
                        </div>
                        <h1 style={{ color: 'var(--color-text-main) !important' }}>Admin Panel</h1>
                    </div>
                </Link>

                <nav className="nav-menu">
                    <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutIcon />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Users />
                        <span>Foydalanuvchilar</span>
                    </NavLink>
                    <NavLink to="/admin/courses" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <BookOpen />
                        <span>Kurslar</span>
                    </NavLink>
                    <NavLink to="/admin/submissions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <CheckSquare />
                        <span>Vazifalar</span>
                    </NavLink>
                    <NavLink to="/admin/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <ChartPie />
                        <span>Analitika</span>
                    </NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Gear />
                        <span>Sozlamalar</span>
                    </NavLink>
                </nav>

                <div className="logout-section" style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    <div onClick={() => navigate('/app')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: 'var(--color-bg-hover)', borderRadius: '8px', color: 'var(--color-text-main)', cursor: 'pointer' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Saytga qaytish</span>
                        <SignOut size={20} />
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <Header />
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
