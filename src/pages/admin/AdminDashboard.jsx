import React from 'react';
import { 
    Users, BookOpen, CheckSquare, ChartBar, 
    ArrowUpRight, Student, ChalkboardTeacher, TrendingUp 
} from '@phosphor-icons/react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Jami O\'quvchilar', value: '1,284', icon: <Users size={24}/>, color: '#3B82F6', change: '+12%' },
        { label: 'Faol Kurslar', value: '12', icon: <BookOpen size={24}/>, color: '#10B981', change: '+2' },
        { label: 'Tekshirilmagan Vazifalar', value: '48', icon: <CheckSquare size={24}/>, color: '#F59E0B', change: '-5' },
        { label: 'Oylik Daromad', value: '$12,400', icon: <ChartBar size={24}/>, color: '#8B5CF6', change: '+18%' },
    ];

    const recentActivity = [
        { id: 1, user: "Sanjar Jumaev", action: "Yangi vazifa topshirdi", time: "5 daqiqa avval", course: "3D Max Asoslari" },
        { id: 2, user: "Olimjon Sobirov", action: "Kursni tugatdi", time: "12 daqiqa avval", course: "Corona Render" },
        { id: 3, user: "Dilbar Azimova", action: "To'lov qildi", time: "45 daqiqa avval", course: "Eksteryer Dizayn" },
    ];

    return (
        <div className="admin-dashboard" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Admin Panel</h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Tizimning umumiy holati va boshqaruv</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '12px', 
                                background: `${stat.color}15`, 
                                color: stat.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {stat.icon}
                            </div>
                            <span style={{ 
                                fontSize: '0.8rem', 
                                fontWeight: 700, 
                                color: stat.change.startsWith('+') ? '#10B981' : '#EF4444',
                                background: stat.change.startsWith('+') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                                padding: '4px 8px',
                                borderRadius: '6px'
                            }}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>{stat.value}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Recent Submissions */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>So'nggi harakatlar</h3>
                        <button style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Barchasi</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivity.map(act => (
                            <div key={act.id} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1rem', 
                                padding: '1rem', 
                                background: 'var(--color-bg-hover)', 
                                borderRadius: '12px',
                                border: '1px solid var(--color-border)'
                            }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                    {act.user[0]}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{act.user}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{act.time}</span>
                                    </div>
                                    <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                        <span style={{ color: 'var(--color-text-main)' }}>{act.action}:</span> {act.course}
                                    </p>
                                </div>
                                <ArrowUpRight size={18} color="var(--color-text-muted)" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Info */}
                <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--color-primary), #4f46e5)', color: '#fff', border: 'none' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Sistem Ma'lumoti</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.6 }}>
                        Bugun tizimda 120 ta yangi foydalanuvchi ro'yxatdan o'tdi. Server holati barqaror (99.9% uptime).
                    </p>
                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Server CPU</div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', marginTop: '8px' }}>
                                <div style={{ width: '45%', height: '100%', background: '#fff', borderRadius: '3px' }}></div>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Xotira (RAM)</div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', marginTop: '8px' }}>
                                <div style={{ width: '72%', height: '100%', background: '#fff', borderRadius: '3px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
