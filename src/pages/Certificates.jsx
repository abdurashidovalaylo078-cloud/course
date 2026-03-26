import { useState } from 'react';
import { Certificate as CertIcon, UserCircle, Calendar, Eye, DownloadSimple, XCircle, Printer, X, SealCheck, LockSimple } from '@phosphor-icons/react';
import { currentUser, certificatesData, coursesData } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Certificates = () => {
    const [modalCert, setModalCert] = useState(null);
    const { t } = useLanguage();

    const printCert = () => {
        // This simple approach recreates the print structure from legacy app
        const printWindow = window.open('', '_blank');
        const content = document.getElementById('cert-document').outerHTML;

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Sertifikat</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
          <script src="https://unpkg.com/@phosphor-icons/web"></script>
          <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { background: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Inter', sans-serif;}
              #cert-document { width: 90vw; max-width: 900px; }
              @media print {
                  body { min-height: auto; }
                  #cert-document { width: 100%; max-width: 100%; border: none !important; }
              }
          </style>
      </head>
      <body>
        ${content}
        <script>
          // Timeout helps wait for fonts to load
          setTimeout(() => {
            window.print();
            window.close();
          }, 500);
        </script>
      </body>
      </html>
    `);
        printWindow.document.close();
    };

    const renderCertContent = (cert) => {
        const isInteriorViz = cert.courseId === 2;
        const isExteriorLand = cert.courseId === 3;
        
        let mainColor = '#F59E0B'; // Gold for basics
        let secondaryColor = '#d97706';
        let bgGradient = 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #0f1923 100%)';

        if (isInteriorViz) {
            mainColor = '#10B981'; // Green for Interior
            secondaryColor = '#059669';
            bgGradient = 'linear-gradient(135deg, #06110e 0%, #0d2a23 40%, #031511 100%)';
        } else if (isExteriorLand) {
            mainColor = '#3B82F6'; // Blue for Exterior/Landscape
            secondaryColor = '#1D4ED8';
            bgGradient = 'linear-gradient(135deg, #0a111a 0%, #112240 40%, #0a192f 100%)';
        }

        return (
            <div id="cert-document" style={{
                background: bgGradient,
                width: '100%',
                aspectRatio: '1.414/1',
                boxSizing: 'border-box',
                position: 'relative',
                fontFamily: "'Inter', sans-serif",
                color: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.05,
                    backgroundImage: `radial-gradient(${mainColor} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    pointerEvents: 'none'
                }}></div>

                {/* Decorations */}
                <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', border: `2px solid ${mainColor}26`, borderRadius: '50%', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', border: `2px solid ${mainColor}1A`, borderRadius: '50%', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '280px', height: '280px', border: `1px solid ${mainColor}14`, borderRadius: '50%', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', background: `linear-gradient(to bottom, ${mainColor}, ${secondaryColor}, #111)` }}></div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '250px', background: `radial-gradient(ellipse at top right, ${mainColor}2E 0%, transparent 70%)`, pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', inset: '15px', border: `1px solid ${mainColor}4D`, borderRadius: '10px', pointerEvents: 'none' }}></div>

                <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: '3% 5% 4% 6%' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: `linear-gradient(135deg, ${mainColor}, ${secondaryColor})`,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 8px 25px ${mainColor}4D`,
                                flexShrink: 0
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#000" fillOpacity="0.8" />
                                    <path d="M2 17l10 5 10-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
                                    <path d="M2 12l10 5 10-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '1px', color: '#fff', lineHeight: 1.1 }}>3D Max <span style={{ color: mainColor }}>Pro</span></div>
                                <div style={{ fontSize: '0.6rem', letterSpacing: '3px', color: `${mainColor}CC`, textTransform: 'uppercase' }}>{t('cert.center')}</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.6rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '2px' }}>{t('cert.id')}</div>
                            <div style={{ fontSize: '0.8rem', color: `${mainColor}CC`, fontWeight: 700, fontFamily: 'monospace' }}>MP-{cert.id.toString().padStart(4, '0')}-2026</div>
                        </div>
                    </div>

                    <div style={{ height: '2px', background: `linear-gradient(to right, ${mainColor}, ${mainColor}4D, transparent)`, marginBottom: '5%' }}></div>

                    {/* Body */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
                        <p style={{
                            fontSize: '0.85rem',
                            letterSpacing: '5px',
                            textTransform: 'uppercase',
                            color: `${mainColor}B3`,
                            marginBottom: '1.2rem',
                            fontWeight: 600
                        }}>{t('cert.title')}</p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.6rem' }}>{t('cert.thisIsTo')}</p>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                                fontWeight: 900,
                                margin: 0,
                                background: `linear-gradient(135deg, #ffffff 30%, ${mainColor} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                lineHeight: 1,
                                letterSpacing: '-1px'
                            }}>{currentUser.name}</h2>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.7rem' }}>{t('cert.forCompleting')}</p>

                        <div style={{
                            display: 'inline-block',
                            background: `${mainColor}14`,
                            border: `1.5px solid ${mainColor}4D`,
                            borderRadius: '10px',
                            padding: '0.8rem 2.5rem',
                            margin: '0 auto 1.2rem',
                            boxShadow: `0 10px 30px rgba(0,0,0,0.2)`
                        }}>
                            <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', color: mainColor, margin: 0, fontWeight: 800, letterSpacing: '0.5px' }}>
                                {t(`course.${cert.courseId}.title`) || cert.title}
                            </h3>
                        </div>

                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', maxWidth: '85%', margin: '0 auto', lineHeight: 1.6 }}>
                            {t('cert.description')}
                        </p>
                    </div>

                    {/* Footer */}
                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${mainColor}4D, transparent)`, marginBottom: '3%' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    border: `2px solid ${mainColor}99`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: `${mainColor}1A`,
                                    boxShadow: `0 0 30px ${mainColor}40, inset 0 0 20px ${mainColor}1A`,
                                    margin: '0 auto',
                                    position: 'relative'
                                }}>
                                    <SealCheck weight="fill" style={{ fontSize: '2.5rem', color: mainColor }} />
                                    {isInteriorViz && (
                                        <div style={{ position: 'absolute', bottom: '-5px', background: mainColor, color: '#000', fontSize: '0.45rem', fontWeight: 900, padding: '2px 5px', borderRadius: '4px', textTransform: 'uppercase' }}>Expert</div>
                                    )}
                                    {isExteriorLand && (
                                        <div style={{ position: 'absolute', bottom: '-5px', background: mainColor, color: '#fff', fontSize: '0.45rem', fontWeight: 900, padding: '2px 5px', borderRadius: '4px', textTransform: 'uppercase' }}>Pro</div>
                                    )}
                                </div>
                                <div style={{ fontSize: '0.55rem', letterSpacing: '2px', color: `${mainColor}80`, textTransform: 'uppercase', marginTop: '0.6rem', fontWeight: 700 }}>{t('cert.verified')}</div>
                            </div>

                            <div style={{ textAlign: 'center', minWidth: '120px' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginBottom: '0.2rem' }}>{cert.issueDate}</div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>{t('cert.issueDate')}</div>
                                <div style={{ width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, ${mainColor}80, transparent)`, marginTop: '0.5rem' }}></div>
                            </div>

                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <div style={{ width: '30px', height: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Signature</span>
                                </div>
                                <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', paddingRight: '10px' }}>Alisher Uzoqov</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h2 className="section-title">{t('certificates.title')}</h2>
            <div className="grid-3">
                {certificatesData.map(cert => {
                    const course = coursesData.find(c => c.id === cert.courseId);
                    const isCompleted = true; // Unlock all certificates

                    return (
                        <div key={cert.id} className={`card cert-card ${!isCompleted ? 'locked' : ''}`} style={{ overflow: 'hidden', padding: 0, opacity: isCompleted ? 1 : 0.8 }}>
                            <div style={{
                                background: isCompleted
                                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                                    : 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 50%, #0a0a0a 100%)',
                                padding: '2rem',
                                textAlign: 'center',
                                position: 'relative'
                            }}>
                                {isCompleted ? (
                                    <CertIcon weight="fill" style={{ fontSize: '3.5rem', color: '#F59E0B', marginBottom: '0.8rem', display: 'inline-block' }} />
                                ) : (
                                    <LockSimple weight="fill" style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.2)', marginBottom: '0.8rem', display: 'inline-block' }} />
                                )}
                                <h3 style={{ color: isCompleted ? 'white' : 'rgba(255,255,255,0.5)', marginBottom: '0.3rem' }}>{t(`course.${cert.courseId}.title`) || cert.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{t('certificates.courseCert')}</p>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: isCompleted ? 'inherit' : 'var(--color-text-muted)' }}>
                                    <UserCircle color={isCompleted ? "var(--color-primary)" : "rgba(255,255,255,0.2)"} />
                                    <span style={{ fontSize: '0.9rem' }}>{currentUser.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: isCompleted ? 'inherit' : 'var(--color-text-muted)' }}>
                                    <Calendar color={isCompleted ? "var(--color-primary)" : "rgba(255,255,255,0.2)"} />
                                    <span style={{ fontSize: '0.9rem', color: isCompleted ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.2)' }}>{t('certificates.issueDate')} {isCompleted ? cert.issueDate : '---'}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                    {isCompleted ? (
                                        <>
                                            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModalCert(cert)}>
                                                <Eye /> {t('certificates.view')}
                                            </button>
                                            <button
                                                className="btn-primary"
                                                style={{ flex: 1, justifyContent: 'center', background: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
                                                onClick={() => { setModalCert(cert); setTimeout(printCert, 100); }}
                                            >
                                                <DownloadSimple /> PDF
                                            </button>
                                        </>
                                    ) : (
                                        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', background: '#333', border: '1px solid #444', color: '#666', cursor: 'not-allowed' }} disabled>
                                            <LockSimple style={{ marginRight: '0.4rem' }} /> {course?.progress}% {t('courses.completed')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {modalCert && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', overflowY: 'auto' }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: 'auto' }}>
                        <button onClick={() => setModalCert(null)} style={{ position: 'absolute', top: '-3rem', right: 0, background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}>
                            <XCircle />
                        </button>

                        {renderCertContent(modalCert)}

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                            <button className="btn-primary" onClick={printCert}>
                                <Printer /> {t('certificates.saveAsPdf')}
                            </button>
                            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid white', color: 'white' }} onClick={() => setModalCert(null)}>
                                <X /> {t('certificates.close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Certificates;
