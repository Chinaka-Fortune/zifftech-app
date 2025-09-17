import React from "react";
import digitalMktImage from "../ziffTrainingImages/digitalMktImage.jpg"
import webDvImg from "../ziffTrainingImages/wedDvImg.png"
import iuImage from "../ziffTrainingImages/uiImage.jpg"

const OurTrainingProdComp = () => {
    return (
        
            <div class="container-fluid text-center mb-5">
                <div class="row d-flex  justify-content-evenly row-gap-4">
                    <div class="col-sm-5 col-lg-3 col-10 border border-danger">
                        <figure className="digitalImg">
                            <img src={digitalMktImage} className="digitalMktImage" alt="digitalMktImage" />
                        </figure>
                        <p className="fs-5 text-center ps-3 mt-0">Data Analysis</p>
                    </div>
                    <div className="col-sm-5 col-lg-3 col-10 border border-danger">
                        <figure className="digitalImg">
                            <img src={webDvImg} className="digitalMktImage" alt="digitalMktImage" />
                        </figure>
                        <p className="fs-5 text-center ps-3">Web Development</p>
                    </div>
                    <div className="col-sm-5 col-lg-3 col-10 border border-danger">
                        <figure className="digitalImg">
                            <img src={iuImage} className="digitalMktImage" alt="digitalMktImage" />
                        </figure>
                        <p className="fs-5 text-center ps-3">Product design (UI/UX)</p>
                    </div>
                </div>
            </div>
        
    )
}

export default OurTrainingProdComp;