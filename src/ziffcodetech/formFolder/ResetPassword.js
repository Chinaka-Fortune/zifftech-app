import React, { useState } from 'react';
import { useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import authImage from '../homeImages/auth_learning.png';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const res = await axiosInstance.post('/auth/reset-password', { token, email, password });
            setMessage(res.data.message);
            setTimeout(() => navigate('/logIn'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
    };

    if (!token) {
        return (
            <div className="container py-5 text-center mt-5 pt-5">
                <div className="alert alert-danger d-inline-block p-4 rounded-4 shadow-sm border-0">
                    <h4 className="fw-bold">Invalid Reset Request</h4>
                    <p className="mb-0">No security token was found in the URL. Please request a new link.</p>
                </div>
                <div className="mt-3">
                    <NavLink to="/forgot-password" className="btn btn-primary rounded-pill px-4 fw-bold">Request New Link</NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row bg-white rounded-4 shadow-lg overflow-hidden my-5" style={{ maxWidth: '1000px', width: '95%', borderTop: "6px solid var(--primary-color)" }}>
                <div className="col-lg-6 d-none d-lg-block p-0">
                    <img src={authImage} alt="Reset Password" title="New Beginnings" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
                <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
                    <div className="px-lg-3">
                        <h2 className="fw-black mt-4 mb-3" style={{ color: "var(--primary-color)", letterSpacing: "-1px" }}>New Password</h2>
                        <p className="fs-5 mb-4 fw-bold" style={{ color: "var(--secondary-color)" }}>Identify your account and choose a new password.</p>
                        
                        {message && <div className="alert alert-success p-3 rounded-3 shadow-sm border-0 border-start border-success border-4 mb-4 fw-bold">{message} Redirecting to login...</div>}
                        {error && <div className="alert alert-danger p-3 rounded-3 shadow-sm border-0 border-start border-danger border-4 mb-4 fw-bold">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-secondary text-uppercase small" style={{ letterSpacing: "1px" }}>Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-lg form-control-branded" 
                                    placeholder="Enter associated email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                             <div className="mb-4">
                                <label className="form-label fw-bold text-secondary text-uppercase small" style={{ letterSpacing: "1px" }}>New Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        className="form-control form-control-lg form-control-branded pe-5" 
                                        placeholder="at least 8 characters" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                    <button
                                        type="button"
                                        className="btn position-absolute top-50 end-0 translate-middle-y border-0 text-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ zIndex: 10 }}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} fs-5`}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-secondary text-uppercase small" style={{ letterSpacing: "1px" }}>Confirm Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        className="form-control form-control-lg form-control-branded pe-5" 
                                        placeholder="re-type password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required 
                                    />
                                    <button
                                        type="button"
                                        className="btn position-absolute top-50 end-0 translate-middle-y border-0 text-secondary"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ zIndex: 10 }}
                                    >
                                        <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} fs-5`}></i>
                                    </button>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn btn-primary btn-lg w-100 py-3 fw-bold shadow-sm rounded-pill transition-all hover-lift mb-4"
                            >
                                {loading ? 'Resetting...' : 'Secure My Account'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
