import React from 'react';
import { Link } from 'react-router-dom';
import { Cube, Certificate, ChatsCircle, GearSix, Globe, CaretDown, Trophy } from '@phosphor-icons/react';

const Header = ({ t, lang, translations, setLang, showLangMenu, setShowLangMenu, setShowLogin, setShowRating }) => {
    return (
        <header className="container header">
            <div className="logo">
                <div className="logo-icon"><Cube weight="fill" /></div>
                <span>3D Max Pro</span>
            </div>

            <div className="header-right">
                <div className="nav-links-desktop">
                    <Link to="/app/certificates" className="nav-link-item">
                        <Certificate weight="fill" /> <span>{t.nav.certs}</span>
                    </Link>
                    <Link to="/app/rating" className="nav-link-item">
                        <Trophy weight="fill" /> <span>{t.nav.rating}</span>
                    </Link>
                    <Link to="/app/settings" className="nav-link-item">
                        <GearSix weight="fill" /> <span>{t.nav.settings}</span>
                    </Link>
                </div>

                <div className="lang-switcher-container">
                    <div className="lang-toggle" onClick={() => setShowLangMenu(!showLangMenu)}>
                        <Globe weight="fill" />
                        <span>{t.name}</span>
                        <CaretDown size={14} weight="bold" />
                    </div>
                    {showLangMenu && (
                        <div className="lang-dropdown">
                            {Object.entries(translations).map(([key, val]) => (
                                <div key={key} className={`lang-option ${lang === key ? 'active' : ''}`} onClick={() => { setLang(key); setShowLangMenu(false); }}>
                                    <span className="text">{val.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="auth-buttons">
                    {localStorage.getItem('currentUser') ? null : (
                        <button className="nav-link-item login-btn" onClick={() => setShowLogin(true)}>
                            <span>{t.nav.login}</span>
                        </button>
                    )}
                </div>

                {localStorage.getItem('currentUser') ? (
                    <Link to="/app" className="btn-profile-link">{t.nav.profile}</Link>
                ) : null}
            </div>
        </header>
    );
};

export default Header;
