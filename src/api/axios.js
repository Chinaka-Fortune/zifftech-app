import axios from 'axios';

// Pointing to Flask development server
const baseURL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api/';

const axiosInstance = axios.create({
    baseURL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Global response interceptor to catch 401 Unauthorized (Expired Tokens)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token is expired or invalid
            localStorage.removeItem('token');
            // Redirect to login if not already there
            if (window.location.pathname !== '/logIn') {
                window.location.href = '/logIn';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
