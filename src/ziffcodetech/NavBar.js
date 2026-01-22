import React from "react";
import '../ziffcodetech/ziffHome/ziffCode.css';
import ziffcodeLogo from './ziffHome/homeImages/ziffcodeLogo.png'
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar bg-success navbar-expand-lg fixed-top NavbarBackgroundColo bg-transparent">
            <div className="d-flex container-fluid text-primary-emphasis">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="ziffcodeLogoDiv navbar-brand d-flex align-items-center">
                    <img src={ziffcodeLogo} className="logoImage"
                        alt="ziffcodeLogo" />
                    <p className="text-primary-emphasis fw-bold fs-5 mb-0">ZIFFCODE</p>
                </div>
            
                <div className="collapse navbar-collapse text-primary-emphasis" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mx-auto pt-4 mb-lg-0 fw-bold text-danger">
                        <li className="nav-item px-3">
                            <NavLink className="active text-decoration-none LiNavLink" aria-current="page" to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item px-3">
                            <NavLink className="text-decoration-none LiNavLink" to='/about'>About Us</NavLink>
                        </li>
                        <li className="nav-item px-3">
                            <NavLink className="text-decoration-none LiNavLink" to='/ourService' >Our Services</NavLink>
                        </li>
                        <li className="nav-item ps-3">
                            <NavLink className="text-decoration-none LiNavLink" to='/contact'>Contact Us</NavLink>
                        </li>
                        <li className="nav-item px-3">
                            <NavLink className="text-decoration-none LiNavLink" to='/training'>Ziffcode Training</NavLink>
                        </li>
                        <li className="nav-item ps-3">
                            <NavLink className="text-decoration-none LiNavLink" to='kidsCoding'>Kids Coding</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;