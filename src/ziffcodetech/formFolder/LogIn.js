import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
// Try to import axiosInstance if it's used elsewhere, otherwise we can just mock the submit
import axiosInstance from '../../api/axios';
import authImage from '../homeImages/auth_learning.png';

const LogIn = () => {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Updated logic to use auth endpoint
            const res = await axiosInstance.post('/auth/login', inputs);
            if (res.status === 200 || res.status === 201) {
                // The backend returns access_token, but check for both just in case
                const token = res.data?.access_token || res.data?.token;
                if (token) {
                    localStorage.setItem('token', token);
                    // Dispatch event so NavBar updates instantly without page refresh
                    window.dispatchEvent(new Event('authChange'));
                }
                
                // Navigate based on user role
                const userRole = res.data?.user?.role || 'student';
                if (['admin', 'super_admin'].includes(userRole)) {
                    navigate('/admin');
                } else if (['manager', 'director', 'team_lead', 'admin_staff', 'staff'].includes(userRole)) {
                    navigate('/staff-dashboard');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid login credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row bg-white rounded-4 shadow-lg overflow-hidden my-5" style={{ maxWidth: '1200px', width: '95%', borderTop: "6px solid var(--primary-color)" }}>
                {/* Visual Graphic Column */}
                <div className="col-lg-6 d-none d-lg-block p-0">
                    <img src={authImage} alt="Welcome Back" className="w-100 h-100" style={{ objectFit: 'cover', minHeight: "650px" }} />
                </div>
                
                {/* Form Column */}
                <div className="col-lg-6 p-5 p-lg-5 d-flex flex-column justify-content-center" style={{ backgroundColor: "var(--bg-light-blue)" }}>
                    <form onSubmit={handleSubmit} className="text-dark w-100 px-lg-4">
                        <div className="text-center mt-4 mb-5">
                            <h2 className="fw-black mb-2" style={{ color: "var(--primary-color)", letterSpacing: "-1px" }}>Welcome Back</h2>
                            <p className="fs-5 mb-0 fw-bold" style={{ color: "var(--secondary-color)" }}>Access your Ziffcode dashboard.</p>
                        </div>

                        {error && <div className="alert alert-danger p-3 rounded-3 mb-4 fw-bold shadow-sm border-0 border-start border-danger border-4">{error}</div>}

                        <div className="mb-4">
                            <label className="form-label fw-bold text-secondary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={inputs.email || ""} 
                                onChange={handleChange} 
                                className="form-control form-control-lg form-control-branded" 
                                placeholder="name@example.com" 
                                required 
                                style={{ fontSize: "1.1rem" }} 
                            />
                        </div>

                        <div className="mb-5">
                            <label className="form-label fw-bold text-secondary text-uppercase d-flex justify-content-between" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>
                                Password
                                <NavLink to="/forgot-password" style={{ color: "var(--secondary-color)", textTransform: "none", letterSpacing: "0px" }}>Forgot password?</NavLink>
                            </label>
                            <div className="position-relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    value={inputs.password || ""} 
                                    onChange={handleChange} 
                                    className="form-control form-control-lg form-control-branded pe-5" 
                                    placeholder="Enter your password" 
                                    required 
                                    style={{ fontSize: "1.1rem" }} 
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

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn btn-lg w-100 text-white text-center mb-4 py-3 fw-bold shadow position-relative transition-hover" 
                            style={{ backgroundColor: "var(--primary-color)", fontSize: "1.2rem", transition: "all 0.3s ease" }}
                        >
                            {loading ? "Authenticating..." : "Log In"}
                        </button>

                        <div className="text-center mt-4 mb-4 fw-bold fs-5" style={{ color: "var(--secondary-color)" }}>
                            Don't have an account? <NavLink to="/signUp" className="fw-black text-decoration-none ms-2" style={{ color: "var(--primary-color)" }}>Sign up here</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
