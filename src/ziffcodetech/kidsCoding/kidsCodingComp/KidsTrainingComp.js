import React from "react";
import "../kidsCoding.css"
import kidsClass from "../kidsCodingImages/kidsClass.png"
import gameClass from "../kidsCodingImages/gameClass.png"

const KidsTrainingComp = () => {
    return (
    <div className="container-fluid px-md-5 py-5 bg-white">
        <div className="text-center mb-5">
            <h1 className="display-4 fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Benefits of Kids Coding</h1>
            <div className="mx-auto" style={{ width: "80px", height: "4px", backgroundColor: "var(--secondary-color)" }}></div>
        </div>
        
        <div className="row g-5 align-items-center">
            {/* Left Column: Text Content */}
            <div className="col-lg-6">
                <div className="pe-lg-5">
                    <div className="ps-4 border-start border-4 mb-4" style={{ borderColor: "var(--secondary-color) !important" }}>
                        <p className="fs-5 mb-0 text-dark" style={{ lineHeight: "1.8" }}>Coding offers numerous benefits for children, promoting a range of cognitive, social, and emotional skills that safeguard their future in an increasingly digital world.</p>
                    </div>
                    
                    <p className="fs-5 mb-4" style={{ color: "#2d3748" }}>Empower your child with essential skills to program, solve problems, design animations, and express themselves creatively through technology.</p>
                    
                    <div className="d-flex flex-wrap gap-2 mb-5">
                        <span className="badge bg-primary p-2 px-3 rounded-pill">Creativity</span>
                        <span className="badge bg-primary p-2 px-3 rounded-pill">Problem Solving</span>
                        <span className="badge bg-primary p-2 px-3 rounded-pill">Digital Literacy</span>
                        <span className="badge bg-primary p-2 px-3 rounded-pill">Abstract Thinking</span>
                    </div>

                    <div className="bg-light p-4 rounded-4 shadow-sm">
                        <h4 className="fw-black mb-4" style={{ color: "var(--primary-dark)" }}>Core Skills Developed</h4>
                        <div className="mb-3 d-flex align-items-start">
                            <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                            <p className="mb-0 text-dark"><span className="fw-bold">Academic Performance: </span>Supports learning in mathematics and science through logic.</p>
                        </div>
                        <div className="mb-3 d-flex align-items-start">
                            <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                            <p className="mb-0 text-dark"><span className="fw-bold">Digital Literacy: </span>Essential skills for the future, just like reading and writing.</p>
                        </div>
                        <div className="d-flex align-items-start">
                            <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                            <p className="mb-0 text-dark"><span className="fw-bold">Life Skills: </span>Teaches perseverance, adaptability, and learning from mistakes.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Images */}
            <div className="col-lg-6">
                <div className="d-flex flex-column gap-4">
                    <div className="shadow-lg rounded-4 overflow-hidden border-0 transition-all hover-lift">
                        <img src={kidsClass} className="img-fluid w-100 object-fit-cover" alt="Kids coding in class" style={{height: "300px"}} />
                    </div>
                    <div className="shadow-lg rounded-4 overflow-hidden border-0 transition-all hover-lift">
                        <img src={gameClass} className="img-fluid w-100 object-fit-cover" alt="Kids gaming class" style={{height: "300px"}} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default KidsTrainingComp;