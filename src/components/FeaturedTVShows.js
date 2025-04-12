/**
 * FeaturedTVShows.js
 * 
 * This component fetches and displays a list of featured TV shows in a slider format.
 * It uses the `fetchFeaturedTVShows` API function to retrieve the data and stores it 
 * in the component's state. The TV shows are displayed using a slider from the `react-slick` 
 * library, allowing users to navigate through featured TV shows easily.
 * 
 * How it works:
 * - The component maintains a state variable `tvShows` to store the featured TV shows.
 * - It uses the `useEffect` hook to call the `loadTVShows` function when the component 
 *   mounts. This function fetches the featured TV shows asynchronously and updates the state.
 * - The TV shows are displayed in a slider format, with settings defined for autoplay, 
 *   number of slides to show, and responsiveness for smaller screens.
 * - Each slide includes the TV show's thumbnail, title, and a button to watch the show.
 */
import React, { useEffect, useState } from 'react';
import { fetchFeaturedTVShows } from '../api'; // Import the API function
import { Box, Card, CardMedia, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Import the slider component
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../styles/FeaturedTVShows.css'; // Import custom CSS for styling

const FeaturedTVShows = () => {
    const [tvShows, setTVShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTVShows = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedTVShows = await fetchFeaturedTVShows();
                if (!Array.isArray(fetchedTVShows)) {
                    throw new Error('Invalid data format received from server');
                }
                setTVShows(fetchedTVShows);
            } catch (error) {
                console.error('Error loading TV shows:', error);
                setError(error.message || 'Failed to load featured TV shows. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadTVShows();
    }, []);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 slides at a time
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 5000, // Change slides every 5 seconds
        centerMode: false, // Disable center mode
        centerPadding: '0px', // No padding for center mode
        responsive: [
            {
                breakpoint: 768, // Adjust for smaller screens
                settings: {
                    slidesToShow: 1, // Show 1 slide on small screens
                },
            },
        ],
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

    if (tvShows.length === 0) {
        return (
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">No featured TV shows available at the moment.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '70%' }}> {/* Adjusted width of the slider to make it smaller */}
                <Typography variant="h4" gutterBottom textAlign="center">
                    Featured TV Shows
                </Typography>
                <Slider {...settings}>
                    {tvShows.map((show) => (
                        <Card key={show.id} className="tv-show-card" sx={{ width: 'calc(33.33% - 20px)', height: 350, margin: '0 10px', position: 'relative' }}> {/* Set position relative for absolute positioning of content */}
                            <CardMedia
                                component="img"
                                height="250" // Set height for the image
                                image={show.largePosterUrl}
                                alt={show.title}
                                sx={{ objectFit: 'cover' }} // Ensure the image covers the area
                            />
                            <CardContent 
                                sx={{ 
                                    position: 'absolute', // Position content absolutely
                                    bottom: 0, // Align to the bottom of the card
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for better readability
                                    color: 'white',
                                    padding: '8px' // Padding for the content
                                }}
                            >
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                                    {show.title}
                                </Typography>
                                <Link to={{
                                    pathname: `/details/${show.id}`,
                                    state: { type: 'tvshow', id: show.id }
                                }}>
                                    <Button 
                                        size="small" 
                                        variant="contained" 
                                        color="primary"
                                    >
                                        Watch Now
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default FeaturedTVShows;