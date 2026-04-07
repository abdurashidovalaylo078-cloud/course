import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, BookOpen, Star, ArrowRight } from '@phosphor-icons/react';

const Courses = ({ tc }) => {
    const coursesData = [
        { id: 1, title: tc.c1title, desc: tc.c1desc, badge: tc.badge1, img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80", lessons: 57, modules: 5, accent: "orange" },
        { id: 2, title: tc.c2title, desc: tc.c2desc, badge: tc.badge3, img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop", lessons: 33, modules: 4, accent: "emerald" },
        { id: 3, title: tc.c3title, desc: tc.c3desc, badge: tc.badge2, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop", lessons: 28, modules: 4, accent: "blue" },
    ];

    return (
        <section className="container section-padding" id="courses">
            <div className="section-head text-center">
                <h2 className="section-title">{tc.title}</h2>
                <p className="section-subtitle">{tc.subtitle}</p>
            </div>
            <div className="courses-grid">
                {coursesData.map(course => (
                    <div key={course.id} className={`course-card-premium accent-${course.accent}`}>
                        <div className="card-media">
                            <img src={course.img} alt={course.title} />
                            <div className="card-badge">{course.badge} <Star weight="fill" /></div>
                        </div>
                        <div className="card-body">
                            <div className="card-meta">
                                <span><Monitor size={18} /> {course.lessons}{tc.lessons}</span>
                                <span><BookOpen size={18} /> {course.modules}{tc.modules}</span>
                            </div>
                            <h3>{course.title}</h3>
                            <p>{course.desc}</p>
                            <div className="card-footer">
                                <div className="instructor">
                                    <div className="avatar">A</div>
                                    <span>3D Max Expert</span>
                                </div>
                                <Link to="/app" className="btn-start">{tc.start} <ArrowRight /></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Courses;
