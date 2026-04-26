import React from "react";

const ChooseUsComp = () =>{
    const reasons = [
        { label: "Expert Team", text: "Highly skilled professionals with extensive experience and a passion for technology.", color: "var(--primary-color)" },
        { label: "Client-Centric", text: "Prioritizing your needs and working closely to understand and achieve your goals.", color: "var(--secondary-color)" },
        { label: "Innovation", text: "Embracing the cutting edge to deliver high-quality solutions that exceed expectations.", color: "var(--primary-color)" },
        { label: "Comprehensive", text: "Integrated approach covering design, development, marketing, and data analytics.", color: "var(--secondary-color)" }
    ];

    return(
        <div className="container-fluid pt-5 pb-4 px-lg-5 bg-white" style={{ marginBottom: "-1px" }}>
            <div className="row justify-content-center m-0 p-0">
                <div className="col-lg-10 mb-0 pb-0">
                    <div className="text-center mb-4">
                         <h2 className="display-4 fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Why Choose Us?</h2>
                         <div className="mx-auto" style={{ width: "60px", height: "4px", backgroundColor: "var(--primary-color)" }}></div>
                    </div>
                    
                    <div className="row justify-content-center g-4 mb-0 pb-0">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className="col-md-5">
                                <div className="p-4 h-100 rounded-4 shadow-sm border-start border-4 bg-light" style={{ borderColor: `${reason.color} !important` }}>
                                    <h5 className="fw-black mb-2" style={{ color: "var(--primary-dark)" }}>{reason.label}</h5>
                                    <p className="mb-0 text-dark" style={{ lineHeight: "1.7" }}>{reason.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChooseUsComp;