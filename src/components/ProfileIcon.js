/**
 * ProfileIcon.js
 * 
 * This component renders a profile icon that opens a menu when clicked. 
 * The menu contains options for the user, such as logging out. 
 * It uses Material-UI components for styling and functionality.
 * 
 * How it works:
 * - The component maintains a state variable `anchorEl` to manage the menu's 
 *   visibility. When the icon is clicked, the menu opens, and when an option 
 *   is selected or the menu is closed, it updates the state accordingly.
 * - The `handleLogout` function navigates the user to the home page (or login 
 *   route) when the logout option is selected.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the profile icon

const ProfileIcon = () => {
    const [anchorEl, setAnchorEl] = useState(null); // State to manage the menu
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); // Open the menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleProfile = () => {
        navigate('/dashboard');
        handleClose();
    };

    const handleLogout = () => {
        navigate('/'); // Change to your actual login route
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleClick} color="inherit"> {/* Set color to inherit for white color */}
                <AccountCircleIcon fontSize="large" /> {/* Profile icon */}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileIcon;