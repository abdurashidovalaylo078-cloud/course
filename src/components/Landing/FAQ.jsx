import React, { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';

const FAQItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`faq-card ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="faq-question">
                <span>{q}</span>
                <CaretDown size={20} style={{ transition: '0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
            </div>
            {isOpen && <p className="faq-answer">{a}</p>}
        </div>
    );
};

const FAQ = ({ faq }) => {
    return (
        <section className="container section-padding">
            <div className="section-head text-center">
                <h2 className="section-title">{faq.title}</h2>
            </div>
            <div className="faq-container-custom">
                {faq.items.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} />
                ))}
            </div>
        </section>
    );
};

export default FAQ;
