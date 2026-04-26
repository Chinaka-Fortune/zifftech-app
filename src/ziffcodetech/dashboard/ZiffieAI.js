import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const ZiffieAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hi! I'm Ziffie, your lead architecture mentor. How can I accelerate your proficiency today?" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isThinking]);

    const handleSend = async (e, retryInput) => {
        if (e) e.preventDefault();
        const finalInput = retryInput || input;
        if (!finalInput.trim() || isThinking) return;
        
        // 1. Atomic Synchronous State Update
        const userMsg = { role: 'user', text: finalInput };
        const aiMsg = { role: 'ai', text: "" };
        
        if (retryInput) {
            // If retry, we only need to add a new empty AI message
            setMessages(prev => [...prev, aiMsg]);
        } else {
            // New interaction: add both user and thinking AI messages
            setMessages(prev => [...prev, userMsg, aiMsg]);
            setInput("");
        }
        
        setIsThinking(true);
        
        try {
            const token = localStorage.getItem('token');
            // Prioritize environment variable, then window location, then localhost fallback
            const envURL = process.env.REACT_APP_API_URL;
            const baseURL = envURL || `${window.location.protocol}//${window.location.hostname}:5000/api/`;
            const fetchURL = `${baseURL.endsWith('/') ? baseURL : baseURL + '/'}ai/ask`;
            
            const response = await fetch(fetchURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt: finalInput })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Signal loss: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedtext = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.trim().startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.trim().slice(6));
                            if (data.error) {
                                throw new Error(data.reply);
                            }
                            if (data.chunk) {
                                accumulatedtext += data.chunk;
                                const currentText = accumulatedtext;
                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    const last = newMsgs[newMsgs.length - 1];
                                    if (last && last.role === 'ai') {
                                        last.text = currentText;
                                    }
                                    return newMsgs;
                                });
                            }
                        } catch (parseError) {
                            // Suppress heartbeat noise
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Ziffie Sync Error:", err);
            setMessages(prev => {
                const newMsgs = [...prev];
                const last = newMsgs[newMsgs.length - 1];
                if (last && last.role === 'ai') {
                    last.text = "I'm experiencing a momentary synchronization bottleneck with the Ziff-Mainframe. Rest assured, I am resolving it. Please restate your query.";
                }
                return newMsgs;
            });
        } finally {
            setIsThinking(false);
        }
    };

    const isBottleneck = (text) => text && text.includes("synchronization bottleneck");

    return (
        <div className="position-fixed bottom-0 end-0 m-4 z-3" style={{ maxWidth: '380px' }}>
            {isOpen ? (
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden fade-in-up" style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)' }}>
                    <div className="card-header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                             <div className="bg-white rounded-circle d-center shadow-sm" style={{ width: '32px', height: '32px', fontSize: '1.2rem' }}>🤖</div>
                             <div>
                                <span className="fw-black d-block lh-1 small">Ziffie Intelligence</span>
                                <small className="opacity-75" style={{ fontSize: '0.7rem' }}>{isThinking ? 'Thinking...' : 'Online'}</small>
                             </div>
                        </div>
                        <button className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
                    </div>
                    <div className="card-body p-3 bg-light overflow-auto" style={{ height: '380px' }}>
                        {messages.map((m, i) => (
                            <div key={i} className={`mb-3 d-flex flex-column ${m.role === 'user' ? 'align-items-end' : 'align-items-start'}`}>
                                {(m.text || m.role === 'ai') && (
                                    <div className={`p-3 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white text-dark shadow-sm'}`} 
                                         style={{ 
                                            maxWidth: '88%', 
                                            borderRadius: m.role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                            lineHeight: '1.5',
                                            minHeight: m.role === 'ai' && !m.text && isThinking ? '40px' : 'auto'
                                        }}>
                                        {m.role === 'ai' ? (
                                            <>
                                                {m.text ? (
                                                    <>
                                                        <ReactMarkdown className="markdown-content">{m.text}</ReactMarkdown>
                                                        {isBottleneck(m.text) && (
                                                            <button 
                                                                className="btn btn-warning btn-sm w-100 mt-2 fw-bold rounded-pill" 
                                                                onClick={() => handleSend(null, messages[i-1]?.text)}
                                                            >
                                                                <i className="bi bi-arrow-clockwise me-1"></i> Tactical Retry
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    isThinking && (
                                                        <div className="d-flex gap-2 align-items-center">
                                                            <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
                                                            <span className="text-muted small fw-bold">Thinking...</span>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            m.text
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="card-footer p-2 border-0 shadow-lg" style={{ backgroundColor: '#020617' }}>
                        <form onSubmit={(e) => handleSend(e)} className="d-flex gap-2">
                            <input 
                                type="text" 
                                className="form-control border-0 text-white rounded-pill px-3 shadow-none" 
                                style={{ backgroundColor: '#0f172a', border: '1px solid rgba(59, 130, 246, 0.4)', fontSize: '0.9rem' }}
                                placeholder="Ask a question..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary rounded-circle d-center shadow-sm" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-send-fill text-white"></i>
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <button 
                    className="btn btn-primary rounded-circle shadow-lg d-center pulse-effect border-0" 
                    style={{ width: '65px', height: '65px', fontSize: '2rem' }}
                    onClick={() => setIsOpen(true)}
                >
                    🤖
                </button>
            )}
        </div>
    );
};

export default ZiffieAI;
