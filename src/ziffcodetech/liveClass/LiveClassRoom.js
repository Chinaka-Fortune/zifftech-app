import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import axiosInstance from '../../api/axios';

const LiveClassRoom = () => {
    const { roomName } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [appId, setAppId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await axiosInstance.get(`/meetings/${roomName}/token`);
                setToken(res.data.token);
                setAppId(res.data.app_id);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to join room. Are you enrolled?");
                if (err.response?.status === 401) {
                    navigate('/logIn');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchToken();
    }, [roomName, navigate]);

    if (loading) return <div className="text-center mt-5 pt-5">Loading secure classroom...</div>;

    if (error) return (
        <div className="container mt-5 pt-5 text-center min-vh-70 d-flex flex-column align-items-center justify-content-center">
            <div className="bg-danger bg-opacity-10 text-danger rounded-circle p-4 mb-4" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-shield-lock-fill display-4"></i>
            </div>
            <h2 className="text-dark fw-black mb-3">Access Denied</h2>
            <p className="lead text-muted mb-4 px-md-5">{error}</p>
            <div className="d-flex gap-3">
                <button className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                </button>
                <button className="btn btn-outline-dark rounded-pill px-5 py-3 fw-bold" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        </div>
    );

    return (
        <div className="container-fluid p-0" style={{ height: 'calc(100vh - 70px)', marginTop: '70px' }}>
            <JitsiMeeting
                domain="8x8.vc"
                roomName={`${appId}/${roomName}`}
                jwt={token}
                configOverwrite={{
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    startScreenSharing: true,
                    enableEmailInStats: false
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100%';
                    iframeRef.style.width = '100%';
                    iframeRef.style.border = 'none';
                }}
            />
        </div>
    );
};

export default LiveClassRoom;
