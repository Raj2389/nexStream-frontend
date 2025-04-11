import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api'; // Import the API function
import { Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AllMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const fetchedMovies = await fetchMovies(); // Fetch all movies
                setMovies(fetchedMovies);
            } catch (error) {
                console.error('Error loading movies:', error);
            }
        };

        loadMovies();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {movies.map((movie) => (
                    <Card key={movie.id} sx={{ width: 250, height: 350, margin: '10px', position: 'relative' }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={movie.thumbnailUrl}
                            alt={movie.title}
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
                                    WebkitLineClamp: 2, 
                                    maxHeight: '3em' 
                                }}
                            >
                                {movie.title}
                            </Typography>
                            <Link to={{
                                pathname: `/details/${movie.id}`, // Correct path to the Details page
                                state: movie // Pass the entire movie as state
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

export default AllMovies;