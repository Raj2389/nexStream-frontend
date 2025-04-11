import React, { useEffect, useState } from 'react';
import { fetchFeaturedContentTvShows } from '../api'; // Import the API function
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick'; // Import the slider component
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../styles/HeroSection.css'; // Import custom CSS for styling

const HeroSectionTvShows = () => {
    const [content, setContent] = useState([]); // Store multiple TV shows

    useEffect(() => {
        const loadContent = async () => {
            try {
                const fetchedContent = await fetchFeaturedContentTvShows(); // Fetch featured TV shows
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
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="hero-background"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                            />
                            <Box className="hero-overlay" sx={{ 
                                position: 'relative', 
                                zIndex: 1, 
                                textAlign: 'center', 
                                padding: 2, 
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                                color: 'white' 
                            }}>
                                <Typography variant="h2" component="h1" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="h5" component="p" gutterBottom>
                                    {item.description}
                                </Typography>
                                <Link to={{
                                    pathname: `/details/${item.id}`, // Correct path to the Details page
                                    state: item // Pass the entire item as state
                                }}>
                                    <Button variant="contained" color="primary">
                                        Watch Now
                                    </Button>
                                </Link>
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

export default HeroSectionTvShows;