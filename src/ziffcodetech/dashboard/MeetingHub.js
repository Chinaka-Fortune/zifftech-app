import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { showError, showSuccess } from '../../utils/sweetAlert';

const MeetingHub = ({ user, navigate }) => {
    const [meetings, setMeetings] = useState({ created: [], invited: [], hierarchical: [] });
    const [loading, setLoading] = useState(true);
    const [newMeetingTitle, setNewMeetingTitle] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [activeMeetingId, setActiveMeetingId] = useState(null); // For the invite modal

    const isStaffOrHigher = ['super_admin', 'director', 'manager', 'team_lead', 'admin_staff', 'staff'].includes(user.role);

    const fetchMeetings = async () => {
        try {
            const res = await axiosInstance.get('/meetings/my_meetings');
            setMeetings({
                created: res.data.created_meetings || [],
                invited: res.data.invited_meetings || [],
                hierarchical: res.data.hierarchical_meetings || []
            });
        } catch (err) {
            console.error("Failed to load meetings", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    const handleCreateMeeting = async (e) => {
        e.preventDefault();
        if (!newMeetingTitle.trim()) return;
        try {
            await axiosInstance.post('/meetings/', { title: newMeetingTitle });
            showSuccess("Success", "Meeting created successfully");
            setNewMeetingTitle('');
            fetchMeetings();
        } catch (err) {
            showError("Creation Failed", err.response?.data?.message || err.message);
        }
    };

    const handleInviteUser = async (e) => {
        e.preventDefault();
        if (!inviteEmail.trim() || !activeMeetingId) return;
        try {
            await axiosInstance.post(`/meetings/${activeMeetingId}/invite`, { email: inviteEmail });
            showSuccess("Invited", `User ${inviteEmail} invited successfully`);
            setInviteEmail('');
            setActiveMeetingId(null);
        } catch (err) {
            showError("Invite Failed", err.response?.data?.message || err.message);
        }
    };

    const getMeetingLink = (roomName) => {
        return `${window.location.origin}/live/${roomName}`;
    };

    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link);
        showSuccess("Copied", "Meeting link copied to clipboard");
    };

    if (loading) {
        return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <div className="container-fluid p-0 fade-in-up">
            <h2 className="fw-black mb-4">🎥 Ziffcode Meeting Hub</h2>
            <p className="text-muted mb-5">Secure video conferencing for mentorship, collaboration, and delivery.</p>

            {isStaffOrHigher && (
                <div className="card shadow-sm border-0 rounded-4 p-4 mb-5 bg-white border-start border-4 border-primary">
                    <h5 className="fw-black mb-3">Create a New Meeting</h5>
                    <form onSubmit={handleCreateMeeting} className="d-flex gap-3">
                        <input 
                            type="text" 
                            className="form-control rounded-pill px-4 py-3 bg-light border-0 fw-bold"
                            placeholder="Enter Meeting Topic or Title..."
                            value={newMeetingTitle}
                            onChange={(e) => setNewMeetingTitle(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary rounded-pill px-5 fw-bold shadow-sm">Start Meeting</button>
                    </form>
                </div>
            )}

            <div className="row g-4">
                {isStaffOrHigher && (
                    <div className="col-12">
                        <h5 className="fw-bold mb-3 d-flex align-items-center">
                            <i className="bi bi-person-video3 me-2 text-primary"></i> My Active Meetings
                        </h5>
                        {meetings.created.length === 0 ? (
                            <div className="card border-0 bg-light p-4 rounded-4 text-center text-muted fw-bold">You have not created any active meetings.</div>
                        ) : (
                            <div className="row g-3">
                                {meetings.created.map(m => (
                                    <div key={m.id} className="col-md-6">
                                        <div className="card border-0 shadow-sm rounded-4 h-100 p-4 hover-lift">
                                            <h6 className="fw-black">{m.title}</h6>
                                            <small className="text-muted mb-3 d-block">Created on {new Date(m.created_at).toLocaleDateString()}</small>
                                            
                                            <div className="d-flex gap-2 mb-3">
                                                <input type="text" className="form-control bg-light border-0 small" readOnly value={getMeetingLink(m.room_name)} />
                                                <button className="btn btn-outline-secondary" onClick={() => copyToClipboard(getMeetingLink(m.room_name))} title="Copy Link"><i className="bi bi-clipboard"></i></button>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                                                <button className="btn btn-sm btn-link text-decoration-none fw-bold p-0 text-primary" onClick={() => setActiveMeetingId(m.id)}>
                                                    <i className="bi bi-person-plus-fill me-1"></i> Invite User
                                                </button>
                                                <button className="btn btn-sm btn-success rounded-pill px-4 fw-bold" onClick={() => navigate(`/live/${m.room_name}`)}>Enter Room</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {meetings.hierarchical.length > 0 && (
                    <div className="col-12 mt-5">
                        <h5 className="fw-bold mb-3 d-flex align-items-center">
                            <i className="bi bi-diagram-3-fill me-2 text-warning"></i> Team Meetings (Hierarchy Access)
                        </h5>
                        <div className="row g-3">
                            {meetings.hierarchical.map(m => (
                                <div key={m.id} className="col-md-6">
                                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4 border-start border-3 border-warning bg-white hover-lift">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="fw-black m-0">{m.title}</h6>
                                            <span className="badge bg-warning text-dark rounded-pill">Open via Rank</span>
                                        </div>
                                        <small className="text-muted mb-3 d-block">Hosted by: <b>{m.creator_name}</b></small>
                                        <button className="btn btn-outline-dark rounded-pill fw-bold mt-auto" onClick={() => navigate(`/live/${m.room_name}`)}>Join Meeting</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="col-12 mt-5">
                    <h5 className="fw-bold mb-3 d-flex align-items-center">
                        <i className="bi bi-envelope-paper-fill me-2 text-success"></i> My Invitations
                    </h5>
                    {meetings.invited.length === 0 ? (
                        <div className="card border-0 bg-light p-4 rounded-4 text-center text-muted fw-bold">You have no pending meeting invitations.</div>
                    ) : (
                        <div className="row g-3">
                            {meetings.invited.map(m => (
                                <div key={m.id} className="col-md-6 col-lg-4">
                                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4 border-start border-3 border-success bg-white hover-lift">
                                        <h6 className="fw-black text-dark mb-1">{m.title}</h6>
                                        <small className="text-muted mb-3 d-block">Hosted by: <b>{m.creator_name}</b></small>
                                        <button className="btn btn-success rounded-pill fw-bold mt-auto w-100 shadow-sm" onClick={() => navigate(`/live/${m.room_name}`)}>Join Room Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Invite Modal */}
            {activeMeetingId && (
                <div className="d-flex justify-content-center align-items-center p-3 text-dark" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 1060 }}>
                    <div className="rounded-4 p-5 fade-in-up border-0 bg-white" style={{ maxWidth: '500px', width: '100%', boxShadow: '0 10px 50px rgba(0,0,0,0.15)' }}>
                        <h4 className="fw-black mb-2">Invite User</h4>
                        <p className="text-muted small mb-4">Enter the email address of the user you wish to invite to this meeting. They must have a Ziffcode account.</p>
                        <form onSubmit={handleInviteUser}>
                            <input 
                                type="email" 
                                className="form-control rounded-pill px-4 py-3 mb-4 bg-light border-0 fw-bold"
                                placeholder="user@example.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                required
                            />
                            <div className="d-flex gap-3">
                                <button type="submit" className="btn btn-primary rounded-pill px-4 py-2 fw-bold flex-grow-1 shadow-sm">Send Invite</button>
                                <button type="button" className="btn btn-light rounded-pill px-4 py-2 fw-bold" onClick={() => setActiveMeetingId(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingHub;
