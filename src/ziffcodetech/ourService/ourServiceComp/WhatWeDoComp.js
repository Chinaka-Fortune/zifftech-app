import React from "react"
import "../../ziffHome/ziffCode.css"

const WhatWeDoComp = () =>{
    return(
        <div className="container-fluid mt-5 py-5 bg-white">
            <div className="row px-md-5">
            <div className="col-12 h-100 mb-5">
                <div className="ps-4 border-start border-4 mb-4" style={{ borderColor: "var(--secondary-color) !important" }}>
                    <h1 className="display-4 fw-black m-0" style={{ color: "var(--primary-dark)", letterSpacing: "-1px" }}>Our Services</h1>
                    <div className="h-25 mt-2" style={{ width: "80px", height: "4px", backgroundColor: "var(--secondary-color)" }}></div>
                </div>
                <p className="fs-4 fw-medium text-muted mt-3" style={{ maxWidth: "800px" }}>Empowering Businesses and Individuals through Innovative Software Solutions and Transformative Training</p>
            </div>
            
            <div className="col-12">
                <div className="text-center mb-5">
                    <h2 className="fw-black mb-3" style={{ color: "var(--primary-dark)", fontSize: "2.8rem" }}>What we do at Ziffcode</h2>
                    <div className="mx-auto" style={{ width: "60px", height: "3px", backgroundColor: "var(--secondary-color)" }}></div>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-8 p-5 rounded-4 bg-white" 
                         style={{ 
                            boxShadow: "0 15px 45px -15px rgba(0,0,0,0.12)",
                            borderTop: "5px solid var(--secondary-color)",
                            borderBottom: "3px solid var(--primary-color)",
                            transition: "all 0.4s ease"
                         }}>
                        <p className="fs-5 fw-medium text-dark mb-4">We offer learning programs that are designed by industry knowledge experts and co-created with leading companies.</p> 
                        <p className="text-dark opacity-90" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                            <strong>Web Development (Frontend and Backend):</strong> Our skilled developers create responsive, high-performance websites using the latest technologies. From sleek, user-friendly frontends to robust, scalable backends, we ensure your web presence is both engaging and efficient.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default WhatWeDoComp;