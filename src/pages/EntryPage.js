// src/pages/EntryPage.js

/**
 * EntryPage.js
 * 
 * This component serves as the entry point for the application, providing users 
 * with an introduction to the service and options to log in or register. 
 * It features a header, a promotional message, and modals for login and 
 * registration.
 * 
 * How it works:
 * - The component maintains state variables to control the visibility of the 
 *   login and registration modals.
 * - When the "Get Started" button is clicked, the login modal opens, allowing 
 *   users to enter their credentials.
 * - The content below the modal is hidden when the modal is open.
 */

import React, { useState } from 'react'; // Import React and useState hook
import HeaderEntryPage from '../components/HeaderEntryPage'; // Import the header component
import '../styles/EntryPage.css'; // Import the CSS file for styling
import { Modal, Box } from '@mui/material'; // Import Material-UI components
import Login from '../pages/LoginPage'; // Import the Login component
import RegistrationPage from '../pages/RegistrationPage'; // Import the Registration component
import backgroundImage from '../assets/background.jpg'; // Import the background image

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Make modal width responsive
    maxWidth: 400, // Set a maximum width for larger screens
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const EntryPage = () => {
    const [openLogin, setOpenLogin] = useState(false); // State to manage login modal visibility
    const [openRegister, setOpenRegister] = useState(false); // State to manage registration modal visibility

    const handleOpenLogin = () => {
        setOpenLogin(true); // Open the login modal
        setOpenRegister(false); // Close registration modal if open
    };

    const handleClose = () => {
        setOpenLogin(false); // Close the login modal
        setOpenRegister(false); // Close the registration modal
    };

    return (
        <div className="entry-page" style={{ 
            backgroundImage: `url(${backgroundImage})`, // Set the background image
            backgroundSize: 'cover', // Cover the entire area
            minHeight: '100vh', // Full height
            color: 'white', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center' 
        }}>
            <HeaderEntryPage handleOpen={handleOpenLogin} /> {/* Pass handleOpen to HeaderEntryPage */}
            {/* Conditionally render the content based on modal visibility */}
            {!openLogin && !openRegister && ( // Only show this content if neither modal is open
                <div className="entry-content" style={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
                    <h1 style={{ fontSize: '2.5rem', margin: '0.5em 0' }}>
                        Unlimited movies,<br /> TV shows, and more.
                    </h1>
                    <p style={{ fontSize: '1.2rem' }}>Starts at $7.99. Cancel anytime.</p>
                    <p style={{ fontSize: '1rem' }}>Ready to watch? Enter your email to create or restart your membership.</p>
                    <div className="email-signup" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input type="email" placeholder="Email address" className="email-input" style={{ padding: '10px', width: '80%', marginBottom: '10px' }} />
                        <button className="sign-in-button" onClick={handleOpenLogin} style={{ padding: '10px 20px', fontSize: '1rem' }}>Get Started</button> {/* Open login modal on click */}
                    </div>
                </div>
            )}
            <Modal open={openLogin} onClose={handleClose}>
                <Box sx={style}>
                    <Login handleClose={handleClose} handleOpenRegister={() => setOpenRegister(true)} /> {/* Pass handleOpenRegister to Login */}
                </Box>
            </Modal>
            <Modal open={openRegister} onClose={handleClose}>
                <Box sx={style}>
                    <RegistrationPage handleOpenLogin={handleOpenLogin} /> {/* Pass handleOpenLogin to RegistrationPage */}
                </Box>
            </Modal>
        </div>
    );
};

export default EntryPage; // Export the EntryPage component