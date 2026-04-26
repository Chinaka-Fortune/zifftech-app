import React from "react";
import classroomImages from "./aboutUsImages/classroomImages.jpeg";
import "../aboutUs.css"
import "../../../index.css"


const AboutUsComp = () => {
    return (
        <div className="container-fluid position-relative p-0 overflow-hidden" style={{ height: '500px', marginTop: '70px' }}>
            {/* Background Image with Tactical Overlay */}
            <div className="position-absolute w-100 h-100" 
                 style={{ 
                     backgroundImage: `url(${classroomImages})`, 
                     backgroundSize: 'cover', 
                     backgroundPosition: 'center',
                     filter: 'brightness(0.5) contrast(1.1)' 
                 }}>
            </div>
            
            {/* Tactical Gradient Overlay */}
            <div className="position-absolute w-100 h-100" 
                 style={{ 
                     background: 'linear-gradient(180deg, rgba(64, 105, 179, 0.6) 0%, rgba(6, 26, 61, 0.9) 100%)',
                     zIndex: 1
                 }}>
            </div>

            <div className="container h-100 d-flex flex-column justify-content-center align-items-center position-relative text-white text-center" style={{ zIndex: 2 }}>
                <div className="badge bg-secondary mb-3 px-3 py-2 rounded-pill fw-bold text-uppercase" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>
                    About Ziffcode Technologies
                </div>
                <h1 className="display-3 fw-black mb-4" style={{ letterSpacing: '-2px', maxWidth: '900px' }}>
                    Empowering Businesses and Individuals through <span className="text-secondary">Innovative Software</span> and Transformative Training
                </h1>
                <div className="h-1 mt-2 mb-4 mx-auto" style={{ width: "120px", height: "5px", backgroundColor: "var(--secondary-color)", borderRadius: '10px' }}></div>
                <p className="fs-5 fw-medium opacity-75 mx-auto" style={{ maxWidth: '800px' }}>
                    Your strategic partner for technical excellence and human potential.
                </p>
            </div>
        </div>
    );
};

export default AboutUsComp;