import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('currentUser');

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <div id="content-area" className="page-content" style={{ opacity: 1 }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
