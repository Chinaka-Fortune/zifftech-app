import React, { useState } from 'react';
import axiosInstance from '../../api/axios';
import { showError, showSuccess } from '../../utils/sweetAlert';

const AccountSettings = ({ user, setUser, onUpdate }) => {
    const [editInputs, setEditInputs] = useState({ 
        name: user.name || "", 
        email: user.email || "", 
        bio: user.bio || "", 
        avatar_url: user.avatar_url || "", 
        public_profile: user.public_profile || false,
        socials: user.socials || { linkedin: "", github: "", twitter: "", whatsapp: "", instagram: "" },
        notifications: user.notifications || { email: true, whatsapp: false }
    });
    const [message, setMessage] = useState("");

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await axiosInstance.patch('/auth/me', editInputs);
            setMessage("Profile updated successfully!");
            setUser(prev => ({ ...prev, ...res.data.user }));
            if (onUpdate) onUpdate(res.data.user);
            showSuccess("Success", "Tactical profile successfully synchronized.");
        } catch (err) {
            showError("Update failed", err.response?.data?.message || "An error occurred");
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axiosInstance.post('/auth/upload-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setEditInputs(prev => ({ ...prev, avatar_url: res.data.avatar_url }));
            showSuccess("Upload Successful", "New tactical avatar identified. Commit changes to save permanently.");
        } catch (err) {
            showError("Upload Failed", err.response?.data?.message || "Failed to upload image");
        }
    };

    const getAvatarURL = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:5000${path}`;
    };

    return (
        <div className="fade-in-up" style={{ maxWidth: '900px' }}>
            <div className="ps-4 border-start border-4 mb-5" style={{ borderColor: "var(--primary-color) !important" }}>
                <h2 className="fw-black m-0" style={{ color: "var(--primary-dark)" }}>Operational Settings</h2>
                <p className="text-muted">Configure your professional branding and notifications</p>
            </div>
            
            {message && <div className="alert alert-success fw-bold rounded-4 border-0 shadow-sm mb-4">{message}</div>}

            <form onSubmit={handleProfileUpdate}>
                <div className="row g-4">
                    <div className="col-lg-7">
                        <div className="p-4 p-md-5 rounded-4 mb-4 border shadow-sm bg-light h-100">
                            <h5 className="fw-black mb-4 border-bottom pb-3 d-flex align-items-center" style={{ color: 'var(--primary-dark)' }}>
                                <i className="bi bi-person-badge-fill me-3 fs-4 text-primary"></i> Professional Bio
                            </h5>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-muted small text-uppercase" style={{ letterSpacing: '1px' }}>Profile Picture</label>
                                <div className="d-flex align-items-center gap-4 mb-3 p-3 bg-white rounded-4 border">
                                    <div className="position-relative">
                                        {editInputs.avatar_url ? (
                                            <img src={getAvatarURL(editInputs.avatar_url)} alt="Preview" className="rounded-circle border border-3 border-white shadow-sm" style={{ width: '100px', height: '100px', objectFit: 'cover', aspectRatio: '1/1' }} />
                                        ) : (
                                            <div className="rounded-circle bg-primary text-white d-center fw-bold shadow-sm" style={{ width: '100px', height: '100px', fontSize: '2.5rem', aspectRatio: '1/1' }}>{editInputs.name?.[0]}</div>
                                        )}
                                        <label htmlFor="avatar-upload" className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-center cursor-pointer shadow-sm border border-2 border-white" style={{ width: '32px', height: '32px' }}>
                                            <i className="bi bi-camera-fill small"></i>
                                        </label>
                                        <input type="file" id="avatar-upload" className="d-none" accept="image/*" onChange={handleFileChange} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                            <h6 className="fw-bold mb-0">Tactical Identification</h6>
                                            {editInputs.avatar_url && (
                                                <button type="button" className="btn btn-link text-danger p-0 small fw-bold text-decoration-none" onClick={() => setEditInputs({...editInputs, avatar_url: ""})}>
                                                    <i className="bi bi-trash3 me-1"></i> Remove Photo
                                                </button>
                                            )}
                                        </div>
                                        <p className="small text-muted mb-2">Upload a professional headshot or avatar from your device.</p>
                                        <div className="input-group input-group-sm">
                                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-link-45deg"></i></span>
                                            <input type="text" className="form-control border-start-0 text-dark fw-medium" placeholder="Paste an external image URL..." value={editInputs.avatar_url} onChange={(e) => setEditInputs({...editInputs, avatar_url: e.target.value})} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-muted small text-uppercase" style={{ letterSpacing: '1px' }}>Full Name</label>
                                <input type="text" className="form-control border text-dark fw-bold px-4 py-3 rounded-pill shadow-sm bg-white" value={editInputs.name} onChange={(e) => setEditInputs({...editInputs, name: e.target.value})} required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-muted small text-uppercase" style={{ letterSpacing: '1px' }}>Professional Briefing / Bio</label>
                                <textarea className="form-control border text-dark fw-medium px-4 py-3 rounded-4 shadow-sm bg-white" rows="5" value={editInputs.bio} onChange={(e) => setEditInputs({...editInputs, bio: e.target.value})} placeholder="Outline your technical expertise and career trajectory..."></textarea>
                            </div>
                            <div className="mb-4 border-top pt-4">
                                <div className="d-flex align-items-center gap-3">
                                    <label className="ziff-switch">
                                        <input 
                                            type="checkbox" 
                                            checked={editInputs.public_profile} 
                                            onChange={(e) => setEditInputs({...editInputs, public_profile: e.target.checked})} 
                                        />
                                        <span className="ziff-slider"></span>
                                    </label>
                                    <label className="form-check-label fw-black text-dark cursor-pointer mb-0">Activate Public Career Portfolio</label>
                                </div>
                                <p className="small text-muted mt-2 fw-medium">Enabling this creates a verified professional URL for recruiters to view your certificates and projects.</p>
                            </div>
                            <div className="d-flex gap-3 mt-5">
                                <button type="submit" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm w-100 fs-5">Commit Changes</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="p-4 p-md-5 rounded-4 border shadow-sm mb-4 bg-light">
                            <h5 className="fw-black mb-4 border-bottom pb-3 d-flex align-items-center" style={{ color: 'var(--primary-dark)' }}>
                                <i className="bi bi-globe me-3 fs-4 text-primary"></i> Social Integration
                            </h5>
                            <div className="mb-4">
                                <label className="small text-muted fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>LinkedIn URL</label>
                                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                                    <span className="input-group-text bg-white border-0 text-primary"><i className="bi bi-linkedin"></i></span>
                                    <input className="form-control border text-dark fw-bold px-3 py-2 bg-white" value={editInputs.socials.linkedin} onChange={(e) => setEditInputs({...editInputs, socials: {...editInputs.socials, linkedin: e.target.value}})} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="small text-muted fw-bold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>GitHub URL</label>
                                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                                    <span className="input-group-text bg-white border-0 text-dark"><i className="bi bi-github"></i></span>
                                    <input className="form-control border text-dark fw-bold px-3 py-2 bg-white" value={editInputs.socials.github} onChange={(e) => setEditInputs({...editInputs, socials: {...editInputs.socials, github: e.target.value}})} />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 p-md-5 rounded-4 border shadow-sm bg-light">
                            <h5 className="fw-black mb-4 border-bottom pb-3 d-flex align-items-center" style={{ color: 'var(--primary-dark)' }}>
                                <i className="bi bi-shield-check me-3 fs-4 text-primary"></i> Security Alerts
                            </h5>
                            <div className="d-flex align-items-center mb-4 p-3 bg-white rounded-4 border shadow-sm transition-all hover-shadow">
                                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle me-3">
                                    <i className="bi bi-envelope-at-fill fs-4"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <label className="form-check-label fw-black text-dark cursor-pointer mb-0 d-block">Email Notifications</label>
                                    <small className="text-muted">Receive security alerts and system updates</small>
                                </div>
                                <div className="ms-3 d-flex align-items-center gap-2">
                                    <label className="ziff-switch">
                                        <input 
                                            type="checkbox" 
                                            checked={editInputs.notifications?.email || false} 
                                            onChange={(e) => setEditInputs(prev => ({
                                                ...prev, 
                                                notifications: { ...prev.notifications, email: e.target.checked }
                                            }))} 
                                        />
                                        <span className="ziff-slider"></span>
                                    </label>
                                    <span className={`small fw-bold ${editInputs.notifications?.email ? 'text-primary' : 'text-muted'}`}>
                                        {editInputs.notifications?.email ? 'ACTIVE' : 'OFF'}
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center p-3 bg-white rounded-4 border shadow-sm transition-all hover-shadow">
                                <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle me-3">
                                    <i className="bi bi-whatsapp fs-4"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <label className="form-check-label fw-black text-dark cursor-pointer mb-0 d-block">WhatsApp Alerts</label>
                                    <small className="text-muted">Real-time tactical class reminders</small>
                                </div>
                                <div className="ms-3 d-flex align-items-center gap-2">
                                    <label className="ziff-switch">
                                        <input 
                                            type="checkbox" 
                                            checked={editInputs.notifications?.whatsapp || false} 
                                            onChange={(e) => setEditInputs(prev => ({
                                                ...prev, 
                                                notifications: { ...prev.notifications, whatsapp: e.target.checked }
                                            }))} 
                                        />
                                        <span className="ziff-slider"></span>
                                    </label>
                                    <span className={`small fw-bold ${editInputs.notifications?.whatsapp ? 'text-success' : 'text-muted'}`}>
                                        {editInputs.notifications?.whatsapp ? 'ACTIVE' : 'OFF'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;
