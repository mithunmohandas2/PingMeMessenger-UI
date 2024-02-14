import axios from 'axios';
import toast from 'react-hot-toast';
const baseUrlAPI = import.meta.env.VITE_APP_BASE_URL_API

const axiosInstance = axios.create({});

// Default base URL
axiosInstance.defaults.baseURL = baseUrlAPI;

// -------------REQUESTS---------------
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');    // Check if a token exists in local storage
    if (token) {
        // If token exists, set it as an Authorization header
        config.headers.Authorization = `${token}`;
    }
    return config;
}, error => {
    // Handle request errors
    return Promise.reject(error);
});


// ------------RESPONSE------------
axiosInstance.interceptors.response.use(response => {
    return response;
},
    error => {
        // Check for specific error status codes or other conditions
        console.error('Error:', error.response?.data?.message || error.message || error.response?.data?.data?.message );  // Other Errors
        return toast.error(error.response?.data?.message || error.message || error.response?.data?.data?.message)
    });

export default axiosInstance;
