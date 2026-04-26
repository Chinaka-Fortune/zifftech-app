import React from 'react';

const stats = [
    { id: 1, label: "Youth Innovators Graduated", value: "100+", icon: "bi-mortarboard-fill", color: "var(--primary-color)" },
    { id: 2, label: "Enterprise Solutions Delivered", value: "50+", icon: "bi-rocket-takeoff-fill", color: "var(--secondary-color)" },
    { id: 3, label: "Specialized Tech Curriculums", value: "12+", icon: "bi-book-half", color: "var(--primary-dark)" },
    { id: 4, label: "Years of Technical Excellence", value: "5+", icon: "bi-award-fill", color: "var(--success)" }
];

const StrategicStats = () => {
    return (
        <div className="container-fluid py-5" style={{ backgroundColor: 'var(--primary-light)' }}>
            <div className="container">
                <div className="row g-4 justify-content-center">
                    {stats.map(stat => (
                        <div key={stat.id} className="col-lg-3 col-md-6 text-center">
                            <div className="p-4 rounded-4 bg-white shadow-sm hover-lift border-bottom border-4" style={{ borderColor: stat.color + ' !important' }}>
                                <div className="mb-3 d-center mx-auto rounded-circle" style={{ width: '60px', height: '60px', backgroundColor: stat.color + '15' }}>
                                    <i className={`bi ${stat.icon} fs-3`} style={{ color: stat.color }}></i>
                                </div>
                                <h2 className="fw-black mb-1" style={{ color: 'var(--primary-dark)', fontSize: '2.5rem' }}>{stat.value}</h2>
                                <p className="small fw-bold text-muted text-uppercase mb-0" style={{ letterSpacing: '1px' }}>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StrategicStats;
