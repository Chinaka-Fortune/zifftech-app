import React from "react";
import Home from "./ziffcodetech/ziffHome/Home";
import AboutUs from "./ziffcodetech/aboutZiff/aboutUs";
import OurService from "./ziffcodetech/ourService/OurService";
import ZiffAcademy from "./ziffcodetech/ziffcodeTraining/ZiffAcademy";
import KiddiesCoding from "./ziffcodetech/kidsCoding/KiddiesCoding";
import NavBar from "./ziffcodetech/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FooterComp from "./ziffcodetech/FooterComp";
import LogIn from "./ziffcodetech/formFolder/LogIn";

const App = () => {
  return (
    
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/about" Component={AboutUs}/>
      <Route path="/logIn" Component={LogIn}/>
      <Route path="/ourService" Component={OurService} />
      <Route path="/training" Component={ZiffAcademy} />
      <Route path="/kidsCoding" Component={KiddiesCoding} />
    </Routes >
    <FooterComp />
    </BrowserRouter>
   
  )
};

export default App;