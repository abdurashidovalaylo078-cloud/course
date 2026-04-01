import { Link } from 'react-router-dom';
import { Cube, Flag, RocketLaunch, VideoCamera, Users, Certificate, Briefcase, BookOpen, Star } from '@phosphor-icons/react';
import AIAssistant from '../components/AIAssistant';

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
                    <Link to="/app" className="lang-selector" style={{ textDecoration: 'none' }}>
                        <BookOpen weight="fill" /> Darslar
                    </Link>
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

                <div className="hero-buttons">
                    <Link to="/app" className="btn btn-white">
                        Bepul Boshlash <RocketLaunch size={20} />
                    </Link>
                    <a href="#kurslar" className="btn btn-outline">
                        Kurs Haqida <Star size={20} color="#FBBF24" />
                    </a>
                </div>
            </main>

            <section className="container courses-section" id="kurslar" style={{ padding: '8rem 2rem 5rem', zIndex: 10, position: 'relative' }}>
                <div className="section-header">
                    <h2>Bizning Kurslar</h2>
                    <p>Eng ko'p talab qilinadigan yo'nalishlar bo'yicha professional ta'lim</p>
                </div>
                
                <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    
                    {/* Course 1 */}
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Star weight="fill" color="#FBBF24" /> Yangi
                            </div>
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234, 88, 12, 0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>57 ta dars</span>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234, 88, 12, 0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>5 ta modul</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>3D Max Asoslari: Noldan Pro</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>Dasturni noldan o'rnatishdan boshlab murakkab interyerlarni vizualizatsiya qilishgacha bo'lgan barcha bilimlarni qamrab oladi.</p>
                            
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Alisher Uzoqov</span>
                                </div>
                                <Link to="/app" style={{ color: 'var(--color-accent)', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>Boshlash &rarr;</Link>
                            </div>
                        </div>
                    </div>

                    {/* Course 2 */}
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <RocketLaunch weight="fill" color="#10B981" /> Top
                            </div>
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234, 88, 12, 0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>33 ta dars</span>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234, 88, 12, 0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>4 ta modul</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Interyer Vizualizatsiyasi (Corona)</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>Fotorealistik interyer vizualizatsiyasi sirlari va Corona Render'da yorug'lik hamda materiallar bilan ishlash chuqur o'rgatiladi.</p>
                            
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>M</div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Malika Karimova</span>
                                </div>
                                <Link to="/app" style={{ color: 'var(--color-accent)', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>Boshlash &rarr;</Link>
                            </div>
                        </div>
                    </div>

                    {/* Course 3 */}
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                             <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Briefcase weight="fill" color="#3B82F6" /> Pro
                            </div>
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234, 88, 12, 0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>28 ta dars</span>
                                <span style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(234, 88, 12, 0.15)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 'bold' }}>4 ta modul</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Eksteryer va Landshaft Dizayni</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>Katta bino va inshootlar, shuningdek mintaqa va xususiy bog'larni (landshaft) loyihalash bo'yicha maxsus darslar to'plami.</p>
                            
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>D</div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>Davronbek</span>
                                </div>
                                <Link to="/app" style={{ color: 'var(--color-accent)', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>Boshlash &rarr;</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

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
            
            <AIAssistant />
        </>
    );
};

export default Landing;
