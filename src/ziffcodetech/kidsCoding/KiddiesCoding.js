import React from "react";
import CodingpracComp from "../kidsCoding/kidsCodingComp/CodingpracComp";
import KidsTrainingComp from "../kidsCoding/kidsCodingComp/KidsTrainingComp";
import KidsProgramComp from "../kidsCoding/kidsCodingComp/KidsProgramComp";
import SEO from "../../components/SEO";

const KiddiesCoding = () => {
    return(
        <div>
            <SEO 
                title="Kids Coding Academy | STEM & Programming for Children"
                description="Ziffcode's Kids Coding Academy: Empowering children through fun, hands-on programming lessons, robotics, and STEM education."
                keywords="kids coding Lagos, programming for children, STEM education Nigeria, coding for kids Africa, robotics for students"
            />
            <CodingpracComp />
            <KidsTrainingComp />
            <KidsProgramComp />
        </div>
    )
}

export default KiddiesCoding;