import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000, 
    headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

// CSRF tokens
axiosInstance.defaults.xsrfCookieName = 'csrf';
axiosInstance.defaults.xsrfHeaderName = 'HTTP_X_CSRFTOKEN';

// CSRF token is sent with every request
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('csrf'); 
    console.log('CSRF Token:', token);
    if (token) {
        config.headers['HTTP_X_CSRFTOKEN'] = token;
    }
    return config;
});

export default axiosInstance;


