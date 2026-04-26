import React, { useState, useEffect, useRef, useCallback } from 'react';
import axiosInstance from '../../api/axios';
import { showError, showConfirm } from '../../utils/sweetAlert';

const MessagingHub = ({ user }) => {
    const [threads, setThreads] = useState([]);
    const [activeThread, setActiveThread] = useState(null);
    const [reply, setReply] = useState("");
    const [newThread, setNewThread] = useState({ subject: '', department: 'Tech Support', body: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    const fetchThreads = useCallback(async () => {
        try {
            const res = await axiosInstance.get('/governance/support/threads');
            setThreads(res.data);
            if (res.data.length > 0 && !activeThread) {
                // setActiveThread(res.data[0]); // Don't auto-select to avoid confusion
            }
        } catch (err) {
            console.error("Failed to load threads", err);
        } finally {
            setLoading(false);
        }
    }, [activeThread]);

    useEffect(() => {
        fetchThreads();
    }, [fetchThreads]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeThread]);

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!reply.trim()) return;
        try {
            const res = await axiosInstance.post(`/governance/support/threads/${activeThread.id}/reply`, { body: reply });
            setActiveThread(res.data.thread);
            setReply("");
            // Refresh list to update status
            fetchThreads();
        } catch (err) {
            showError("Reply Failed", err.response?.data?.message || "Failed to send reply");
        }
    };

    const handleCreateThread = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/governance/support/threads', newThread);
            setThreads([res.data.thread, ...threads]);
            setActiveThread(res.data.thread);
            setIsCreating(false);
            setNewThread({ subject: '', department: 'Tech Support', body: '' });
        } catch (err) {
            showError("Creation Failed", "Failed to create support request");
        }
    };

    const handleEscalate = async (id) => {
        const confirmed = await showConfirm("Escalate Thread?", "Confirm escalation to management? Original role will lose access until resolution.");
        if (!confirmed.isConfirmed) return;
        try {
            const res = await axiosInstance.patch(`/governance/support/threads/${id}/escalate`);
            setActiveThread(res.data.thread);
            fetchThreads();
        } catch (err) { showError("Error", "Escalation failed"); }
    };

    const handleResolve = async (id) => {
        const confirmed = await showConfirm("Resolve Thread?", "Mark this thread as resolved?");
        if (!confirmed.isConfirmed) return;
        try {
            const res = await axiosInstance.patch(`/governance/support/threads/${id}/resolve`);
            setActiveThread(res.data.thread);
            fetchThreads();
        } catch (err) { showError("Error", "Resolution failed"); }
    };

    const isStaff = user?.role !== 'student';

    return (
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white fade-in-up" style={{ height: '700px' }}>
            <div className="row g-0 h-100">
                {/* Thread Sidebar */}
                <div className="col-md-4 border-end h-100 d-flex flex-column bg-light">
                    <div className="p-4 border-bottom bg-white d-flex justify-content-between align-items-center">
                        <h5 className="fw-black mb-0">Support Queue</h5>
                        {!isStaff && <button className="btn btn-primary btn-sm rounded-pill px-3 fw-bold" onClick={() => setIsCreating(true)}><i className="bi bi-plus-lg me-1"></i>New</button>}
                    </div>
                    <div className="overflow-auto flex-grow-1 p-2">
                        {loading ? <div className="text-center py-4"><div className="spinner-border spinner-border-sm text-primary"></div></div> :
                         threads.length === 0 ? <div className="text-center py-5 text-muted small fw-bold">No active conversations.</div> :
                         threads.map(t => (
                            <div key={t.id} 
                                 className={`p-3 mb-2 rounded-4 cursor-pointer transition-all ${activeThread?.id === t.id ? 'bg-primary text-white shadow-sm' : 'bg-white hover-bg-light border'}`}
                                 onClick={() => { setActiveThread(t); setIsCreating(false); }}>
                                <div className="d-flex justify-content-between align-items-start mb-1">
                                    <h6 className="fw-bold mb-0 text-truncate small" style={{ maxWidth: '180px' }}>{t.subject}</h6>
                                    <span className={`badge rounded-pill fw-bold small ${t.status === 'Open' ? 'bg-warning text-dark' : 'bg-success text-white'}`} style={{ fontSize: '0.65rem' }}>{t.status}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <small className={`fw-bold ${activeThread?.id === t.id ? 'text-white' : 'text-primary'}`} style={{ fontSize: '0.7rem' }}>{t.department}</small>
                                    <small className="opacity-75" style={{ fontSize: '0.6rem' }}>{new Date(t.created_at).toLocaleDateString()}</small>
                                </div>
                            </div>
                         ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-md-8 h-100 d-flex flex-column bg-white">
                    {isCreating ? (
                        <div className="p-4 p-md-5 d-flex flex-column justify-content-center flex-grow-1 bg-white">
                            <h4 className="fw-black mb-3 d-flex align-items-center" style={{ color: '#0f172a' }}>
                                <i className="bi bi-envelope-paper-fill me-3 text-primary"></i> Direct Messaging
                            </h4>
                            <p className="text-muted mb-4 fw-medium">Start a new conversation with our support team or instructors.</p>
                            
                            <form onSubmit={handleCreateThread} className="border p-4 rounded-4 shadow-sm bg-light">
                                <div className="mb-3">
                                    <label className="form-label fw-bold text-dark small text-uppercase" style={{ letterSpacing: '1px' }}>Department</label>
                                    <select 
                                        className="form-select border-0 px-4 py-3 shadow-sm bg-white text-dark fw-bold" 
                                        value={newThread.department} 
                                        onChange={(e) => setNewThread({...newThread, department: e.target.value})}
                                    >
                                        <option value="Tech Support">Technical Support</option>
                                        <option value="Administration">Administration</option>
                                        <option value="Leadership">Instructors / Leadership</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold text-dark small text-uppercase" style={{ letterSpacing: '1px' }}>Subject</label>
                                    <input 
                                        className="form-control border-0 px-4 py-3 shadow-sm bg-white text-dark fw-bold" 
                                        placeholder="What is this regarding?" 
                                        value={newThread.subject} 
                                        onChange={(e) => setNewThread({...newThread, subject: e.target.value})} 
                                        required 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-dark small text-uppercase" style={{ letterSpacing: '1px' }}>Message Body</label>
                                    <textarea 
                                        className="form-control border-0 px-4 py-3 shadow-sm bg-white text-dark" 
                                        rows="5" 
                                        placeholder="Type your message here..." 
                                        value={newThread.body} 
                                        onChange={(e) => setNewThread({...newThread, body: e.target.value})} 
                                        required
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                </div>
                                <div className="d-flex gap-3">
                                    <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm flex-grow-1">Send Message</button>
                                    <button type="button" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold" onClick={() => setIsCreating(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    ) : activeThread ? (
                        <>
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-50">
                                <div>
                                    <h5 className="fw-black mb-1">{activeThread.subject}</h5>
                                    <div className="d-flex align-items-center gap-2 small">
                                        <span className="text-muted fw-bold">Level: {activeThread.access_level > 0 ? "Management" : "Staff"}</span>
                                        <span className="text-secondary">•</span>
                                        <span className="text-primary fw-bold text-uppercase">{activeThread.department}</span>
                                    </div>
                                </div>
                                {isStaff && activeThread.status !== 'Resolved' && (
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-warning btn-sm rounded-pill fw-bold" onClick={() => handleEscalate(activeThread.id)}>Escalate</button>
                                        <button className="btn btn-outline-success btn-sm rounded-pill fw-bold" onClick={() => handleResolve(activeThread.id)}>Resolve</button>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow-1 overflow-auto p-4 bg-light bg-opacity-25" ref={scrollRef}>
                                {activeThread.messages?.map((m, i) => (
                                    <div key={i} className={`mb-4 d-flex ${m.sender_id === user.id ? 'justify-content-end' : 'justify-content-start'}`}>
                                        <div className={`p-4 rounded-4 shadow-sm max-width-80 ${m.sender_id === user.id ? 'bg-primary text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '75%', borderRadius: m.sender_id === user.id ? '25px 25px 0 25px' : '25px 25px 25px 0' }}>
                                            <p className="mb-2 small lh-base">{m.body}</p>
                                            <div className="d-flex justify-content-between align-items-center opacity-75" style={{ fontSize: '0.6rem' }}>
                                                <span className="fw-bold">{m.sender_id === user.id ? "Me" : "Ziff-Personnel"}</span>
                                                <span>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {activeThread.status !== 'Resolved' && (
                                <div className="p-4 border-top" style={{ backgroundColor: '#020617' }}>
                                    <form onSubmit={handleSendReply} className="d-flex gap-2">
                                        <input 
                                            className="form-control border-0 text-white rounded-pill px-4 py-3 shadow-none" 
                                            style={{ backgroundColor: '#0f172a', border: '1px solid rgba(59, 130, 246, 0.3)' }}
                                            placeholder="Draft your reply..." 
                                            value={reply} 
                                            onChange={(e) => setReply(e.target.value)} 
                                        />
                                        <button type="submit" className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">Send Transmission</button>
                                    </form>
                                </div>
                            )}
                            {activeThread.status === 'Resolved' && (
                                <div className="p-4 border-top bg-success bg-opacity-10 text-success text-center fw-bold">
                                    🔒 This support thread has been successfully resolved.
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-100 d-center text-center p-5 opacity-75">
                            <div>
                                <div className="display-1 mb-4 opacity-25">💬</div>
                                <h4 className="fw-black text-muted mb-2">Technical & Support HQ</h4>
                                <p className="text-muted small">Select an initiative thread to begin tactical communication with counselors.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagingHub;
