import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import GlobalHub from './GlobalHub';
import ActivityFeed from './ActivityFeed';
import AccountSettings from './AccountSettings';
import SkillProficiency from './SkillProficiency';
import StudentView from './StudentView';
import { showError, showConfirm } from '../../utils/sweetAlert';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [courses, setCourses] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('analytics');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Student View Blend State
    const [enrollments, setEnrollments] = useState([]);
    const [notes, setNotes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeModal, setActiveModal] = useState(null);
    const [modalData, setModalData] = useState({ title: '', content: '', courseId: null });

    const fetchAdminData = useCallback(async () => {
        try {
            setLoading(true);
            const resUser = await axiosInstance.get('/auth/me');
            setUser(resUser.data);

            // 1. Admin Management Data
            const resStats = await axiosInstance.get('/admin/stats');
            setStats(resStats.data);

            const resCourses = await axiosInstance.get('/courses/');
            setCourses(resCourses.data);

            const resInquiries = await axiosInstance.get('/contact/');
            setInquiries(resInquiries.data);

            // 2. Student Experience Data Blend
            const resStudent = await axiosInstance.get('/enrollments/dashboard');
            setEnrollments(resStudent.data.enrollments);
            setNotes(resStudent.data.notes);
            setProjects(resStudent.data.projects);

            try {
                await axiosInstance.get('/payments/suggested-currency');
            } catch (currErr) { console.error("Currency error", currErr); }

        } catch (err) {
            console.error("Admin fetch error", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError("Unauthorized: Access restricted to administrative roles.");
            } else {
                setError("Connectivity issue detected.");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData]);

    // Handlers (Administrative)
    const handleDeleteCourse = async (slug) => {
        const confirmed = await showConfirm("Delete Course?", "Confirm deletion?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/courses/${slug}`);
            setCourses(prev => prev.filter(c => c.slug !== slug));
        } catch (err) { showError("Error", "Action failed."); }
    };

    const handleDeleteInquiry = async (id) => {
        const confirmed = await showConfirm("Delete Inquiry?", "Confirm removal?");
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
            if (!courseId) return showError("Action Denied", "Enroll in a course to add notes.");
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
        } catch (err) { showError("Error", "Failed to update status"); }
    };

    const handleDeleteProject = async (id) => {
        const confirmed = await showConfirm("Delete?", "Are you sure?");
        if (!confirmed.isConfirmed) return;
        try {
            await axiosInstance.delete(`/projects/${id}`);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) { showError("Error", "Failed to delete"); }
    };

    const handleUnenroll = async (enrollmentId) => {
        try {
            await axiosInstance.delete(`/enrollments/${enrollmentId}`);
            setEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
        } catch (err) { showError("Error", "Failed to drop"); }
    };

    const handlePayment = (courseId) => {
        setModalData({ ...modalData, courseId });
        setActiveModal('payment');
    };

    if (error) {
        return (
            <div className="container mt-5 pt-5 text-center fade-in-up">
                <div className="alert alert-danger p-5 rounded-4 shadow-sm border-0">
                    <h2 className="fw-black mb-3">Access Restricted</h2>
                    <p className="fs-5 mb-4">{error}</p>
                    <button className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow-sm" onClick={() => navigate('/')}>Home</button>
                </div>
            </div>
        );
    }

    if (loading || !user) return (
        <div className="text-center min-vh-100 d-flex justify-content-center align-items-center bg-white">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );

    const lastEnrollment = enrollments.find(e => e.payment_status === 'paid') || enrollments[0];

    return (
        <div className="container-fluid" style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
            <div className="row g-0" style={{ minHeight: 'calc(100vh - 75px)', marginTop: '75px' }}>
                {/* Sidebar */}
                <div className="col-md-2 d-none d-md-block bg-white shadow-sm p-4 pt-5" 
                     style={{ height: 'calc(100vh - 75px)', position: 'sticky', top: '75px', zIndex: 1000, backgroundColor: 'var(--primary-dark) !important', color: 'white' }}>
                    <h6 className="text-uppercase text-white opacity-50 fw-bold mb-4 mt-2 small">Administration</h6>
                    <ul className="nav flex-column gap-2 mb-5">
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'analytics' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('analytics')}>📊 Analytics</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'courses' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('courses')}>📚 Courses</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'inquiries' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('inquiries')}>👥 Inquiries</button>
                        </li>
                    </ul>

                    <h6 className="text-uppercase text-white opacity-50 fw-bold mb-4 mt-2 small">Experience</h6>
                    <ul className="nav flex-column gap-2 mb-5">
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'coding' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('coding')}>💻 Coding Hub</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'hub' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('hub')}>🏛️ Community</button>
                        </li>
                    </ul>

                    <h6 className="text-uppercase text-white opacity-50 fw-bold mb-4 mt-2 small">Personal</h6>
                    <ul className="nav flex-column gap-2">
                        <li className="nav-item">
                            <button className={`nav-link border-0 text-start w-100 fw-bold px-3 py-2 rounded-3 ${activeTab === 'settings' ? 'bg-white bg-opacity-20 text-white' : 'text-white text-opacity-75'}`} 
                                    onClick={() => setActiveTab('settings')}>⚙️ Settings</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link border-0 text-start w-100 text-danger fw-bold px-3 py-2 rounded-3" 
                                    onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>🚪 Log Out</button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-10 p-4 p-md-5 bg-light" style={{ paddingBottom: '250px' }}>
                    {/* Top Bar */}
                    <div className="mb-5 d-flex justify-content-between align-items-center">
                        <div className="input-group bg-white rounded-pill shadow-sm px-3 py-1" style={{ maxWidth: '400px' }}>
                            <span className="input-group-text border-0 bg-transparent text-muted"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control border-0 shadow-none" placeholder="Search system..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center gap-3">
                             <div className="text-end d-none d-lg-block">
                                <h6 className="fw-bold mb-0">{user.name}</h6>
                                <small className="text-primary text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Administrator</small>
                             </div>
                              <div className="cursor-pointer rounded-circle bg-primary text-white d-center fw-bold" style={{ width: '45px', height: '45px' }} onClick={() => setActiveTab('settings')}>
                                 {user.avatar_url ? <img src={user.avatar_url} alt="Profile" className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : user.name[0]}
                              </div>
                        </div>
                    </div>

                    {activeTab === 'analytics' && (
                        <div className="fade-in-up">
                            <div className="row g-4 mb-5">
                                <div className="col-md-4">
                                    <div className="p-5 h-100 rounded-4 shadow-sm text-center bg-white border-top border-4 border-primary">
                                        <i className="bi bi-people-fill display-4 mb-3 d-block text-primary"></i>
                                        <h1 className="display-4 fw-black mb-1">{stats?.total_users}</h1>
                                        <h6 className="fw-bold text-muted text-uppercase small">Total Users</h6>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-5 h-100 rounded-4 shadow-sm text-center bg-white border-top border-4 border-warning">
                                        <i className="bi bi-journal-check display-4 mb-3 d-block text-warning"></i>
                                        <h1 className="display-4 fw-black mb-1">{stats?.total_courses}</h1>
                                        <h6 className="fw-bold text-muted text-uppercase small">Courses</h6>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-5 h-100 rounded-4 shadow-sm text-center bg-white border-top border-4 border-success">
                                        <i className="bi bi-cart-check-fill display-4 mb-3 d-block text-success"></i>
                                        <h1 className="display-4 fw-black mb-1">{stats?.total_enrollments}</h1>
                                        <h6 className="fw-bold text-muted text-uppercase small">Enrollments</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 mb-5">
                                <div className="col-lg-8"><ActivityFeed activityLogs={user.activity_logs || []} title="Platform Activity Audit" /></div>
                                <div className="col-lg-4">
                                    <SkillProficiency skills={user.skills || {}} title="Vital Metrics" />
                                    <div className="p-4 rounded-4 bg-primary text-white shadow-sm mt-4">
                                        <h5 className="fw-black mb-4">System Utilities</h5>
                                        <button className="btn btn-light w-100 rounded-pill mb-3 fw-bold text-dark" onClick={() => navigate('/training')}>Create Course</button>
                                        <button className="btn btn-outline-light w-100 rounded-pill fw-bold text-white" onClick={() => setActiveTab('inquiries')}>View Inquiries</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div className="bg-white rounded-4 shadow-sm border overflow-hidden fade-in-up">
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
                                <h5 className="fw-bold mb-0">Platform Catalog</h5>
                                <button className="btn btn-primary rounded-pill px-4 fw-bold" onClick={() => navigate('/training')}>Add Course</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr><th className="px-4 py-3 border-0">Title</th><th className="py-3 border-0">Category</th><th className="py-3 border-0 text-center">Price</th><th className="px-4 py-3 border-0 text-end">Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {courses.map(course => (
                                            <tr key={course.id}>
                                                <td className="px-4 py-3 fw-bold">{course.title}</td>
                                                <td className="py-3">{course.category}</td>
                                                <td className="py-3 text-center fw-bold">${course.price}</td>
                                                <td className="px-4 py-3 text-end"><button className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold" onClick={() => handleDeleteCourse(course.slug)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inquiries' && (
                        <div className="bg-white rounded-4 shadow-sm border overflow-hidden fade-in-up">
                            <div className="p-4 border-bottom bg-light"><h5 className="fw-bold mb-0">Leads & Inquiries</h5></div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr><th className="px-4 py-3 border-0">Originator</th><th className="py-3 border-0">Status</th><th className="px-4 py-3 border-0 text-end">Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {inquiries.map(inq => (
                                            <tr key={inq.id}>
                                                <td className="px-4 py-3"><div className="fw-bold">{inq.name}</div><div className="small text-muted">{inq.email}</div></td>
                                                <td className="py-3">
                                                    <select className="form-select form-select-sm border-0 rounded-pill px-3 fw-bold bg-light" value={inq.status} onChange={(e) => handleUpdateInquiry(inq.id, e.target.value)}>
                                                        <option value="New">New</option><option value="Pending">Pending</option><option value="Resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-3 text-end"><button className="btn btn-link text-danger p-0" onClick={() => handleDeleteInquiry(inq.id)}><i className="bi bi-trash3-fill"></i></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'coding' && (
                        <StudentView 
                            user={user} enrollments={enrollments} lastEnrollment={lastEnrollment} notes={notes} projects={projects} 
                            searchQuery={searchQuery} navigate={navigate} handlePayment={handlePayment} 
                            handleUpdateProject={handleUpdateProject} handleDeleteProject={handleDeleteProject} 
                            handleDeleteNote={handleDeleteNote} handleUnenroll={handleUnenroll} setActiveModal={setActiveModal}
                        />
                    )}

                    {activeTab === 'hub' && <GlobalHub />}
                    {activeTab === 'settings' && <AccountSettings user={user} setUser={setUser} />}
                </div>
            </div>

            {/* MODALS */}
            {activeModal && (
                <div className="d-flex justify-content-center align-items-center p-3 text-dark" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 1060 }}>
                    <div className="rounded-4 p-5 bg-white shadow-lg" style={{ maxWidth: '850px', width: '100%' }}>
                        {activeModal === 'note' && (
                            <>
                                <h2 className="fw-black mb-4">Add Insight</h2>
                                <textarea className="form-control mb-4" rows="5" value={modalData.content} onChange={(e) => setModalData({...modalData, content: e.target.value})}></textarea>
                                <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold" onClick={() => handleAddNote(modalData.content)}>Save</button>
                            </>
                        )}
                        {/* More modals can be added as needed or fully synchronized */}
                        <button className="btn btn-link w-100 mt-3 text-muted" onClick={() => setActiveModal(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
