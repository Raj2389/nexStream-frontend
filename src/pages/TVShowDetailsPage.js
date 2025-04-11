/**
 * TVShowDetailsPage.js
 * 
 * This component displays a list of all TV shows available in the application. 
 * It includes a header, a hero section, and a featured TV shows section, 
 * followed by a grid layout of all TV shows.
 * 
 * How it works:
 * - The component fetches the list of TV shows from an API and stores them in 
 *   the component's state.
 * - It uses Material-UI components for layout and styling, including a grid 
 *   to display the TV shows.
 * - Each TV show is displayed in a card format, with a thumbnail, title, and 
 *   a button to watch the show.
 */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Import the Header component
import { fetchTVShows } from '../api'; // Import the API function
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material'; // Import Material-UI components
import FeaturedTVShows from '../components/FeaturedTVShows'; // Import the FeaturedTVShows component
import HeroSectionTvShows from '../components/HeroSectionTvShows'; // Import the HeroSection component
import AllTVShows from '../components/AllTVShows'; // Import the AllTVShows component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const TVShowDetailsPage = () => {
    const [tvShows, setTVShows] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const loadTVShows = async () => {
            try {
                const fetchedTVShows = await fetchTVShows(); // Fetch all TV shows
                setTVShows(fetchedTVShows); // Set the fetched TV shows
            } catch (error) {
                console.error('Error loading TV shows:', error);
            }
        };

        loadTVShows();
    }, []);

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}> {/* Set background color to black */}
            <Header /> {/* Render the Header component */}
            <HeroSectionTvShows />
            <FeaturedTVShows /> {/* Render the FeaturedTVShows component */}
            <AllTVShows /> 
        </div>
    );
};

export default TVShowDetailsPage;