import React from "react";
import "../aboutUs.css"

const OurFocusComp = () =>{
    return(
        <div className="container mt-5 mb-5 bg-white p-5 rounded-4 shadow-sm border">
            <h2 className="text-center fw-bold mb-4" style={{ color: "var(--primary-color)" }}>
                Unlock the Future with Ziffcode Technologies
            </h2>
            <div className="text-dark" style={{ lineHeight: "1.8", color: "#333", fontWeight: "500" }}>
                <p className="mb-4 fs-5">
                    At Ziffcode Technologies LTD, we are passionate about driving progress and empowering our clients to thrive in the digital age. As a leading software development and training company, we combine cutting-edge technology, unparalleled expertise, and a relentless commitment to excellence to deliver transformative solutions that propel businesses and individuals forward.
                </p>
                <p className="mb-4 fs-5">
                    Our skilled team of developers, designers, and trainers work tirelessly to craft innovative software that streamlines operations, enhances productivity, and unlocks new avenues for growth. From custom web and mobile applications to enterprise-level systems, we have the versatility and know-how to tackle projects of any scale and complexity.
                </p>
                <p className="mb-0 fs-5">
                    But our expertise extends beyond just software development. Through our comprehensive training programs, we equip individuals with the knowledge and skills they need to become the next generation of tech leaders. Whether you're a seasoned developer looking to expand your skillset or a aspiring coder eager to kickstart your career, our immersive courses and personalized guidance will help you unlock your full potential.
                </p>
            </div>
        </div>
    )
}
export default OurFocusComp;