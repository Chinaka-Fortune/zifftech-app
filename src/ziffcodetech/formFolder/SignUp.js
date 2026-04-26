import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import authImage from '../homeImages/auth_learning.png';

const SignUp = () => {
    const [inputs, setInputs] = useState({});
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axiosInstance.get('/courses/');
                if (res.status === 200) {
                    setCourses(res.data);
                }
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!inputs.course_id) {
            setError("Please select a program");
            return;
        }

        try {
            const res = await axiosInstance.post('/auth/register', {
                name: `${inputs.fName || ''} ${inputs.lName || ''}`.trim(),
                email: inputs.email,
                password: inputs.password,
                course_id: inputs.course_id
            });
            if (res.status === 201) {
                navigate('/logIn');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setInputs({});
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row bg-white rounded-4 shadow-lg overflow-hidden my-5" style={{ maxWidth: '1200px', width: '95%', borderTop: "6px solid var(--primary-color)" }}>
                {/* Visual Graphic Column */}
                <div className="col-lg-6 d-none d-lg-block p-0">
                    <img src={authImage} alt="Join the Classroom" className="w-100 h-100" style={{ objectFit: 'cover', minHeight: "750px" }} />
                </div>
                
                {/* Form Column */}
                <div className="col-lg-6 p-5 p-lg-5 d-flex flex-column justify-content-center" style={{ backgroundColor: "var(--bg-light-blue)" }}>
                    <form onSubmit={handleSubmit} className="text-dark w-100 px-lg-4">
                        <div className="text-center mt-4 mb-4">
                            <h2 className="fw-black mb-2" style={{ color: "var(--primary-color)", letterSpacing: "-1px" }}>Create an Account</h2>
                            <p className="fs-5 mb-0 fw-bold" style={{ color: "var(--secondary-color)" }}>Join our community and kickstart your career.</p>
                        </div>

                        {error && <div className="alert alert-danger p-3 rounded-3 mb-4 fw-bold shadow-sm border-0 border-start border-danger border-4">{error}</div>}
                        
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-secondary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>First Name</label>
                                <input type="text" name="fName" value={inputs.fName || ""} onChange={handleChange} className="form-control form-control-lg form-control-branded" placeholder="First Name" required style={{ fontSize: "1.1rem" }} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-secondary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Last Name</label>
                                <input type="text" name="lName" value={inputs.lName || ""} onChange={handleChange} className="form-control form-control-lg form-control-branded" placeholder="Last Name" required style={{ fontSize: "1.1rem" }} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold text-secondary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Select Your Program</label>
                            <select name="course_id" value={inputs.course_id || ""} onChange={handleChange} className="form-select form-select-lg form-control-branded" required style={{ fontSize: "1.1rem" }}>
                                <option value="" disabled>-- Select Program --</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold text-secondary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Email Address</label>
                            <input type="email" name="email" value={inputs.email || ""} onChange={handleChange} className="form-control form-control-lg form-control-branded" placeholder="name@example.com" required style={{ fontSize: "1.1rem" }} />
                        </div>
                        <div className="row g-4 mb-5">
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-secondary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        value={inputs.password || ""} 
                                        onChange={handleChange} 
                                        className="form-control form-control-lg form-control-branded pe-5" 
                                        placeholder="Secure password" 
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
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-secondary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Confirm Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        name="confirmPassword" 
                                        value={inputs.confirmPassword || ""} 
                                        onChange={handleChange} 
                                        className="form-control form-control-lg form-control-branded pe-5" 
                                        placeholder="Repeat password" 
                                        required 
                                        style={{ fontSize: "1.1rem" }} 
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
                        </div>

                        <button type="submit" className="btn btn-lg w-100 text-white text-center mb-4 py-3 fw-bold shadow position-relative transition-hover" style={{ backgroundColor: "var(--primary-color)", fontSize: "1.2rem", transition: "all 0.3s ease" }}>
                            Create Ziffcode Account
                        </button>

                        <div className="text-center mt-4 mb-4 fw-bold fs-5" style={{ color: "var(--secondary-color)" }}>
                            Already have an account? <NavLink to="/logIn" className="fw-black text-decoration-none ms-2" style={{ color: "var(--primary-color)" }}>Log in here</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
