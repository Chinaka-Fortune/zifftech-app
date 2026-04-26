import React from 'react';

const team = [
    { name: "Executive Director", role: "Chief Technical Architect", bio: "Leading the strategic vision and engineering excellence at Ziffcode.", icon: "bi-person-badge-fill" },
    { name: "Head of Training", role: "Curriculum Architect", bio: "Empowering the next generation of software engineers through innovative learning.", icon: "bi-mortarboard-fill" },
    { name: "Global Operations", role: "Project Delivery Director", bio: "Ensuring every solution is delivered with precision and scalable integrity.", icon: "bi-gear-wide-connected" }
];

const MeetTheArchitects = () => {
    return (
        <div className="container py-5 my-5">
            <div className="text-center mb-5">
                <h2 className="display-6 fw-black mb-3" style={{ color: "var(--primary-dark)", letterSpacing: '-1.5px' }}>Meet the Architects</h2>
                <div className="mx-auto" style={{ width: "70px", height: "4px", backgroundColor: "var(--primary-color)", borderRadius: "2px" }}></div>
            </div>
            
            <div className="row justify-content-center g-4">
                {team.map((member, idx) => (
                    <div key={idx} className="col-lg-4 col-md-6">
                        <div className="h-100 bg-white rounded-4 overflow-hidden position-relative transition-all" 
                             style={{ 
                                 boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                                 border: "none",
                                 borderTop: `5px solid ${idx % 2 === 0 ? "var(--primary-color)" : "var(--secondary-color)"}`,
                                 cursor: "crosshair"
                             }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.transform = "translateY(-8px)";
                                 e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(64,105,179,0.2)";
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.transform = "translateY(0)";
                                 e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.08)";
                             }}>
                            <div className="card-body p-5 h-100 d-flex flex-column">
                                <div className="rounded-circle d-flex justify-content-center align-items-center bg-light mb-4 mx-auto" style={{ width: '100px', height: '100px' }}>
                                    <i className={`bi ${member.icon} fs-1 text-primary`}></i>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-black text-dark mb-1">{member.name}</h3>
                                    <p className="fw-bold text-uppercase small mb-4" style={{ color: "var(--secondary-color)", letterSpacing: '1px' }}>{member.role}</p>
                                    <p className="text-muted mb-0 lh-lg">{member.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeetTheArchitects;
