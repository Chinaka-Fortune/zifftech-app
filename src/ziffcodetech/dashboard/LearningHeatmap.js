import React from 'react';

const LearningHeatmap = ({ activityLogs = [] }) => {
    // Mock data for 52 weeks x 7 days
    const rows = 7;
    const cols = 28; // Showing 28 columns for dashboard size
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Map logs to days
    const activityMap = {};
    activityLogs.forEach(log => {
        const dateStr = log.timestamp.split('T')[0];
        activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
    });

    const getActivityLevel = (count) => {
        if (!count) return 0;
        if (count < 2) return 1;
        if (count < 4) return 2;
        if (count < 6) return 3;
        return 4;
    };

    const getActivityColor = (level) => {
        switch(level) {
            case 0: return '#ebedf0';
            case 1: return '#9be9a8';
            case 2: return '#40c463';
            case 3: return '#30a14e';
            case 4: return '#216e39';
            default: return '#ebedf0';
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h5 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-calendar3 me-2 text-success"></i> Learning Activity
            </h5>
            <div className="d-flex overflow-auto pb-2">
                <div className="me-2 mt-4 text-muted small">
                    {days.map(d => <div key={d} style={{ height: '12px', marginBottom: '4px', fontSize: '10px' }}>{d}</div>)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '4px' }}>
                    {[...Array(cols)].map((_, c) => (
                        <div key={c} style={{ display: 'grid', gridTemplateRows: `repeat(${rows}, 1fr)`, gap: '4px' }}>
                            {[...Array(rows)].map((_, r) => {
                                // Calculate the date for this specific cell (r, c)
                                // We start from today and go back (cols * rows) days
                                const daysToSubtract = ((cols - 1 - c) * 7) + (6 - r);
                                const date = new Date();
                                date.setDate(date.getDate() - daysToSubtract);
                                const dateStr = date.toISOString().split('T')[0];
                                
                                const count = activityMap[dateStr] || 0;
                                const level = getActivityLevel(count);
                                
                                return (
                                    <div 
                                        key={r} 
                                        style={{ 
                                            width: '12px', 
                                            height: '12px', 
                                            backgroundColor: getActivityColor(level),
                                            borderRadius: '2px'
                                        }}
                                        title={`${dateStr}: ${count} activities`}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-3 small text-muted gap-2">
                <span>Less</span>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#ebedf0', borderRadius: '1px' }}></div>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#9be9a8', borderRadius: '1px' }}></div>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#40c463', borderRadius: '1px' }}></div>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#30a14e', borderRadius: '1px' }}></div>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#216e39', borderRadius: '1px' }}></div>
                <span>More</span>
            </div>
        </div>
    );
};

export default LearningHeatmap;
