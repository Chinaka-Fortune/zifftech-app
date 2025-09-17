import React from "react"
import "../../ziffHome/ziffCode.css"

const WhatWeDoComp = () =>{
    return(
        <div className="container-fluid mt-5">
            <div className="row mt-5 px-md-5">
            <div className="col-12 h-100 pt-5 ">
                <h3 className="p-3 fw-bolder">Our Services</h3>
                <p>Empowering Businesses and Individuals through Innovative Software Solutions and Transformative Training</p>
            </div>
            
            <div className="col-12">
                <h3 className="text-center fw-bolder text-dark  pb-2">What we do at Ziffcode</h3>
            <p className="fw-light m-auto">We offer learning programs that are designed by industry knowledge experts and co-created with leading companies.</p> 
            <p className="fw-light m-auto ">Web Development (Frontend and Backend): Our skilled developers create responsive, high-performance websites using the latest technologies. From sleek, user-friendly frontends to robust, scalable backends, we ensure your web presence is both engaging and efficient.</p>
            </div>
        </div>
        </div>
                    
    )
}

export default WhatWeDoComp;