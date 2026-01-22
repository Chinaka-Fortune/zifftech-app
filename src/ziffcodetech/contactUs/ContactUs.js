import React, { useState } from "react";
import "./contactUs.css";

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
        alert(`Thank you ${formData.name}. We have received your message!`);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="contact-us-container container-fluid">
            <div className="container py-5">
                <h2 className="text-center fw-bold mb-5 section-title">Get in Touch</h2>
                
                <div className="row g-5">
                    {/* Contact Information Column */}
                    <div className="col-lg-5 contact-info-col">
                        <div className="contact-card p-4 h-100">
                            <h3 className="fw-bold mb-4">Contact Information</h3>
                            <p className="mb-4 text-muted-light">
                                Have questions? We'd love to hear from you. Reach out to us through any of these channels.
                            </p>
                            
                            <div className="info-item d-flex align-items-start mb-4">
                                <i className="bi bi-geo-alt-fill fs-4 me-3 text-primary"></i>
                                <div>
                                    <h5 className="fw-bold mb-1">Our Location</h5>
                                    <p className="mb-0">Suit 49, Kasam Plaza, 26 Ikotun-Idimu Road, Ikotun, Lagos State.</p>
                                </div>
                            </div>

                            <div className="info-item d-flex align-items-start mb-4">
                                <i className="bi bi-envelope-fill fs-4 me-3 text-primary"></i>
                                <div>
                                    <h5 className="fw-bold mb-1">Email Us</h5>
                                    <p className="mb-0">service@ziffcode.com.ng</p>
                                </div>
                            </div>

                            <div className="info-item d-flex align-items-start mb-4">
                                <i className="bi bi-telephone-fill fs-4 me-3 text-primary"></i>
                                <div>
                                    <h5 className="fw-bold mb-1">Call Us</h5>
                                    <p className="mb-0">+234 912 191 9898</p>
                                </div>
                            </div>

                            {/* Placeholder for Map */}
                            <div className="map-placeholder mt-4 rounded">
                                <div className="bg-secondary bg-opacity-25 w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                    Map Integration Coming Soon
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className="col-lg-7 contact-form-col">
                        <div className="form-card p-4 h-100">
                            <h3 className="fw-bold mb-4">Send us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label fw-bold">Your Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            name="name" 
                                            value={formData.name}
                                            onChange={handleChange}
                                            required 
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label fw-bold">Your Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required 
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="subject" className="form-label fw-bold">Subject</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="subject" 
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required 
                                            placeholder="Subject of your message here"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="message" className="form-label fw-bold">Message</label>
                                        <textarea 
                                            className="form-control" 
                                            id="message" 
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required 
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Send Message</button>
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
