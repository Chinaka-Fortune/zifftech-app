import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeLearningHero = ({ lastEnrollment }) => {
    const navigate = useNavigate();

    if (!lastEnrollment) return null;

    const progress = lastEnrollment.progress || 0;

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5 position-relative" 
             style={{ 
                background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)",
                minHeight: "280px"
             }}>
            {/* Abstract Background Decoration */}
            <div className="position-absolute opacity-10" style={{ right: "-50px", top: "-50px", fontSize: "200px" }}>💻</div>
            
            <div className="card-body p-5 d-flex flex-column justify-content-center position-relative z-1 text-white">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <span className="badge bg-white text-primary rounded-pill px-3 py-2 fw-bold mb-3 shadow-sm">
                            🔥 {lastEnrollment.streak || 0} DAY STREAK
                        </span>
                        <h6 className="text-white-50 fw-bold text-uppercase mb-2" style={{ letterSpacing: "2px" }}>Continue Your Journey</h6>
                        <h1 className="fw-black mb-4 display-5" style={{ letterSpacing: "-1.5px" }}>{lastEnrollment.course_title || 'React Programming'}</h1>
                        
                        <div className="d-flex align-items-center gap-4 mb-4">
                            <div className="flex-grow-1" style={{ maxWidth: "300px" }}>
                                <div className="d-flex justify-content-between mb-2 small fw-bold">
                                    <span>Course Progress</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="progress bg-white bg-opacity-20" style={{ height: "8px", borderRadius: "10px" }}>
                                    <div className="progress-bar bg-white shadow-sm" style={{ width: `${progress}%`, borderRadius: "10px" }}></div>
                                </div>
                            </div>
                            <div className="vr opacity-25" style={{ height: "40px" }}></div>
                            <div>
                                <h4 className="fw-bold mb-0">+{lastEnrollment.points || 0}</h4>
                                <small className="text-white-50">ZiffPoints Earned</small>
                            </div>
                        </div>

                        <button 
                            className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-black shadow-lg hover-lift text-primary border-0"
                            onClick={() => navigate(`/lesson/${lastEnrollment.course_slug || 'general-course'}`)}
                        >
                            <i className="bi bi-play-circle-fill me-2"></i> RESUME LESSON
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeLearningHero;
