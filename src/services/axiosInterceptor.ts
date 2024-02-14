import axios from 'axios';

const axiosInstance = axios.create({});

// Default base URL
axiosInstance.defaults.baseURL = 'http://localhost:3000/';

// Request interceptor
axiosInstance.interceptors.request.use(config => {
    // add headers, authentication tokens, etc.
    return config;
}, error => {
    // Handle request errors
    return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    // Handle response errors
    return Promise.reject(error);
});

export default axiosInstance;
