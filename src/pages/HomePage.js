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
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection'; // Import the HeroSection component
import FeaturedMovies from '../components/FeaturedMovies'; // Import the FeaturedMovies component
import FeaturedTVShows from '../components/FeaturedTVShows'; // Import the FeaturedTVShows component
import AllMovies from '../components/AllMovies'; // Import the AllMovies component
import AllTVShows from '../components/AllTVShows'; // Import the AllTVShows component

import { Box } from '@mui/material'; // Import Box from Material-UI for layout

const HomePage = () => {
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