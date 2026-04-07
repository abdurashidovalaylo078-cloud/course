import React from 'react';
import { ArrowRight, Play } from '@phosphor-icons/react';

const Hero = ({ t, setShowRegister, setShowAbout }) => {
    return (
        <main className="container hero-section">
            <div className="hero-content">
                <div className="hero-badge">{t.hero.badge}</div>
                <h1 className="hero-title">{t.hero.title}</h1>
                <p className="hero-subtitle">{t.hero.subtitle}</p>
                <div className="hero-buttons">
                    <button onClick={() => setShowRegister(true)} className="btn-primary-hero">
                        {t.hero.btnRegister} <ArrowRight weight="bold" />
                    </button>
                    <button onClick={() => setShowAbout(true)} className="btn-secondary-hero">
                        <Play weight="fill" /> {t.hero.btnAbout}
                    </button>
                </div>
            </div>
            <div className="hero-visual">
                <div className="hero-3d-placeholder">
                    <div className="mesh-gradient"></div>
                    <img src="/hero-3d.png" alt="3D Visual" />
                </div>
            </div>
        </main>
    );
};

export default Hero;
