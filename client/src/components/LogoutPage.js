import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                
                await axios.post('http://localhost:8000/api/logout/', {}, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                console.log('Logged out successfully');
            } catch (error) {
                console.error('Failed to log out:', error);
            }
            
            localStorage.removeItem('token');
            // Redirect to the home page or login page
            navigate('/');
        };

        performLogout();
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default LogoutPage;

