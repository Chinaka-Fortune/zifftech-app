import React from "react";
import ziffcodeLogo from "./ziffHome/homeImages/ziffcodeLogo.png"

const FooterComp = () => {

    return (
        <footer className="bg-dark text-white pt-5 pb-3">
            <div className="container">
                <div className="row g-4">
                    {/* Column 1: Company Info */}
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex align-items-center mb-3">
                            <img src={ziffcodeLogo} alt="Ziffcode Logo" className="footerLogo me-2" style={{width: "4rem", height: "4rem", objectFit: "contain"}} />
                            <h5 className="fw-bold mb-0">ZIFFCODE</h5>
                        </div>
                        <p className="text-secondary small">
                            Empowering businesses and individuals through innovative software solutions and transformative training.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#!" className="text-white"><i className="bi bi-facebook"></i></a>
                            <a href="#!" className="text-white"><i className="bi bi-twitter"></i></a>
                            <a href="#!" className="text-white"><i className="bi bi-linkedin"></i></a>
                            <a href="#!" className="text-white"><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3 text-primary">Quick Links</h5>
                        <ul className="list-unstyled text-secondary">
                            <li className="mb-2"><a href="/" className="text-decoration-none text-secondary hover-white">Home</a></li>
                            <li className="mb-2"><a href="/about" className="text-decoration-none text-secondary hover-white">About Us</a></li>
                            <li className="mb-2"><a href="/ourService" className="text-decoration-none text-secondary hover-white">Our Services</a></li>
                            <li className="mb-2"><a href="/contact" className="text-decoration-none text-secondary hover-white">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3 text-primary">Our Services</h5>
                        <ul className="list-unstyled text-secondary">
                            <li className="mb-2">Software Development</li>
                            <li className="mb-2">Web & Mobile Apps</li>
                            <li className="mb-2">Corporate Training</li>
                            <li className="mb-2">Kids Coding Academy</li>
                            <li className="mb-2">Data Analytics</li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3 text-primary">Contact Us</h5>
                        <ul className="list-unstyled text-secondary">
                            <li className="mb-3 d-flex">
                                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                                <span>Suit 49, Kasam Plaza, 26 Ikotun-Idimu Road, Ikotun, Lagos</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                                <span>+234 912 191 9898</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                                <span>service@ziffcode.com.ng</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-top border-secondary mt-5 pt-3">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="mb-0 text-secondary small">&copy; {new Date().getFullYear()} Ziffcode Technologies. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0 text-secondary small">Designed by Ziffcode Team</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
        
}

export default FooterComp;