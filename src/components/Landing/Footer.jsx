import React from 'react';
import { Link } from 'react-router-dom';
import { Cube, InstagramLogo, TelegramLogo, YoutubeLogo } from '@phosphor-icons/react';

const Footer = ({ t }) => {
    return (
        <footer className="footer-premium">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="logo">
                        <div className="logo-icon"><Cube weight="fill" /></div>
                        <span>3D Max Pro</span>
                    </div>
                    <p>{t.footer.about}</p>
                    <div className="social-links">
                        <a href="#"><InstagramLogo size={24} weight="fill" /></a>
                        <a href="#"><TelegramLogo size={24} weight="fill" /></a>
                        <a href="#"><YoutubeLogo size={24} weight="fill" /></a>
                    </div>
                </div>
                <div className="footer-links">
                    <h4>{t.footer.links}</h4>
                    <ul>
                        <li><a href="#courses">Kurslar</a></li>
                        <li><a href="#">Sertifikatlar</a></li>
                        <li><a href="#">Hamjamiyat</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>{t.footer.contact}</h4>
                    <ul>
                        <li><Link to="/app/chat">Guruh Chat</Link></li>
                        <li><a href="tel:+998901234567">+998 90 123-45-67</a></li>
                        <li><a href="mailto:info@3dmaxpro.uz">info@3dmaxpro.uz</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} 3D Max Pro. {t.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
