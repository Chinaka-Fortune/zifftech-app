import React from 'react';

const principles = [
    { title: "Strategic Innovation", desc: "We don't just follow trends; we architect the next generation of digital infrastructure through disruptive thinking and elite engineering.", icon: "bi-lightbulb-fill" },
    { title: "Technical Integrity", desc: "Our commitment to quality is unwavering. We deliver robust, secure, and scalable solutions that stand the test of time and market pressure.", icon: "bi-shield-check" },
    { id: 3, title: "Social Empowerment", desc: "Ziffcode is more than a tech hub; it's an engine for human potential, transforming aspiring students into global technical architects.", icon: "bi-people-fill" }
];

const CorePrinciples = () => {
    return (
        <div className="container pb-5 mb-5 mt-2">
            <div className="text-center mb-5">
                <h2 className="display-5 fw-black text-dark mb-4" style={{ letterSpacing: '-1.5px' }}>Our Core Principles</h2>
                <div className="mx-auto" style={{ width: '100px', height: '4px', backgroundColor: 'var(--secondary-color)' }}></div>
                <p className="fs-5 text-muted mt-3 mx-auto" style={{ maxWidth: '700px' }}>The tactical foundation behind every software build and specialized training program we execute.</p>
            </div>
            
            <div className="row g-4">
                {principles.map((p, idx) => (
                    <div key={idx} className="col-lg-4">
                        <div className="card h-100 border-0 p-5 rounded-4 shadow-sm bg-white hover-lift border-start border-5" style={{ borderColor: idx % 2 === 0 ? 'var(--primary-color) !important' : 'var(--secondary-color) !important' }}>
                            <div className="rounded-circle d-center bg-light mb-4" style={{ width: '64px', height: '64px' }}>
                                <i className={`bi ${p.icon} fs-2`} style={{ color: 'var(--primary-dark)' }}></i>
                            </div>
                            <h3 className="fw-black mb-3" style={{ color: 'var(--primary-dark)' }}>{p.title}</h3>
                            <p className="text-muted mb-0 lh-lg" style={{ fontSize: '1.05rem' }}>{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CorePrinciples;
