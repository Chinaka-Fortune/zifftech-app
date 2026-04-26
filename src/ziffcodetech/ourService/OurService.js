import React from "react";
import WhatWeDoComp from "../ourService/ourServiceComp/WhatWeDoComp"
import TechServices from "./ourServiceComp/TechServicesComp";
import SEO from "../../components/SEO";

const OurService = () => {
    return(
        <div>
            <SEO 
                title="Software Development, Managed Services & Technical Outsourcing | Ziffcode"
                description="Ziffcode provides high-performance custom web and mobile app development, dedicated tech team outsourcing, and professional managed software services for organizations globally."
                keywords="software development services, managed software services, application management, hire developers Nigeria, technical outsourcing, software maintenance"
            />
            <WhatWeDoComp />
            <TechServices />
        </div>
    )
}
export default OurService;