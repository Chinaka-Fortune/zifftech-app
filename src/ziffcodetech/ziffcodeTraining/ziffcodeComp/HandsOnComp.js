import React from "react";

const HandsOnComp = () => {
    return(
        <div className="container-fluid pt-5 mt-4 px-md-5 bg-white">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                    <div className="ps-4 border-start border-4 mb-4" style={{ borderColor: "var(--secondary-color) !important" }}>
                        <h2 className="display-5 fw-black m-0" style={{ color: "var(--primary-dark)" }}>Hands-on Training</h2>
                        <h5 className="fw-bold mt-2" style={{ color: "var(--secondary-color)" }}>Elevate Your Skills, Empower Your Future</h5>
                    </div>
                    
                    <div className="shadow-sm p-4 p-md-5 rounded-4 bg-light border-bottom border-4" style={{ borderColor: "var(--primary-color) !important" }}>
                        <p className="fs-5 mb-4 text-dark" style={{ lineHeight: "1.8" }}>At Ziffcode Technologies, we believe that the most impactful learning happens through hands-on experience. That's why our training programs are designed to immerse you in a dynamic, interactive learning environment where you'll have the opportunity to apply your newfound knowledge in real-world scenarios.</p>
                        <p className="text-dark opacity-90 mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>Led by industry-leading experts, our hands-on training sessions combine comprehensive theoretical instruction with practical, project-based learning. From coding workshops to software development sprints, you'll have the chance to tackle challenging problems, collaborate with peers, and hone your skills in a supportive, enriching setting.</p>
                        <p className="text-dark opacity-90 mb-0" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>Whether you're looking to upskill, pivot your career, or simply explore the world of technology, our hands-on training programs will equip you with the practical expertise and confidence you need to thrive in the digital landscape.</p>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-lg-10">
                   <div className="ps-4 border-start border-4 mb-4" style={{ borderColor: "var(--primary-color) !important" }}>
                        <h2 className="display-5 fw-black m-0" style={{ color: "var(--primary-dark)" }}>Certification</h2>
                        <h5 className="fw-bold mt-2" style={{ color: "var(--secondary-color)" }}>Validate Your Expertise, Elevate Your Career</h5>
                    </div>

                    <div className="shadow-sm p-4 p-md-5 rounded-4 bg-light border-bottom border-4" style={{ borderColor: "var(--secondary-color) !important" }}>
                        <p className="fs-5 mb-4 text-dark" style={{ lineHeight: "1.8" }}>At Ziffcode Technologies, we believe that professional certification is the key to unlocking new opportunities and demonstrating your expertise to the world. That's why we offer a wide range of industry-recognized certification programs that are designed to help you stand out in the competitive tech landscape.</p>
                        <p className="text-dark opacity-90 mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>Guided by our team of seasoned experts, you'll dive deep into the latest tools, methodologies, and best practices, ensuring that you're equipped with the cutting-edge expertise that employers and clients demand. Position yourself as a highly sought-after professional in your field.</p>
                        <div className="d-flex align-items-center gap-2 mt-4">
                            <span className="badge p-2 bg-primary">Industry Recognized</span>
                            <span className="badge p-2 bg-primary">Expert Verified</span>
                            <span className="badge p-2 bg-primary">Career Boosting</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HandsOnComp;