import React from "react";
import SlideHome from "./ziffHomeComp/SliceHome";
import WhatWeDo from "./ziffHomeComp/WhatWeDo";
import Products from "./ziffHomeComp/ProductsComp";
import ChooseUsComp from "./ziffHomeComp/ChooseUsComp"

const Home = () => {
    return(
        <div>
            <SlideHome />
            <WhatWeDo />
            <Products />
            <ChooseUsComp />    
        </div>
    )
}
export default Home;