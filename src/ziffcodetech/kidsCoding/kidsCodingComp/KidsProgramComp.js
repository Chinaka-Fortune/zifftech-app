import React from "react";
import "../kidsCoding.css"
import theboysPrac from "../kidsCodingImages/theboysPrac.jpg"
import blackBoyTwo from "../kidsCodingImages/blackBoyTwo.png"
import teenageCoding from "../kidsCodingImages/teenageCoding.png"
import { NavLink } from "react-router-dom";

const KidsProgramComp = () => {
  return (
    <div className="container-fluid text-start mb-3 mx-auto  text-primary-emphasis mt-3">
      <div className="row m-auto  px-md-3 row-gap-4 ">
        <div className="col-lg-4 col-sm-6 cardBodyMorphoric">
          <figure className="">
            <img src={theboysPrac} className="theboysPrac" alt="theboysPrac" />
          </figure>
          <p className="boldText">Ages 8-10 (Elementary School):</p>
          <p className="mb-0"><span className="boldText">Creativity: </span>Coding encourages creativity as children experiment with different ways to achieve their desired outcomes in games and animations.</p>
          <p className="mb-0"><span className="boldText">Improved Problem-Solving Skills: </span>Young children learn to break down problems into manageable parts, enhancing their analytical thinking.</p>
          <ul className="pb-0">
            <li>Build apps, games, and websites</li>
            <li>Master coding skills</li>
            <li>Engage in project-based learning</li>
            <li>Earn coding certificate</li>
            <NavLink to="/formComp" type="submit" className="mt-3 bg-primary rounded text-white fw-bold p-2 text-decoration-none px-4" >Enroll now</NavLink>
          </ul>
        </div>

        <div className="col-lg-4 col-sm-6 cardBodyMorphoric p-3 ">
          <figure>
            <img src={blackBoyTwo} className="blackBoyTwo" alt="blackBoyTwo" />
          </figure>
          <p className="boldText">Ages 11-13 (Middle School)</p>
          <p className="mb-0"><span className="boldText">Advanced Problem-Solving: </span>As coding projects become more complex, students develop higher-order problem-solving skills and resilience.</p>
          <p className="mb-0"><span className="boldText">Collaboration: </span>Group projects and coding clubs foster teamwork and collaborative skills.</p>
          <ul className="mt-0 mb-0">
            <li>Learn to code like a pro</li>
            <li>Create amazing apps, games and websites</li>
            <li>Earn coding certificate</li>
            <li>Master problem solving skills</li>
            <NavLink to="/formComp" type="submit" className="mt-3 bg-primary rounded text-white fw-bold p-2 text-decoration-none px-4" >Enroll now</NavLink>
          </ul>
        </div>
        <div class="col-lg-4 col-sm-6 cardBodyMorphoric p-2 pb-0 ps-3">
          <figure>
            <img src={teenageCoding} className="teenageCoding" alt="teenageCoding" />
          </figure>
          <p className="boldText">Ages 14-16 (High School)</p>
          <p className="mb-0"><span className="boldText">Abstract Thinking: </span>Coding requires abstract thinking, which is crucial for understanding advanced topics in both computer science and other academic subjects.</p>
          <p className="mb-0"><span className="boldText">Complex Project Manage-ment: </span>Older students are learning project manage- ment and time management skills.</p>
          {/* <p className="ps-2">Complex Project Management: Older students can handle larger projects, learning project management and time management skills.</p> */}
          <ul className="mb-3">
            <li>Kick start your coding journey</li>
            <li>Build amazing apps, games and websites</li>
            <li>Unlock Problem solving superpower</li>
            <NavLink to="/formComp" type="submit" className="mt-3 bg-primary rounded text-white fw-bold p-2 text-decoration-none px-4" >Enroll now</NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default KidsProgramComp;