import React, { useEffect, useState } from 'react';
import { fetchFeaturedContentTvShows } from '../api'; // Import the API function
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick'; // Import the slider component
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../styles/HeroSection.css'; // Import custom CSS for styling

const HeroSection = () => {
    const [content, setContent] = useState([]); // Store multiple movies or TV shows

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
                        <Box key={item.id} className="hero-slide" sx={{ height: '100vh' }}>
                            <img
                                src={item.largePosterUrl}
                                alt={item.title}
                                className="hero-background"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                            />
                            <Box className="hero-overlay" sx={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 4,
                            }}>
                                <Box sx={{ 
                                    maxWidth: '800px',
                                    textAlign: 'center',
                                    color: 'white',
                                }}>
                                    <Typography variant="h2" component="h1" gutterBottom sx={{ 
                                        fontSize: { xs: '2rem', md: '3rem' },
                                        fontWeight: 'bold',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                    }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="h5" component="p" gutterBottom sx={{ 
                                        fontSize: { xs: '1rem', md: '1.5rem' },
                                        maxWidth: '80%',
                                        margin: '0 auto',
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                    }}>
                                        {item.description}
                                    </Typography>
                                    <Link to={{
                                        pathname: `/details/${item.id}`,
                                        state: item
                                    }}>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            size="large"
                                            sx={{ 
                                                fontSize: '1.2rem',
                                                padding: '10px 30px',
                                                marginTop: 2,
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                                            }}
                                        >
                                            Watch Now
                                        </Button>
                                    </Link>
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