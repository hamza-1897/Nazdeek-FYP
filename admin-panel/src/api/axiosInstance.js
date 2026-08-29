import axios from 'axios';

const API = axios.create({
   // baseURL: 'https://nazdeek-fyp.onrender.com/api', 
    
    withCredentials: true
});

API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized. Redirecting to login...");
            sessionStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default API;