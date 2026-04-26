import React from 'react';

const ProjectTracker = ({ projects = [], onUpdateStatus, onDeleteProject, onOpenModal }) => {
    const handleStatusChange = (id, currentStatus) => {
        const nextStatus = currentStatus === 'to_do' ? 'in_progress' : 
                         currentStatus === 'in_progress' ? 'completed' : 'to_do';
        onUpdateStatus(id, nextStatus);
    };

    return (
        <div className="card shadow-sm border-0 rounded-4 bg-white p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h5 className="fw-bold mb-0">Project Kanban</h5>
                <button className="btn btn-primary btn-sm rounded-pill fw-bold px-3 shadow-sm" onClick={onOpenModal}>+ New Project</button>
            </div>
            
            {projects.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-4 border border-dashed text-muted">
                    <i className="bi bi-rocket-takeoff fs-2 mb-2 d-block"></i>
                    <p className="small mb-0">No active projects yet. Build something amazing!</p>
                </div>
            ) : (
                <div className="list-group list-group-flush gap-3">
                    {projects.map((proj) => (
                        <div key={proj.id} className="list-group-item border-0 p-3 bg-light rounded-4 d-flex justify-content-between align-items-center hover-lift">
                            <div>
                                <h6 className="fw-bold mb-1 text-primary">{proj.title}</h6>
                                <p className="small text-muted mb-0 text-truncate" style={{ maxWidth: '150px' }}>{proj.description || "Experimental Project"}</p>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <span 
                                    className={`badge rounded-pill px-3 py-1 fw-bold cursor-pointer transition-all ${
                                        proj.status === 'completed' ? 'bg-success text-white' : 
                                        proj.status === 'in_progress' ? 'bg-warning text-dark' : 'bg-secondary text-white'
                                    }`}
                                    onClick={() => handleStatusChange(proj.id, proj.status)}
                                    style={{ cursor: 'pointer' }}
                                    title="Toggle Status"
                                >
                                    {proj.status.replace('_', ' ').toUpperCase()}
                                </span>
                                <button className="btn btn-link text-danger p-0 border-0" onClick={() => onDeleteProject(proj.id)}>
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectTracker;
