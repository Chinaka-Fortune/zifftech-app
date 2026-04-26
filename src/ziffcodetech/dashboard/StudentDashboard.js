import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import StudentView from './StudentView';
import GlobalHub from './GlobalHub';
import MessagingHub from './MessagingHub';
import ActivityFeed from './ActivityFeed';
import AccountSettings from './AccountSettings';
import { showError, showSuccess, showConfirm } from '../../utils/sweetAlert';
import { currencies } from '../../utils/currencies';

const StudentDashboard = () => {
    const [user, setUser] = useState({ 
        id: null, name: "Student", email: "", points: 0, streak: 0, 
        bio: "", activity_logs: [], skills: {}, projects: [], 
        certificates: [], public_profile: false,
        socials: { linkedin: "", github: "", twitter: "", whatsapp: "", instagram: "" },
        notifications: { email: true, whatsapp: false }
    });
    const [activeTab, setActiveTab] = useState('coding'); // 'coding', 'hub', 'messages', 'settings'
    const [enrollments, setEnrollments] = useState([]);
    const [notes, setNotes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Modal States
    const [activeModal, setActiveModal] = useState(null); // 'note', 'project', 'mentor', 'payment'
    const [modalData, setModalData] = useState({ title: '', content: '', courseId: null });
    const [suggestedCurrency, setSuggestedCurrency] = useState('USD');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [selectedGateway, setSelectedGateway] = useState('paystack');
    const [currencySearch, setCurrencySearch] = useState('');

    const navigate = useNavigate();

    const fetchDashboard = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/enrollments/dashboard');
            const { user: userData, enrollments, notes, projects, certificates } = response.data;
            
            setUser({ ...userData, certificates, projects });
            setEnrollments(enrollments);
            setNotes(notes);
            setProjects(projects);
        } catch (err) {
            if (err.response?.status === 401) navigate('/logIn');
            console.error("Failed to load dashboard", err);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchDashboard();
        // Fetch suggested currency based on IP
        const fetchCurrency = async () => {
            try {
                const res = await axiosInstance.get('/payments/suggested-currency');
                setSuggestedCurrency(res.data.currency);
                setSelectedCurrency(res.data.currency);
            } catch (err) { console.error("Currency detection failed", err); }
        };
        fetchCurrency();
    }, [fetchDashboard]);

    const handleAddNote = async (content) => {
        try {
            const courseId = enrollments[0]?.course_id;
            if (!courseId) return showError("Action Denied", "You must be enrolled in a course to add notes.");
            const res = await axiosInstance.post('/notes/', { content, course_id: courseId });
            setNotes(prev => [res.data.note, ...prev]);
            setActiveModal(null);
            setModalData({ title: '', content: '' });
        } catch (err) { showError("Error", "Failed to save note"); }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await axiosInstance.delete(`/notes/${noteId}`);
            setNotes(prev => prev.filter(n => n.id !== noteId));
        } catch (err) { showError("Error", "Failed to delete note"); }
    };

    const handleUpdateProject = async (projectId, status) => {
        try {
            const res = await axiosInstance.patch(`/projects/${projectId}`, { status });
            setProjects(prev => prev.map(p => p.id === projectId ? res.data.project : p));
        } catch (err) { showError("Error", "Failed to update project status"); }
    };

    const handleAddProject = async () => {
        if (!modalData.title.trim()) return;
        try {
            const res = await axiosInstance.post('/projects/', { title: modalData.title, description: "A new student project." });
            setProjects(prev => [...prev, res.data.project]);
            setActiveModal(null);
            setModalData({ title: '', content: '' });
        } catch (err) { showError("Error", "Failed to create project"); }
    };

    const handleDeleteProject = async (id) => {
        const confirmed = await showConfirm("Delete Project?", "Are you sure you want to delete this project?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/projects/${id}`);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) { showError("Error", "Failed to delete project"); }
    };



    const getAvatarURL = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:5000${path}`;
    };

    const handleUnenroll = async (enrollmentId) => {
        const confirmed = await showConfirm("Drop Course?", "Are you sure you want to unenroll from this course?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/enrollments/${enrollmentId}`);
            setEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
            showSuccess("Success", "Course dropped successfully.");
        } catch (err) {
            showError("Action Failed", err.response?.data?.message || err.message);
        }
    };

    const handlePayment = async (courseId) => {
        setModalData({ ...modalData, courseId });
        setActiveModal('payment');
    };

    const executePayment = async () => {
        try {
            const res = await axiosInstance.post('/payments/checkout', {
                course_id: modalData.courseId,
                gateway: selectedGateway,
                currency: selectedCurrency
            });
            if (res.data.checkout_url) {
                window.location.href = res.data.checkout_url;
            }
        } catch (err) {
            showError("Checkout Failed", err.response?.data?.message || err.message);
        }
    };

    if (loading) return (
        <div className="text-center min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="spinner-border" style={{ color: "var(--primary-color)" }} role="status"></div>
        </div>
    );

    const filteredEnrollments = enrollments.filter(enr => 
        enr.course_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lastEnrollment = enrollments.find(e => e.payment_status === 'paid') || enrollments[0];

    return (
        <div className="container-fluid" style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
            <style>
                {`
                .ziff-switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 26px;
                    vertical-align: middle;
                }
                .ziff-switch input { opacity: 0; width: 0; height: 0; }
                .ziff-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-color: #475569;
                    transition: .4s;
                    border-radius: 34px;
                    border: 2px solid #1e293b;
                }
                .ziff-slider:before {
                    position: absolute;
                    content: "";
                    height: 18px; width: 18px;
                    left: 2px; bottom: 2px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .ziff-slider {
                    background-color: #4069b3;
                    border-color: #4069b3;
                }
                input:checked + .ziff-slider:before {
                    transform: translateX(24px);
                }
                `}
            </style>
            
            <div className="row g-0" style={{ minHeight: 'calc(100vh - 75px)', marginTop: '75px' }}>
                {/* Left Sidebar Menu */}
                <div className="col-md-2 d-none d-md-block bg-white shadow-sm p-4 pt-5" 
                     style={{ 
                         height: 'calc(100vh - 75px)', 
                         position: 'sticky', 
                         top: '75px', 
                         zIndex: 1000
                     }}>
                    <h6 className="text-uppercase text-muted fw-bold mb-4 mt-2" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>My Dashboard</h6>
                    <ul className="nav flex-column gap-2 mb-5">
                        <li className="nav-item">
                            <button className="nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3" 
                                    style={{ backgroundColor: activeTab === 'coding' ? "var(--primary-light)" : "transparent", color: activeTab === 'coding' ? "var(--primary-dark)" : "var(--text-muted)" }} 
                                    onClick={() => setActiveTab('coding')}>
                                💻 Coding Hub
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3" 
                                    style={{ backgroundColor: activeTab === 'hub' ? "var(--primary-light)" : "transparent", color: activeTab === 'hub' ? "var(--primary-dark)" : "var(--text-muted)" }} 
                                    onClick={() => setActiveTab('hub')}>
                                🏛️ Community Hub
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3" 
                                    style={{ backgroundColor: activeTab === 'messages' ? "var(--primary-light)" : "transparent", color: activeTab === 'messages' ? "var(--primary-dark)" : "var(--text-muted)" }} 
                                    onClick={() => setActiveTab('messages')}>
                                ✉️ Messaging
                            </button>
                        </li>
                    </ul>
                    <h6 className="text-uppercase text-muted fw-bold mb-4 mt-2" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Account</h6>
                    <ul className="nav flex-column gap-2">
                        <li className="nav-item">
                            <button className="nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3" 
                                    style={{ backgroundColor: activeTab === 'settings' ? "var(--primary-light)" : "transparent", color: activeTab === 'settings' ? "var(--primary-dark)" : "var(--text-muted)" }} 
                                    onClick={() => setActiveTab('settings')}>
                                ⚙️ Settings
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link border-0 text-start w-100 text-danger fw-bold px-3 py-2 hover-bg-light rounded-3" 
                                    onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>
                                🚪 Log Out
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="col-md-10 p-4 p-md-5 bg-light" style={{ paddingBottom: '150px' }}>
                    <div className="mb-5 d-flex justify-content-between align-items-center">
                        <div className="input-group bg-white rounded-pill shadow-sm px-3 py-1" style={{ maxWidth: '400px' }}>
                            <span className="input-group-text border-0 bg-transparent text-muted"><i className="bi bi-search"></i></span>
                            <input 
                                type="text" 
                                className="form-control border shadow-none" 
                                placeholder="Search courses, lessons, notes..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="d-flex align-items-center gap-3 p-1 rounded-pill transition-all">
                             <div className="text-end d-none d-lg-block">
                                <h6 className="fw-bold mb-0 text-dark">{user.name}</h6>
                                <small className="text-primary text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                                    {lastEnrollment ? lastEnrollment.course_title : 'General Member'}
                                </small>
                             </div>
                             <div className="cursor-pointer transition-all hover-scale" 
                                  onClick={() => setActiveTab('settings')}>
                                {user.avatar_url ? (
                                    <img src={getAvatarURL(user.avatar_url)} alt="Profile" className="rounded-circle shadow-sm border border-2 border-white hover-border-primary" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
                                ) : (
                                    <div className="rounded-circle bg-primary text-white d-center fw-bold shadow-sm hover-bg-dark" style={{ width: '45px', height: '45px' }}>{user.name?.[0]}</div>
                                )}
                             </div>
                        </div>
                    </div>

                    {activeTab === 'settings' && (
                        <AccountSettings user={user} setUser={setUser} />
                    )}

                    {activeTab === 'coding' && (
                        <StudentView 
                            user={user}
                            enrollments={enrollments}
                            lastEnrollment={lastEnrollment}
                            notes={notes}
                            projects={projects}
                            searchQuery={searchQuery}
                            navigate={navigate}
                            handlePayment={handlePayment}
                            handleUpdateProject={handleUpdateProject}
                            handleDeleteProject={handleDeleteProject}
                            handleDeleteNote={handleDeleteNote}
                            handleUnenroll={handleUnenroll}
                            setActiveModal={setActiveModal}
                        />
                    )}

                    {activeTab === 'hub' && <GlobalHub />}
                    {activeTab === 'messages' && <MessagingHub user={user} />}
                </div>
            </div>

            {/* UNIVERSAL DASHBOARD MODALS */}
            {activeModal && (
                <div className="d-flex justify-content-center align-items-center p-3 text-dark" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 1060 }}>
                    <div className="rounded-4 p-5 fade-in-up border-0 bg-white" style={{ maxWidth: '850px', width: '100%', boxShadow: '0 10px 50px rgba(0,0,0,0.15)' }}>
                        {activeModal === 'note' && (
                            <>
                                <h2 className="fw-black mb-4 text-dark d-flex align-items-center">
                                    <i className="bi bi-pencil-square me-3 text-primary"></i> Capture Insight
                                </h2>
                                <p className="text-secondary mb-4 fs-5">Identify and record strategic takeaways to accelerate your proficiency.</p>
                                <textarea 
                                    className="form-control rounded-4 p-4 mb-4 shadow-sm" 
                                    rows="7" 
                                    style={{ backgroundColor: '#f8f9fa', color: '#212529', fontSize: '1.1rem', border: '1px solid #dee2e6' }}
                                    placeholder="Draft your strategic technical insights here..."
                                    value={modalData.content}
                                    onChange={(e) => setModalData({...modalData, content: e.target.value})}
                                ></textarea>
                                <div className="d-flex gap-3 mt-2">
                                    <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg flex-grow-1" onClick={() => handleAddNote(modalData.content)}>Save Insight</button>
                                    <button className="btn btn-outline-secondary btn-lg rounded-pill px-5 py-3 fw-bold" onClick={() => setActiveModal(null)}>Cancel</button>
                                </div>
                            </>
                        )}

                        {activeModal === 'project' && (
                            <>
                                <h2 className="fw-black mb-4 text-dark d-flex align-items-center">
                                    <i className="bi bi-rocket-takeoff me-3 text-primary"></i> New Project Initiative
                                </h2>
                                <p className="text-secondary mb-4 fs-5">Formulate the architecture and primary objectives for your next build.</p>
                                <div className="mb-5">
                                    <label className="form-label fw-bold text-uppercase small text-primary mb-2" style={{ letterSpacing: '1px' }}>Initiative Title</label>
                                    <input 
                                        className="form-control rounded-pill px-4 py-3 shadow-sm" 
                                        style={{ backgroundColor: '#f8f9fa', color: '#212529', fontSize: '1.2rem', border: '1px solid #dee2e6' }}
                                        placeholder="Enter the name of your new masterwork..."
                                        value={modalData.title}
                                        onChange={(e) => setModalData({...modalData, title: e.target.value})}
                                    />
                                </div>
                                <div className="d-flex gap-3 mt-4">
                                    <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg flex-grow-1" onClick={handleAddProject}>Launch Project</button>
                                    <button className="btn btn-outline-secondary btn-lg rounded-pill px-5 py-3 fw-bold" onClick={() => setActiveModal(null)}>Cancel</button>
                                </div>
                            </>
                        )}

                        {activeModal === 'payment' && (
                            <>
                                <h2 className="fw-black mb-4 text-dark d-flex align-items-center">
                                    <i className="bi bi-credit-card-2-front me-3 text-primary"></i> Secure Enrollment
                                </h2>
                                <p className="text-secondary mb-5 fs-5">Choose your preferred payment infrastructure and currency. We support global and local transitions.</p>
                                
                                <div className="row g-4 mb-5">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-primary mb-2" style={{ letterSpacing: '1px' }}>Preferred Gateway</label>
                                        <div className="d-flex flex-column gap-2">
                                            {[
                                                { id: 'paystack', name: 'Paystack (NGA/GHA/ZAF)', icon: '💸' },
                                                { id: 'flutterwave', name: 'Flutterwave (Global/Africa)', icon: '🌍' },
                                                { id: 'stripe', name: 'Stripe (Global Card)', icon: '💳' }
                                            ].map(gw => (
                                                <button 
                                                    key={gw.id}
                                                    className={`btn p-3 text-start rounded-4 border-2 transition-all d-flex align-items-center justify-content-between ${selectedGateway === gw.id ? 'border-primary bg-primary bg-opacity-10' : 'border-light bg-light hover-bg-white'}`}
                                                    onClick={() => setSelectedGateway(gw.id)}
                                                >
                                                    <span className="fw-bold">{gw.icon} {gw.name}</span>
                                                    {selectedGateway === gw.id && <i className="bi bi-check-circle-fill text-primary"></i>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-primary mb-2" style={{ letterSpacing: '1px' }}>Currency Option</label>
                                        
                                        <div className="input-group mb-2 shadow-sm rounded-4 overflow-hidden border border-light">
                                            <span className="input-group-text bg-white border-0 text-muted"><i className="bi bi-search"></i></span>
                                            <input 
                                                type="text" 
                                                className="form-control border-0 py-2 fs-6 shadow-none" 
                                                placeholder="Search all global currencies..." 
                                                value={currencySearch}
                                                onChange={(e) => setCurrencySearch(e.target.value)}
                                            />
                                        </div>

                                        <div className="d-flex flex-column gap-1 overflow-auto pe-1" style={{ maxHeight: '250px', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '8px', backgroundColor: '#fafbfc' }}>
                                            {currencies
                                                .filter(c => 
                                                    c.code.toLowerCase().includes(currencySearch.toLowerCase()) || 
                                                    c.name.toLowerCase().includes(currencySearch.toLowerCase())
                                                )
                                                .sort((a, b) => {
                                                    if (a.code === suggestedCurrency) return -1;
                                                    if (b.code === suggestedCurrency) return 1;
                                                    return 0;
                                                })
                                                .map(curr => (
                                                <button 
                                                    key={curr.code}
                                                    className={`btn px-3 py-2 rounded-3 text-start border-0 transition-all d-flex align-items-center justify-content-between ${selectedCurrency === curr.code ? 'bg-primary text-white shadow-sm' : 'hover-bg-white text-dark'}`}
                                                    onClick={() => setSelectedCurrency(curr.code)}
                                                >
                                                    <div className="d-flex align-items-center gap-3">
                                                        <span className="fw-black fs-5" style={{ minWidth: '45px', opacity: selectedCurrency === curr.code ? 1 : 0.7 }}>{curr.code}</span>
                                                        <span className="small fw-bold opacity-75 d-none d-lg-inline">{curr.name}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        {curr.code === suggestedCurrency && <span className={`badge rounded-pill ${selectedCurrency === curr.code ? 'bg-white text-primary' : 'bg-danger text-white'}`} style={{ fontSize: '0.6rem' }}>LOCAL</span>}
                                                        <span className="fw-bold">{curr.symbol}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <p className="small text-muted mt-3 mb-0">
                                            <i className="bi bi-info-circle me-1"></i> Based on your connect, we recommend <b>{suggestedCurrency}</b>.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mt-4">
                                    <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg flex-grow-1" onClick={executePayment}>
                                        Confirm & Pay Now
                                    </button>
                                    <button className="btn btn-outline-secondary btn-lg rounded-pill px-5 py-3 fw-bold" onClick={() => setActiveModal(null)}>Cancel</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
