import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { showError } from '../../utils/sweetAlert';

const GlobalHub = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Discussion', is_public: false });
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await axiosInstance.get('/interaction/hub/posts');
            setPosts(res.data);
        } catch (err) {
            console.error("Failed to load hub posts", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/interaction/hub/posts', newPost);
            setPosts([res.data.post, ...posts]);
            setNewPost({ title: '', content: '', category: 'Discussion', is_public: false });
        } catch (err) {
            showError("Posting Failed", "Failed to create post");
        }
    };

    return (
        <div className="container-fluid p-0 fade-in-up">
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
                        <h4 className="fw-black mb-4">🏛️ Ziffcode Global Hub</h4>
                        <form onSubmit={handleCreatePost} className="p-4 p-md-5 rounded-4 mb-5 border shadow-sm bg-light">
                            <h6 className="fw-black mb-3 text-uppercase small d-flex align-items-center" style={{ letterSpacing: '1px', color: 'var(--primary-dark)' }}>
                                <i className="bi bi-megaphone-fill me-2 fs-5 text-primary"></i> 
                                Share an update, feedback, or announcement
                            </h6>
                            <input 
                                className="form-control border rounded-3 mb-3 px-4 py-3 shadow-sm bg-white text-dark fw-bold"
                                placeholder="Post Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                required
                            />
                            <textarea 
                                className="form-control border rounded-4 mb-3 px-4 py-3 shadow-sm bg-white text-dark"
                                rows="4"
                                placeholder="What's on your mind?..."
                                value={newPost.content}
                                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                required
                                style={{ resize: 'none' }}
                            ></textarea>
                            <div className="d-flex flex-wrap gap-4 justify-content-between align-items-center">
                                <div className="d-flex flex-wrap gap-4 align-items-center">
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '1px' }}>Category</label>
                                        <select 
                                            className="form-select border rounded-pill px-4 py-2 shadow-sm bg-white text-dark fw-bold"
                                            value={newPost.category}
                                            onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                                        >
                                            <option value="Discussion">Discussion</option>
                                            <option value="Feedback">Feedback</option>
                                            <option value="Announcement">Announcement</option>
                                        </select>
                                    </div>
                                    <div className="form-check form-switch cursor-pointer mb-0 d-flex align-items-center gap-2">
                                        <input 
                                            className="form-check-input m-0 cursor-pointer shadow-sm border-0" 
                                            type="checkbox" 
                                            role="switch" 
                                            id="publicSwitch"
                                            checked={newPost.is_public}
                                            onChange={(e) => setNewPost({...newPost, is_public: e.target.checked})}
                                        />
                                        <label className="form-check-label small fw-bold text-dark m-0 cursor-pointer" htmlFor="publicSwitch">Public View</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm">Post to Hub</button>
                            </div>
                        </form>

                        <div className="hub-feed">
                            {loading ? (
                                <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                            ) : posts.length === 0 ? (
                                <div className="text-center py-5 text-muted fw-bold">No hub posts yet. Be the first to share!</div>
                            ) : posts.map(post => (
                                <div key={post.id} className="card border-0 shadow-sm rounded-4 mb-4 bg-white overflow-hidden hover-lift border-start border-4" style={{ borderColor: post.category === 'Announcement' ? 'var(--primary-color)' : post.category === 'Feedback' ? 'var(--secondary-color)' : '#eee' }}>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge rounded-pill bg-light text-primary fw-bold small text-uppercase">{post.category}</span>
                                            <small className="text-muted">{new Date(post.created_at).toLocaleDateString()}</small>
                                        </div>
                                        <h5 className="fw-black mb-2">{post.title}</h5>
                                        <p className="text-dark mb-3" style={{ lineHeight: '1.6' }}>{post.content}</p>
                                        <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                                            <div className="d-flex gap-3">
                                                <button className="btn btn-link text-muted p-0 text-decoration-none small fw-bold"><i className="bi bi-chat-dots me-2"></i>{post.comments_count} Comments</button>
                                                <button className="btn btn-link text-muted p-0 text-decoration-none small fw-bold"><i className="bi bi-heart me-2"></i>React</button>
                                            </div>
                                            {post.is_public && <span className="badge bg-success-subtle text-success small fw-bold border border-success-subtle">🌍 Public</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-4 p-4 bg-primary text-white h-100">
                        <h5 className="fw-black mb-4">Hub Impact</h5>
                        <p className="small opacity-75 mb-4">The Ziffcode Global Hub is our central point for strategic interaction. Your feedback directly shapes our innovative timeline.</p>
                        <ul className="list-unstyled d-flex flex-column gap-3 small fw-bold">
                            <li>🚀 Real-time Announcements</li>
                            <li>💡 Open Feedback Loops</li>
                            <li>🤝 Collaborative Discussions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalHub;
