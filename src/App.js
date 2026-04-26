import React from "react";
import Home from "./ziffcodetech/ziffHome/Home";
import AboutUs from "./ziffcodetech/aboutZiff/aboutUs";
import OurService from "./ziffcodetech/ourService/OurService";
import ZiffAcademy from "./ziffcodetech/ziffcodeTraining/ZiffAcademy";
import KiddiesCoding from "./ziffcodetech/kidsCoding/KiddiesCoding";
import NavBar from "./ziffcodetech/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import FooterComp from "./ziffcodetech/FooterComp";
// import FooterComp from "./ziffcodetech/FooterComp";
import LogIn from "./ziffcodetech/formFolder/LogIn";
import SignUp from "./ziffcodetech/formFolder/SignUp";
import StudentDashboard from "./ziffcodetech/dashboard/StudentDashboard";
import AdminDashboard from "./ziffcodetech/dashboard/AdminDashboard";
import StaffDashboard from "./ziffcodetech/dashboard/StaffDashboard";
import PaymentSuccess from "./ziffcodetech/dashboard/PaymentSuccess";
import PaymentCancel from "./ziffcodetech/dashboard/PaymentCancel";
import LiveClassRoom from "./ziffcodetech/liveClass/LiveClassRoom";
import ContactUs from "./ziffcodetech/contactUs/ContactUs";
import ForgotPassword from "./ziffcodetech/formFolder/ForgotPassword";
import ResetPassword from "./ziffcodetech/formFolder/ResetPassword";
import LessonPortal from "./ziffcodetech/dashboard/LessonPortal";
import CareerPortfolio from "./ziffcodetech/dashboard/CareerPortfolio";
import ServicePortfolio from "./ziffcodetech/ourService/ourServiceComp/ServicePortfolio";
import AllCoursesPage from "./ziffcodetech/ziffcodeTraining/AllCoursesPage";
import ZiffieAI from "./ziffcodetech/dashboard/ZiffieAI";

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <HelmetProvider>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/about" Component={AboutUs}/>
        <Route path="/logIn" Component={LogIn}/>
        <Route path="/signup" Component={SignUp}/>
        <Route path="/forgot-password" Component={ForgotPassword}/>
        <Route path="/reset-password" Component={ResetPassword}/>
        <Route path="/dashboard" Component={StudentDashboard}/>
        <Route path="/staff-dashboard" Component={StaffDashboard}/>
        <Route path="/admin" Component={AdminDashboard}/>
        <Route path="/success" Component={PaymentSuccess}/>
        <Route path="/cancel" Component={PaymentCancel}/>
        <Route path="/live/:roomName" Component={LiveClassRoom}/>
        <Route path="/lesson/:courseSlug" Component={LessonPortal}/>
        <Route path="/portfolio/:userId" Component={CareerPortfolio}/>
        <Route path="/services/:serviceSlug" Component={ServicePortfolio}/>
        <Route path="/ourService" Component={OurService} />
        <Route path="/contact" Component={ContactUs} />
        <Route path="/training" Component={ZiffAcademy} />
        <Route path="/all-courses" Component={AllCoursesPage} />
        {/* <Route path="/training" Component={ZiffAcademy} /> */}
        <Route path="/kidsCoding" Component={KiddiesCoding} />
      </Routes >
      {isAuthenticated && <ZiffieAI />}
      <FooterComp />
      </BrowserRouter>
    </HelmetProvider>
  )
};

export default App;