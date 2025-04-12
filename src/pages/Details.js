import React, { useEffect, useState } from 'react'; // Import React and hooks
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Import hooks for routing
import { Box, Typography, Button, Card, CardMedia, CardContent, CircularProgress, Alert } from '@mui/material'; // Import Material-UI components
import { fetchMovieById, fetchTVShowById } from '../api'; // Import the API function
import Header from '../components/Header'; // Import the Header component

const Details = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState(null); // State to hold the fetched content
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const loadContent = async () => {
            try {
                if (!id) {
                    throw new Error('Invalid content ID');
                }
                
                // First try to get the content type from the state
                let contentType = location.state?.type;
                
                // If state is not available, try to determine from the URL or other means
                if (!contentType) {
                    // You could also check the URL path or other indicators here
                    // For now, we'll try both endpoints and see which one works
                    try {
                        console.log('Trying to fetch TV show first...');
                        const tvShow = await fetchTVShowById(id);
                        contentType = 'tvshow';
                        setContent(tvShow);
                    } catch (tvError) {
                        console.log('TV show not found, trying movie...');
                        try {
                            const movie = await fetchMovieById(id);
                            contentType = 'movie';
                            setContent(movie);
                        } catch (movieError) {
                            throw new Error('Content not found in either movies or TV shows');
                        }
                    }
                } else {
                    // If we have the content type from state, use it directly
                    console.log('Content Type from state:', contentType);
                    let fetchedContent;
                    if (contentType === 'tvshow') {
                        console.log('Fetching TV show...');
                        fetchedContent = await fetchTVShowById(id);
                    } else {
                        console.log('Fetching movie...');
                        fetchedContent = await fetchMovieById(id);
                    }
                    setContent(fetchedContent);
                }
            } catch (error) {
                console.error('Error loading content:', error);
                let errorMessage = 'Failed to load content. Please try again later.';
                
                if (error.message.includes('Invalid JSON')) {
                    errorMessage = 'Server returned invalid data. Please try again later.';
                } else if (error.message.includes('not found')) {
                    errorMessage = 'The requested content could not be found.';
                } else if (error.message.includes('Server error')) {
                    errorMessage = 'Server error occurred. Please try again later.';
                }
                
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [id, location.state]);

    if (loading) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h5">Loading content details...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error" gutterBottom>
                    {error}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate(-1)}
                    sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

    if (!content) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h5">No details available.</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <>
            <Header />
            <Box sx={{ 
                padding: 4, 
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)', // Subtract header height
                width: '100%'
            }}>
                <Card sx={{ 
                    maxWidth: 800, 
                    width: '100%',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={content.largePosterUrl}
                        alt={content.title}
                        sx={{ 
                            objectFit: 'cover',
                            width: '100%'
                        }}
                    />
                    <CardContent sx={{ 
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <Typography variant="h4" component="div" gutterBottom>
                            {content.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ maxWidth: '80%' }}>
                            {content.description}
                        </Typography>
                        {content.videoUrl && (
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => window.open(content.videoUrl, '_blank')}
                                sx={{ marginTop: 2 }}
                            >
                                Watch Now
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Details;