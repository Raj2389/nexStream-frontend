/**
 * RegistrationPage.js
 * 
 * This component renders the registration form for new users to create an account. 
 * It includes fields for the user's name, email address, and password.
 * 
 * How it works:
 * - The component receives props for opening the login modal and the user's email address.
 * - It maintains state variables for the name and password inputs.
 * - When the form is submitted, it prevents the default behavior and can include 
 *   logic for registering the user (e.g., API call).
 * - Upon successful registration, the user is navigated to the home page.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { registerUser } from '../api';
import '../styles/LoginPage.css'; // Reuse the CSS file from the login page for consistent styling

const RegistrationPage = ({ handleOpenLogin, handleClose }) => { // Add handleClose prop
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        setError('');
        
        try {
            await registerUser(formData);
            navigate('/home');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    const handleForgotPassword = () => {
        // Navigate to forgot password page or show forgot password modal
        navigate('/forgot-password');
    };

    return (
        <div className="login-container">
            <div 
                onClick={handleClose} 
                className="close-button"
                style={{ 
                    cursor: 'pointer', 
                    position: 'absolute', 
                    top: '10px', 
                    left: '10px',
                    width: '24px',
                    height: '24px'
                }}
            >
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: '100%' }}
                >
                    <path 
                        d="M18 6L6 18M6 6l12 12" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <h2>Register</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}> {/* Attach handleSubmit to the form */}
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p className="or-text">OR</p>
            <p className="forgot-password">
                <span onClick={handleForgotPassword} style={{ cursor: 'pointer', color: 'blue' }}>Forgot Password?</span>
            </p>
            <p className="existing-user">
                Already a user? <span onClick={handleOpenLogin} style={{ cursor: 'pointer', color: 'blue' }}>Click here</span> {/* Call handleOpenLogin on click */}
            </p>
        </div>
    );
};

export default RegistrationPage;