import React from "react";
import "../kidsCoding.css"
import kidsClass from "../kidsCodingImages/kidsClass.png"
import gameClass from "../kidsCodingImages/gameClass.png"

const KidsTrainingComp = () => {
    return (
        <div className="container-fluid px-md-5 my-5">
            <h2 className="text-center mb-5 fw-bold display-5">Benefits of Kids Coding</h2>
            <div className="row g-5 align-items-center">

                {/* Left Column: Text Content */}
                <div className="col-lg-6">
                    <div className="pe-lg-4">
                        <div className="mb-4">
                            <p className="fs-5 mb-3"><span className="fw-bold text-primary">Advantage: </span>Coding offers numerous benefits for children, promoting a range of cognitive, social, and emotional skills. The benefits can be particularly impactful when tailored to specific age groups.</p>
                            <p className="fs-5 mb-3"><span className="fw-bold text-primary">Empowerment and Application: </span>Empower your child with essential coding skills as Ziffcode gives kids an opportunity to program, learn to solve problems, design animations and games, and express themselves creatively on the computer which will safeguard their future.</p>
                        </div>
                        
                        <div className="d-flex flex-wrap gap-2 mb-4">
                            <span className="badge bg-secondary p-2">Creativity</span>
                            <span className="badge bg-secondary p-2">Problem Solving</span>
                            <span className="badge bg-secondary p-2">Digital Literacy</span>
                            <span className="badge bg-secondary p-2">Thinking</span>
                        </div>

                        <div className="mb-4">
                            <h4 className="fw-bold mb-3">Core Skills Developed</h4>
                            <p className="mb-2"><span className="fw-bold">Enhanced Academic Performance: </span>Coding supports learning in other subjects, particularly mathematics and science.</p>
                            <p className="mb-2"><span className="fw-bold">Digital Literacy: </span>In an increasingly digital world, coding skills are becoming as essential as reading and writing.</p>
                            <p className="mb-2"><span className="fw-bold">Life Skills: </span>Coding teaches perseverance, adaptability, and the importance of learning from mistakes.</p>
                            <p className="mb-0"><span className="fw-bold">Fun and Engagement: </span>Coding is often game-like and engaging, making learning enjoyable and motivating for children.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Images */}
                <div className="col-lg-6">
                    <div className="d-flex flex-column gap-4">
                        <div className="shadow-lg rounded overflow-hidden">
                            <img src={kidsClass} className="img-fluid w-100 object-fit-cover" alt="Kids coding in class" style={{height: "300px"}} />
                        </div>
                        <div className="shadow-lg rounded overflow-hidden">
                            <img src={gameClass} className="img-fluid w-100 object-fit-cover" alt="Kids gaming class" style={{height: "300px"}} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default KidsTrainingComp;