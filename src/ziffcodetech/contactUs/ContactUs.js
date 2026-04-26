import React, { useState } from "react";
import "./contactUs.css";
import SEO from "../../components/SEO";
import { showSuccess } from "../../utils/sweetAlert";
import MapTracker from "./MapTracker";
import { getLocalBusinessSchema } from "../../utils/seoConfig";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showSuccess("Message Sent", `Thank you ${formData.name}. We have received your message!`);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="contact-us-container container-fluid">
            <SEO 
                title="Contact Ziffcode | Custom Software & Tech Support in Lagos" 
                description="Get in touch with Ziffcode Technologies. Reach our Lagos office for custom software development, outsourcing, and technical maintenance. Visit us at Suit 49, Kasam Plaza." 
                keywords="contact Ziffcode, tech support Lagos, software maintenance contact, hire developers Nigeria, Ziffcode office"
                schema={getLocalBusinessSchema()}
            />
            <div className="container py-4">
                <div className="text-center mb-5">
                    <h2 className="display-6 fw-black mb-3" style={{ color: "var(--primary-dark)", letterSpacing: '-1.5px' }}>Get in Touch</h2>
                    <div className="mx-auto" style={{ width: "70px", height: "4px", backgroundColor: "var(--primary-color)", borderRadius: "2px" }}></div>
                </div>
                
                <div className="row g-5">
                    {/* Contact Information Column */}
                    <div className="col-lg-6 contact-info-col d-flex flex-column gap-4">
                        {/* Information Card */}
                        <div className="bg-white rounded-4 overflow-hidden position-relative transition-all p-4 p-md-5" 
                             style={{ 
                                 boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                                 border: "none",
                                 borderTop: "5px solid var(--primary-color)"
                             }}>
                            <h3 className="fw-black mb-4" style={{ color: "var(--primary-dark)" }}>Contact Information</h3>
                            <p className="mb-5" style={{ color: "#4a5568", lineHeight: "1.7" }}>
                                Have questions? We'd love to hear from you. Reach out to us through any of these channels.
                            </p>
                            
                            <div className="info-item d-flex align-items-start mb-4">
                                <i className="bi bi-geo-alt-fill fs-3 me-3 text-primary"></i>
                                <div>
                                    <h5 className="fw-bold mb-1 text-dark">Our Location</h5>
                                    <p className="mb-0 text-muted">Suit 49, Kasam Plaza, 26 Ikotun-Idimu Road, Ikotun, Lagos State.</p>
                                </div>
                            </div>

                            <div className="info-item d-flex align-items-start mb-4">
                                <i className="bi bi-envelope-fill fs-3 me-3 text-primary"></i>
                                <div>
                                    <h5 className="fw-bold mb-1 text-dark">Email Us</h5>
                                    <p className="mb-0 text-muted">service@ziffcode.com.ng</p>
                                </div>
                            </div>

                            <div className="info-item d-flex align-items-start mb-0">
                                <i className="bi bi-telephone-fill fs-3 me-3 text-primary"></i>
                                <div>
                                    <h5 className="fw-bold mb-1 text-dark">Call Us</h5>
                                    <p className="mb-0 text-muted">+234 912 191 9898</p>
                                </div>
                            </div>
                        </div>

                        {/* Separate Map Card */}
                        <div className="bg-white rounded-4 overflow-hidden position-relative transition-all p-4 flex-grow-1 d-flex flex-column"
                             style={{ 
                                 boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                                 border: "none",
                                 borderTop: "5px solid var(--primary-color)"
                             }}>
                            <h4 className="fw-black mb-3 text-dark">Locate Us</h4>
                            {/* Map Tracker Component */}
                            <div className="map-placeholder rounded-4 overflow-hidden flex-grow-1" style={{ minHeight: "250px", border: "1px solid rgba(0,0,0,0.05)" }}>
                                <MapTracker />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className="col-lg-6 contact-form-col">
                        <div className="bg-white rounded-4 overflow-hidden position-relative transition-all h-100 p-4 p-md-5"
                             style={{ 
                                 boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                                 border: "none",
                                 borderTop: "5px solid var(--secondary-color)"
                             }}>
                            <h3 className="fw-black mb-4" style={{ color: "var(--primary-dark)" }}>Send us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6 text-start">
                                        <div className="input-group-container position-relative mb-2">
                                            <label htmlFor="name" className="form-label-custom fw-black text-uppercase mb-3 d-flex align-items-center" style={{ letterSpacing: "1.5px", fontSize: "0.85rem", color: "var(--primary-dark)" }}>
                                                <span style={{ width: "8px", height: "8px", backgroundColor: "var(--secondary-color)", borderRadius: "50%", display: "inline-block", marginRight: "10px" }}></span>
                                                Full Name
                                            </label>
                                            <div className="position-relative">
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg bg-white px-4 py-3" 
                                                    id="name" 
                                                    name="name" 
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required 
                                                    placeholder="Your full name"
                                                    style={{ 
                                                        color: "var(--primary-dark)", 
                                                        fontSize: "1rem", 
                                                        border: "none",
                                                        borderTop: "4px solid var(--secondary-color)",
                                                        borderBottom: "2px solid var(--primary-color)",
                                                        borderRadius: "12px", 
                                                        backgroundColor: "#fcfdfe",
                                                        boxShadow: "0 10px 25px -12px rgba(0,0,0,0.12)",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.transform = "translateY(-2px)";
                                                        e.target.style.boxShadow = "0 15px 30px -10px rgba(64,105,179,0.2)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.transform = "translateY(0)";
                                                        e.target.style.boxShadow = "0 10px 25px -12px rgba(0,0,0,0.12)";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <div className="input-group-container position-relative mb-2">
                                            <label htmlFor="email" className="form-label-custom fw-black text-uppercase mb-3 d-flex align-items-center" style={{ letterSpacing: "1.5px", fontSize: "0.85rem", color: "var(--primary-dark)" }}>
                                                <span style={{ width: "8px", height: "8px", backgroundColor: "var(--secondary-color)", borderRadius: "50%", display: "inline-block", marginRight: "10px" }}></span>
                                                Email Address
                                            </label>
                                            <div className="position-relative">
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-lg bg-white px-4 py-3" 
                                                    id="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required 
                                                    placeholder="email@example.com"
                                                    style={{ 
                                                        color: "var(--primary-dark)", 
                                                        fontSize: "1rem", 
                                                        border: "none",
                                                        borderTop: "4px solid var(--secondary-color)",
                                                        borderBottom: "2px solid var(--primary-color)",
                                                        borderRadius: "12px", 
                                                        backgroundColor: "#fcfdfe",
                                                        boxShadow: "0 10px 25px -12px rgba(0,0,0,0.12)",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.transform = "translateY(-2px)";
                                                        e.target.style.boxShadow = "0 15px 30px -10px rgba(64,105,179,0.2)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.transform = "translateY(0)";
                                                        e.target.style.boxShadow = "0 10px 25px -12px rgba(0,0,0,0.12)";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-start">
                                        <div className="input-group-container position-relative mb-2">
                                            <label htmlFor="subject" className="form-label-custom fw-black text-uppercase mb-3 d-flex align-items-center" style={{ letterSpacing: "1.5px", fontSize: "0.85rem", color: "var(--primary-dark)" }}>
                                                <span style={{ width: "8px", height: "8px", backgroundColor: "var(--secondary-color)", borderRadius: "50%", display: "inline-block", marginRight: "10px" }}></span>
                                                Inquiry Subject
                                            </label>
                                            <div className="position-relative">
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg bg-white px-4 py-3" 
                                                    id="subject" 
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required 
                                                    placeholder="Subject of your inquiry"
                                                    style={{ 
                                                        color: "var(--primary-dark)", 
                                                        fontSize: "1rem", 
                                                        border: "none",
                                                        borderTop: "4px solid var(--secondary-color)",
                                                        borderBottom: "2px solid var(--primary-color)",
                                                        borderRadius: "12px", 
                                                        backgroundColor: "#fcfdfe",
                                                        boxShadow: "0 10px 25px -12px rgba(0,0,0,0.12)",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.transform = "translateY(-2px)";
                                                        e.target.style.boxShadow = "0 15px 30px -10px rgba(64,105,179,0.2)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.transform = "translateY(0)";
                                                        e.target.style.boxShadow = "0 10px 25px -12px rgba(0,0,0,0.12)";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-start">
                                        <div className="input-group-container position-relative mb-2">
                                            <label htmlFor="message" className="form-label-custom fw-black text-uppercase mb-3 d-flex align-items-center" style={{ letterSpacing: "1.5px", fontSize: "0.85rem", color: "var(--primary-dark)" }}>
                                                <span style={{ width: "8px", height: "8px", backgroundColor: "var(--secondary-color)", borderRadius: "50%", display: "inline-block", marginRight: "10px" }}></span>
                                                Detailed Message
                                            </label>
                                            <div className="position-relative">
                                                <textarea 
                                                    className="form-control form-control-lg bg-white px-4 py-3" 
                                                    id="message" 
                                                    name="message"
                                                    rows="5"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required 
                                                    placeholder="How can we assist you today?"
                                                    style={{ 
                                                        color: "var(--primary-dark)", 
                                                        fontSize: "1rem", 
                                                        border: "none",
                                                        borderTop: "6px solid var(--secondary-color)",
                                                        borderBottom: "2px solid var(--primary-color)",
                                                        borderRadius: "12px", 
                                                        minHeight: "180px",
                                                        backgroundColor: "#fcfdfe",
                                                        boxShadow: "0 10px 25px -12px rgba(0,0,0,0.12)",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.transform = "translateY(-2px)";
                                                        e.target.style.boxShadow = "0 15px 30px -10px rgba(64,105,179,0.2)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.transform = "translateY(0)";
                                                        e.target.style.boxShadow = "0 10px 25px -12px rgba(0,0,0,0.12)";
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <button type="submit" className="btn btn-primary btn-lg rounded-pill w-100 py-3 fw-bold transition-all shadow-sm hover-scale" style={{ fontSize: "1.1rem" }}>Send Message <i className="bi bi-send-fill ms-2"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
