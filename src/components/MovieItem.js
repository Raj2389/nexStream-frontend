
/**
 * MovieItem.js
 * 
 * This component represents a single movie item displayed in a list or grid format.
 * It receives a movie object as a prop and displays the movie's thumbnail and title.
 * Clicking on the movie item navigates to the movie's detail page.
 * 
 * How it works:
 * - The component takes a `movie` prop, which contains the movie's details.
 * - It uses Material-UI's Card component to display the movie's thumbnail and title.
 * - The thumbnail is wrapped in a Link component that navigates to the movie's detail page 
 *   when clicked.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

function MovieItem({ movie }) {
    return (
        <Card sx={{ width: 200, margin: 1 }}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={movie.imageUrl}
                    alt={movie.title}
                />
                <CardContent style={{ backgroundColor: '#222' }}>
                    <Typography variant="body2">
                        {movie.title}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}

export default MovieItem;