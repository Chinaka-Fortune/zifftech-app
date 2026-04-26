import React from "react";
import "../aboutUs.css"

const OurMissionComp = () => {
    return (
        <div className="container-fluid mb-5 mt-5">
            <div className="row mx-1 gap-4 d-flex justify-content-center mb-3">
                <div className="col-lg-3 col-md-5 col-11 bg-white rounded-4 transition-all"
                     style={{ 
                         boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                         border: "none",
                         borderTop: "5px solid var(--primary-color)",
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
                    <div className="card-body p-4 pb-5 h-100 d-flex flex-column">
                        <h3 className="card-title fw-bolder mb-3 text-center" style={{ color: "var(--primary-dark)" }}>Our Slogan</h3>
                        <p className="card-text text-dark fw-medium text-center" style={{ lineHeight: "1.7", color: "#333", fontSize: "0.95rem" }}>
                            Guided by our unwavering slogan, <strong>"Coding today, Empowering tomorrow,"</strong> Ziffcode Technologies is committed to shaping a future where innovation, efficiency, and empowerment go hand in hand. Join us on this transformative journey and let us help you unlock the boundless possibilities that lie ahead.
                        </p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-5 col-11 bg-white rounded-4 transition-all"
                     style={{ 
                         boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                         border: "none",
                         borderTop: "5px solid var(--secondary-color)",
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
                    <div className="card-body p-4 pb-5 h-100 d-flex flex-column">
                        <h3 className="card-title fw-bolder mb-3 text-center" style={{ color: "var(--primary-dark)" }}>Our Mission</h3>
                        <p className="card-text text-dark fw-medium text-center" style={{ lineHeight: "1.7", color: "#333", fontSize: "0.95rem" }}>
                            Our mission is to empower businesses and individuals with innovative technology solutions and expert training. We are committed to delivering excellence in every project, ensuring our clients achieve their goals and stay ahead in a competitive market.
                        </p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-10 col-11 bg-white rounded-4 transition-all"
                     style={{ 
                         boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                         border: "none",
                         borderTop: "5px solid var(--primary-color)",
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
                    <div className="card-body p-4 pb-5 h-100 d-flex flex-column">
                        <h3 className="card-title fw-bolder mb-3 text-center" style={{ color: "var(--primary-dark)" }}>Our Vision</h3>
                        <p className="card-text text-dark fw-medium text-center" style={{ lineHeight: "1.7", color: "#333", fontSize: "0.95rem" }}>
                            We envision a world where technology seamlessly integrates with everyday life, driving progress and enhancing human potential. At Ziffcode Technologies, we strive to be at the forefront of this transformation, consistently pushing the boundaries of what’s possible.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurMissionComp;