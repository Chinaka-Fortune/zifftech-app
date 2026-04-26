import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillProficiency = ({ skills = {}, title = "Skill Proficiency" }) => {
    // Default labels if none provided (role fallback if backend is empty)
    const labels = Object.keys(skills).length > 0 ? Object.keys(skills) : ['Technical Core', 'Analytical Aptitude', 'Communication', 'Strategic Resolution', 'Efficiency'];
    const values = Object.values(skills).length > 0 ? Object.values(skills) : [80, 75, 40, 60, 30];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Current Proficiency',
                data: values,
                backgroundColor: 'rgba(57, 106, 187, 0.25)', // Primary branding blue
                borderColor: '#4069b3',
                borderWidth: 3,
                pointBackgroundColor: '#1e293b',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4069b3',
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: { 
                    display: true,
                    color: 'rgba(226, 232, 240, 0.5)'
                },
                grid: {
                    color: 'rgba(226, 232, 240, 0.8)'
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: { 
                    display: false,
                    stepSize: 20
                },
                pointLabels: {
                    font: {
                        size: 11,
                        weight: 'bold',
                        family: 'Inter, system-ui, sans-serif'
                    },
                    color: '#64748b'
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleFont: { size: 13, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 12,
                cornerRadius: 10,
                displayColors: false
            }
        },
        maintainAspectRatio: false
    };

    const averageProficiency = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white transition-all hover-shadow">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-light">
                <h5 className="fw-black mb-0 d-flex align-items-center" style={{ color: 'var(--primary-dark)' }}>
                    <i className="bi bi-shield-shaded me-2 text-primary"></i> {title}
                </h5>
                <span className="badge bg-primary-light text-primary rounded-pill px-3 py-2 fw-bold small">
                    {averageProficiency}% Aggregate
                </span>
            </div>
            
            <div style={{ height: '280px' }} className="position-relative">
                <Radar data={data} options={options} />
            </div>

            <div className="mt-4 pt-3 border-top border-light">
                <div className="d-flex justify-content-between small mb-2">
                    <span className="fw-bold text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Top Competency:</span>
                    <span className="fw-bold text-primary">{labels[values.indexOf(Math.max(...values))]}</span>
                </div>
                <div className="progress bg-light" style={{ height: '8px', borderRadius: '10px', overflow: 'hidden' }}>
                    <div 
                        className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                        style={{ width: `${Math.max(...values)}%`, transition: 'width 1s ease-in-out' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SkillProficiency;
