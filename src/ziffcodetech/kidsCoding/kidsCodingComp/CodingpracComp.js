import React from "react";
import "../kidsCoding.css"


const CodingpracComp = () => {
    return (
        <>
            <div className="whyKidsCodingDiv d-flex align-items-center ps-md-5 ps-3 text-white position-relative">
                <div className="col-lg-7 position-relative" style={{ zIndex: 5 }}>
                    <h1 className="fw-black display-2 shadow-text mb-0" style={{ letterSpacing: "-2px", lineHeight: "1.1" }}>
                        Starting Your Child <br/> Early in Coding, 
                    </h1>
                    <h5 className="mt-4 fw-bold fs-3" style={{ color: "var(--secondary-color)" }}>The Best Choice You'll Ever Make</h5>
                </div>
            </div>
            
            <div className="container-fluid py-5 bg-white">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="text-center mb-5">
                            <h2 className="display-4 fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Why Kids Coding?</h2>
                            <div className="mx-auto" style={{ width: "60px", height: "4px", backgroundColor: "var(--secondary-color)" }}></div>
                        </div>
                        
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="p-5 h-100 rounded-4 bg-white" 
                                     style={{ 
                                        boxShadow: "0 15px 45px -15px rgba(0,0,0,0.1)",
                                        borderTop: "5px solid var(--primary-color)",
                                        borderBottom: "3px solid var(--secondary-color)"
                                     }}>
                                     <p className="fs-5 text-dark" style={{ lineHeight: "1.8" }}>
                                        Coding is becoming essential in a child’s educational curriculum so that they can be prepared for the developing future. This new literacy is what’s going to be a necessary requirement for jobs in the coming future.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-5 h-100 rounded-4 bg-white" 
                                     style={{ 
                                        boxShadow: "0 15px 45px -15px rgba(0,0,0,0.1)",
                                        borderTop: "5px solid var(--secondary-color)",
                                        borderBottom: "3px solid var(--primary-color)"
                                     }}>
                                    <p className="fs-5 text-dark" style={{ lineHeight: "1.8" }}>
                                        Coding already constitutes more than 60% of all jobs in STEM. While still in school, those who start young will be ahead of everyone by the time they get into college, building a superior foundation for life.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CodingpracComp;