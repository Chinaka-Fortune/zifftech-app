import React from "react";
import AboutUsComp from "./aboutZiffComp/AboutUsComp";
import StrategicStats from "./aboutZiffComp/StrategicStats";
import OurFocusComp from "./aboutZiffComp/OurFocusComp";
import CorePrinciples from "./aboutZiffComp/CorePrinciples";
import StrategicRoadmap from "./aboutZiffComp/StrategicRoadmap";
import OurMissionComp from "./aboutZiffComp/OurMissionComp";
import MeetTheArchitects from "./aboutZiffComp/MeetTheArchitects";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

const AboutUs = () => {
    return(
        <div className="bg-white pb-5">
            <SEO 
                title="About Ziffcode | Leading Software Engineering & Training Hub"
                description="Learn about Ziffcode Technologies' mission to revolutionize the tech landscape through world-class software development, outsourcing, and elite coding education."
                keywords="Ziffcode mission, software development company Lagos, tech leadership Africa, software engineering team"
            />
            <AboutUsComp />
            <StrategicStats />
            <OurFocusComp />
            <CorePrinciples />
            <StrategicRoadmap />
            <OurMissionComp />
            <MeetTheArchitects />

            {/* Final Strategic CTA */}
            <div className="container py-5 my-5 text-center">
                <div className="p-5 rounded-4 position-relative overflow-hidden transition-all" 
                     style={{ 
                         background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)",
                         boxShadow: "0 20px 50px -15px rgba(64,105,179,0.5)",
                         borderTop: "6px solid var(--secondary-color)"
                     }}>
                    {/* Decorative Background Element */}
                    <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10" 
                         style={{ 
                             backgroundImage: 'radial-gradient(circle, white 2px, transparent 0)', 
                             backgroundSize: '40px 40px' 
                         }}></div>
                    
                    <div className="position-relative py-4" style={{ zIndex: 1 }}>
                        <h2 className="display-5 fw-black mb-4 text-white" style={{ letterSpacing: "-1px", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
                            Ready to Unlock the Future of Technology?
                        </h2>
                        <div className="mx-auto mb-4" style={{ width: "80px", height: "4px", backgroundColor: "var(--secondary-color)", borderRadius: "2px" }}></div>
                        <p className="fs-5 mb-5 text-white mx-auto lh-lg" style={{ maxWidth: '650px', opacity: '0.9' }}>
                            Join the ranks of elite professionals and industry leaders partnering with Ziffcode today. Elevate your skills, master modern software architecture, and transform your business solutions.
                        </p>
                        
                        <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
                            <Link to="/training" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-black text-primary border-0 transition-all hover-scale" style={{ boxShadow: "0 10px 20px -5px rgba(0,0,0,0.2)" }}>
                                Start Your Training <i className="bi bi-mortarboard-fill ms-2"></i>
                            </Link>
                            <Link to="/contact" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold transition-all hover-scale" style={{ borderWidth: "2px" }}>
                                Contact Ziffcode Team <i className="bi bi-rocket-takeoff ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default AboutUs;