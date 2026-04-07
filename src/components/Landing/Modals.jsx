import React from 'react';
import { User, X, Bell, CaretDown, Star } from '@phosphor-icons/react';

const Modals = ({ 
    showRegister, setShowRegister, 
    showAbout, setShowAbout, 
    tr, ta 
}) => {
    return (
        <>
            {showRegister && (
                <div className="modal-overlay" onClick={() => setShowRegister(false)}>
                    <div className="modal-content-premium" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-premium">
                             <div className="header-title">
                                <User weight="bold" size={24} /> <h3>{tr.title}</h3>
                             </div>
                             <button className="close-btn" onClick={() => setShowRegister(false)}><X size={24} weight="bold" /></button>
                        </div>
                        <div className="modal-body-premium">
                            <div className="alert-warning"><Bell weight="fill" /> <p>{tr.warning}</p></div>
                            <form className="register-form-premium">
                                <div className="form-row">
                                    <input type="text" placeholder={tr.firstName} />
                                    <input type="text" placeholder={tr.lastName} />
                                </div>
                                <input type="text" placeholder={tr.middleName} />
                                <div className="select-box">
                                    <select defaultValue=""><option value="" disabled>{tr.selectDir}</option><option>{tr.dir1}</option><option>{tr.dir2}</option><option>{tr.dir3}</option></select>
                                    <CaretDown className="select-icon" />
                                </div>
                                <div className="select-box">
                                    <select defaultValue=""><option value="" disabled>{tr.selectRegion}</option><option>Toshkent</option><option>Samarqand</option><option>Andijon</option></select>
                                    <CaretDown className="select-icon" />
                                </div>
                                <input type="text" placeholder={tr.phone} />
                                <input type="email" placeholder={tr.email} />
                                <div className="form-actions">
                                    <button className="btn-cancel" onClick={() => setShowRegister(false)}>{tr.cancel}</button>
                                    <button className="btn-submit" onClick={(e) => { e.preventDefault(); setShowRegister(false); }}>{tr.submit}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAbout && (
                <div className="modal-overlay" onClick={() => setShowAbout(false)}>
                    <div className="modal-content-premium about-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-premium">
                             <div className="header-title">
                                <Star weight="fill" color="#D97706" size={24} /> <h3>{ta.title}</h3>
                             </div>
                             <button className="close-btn" onClick={() => setShowAbout(false)}><X size={24} weight="bold" /></button>
                        </div>
                        <div className="modal-body-premium">
                            <div className="modal-stats-row">
                                {[{val:'1200+', l:ta.statStudents}, {val:'120+', l:ta.statLessons}, {val:'4.9⭐', l:ta.statRating}, {val:'3', l:ta.statTeachers}].map((s,i) => (
                                    <div key={i} className="m-stat">
                                        <span className="m-val">{s.val}</span>
                                        <span className="m-label">{s.l}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="m-section">
                                <h4>{ta.whoTitle}</h4>
                                <p>{ta.whoText}</p>
                            </div>
                            <div className="m-section">
                                <h4>{ta.modulesTitle}</h4>
                                <div className="m-list">
                                    {ta.modules.map((m, i) => (
                                        <div key={i} className="m-list-item">
                                            <div className="m-num">{m.n}</div>
                                            <div className="m-info"><b>{m.t}</b> <span>{m.d}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="btn-modal-cta" onClick={() => { setShowAbout(false); setShowRegister(true); }}>{ta.ctaBtn}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modals;
