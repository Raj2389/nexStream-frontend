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

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/LoginPage.css'; // Reuse the CSS file from the login page for consistent styling

const RegistrationPage = ({ handleOpenLogin }) => { // Accept handleOpenLogin as a prop
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        // Here you can add your registration logic (e.g., API call)

        // After successful registration, navigate to the home page
        navigate('/home'); // Change '/home' to your actual home route if different
    };

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}> {/* Attach handleSubmit to the form */}
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            <p className="or-text">OR</p>
            <p className="existing-user">
                Already a user? <span onClick={handleOpenLogin} style={{ cursor: 'pointer', color: 'blue' }}>Click here</span> {/* Call handleOpenLogin on click */}
            </p>
        </div>
    );
};

export default RegistrationPage;