import React from 'react';

const steps = [
    { id: "01", title: "Discovery", desc: "We deep-dive into your business challenges to identify modern technical opportunities.", icon: "bi-search" },
    { id: "02", title: "Architecture", desc: "Crafting a tactical blueprint that ensures high-performance and future-proof scalability.", icon: "bi-layers-half" },
    { id: "03", title: "Execution", desc: "Ziffcode architects build your solution using precision engineering and best practices.", icon: "bi-code-slash" },
    { id: "04", title: "Delivery", desc: "Seamless deployment with persistent support and enterprise-grade testing.", icon: "bi-send-check-fill" }
];

const StrategicRoadmap = () => {
    return (
        <div className="container py-5 my-5 bg-white rounded-4 shadow-sm border p-5">
            <div className="text-center mb-5">
                <h2 className="display-6 fw-black mb-3" style={{ color: "var(--primary-dark)", letterSpacing: '-1.5px' }}>Our Strategic Delivery Process</h2>
                <div className="mx-auto" style={{ width: "70px", height: "4px", backgroundColor: "var(--secondary-color)", borderRadius: "2px" }}></div>
            </div>
            
            <div className="row justify-content-center g-4 position-relative">
                {steps.map((step, idx) => (
                    <div key={step.id} className="col-lg-3 col-md-6 position-relative">
                        <div className="h-100 bg-white rounded-4 d-flex flex-column align-items-center p-4 text-center transition-all"
                             style={{ 
                                 boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                                 border: "none",
                                 borderBottom: `4px solid ${idx % 2 === 0 ? "var(--primary-color)" : "var(--secondary-color)"}`,
                                 cursor: "pointer"
                             }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.transform = "translateY(-8px)";
                                 e.currentTarget.style.boxShadow = "0 20px 40px -12px rgba(64,105,179,0.15)";
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.transform = "translateY(0)";
                                 e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.08)";
                             }}>
                            
                            <div className="rounded-circle d-flex justify-content-center align-items-center bg-light mb-4" style={{ width: '70px', height: '70px' }}>
                                <i className={`bi ${step.icon} fs-2 text-primary`}></i>
                            </div>
                            
                            <h4 className="fw-black text-dark mb-2">{step.title}</h4>
                            <p className="text-muted lh-base mb-0" style={{ fontSize: "0.95rem" }}>{step.desc}</p>
                            
                            <div className="mt-auto pt-3">
                                <span className="badge bg-primary text-white px-3 py-1 rounded-pill opacity-75">{step.id}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StrategicRoadmap;
