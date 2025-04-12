/**
 * FeaturedMovies.js
 * 
 * This component fetches and displays a list of featured movies in a slider format.
 * It uses the `fetchFeaturedMovies` API function to retrieve the data and stores it 
 * in the component's state. The movies are displayed using a slider from the `react-slick` 
 * library, allowing users to navigate through featured movies easily.
 * 
 * How it works:
 * - The component maintains a state variable `movies` to store the featured movies.
 * - It uses the `useEffect` hook to call the `loadMovies` function when the component 
 *   mounts. This function fetches the featured movies asynchronously and updates the state.
 * - The movies are displayed in a slider format, with settings defined for autoplay, 
 *   number of slides to show, and responsiveness for smaller screens.
 * - Each slide includes the movie's thumbnail, title, and a button to watch the movie.
 */

import React, { useEffect, useState } from 'react';
import { fetchFeaturedMovies } from '../api'; // Import the API function
import { Box, Card, CardMedia, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Import the slider component
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../styles/FeaturedMovies.css'; // Import custom CSS for styling

const FeaturedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedMovies = await fetchFeaturedMovies();
                if (!Array.isArray(fetchedMovies)) {
                    throw new Error('Invalid data format received from server');
                }
                setMovies(fetchedMovies);
            } catch (error) {
                console.error('Error loading movies:', error);
                setError(error.message || 'Failed to load featured movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
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

    if (movies.length === 0) {
        return (
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">No featured movies available at the moment.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '70%' }}> {/* Adjusted width of the slider to make it smaller */}
                <Typography variant="h4" gutterBottom textAlign="center">
                    Featured Movies
                </Typography>
                <Slider {...settings}>
                    {movies.map((movie) => (
                        <Card key={movie.id} className="movie-card" sx={{ width: 'calc(33.33% - 20px)', height: 350, margin: '0 10px', position: 'relative' }}> {/* Adjust width to fit 3 cards */}
                            <CardMedia
                                component="img"
                                height="250" // Set height for the image
                                image={movie.largePosterUrl}
                                alt={movie.title}
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
                                    {movie.title}
                                </Typography>
                                <Link to={{
                                    pathname: `/details/${movie.id}`,
                                    state: { type: 'movie' }
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

export default FeaturedMovies;