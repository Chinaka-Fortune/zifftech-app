import React from 'react';

const ResourceVault = ({ notes = [], onDeleteNote, onOpenModal }) => {
    return (
        <div className="card shadow-sm border-0 rounded-4 bg-white p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h5 className="fw-bold mb-0">Course Notes</h5>
                <button className="btn btn-primary btn-sm rounded-pill fw-bold px-3 shadow-sm" onClick={onOpenModal}>+ Add Note</button>
            </div>
            
            <div className="list-group list-group-flush gap-2">
                {notes.length === 0 ? (
                    <div className="text-center py-4 bg-light rounded-4 border border-dashed text-muted">
                        <p className="small mb-0">No notes saved yet. Capture your insights during lessons!</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <div key={note.id} className="list-group-item border-0 p-3 bg-light rounded-4 d-flex justify-content-between align-items-start hover-lift mb-1">
                            <div className="d-flex align-items-start gap-3">
                                <div className="fs-5 mt-1">📝</div>
                                <div>
                                    <h6 className="fw-bold mb-1 small text-dark">{note.course_title || "Course Note"}</h6>
                                    <p className="small text-muted mb-0" style={{ fontSize: '0.8rem' }}>{note.content}</p>
                                    <small className="text-primary-emphasis" style={{ fontSize: '0.7rem' }}>
                                        {new Date(note.created_at).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                            <button className="btn btn-link text-danger btn-sm p-0 border-0" onClick={() => onDeleteNote(note.id)}>
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>
            {notes.length > 0 && <p className="small text-muted text-center mt-3 mb-4">{notes.length} persistent insights saved</p>}
        </div>
    );
};

export default ResourceVault;
