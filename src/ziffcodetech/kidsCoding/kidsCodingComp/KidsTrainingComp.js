import React from "react";
import "../kidsCoding.css"
import kidsClass from "../kidsCodingImages/kidsClass.png"

const KidsTrainingComp = () => {
    return (
        <div className="container-fluid text-primary-emphasis px-md-5">
            <h2 className="text-center mb-3">Benefits of Kids Coding</h2>
            <div className="row">


                <div className="col-md-6">
                    <p><span className="boldText">Advantage: </span>Coding offers numerous benefits for children, promoting a range of cognitive, social, and emotional skills. The benefits can be particularly impactful when tailored to specific age groups.</p>
                    <p><span className="boldText">Empowerment and Application: </span>Empower your child with essential coding skills as Ziffcode gives kids an opportunity to program, learn to solve problems, design animations and games, and express themselves creatively on the computer which will safeguard their future. It helps young children to develop sequencing skills that will be instrumental for later academic success.
                    </p>
                    <p><span className="boldText">Creativity: </span>Coding encourages creativity as children experiment with different ways to achieve their desired outcomes in games and animations.</p>
                    <p><span className="boldText">Enhanced Academic Performance: </span>Coding supports learning in other subjects, particularly mathematics and science.</p>
                    <p><span className="boldText">Digital Literacy:  </span>In an increasingly digital world, coding skills are becoming as essential as reading and writing.</p>
                    <p><span className="boldText">Life Skills: </span>Coding teaches perseverance, adaptability, and the importance of learning from mistakes.</p>
                    <p><span className="boldText">Fun and Engagement: </span>Coding is often game-like and engaging, making learning enjoyable and motivating for children. By introducing coding at various stages of development, children can progressively build their skills and confidence, setting a strong foundation for lifelong learning and success in the digital age.</p>
                </div>

                <div className="col-md-6">
                    <img src={kidsClass} className="kidsIntheClass img-fluid" alt="kidsClass" />
                </div>

                <div className="col-md-6 mt-3">
                    <h4>Overall Benefits Across Age Groups</h4>
                    <p><span className="boldText">Enhanced Academic Performance: </span>Coding supports learning in other subjects, particularly mathematics and science.</p>
                    <p><span className="boldText">Digital Literacy: </span>In an increasingly digital world, coding skills are becoming as essential as reading and writing.</p>
                    <p><span className="boldText">Life Skills: </span>Coding teaches perseverance, adaptability, and the importance of learning from mistakes.</p>
                    <p><span className="boldText">Fun and Engagement: </span>Coding is often game-like and engaging, making learning enjoyable and motivating for children. By introducing coding at various stages of development, children can progressively build their skills and confidence, setting a strong foundation for lifelong learning and success in the digital age.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default KidsTrainingComp;