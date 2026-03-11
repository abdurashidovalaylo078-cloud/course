import { useState, useRef, useEffect } from 'react';
import {
    MagnifyingGlass, Plus, Users, Hash, DotsThreeVertical,
    Phone, VideoCamera, Info, PaperPlaneRight, Image,
    Paperclip, Smiley
} from '@phosphor-icons/react';
import { chatData, currentUser } from '../data';
import { useLanguage } from '../context/LanguageContext';
import './Chat.css';

const Chat = () => {
    const { t } = useLanguage();
    const [activeChat, setActiveChat] = useState(chatData.groups[0].id);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([...chatData.messages]);

    const chatBodyRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom on new message
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, activeChat]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');

        const newMsg = {
            id: Date.now(),
            sender: currentUser.name,
            text: messageText,
            time: `${hours}:${mins}`,
            isMe: true
        };

        setMessages([...messages, newMsg]);
        setMessageText('');
    };

    const currentGroup = chatData.groups.find(g => g.id === activeChat);

    return (
        <div className="chat-container">
            {/* Sidebar */}
            <div className="chat-sidebar">
                <div className="chat-sidebar-header">
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{t('chat.messages')}</h3>
                    <button className="icon-btn" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <Plus />
                    </button>
                </div>

                <div className="chat-search">
                    <MagnifyingGlass />
                    <input type="text" placeholder={t('chat.searchPlaceholder')} />
                </div>

                <div className="chat-list">
                    {chatData.groups.map(group => (
                        <div
                            key={group.id}
                            className={`chat-list-item ${activeChat === group.id ? 'active' : ''}`}
                            onClick={() => setActiveChat(group.id)}
                        >
                            <div className="chat-avatar-wrapper">
                                <img src={group.avatar} alt={group.name} className="chat-avatar" />
                                {group.type === 'direct' && <div className="status-indicator online"></div>}
                            </div>
                            <div className="chat-preview-info">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{group.name}</h4>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>10:36</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                                        {t('chat.typing')}
                                    </p>
                                    {group.unread > 0 && (
                                        <span className="unread-badge">{group.unread}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
                {currentGroup ? (
                    <>
                        <div className="chat-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={currentGroup.avatar} alt="Current Chat" className="chat-avatar" />
                                <div>
                                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1.1rem' }}>
                                        {currentGroup.type === 'group' ? <Hash weight="bold" style={{ color: 'var(--color-text-muted)' }} /> : null}
                                        {currentGroup.name}
                                    </h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-primary)' }}>
                                        {currentGroup.type === 'group' ? t('chat.groupStatus') : t('chat.online')}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="icon-btn"><Phone /></button>
                                <button className="icon-btn"><VideoCamera /></button>
                                <button className="icon-btn"><Info /></button>
                                <button className="icon-btn"><DotsThreeVertical /></button>
                            </div>
                        </div>

                        <div className="chat-body" ref={chatBodyRef}>
                            <div className="chat-date-divider">
                                <span>{t('chat.today')}</span>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`message-wrapper ${msg.isMe ? 'me' : 'other'}`}>
                                    {!msg.isMe && currentGroup.type === 'group' && (
                                        <div className="message-avatar">
                                            {msg.sender.charAt(0)}
                                        </div>
                                    )}
                                    <div className="message-content">
                                        {!msg.isMe && currentGroup.type === 'group' && (
                                            <span className="message-sender">{msg.sender}</span>
                                        )}
                                        <div className={`message-bubble ${msg.isMe ? 'me' : 'other'}`}>
                                            <p style={{ margin: 0 }}>{msg.text}</p>
                                        </div>
                                        <span className="message-time">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="chat-footer">
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="icon-btn"><Paperclip /></button>
                                <button className="icon-btn"><Image /></button>
                            </div>

                            <form className="chat-input-wrapper" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    placeholder={t('chat.inputPlaceholder')}
                                    value={messageText}
                                    onChange={e => setMessageText(e.target.value)}
                                />
                                <button type="button" className="icon-btn" style={{ position: 'absolute', right: '10px' }}>
                                    <Smiley />
                                </button>
                            </form>

                            <button
                                className="btn-primary"
                                style={{ padding: '0.8rem', borderRadius: '50%', flexShrink: 0 }}
                                onClick={handleSendMessage}
                            >
                                <PaperPlaneRight weight="fill" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                        <h2>{t('chat.selectGroup')}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
