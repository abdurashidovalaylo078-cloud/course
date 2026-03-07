import { Link } from 'react-router-dom';
import { Cube, Flag, RocketLaunch, VideoCamera, Users, Certificate, Briefcase } from '@phosphor-icons/react';

const Landing = () => {
    return (
        <>
            <header className="container header">
                <div className="logo">
                    <div className="logo-icon">
                        <Cube weight="fill" />
                    </div>
                    <span>3D Max Pro</span>
                </div>

                <div className="header-right">
                    <div className="lang-selector">
                        <Flag /> O'zbek
                    </div>
                    <Link to="/app" className="btn btn-primary">Profil</Link>
                </div>
            </header>

            <main className="container hero-section">
                <h1 className="hero-title">
                    <span className="highlight"> Ijodkorlik olamiga birinchi qadamingizni qo'ying!</span>
                </h1>

                <p className="hero-subtitle">
                    3D modellashtirish, animatsiya, o'yin dizayni, VFX va boshqa <br />
                    ijodiy yo'nalishlarni o'rganmoqchimisiz?
                </p>

                <Link to="/app" className="btn btn-cta">
                    <RocketLaunch weight="fill" />
                    Profilga kirish
                </Link>
            </main>

            <section className="container features-section" id="asosiy">
                <div className="section-header">
                    <h2>Nega aynan 3D Max Pro?</h2>
                    <p>Biz sizga eng tajribali ustozlar va zamonaviy o'quv dasturini taqdim etamiz.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <VideoCamera weight="fill" />
                        </div>
                        <h3>Sifatli darslar</h3>
                        <p>Barcha darslar professional darajada tayyorlangan, amaliyotga asoslangan va tushunarli tilda yozib olingan.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Users weight="fill" />
                        </div>
                        <h3>Kuchli hamjamiyat</h3>
                        <p>Boshqa o'quvchilar va ustozlar bilan doimiy aloqada bo'ling, savollaringizga tezkor javob oling.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Certificate weight="fill" />
                        </div>
                        <h3>Maxsus sertifikat</h3>
                        <p>Kursni muvaffaqiyatli tugatganingizdan so'ng, bilimlaringizni tasdiqlovchi rasmiy sertifikatga ega bo'ling.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Briefcase weight="fill" />
                        </div>
                        <h3>Karyera uchun qadam</h3>
                        <p>O'rganilgan bilimlar orqali real loyihalarda qatnashib, daromad topishni boshlash imkoniyati.</p>
                    </div>
                </div>
            </section>

            {/* Background Elements */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
        </>
    );
};

export default Landing;
