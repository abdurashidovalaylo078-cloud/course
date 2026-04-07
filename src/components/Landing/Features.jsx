import React from 'react';
import { VideoCamera, Users, Certificate, Briefcase } from '@phosphor-icons/react';

const Features = ({ tf }) => {
    const featuresData = [
        { icon: <VideoCamera weight="fill"/>, title: tf.f1title, desc: tf.f1desc, color: "orange" },
        { icon: <Users weight="fill"/>,       title: tf.f2title, desc: tf.f2desc, color: "blue" },
        { icon: <Certificate weight="fill"/>, title: tf.f3title, desc: tf.f3desc, color: "emerald" },
        { icon: <Briefcase weight="fill"/>,   title: tf.f4title, desc: tf.f4desc, color: "purple" },
    ];

    return (
        <section className="container section-padding">
            <div className="section-head text-center">
                <h2 className="section-title">{tf.title}</h2>
                <p className="section-subtitle">{tf.subtitle}</p>
            </div>
            <div className="features-grid-custom">
                {featuresData.map((f, i) => (
                    <div key={i} className={`feature-card-premium color-${f.color}`}>
                        <div className="feature-icon-box">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
