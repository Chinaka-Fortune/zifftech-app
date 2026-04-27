import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MessagingHub from './MessagingHub';
import GlobalHub from './GlobalHub';
import ActivityFeed from './ActivityFeed';
import AccountSettings from './AccountSettings';
import SkillProficiency from './SkillProficiency';
import StudentView from './StudentView';
import { showError, showConfirm } from '../../utils/sweetAlert';
import { currencies } from '../../utils/currencies';

const StaffDashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [courses, setCourses] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Student/Customer State Blend
    const [enrollments, setEnrollments] = useState([]);
    const [notes, setNotes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeModal, setActiveModal] = useState(null);
    const [modalData, setModalData] = useState({ title: '', content: '', courseId: null });
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [selectedGateway, setSelectedGateway] = useState('paystack');

    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true);
            const resUser = await axiosInstance.get('/auth/me');
            setUser(resUser.data);

            const role = resUser.data.role;

            // 1. Fetch Managerial Data
            const resStats = await axiosInstance.get('/admin/stats');
            setStats(resStats.data);

            if (['admin', 'super_admin', 'manager', 'director'].includes(role)) {
                const resCourses = await axiosInstance.get('/courses/');
                setCourses(resCourses.data);
            }

            if (['admin', 'team_lead', 'manager', 'admin_staff', 'staff'].includes(role)) {
                const resInquiries = await axiosInstance.get('/contact/');
                setInquiries(resInquiries.data);
            }

            // 2. Fetch Student/Customer Data Blend
            const resStudent = await axiosInstance.get('/enrollments/dashboard');
            setEnrollments(resStudent.data.enrollments);
            setNotes(resStudent.data.notes);
            setProjects(resStudent.data.projects);

            // Fetch currency
            try {
                const resCurr = await axiosInstance.get('/payments/suggested-currency');
                setSelectedCurrency(resCurr.data.currency);
            } catch (currErr) { console.error("Currency error", currErr); }

        } catch (err) {
            console.error("Dashboard fetch error", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError("Access restricted. Please contact system administrator.");
            } else {
                setError("Connectivity issue detected. Please refresh.");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Handlers (Administrative)
    const handleDeleteCourse = async (slug) => {
        const confirmed = await showConfirm("Delete Course?", "Confirm course deletion?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/courses/${slug}`);
            setCourses(prev => prev.filter(c => c.slug !== slug));
        } catch (err) { showError("Error", "Action failed."); }
    };

    const handleDeleteInquiry = async (id) => {
        const confirmed = await showConfirm("Delete Inquiry?", "Confirm inquiry removal?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/contact/${id}`);
            setInquiries(prev => prev.filter(i => i.id !== id));
        } catch (err) { showError("Error", "Action failed."); }
    };

    const handleUpdateInquiry = async (id, status) => {
        try {
            await axiosInstance.put(`/contact/${id}`, { status });
            setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
        } catch (err) { showError("Error", "Status update failed."); }
    };

    // Handlers (Student View Blend)
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
            const res = await axiosInstance.post('/projects/', { title: modalData.title, description: "A new project initiative." });
            setProjects(prev => [...prev, res.data.project]);
            setActiveModal(null);
            setModalData({ title: '', content: '' });
        } catch (err) { showError("Error", "Failed to create project"); }
    };

    const handleDeleteProject = async (id) => {
        const confirmed = await showConfirm("Delete Project?", "Are you sure?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/projects/${id}`);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) { showError("Error", "Failed to delete project"); }
    };

    const handleUnenroll = async (enrollmentId) => {
        const confirmed = await showConfirm("Drop Course?", "Are you sure?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/enrollments/${enrollmentId}`);
            setEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
        } catch (err) { showError("Error", "Failed to drop course"); }
    };

    const handlePayment = (courseId) => {
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
            if (res.data.checkout_url) window.location.href = res.data.checkout_url;
        } catch (err) { showError("Checkout Failed", err.message); }
    };

    const getAvatarURL = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:5000${path}`;
    };

    if (error) {
        return (
            <div className="container mt-5 pt-5 text-center fade-in-up">
                <div className="alert alert-danger p-5 rounded-4 shadow-sm border-0">
                    <h2 className="fw-black mb-3">Restricted Area</h2>
                    <p className="fs-5 mb-4">{error}</p>
                    <button className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow-sm" onClick={() => navigate('/')}>Exit to Safety</button>
                </div>
            </div>
        );
    }

    if (loading || !user) return (
        <div className="text-center min-vh-100 d-flex justify-content-center align-items-center bg-white">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );

    const isCEO = ['director', 'super_admin'].includes(user.role);
    const isManager = ['manager', 'admin'].includes(user.role);
    const isTeamLead = ['team_lead'].includes(user.role);
    const isAdminStaff = ['admin_staff', 'staff'].includes(user.role);
    const lastEnrollment = enrollments.find(e => e.payment_status === 'paid') || enrollments[0];

    return (
        <div className="container-fluid" style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
            <div className="row g-0" style={{ minHeight: 'calc(100vh - 75px)', marginTop: '75px' }}>
                {/* Left Sidebar Menu */}
                <div className="col-md-2 d-none d-md-block bg-white shadow-sm p-4 pt-5" 
                     style={{ height: 'calc(100vh - 75px)', position: 'sticky', top: '75px', zIndex: 1000, backgroundColor: 'var(--primary-dark) !important', color: 'white' }}>
                    
                    <h6 className="text-uppercase text-white opacity-50 fw-bold mb-4 mt-2" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Management Console</h6>
                    <ul className="nav flex-column gap-2 mb-5">
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'overview' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('overview')}>📊 Overview</button>
                        </li>
                        {(isCEO || isManager) && (
                            <li className="nav-item">
                                <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'catalog' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                        onClick={() => setActiveTab('catalog')}>📚 Course Catalog</button>
                            </li>
                        )}
                        {(isCEO || isManager || isTeamLead || isAdminStaff) && (
                            <li className="nav-item">
                                <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'leads' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                        onClick={() => setActiveTab('leads')}>👥 Student Leads</button>
                            </li>
                        )}
                    </ul>

                    <h6 className="text-uppercase text-white opacity-50 fw-bold mb-4 mt-2" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Student Experience</h6>
                    <ul className="nav flex-column gap-2 mb-5">
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'coding' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('coding')}>💻 Coding Hub</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'hub' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('hub')}>🏛️ Community Hub</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'inbox' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('inbox')}>✉️ Staff Inbox</button>
                        </li>
                    </ul>

                    <h6 className="text-uppercase text-white opacity-50 fw-bold mb-4 mt-2" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Account</h6>
                    <ul className="nav flex-column gap-2">
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'settings' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('settings')}>⚙️ Settings</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link border-0 text-start w-100 text-danger fw-bold px-3 py-2 hover-bg-light rounded-3" 
                                    onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>🚪 Log Out</button>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="col-md-10 p-4 p-md-5 bg-light" style={{ paddingBottom: '250px' }}>
                    {/* Top Bar */}
                    <div className="mb-5 d-flex justify-content-between align-items-center">
                        <div className="input-group bg-white rounded-pill shadow-sm px-3 py-1" style={{ maxWidth: '400px' }}>
                            <span className="input-group-text border-0 bg-transparent text-muted"><i className="bi bi-search"></i></span>
                            <input 
                                type="text" 
                                className="form-control border-0 shadow-none" 
                                placeholder="Search platform resources..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="d-flex align-items-center gap-3">
                             <div className="text-end d-none d-lg-block">
                                <h6 className="fw-bold mb-0 text-dark">{user.name}</h6>
                                <small className="text-primary text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>{user.role.replace('_', ' ')}</small>
                             </div>
                             <div className="cursor-pointer" onClick={() => setActiveTab('settings')}>
                                {user.avatar_url ? (
                                    <img src={getAvatarURL(user.avatar_url)} alt="Profile" className="rounded-circle shadow-sm border border-2 border-white" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
                                ) : (
                                    <div className="rounded-circle bg-primary text-white d-center fw-bold shadow-sm" style={{ width: '45px', height: '45px' }}>{user.name?.[0]}</div>
                                )}
                             </div>
                        </div>
                    </div>

                    {activeTab === 'overview' && (
                        <div className="fade-in-up">
                            <div className="row g-4 mb-5">
                                <div className="col-md-3">
                                    <div className="p-4 rounded-4 shadow-sm bg-white border-bottom border-4" style={{ borderColor: "var(--primary-color) !important" }}>
                                        <h6 className="text-muted small fw-bold text-uppercase">Platform Users</h6>
                                        <h2 className="fw-black mb-0">{stats?.total_users}</h2>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-4 rounded-4 shadow-sm bg-white border-bottom border-4" style={{ borderColor: "var(--secondary-color) !important" }}>
                                        <h6 className="text-muted small fw-bold text-uppercase">Active Courses</h6>
                                        <h2 className="fw-black mb-0">{stats?.total_courses}</h2>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-4 rounded-4 shadow-sm bg-white border-bottom border-4" style={{ borderColor: "var(--primary-color) !important" }}>
                                        <h6 className="text-muted small fw-bold text-uppercase">Enrollments</h6>
                                        <h2 className="fw-black mb-0">{stats?.total_enrollments}</h2>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-4 rounded-4 shadow-sm text-white border-0" style={{ background: "linear-gradient(135deg, var(--primary-dark), var(--primary-color))" }}>
                                        <h6 className="small fw-bold text-uppercase opacity-75">Health</h6>
                                        <h2 className="fw-black mb-0">OPTIMAL</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4 mb-5">
                                <div className="col-lg-8">
                                    <ActivityFeed activityLogs={user.activity_logs || []} title="Strategic Activity Log" />
                                </div>
                                <div className="col-lg-4">
                                    <SkillProficiency skills={user.skills || {}} title="Operational Proficiency" />
                                    <div className="p-4 rounded-4 bg-primary text-white shadow-sm mt-4">
                                        <h5 className="fw-black mb-4">Quick Actions</h5>
                                        <button className="btn btn-light w-100 mb-3 fw-bold rounded-pill py-2 text-dark" onClick={() => setActiveTab('leads')}>View All Leads</button>
                                        <button className="btn btn-outline-light w-100 fw-bold rounded-pill py-2 text-white" onClick={() => navigate('/training')}>Add Course</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'catalog' && (
                        <div className="bg-white rounded-4 shadow-sm border overflow-hidden fade-in-up">
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
                                <h5 className="fw-bold mb-0">Academic Catalog</h5>
                                <button className="btn btn-primary rounded-pill px-4 fw-bold" onClick={() => navigate('/training')}>Create Course</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="px-4 py-3 border-0 text-muted small fw-bold">Identification</th>
                                            <th className="py-3 border-0 text-muted small fw-bold">Classification</th>
                                            <th className="py-3 border-0 text-muted small fw-bold text-center">Valuation</th>
                                            <th className="px-4 py-3 border-0 text-muted small fw-bold text-end">Control</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map(course => (
                                            <tr key={course.id}>
                                                <td className="px-4 py-3 fw-bold">{course.title}</td>
                                                <td className="py-3">{course.category}</td>
                                                <td className="py-3 text-center fw-bold text-success">${course.price}</td>
                                                <td className="px-4 py-3 text-end">
                                                    <button className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold" onClick={() => handleDeleteCourse(course.slug)}>Purge</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'leads' && (
                        <div className="bg-white rounded-4 shadow-sm border overflow-hidden fade-in-up">
                            <div className="p-4 border-bottom bg-light">
                                <h5 className="fw-bold mb-0">Student Intake Queue</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="px-4 py-3 border-0 text-muted small fw-bold">Originator</th>
                                            <th className="py-3 border-0 text-muted small fw-bold">Content Fragment</th>
                                            <th className="py-3 border-0 text-muted small fw-bold">Lifecycle State</th>
                                            <th className="px-4 py-3 border-0 text-muted small fw-bold text-end">Control</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inquiries.map(inq => (
                                            <tr key={inq.id}>
                                                <td className="px-4 py-3">
                                                    <div className="fw-bold">{inq.name}</div>
                                                    <div className="small text-muted">{inq.email}</div>
                                                </td>
                                                <td className="py-3" style={{ maxWidth: '300px' }}>
                                                    <div className="text-truncate">{inq.message}</div>
                                                </td>
                                                <td className="py-3">
                                                    <select 
                                                        className={`form-select form-select-sm border-0 rounded-pill px-3 fw-bold ${inq.status === 'Resolved' ? 'bg-success text-white' : 'bg-warning text-dark'}`}
                                                        value={inq.status}
                                                        onChange={(e) => handleUpdateInquiry(inq.id, e.target.value)}
                                                    >
                                                        <option value="New">NEW DISPATCH</option>
                                                        <option value="Pending">IN PROGRESS</option>
                                                        <option value="Resolved">RESOLVED</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-3 text-end">
                                                    <button className="btn btn-link text-danger p-0" onClick={() => handleDeleteInquiry(inq.id)}><i className="bi bi-trash3-fill"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
                    {activeTab === 'inbox' && <MessagingHub user={user} />}
                    {activeTab === 'settings' && <AccountSettings user={user} setUser={setUser} />}
                </div>
            </div>

            {/* UNIVERSAL DASHBOARD MODALS (Blended from Student View) */}
            {activeModal && (
                <div className="d-flex justify-content-center align-items-center p-3 text-dark" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 1060 }}>
                    <div className="rounded-4 p-5 fade-in-up border-0 bg-white" style={{ maxWidth: '850px', width: '100%', boxShadow: '0 10px 50px rgba(0,0,0,0.15)' }}>
                        {activeModal === 'note' && (
                            <>
                                <h2 className="fw-black mb-4"><i className="bi bi-pencil-square me-3 text-primary"></i> Capture Insight</h2>
                                <textarea className="form-control rounded-4 p-4 mb-4" rows="7" value={modalData.content} onChange={(e) => setModalData({...modalData, content: e.target.value})} placeholder="Draft your insight..."></textarea>
                                <div className="d-flex gap-3">
                                    <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold flex-grow-1" onClick={() => handleAddNote(modalData.content)}>Save Insight</button>
                                    <button className="btn btn-outline-secondary btn-lg rounded-pill px-5 py-3 fw-bold" onClick={() => setActiveModal(null)}>Cancel</button>
                                </div>
                            </>
                        )}
                        {activeModal === 'project' && (
                            <>
                                <h2 className="fw-black mb-4"><i className="bi bi-rocket-takeoff me-3 text-primary"></i> New Initiative</h2>
                                <input className="form-control rounded-pill px-4 py-3 mb-4" value={modalData.title} onChange={(e) => setModalData({...modalData, title: e.target.value})} placeholder="Project title..." />
                                <div className="d-flex gap-3">
                                    <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold flex-grow-1" onClick={handleAddProject}>Launch Project</button>
                                    <button className="btn btn-outline-secondary btn-lg rounded-pill px-5 py-3 fw-bold" onClick={() => setActiveModal(null)}>Cancel</button>
                                </div>
                            </>
                        )}
                        {activeModal === 'payment' && (
                            <>
                                <h2 className="fw-black mb-4 text-dark d-flex align-items-center"><i className="bi bi-credit-card-2-front me-3 text-primary"></i> Secure Enrollment</h2>
                                <p className="text-secondary mb-5 fs-5">Choose your preferred payment infrastructure and currency.</p>
                                <div className="row g-4 mb-5">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-primary mb-2">Gateway</label>
                                        <div className="d-flex flex-column gap-2">
                                            {['paystack', 'flutterwave', 'stripe'].map(gw => (
                                                <button key={gw} className={`btn p-3 text-start rounded-4 border-2 ${selectedGateway === gw ? 'border-primary bg-primary bg-opacity-10' : 'border-light bg-light'}`} onClick={() => setSelectedGateway(gw)}>{gw.toUpperCase()}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-uppercase small text-primary mb-2">Currency</label>
                                        <select className="form-select rounded-pill px-3 py-2" value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                                            {currencies.map(curr => <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold flex-grow-1" onClick={executePayment}>Confirm & Pay</button>
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

export default StaffDashboard;
