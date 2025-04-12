import React, { useEffect, useState } from 'react'; // Import React and hooks
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for routing
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material'; // Import Material-UI components
import { fetchContentById } from '../api'; // Import the API function
import Header from '../components/Header'; // Import the Header component

const Details = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const [content, setContent] = useState(null); // State to hold the fetched content
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        console.log('Details component mounted with ID:', id);
        const loadContent = async () => {
            try {
                console.log('Loading content for ID:', id);
                if (!id) {
                    throw new Error('No ID provided');
                }
                const fetchedContent = await fetchContentById(id);
                console.log('Fetched content:', fetchedContent);
                if (!fetchedContent) {
                    throw new Error('No content found');
                }
                setContent(fetchedContent);
            } catch (error) {
                console.error('Error in loadContent:', error);
                setError(error.message || 'Failed to load content.');
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [id]);

    if (loading) {
        return <Typography variant="h5">Loading...</Typography>; // Show loading message
    }

    if (error) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h5" color="error">{error}</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        );
    }

    if (!content) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h5">No details available. Please go back.</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <>
            <Header /> {/* Place the Header component outside of the Box */}
            <Box sx={{ padding: 4, flex: 1 }}> {/* Added flex: 1 to allow it to grow */}
                <Card sx={{ maxWidth: 600, margin: 'auto' }}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={content.largePosterUrl}
                        alt={content.title}
                    />
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom>
                            {content.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {content.description}
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => window.open(content.videoUrl, '_blank')}
                            sx={{ marginTop: 2 }}
                        >
                            Watch Now
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Details;