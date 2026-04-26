import React from 'react';
import { NavLink } from 'react-router-dom';

const PaymentCancel = () => {
    return (
        <div className="container-fluid py-5 bg-white d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
            <div className="col-lg-5 col-md-8 col-11 p-0 rounded-4 border-0 shadow-lg bg-white overflow-hidden text-center transition-all"
                 style={{ 
                    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                 }}>
                <div className="py-5 px-4 d-flex flex-column align-items-center border-top border-5" style={{ borderColor: "var(--secondary-color) !important" }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-4 shadow-sm" style={{ width: "100px", height: "100px", backgroundColor: "#fff3cd", color: "var(--secondary-color)" }}>
                        <h1 className="display-4 m-0 fw-black">!</h1>
                    </div>
                    <h2 className="fw-black mb-3" style={{ color: "var(--primary-dark)", letterSpacing: "-1px" }}>Payment Cancelled</h2>
                    <p className="fs-5 text-dark mb-5 px-md-4" style={{ lineHeight: "1.7" }}>
                        Your payment was cancelled or interrupted. No worries—you can resume your enrollment from your dashboard at any time.
                    </p>
                    <div className="d-flex flex-column gap-3 w-100">
                        <NavLink to="/dashboard" className="btn btn-primary btn-lg py-3 fw-bold rounded-pill shadow-sm transition-all hover-lift">
                            Return to Dashboard
                        </NavLink>
                        <NavLink to="/" className="text-decoration-none fw-bold text-muted">Go Back Home</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
