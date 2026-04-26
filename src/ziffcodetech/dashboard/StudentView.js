import React from 'react';
import ResumeLearningHero from './ResumeLearningHero';
import StatsOverview from './StatsOverview';
import LearningHeatmap from './LearningHeatmap';
import SkillProficiency from './SkillProficiency';
import CodePlayground from './CodePlayground';
import CertificateHub from './CertificateHub';
import ProjectTracker from './ProjectTracker';
import ResourceVault from './ResourceVault';
import ActivityFeed from './ActivityFeed';

const StudentView = ({ 
    user, 
    enrollments, 
    lastEnrollment, 
    notes, 
    projects, 
    searchQuery, 
    navigate,
    handlePayment,
    handleUpdateProject,
    handleDeleteProject,
    handleDeleteNote,
    handleUnenroll,
    setActiveModal
}) => {
    const filteredEnrollments = enrollments.filter(enr => 
        enr.course_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fade-in-up">
            <ResumeLearningHero lastEnrollment={lastEnrollment} />
            <StatsOverview 
                points={user.points} 
                streak={user.streak} 
                enrollmentsCount={enrollments.length} 
            />
            <div className="row g-4 mb-5">
                <div className="col-lg-12">
                    <div className="row g-4 mb-4">
                        <div className="col-md-7">
                            <LearningHeatmap activityLogs={user.activity_logs || []} />
                        </div>
                        <div className="col-md-5">
                            <SkillProficiency 
                                skills={user.skills || {}} 
                                title="Technical Skill Mastery" 
                            />
                        </div>
                    </div>
                    <CodePlayground />
                    <div className="mb-5"></div>
                    
                    <h4 className="fw-bold mb-4 text-dark d-flex align-items-center">
                        <i className="bi bi-mortarboard-fill me-2 text-primary"></i> 
                        {searchQuery ? `Searching: "${searchQuery}"` : "My Learning Path"}
                    </h4>

                    {filteredEnrollments.length === 0 ? (
                        <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-light mb-4">
                            <div className="mb-3 fs-1 opacity-50">🔍</div>
                            <h5 className="fw-bold text-muted">{searchQuery ? "No matching courses found." : "No active enrollments yet."}</h5>
                            <button className="btn text-white rounded-5 mt-3 px-5 py-2 fw-bold shadow-sm" style={{ backgroundColor: "var(--secondary-color)" }} onClick={() => navigate('/training')}>Browse Academy</button>
                        </div>
                    ) : (
                        <div className="row g-4 mb-4">
                            {filteredEnrollments.map((enr) => (
                                <div className="col-12" key={enr.id}>
                                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden bg-white hover-lift">
                                        <div className="card-body p-4 d-flex flex-row align-items-center gap-4">
                                            <div className="rounded-4 bg-light d-center" style={{ width: "80px", height: "80px", minWidth: "80px", fontSize: "2rem" }}>
                                                {enr.course_title?.toLowerCase().includes('python') ? '🐍' : '💻'}
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="fw-bold mb-0 text-dark">{enr.course_title}</h5>
                                                    <span className={`badge ${enr.payment_status === 'paid' ? 'bg-success text-white' : 'bg-warning text-dark'} rounded-pill px-3 py-1 fw-bold small text-uppercase`}>
                                                        {enr.payment_status === 'paid' ? 'Active' : 'Unpaid'}
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="progress flex-grow-1 bg-light" style={{ height: "6px", borderRadius: "10px" }}>
                                                        <div className="progress-bar" role="progressbar" style={{ width: `${enr.progress}%`, backgroundColor: "var(--primary-color)", borderRadius: "10px" }}></div>
                                                    </div>
                                                    <span className="small fw-bold text-muted">{Math.round(enr.progress)}%</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex gap-2">
                                                        {enr.payment_status !== 'paid' ? (
                                                            <button className="btn text-white btn-sm fw-bold px-4 py-2 rounded-pill shadow-sm" style={{ backgroundColor: "var(--secondary-color)" }} onClick={() => handlePayment(enr.course_id)}>Pay Securely</button>
                                                        ) : (
                                                            <button className="btn btn-primary btn-sm fw-bold px-4 py-2 rounded-pill shadow-sm" onClick={() => navigate(`/lesson/${enr.course_slug}`)}>▶ Resume Lesson</button>
                                                        )}
                                                        <button className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-bold border-0 bg-light">Syllabus</button>
                                                    </div>
                                                    <button className="btn btn-link text-danger p-0 border-0 text-decoration-none fw-bold small" onClick={() => handleUnenroll(enr.id)}>Drop</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            <CertificateHub certificates={user.certificates || []} user={user} />
                        </div>
                        <div className="col-md-6">
                            <ProjectTracker 
                                projects={projects} 
                                onUpdateStatus={handleUpdateProject}
                                onDeleteProject={handleDeleteProject}
                                onOpenModal={() => setActiveModal('project')}
                            />
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            <ResourceVault 
                                notes={notes} 
                                onDeleteNote={handleDeleteNote}
                                onOpenModal={() => setActiveModal('note')}
                            />
                        </div>
                        <div className="col-md-6">
                            <ActivityFeed activityLogs={user.activity_logs || []} title="Learning Activity Feed" />
                        </div>
                    </div>
                    <div className="py-5"></div>
                </div>
            </div>
        </div>
    );
};

export default StudentView;
