import React from "react";

const Products = () => {
    const productCards = [
        { title: "Mentorship", desc: "Build a strong foundation in tech programs structured with brilliant mentors that will take your skills to the next level with expert-led courses." },
        { title: "Internship", desc: "Comprehensive programs encompassing UI/UX, Backend (Flask, Node.js), Frontend, Mobile (React Native, Flutter), and Blockchain technology." },
        { title: "Portfolio", desc: "Engage in independent projects while facilitating internships with esteemed organizations to build an impressive professional portfolio." },
        { title: "Certification", desc: "Upon completion, earn an industry-recognized certificate solidifying your expertise and enhancing your credibility in the tech world." }
    ];

    return (
        <div className="container-fluid pt-4 pb-2 bg-white">
            <div className="w-100 p-5 text-center bg-light rounded-4 mb-4 border-start border-end border-5" style={{ borderColor: "var(--primary-color) !important" }}>
                <h2 className="fw-black" style={{ color: "var(--primary-dark)" }}>Develop Your Career</h2>
                <h4 className="fw-bold" style={{ color: "var(--secondary-color)" }}>Develop Your Coding Skills</h4>
                <p className="fs-5 mt-3 text-muted">Coding Today, Empowering Tomorrow</p>
            </div>
            
            <div className="row justify-content-center gap-4">
                {productCards.map((card, idx) => (
                    <div key={idx} className="col-lg-2 col-md-5 col-11 p-0 rounded-4 bg-white d-flex flex-column overflow-hidden transition-all"
                         style={{ 
                           transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                           cursor: "pointer",
                           minWidth: "280px",
                           border: "none",
                           borderTop: `5px solid ${idx % 2 === 0 ? "var(--primary-color)" : "var(--secondary-color)"}`,
                           borderBottom: `2px solid ${idx % 2 === 0 ? "var(--primary-color)" : "var(--secondary-color)"}`,
                           boxShadow: "0 10px 30px -10px rgba(0,0,0,0.12)"
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = "translateY(-10px)";
                           e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(64,105,179,0.2)";
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = "translateY(0)";
                           e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.12)";
                         }}>
                        <div className="p-4 d-flex flex-column h-100">
                            <h4 className="fw-black mb-3 text-center" style={{ color: "var(--primary-dark)" }}>{card.title}</h4>
                            <p className="text-center fw-medium mt-2" style={{ color: "#2d3748", lineHeight: "1.7", fontSize: "0.95rem" }}>{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products;