import React from "react";
import SlideHome from "./ziffHomeComp/SliceHome";
import WhatWeDo from "./ziffHomeComp/WhatWeDo";
import Products from "./ziffHomeComp/ProductsComp";
import ChooseUsComp from "./ziffHomeComp/ChooseUsComp";
import SEO from "../../components/SEO";
import { SEO_CONFIG, getOrgSchema } from "../../utils/seoConfig";
import MapTracker from "../contactUs/MapTracker";

const Home = () => {
    return(
        <div>
            <SEO 
                title={SEO_CONFIG.defaultTitle}
                description={SEO_CONFIG.defaultDescription}
                keywords={SEO_CONFIG.defaultKeywords}
                schema={getOrgSchema()}
            />
            <SlideHome />
            <WhatWeDo />
            <Products />
            <ChooseUsComp />    
            
            {/* Find Us / HQ Map Section */}
            <section className="hq-map-section pt-0 pb-0 mt-0" style={{ marginTop: "-1px" }}>
                <div className="container mb-2 pt-2">
                    <div className="text-center">
                        <h2 className="fw-bold fs-1 text-white mb-2">Visit Ziffcode HQ</h2>
                        <p className="text-light opacity-75 fs-5">Navigate to our Innovation Hub from wherever you are.</p>
                    </div>
                </div>
                {/* Full Width Map Area */}
                <div className="container-fluid px-0">
                    <div style={{ height: "600px", width: "100%" }}>
                        <MapTracker />
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home;