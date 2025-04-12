/**
 * LoginPage.js
 * 
 * This component renders the login form for users to sign in to their account. 
 * It includes fields for the email address and password, as well as options 
 * for signing up and recovering a forgotten password.
 * 
 * How it works:
 * - The component receives props for closing the modal, opening the registration 
 *   modal, and the user's email address.
 * - It maintains a state variable for the password input.
 * - When the form is submitted, it prevents the default behavior and can include 
 *   logic for authenticating the user (e.g., API call).
 * - Upon successful login, the user is navigated to the home page.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/LoginPage.css'; // Import the CSS file
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon from Material-UI

const Login = ({ handleClose, handleOpenRegister }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        // Here you can add your login logic (e.g., API call)

        // After successful login, navigate to the home page
        navigate('/home'); // Change '/home' to your actual home route if different
    };

    return (
        <div className="login-container">
            <CloseIcon 
                onClick={handleClose} 
                className="close-icon" 
                style={{ cursor: 'pointer', position: 'absolute', top: '10px', left: '10px' }} 
            />
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}> {/* Attach handleSubmit to the form */}
                <input type="email" placeholder="Email Address" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign In</button>
            </form>
            <p className="or-text">OR</p>
            <p className="forgot-password">Forgot password?</p>
            <p className="signup-text">
                New to Netflix? <span onClick={handleOpenRegister} style={{ cursor: 'pointer', color: 'blue' }}>Sign up now.</span> {/* Call handleOpenRegister on click */}
            </p>
        </div>
    );
};

export default Login;