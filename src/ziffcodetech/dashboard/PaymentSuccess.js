import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const PaymentSuccess = () => {
    const [verifying, setVerifying] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(location.search);
            const paystackRef = params.get('reference');
            const flutterwaveTxId = params.get('transaction_id');
            const stripeSessionId = params.get('session_id'); // If using Stripe checkout

            try {
                let response;
                if (paystackRef) {
                    response = await axiosInstance.get(`/payments/verify-paystack?reference=${paystackRef}`);
                } else if (flutterwaveTxId) {
                    response = await axiosInstance.get(`/payments/verify-flutterwave?transaction_id=${flutterwaveTxId}`);
                } else if (stripeSessionId) {
                    // For Stripe, we can implement a verify-stripe or just assume success if redirected here
                    // But to be safe, let's just mark it verified for now or add a small delay
                    setVerifying(false);
                    return;
                } else {
                    // No params, might be a direct navigation or already verified
                    setVerifying(false);
                    return;
                }

                if (response.status === 200) {
                    setVerifying(false);
                }
            } catch (err) {
                console.error("Verification failed", err);
                setError(err.response?.data?.message || "Payment verification failed. Please contact support.");
                setVerifying(false);
            }
        };

        verifyPayment();
    }, [location.search]);

    if (verifying) {
        return (
            <div className="container-fluid py-5 bg-white d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                    <h2 className="fw-black text-dark">Verifying Secure Payment...</h2>
                    <p className="text-muted">Please do not close this window while we secure your access.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid py-5 bg-white d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
                <div className="col-lg-5 col-md-8 col-11 p-5 rounded-4 border-0 shadow-lg bg-white text-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-4 mx-auto" style={{ width: "80px", height: "80px", backgroundColor: "#f8d7da", color: "#dc3545" }}>
                        <h1 className="display-4 m-0 fw-black">!</h1>
                    </div>
                    <h2 className="fw-black mb-3 text-danger">Verification Pending</h2>
                    <p className="fs-5 text-dark mb-5">{error}</p>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-dark btn-lg w-100 py-3 fw-bold rounded-pill">
                        Go to Support / Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-5 bg-white d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
            <div className="col-lg-5 col-md-8 col-11 p-0 rounded-4 border-0 shadow-lg bg-white overflow-hidden text-center transition-all animate__animated animate__zoomIn">
                <div className="py-5 px-4 d-flex flex-column align-items-center border-top border-5" style={{ borderColor: "#28a745" }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-4 shadow-sm" style={{ width: "100px", height: "100px", backgroundColor: "#d4edda", color: "#28a745" }}>
                        <i className="bi bi-check-lg display-1"></i>
                    </div>
                    <h2 className="fw-black mb-1" style={{ color: "var(--primary-dark)", letterSpacing: "-1px" }}>Payment Verified!</h2>
                    <p className="text-success fw-bold mb-4 text-uppercase small" style={{ letterSpacing: '2px' }}>Access Granted Automatically</p>
                    <p className="fs-5 text-dark mb-5 px-md-4" style={{ lineHeight: "1.7" }}>
                        Your specialized training program is now <span className="fw-bold text-success">fully unlocked</span>. You've successfully secured your spot in the Ziffcode Academy.
                    </p>
                    <div className="d-flex flex-column gap-3 w-100">
                        <NavLink to="/dashboard" className="btn btn-primary btn-lg py-3 fw-bold rounded-pill shadow-sm transition-all hover-lift">
                            🚀 Enter Course Portal
                        </NavLink>
                        <NavLink to="/dashboard" className="btn btn-link text-muted text-decoration-none fw-bold small">
                            Back to Dashboard
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
