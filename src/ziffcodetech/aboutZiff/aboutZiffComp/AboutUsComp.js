import React from "react";
import classroomImages from "./aboutUsImages/classroomImages.jpeg";
import "../aboutUs.css"
import "../../../index.css"


const AboutUsComp = () => {
    return (
        <div class="container-fluid position-relative p-3 ">
            <div className=" row">
                <figure className="">
                <img src={classroomImages} className="classroomImages  position-relative" alt="" />
                </figure>


            <div className="codingToday  fw-bold text-center position-absolute mx-auto">
                <p className="p-4">Empowering Businesses and Individuals through Innovative Software Solutions and Transformative Training</p>
                {/* <p>Invest in your future with Ziffcode Technology</p> */}
            </div>
            {/* <p className="fs-5 fw-bold text-center">Invest in your future with Ziffcode Technology</p> */}
            </div>
        </div>
    )
}

export default AboutUsComp;