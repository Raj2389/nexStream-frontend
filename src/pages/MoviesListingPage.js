/**
 * MoviesListingPage.js
 * 
 * This component displays a list of all movies available in the application. 
 * It includes a header, a hero section, and a featured movies section, 
 * followed by a grid layout of all movies.
 * 
 * How it works:
 * - The component fetches the list of movies from an API and stores them in 
 *   the component's state.
 * - It uses Material-UI components for layout and styling, including a grid 
 *   to display the movies.
 * - Each movie is displayed in a card format, with a thumbnail, title, and 
 *   a button to watch the movie.
 */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Import the Header component
import HeroSectionMovies from '../components/HeroSectionMovies'; // Import the HeroSection component
import FeaturedMovies from '../components/FeaturedMovies'; // Import the FeaturedMovies component
import AllMovies from '../components/AllMovies'; // Import the AllMovies component
import { fetchMovies } from '../api'; // Import the API function
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material'; // Import Material-UI components
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const MoviesListingPage = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const fetchedMovies = await fetchMovies(); // Fetch movies
                setMovies(fetchedMovies); // Set the fetched movies
            } catch (error) {
                console.error('Error loading movies:', error);
            }
        };

        loadMovies();
    }, []);

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}> {/* Set background color to black */}
            <Header /> {/* Render the Header component */}
            <HeroSectionMovies /> {/* Render the HeroSection component */}
            <FeaturedMovies /> {/* Render the FeaturedMovies component */}
            <AllMovies />
        </div>
    );
};

export default MoviesListingPage;