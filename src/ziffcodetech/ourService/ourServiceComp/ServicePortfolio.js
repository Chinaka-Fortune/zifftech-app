import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import serviceProjects from '../serviceProjectData';
import SEO from '../../../components/SEO';

const ServicePortfolio = () => {
    const { serviceSlug } = useParams();
    const navigate = useNavigate();
    const serviceData = serviceProjects[serviceSlug];

    if (!serviceData) {
        return (
            <div className="container py-5 mt-5 text-center min-vh-100 d-center flex-column">
                <h2 className="fw-black text-primary mb-3">Service Strategy Information Unavailable</h2>
                <p className="text-muted mb-5">Our architects are currently documenting the project history for this domain.</p>
                <Link to="/ourService" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm">Return to Services</Link>
            </div>
        );
    }

    return (
        <div className="bg-white" style={{ minHeight: '100vh', marginTop: '75px' }}>
            <SEO 
                title={`${serviceData.heroText} | Ziffcode Technical Portfolio`}
                description={serviceData.description}
                keywords={`${serviceSlug}, software engineering portfolio, Ziffcode ${serviceData.heroText}, tech delivery`}
            />
            {/* Hero Section */}
            <div className="py-5" style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, #061a3d 100%)' }}>
                <div className="container py-5 text-center text-white">
                    <div className="badge bg-secondary mb-3 px-3 py-2 rounded-pill fw-bold text-uppercase" style={{ letterSpacing: '2px', fontSize: '0.75rem' }}>
                        Platform Service Portfolio
                    </div>
                    <h1 className="display-3 fw-black mb-3" style={{ letterSpacing: '-2px' }}>{serviceData.heroText}</h1>
                    <p className="fs-5 opacity-75 mx-auto mb-0" style={{ maxWidth: '800px' }}>{serviceData.description}</p>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="container py-5 my-5">
                <div className="d-flex align-items-center mb-5 ps-3 border-start border-4 border-secondary">
                    <h2 className="fw-black m-0" style={{ color: 'var(--primary-dark)' }}>Flagship Projects & Technical Delivery</h2>
                </div>

                <div className="row g-4">
                    {serviceData.projects.map((project, idx) => (
                        <div key={project.id} className="col-lg-6">
                            <div className="card h-100 border-0 rounded-4 overflow-hidden position-relative hover-lift transition-all" 
                                 style={{ 
                                     backgroundColor: '#ffffff', 
                                     boxShadow: "0 10px 35px -12px rgba(0,0,0,0.1)",
                                     borderTop: `5px solid ${idx % 2 === 0 ? "var(--primary-color)" : "var(--secondary-color)"}`,
                                     borderBottom: "2px solid var(--primary-color) !important"
                                 }}>
                                <div className="card-body p-5">
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div>
                                            <h6 className="text-primary fw-bold text-uppercase small mb-1" style={{ letterSpacing: '1px' }}>{project.client}</h6>
                                            <h3 className="fw-black text-dark mb-0">{project.title}</h3>
                                        </div>
                                        <div className="rounded-circle bg-light d-center" style={{ width: '45px', height: '45px' }}>
                                            <i className="bi bi-box-arrow-up-right text-muted"></i>
                                        </div>
                                    </div>
                                    
                                    <p className="text-muted mb-4 lh-lg" style={{ fontSize: '1.05rem' }}>{project.description}</p>
                                    
                                    <div className="mb-4 d-flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '0.75rem' }}>{t}</span>
                                        ))}
                                    </div>

                                    <div className="p-4 rounded-3 border-start border-4 border-success bg-success bg-opacity-10 mt-auto">
                                        <h6 className="fw-bold text-success mb-1 small text-uppercase">Direct Strategic Result:</h6>
                                        <p className="text-dark fw-bold mb-0">{project.result}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Tech Team Section */}
                <div className="mt-5 py-5 px-4 text-center">
                    <div className="card border-0 rounded-4 shadow-lg overflow-hidden p-5 bg-white mx-auto shadow-tactical" style={{ maxWidth: '900px', borderTop: '5px solid var(--secondary-color) !important' }}>
                        <h2 className="fw-black mb-3" style={{ color: 'var(--primary-dark)' }}>Ready to Initiate Your Strategic Project?</h2>
                        <p className="text-muted fs-5 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                            Our elite technical team is standing by to translate your business objectives into robust digital infrastructure.
                        </p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                            <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm" onClick={() => navigate('/contact')}>
                                Contact Ziffcode Tech Team <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                            <button className="btn btn-outline-dark btn-lg rounded-pill px-5 py-3 fw-bold" onClick={() => navigate('/ourService')}>
                                Explore Other Services
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                {`
                .shadow-tactical {
                    box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.15);
                }
                .hover-lift:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.2) !important;
                }
                `}
            </style>
        </div>
    );
};

export default ServicePortfolio;
