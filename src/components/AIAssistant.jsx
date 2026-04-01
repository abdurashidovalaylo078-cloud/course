import { useState, useRef, useEffect } from 'react';
import { Robot, X, PaperPlaneRight, Sparkle } from '@phosphor-icons/react';
import './AIAssistant.css';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Assalomu alaykum! 3D Max Pro platformasiga xush kelibsiz. Sizga qanday yordam bera olaman?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const chatBodyRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, isBot: false }];
        setMessages(newMessages);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                text: "Savolingiz uchun rahmat. Hozircha men test rejimida ishlayapman. Tez orada to'liq ishga tushaman!", 
                isBot: true 
            }]);
        }, 1000);
    };

    return (
        <div className="ai-assistant-wrapper">
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <div className="ai-header-info">
                            <div className="ai-avatar">
                                <Robot weight="fill" />
                                <div className="ai-online-indicator"></div>
                            </div>
                            <div>
                                <h4>AI Yordamchi</h4>
                                <span>Onlayn</span>
                            </div>
                        </div>
                        <button className="ai-close-btn" onClick={toggleChat} aria-label="Yopish">
                            <X weight="bold" />
                        </button>
                    </div>

                    <div className="ai-chat-body" ref={chatBodyRef}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`ai-message ${msg.isBot ? 'bot' : 'user'}`}>
                                {msg.isBot && <div className="ai-msg-icon"><Sparkle weight="fill" /></div>}
                                <div className="ai-msg-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className="ai-chat-footer" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            placeholder="Savolingizni yozing..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="ai-send-btn" disabled={!input.trim()} aria-label="Yuborish">
                            <PaperPlaneRight weight="fill" />
                        </button>
                    </form>
                </div>
            )}

            <button 
                className={`ai-floating-btn ${isOpen ? 'active' : ''}`} 
                onClick={toggleChat}
                title="AI Yordamchi bilan suhbatlashish"
            >
                {isOpen ? <X weight="bold" size={24} /> : <Robot weight="fill" size={28} />}
                {!isOpen && <span className="ai-pulse-ring"></span>}
            </button>
        </div>
    );
};

export default AIAssistant;
