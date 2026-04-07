import React from 'react';

const Stats = ({ stats }) => {
    return (
        <section className="container stats-bar">
            {stats.map(s => (
                <div key={s.id} className="stat-item">
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-label">{s.label}</div>
                </div>
            ))}
        </section>
    );
};

export default Stats;
