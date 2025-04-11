import React, { useEffect, useState } from 'react';
import { fetchTVShows } from '../api'; // Import the API function
import { Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AllTVShows = () => {
    const [tvShows, setTVShows] = useState([]);

    useEffect(() => {
        const loadTVShows = async () => {
            try {
                const fetchedTVShows = await fetchTVShows(); // Fetch all TV shows
                setTVShows(fetchedTVShows);
            } catch (error) {
                console.error('Error loading TV shows:', error);
            }
        };

        loadTVShows();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {tvShows.map((show) => (
                    <Card key={show.id} sx={{ width: 250, height: 350, margin: '10px', position: 'relative' }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={show.thumbnailUrl}
                            alt={show.title}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent 
                            sx={{ 
                                position: 'absolute', 
                                bottom: 0, 
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                                color: 'white',
                                padding: '8px' 
                            }}
                        >
                            <Typography 
                                gutterBottom 
                                variant="h6" 
                                component="div" 
                                sx={{ 
                                    fontSize: '1rem', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis', 
                                    display: '-webkit-box', 
                                    WebkitBoxOrient: 'vertical', 
                                    WebkitLineClamp: 2 
                                }}
                            >
                                {show.title}
                            </Typography>
                            <Link to={{
                                pathname: `/details/${show.id}`, // Correct path to the Details page
                                state: show // Pass the entire show as state
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
            </Box>
        </Box>
    );
};

export default AllTVShows;