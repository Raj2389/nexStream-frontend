// src/components/Header.js

/**
 * Header.js
 * 
 * This component renders the header of the application, which includes the application 
 * title, navigation links to different pages (Home, Movies, TV Shows), and a search 
 * bar for users to search for content. The search functionality allows users to 
 * find movies and TV shows by name and opens the corresponding video link in a new tab.
 * 
 * How it works:
 * - The header contains a title and navigation buttons that link to different sections 
 *   of the application.
 * - A search bar allows users to input a search term, which is stored in the component's 
 *   state.
 * - When the search button is clicked, the `handleSearch` function is called, which 
 *   fetches search results and opens the video link of the first matching movie or TV show.
 */

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, TextField } from '@mui/material'; // Import TextField
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search'; // Import Material-UI Search icon
import ProfileIcon from './ProfileIcon'; // Import the ProfileIcon component
import { searchContent } from '../api'; // Import the search function

const Header = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

    const handleSearch = async () => {
        try {
            const results = await searchContent(searchTerm); // Fetch search results based on the search term
            console.log('Search Results:', results); // Log the search results for debugging

            // Check if there are results and open the video link of the first movie or TV show
            if (results.movies.length > 0) {
                window.open(results.movies[0].videoUrl, '_blank'); // Open the video URL in a new tab
            } else if (results.tvShows.length > 0) {
                window.open(results.tvShows[0].videoUrl, '_blank'); // Open the video URL in a new tab
            } else {
                console.log('No results found'); // Log if no results are found
            }
        } catch (error) {
            console.error('Error during search:', error); // Log any errors encountered
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#000000' }}> {/* Set background color to black */}
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ color: 'red', marginRight: 2 }}> {/* Set NexStream color to red */}
                        NexStream
                    </Typography>
                    <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/movies" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">Movies</Button>
                    </Link>
                    <Link to="/tv-shows" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">TV Shows</Button>
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                        sx={{ marginRight: 1, backgroundColor: 'white' }} // Add some margin and background color
                    />
                    <IconButton color="inherit" onClick={handleSearch}>
                        <SearchIcon /> {/* Search button */}
                    </IconButton>
                    <ProfileIcon style={{ backgroundColor: 'white' }} /> {/* Add the ProfileIcon component here */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; // Export the Header component