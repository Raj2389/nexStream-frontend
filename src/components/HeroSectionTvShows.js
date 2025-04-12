import React, { useEffect, useState } from 'react';
import { fetchFeaturedContentTvShows } from '../api';
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../styles/HeroSection.css';

const HeroSectionTvShows = () => {
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadContent = async () => {
            try {
                const fetchedContent = await fetchFeaturedContentTvShows();
                setContent(fetchedContent);
            } catch (error) {
                console.error('Error loading content:', error);
            }
        };

        loadContent();
    }, []);

    const handleWatchNow = (item) => {
        const itemId = item.id || item._id;
        console.log('Navigating to TV show details:', itemId);
        navigate(`/details/${itemId}`);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
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
                                <Typography 
                                    variant="h2" 
                                    component="h1" 
                                    gutterBottom
                                    sx={{ 
                                        fontWeight: 'bold',
                                        marginBottom: 3,
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography 
                                    variant="h5" 
                                    component="p" 
                                    sx={{ 
                                        maxWidth: '800px',
                                        marginBottom: 4,
                                        lineHeight: 1.6,
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
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
                                        padding: '12px 32px',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.2s'
                                        }
                                    }}
                                >
                                    Watch Now
                                </Button>
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