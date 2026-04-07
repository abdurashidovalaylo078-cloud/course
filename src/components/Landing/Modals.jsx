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
                    <div className="modal-content-premium register-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-premium">
                             <div className="header-title">
                                <div className="icon-wrapper bg-amber-gradient">
                                    <User weight="bold" size={24} color="#fff" />
                                </div>
                                <div className="title-text">
                                    <h3>{tr.title}</h3>
                                    <p className="subtitle">{tr.subtitle || "Hamma ma'lumotlarni to'ldiring"}</p>
                                </div>
                             </div>
                             <button className="close-btn" onClick={() => setShowRegister(false)}><X size={24} weight="bold" /></button>
                        </div>
                        <div className="modal-body-premium">
                            <div className="alert-warning-premium">
                                <div className="alert-icon"><Bell weight="fill" /></div>
                                <div className="alert-text">
                                    <strong>Diqqat!</strong>
                                    <p>{tr.warning}</p>
                                </div>
                            </div>

                            <form className="register-form-premium">
                                <div className="form-group-row">
                                    <div className="input-field">
                                        <label>{tr.firstName}</label>
                                        <input type="text" placeholder="Ismingizni kiriting" />
                                    </div>
                                    <div className="input-field">
                                        <label>{tr.lastName}</label>
                                        <input type="text" placeholder="Familiyangizni kiriting" />
                                    </div>
                                </div>
                                
                                <div className="input-field">
                                    <label>{tr.middleName}</label>
                                    <input type="text" placeholder="Sharifingizni kiriting" />
                                </div>

                                <div className="form-group-row">
                                    <div className="input-field">
                                        <label>{tr.selectDir}</label>
                                        <div className="select-box-premium">
                                            <select defaultValue="">
                                                <option value="" disabled>{tr.selectDir}</option>
                                                <option>{tr.dir1}</option>
                                                <option>{tr.dir2}</option>
                                                <option>{tr.dir3}</option>
                                            </select>
                                            <CaretDown className="select-icon" />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>{tr.selectRegion}</label>
                                        <div className="select-box-premium">
                                            <select defaultValue="">
                                                <option value="" disabled>{tr.selectRegion}</option>
                                                <option>Toshkent</option>
                                                <option>Samarqand</option>
                                                <option>Andijon</option>
                                            </select>
                                            <CaretDown className="select-icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-row">
                                    <div className="input-field">
                                        <label>{tr.phone}</label>
                                        <input type="text" placeholder="+998 (__) ___-__-__" />
                                    </div>
                                    <div className="input-field">
                                        <label>{tr.email}</label>
                                        <input type="email" placeholder="example@mail.com" />
                                    </div>
                                </div>

                                <div className="modal-footer-premium">
                                    <button type="button" className="btn-cancel-premium" onClick={() => setShowRegister(false)}>{tr.cancel}</button>
                                    <button type="submit" className="btn-submit-premium" onClick={(e) => { e.preventDefault(); setShowRegister(false); }}>
                                        {tr.submit}
                                    </button>
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
                                <div className="icon-wrapper bg-amber-gradient">
                                    <Star weight="fill" color="#fff" size={24} />
                                </div>
                                <div className="title-text">
                                    <h3>{ta.title}</h3>
                                    <p className="subtitle">{ta.subtitle || "Kurs haqida batafsil ma'lumot"}</p>
                                </div>
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
