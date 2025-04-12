// src/components/Footer.js

import React from 'react';
import { Box, Typography } from '@mui/material'; // Import Material-UI components
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Footer = () => {
    return (
        <footer style={{ 
            backgroundColor: '#282c34', // Dark background color
            color: 'white', // Text color
            padding: '20px', // Padding around the footer
            position: 'relative', // Position relative for layout
            bottom: 0, // Align to the bottom
            width: '100%', // Full width
        }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                <Typography style={{ margin: 0 }}>
                    &copy; {new Date().getFullYear()} NexStream. All rights reserved.
                </Typography>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    margin: '10px 0' // Margin for spacing
                }}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ 
                        color: 'white', 
                        margin: '0 10px', 
                        fontSize: '24px' // Icon size
                    }}>
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ 
                        color: 'white', 
                        margin: '0 10px', 
                        fontSize: '24px' // Icon size
                    }}>
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ 
                        color: 'white', 
                        margin: '0 10px', 
                        fontSize: '24px' // Icon size
                    }}>
                        <i className="fab fa-instagram"></i>
                    </a>
                </Box>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <a href="/terms" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        margin: '0 5px' // Spacing for links
                    }}>
                        Terms of Service
                    </a>
                    <span style={{ margin: '0 5px' }}>|</span> {/* Separator */}
                    <a href="/privacy" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        margin: '0 5px' // Spacing for links
                    }}>
                        Privacy Policy
                    </a>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;