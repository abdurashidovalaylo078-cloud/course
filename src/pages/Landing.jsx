import React, { useState } from 'react';
import AIAssistant from '../components/AIAssistant';
import { translations } from '../data/landingData';

// Sub-components
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Stats from '../components/Landing/Stats';
import Courses from '../components/Landing/Courses';
import Process from '../components/Landing/Process';
import Features from '../components/Landing/Features';
import Testimonials from '../components/Landing/Testimonials';
import FAQ from '../components/Landing/FAQ';
import Footer from '../components/Landing/Footer';
import Modals from '../components/Landing/Modals';

const Landing = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin,    setShowLogin]    = useState(false);
    const [showAbout,    setShowAbout]    = useState(false);
    const [lang,         setLang]         = useState('uz');
    const [showLangMenu, setShowLangMenu] = useState(false);

    const t = translations[lang];

    return (
        <div className="landing-page-root">
            <Header 
                t={t} 
                lang={lang} 
                translations={translations} 
                setLang={setLang} 
                showLangMenu={showLangMenu} 
                setShowLangMenu={setShowLangMenu} 
                setShowLogin={setShowLogin}
            />

            <Hero 
                t={t} 
                setShowRegister={setShowRegister} 
                setShowAbout={setShowAbout} 
            />

            <Stats stats={t.stats} />

            <Courses tc={t.courses} />

            <Process process={t.process} />

            <Features tf={t.features} />

            <Testimonials testimonials={t.testimonials} />

            <FAQ faq={t.faq} />

            <Footer t={t} />

            <Modals 
                showRegister={showRegister} 
                setShowRegister={setShowRegister} 
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                showAbout={showAbout} 
                setShowAbout={setShowAbout} 
                tr={t.register} 
                tl={t.login}
                ta={t.about} 
            />

            <AIAssistant />

            {/* BG Decoration */}
            <div className="bg-glow g1"></div>
            <div className="bg-glow g2"></div>
        </div>
    );
};

export default Landing;
