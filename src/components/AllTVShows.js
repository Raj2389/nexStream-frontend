import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { fetchTVShows } from '../api';

const AllTVShows = () => {
    const [tvShows, setTVShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTVShows = async () => {
            try {
                const fetchedTVShows = await fetchTVShows();
                console.log('Raw fetched TV shows data:', fetchedTVShows);
                if (Array.isArray(fetchedTVShows)) {
                    console.log('First TV show in array:', fetchedTVShows[0]);
                    console.log('First TV show ID:', fetchedTVShows[0]?.id || fetchedTVShows[0]?._id);
                }
                setTVShows(fetchedTVShows);
            } catch (error) {
                setError('Failed to load TV shows');
                console.error('Error loading TV shows:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTVShows();
    }, []);

    const handleWatchNow = (show) => {
        console.log('Watch Now clicked for TV show:', show);
        const showId = show.id || show._id;
        console.log('TV show ID being used:', showId);
        if (!showId) {
            console.error('No TV show ID provided');
            return;
        }
        navigate(`/details/${showId}`);
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
                All TV Shows
            </Typography>
            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 3
            }}>
                {tvShows.map((show) => {
                    console.log('Rendering TV show:', show);
                    const showId = show.id || show._id;
                    console.log('TV show ID:', showId);
                    return (
                        <Card key={showId} sx={{ 
                            width: '100%',
                            height: 320,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <CardMedia
                                component="img"
                                height="180"
                                image={show.smallPosterUrl}
                                alt={show.title}
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
                                    {show.title}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleWatchNow(show)}
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

export default AllTVShows;