import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
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
