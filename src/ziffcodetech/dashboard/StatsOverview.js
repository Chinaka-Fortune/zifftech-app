import React from 'react';

const StatsOverview = ({ points, streak, enrollmentsCount }) => {
    return (
        <div className="row g-4 mb-5">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-4 transition-hover" 
                     style={{ borderLeft: "6px solid var(--primary-color)", backgroundColor: "#FFFFFF" }}>
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle p-3 me-3" style={{ backgroundColor: "rgba(235, 94, 40, 0.1)", color: "var(--secondary-color)" }}>
                            <i className="bi bi-lightning-charge-fill fs-3"></i>
                        </div>
                        <div>
                            <h6 className="text-secondary fw-bold text-uppercase mb-1" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>Total ZiffPoints</h6>
                            <h2 className="fw-black mb-0 text-dark">{points || 0}</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-4 transition-hover" 
                     style={{ borderLeft: "6px solid var(--secondary-color)", backgroundColor: "#FFFFFF" }}>
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle p-3 me-3" style={{ backgroundColor: "rgba(4, 30, 66, 0.1)", color: "var(--primary-color)" }}>
                            <i className="bi bi-fire fs-3"></i>
                        </div>
                        <div>
                            <h6 className="text-secondary fw-bold text-uppercase mb-1" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>Current Streak</h6>
                            <h2 className="fw-black mb-0 text-dark">{streak || 0} Days</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-4 transition-hover" 
                     style={{ borderLeft: "6px solid #10b981", backgroundColor: "#FFFFFF" }}>
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle p-3 me-3" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                            <i className="bi bi-journal-bookmark-fill fs-3"></i>
                        </div>
                        <div>
                            <h6 className="text-secondary fw-bold text-uppercase mb-1" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>Enrolled Courses</h6>
                            <h2 className="fw-black mb-0 text-dark">{enrollmentsCount || 0}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
