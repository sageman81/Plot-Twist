import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000, 
    headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
    }
});

// CSRF tokens
axiosInstance.defaults.xsrfCookieName = 'csrf';
axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken';

// CSRF token is sent with every request
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('csrf'); 
    console.log('CSRF Token:', token);
    if (token) {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
});

export default axiosInstance;


