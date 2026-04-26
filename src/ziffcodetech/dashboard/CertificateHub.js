import React, { useState } from 'react';

const CertificateHub = ({ certificates = [], user = {} }) => {
    const [viewCert, setViewCert] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(""), 3500);
    };

    const handleShare = async (cert) => {
        const shareUrl = `${window.location.origin}/portfolio/${user.id || 'guest'}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Ziffcode Certificate',
                    text: `I just earned a certificate in ${cert.course_title} from Ziffcode Academy! Check out my portfolio.`,
                    url: shareUrl
                });
            } catch (err) {
                console.log("Share failed or cancelled");
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            showToast("Certificate portfolio link copied to clipboard!");
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white h-100">
            <h5 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-patch-check-fill me-2 text-warning"></i> My Certificates
            </h5>
            
            {certificates.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-4 border border-dashed text-muted">
                    <i className="bi bi-award fs-2 mb-2 d-block"></i>
                    <p className="small mb-0">Complete a course to unlock your first certificate!</p>
                </div>
            ) : (
                <div className="row g-3">
                    {certificates.map((cert) => (
                        <div className="col-12" key={cert.id}>
                            <div className="p-3 rounded-4 border bg-light d-flex align-items-center gap-3 hover-lift">
                                <div className="fs-1">📜</div>
                                <div className="flex-grow-1">
                                    <h6 className="fw-bold mb-1" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{cert.course_title}</h6>
                                    <p className="small text-muted mb-2">Issued: {cert.issue_date?.split('T')[0]}</p>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary btn-sm rounded-pill px-3 fw-bold" onClick={() => setViewCert(cert)}>View Certificate</button>
                                        <button className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-bold" onClick={() => handleShare(cert)}>Share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            
            <div className="mt-4 pt-4 border-top mt-auto">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h6 className="fw-bold mb-0">Public Portfolio URL</h6>
                        <small className="text-muted">{user?.id ? `${window.location.origin}/portfolio/${user.id}` : 'Pending Profile Setup'}</small>
                    </div>
                    {user?.public_profile ? (
                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold shadow-sm" onClick={() => {
                            if (!user?.id) return;
                            navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user.id}`);
                            showToast("Portfolio link copied to clipboard!");
                        }}>Copy Link</button>
                    ) : (
                        <span className="badge bg-secondary rounded-pill px-3 py-2 fw-bold text-uppercase"><i className="bi bi-lock-fill"></i> Private</span>
                    )}
                </div>
            </div>

            {/* Display Certificate Modal */}
            {viewCert && (
                <div className="d-flex justify-content-center align-items-center p-4 text-dark" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1100, overflowY: 'auto' }}>
                    <div className="position-relative bg-white p-2 p-md-4 text-center shadow-lg my-auto" style={{ maxWidth: '900px', width: '100%', border: '12px solid #0f172a', borderRadius: '4px' }}>
                        <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => setViewCert(null)} style={{ zIndex: 2 }}></button>
                        
                        <div className="p-4 p-md-5 border" style={{ borderColor: '#eab308', borderWidth: '4px', borderStyle: 'double' }}>
                            <div className="mb-4">
                                <h1 className="fw-black text-uppercase mb-0" style={{ color: '#0f172a', letterSpacing: '4px', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>Ziffcode Academy</h1>
                                <p className="text-warning fw-bold mb-0 ls-1">Elite Technology Training</p>
                            </div>
                            
                            <h2 className="fw-bold my-4 my-md-5" style={{ color: '#1e293b', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'Georgia, serif' }}>Certificate of Completion</h2>
                            
                            <p className="fs-5 text-muted mb-2">This is to certify that</p>
                            <h3 className="fw-bold mb-4 border-bottom pb-2 d-inline-block px-4 px-md-5" style={{ color: '#0f172a', fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', fontFamily: 'cursive' }}>
                                {user.name || 'Dedicated Student'}
                            </h3>
                            
                            <p className="fs-5 text-muted mb-2">has successfully completed the intensive curriculum for</p>
                            <h4 className="fw-bold mb-5" style={{ color: '#2563eb', fontSize: 'clamp(1.2rem, 2vw, 2rem)' }}>{viewCert.course_title}</h4>
                            
                            <div className="d-flex flex-wrap justify-content-between align-items-end mt-5 pt-3 gap-4">
                                <div className="text-center border-top pt-2 px-3" style={{ borderColor: '#0f172a' }}>
                                    <h5 className="fw-bold mb-0" style={{ color: '#0f172a' }}>{viewCert.issue_date?.split('T')[0] || new Date().toISOString().split('T')[0]}</h5>
                                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Date of Issue</small>
                                </div>
                                <div className="text-center px-3">
                                    <div className="fs-1 mb-1">🏅</div>
                                    <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold text-uppercase">Grade: {viewCert.grade || 'A+'}</span>
                                </div>
                                <div className="text-center border-top pt-2 px-3" style={{ borderColor: '#0f172a' }}>
                                    <h4 className="fw-bold mb-0 signature-font" style={{ fontFamily: '"Brush Script MT", cursive', color: '#0f172a' }}>Ziffcode Team</h4>
                                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Lead Instructor</small>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 gap-3 d-flex flex-wrap justify-content-center d-print-none">
                            <button className="btn btn-outline-dark fw-bold rounded-pill px-4 shadow-sm" onClick={() => window.print()}>🖨️ Print / Download</button>
                            <button className="btn btn-primary fw-bold rounded-pill px-4 shadow-sm" onClick={() => handleShare(viewCert)}>📱 Share Externally</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Toast Notification */}
            {toastMessage && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-4 p-3 rounded-pill shadow-lg d-flex align-items-center gap-2 fade-in-up" 
                     style={{ zIndex: 9999, backgroundColor: '#0f172a', color: '#ffffff', border: '1px solid #3b82f6', animation: 'fadeInDown 0.3s ease-out' }}>
                    <i className="bi bi-info-circle-fill text-primary fs-5"></i>
                    <span className="fw-bold px-2">{toastMessage}</span>
                    <button className="btn-close btn-close-white ms-2" style={{ fontSize: '0.6rem' }} onClick={() => setToastMessage("")}></button>
                    
                    <style>{`
                        @keyframes fadeInDown {
                            from { opacity: 0; transform: translate(-50%, -20px); }
                            to { opacity: 1; transform: translate(-50%, 0); }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default CertificateHub;
