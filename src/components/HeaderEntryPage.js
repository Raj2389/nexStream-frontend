/**
 * Header.js
 * 
 * This component renders the header of the application, which includes the application 
 * title, navigation links to different pages (Home, Movies, TV Shows), and a search 
 * bar for users to search for content. The search functionality allows users to 
 * find movies and TV shows by name and opens the corresponding video link in a new tab.
 * 
 * How it works:
 * - The header contains a title and navigation buttons that link to different sections 
 *   of the application.
 * - A search bar allows users to input a search term, which is stored in the component's 
 *   state.
 * - When the search button is clicked, the `handleSearch` function is called, which 
 *   fetches search results and opens the video link of the first matching movie or TV show.
 */


import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, Box } from '@mui/material';
import '../styles/HeaderEntryPage.css'; // Import the CSS file
import Login from '../pages/LoginPage'; // Import the Login component
 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const HeaderEntryPage = () => {
    const [openLogin, setOpenLogin] = useState(false);

    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleClose = () => {
        setOpenLogin(false);
    };

    return (
        <AppBar position="fixed" className="header" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                {/* Title Only, aligned to the left */}
                <Typography variant="h6" className="header-title">
                    NexStream
                </Typography>
                <div style={{ marginLeft: 'auto' }}> {/* Push button to the right */}
                    <Button
                        sx={{
                            color: 'white',
                            backgroundColor: 'red',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            padding: '8px 16px', // Reduced padding for smaller size
                            fontSize: '0.875rem', // Slightly smaller font size
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'darkred',
                            },
                        }}
                        onClick={handleOpenLogin} // Open the login modal on click
                    >
                        Sign In
                    </Button>
                </div>
            </Toolbar>
            <Modal open={openLogin} onClose={handleClose}>
                <Box sx={style}>
                    <Login handleClose={handleClose} handleOpenRegister={() => {}} /> {/* Pass an empty function for handleOpenRegister */}
                </Box>
            </Modal>
        </AppBar>
    );
};

export default HeaderEntryPage;