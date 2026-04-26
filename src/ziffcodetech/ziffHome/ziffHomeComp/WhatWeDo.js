import React from "react";
import training from "../homeImages/training.jpg";
import { NavLink } from "react-router-dom";

const WhatWeDo = () => {
    return (
        <div className="container-fluid pt-4 pb-2 bg-white">
            <div className="px-lg-5 mb-4">
                <div className="ps-4 border-start border-4 mb-3" style={{ borderColor: "var(--secondary-color) !important" }}>
                    <h2 className="display-5 fw-black m-0" style={{ color: "var(--primary-dark)" }}>What We Do</h2>
                    <div className="mt-2" style={{ width: "60px", height: "3px", backgroundColor: "var(--secondary-color)" }}></div>
                </div>
            </div>
            
            <div className="px-lg-5">
                <figure className="trainingImageDiv rounded-4 overflow-hidden mb-4 shadow-lg">
                    <img src={training} className="training w-100" alt="training" style={{ height: "450px", objectFit:'cover', objectPosition:'center'}}/>
                </figure>
                
                <div class="row row-gap-4">
                    <div class="col-md-6 mb-2">
                        <div className="p-4 p-lg-5 h-100 rounded-4 shadow-sm border-top border-4 bg-light" style={{ borderColor: "var(--primary-color) !important" }}>
                            <h3 className="fw-black mb-4" style={{ color: "var(--primary-dark)" }}>Ziffcode Training</h3>
                            <p className="fs-5 text-dark mb-4" style={{ lineHeight: "1.8" }}>
                                Ziffcode Technology drills you through our intensive practical training program that will usher you into a new generation of tech professionals. If you are searching for quality and intensive coding, search no further. WE ARE THE BEST THAT WILL MAKE YOU ONE OF THE BEST IN THE WORLD.
                            </p>
                            <NavLink to="/logIn" className="btn btn-primary px-4 py-2 fw-bold rounded-pill">Enroll Here<i className="bi bi-arrow-right-circle-fill ms-2"></i></NavLink>
                        </div>
                    </div>
                    <div class="col-md-6 mb-2">
                        <div className="p-4 p-lg-5 h-100 rounded-4 shadow-sm border-top border-4 bg-light" style={{ borderColor: "var(--secondary-color) !important" }}>
                            <h3 className="fw-black mb-4" style={{ color: "var(--primary-dark)" }}>Talent Outsourcing</h3>
                            <p className="fs-5 text-dark mb-4" style={{ lineHeight: "1.8" }}>
                                We use the power of innovation and intensive skills to grow your business online and offline, making your daily life easy, convenient and effective with high-quality software solutions including Web and Mobile development.
                            </p>
                            <NavLink to="/contact" className="btn btn-outline-primary px-4 py-2 fw-bold rounded-pill">Hire a Tech-savvy<i className="bi bi-person-check-fill ms-2"></i></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhatWeDo;