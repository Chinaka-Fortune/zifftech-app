import React from "react";
import ziffcodeLogo from "./ziffHome/homeImages/ziffcodeLogo.png"

const FooterComp = () => {

    return (
        <footer className="pt-5 pb-3" style={{ backgroundColor: "#D1E3FF", color: "var(--primary-dark)" }}>
            <div className="container">
                <div className="row g-4">
                    {/* Column 1: Company Info */}
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex align-items-center mb-3">
                            <img src={ziffcodeLogo} alt="Ziffcode Logo" className="footerLogo me-2" style={{ width: "4rem", height: "4rem", objectFit: "contain" }} />
                            <h5 className="fw-bold mb-0" style={{ color: "var(--primary-dark)" }}>ZIFFCODE</h5>
                        </div>
                        <p className="small" style={{ color: "var(--primary-dark)", opacity: 0.75 }}>
                            Empowering businesses and individuals through innovative software solutions and transformative training.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#!" style={{ color: "var(--primary-dark)" }}><i className="bi bi-facebook"></i></a>
                            <a href="#!" style={{ color: "var(--primary-dark)" }}><i className="bi bi-twitter"></i></a>
                            <a href="#!" style={{ color: "var(--primary-dark)" }}><i className="bi bi-linkedin"></i></a>
                            <a href="#!" style={{ color: "var(--primary-dark)" }}><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3" style={{ color: "var(--primary-color)" }}>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="/" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Home</a></li>
                            <li className="mb-2"><a href="/about" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>About Us</a></li>
                            <li className="mb-2"><a href="/ourService" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Our Services</a></li>
                            <li className="mb-2"><a href="/contact" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3" style={{ color: "var(--primary-color)" }}>Our Services</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="/services/it-services" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Software Development</a></li>
                            <li className="mb-2"><a href="/services/app-development" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Web &amp; Mobile Apps</a></li>
                            <li className="mb-2"><a href="/training" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Corporate Training</a></li>
                            <li className="mb-2"><a href="/kidsCoding" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Kids Coding Academy</a></li>
                            <li className="mb-2"><a href="/services/data-science-and-analytics" className="text-decoration-none" style={{ color: "var(--primary-dark)" }}>Data Analytics</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3" style={{ color: "var(--primary-color)" }}>Contact Us</h5>
                        <ul className="list-unstyled" style={{ color: "var(--primary-dark)" }}>
                            <li className="mb-3 d-flex">
                                <i className="bi bi-geo-alt-fill me-2" style={{ color: "var(--primary-color)" }}></i>
                                <span>Suit 49, Kasam Plaza, 26 Ikotun-Idimu Road, Ikotun, Lagos</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <i className="bi bi-telephone-fill me-2" style={{ color: "var(--primary-color)" }}></i>
                                <span>+234 912 191 9898</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <i className="bi bi-envelope-fill me-2" style={{ color: "var(--primary-color)" }}></i>
                                <span>service@ziffcode.com.ng</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-top mt-5 pt-3" style={{ borderColor: "rgba(47, 83, 148, 0.3) !important" }}>
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="mb-0 small" style={{ color: "var(--primary-dark)", opacity: 0.7 }}>&copy; {new Date().getFullYear()} Ziffcode Technologies. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0 small" style={{ color: "var(--primary-dark)", opacity: 0.7 }}>Designed by Ziffcode Team</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )

}

export default FooterComp;