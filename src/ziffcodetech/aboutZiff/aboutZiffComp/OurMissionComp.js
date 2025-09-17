import React from "react";
import "../aboutUs.css"

const OurMissionComp = () => {
    return (
        <div className="container-fluid mb-5 mt-3">
            <div class="row mx-1 gap-5 d-flex justify-content-center flex-colum mb-3">
                <div class="col-sm-5 col-11 col-sm-6 col-lg-4 slogan text-muted align-self-start cardBodyMorphoric">

                    <div class="card-body p-3 pb-5" >
                        <h5 class="card-title text-dark">Our Slogan</h5>
                        <p class="card-text">Guided by our unwavering slogan, "Coding today, Empowering tomorrow," Ziffcode Technologies is committed to shaping a future where innovation, efficiency, and empowerment go hand in hand.Join us on this transformative journey and let us help you unlock the boundless possibilities that lie ahead.</p>


                    </div>
                </div>
                <div class="col-sm-5 col-11 col-lg-4  text-muted mission cardBodyMorphoric">

                    <div class="card-body p-3 ">
                        <h5 class="card-title text-dark">Our Mission</h5>
                        <p>Our mission is to empower businesses and individuals with innovative technology solutions and expert training. We are committed to delivering excellence in every project, ensuring our clients achieve their goals and stay ahead in a competitive market.</p>
                    </div>
                </div>

                <div class="col-md-9 col-sm-9 col-11 col-lg-7 align-self-start text-muted cardBodyMorphoric">
                    <div class="card-body p-3 pb-5" >
                        <h5 class="card-title text-dark">Our Vision</h5>
                        <p class="card-text">We envision a world where technology seamlessly integrates with everyday life, driving progress and enhancing human potential. At Ziffcode Technologies LTD, we strive to be at the forefront of this transformation, consistently pushing the boundaries of what’s possible.</p>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default OurMissionComp;