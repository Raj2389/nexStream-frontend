/**
 * HomePage.js
 * 
 * This component serves as the main landing page for the application. 
 * It includes the header, a hero section, and displays featured movies 
 * and TV shows, as well as lists of all movies and TV shows.
 * 
 * How it works:
 * - The component uses Material-UI's Box component for layout and styling.
 * - It renders the Header component at the top of the page.
 * - Below the header, it includes the HeroSection, which showcases featured content.
 * - It then displays sections for featured movies and TV shows, followed by 
 *   lists of all movies and TV shows.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedMovies, fetchFeaturedTVShows } from '../api';
import '../styles/HomePage.css';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection'; // Import the HeroSection component
import FeaturedMovies from '../components/FeaturedMovies'; // Import the FeaturedMovies component
import FeaturedTVShows from '../components/FeaturedTVShows'; // Import the FeaturedTVShows component
import AllMovies from '../components/AllMovies'; // Import the AllMovies component
import AllTVShows from '../components/AllTVShows'; // Import the AllTVShows component

import { Box } from '@mui/material'; // Import Box from Material-UI for layout

const HomePage = () => {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [featuredTVShows, setFeaturedTVShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFeaturedContent = async () => {
            try {
                setLoading(true);
                const [movies, tvShows] = await Promise.all([
                    fetchFeaturedMovies(),
                    fetchFeaturedTVShows()
                ]);
                setFeaturedMovies(movies);
                setFeaturedTVShows(tvShows);
                setError(null);
            } catch (err) {
                setError('Failed to load featured content. Please try again later.');
                console.error('Error loading featured content:', err);
            } finally {
                setLoading(false);
            }
        };

        loadFeaturedContent();
    }, []);

    if (loading) {
        return <div className="loading">Loading featured content...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <Box sx={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ flex: '1' }}> {/* Allow HeroSection and other components to take available space */}
                <HeroSection />
                <FeaturedMovies />
                <FeaturedTVShows />
                <AllMovies /> 
                <AllTVShows /> 
            </Box>
        </Box>
    );
};

export default HomePage;