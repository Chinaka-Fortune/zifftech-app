import React from "react";
import training from "../homeImages/training.jpg";
import { NavLink } from "react-router-dom";

const WhatWeDo = () => {
    return (
        <div className="container-fliud">
            <h3 className="fs-3 fw-bolder ms-5 ps-5 p-3">What We Do</h3>
            
            <figure className="trainingImageDiv">
                <img src={training} className="training" alt="training" style={{objectFit:'cover', objectPosition:'center'}}/>
            </figure>
            <div class="text-start px-3 px-lg-5">
                <div class="row mt-4 row-gap-3">
                    <div class="col-md-6 px-md-5">
                        <h4>Ziffcode Training</h4>
                        <p className="fw-light">
                        Ziffcode Technology drills you through our intensive practical training program that will usher you into a new generation of indigenous tech professionals driving innovation and development in the tech industry. If you are searching for insturctors who will train you in quality and intensive coding, search no further. Through our qualified and passionate training, WE ARE THE BEST THAT WILL MAKE YOU ONE OF THE BEST IN THE WORLD.
                        These services include mobile and web development, cybersecurity, data science and analysis, digital marketing and more.
                        </p>
                        <NavLink to="/logIn" type="submit" className="text-primary  text-decoration-none" >Enroll Here<i className="bi bi-arrow-right-circle-fill ms-2"></i></NavLink>
                    </div>
                    <div class="col-md-6 px-md-5">
                        <h4>Talent Outsourcing</h4>
                        <p className="fw-light">We are solution providers, we use the power of innovation and intensive skills to grow your business online and offline, and make your daily life easy, convinient and effective with high quality software solutions. This services include developing highly responsive website, Mobile App,
                        </p>
                        <NavLink to="/formComp" type="submit" className="text-primary  text-decoration-none" >Hire a Tech-savvy<i className="bi bi-arrow-right-circle-fill ms-2"></i></NavLink>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default WhatWeDo;