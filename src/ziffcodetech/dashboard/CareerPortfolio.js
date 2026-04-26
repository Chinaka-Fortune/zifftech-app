import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useParams } from 'react-router-dom';

const CareerPortfolio = () => {
    const { userId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                // Public endpoint or specific public-only fetch
                const res = await axiosInstance.get(`/auth/public-portfolio/${userId}`);
                setData(res.data);
            } catch (err) {
                console.error("Failed to load portfolio", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, [userId]);

    if (loading) return <div className="text-center py-5 min-vh-100 d-center bg-white"><div className="spinner-border text-primary"></div></div>;
    
    if (!data || !data.public_profile) return (
        <div className="container py-5 mt-5 text-center fade-in-up">
            <h1 className="fw-black mb-4">Portfolio Restricted</h1>
            <p className="text-muted fs-5 mb-5">This Ziffcode professional has chosen to keep their profile private.</p>
            <button className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm" onClick={() => window.location.href = '/'}>Return Home</button>
        </div>
    );

    return (
        <div className="container py-5 mt-5 fade-in-up">
            <div className="row g-5">
                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg rounded-4 p-5 bg-white sticky-top" style={{ top: '100px' }}>
                        <div className="text-center mb-5">
                            <div className="rounded-circle bg-primary-subtle text-primary d-center mb-4 mx-auto fw-black" style={{ width: '120px', height: '120px', fontSize: '3rem' }}>
                                {data.name[0]}
                            </div>
                            <h2 className="fw-black mb-1">{data.name}</h2>
                            <p className="text-muted text-uppercase small fw-bold mb-4" style={{ letterSpacing: '2px' }}>Ziffcode Elite Professional</p>
                            <div className="d-flex justify-content-center gap-3">
                                {data.socials.linkedin && <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="fs-4 text-primary"><i className="bi bi-linkedin"></i></a>}
                                {data.socials.github && <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="fs-4 text-dark"><i className="bi bi-github"></i></a>}
                                {data.socials.twitter && <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" className="fs-4 text-info"><i className="bi bi-twitter-x"></i></a>}
                            </div>
                        </div>
                        <div className="mb-5 pb-4 border-bottom">
                            <h6 className="fw-black text-uppercase text-muted small mb-3">Professional Bio</h6>
                            <p className="text-dark small lh-lg mb-0">{data.bio || "This professional is currently refining their career statement."}</p>
                        </div>
                        <div className="skills-overview">
                            <h6 className="fw-black text-uppercase text-muted small mb-3">Core Proficiency</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {Object.keys(data.skills || {}).map(s => (
                                    <span key={s} className="badge bg-light text-primary px-3 py-2 rounded-pill fw-bold border border-primary-subtle text-capitalize">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="ps-lg-4 pt-4">
                        <section className="mb-5">
                            <h3 className="fw-black mb-4 d-flex align-items-center">
                                <i className="bi bi-patch-check-fill me-3 text-primary"></i> Academic Credentials
                            </h3>
                            <div className="row g-4">
                                {data.certificates.map(cert => (
                                    <div key={cert.id} className="col-md-12">
                                        <div className="card shadow-sm border-0 rounded-4 p-4 bg-white hover-lift border-start border-5 border-success">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="fw-bold mb-1">{cert.course_title}</h5>
                                                    <p className="small text-muted mb-0">Certified on {new Date(cert.issued_at).toLocaleDateString()}</p>
                                                </div>
                                                <i className="bi bi-award fs-2 text-success opacity-50"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-5">
                            <h3 className="fw-black mb-4 d-flex align-items-center">
                                <i className="bi bi-rocket-takeoff-fill me-3 text-primary"></i> Strategic Projects
                            </h3>
                            <div className="row g-4">
                                {data.projects.filter(p => p.status === 'production_ready' || p.status === 'testing').map(p => (
                                    <div key={p.id} className="col-md-6">
                                        <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100 bg-white hover-lift">
                                            <div className="card-body p-4">
                                                <h5 className="fw-bold mb-2">{p.title}</h5>
                                                <p className="small text-muted mb-4 lh-base" style={{ height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="badge bg-primary rounded-pill px-3 py-1 fw-bold small text-uppercase">{p.status.replace('_', ' ')}</span>
                                                    <a href={p.repo_url} className="text-primary fw-bold text-decoration-none small">Source <i className="bi bi-arrow-right"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="alert bg-primary bg-opacity-10 border-0 rounded-4 p-4 mt-5 text-center border-start border-4 border-primary">
                            <h5 className="fw-bold text-primary mb-2">Verified Professional Credentials</h5>
                            <p className="small text-muted mb-0">This portfolio is verified by Ziffcode Technologies Limited. The strategic achievements displayed are guaranteed by our lead technical architects.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerPortfolio;
