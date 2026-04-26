import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { showSuccess } from '../../utils/sweetAlert';

const LessonPortal = () => {
    const { courseSlug } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState(null);

    const syllabus = useMemo(() => course?.lessons || [], [course?.lessons]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Fetch course details by slug
                const res = await axiosInstance.get(`/courses/${courseSlug}`);
                setCourse(res.data);
            } catch (err) {
                console.error("Failed to load course", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseSlug]);

    // Update active lesson when syllabus loads
    useEffect(() => {
        if (syllabus.length > 0 && !activeLesson) {
            setActiveLesson(syllabus[0]);
        }
    }, [syllabus, activeLesson]);

    if (loading) return <div className="text-center mt-5 pt-5">Loading Lesson Portal...</div>;

    if (!course) return (
        <div className="container mt-5 pt-5 text-center">
            <h2 className="text-danger fw-bold">Course Not Found</h2>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
    );

    const getEmbedUrl = (url) => {
        if (!url) return null;
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
            return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
        }
        if (url.includes('vimeo.com')) {
            const id = url.split('/').pop();
            return `https://player.vimeo.com/video/${id}?autoplay=1`;
        }
        return url;
    };

    return (
        <div className="container-fluid bg-light min-vh-100" style={{ marginTop: '75px', paddingBottom: '100px' }}>
            <div className="row g-0">
                {/* Main Content: Video/Lesson */}
                <div className="col-lg-8 p-4 p-md-5">
                    <div className="ps-4 border-start border-4 mb-4" style={{ borderColor: "var(--primary-color) !important" }}>
                        <h6 className="text-muted text-uppercase fw-black small mb-1" style={{ letterSpacing: '2px' }}>Now Learning</h6>
                        <h2 className="display-6 fw-black m-0" style={{ color: "var(--primary-dark)" }}>{activeLesson?.title || course.title}</h2>
                    </div>

                    {/* Dynamic Video Player */}
                    <div className="ratio ratio-16x9 bg-dark rounded-4 shadow-lg overflow-hidden position-relative mb-5" style={{ border: '2px solid rgba(255,255,255,0.05)' }}>
                        {course.has_access && activeLesson?.video_url ? (
                            <iframe 
                                src={getEmbedUrl(activeLesson.video_url)}
                                title={activeLesson.title}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center flex-column text-white p-4 text-center">
                                <i className={`bi ${!course.has_access ? 'bi-shield-lock-fill text-warning' : 'bi-play-circle-fill opacity-50'} display-1 mb-3`}></i>
                                <h4 className="fw-bold">{!course.has_access ? "Access Restricted" : "No Preview Available"}</h4>
                                <p className="text-white-50 px-md-5">{course.access_message || "Please join the live room for active mentorship."}</p>
                                {!course.has_access && (
                                    <div className="mt-4 d-flex gap-2">
                                        <button className="btn btn-primary rounded-pill px-4 fw-bold" onClick={() => navigate('/dashboard')}>
                                            Check Enrollment
                                        </button>
                                        {course.price > 0 && (
                                            <button className="btn btn-warning rounded-pill px-4 fw-bold" onClick={() => navigate('/dashboard')}>
                                                Pay for Program
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                        <h4 className="fw-bold mb-3">Lesson Strategy</h4>
                        <p className="text-muted lead">{activeLesson?.description || "In this session, we dive deep into the architectural patterns that power Ziffcode's high-performance platforms."}</p>
                        <div className="d-flex gap-3 mt-4">
                            <button className="btn btn-primary px-4 py-3 rounded-pill fw-bold shadow-lg" onClick={() => navigate(`/live/${courseSlug}`)}>
                                <i className="bi bi-camera-video-fill me-2"></i> Join Live Room Now
                            </button>
                            <button className="btn btn-outline-dark px-4 py-3 rounded-pill fw-bold" onClick={() => showSuccess("Downloading...", "Asset download has been initiated.")}>
                                <i className="bi bi-download me-2"></i> Download Assets
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Syllabus & Progress */}
                <div className="col-lg-4 p-4 p-md-5 bg-white shadow-sm border-start" style={{ minHeight: 'calc(100vh - 75px)' }}>
                    <h5 className="fw-black mb-4 pb-2 border-bottom">Course Curriculum</h5>
                    <div className="list-group list-group-flush gap-3">
                        {syllabus.map(item => (
                            <div 
                                key={item.id} 
                                className={`list-group-item border-0 p-3 rounded-4 d-flex align-items-center gap-3 transition-all cursor-pointer ${item.is_completed ? 'bg-success bg-opacity-10' : 'bg-light hover-bg-light shadow-sm'} ${activeLesson?.id === item.id ? 'border border-primary border-2 shadow' : ''}`}
                                onClick={() => setActiveLesson(item)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={`d-center rounded-circle flex-shrink-0`} style={{ width: '35px', height: '35px', backgroundColor: item.is_completed ? 'var(--success-color)' : (activeLesson?.id === item.id ? 'var(--primary-dark)' : 'var(--primary-color)'), color: 'white' }}>
                                    {item.is_completed ? <i className="bi bi-check-lg"></i> : item.order}
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="fw-bold mb-0 small">{item.title}</h6>
                                    <small className="text-muted">{item.duration}</small>
                                </div>
                                {activeLesson?.id === item.id ? (
                                    <i className="bi bi-play-circle-fill text-primary fs-4"></i>
                                ) : (
                                    !item.is_completed && <i className="bi bi-play-circle text-primary fs-5"></i>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="card mt-5 border-0 bg-primary bg-opacity-10 p-4 rounded-4 shadow-sm">
                        <h6 className="fw-bold text-primary mb-2">Need Help?</h6>
                        <p className="small text-dark-emphasis mb-3">Our mentors are available for 1-on-1 sessions if you're stuck on this module.</p>
                        <button className="btn btn-sm btn-primary rounded-pill fw-bold" onClick={() => navigate('/dashboard')}>Contact Mentor</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonPortal;
