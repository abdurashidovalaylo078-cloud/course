import { useState } from 'react';
import { Certificate as CertIcon, UserCircle, Calendar, Eye, DownloadSimple, XCircle, Printer, X, SealCheck } from '@phosphor-icons/react';
import { currentUser, certificatesData } from '../data';

const Certificates = () => {
    const [modalCert, setModalCert] = useState(null);

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

    const renderCertContent = (cert) => (
        <div id="cert-document" style={{
            background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #0f1923 100%)',
            width: '100%',
            aspectRatio: '1.414/1',
            boxSizing: 'border-box',
            position: 'relative',
            fontFamily: "'Inter', sans-serif",
            color: '#fff',
            borderRadius: '12px',
            overflow: 'hidden'
        }}>
            {/* Background shapes */}
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', border: '2px solid rgba(245,158,11,0.15)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', border: '2px solid rgba(245,158,11,0.1)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '280px', height: '280px', border: '1px solid rgba(245,158,11,0.08)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: 'linear-gradient(to bottom,#F59E0B,#d97706,#92400e)' }}></div>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '250px', height: '200px', background: 'radial-gradient(ellipse at top right,rgba(245,158,11,0.18) 0%,transparent 70%)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', pointerEvents: 'none' }}></div>

            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: '3% 4% 3% 5%' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg,#F59E0B,#d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(245,158,11,0.4)', flexShrink: 0 }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#1a1a1a" />
                                <path d="M2 17l10 5 10-5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                                <path d="M2 12l10 5 10-5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '1px', color: '#fff', lineHeight: 1.1 }}>3D Max <span style={{ color: '#F59E0B' }}>Pro</span></div>
                            <div style={{ fontSize: '0.55rem', letterSpacing: '3px', color: 'rgba(245,158,11,0.7)', textTransform: 'uppercase' }}>Online Ta'lim Markazi</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.55rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Sertifikat ID</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(245,158,11,0.8)', fontWeight: 600 }}>#3DMP-{cert.id.toString().padStart(4, '0')}-2024</div>
                    </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(to right,#F59E0B,rgba(245,158,11,0.3),transparent)', marginBottom: '4%' }}></div>

                {/* Body */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0 2%' }}>
                    <p style={{ fontSize: 'clamp(0.6rem,1.2vw,0.85rem)', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(245,158,11,0.7)', marginBottom: '1rem' }}>Muvaffaqiyat Sertifikati</p>
                    <div style={{ marginBottom: '1rem' }}>
                        <p style={{ fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>Ushbu sertifikat</p>
                        <h2 style={{
                            fontSize: 'clamp(1.6rem,4.5vw,3.2rem)',
                            fontWeight: 800,
                            margin: 0,
                            background: 'linear-gradient(135deg,#ffffff 0%,#F59E0B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1.1,
                            letterSpacing: '-0.5px'
                        }}>{currentUser.name}</h2>
                    </div>
                    <p style={{ fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>quyidagi kursni to'liq yakunlagan holda taqdim etiladi</p>
                    <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '8px', padding: '0.6rem 2rem', margin: '0 auto 0.8rem' }}>
                        <h3 style={{ fontSize: 'clamp(0.85rem,2vw,1.3rem)', color: '#F59E0B', margin: 0, fontWeight: 700, letterSpacing: '0.5px' }}>{cert.title}</h3>
                    </div>
                    <p style={{ fontSize: 'clamp(0.55rem,1vw,0.75rem)', color: 'rgba(255,255,255,0.35)', maxWidth: '80%', margin: '0 auto' }}>
                        Kurs davomida barcha modul va topshiriqlarni muvaffaqiyatli bajarib, kasbiy bilim va ko'nikmalarni o'zlashtirdi.
                    </p>
                </div>

                {/* Footer */}
                <div>
                    <div style={{ height: '1px', background: 'linear-gradient(to right,transparent,rgba(245,158,11,0.3),transparent)', marginBottom: '2%' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', border: '2px solid rgba(245,158,11,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,158,11,0.1)', boxShadow: '0 0 20px rgba(245,158,11,0.25),inset 0 0 15px rgba(245,158,11,0.05)', margin: '0 auto' }}>
                                <SealCheck weight="fill" style={{ fontSize: '2rem', color: '#F59E0B' }} />
                            </div>
                            <div style={{ fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(245,158,11,0.5)', textTransform: 'uppercase', marginTop: '0.3rem' }}>Tasdiqlangan</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'clamp(0.7rem,1.2vw,0.85rem)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '0.2rem' }}>{cert.issueDate}</div>
                            <div style={{ fontSize: 'clamp(0.55rem,0.9vw,0.65rem)', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Berilgan Sana</div>
                            <div style={{ width: '80px', height: '1px', background: 'rgba(245,158,11,0.4)', marginTop: '0.3rem' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="section-title">Mening Sertifikatlarim</h2>
            <div className="grid-3">
                {certificatesData.map(cert => (
                    <div key={cert.id} className="card cert-card" style={{ overflow: 'hidden', padding: 0 }}>
                        <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '2rem', textAlign: 'center', position: 'relative' }}>
                            <CertIcon weight="fill" style={{ fontSize: '3.5rem', color: '#F59E0B', marginBottom: '0.8rem', display: 'inline-block' }} />
                            <h3 style={{ color: 'white', marginBottom: '0.3rem' }}>{cert.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Kurs sertifikati</p>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                                <UserCircle color="var(--color-primary)" />
                                <span style={{ fontSize: '0.9rem' }}>{currentUser.name}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <Calendar color="var(--color-primary)" />
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Berilgan sana: {cert.issueDate}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModalCert(cert)}>
                                    <Eye /> Ko'rish
                                </button>
                                <button
                                    className="btn-primary"
                                    style={{ flex: 1, justifyContent: 'center', background: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
                                    onClick={() => { setModalCert(cert); setTimeout(printCert, 100); }}
                                >
                                    <DownloadSimple /> PDF
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
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
                                <Printer /> PDF sifatida saqlash
                            </button>
                            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid white', color: 'white' }} onClick={() => setModalCert(null)}>
                                <X /> Yopish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Certificates;
