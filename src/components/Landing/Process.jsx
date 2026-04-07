import React from 'react';

const Process = ({ process }) => {
    return (
        <section className="container section-padding bg-darker">
            <div className="section-head text-center">
                <h2 className="section-title">{process.title}</h2>
                <p className="section-subtitle">{process.subtitle}</p>
            </div>
            <div className="process-grid">
                {process.steps.map(step => (
                    <div key={step.id} className="process-step">
                        <div className="step-num">{step.id}</div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                        {step.id < 4 && <div className="step-connector"></div>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;
