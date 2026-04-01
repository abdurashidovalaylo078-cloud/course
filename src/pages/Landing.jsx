import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cube, Flag, RocketLaunch, VideoCamera, Users, Certificate, Briefcase, BookOpen, Star, User, X, Bell, CaretDown } from '@phosphor-icons/react';
import AIAssistant from '../components/AIAssistant';

const Landing = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
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
                    <button onClick={() => setShowRegister(true)} className="btn btn-white" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Ro'yxatdan o'tish <RocketLaunch size={20} />
                    </button>
                    <button onClick={() => setShowAbout(true)} className="btn btn-outline" style={{ cursor: 'pointer', fontFamily: 'inherit' }}>
                        Kurs Haqida <Star size={20} color="#FBBF24" weight="fill" />
                    </button>
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

        {showRegister && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', animation: 'fadeIn 0.2s ease-out' }}>
                <div style={{ background: '#fff', width: '100%', maxWidth: '650px', maxHeight: '95vh', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    {/* Header - fixed */}
                    <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, position: 'relative', zIndex: 10, background: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ background: '#F3F4F6', padding: '0.5rem', borderRadius: '10px', display: 'flex' }}>
                                <User color="#111827" weight="bold" size={22} />
                            </div>
                            <h3 style={{ margin: 0, color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>Ro'yxatdan o'tish</h3>
                        </div>
                        <button onClick={() => setShowRegister(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '0.2rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}>
                            <X size={24} weight="bold" />
                        </button>
                    </div>
                    
                    {/* Body - scrollable */}
                    <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { background: '#D1D5DB', borderRadius: '4px' } }}>
                        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <div style={{ marginTop: '0.1rem', flexShrink: 0 }}><Bell color="#D97706" weight="fill" size={20} /></div>
                            <p style={{ margin: 0, color: '#111827', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 }}>Diqqat! Shaxsiy ma'lumotlaringizni pasportingizdagi kabi to'liq va aniq kiriting.</p>
                        </div>
                        
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                                <input type="text" placeholder="Ism*" style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#D1D5DB'} onBlur={(e) => e.target.style.borderColor = '#F3F4F6'} />
                                <input type="text" placeholder="Familiya*" style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#D1D5DB'} onBlur={(e) => e.target.style.borderColor = '#F3F4F6'} />
                            </div>
                            
                            <input type="text" placeholder="Sharifi*" style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#D1D5DB'} onBlur={(e) => e.target.style.borderColor = '#F3F4F6'} />
                            
                            <div style={{ position: 'relative' }}>
                                <select style={{ appearance: 'none', padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#9CA3AF', width: '100%', outline: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.color = '#111827'; }} onBlur={(e) => { e.target.style.borderColor = '#F3F4F6'; if(!e.target.value) e.target.style.color = '#9CA3AF'; }} onChange={(e) => e.target.style.color = '#111827'}>
                                    <option value="">Yonalishni tanlang*</option>
                                    <option value="1">3D Max Asoslari</option>
                                    <option value="2">Interyer Vizualizatsiyasi</option>
                                    <option value="3">Eksteryer va Landshaft Dizayni</option>
                                </select>
                                <CaretDown size={20} color="#6B7280" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                            
                            <div style={{ position: 'relative' }}>
                                <select style={{ appearance: 'none', padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#9CA3AF', width: '100%', outline: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.color = '#111827'; }} onBlur={(e) => { e.target.style.borderColor = '#F3F4F6'; if(!e.target.value) e.target.style.color = '#9CA3AF'; }} onChange={(e) => e.target.style.color = '#111827'}>
                                    <option value="">Yashash hududingizni tanlang</option>
                                    <option value="tashkent">Toshkent viloyati</option>
                                    <option value="samarkand">Samarqand viloyati</option>
                                    <option value="andijan">Andijon viloyati</option>
                                    <option value="fergana">Farg'ona viloyati</option>
                                </select>
                                <CaretDown size={20} color="#6B7280" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                            
                            <input type="text" placeholder="DD-MM-YYYY" style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.type = 'date'; e.target.style.color = '#111827'; }} onBlur={(e) => { e.target.style.borderColor = '#F3F4F6'; if(!e.target.value) { e.target.type = 'text'; e.target.style.color = '#6B7280'; } }} />
                            
                            <input type="text" placeholder="+998" style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#D1D5DB'} onBlur={(e) => e.target.style.borderColor = '#F3F4F6'} />
                            
                            <input type="email" placeholder="Pochta manzilingizni kiriting*" style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '10px', color: '#111827', width: '100%', outline: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#D1D5DB'} onBlur={(e) => e.target.style.borderColor = '#F3F4F6'} />

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                                <button
                                    onClick={(e) => { e.preventDefault(); setShowRegister(false); }}
                                    style={{ flex: 1, padding: '1.2rem', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.background = '#E5E7EB'}
                                    onMouseOut={(e) => e.currentTarget.style.background = '#F3F4F6'}
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    onClick={(e) => { e.preventDefault(); setShowRegister(false); }}
                                    style={{ flex: 2, padding: '1.2rem', background: 'linear-gradient(135deg, #F59E0B, #EA580C)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.4)', transition: 'transform 0.1s, box-shadow 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(245, 158, 11, 0.4)'}
                                    onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(245, 158, 11, 0.4)'}
                                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    Jo'natish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {showAbout && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', animation: 'fadeIn 0.2s ease-out' }}>
                <div style={{ background: '#fff', width: '100%', maxWidth: '600px', maxHeight: '95vh', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    {/* Header */}
                    <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ background: '#FEF3C7', padding: '0.5rem', borderRadius: '10px', display: 'flex' }}>
                                <Star color="#D97706" weight="fill" size={22} />
                            </div>
                            <h3 style={{ margin: 0, color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>Kurs haqida ma'lumot</h3>
                        </div>
                        <button onClick={() => setShowAbout(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                            <X size={24} weight="bold" />
                        </button>
                    </div>
                    {/* Body */}
                    <div style={{ overflowY: 'auto', flex: 1, color: '#4B5563', lineHeight: '1.6' }}>

                        {/* Stats bar */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '1.2rem 1.5rem', gap: '0.5rem', textAlign: 'center' }}>
                            <div><div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>1200+</div><div style={{ color: '#a5b4fc', fontSize: '0.75rem' }}>O'quvchi</div></div>
                            <div><div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>120+</div><div style={{ color: '#a5b4fc', fontSize: '0.75rem' }}>Dars</div></div>
                            <div><div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>4.9⭐</div><div style={{ color: '#a5b4fc', fontSize: '0.75rem' }}>Reyting</div></div>
                            <div><div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>3</div><div style={{ color: '#a5b4fc', fontSize: '0.75rem' }}>Ustoz</div></div>
                        </div>

                        <div style={{ padding: '1.5rem' }}>

                        {/* About */}
                        <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>🎯 Bu kurs kimlar uchun?</h4>
                        <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>Ushbu kurs 3D dizayn va vizualizatsiya olamiga yangi kirib kelayotganlar, shuningdek o'z mahoratini oshirmoqchi bo'lgan arxitektor, qurilish muhandisi va interyer dizaynerlar uchun mo'ljallangan. Hech qanday oldindan bilim talab etilmaydi — siz uchun hammasi noldan va qadamba-qadam tushuntiriladi.</p>

                        {/* Modules */}
                        <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>📚 Kurs modullari</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                            {[
                                { n: '1-modul', t: '3D Max bilan tanishish', d: '10 dars · Interfeys, sozlamalar, asosiy buyruqlar' },
                                { n: '2-modul', t: 'Geometrik modellashtirish', d: '18 dars · Primitiv shakllar, Modify paneli, Boolean' },
                                { n: '3-modul', t: 'Interyer loyihalash', d: '25 dars · Xona dizayni, mebelь, devorlar, pollar' },
                                { n: '4-modul', t: 'Materiallar va teksturalar', d: '20 dars · Material Editor, UV mapping, procedural' },
                                { n: '5-modul', t: 'Yorug\'lik va kamera', d: '15 dars · HDRI yorug\'lik, VRay/Corona koerentligi' },
                                { n: '6-modul', t: 'Corona Render', d: '18 dars · Render sozlamalari, Denoise, Final output' },
                                { n: '7-modul', t: 'Eksteryer va landshaft', d: '14 dars · Bino fasadi, bog\', suv yuzasi effektlari' },
                            ].map((m, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.8rem 1rem', background: '#F9FAFB', borderRadius: '10px', border: '1px solid #F3F4F6', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'linear-gradient(135deg, #F59E0B, #EA580C)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '30px', whiteSpace: 'nowrap', marginTop: '2px' }}>{m.n}</div>
                                    <div>
                                        <div style={{ color: '#111827', fontWeight: 600, fontSize: '0.9rem' }}>{m.t}</div>
                                        <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>{m.d}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Skills */}
                        <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>✅ Nimalarni o'rganasiz?</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {[
                                '3D Max interfeysi va tezkor menyu',
                                'Noldan interyer modellashtirish',
                                'Fotorealistik vizualizatsiya',
                                'Materiallar va UV mapping',
                                'HDRI va Studio yorug\'lik',
                                'Corona Render professional sozlash',
                                'Eksteryer va fasad dizayni',
                                'Photoshop post-processing',
                                'Portfolio loyiha yaratish',
                                'Freelance va ish topish sirlari',
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#10B981', fontWeight: 700, flexShrink: 0 }}>✓</span>
                                    <span>{s}</span>
                                </div>
                            ))}
                        </div>


                        {/* Details table */}
                        <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>📋 Kurs tafsilotlari</h4>
                        <div style={{ background: '#F9FAFB', borderRadius: '10px', border: '1px solid #F3F4F6', overflow: 'hidden', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {[
                                { label: 'Darslar soni', val: '120+ ta video dars' },
                                { label: 'Umumiy davomiyligi', val: '3–6 oy (o\'z sur\'atingizda)' },
                                { label: 'Daraja', val: 'Boshlang\'ich → Professional' },
                                { label: 'Til', val: 'O\'zbek tili' },
                                { label: 'Sertifikat', val: 'Kurs yakunida taqdim etiladi ✅' },
                            ].map((row, i, arr) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 1rem', borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 600, color: '#6B7280' }}>{row.label}</span>
                                    <span style={{ color: '#111827', fontWeight: 500, textAlign: 'right' }}>{row.val}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <button onClick={() => { setShowAbout(false); setShowRegister(true); }} style={{ width: '100%', padding: '1.1rem', background: 'linear-gradient(135deg, #F59E0B, #EA580C)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(245,158,11,0.4)' }}>
                            🚀 Hoziroq Ro'yxatdan O'tish
                        </button>

                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Landing;
