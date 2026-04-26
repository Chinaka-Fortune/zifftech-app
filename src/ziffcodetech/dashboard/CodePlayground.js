import React, { useState, useEffect } from 'react';

const CodePlayground = () => {
    const [html, setHtml] = useState('<h1>Hello Ziffcode!</h1>\n<p>Start coding to see magic happen.</p>');
    const [css] = useState('h1 { color: #041E42; }\np { font-family: sans-serif; }');
    const [js] = useState('console.log("Welcome to Ziffcode Playground");');
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5" style={{ backgroundColor: '#020617' }}>
            <div className="card-header border-bottom border-secondary border-opacity-25 p-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#020617' }}>
                <div className="d-flex align-items-center gap-2">
                    <span className="text-primary fs-4"><i className="bi bi-cpu-fill"></i></span>
                    <h5 className="text-white fw-black mb-0" style={{ letterSpacing: '1px' }}>Ziff-Integrated Dev Environment</h5>
                </div>
                <div className="d-flex gap-2">
                    <div className="rounded-circle bg-danger" style={{ width: '12px', height: '12px', opacity: 0.8 }}></div>
                    <div className="rounded-circle bg-warning" style={{ width: '12px', height: '12px', opacity: 0.8 }}></div>
                    <div className="rounded-circle bg-success" style={{ width: '12px', height: '12px', opacity: 0.8 }}></div>
                </div>
            </div>
            <div className="card-body p-0">
                <div className="row g-0" style={{ height: '450px' }}>
                    <div className="col-md-6 border-end border-secondary border-opacity-25 d-flex flex-column">
                        <div className="bg-primary bg-opacity-10 text-primary px-3 py-2 small fw-black border-bottom border-secondary border-opacity-10">TACTICAL_EDITOR.sh</div>
                        <textarea 
                            className="form-control text-info border-0 flex-grow-1 p-4 font-monospace shadow-none"
                            style={{ backgroundColor: '#0f172a', resize: 'none', outline: 'none', fontSize: '0.9rem', color: '#38bdf8 !important' }}
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            spellCheck="false"
                            placeholder="Initialize your architecture here..."
                        ></textarea>
                    </div>
                    <div className="col-md-6 d-flex flex-column bg-white">
                        <div className="bg-light text-dark px-3 py-2 small fw-black border-bottom" style={{ letterSpacing: '1px' }}>LIVE_DEPLOYMENT_VIEW</div>
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            className="flex-grow-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodePlayground;
