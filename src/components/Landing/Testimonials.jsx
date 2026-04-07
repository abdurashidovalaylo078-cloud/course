import React from 'react';
import { Quotes } from '@phosphor-icons/react';

const Testimonials = ({ testimonials }) => {
    return (
        <section className="container section-padding bg-darker overflow-hidden">
            <div className="section-head text-center">
                <h2 className="section-title">{testimonials.title}</h2>
            </div>
            <div className="testimonials-row">
                {testimonials.items.map(item => (
                    <div key={item.id} className="testimonial-card-premium">
                        <Quotes size={32} weight="fill" className="quote-icon" />
                        <p>{item.text}</p>
                        <div className="testi-user">
                            <div className="testi-avatar">{item.avatar}</div>
                            <div className="testi-info">
                                <h4>{item.name}</h4>
                                <span>{item.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
