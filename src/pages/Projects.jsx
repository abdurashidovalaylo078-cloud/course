import React, { useState } from 'react';
import {
    FolderOpen, CheckCircle, Clock, UploadSimple, Eye, Star,
    Trophy, BookOpen, X, PaperclipHorizontal, ArrowRight,
    FileArrowUp, WarningCircle, SealCheck, Info, ArrowCounterClockwise
} from '@phosphor-icons/react';
import { coursesData } from '../data';

/* ── helper: barcha homework larni olish ── */
const buildProjects = () => {
    const list = [];
    const colors = { 1: '#F59E0B', 2: '#10B981', 3: '#3B82F6', 4: '#8B5CF6' };
    coursesData.forEach(course => {
        course.modules.forEach(mod => {
            mod.lessons.forEach(lesson => {
                if (lesson.type === 'homework') {
                    list.push({
                        ...lesson,
                        courseId:    course.id,
                        courseTitle: course.title,
                        courseColor: colors[course.id] || '#6B7280',
                        moduleName:  mod.title,
                        instructor:  course.instructor,
                    });
                }
            });
        });
    });
    return list;
};

const gradeColor = { A: '#10B981', B: '#3B82F6', C: '#F59E0B', D: '#EF4444' };

/* ── STATUS badge config ── */
const statusCfg = {
    submitted:  { label: 'Yuborilgan',  color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
    pending:    { label: 'Kutilmoqda',  color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    not_checked:{ label: 'Tekshirilmagan', color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
};

/* ═══════════════════════ COMPONENT ═══════════════════════ */
const Projects = () => {
    const [projects, setProjects]   = useState(buildProjects);
    const [filter,   setFilter]     = useState('all');
    const [detail,   setDetail]     = useState(null);   // detail modal
    const [upload,   setUpload]     = useState(null);   // upload modal
    const [success,  setSuccess]    = useState(false);  // success toast
    const [isResubmit, setIsResubmit] = useState(false); // qayta yuborish

    /* ── Upload form state ── */
    const [form, setForm] = useState({ description: '', fileName: '', fileSize: '' });
    const [submitting, setSubmitting] = useState(false);

    /* ── Filtered list ── */
    const filtered =
        filter === 'submitted' ? projects.filter(p => p.status === 'submitted') :
        filter === 'pending'   ? projects.filter(p => p.status === 'pending')   :
        projects;

    const stats = {
        total:     projects.length,
        submitted: projects.filter(p => p.status === 'submitted').length,
        graded:    projects.filter(p => p.reviewGrade).length,
    };

    /* ── Handle file input ── */
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const mb = (file.size / 1024 / 1024).toFixed(1);
        setForm(f => ({ ...f, fileName: file.name, fileSize: `${mb} MB` }));
    };

    /* ── open upload helper ── */
    const openUpload = (proj, resubmit = false) => {
        setUpload(proj);
        setIsResubmit(resubmit);
        setForm({ description: '', fileName: '', fileSize: '' });
    };

    /* ── Submit project ── */
    const handleSubmit = () => {
        if (!form.description.trim() && !form.fileName) return;
        setSubmitting(true);
        setTimeout(() => {
            setProjects(prev =>
                prev.map(p =>
                    p.id === upload.id
                        ? { ...p, status: 'submitted', reviewStatus: 'not_checked' }
                        : p
                )
            );
            setSubmitting(false);
            setUpload(null);
            setIsResubmit(false);
            setForm({ description: '', fileName: '', fileSize: '' });
            setSuccess(isResubmit ? 'resubmit' : 'submit');
            setTimeout(() => setSuccess(false), 3500);
        }, 1500);
    };

    /* ══════════════════ RENDER ══════════════════ */
    return (
        <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto', fontFamily: 'inherit' }}>

            {/* ── Page title ── */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ display:'flex', alignItems:'center', gap:'0.7rem', fontSize:'1.9rem', fontWeight:800, color:'var(--color-text-main)', margin:0 }}>
                    <FolderOpen weight="fill" color="#F59E0B" size={34} />
                    Mening Loyihalarim
                </h1>
                <p style={{ color:'var(--color-text-muted)', fontSize:'0.95rem', marginTop:'0.4rem' }}>
                    Kurs bo'yicha barcha uyga vazifa va yakuniy loyihalaringiz
                </p>
            </div>

            {/* ── Stats cards ── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'2rem' }}>
                {[
                    { icon: <BookOpen weight="fill" size={22}/>,    label:'Jami loyihalar', value:stats.total,     color:'#3B82F6' },
                    { icon: <CheckCircle weight="fill" size={22}/>, label:'Yuborilgan',     value:stats.submitted, color:'#10B981' },
                    { icon: <Trophy weight="fill" size={22}/>,      label:'Baholangan',     value:stats.graded,    color:'#F59E0B' },
                ].map((s,i) => (
                    <div key={i} style={{ background:'var(--color-bg-card)', borderRadius:16, padding:'1.3rem', border:'1px solid var(--color-border)', display:'flex', alignItems:'center', gap:'1rem' }}>
                        <div style={{ width:48, height:48, borderRadius:12, background:`${s.color}22`, display:'flex', alignItems:'center', justifyContent:'center', color:s.color }}>
                            {s.icon}
                        </div>
                        <div>
                            <div style={{ fontSize:'2rem', fontWeight:800, color:'var(--color-text-main)', lineHeight:1 }}>{s.value}</div>
                            <div style={{ fontSize:'0.8rem', color:'var(--color-text-muted)', marginTop:2 }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Filter tabs ── */}
            <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem' }}>
                {[
                    { key:'all',       label:`Barchasi (${stats.total})` },
                    { key:'submitted', label:`Yuborilgan (${stats.submitted})` },
                    { key:'pending',   label:`Kutilmoqda (${stats.total - stats.submitted})` },
                ].map(tab => (
                    <button key={tab.key} onClick={() => setFilter(tab.key)}
                        style={{
                            padding:'0.5rem 1.2rem', borderRadius:30, border:'none',
                            background: filter===tab.key ? 'linear-gradient(135deg,#F59E0B,#EA580C)' : 'var(--color-bg-hover)',
                            color: filter===tab.key ? '#fff' : 'var(--color-text-muted)',
                            fontWeight:600, fontSize:'0.88rem', cursor:'pointer',
                            transition:'all 0.2s', fontFamily:'inherit',
                        }}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── Projects grid ── */}
            {filtered.length === 0 ? (
                <div style={{ textAlign:'center', padding:'4rem', color:'#6B7280' }}>
                    <FolderOpen size={60} style={{ marginBottom:'1rem', opacity:0.3 }}/>
                    <p style={{ fontSize:'1.1rem' }}>Loyihalar topilmadi</p>
                </div>
            ) : (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1.2rem' }}>
                    {filtered.map((proj, idx) => {
                        const st = statusCfg[proj.status] || statusCfg.pending;
                        return (
                            <div key={idx}
                                style={{ background:'var(--color-bg-card)', border:'1px solid var(--color-border)', borderRadius:16, padding:'1.4rem', position:'relative', overflow:'hidden', transition:'all 0.25s', cursor:'default' }}
                                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=proj.courseColor+'44'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.boxShadow=''; }}>

                                {/* top color bar */}
                                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${proj.courseColor},transparent)` }}/>

                                {/* Header row */}
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.8rem' }}>
                                    <span style={{ fontSize:'0.72rem', fontWeight:700, padding:'3px 10px', borderRadius:20, background:`${proj.courseColor}22`, color:proj.courseColor, maxWidth:'70%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                                        {proj.courseTitle}
                                    </span>
                                    {proj.reviewGrade && (
                                        <div style={{ width:32, height:32, borderRadius:'50%', background:`${gradeColor[proj.reviewGrade]}22`, border:`2px solid ${gradeColor[proj.reviewGrade]}`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'0.95rem', color:gradeColor[proj.reviewGrade], flexShrink:0 }}>
                                            {proj.reviewGrade}
                                        </div>
                                    )}
                                </div>

                                <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--color-text-main)', marginBottom:'0.3rem', lineHeight:1.4 }}>{proj.title}</h3>
                                <p  style={{ fontSize:'0.78rem', color:'var(--color-text-muted)', marginBottom:'1rem' }}>{proj.moduleName}</p>

                                {/* Ustoz izohi (agar bo'lsa) */}
                                {proj.reviewComment && (
                                    <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.18)', borderRadius:10, padding:'0.6rem 0.8rem', marginBottom:'0.8rem', fontSize:'0.78rem', color:'#6EE7B7', lineHeight:1.4 }}>
                                        <Star weight="fill" size={12} color="#10B981" style={{ marginRight:4 }}/>{proj.reviewComment}
                                    </div>
                                )}

                                {/* Footer */}
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                    <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.78rem', fontWeight:600, color:st.color, background:st.bg, padding:'4px 10px', borderRadius:20 }}>
                                        {proj.status==='submitted' ? <CheckCircle size={13} weight="fill"/> : <Clock size={13} weight="fill"/>}
                                        {st.label}
                                    </span>

                                    <div style={{ display:'flex', gap:6 }}>
                                        {/* Ko'rish tugmasi */}
                                        <button onClick={() => setDetail(proj)}
                                            style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', background:'rgba(59,130,246,0.12)', color:'#60A5FA', border:'none', borderRadius:8, fontSize:'0.76rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                                            <Eye size={13}/> Ko'rish
                                        </button>
                                        {/* Yuborish — pending */}
                                        {proj.status === 'pending' && (
                                            <button onClick={() => openUpload(proj, false)}
                                                style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', background:'linear-gradient(135deg,#F59E0B,#EA580C)', color:'#fff', border:'none', borderRadius:8, fontSize:'0.76rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 3px 10px rgba(245,158,11,0.3)' }}>
                                                <UploadSimple size={13}/> Yuborish
                                            </button>
                                        )}
                                        {/* Qayta yuborish — submitted */}
                                        {proj.status === 'submitted' && (
                                            <button onClick={() => openUpload(proj, true)}
                                                style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 10px', background:'rgba(99,102,241,0.15)', color:'#A5B4FC', border:'1px solid rgba(99,102,241,0.3)', borderRadius:8, fontSize:'0.76rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                                                <ArrowCounterClockwise size={13}/> Qayta yuborish
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}


            {/* ══════════ DETAIL MODAL ══════════ */}
            {detail && (
                <div onClick={() => setDetail(null)}
                    style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
                    <div onClick={e => e.stopPropagation()}
                        style={{ background:'var(--color-bg-card)', border:'1px solid var(--color-border)', borderRadius:20, width:'100%', maxWidth:520, overflow:'hidden', boxShadow:'var(--shadow-md)' }}>

                        {/* Header */}
                        <div style={{ padding:'1.4rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.07)', background:`linear-gradient(135deg,${detail.courseColor}18,transparent)`, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                            <div style={{ flex:1 }}>
                                <span style={{ fontSize:'0.72rem', fontWeight:700, padding:'3px 10px', borderRadius:20, background:`${detail.courseColor}33`, color:detail.courseColor, display:'inline-block', marginBottom:'0.5rem' }}>
                                    {detail.courseTitle}
                                </span>
                                <h2 style={{ fontSize:'1.15rem', fontWeight:800, color:'var(--color-text-main)', margin:0 }}>{detail.title}</h2>
                                <p style={{ color:'var(--color-text-muted)', fontSize:'0.82rem', marginTop:3 }}>{detail.moduleName} · {detail.instructor}</p>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', flexShrink:0, marginLeft:'1rem' }}>
                                {detail.reviewGrade && (
                                    <div style={{ width:44, height:44, borderRadius:'50%', background:`${gradeColor[detail.reviewGrade]}22`, border:`2px solid ${gradeColor[detail.reviewGrade]}`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'1.2rem', color:gradeColor[detail.reviewGrade] }}>
                                        {detail.reviewGrade}
                                    </div>
                                )}
                                <button onClick={() => setDetail(null)} style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF', cursor:'pointer' }}>
                                    <X size={18}/>
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding:'1.4rem 1.5rem', overflowY:'auto', maxHeight:'65vh' }}>

                            {/* Status */}
                            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'1.2rem' }}>
                                <span style={{ fontSize:'0.82rem', color:'var(--color-text-muted)', fontWeight:600 }}>Holat:</span>
                                <span style={{ fontSize:'0.82rem', fontWeight:700, color:statusCfg[detail.status]?.color, background:statusCfg[detail.status]?.bg, padding:'3px 10px', borderRadius:20 }}>
                                    {detail.status==='submitted' ? <CheckCircle size={13} weight="fill" style={{marginRight:4}}/> : <Clock size={13} weight="fill" style={{marginRight:4}}/>}
                                    {statusCfg[detail.status]?.label}
                                </span>
                            </div>

                            {/* Ustoz izohi */}
                            {detail.reviewComment && (
                                <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:12, padding:'1rem', marginBottom:'1.2rem' }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:'0.5rem' }}>
                                        <Star weight="fill" size={15} color="#10B981"/>
                                        <span style={{ fontSize:'0.82rem', fontWeight:700, color:'#10B981' }}>Ustoz izohi</span>
                                    </div>
                                    <p style={{ color:'var(--color-text-main)', fontSize:'0.9rem', lineHeight:1.6, margin:0 }}>{detail.reviewComment}</p>
                                </div>
                            )}

                            {/* Mezonlar */}
                            {detail.criteria && (
                                <div style={{ marginBottom:'1.2rem' }}>
                                    <p style={{ fontSize:'0.85rem', fontWeight:700, color:'var(--color-text-muted)', marginBottom:'0.7rem' }}>📋 Baholash mezonlari:</p>
                                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                                        {detail.criteria.map((c,i) => (
                                            <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', fontSize:'0.86rem', color:'var(--color-text-main)', background:'var(--color-bg-hover)', borderRadius:8, padding:'0.6rem 0.8rem' }}>
                                                <CheckCircle weight="fill" size={16} color="#10B981" style={{ flexShrink:0, marginTop:1 }}/>
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pending uchun yuborish yo'naltirish */}
                            {detail.status === 'pending' && (
                                <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:12, padding:'1rem', marginBottom:'1rem', display:'flex', alignItems:'center', gap:10 }}>
                                    <WarningCircle size={20} color="#F59E0B" weight="fill" style={{ flexShrink:0 }}/>
                                    <p style={{ color:'#FDE68A', fontSize:'0.88rem', lineHeight:1.5, margin:0 }}>
                                        Bu loyiha hali taqdim etilmagan. "Loyihani yuborish" tugmasini bosib, ishingizni yuboring.
                                    </p>
                                </div>
                            )}

                            {/* Footer */}
                            <div style={{ display:'flex', gap:'0.8rem', paddingTop:'0.8rem', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                                <button onClick={() => setDetail(null)}
                                    style={{ flex:1, padding:'0.8rem', background:'rgba(255,255,255,0.06)', color:'#9CA3AF', border:'none', borderRadius:10, fontWeight:600, fontSize:'0.92rem', cursor:'pointer', fontFamily:'inherit' }}>
                                    Yopish
                                </button>
                                {detail.status === 'pending' && (
                                    <button onClick={() => { setDetail(null); openUpload(detail, false); }}
                                        style={{ flex:2, padding:'0.8rem', background:'linear-gradient(135deg,#F59E0B,#EA580C)', color:'#fff', border:'none', borderRadius:10, fontWeight:700, fontSize:'0.92rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'inherit' }}>
                                        <UploadSimple size={18}/> Loyihani Yuborish
                                    </button>
                                )}
                                {detail.status === 'submitted' && (
                                    <button onClick={() => { setDetail(null); openUpload(detail, true); }}
                                        style={{ flex:2, padding:'0.8rem', background:'rgba(99,102,241,0.2)', border:'1px solid rgba(99,102,241,0.4)', color:'#A5B4FC', borderRadius:10, fontWeight:700, fontSize:'0.92rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'inherit' }}>
                                        <ArrowCounterClockwise size={18}/> Qayta Yuborish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* ══════════ UPLOAD MODAL ══════════ */}
            {upload && (
                <div onClick={() => { if (!submitting) setUpload(null); }}
                    style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
                    <div onClick={e => e.stopPropagation()}
                        style={{ background:'var(--color-bg-card)', border:'1px solid var(--color-border)', borderRadius:20, width:'100%', maxWidth:500, overflow:'hidden', boxShadow:'var(--shadow-md)' }}>

                        {/* Header */}
                        <div style={{ padding:'1.3rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center', background: isResubmit ? 'rgba(99,102,241,0.06)' : 'rgba(245,158,11,0.06)' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'0.7rem' }}>
                                <div style={{ width:38, height:38, borderRadius:10, background: isResubmit ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color: isResubmit ? '#A5B4FC' : '#F59E0B' }}>
                                    {isResubmit ? <ArrowCounterClockwise size={20} weight="fill"/> : <FileArrowUp size={20} weight="fill"/>}
                                </div>
                                <div>
                                    <h3 style={{ margin:0, fontSize:'1.05rem', fontWeight:800, color:'var(--color-text-main)' }}>{isResubmit ? 'Loyihani qayta yuborish' : 'Loyihani yuborish'}</h3>
                                    <p style={{ margin:0, fontSize:'0.75rem', color:'var(--color-text-muted)', marginTop:1 }}>{upload.title}</p>
                                </div>
                            </div>
                            {!submitting && (
                                <button onClick={() => setUpload(null)} style={{ background:'rgba(255,255,255,0.07)', border:'none', borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF', cursor:'pointer' }}>
                                    <X size={18}/>
                                </button>
                            )}
                        </div>

                        {/* Body */}
                        <div style={{ padding:'1.5rem' }}>

                            {/* Info */}
                            <div style={{ display:'flex', gap:10, background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:12, padding:'0.9rem', marginBottom:'1.3rem' }}>
                                <Info size={18} color="#60A5FA" weight="fill" style={{ flexShrink:0, marginTop:1 }}/>
                                <p style={{ color:'#BFDBFE', fontSize:'0.84rem', lineHeight:1.5, margin:0 }}>
                                    Loyihangizni {upload.courseTitle} kursi doirasida ustoz <strong>{upload.instructor}</strong> ko'rib chiqadi. Fayl yuklang va qisqacha izoh qoldirib, "Yuborish" tugmasini bosing.
                                </p>
                            </div>

                            {/* File upload area */}
                            <div style={{ marginBottom:'1.2rem' }}>
                                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:700, color:'#D1D5DB', marginBottom:'0.5rem' }}>
                                    📎 Loyiha fayli <span style={{ color:'#EF4444' }}>*</span>
                                </label>
                                <label htmlFor="project-file"
                                    style={{
                                        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                                        border:`2px dashed ${form.fileName ? '#10B981' : 'rgba(255,255,255,0.15)'}`,
                                        borderRadius:12, padding:'1.5rem', cursor:'pointer',
                                        background: form.fileName ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)',
                                        transition:'all 0.2s',
                                    }}>
                                    {form.fileName ? (
                                        <>
                                            <CheckCircle size={32} color="#10B981" weight="fill" style={{ marginBottom:'0.5rem' }}/>
                                            <span style={{ fontSize:'0.9rem', fontWeight:700, color:'#10B981' }}>{form.fileName}</span>
                                            <span style={{ fontSize:'0.78rem', color:'#6B7280', marginTop:3 }}>{form.fileSize} · O'zgartirish uchun bosing</span>
                                        </>
                                    ) : (
                                        <>
                                            <PaperclipHorizontal size={32} color="#6B7280" style={{ marginBottom:'0.5rem' }}/>
                                            <span style={{ fontSize:'0.88rem', color:'#9CA3AF', fontWeight:600 }}>Fayl tanlash uchun bosing</span>
                                            <span style={{ fontSize:'0.75rem', color:'#6B7280', marginTop:3 }}>PNG, JPG, PDF, ZIP, MAX — max 50 MB</span>
                                        </>
                                    )}
                                </label>
                                <input id="project-file" type="file" accept=".png,.jpg,.jpeg,.pdf,.zip,.rar,.max,.3ds" style={{ display:'none' }} onChange={handleFile}/>
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom:'1.5rem' }}>
                                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:700, color:'#D1D5DB', marginBottom:'0.5rem' }}>
                                    📝 Izoh yozing <span style={{ color:'#6B7280' }}>(ixtiyoriy)</span>
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Loyihangiz haqida qisqacha tushuntiring: nimani qiyindek keldingiz, nimani yaxshi qildingiz..."
                                    rows={4}
                                    style={{
                                        width:'100%', padding:'0.9rem 1rem',
                                        background:'var(--color-bg-dark)',
                                        border:'1px solid var(--color-border)',
                                        borderRadius:12, color:'var(--color-text-main)',
                                        fontSize:'0.88rem', resize:'vertical',
                                        outline:'none', fontFamily:'inherit',
                                        lineHeight:1.6, transition:'border-color 0.2s',
                                        boxSizing:'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor='rgba(245,158,11,0.5)'}
                                    onBlur={e  => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                                />
                            </div>

                            {/* Validation hint */}
                            {!form.fileName && !form.description && (
                                <p style={{ fontSize:'0.78rem', color:'#EF4444', marginBottom:'0.8rem', display:'flex', alignItems:'center', gap:5 }}>
                                    <WarningCircle size={14}/> Fayl yoki izoh kiritish talab etiladi
                                </p>
                            )}

                            {/* Action buttons */}
                            <div style={{ display:'flex', gap:'0.8rem' }}>
                                <button onClick={() => setUpload(null)} disabled={submitting}
                                    style={{ flex:1, padding:'0.9rem', background:'rgba(255,255,255,0.06)', color:'#9CA3AF', border:'none', borderRadius:12, fontWeight:600, fontSize:'0.95rem', cursor:'pointer', fontFamily:'inherit', opacity: submitting ? 0.5 : 1 }}>
                                    Bekor qilish
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || (!form.fileName && !form.description.trim())}
                                    style={{
                                        flex:2, padding:'0.9rem',
                                        background: (!form.fileName && !form.description.trim()) || submitting
                                            ? 'rgba(255,255,255,0.08)'
                                            : 'linear-gradient(135deg,#F59E0B,#EA580C)',
                                        color: (!form.fileName && !form.description.trim()) ? '#6B7280' : '#fff',
                                        border:'none', borderRadius:12, fontWeight:700,
                                        fontSize:'0.95rem', cursor: (!form.fileName && !form.description.trim()) ? 'not-allowed' : 'pointer',
                                        display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                                        fontFamily:'inherit', transition:'all 0.2s',
                                        boxShadow: (!form.fileName && !form.description.trim()) ? 'none' : '0 4px 15px rgba(245,158,11,0.35)',
                                    }}>
                                    {submitting ? (
                                        <>
                                            <div style={{ width:18, height:18, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                                            Yuborilmoqda...
                                        </>
                                    ) : (
                                        <><UploadSimple size={18}/> Yuborish <ArrowRight size={16}/></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════ SUCCESS TOAST ══════════ */}
            {success && (
                <div style={{
                    position:'fixed', bottom:'2rem', right:'2rem', zIndex:99999,
                    background: success==='resubmit' ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'linear-gradient(135deg,#059669,#10B981)',
                    borderRadius:14, padding:'1rem 1.4rem',
                    display:'flex', alignItems:'center', gap:'0.8rem',
                    boxShadow: success==='resubmit' ? '0 10px 30px rgba(99,102,241,0.4)' : '0 10px 30px rgba(16,185,129,0.4)',
                    animation:'slideInRight 0.4s ease-out',
                }}>
                    {success==='resubmit' ? <ArrowCounterClockwise size={26} weight="fill" color="#fff"/> : <SealCheck size={26} weight="fill" color="#fff"/>}
                    <div>
                        <div style={{ color:'#fff', fontWeight:700, fontSize:'0.95rem' }}>
                            {success==='resubmit' ? 'Loyiha qayta yuborildi!' : 'Loyiha muvaffaqiyatli yuborildi!'}
                        </div>
                        <div style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.8rem' }}>Ustoz tez orada ko'rib chiqadi</div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to   { transform: translateX(0);     opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Projects;
