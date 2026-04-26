import React from "react";
import heroImg from "../../homeImages/professional_hero.png"
import { NavLink } from "react-router-dom";

const SlideHome = () => {
    return (
        <div className="position-relative w-100 bg-dark" style={{ height: "100vh", overflow: "hidden" }}>
            {/* Background Image */}
            <img src={heroImg} alt="Ziffcode Professional Tech Hub" className="w-100 h-100 position-absolute top-0 start-0" style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 1 }} />
            
            {/* Gradient Overlay for Text Visibility (Left Aligned for visual hierarchy) */}
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center" style={{ zIndex: 2, background: "linear-gradient(90deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 100%)" }}>
                <div className="container px-4 px-lg-5">
                    <div className="col-lg-8 text-start slide-up">
                        <div className="mb-4">
                            <span className="d-block fw-medium text-white mb-2" style={{ fontSize: "clamp(1.2rem, 3vw, 2.5rem)", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                                Empower Your Future with
                            </span>
                            <span className="d-block fw-bolder text-white" style={{ fontSize: "clamp(1.2rem, 5.5vw, 4.5rem)", lineHeight: "1.1", textShadow: "0 4px 6px rgba(0,0,0,0.5)", letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
                                Ziffcode Technologies Limited
                            </span>
                        </div>
                        <p className="lead mb-5 fs-4 opacity-75" style={{ color: "var(--primary-light)", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                            Master the skills of tomorrow. From comprehensive bootcamps to advanced tech certifications, unlock your potential today.
                        </p>
                        <NavLink to={localStorage.getItem('token') ? "/dashboard" : "/signup"} className="btn btn-lg px-5 py-3 fw-bold text-white shadow-lg border-0 transition-hover" style={{ backgroundColor: "var(--primary-color)" }}>
                            Start Learning Now
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SlideHome;