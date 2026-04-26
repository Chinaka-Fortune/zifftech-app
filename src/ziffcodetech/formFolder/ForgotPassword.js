import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import authImage from '../homeImages/auth_learning.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const res = await axiosInstance.post('/auth/forgot-password', { email });
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to request reset");
        } finally {
            setLoading(false);
            setEmail(""); // Clear field after submission
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row bg-white rounded-4 shadow-lg overflow-hidden my-5" style={{ maxWidth: '1000px', width: '95%', borderTop: "6px solid var(--primary-color)" }}>
                <div className="col-lg-6 d-none d-lg-block p-0">
                    <img src={authImage} alt="Forgot Password" title="Security First" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
                <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
                    <div className="px-lg-3">
                        <h2 className="fw-black mt-4 mb-3" style={{ color: "var(--primary-color)", letterSpacing: "-1px" }}>Forgot Password?</h2>
                        <p className="fs-5 mb-4 fw-bold" style={{ color: "var(--secondary-color)" }}>Enter your email address and we'll send you a link to reset your password.</p>
                        
                        {message && (
                            <div className="text-center p-4">
                                <div className="alert alert-success p-4 rounded-4 shadow-sm border-0 border-start border-success border-4 mb-4">
                                    <h4 className="fw-bold mb-2">Success!</h4>
                                    <p className="mb-0 fw-bold">{message}</p>
                                </div>
                            </div>
                        )}
                        
                        {!message && (
                            <>
                                {error && <div className="alert alert-danger p-3 rounded-3 shadow-sm border-0 border-start border-danger border-4 mb-4 fw-bold">{error}</div>}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold text-secondary text-uppercase small" style={{ letterSpacing: "1px" }}>Email Address</label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-lg form-control-branded" 
                                            placeholder="name@example.com" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="btn btn-primary btn-lg w-100 py-3 fw-bold shadow-sm rounded-pill transition-all hover-lift mb-4"
                                    >
                                        {loading ? 'Sending link...' : 'Send Reset Link'}
                                    </button>
                                </form>
                            </>
                        )}
                        <div className="text-center mt-4">
                            <NavLink to="/logIn" className="text-decoration-none fw-bold" style={{ color: "var(--primary-color)" }}>
                                <i className="bi bi-arrow-left me-2"></i>Back to Login
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
