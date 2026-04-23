import React, { useState, useRef, useEffect } from 'react';
import { Robot, PaperPlaneRight, X, Sparkle, Trophy, ChartLineUp } from '@phosphor-icons/react';

const AIRatingBot = ({ leaderboard, isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            type: 'ai', 
            text: "Salom! Men AI Reyting Yordamchisiman. Kursdagi ko'rsatkichlaringizni tahlil qilib, reytingingizni yaxshilash bo'yicha maslahatlar bera olaman. Nima haqida bilmoqchisiz?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simple AI Logic based on leaderboard
        setTimeout(() => {
            let aiResponse = "";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('reyting') || lowerInput.includes('o\'rin') || lowerInput.includes('urin')) {
                const top1 = leaderboard[0].name;
                aiResponse = `Hozirda reytingda 1-o'rinda ${top1} turibdi (${leaderboard[0].points} ball). Siz hozirgi natijalaringiz bilan kuchli beshlikka kirishingiz uchun yana bir nechta amaliy loyihalarni yakunlashingiz kerak.`;
            } else if (lowerInput.includes('ball') || lowerInput.includes('ochko')) {
                aiResponse = "Ballaringizni oshirish uchun uyga vazifalarni o'z vaqtida va yuqori sifatda topshirishingizni maslahat beraman. 'A' bahosi eng ko'p ball keltiradi!";
            } else if (lowerInput.includes('tahlil') || lowerInput.includes('statistika')) {
                aiResponse = "Umumiy tahlil: Kurs o'rtacha balli 2300. Siz o'rtacha ko'rsatkichdan yuqorisiz. Vizualizatsiya loyihalaringizga ko'proq e'tibor bering.";
            } else {
                aiResponse = "Kechirasiz, savolingizni tushunmadim. Men reyting, ballar yoki o'quv natijalari haqida ma'lumot bera olaman.";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                text: aiResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="ai-bot-overlay" style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '380px',
            height: '550px',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 10000,
            animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.2rem 1.5rem',
                background: 'linear-gradient(135deg, var(--color-primary), #b400ff)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '10px', 
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Robot size={22} weight="fill" />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>AI Reyting Bot</h4>
                        <span style={{ fontSize: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}></div>
                            Onlayn
                        </span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                    <X size={18} weight="bold" />
                </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} style={{
                flex: 1,
                padding: '1.5rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                background: 'var(--color-bg-dark)'
            }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        maxWidth: '85%',
                        alignSelf: msg.type === 'ai' ? 'flex-start' : 'flex-end',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        <div style={{
                            padding: '1rem',
                            borderRadius: msg.type === 'ai' ? '0 16px 16px 16px' : '16px 16px 0 16px',
                            background: msg.type === 'ai' ? 'var(--color-bg-card)' : 'var(--color-primary)',
                            color: msg.type === 'ai' ? 'var(--color-text-main)' : '#fff',
                            border: msg.type === 'ai' ? '1px solid var(--color-border)' : 'none',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            boxShadow: msg.type === 'ai' ? 'none' : '0 4px 12px rgba(139, 92, 246, 0.3)'
                        }}>
                            {msg.text}
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', alignSelf: msg.type === 'ai' ? 'flex-start' : 'flex-end' }}>
                            {msg.time}
                        </span>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ alignSelf: 'flex-start', padding: '0.8rem 1.2rem', borderRadius: '20px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', display: 'flex', gap: '4px' }}>
                        <div className="dot" style={{ width: 6, height: 6, background: 'var(--color-primary)', borderRadius: '50%', animation: 'bounce 0.6s infinite' }}></div>
                        <div className="dot" style={{ width: 6, height: 6, background: 'var(--color-primary)', borderRadius: '50%', animation: 'bounce 0.6s infinite 0.2s' }}></div>
                        <div className="dot" style={{ width: 6, height: 6, background: 'var(--color-primary)', borderRadius: '50%', animation: 'bounce 0.6s infinite 0.4s' }}></div>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', background: 'var(--color-bg-dark)', overflowX: 'auto' }}>
                {[
                    { icon: <Trophy size={14}/>, label: 'Reytingim' },
                    { icon: <ChartLineUp size={14}/>, label: 'Tahlil' },
                    { icon: <Sparkle size={14}/>, label: 'Maslahat' }
                ].map((act, i) => (
                    <button key={i} onClick={() => setInput(act.label)} style={{
                        whiteSpace: 'nowrap',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                    }}>
                        {act.icon} {act.label}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div style={{ padding: '1rem 1.5rem', background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)' }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.8rem', position: 'relative' }}>
                    <input 
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Savolingizni yozing..."
                        style={{
                            flex: 1,
                            padding: '0.8rem 1rem',
                            paddingRight: '3rem',
                            background: 'var(--color-bg-dark)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '12px',
                            color: 'var(--color-text-main)',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                    <button type="submit" style={{
                        position: 'absolute',
                        right: '6px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)'
                    }}>
                        <PaperPlaneRight weight="fill" size={18} />
                    </button>
                </form>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>
        </div>
    );
};

export default AIRatingBot;
