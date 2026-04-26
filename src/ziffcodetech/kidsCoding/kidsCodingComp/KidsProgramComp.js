import React from "react";
import "../kidsCoding.css"
import theboysPrac from "../kidsCodingImages/theboysPrac.jpg"
import blackBoyTwo from "../kidsCodingImages/blackBoyTwo.png"
import teenageCoding from "../kidsCodingImages/teenageCoding.png"
import { NavLink } from "react-router-dom";

const KidsProgramComp = () => {
  return (
    <div className="container-fluid py-5 bg-white">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Kids Coding Programs</h1>
        <div className="mx-auto" style={{ width: "80px", height: "4px", backgroundColor: "var(--secondary-color)" }}></div>
      </div>

      <div className="row justify-content-center gap-4 px-md-3">
        {/* Ages 8-10 */}
        <div className="col-lg-3 col-md-5 col-11 p-0 rounded-4 bg-white d-flex flex-column overflow-hidden transition-all"
             style={{ 
               transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
               cursor: "pointer",
               boxShadow: "0 12px 40px -15px rgba(0,0,0,0.12)",
               borderTop: "5px solid var(--secondary-color)",
               borderBottom: "3px solid var(--primary-color)"
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = "translateY(-15px)";
               e.currentTarget.style.boxShadow = "0 35px 70px -15px rgba(64,105,179,0.2)";
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = "translateY(0)";
               e.currentTarget.style.boxShadow = "0 12px 40px -15px rgba(0,0,0,0.12)";
             }}>
          <div className="w-100 overflow-hidden" style={{ height: "220px" }}>
            <img src={theboysPrac} className="w-100 h-100 object-fit-cover transition-all" alt="Elementary School Coding" 
                 style={{ transition: "transform 0.5s ease" }} />
          </div>
          <div className="p-4 d-flex flex-column h-100">
            <h4 className="fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Ages 8-10</h4>
            <div className="mb-4">
              <p className="mb-2" style={{ color: "#2d3748" }}><span className="fw-bold text-primary">Creativity: </span>Encourages experimentation in games and animations.</p>
              <p className="mb-0" style={{ color: "#2d3748" }}><span className="fw-bold text-primary">Problem-Solving: </span>Teaches analytical thinking through project breakdown.</p>
            </div>
            <ul className="ps-3 mb-4 text-dark opacity-90" style={{ fontSize: "0.95rem" }}>
              <li className="mb-1">Build apps, games, and websites</li>
              <li className="mb-1">Master foundational skills</li>
              <li className="mb-1">Earn coding certificate</li>
            </ul>
            <NavLink to="/signup" className="btn btn-primary w-100 fw-bold py-2 mt-auto">Enroll Now</NavLink>
          </div>
        </div>

        {/* Ages 11-13 */}
        <div className="col-lg-3 col-md-5 col-11 p-0 rounded-4 bg-white d-flex flex-column overflow-hidden transition-all"
             style={{ 
               transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
               cursor: "pointer",
               boxShadow: "0 12px 40px -15px rgba(0,0,0,0.12)",
               borderTop: "5px solid var(--primary-color)",
               borderBottom: "3px solid var(--primary-color)"
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = "translateY(-15px)";
               e.currentTarget.style.boxShadow = "0 35px 70px -15px rgba(64,105,179,0.2)";
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = "translateY(0)";
               e.currentTarget.style.boxShadow = "0 12px 40px -15px rgba(0,0,0,0.12)";
             }}>
          <div className="w-100 overflow-hidden" style={{ height: "220px" }}>
            <img src={blackBoyTwo} className="w-100 h-100 object-fit-cover transition-all" alt="Middle School Coding" />
          </div>
          <div className="p-4 d-flex flex-column h-100">
            <h4 className="fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Ages 11-13</h4>
            <div className="mb-4">
              <p className="mb-2" style={{ color: "#2d3748" }}><span className="fw-bold text-primary">Advanced Logic: </span>Develops higher-order resilience and complex logic.</p>
              <p className="mb-0" style={{ color: "#2d3748" }}><span className="fw-bold text-primary">Collaboration: </span>Fosters teamwork through group coding clubs.</p>
            </div>
            <ul className="ps-3 mb-4 text-dark opacity-90" style={{ fontSize: "0.95rem" }}>
              <li className="mb-1">Code like a professional</li>
              <li className="mb-1">Master problem solving</li>
              <li className="mb-1">Earn coding certificate</li>
            </ul>
            <NavLink to="/signup" className="btn btn-primary w-100 fw-bold py-2 mt-auto">Enroll Now</NavLink>
          </div>
        </div>

        {/* Ages 14-16 */}
        <div className="col-lg-3 col-md-5 col-11 p-0 rounded-4 bg-white d-flex flex-column overflow-hidden transition-all"
             style={{ 
               transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
               cursor: "pointer",
               boxShadow: "0 12px 40px -15px rgba(0,0,0,0.12)",
               borderTop: "5px solid var(--secondary-color)",
               borderBottom: "3px solid var(--primary-color)"
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = "translateY(-15px)";
               e.currentTarget.style.boxShadow = "0 35px 70px -15px rgba(64,105,179,0.2)";
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = "translateY(0)";
               e.currentTarget.style.boxShadow = "0 12px 40px -15px rgba(0,0,0,0.12)";
             }}>
          <div className="w-100 overflow-hidden" style={{ height: "220px" }}>
            <img src={teenageCoding} className="w-100 h-100 object-fit-cover transition-all" alt="High School Coding" />
          </div>
          <div className="p-4 d-flex flex-column h-100">
            <h4 className="fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Ages 14-16</h4>
            <div className="mb-4">
              <p className="mb-2" style={{ color: "#2d3748" }}><span className="fw-bold text-primary">Abstract Thinking: </span>Crucial for understanding computer science at scale.</p>
              <p className="mb-0" style={{ color: "#2d3748" }}><span className="fw-bold text-primary">Project Management: </span>Handling larger architectures and time management.</p>
            </div>
            <ul className="ps-3 mb-4 text-dark opacity-90" style={{ fontSize: "0.95rem" }}>
              <li className="mb-1">Kick-start your career journey</li>
              <li className="mb-1">Build amazing enterprise apps</li>
              <li className="mb-1">Unlock solving superpowers</li>
            </ul>
            <NavLink to="/signup" className="btn btn-primary w-100 fw-bold py-2 mt-auto">Enroll Now</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KidsProgramComp;