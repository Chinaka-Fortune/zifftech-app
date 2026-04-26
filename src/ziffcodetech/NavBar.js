import React, { useState, useEffect } from "react";
import '../ziffcodetech/ziffHome/ziffCode.css';
import ziffcodeLogo from './ziffHome/homeImages/ziffcodeLogo.png'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';

// Component for global navigation

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('student');
    const navigate = useNavigate();
    const location = useLocation();

    // Close the mobile menu automatically upon navigation
    useEffect(() => {
        const navbarCollapse = document.getElementById('navbarTogglerDemo03');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            // We use the Bootstrap data API to trigger a click on the toggler 
            // This is the safest way to ensure Bootstrap's state and aria-attributes stay in sync
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler) toggler.click();
        }
    }, [location]);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
            if (token) {
                try {
                    const res = await axiosInstance.get('/auth/me');
                    setUserRole(res.data.role);
                } catch (err) {
                    console.error("Auth check failed", err);
                }
            }
        };
        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChange', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole('student');
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
    };

    const getDashboardPath = () => {
        if (['admin', 'super_admin'].includes(userRole)) return '/admin';
        if (['manager', 'director', 'team_lead', 'admin_staff', 'staff'].includes(userRole)) return '/staff-dashboard';
        return '/dashboard';
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-white shadow-sm" style={{ borderBottom: `4px solid var(--primary-color)` }}>
            <div className="d-flex container-fluid text-primary-emphasis">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to="/" className="ziffcodeLogoDiv navbar-brand d-flex align-items-center text-decoration-none">
                    <img src={ziffcodeLogo} className="logoImage"
                        alt="ziffcodeLogo" />
                    <p className="text-primary-emphasis fw-bold fs-5 mb-0">ZIFFCODE</p>
                </NavLink>
            
                <div className="collapse navbar-collapse text-primary-emphasis mt-3 mt-lg-0" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold gap-lg-4 align-items-lg-center" style={{ color: "var(--primary-dark)" }}>
                        <li className="nav-item px-3">
                            <NavLink className="text-decoration-none LiNavLink" aria-current="page" to='/' end>Home</NavLink>
                        </li>
                        <li className="nav-item px-3">
                            <NavLink className="text-decoration-none LiNavLink" to='/about'>About Us</NavLink>
                        </li>
                        <li className="nav-item dropdown px-3">
                            <span className="nav-link dropdown-toggle fw-bold cursor-pointer" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "var(--primary-dark)", cursor: 'pointer' }}>
                                Services
                            </span>
                            <ul className="dropdown-menu shadow-sm border-0" aria-labelledby="servicesDropdown">
                                <li><NavLink className="dropdown-item" to='/ourService'>Our Services</NavLink></li>
                                <li><NavLink className="dropdown-item" to='/training'>Ziffcode Training</NavLink></li>
                                <li><NavLink className="dropdown-item" to='/kidsCoding'>Kids Coding</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item ps-3">
                            <NavLink className="text-decoration-none LiNavLink" to='/contact'>Contact Us</NavLink>
                        </li>
                        {!isAuthenticated ? (
                            <li className="nav-item ps-3">
                                <NavLink className="text-decoration-none nav-auth-btn px-4 py-2 text-white d-inline-block" to='/logIn'>Log In / Sign Up</NavLink>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item ps-3">
                                    <NavLink className="text-decoration-none LiNavLink" to={getDashboardPath()}>Dashboard</NavLink>
                                </li>
                                <li className="nav-item ps-3">
                                    <button onClick={handleLogout} className="btn btn-danger btn-sm rounded-3 fw-bold ms-2">Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;