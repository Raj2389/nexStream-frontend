import React, { useEffect, useState } from 'react';
import { fetchFeaturedContentTvShows } from '../api'; // Import the API function
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick'; // Import the slider component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../styles/HeroSection.css'; // Import custom CSS for styling

const HeroSection = () => {
    const [content, setContent] = useState([]); // Store multiple movies or TV shows
    const navigate = useNavigate();

    useEffect(() => {
        const loadContent = async () => {
            try {
                const fetchedContent = await fetchFeaturedContentTvShows(); // Fetch featured movies and TV shows
                setContent(fetchedContent); // Set the fetched content
            } catch (error) {
                console.error('Error loading content:', error);
            }
        };

        loadContent();
    }, []);

    const handleWatchNow = (item) => {
        const itemId = item.id || item._id;
        console.log('Navigating to details:', itemId);
        navigate(`/details/${itemId}`);
    };

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Change slides every 3 seconds
        fade: true, // Optional: Add fade effect between slides
    };

    return (
        <Box className="hero-section" sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {content.length > 0 ? (
                <Slider {...settings}>
                    {content.map((item) => (
                        <Box key={item._id} className="hero-slide" sx={{ height: '100vh' }}>
                            <img
                                src={item.largePosterUrl}
                                alt={item.title}
                                className="hero-background"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                            />
                            <Box className="hero-overlay" sx={{ 
                                position: 'relative', 
                                zIndex: 1, 
                                textAlign: 'center', 
                                padding: 4,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                                color: 'white',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Box sx={{ 
                                    maxWidth: '800px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 3
                                }}>
                                    <Typography 
                                        variant="h2" 
                                        component="h1" 
                                        sx={{ 
                                            fontWeight: 'bold',
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography 
                                        variant="h5" 
                                        component="p" 
                                        sx={{ 
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        size="large"
                                        onClick={() => handleWatchNow(item)}
                                        sx={{ 
                                            padding: '16px 40px',
                                            fontSize: '1.25rem',
                                            fontWeight: 'bold',
                                            borderRadius: '30px',
                                            textTransform: 'none',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s',
                                                boxShadow: '0 6px 12px rgba(0,0,0,0.4)'
                                            }
                                        }}
                                    >
                                        Watch Now
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            ) : (
                <Typography variant="h5">Loading content...</Typography>
            )}
        </Box>
    );
};

export default HeroSection;