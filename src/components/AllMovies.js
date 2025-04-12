import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const fetchedMovies = await fetchMovies();
                console.log('Raw fetched movies data:', fetchedMovies);
                if (Array.isArray(fetchedMovies)) {
                    console.log('First movie in array:', fetchedMovies[0]);
                    console.log('First movie ID:', fetchedMovies[0]?.id || fetchedMovies[0]?._id);
                }
                setMovies(fetchedMovies);
            } catch (error) {
                setError('Failed to load movies');
                console.error('Error loading movies:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    const handleWatchNow = (movie) => {
        console.log('Watch Now clicked for movie:', movie);
        const movieId = movie.id || movie._id;
        console.log('Movie ID being used:', movieId);
        if (!movieId) {
            console.error('No movie ID provided');
            return;
        }
        navigate(`/details/${movieId}`);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ 
            padding: '40px 80px',
            maxWidth: '1600px',
            margin: '0 auto'
        }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                All Movies
            </Typography>
            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 3
            }}>
                {movies.map((movie) => {
                    console.log('Rendering movie:', movie);
                    const movieId = movie.id || movie._id;
                    console.log('Movie ID:', movieId);
                    return (
                        <Card key={movieId} sx={{ 
                            width: '100%',
                            height: 320,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <CardMedia
                                component="img"
                                height="180"
                                image={movie.smallPosterUrl}
                                alt={movie.title}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ 
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 2
                            }}>
                                <Typography 
                                    gutterBottom 
                                    variant="h6" 
                                    component="div"
                                    sx={{ 
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        mb: 1
                                    }}
                                >
                                    {movie.title}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleWatchNow(movie)}
                                    size="small"
                                    sx={{ 
                                        width: 'fit-content',
                                        alignSelf: 'flex-start',
                                        fontSize: '0.875rem',
                                        py: 0.5
                                    }}
                                >
                                    Watch Now
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
};

export default AllMovies;