import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');  // Optional, based on your backend
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/signup/', {
                username: username,
                password: password,
                email: email  // Include this only if your backend requires it
            });
            console.log('Sign up successful:', response.data);
            alert('Account created successfully!');
            navigate('/login');  // Redirect to login page after successful signup
        } catch (error) {
            console.error('Failed to sign up:', error);
            alert('Sign up failed!');
        }
    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
