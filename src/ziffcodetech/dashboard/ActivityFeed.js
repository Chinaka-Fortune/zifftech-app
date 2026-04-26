import React from 'react';

const ActivityFeed = ({ activityLogs = [], title = "Live Activity Feed", maxHeight = "500px" }) => {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'profile_updated': return { icon: 'bi-person-gear', color: 'text-primary', bg: 'bg-primary-light' };
            case 'lesson_completed': return { icon: 'bi-check-circle-fill', color: 'text-success', bg: 'bg-success-light' };
            case 'quiz_passed': return { icon: 'bi-trophy-fill', color: 'text-warning', bg: 'bg-warning-light' };
            case 'login': return { icon: 'bi-shield-lock-fill', color: 'text-info', bg: 'bg-info-light' };
            case 'note_added': return { icon: 'bi-pencil-square', color: 'text-purple', bg: 'bg-purple-light' };
            case 'project_created': return { icon: 'bi-rocket-takeoff-fill', color: 'text-danger', bg: 'bg-danger-light' };
            case 'course_deleted': return { icon: 'bi-trash3-fill', color: 'text-danger', bg: 'bg-danger-light' };
            case 'inquiry_resolved': return { icon: 'bi-patch-check-fill', color: 'text-success', bg: 'bg-success-light' };
            default: return { icon: 'bi-activity', color: 'text-secondary', bg: 'bg-light' };
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffHours = Math.abs(now - date) / 36e5;
        
        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
        if (diffHours < 48) return 'Yesterday';
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    const recentActivities = activityLogs.slice(0, 15);

    return (
        <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden h-100">
            <div className="p-4 border-bottom bg-light">
                <h5 className="fw-black mb-0 d-flex align-items-center" style={{ color: 'var(--primary-dark)' }}>
                    <i className="bi bi-clock-history me-3 fs-4 text-primary"></i> {title}
                </h5>
            </div>
            <div className="p-4 overflow-auto" style={{ maxHeight }}>
                {recentActivities.length === 0 ? (
                    <div className="text-center py-5 opacity-50">
                        <i className="bi bi-activity display-4 mb-3 d-block"></i>
                        <p className="fw-bold text-muted">No operational activity recorded yet.</p>
                    </div>
                ) : (
                    <div className="timeline-container">
                        {recentActivities.map((log, idx) => {
                            const { icon, color, bg } = getActivityIcon(log.activity_type);
                            return (
                                <div key={log.id || idx} className="d-flex gap-3 mb-4 position-relative">
                                    {idx !== recentActivities.length - 1 && (
                                        <div className="position-absolute" style={{ left: '22px', top: '45px', bottom: '-20px', width: '2px', backgroundColor: '#f1f5f9' }}></div>
                                    )}
                                    <div className={`rounded-circle d-center shadow-sm flex-shrink-0 ${bg}`} style={{ width: '45px', height: '45px' }}>
                                        <i className={`bi ${icon} fs-5 ${color}`}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.95rem' }}>{log.description || log.activity_type}</h6>
                                            <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>{formatTimestamp(log.timestamp)}</span>
                                        </div>
                                        <p className="small text-muted mb-0 fw-medium">Operational record synchronized.</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;
