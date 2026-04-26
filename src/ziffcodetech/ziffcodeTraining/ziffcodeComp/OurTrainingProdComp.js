import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { showError } from "../../../utils/sweetAlert";
// fallback image
import webDvImg from "../ziffTrainingImages/wedDvImg.png"

const OurTrainingProdComp = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Currency & Pricing state
    const [exchangeRates, setExchangeRates] = useState({ USD: 1 });
    const [userCurrency, setUserCurrency] = useState("USD");
    
    // Modal & Payment state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModalCurrency, setSelectedModalCurrency] = useState("USD");
    const [selectedGateway, setSelectedGateway] = useState("paystack");
    const [enrolling, setEnrolling] = useState(false);

    const navigate = useNavigate();

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get('/courses/');
                setCourses(response.data);
            } catch (err) {
                console.error("Error fetching courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Fetch Exchange Rates & User Currency
    useEffect(() => {
        const fetchCurrencyAndRates = async () => {
            try {
                // 1. Fetch live Exchange Rates (Base: USD)
                const ratesResponse = await fetch("https://open.er-api.com/v6/latest/USD");
                const ratesData = await ratesResponse.json();
                if (ratesData && ratesData.rates) {
                    setExchangeRates(ratesData.rates);
                }

                // 2. Fetch User Currency Preference via IP Location
                const ipResponse = await fetch("https://ipapi.co/json/");
                const ipData = await ipResponse.json();
                if (ipData && ipData.currency) {
                    setUserCurrency(ipData.currency);
                    setSelectedModalCurrency(ipData.currency);
                }
            } catch (error) {
                console.error("Error fetching location or exchange rates", error);
            }
        };
        fetchCurrencyAndRates();
    }, []);

    // Price formatting helper
    const formatPrice = (priceInUSD, currencyCode) => {
        const rate = exchangeRates[currencyCode] || 1;
        const convertedAmount = priceInUSD * rate;
        
        try {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(convertedAmount);
        } catch (e) {
            // Fallback for unsupported currencies display
            return `${currencyCode} ${convertedAmount.toFixed(2)}`;
        }
    };

    const handleEnrollClick = (course) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/logIn');
            return;
        }
        setSelectedCourse(course);
        setSelectedModalCurrency(userCurrency); // reset dropdown to user's localized currency
        setIsModalOpen(true);
    };

    const confirmEnrollment = async () => {
        if (!selectedCourse) return;
        setEnrolling(true);
        try {
            const res = await axiosInstance.post('/payments/checkout', {
                course_id: selectedCourse.id,
                gateway: selectedGateway,
                currency: selectedModalCurrency
            });
            if (res.data.checkout_url) {
                window.location.href = res.data.checkout_url;
            }
        } catch (err) {
            showError("Checkout Failed", err.response?.data?.message || err.response?.data?.error || err.message);
            setEnrolling(false);
        } // We don't setEnrolling(false) in finally because we are redirecting
    };

    if (loading) return <div className="text-center my-5">Loading courses...</div>;

    return (
        <div className="container-fluid py-5 px-md-5 bg-white position-relative">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                    <div className="ps-4 border-start border-4 mb-4" style={{ borderColor: "var(--secondary-color) !important" }}>
                        <h2 className="display-5 fw-black m-0" style={{ color: "var(--primary-dark)" }}>Hands-on Training</h2>
                        <h5 className="fw-bold mt-2" style={{ color: "var(--secondary-color)" }}>Elevate Your Skills, Empower Your Future</h5>
                    </div>
                    
                    <div className="shadow-sm p-4 p-md-5 rounded-4 bg-light border-bottom border-4" style={{ borderColor: "var(--primary-color) !important" }}>
                        <p className="fs-5 mb-4 text-dark" style={{ lineHeight: "1.8" }}>At Ziffcode Technologies, we believe that the most impactful learning happens through hands-on experience. That's why our training programs are designed to immerse you in a dynamic, interactive learning environment where you'll have the opportunity to apply your newfound knowledge in real-world scenarios.</p>
                        <p className="text-dark opacity-90 mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>Led by industry-leading experts, our hands-on training sessions combine comprehensive theoretical instruction with practical, project-based learning. From coding workshops to software development sprints, you'll have the chance to tackle challenging problems, collaborate with peers, and hone your skills in a supportive, enriching setting.</p>
                        <p className="text-dark opacity-90 mb-0" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>Whether you're looking to upskill, pivot your career, or simply explore the world of technology, our hands-on training programs will equip you with the practical expertise and confidence you need to thrive in the digital landscape.</p>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-lg-10">
                   <div className="ps-4 border-start border-4 mb-4" style={{ borderColor: "var(--primary-color) !important" }}>
                        <h2 className="display-5 fw-black m-0" style={{ color: "var(--primary-dark)" }}>Certification</h2>
                        <h5 className="fw-bold mt-2" style={{ color: "var(--secondary-color)" }}>Validate Your Expertise, Elevate Your Career</h5>
                    </div>

                    <div className="shadow-sm p-4 p-md-5 rounded-4 bg-light border-bottom border-4" style={{ borderColor: "var(--secondary-color) !important" }}>
                        <p className="fs-5 mb-4 text-dark" style={{ lineHeight: "1.8" }}>At Ziffcode Technologies, we believe that professional certification is the key to unlocking new opportunities and demonstrating your expertise to the world. That's why we offer a wide range of industry-recognized certification programs that are designed to help you stand out in the competitive tech landscape.</p>
                        <p className="text-dark opacity-90 mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>Guided by our team of seasoned experts, you'll dive deep into the latest tools, methodologies, and best practices, ensuring that you're equipped with the cutting-edge expertise that employers and clients demand. Position yourself as a highly sought-after professional in your field.</p>
                        <div className="d-flex align-items-center gap-2 mt-4">
                            <span className="badge p-2 bg-dark">Industry Recognized</span>
                            <span className="badge p-2 bg-dark">Expert Verified</span>
                            <span className="badge p-2 bg-dark">Career Boosting</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mb-5 mt-5">
                <h1 className="display-4 fw-black mb-3" style={{ color: "var(--primary-dark)" }}>Available Ziffcode Courses</h1>
                <div className="mx-auto" style={{ width: "80px", height: "4px", backgroundColor: "var(--secondary-color)" }}></div>
            </div>
            
            <div className="row d-flex justify-content-center gap-4">
                {courses.length > 0 ? courses.map((course, idx) => (
                    <div className="col-lg-3 col-md-5 col-11 p-0 rounded-4 bg-white d-flex flex-column overflow-hidden transition-all" 
                         key={course.id}
                         style={{ 
                           transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
                           cursor: "pointer",
                           boxShadow: "0 10px 40px -15px rgba(0,0,0,0.12)",
                           borderTop: `5px solid ${idx % 2 === 0 ? "var(--secondary-color)" : "var(--primary-color)"}`,
                           borderBottom: "1px solid rgba(0,0,0,0.05)"
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = "translateY(-15px)";
                           e.currentTarget.style.boxShadow = "0 35px 70px -15px rgba(64,105,179,0.2)";
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = "translateY(0)";
                           e.currentTarget.style.boxShadow = "0 10px 40px -15px rgba(0,0,0,0.12)";
                         }}>
                        
                        <div className="w-100 d-flex justify-content-center align-items-center position-relative overflow-hidden border-bottom" 
                             style={{ 
                                height: "240px", 
                                backgroundColor: "white",
                             }}>
                            <img src={webDvImg} alt={course.title} className="w-100 h-100 p-4" style={{ objectFit: "contain", filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.05))" }} />
                        </div>

                        <div className="p-4 d-flex flex-column" style={{ flex: "1 1 auto", backgroundColor: "white" }}>
                            <h4 className="fw-black mb-3" style={{ color: "var(--primary-dark)", minHeight: "3.5rem" }}>{course.title}</h4>
                            <p className="fw-medium mb-4" style={{ color: "#2d3748", lineHeight: "1.6", fontSize: "0.95rem", flexGrow: 1, minHeight: "80px" }}>{course.description}</p>
                            
                            <div className="d-flex align-items-center justify-content-between mt-auto w-100 py-3" style={{ backgroundColor: "transparent" }}>
                                <span className="fw-black fs-4" style={{ color: "var(--secondary-color)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "55%" }} title={formatPrice(course.price, userCurrency)}>
                                    {formatPrice(course.price, userCurrency)}
                                </span>
                                <button className="btn btn-primary px-4 py-2 fw-bold" 
                                        style={{ backgroundColor: "var(--primary-color)", borderColor: "var(--primary-color)" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEnrollClick(course);
                                        }}>
                                    Enroll Now
                                </button>
                            </div>
                        </div>

                        {/* Full-width Base Decorative Line */}
                        <div style={{ 
                            width: "100%", 
                            height: "6px", 
                            background: "var(--primary-color)", 
                            opacity: 0.9
                        }}>
                        </div>
                    </div>
                )) : <p className="text-muted fs-5">No courses available right now.</p>}
            </div>

            <div className="text-center mt-5 mb-4">
                <button 
                    className="btn btn-link fs-5 fw-bold text-decoration-none d-flex align-items-center justify-content-center mx-auto gap-2"
                    style={{ color: "var(--secondary-color)", transition: "all 0.3s ease" }}
                    onClick={() => navigate('/all-courses')}
                    onMouseEnter={(e) => e.target.style.gap = "12px"}
                    onMouseLeave={(e) => e.target.style.gap = "8px"}
                >
                    Explore More Courses 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </button>
            </div>

            {/* Premium Enrollment Modal */}
            {isModalOpen && selectedCourse && (
                <>
                    <div className="modal-backdrop fade show transition-all" 
                         style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
                         onClick={() => !enrolling && setIsModalOpen(false)}></div>
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }} role="dialog">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden bg-white">
                                <style>{`
                                    .form-select:focus, .btn:focus { box-shadow: none !important; border-color: #e2e8f0 !important; }
                                `}</style>
                                <div className="modal-header border-bottom border-4 p-4" style={{ borderColor: '#e2e8f0 !important', backgroundColor: 'white' }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-white border p-3 rounded-circle" style={{ color: '#475569' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="modal-title fw-black mb-0" style={{ color: '#1e293b' }}>Confirm Enrollment</h4>
                                            <span className="text-muted small fw-bold">Review your course and payment details</span>
                                        </div>
                                    </div>
                                    <button type="button" className="btn-close shadow-none" onClick={() => !enrolling && setIsModalOpen(false)} disabled={enrolling}></button>
                                </div>
                                
                                <div className="modal-body p-4 p-md-5">
                                    <div className="row g-4 align-items-center">
                                        <div className="col-md-6 border-end-md px-md-4">
                                            <h5 className="text-uppercase text-muted fw-bold mb-3" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>Course Summary</h5>
                                            <h3 className="fw-black" style={{ color: '#1e293b' }}>{selectedCourse.title}</h3>
                                            <p className="text-muted mt-3 mb-4" style={{ lineHeight: '1.6' }}>{selectedCourse.description}</p>
                                            
                                            <h5 className="text-uppercase text-muted fw-bold mb-3 mt-4" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>Payment Provider</h5>
                                            <div className="d-flex flex-column gap-2 mb-4">
                                                {[
                                                    { id: 'paystack', name: 'Paystack (Africa)', icon: '💸' },
                                                    { id: 'flutterwave', name: 'Flutterwave (Global)', icon: '🌍' }
                                                ].map(gw => (
                                                    <button 
                                                        key={gw.id}
                                                        className={`btn p-3 text-start rounded-4 border-2 transition-all d-flex align-items-center justify-content-between ${selectedGateway === gw.id ? 'border-dark bg-white shadow-sm' : 'border-light bg-white hover-bg-light'}`}
                                                        onClick={() => setSelectedGateway(gw.id)}
                                                    >
                                                        <span className={`fw-bold ${selectedGateway === gw.id ? 'text-dark' : 'text-muted'}`}>{gw.icon} {gw.name}</span>
                                                        {selectedGateway === gw.id && <i className="bi bi-check-circle-fill text-dark"></i>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 px-md-4">
                                            <div className="bg-white rounded-4 p-4 mb-4 border shadow-sm" style={{ borderColor: '#e2e8f0' }}>
                                                <label className="form-label fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--primary-dark)' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                      <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                                      <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
                                                    </svg>
                                                    Select Payment Currency
                                                </label>
                                                <select 
                                                    className="form-select form-select-lg shadow-sm border-0 fw-bold" 
                                                    value={selectedModalCurrency}
                                                    onChange={(e) => setSelectedModalCurrency(e.target.value)}
                                                    style={{ backgroundColor: 'white', color: '#1e293b' }}
                                                    disabled={enrolling}
                                                >
                                                    {Object.keys(exchangeRates).map((currency) => (
                                                        <option key={currency} value={currency}>{currency}</option>
                                                    ))}
                                                </select>
                                                <div className="text-muted small mt-2 d-flex justify-content-between">
                                                    <span>Real-time exchange rate</span>
                                                    <span className="fw-bold">1 USD = {exchangeRates[selectedModalCurrency]?.toFixed(4)} {selectedModalCurrency}</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 mt-4 border-top w-100 text-center" style={{ backgroundColor: 'white' }}>
                                                <div className="w-100 p-2" style={{ backgroundColor: 'white', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                                    <span className="fs-1 fw-black" style={{ color: 'var(--secondary-color)', textShadow: '0 2px 4px rgba(0,0,0,0.05)', lineHeight: '1.2' }}>
                                                        {formatPrice(selectedCourse.price, selectedModalCurrency)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer border-0 p-4 pt-0 justify-content-end gap-3" style={{ backgroundColor: 'white' }}>
                                    <button 
                                        className="btn bg-white border px-4 py-3 fw-bold rounded-3 shadow-sm hover-effect" 
                                        onClick={() => !enrolling && setIsModalOpen(false)}
                                        style={{ color: '#475569', minWidth: '120px' }}
                                        disabled={enrolling}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="btn btn-dark text-white px-5 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2" 
                                        style={{ backgroundColor: '#1e293b', borderColor: '#1e293b', minWidth: '200px' }}
                                        onClick={confirmEnrollment}
                                        disabled={enrolling}
                                    >
                                        {enrolling ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Processing Securely...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
                                                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"/>
                                                </svg>
                                                Confirm & Pay
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OurTrainingProdComp;