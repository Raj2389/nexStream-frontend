/**
 * MovieRow.js
 * 
 * This component displays a row of movie items. It receives a title and an array of 
 * movie objects as props. The movies are displayed in a horizontal scrollable format 
 * using flexbox, allowing users to browse through the movies easily.
 * 
 * How it works:
 * - The component takes `title` and `movies` as props.
 * - It uses Material-UI's Box component to create a flexible layout for the movie items.
 * - The title of the row is displayed at the top, followed by a horizontal list of 
 *   MovieItem components, each representing a movie.
 */
import React from 'react';
import { Typography, Box } from '@mui/material';
import MovieItem from '../components/MovieItem';

function MovieRow({ title, movies }) {
    return (
        <Box sx={{ margin: 2 }}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', paddingBottom: 2 }}>
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie} />
                ))}
            </Box>
        </Box>
    );
}

export default MovieRow;