/**
 * api.js
 * 
 * This module contains functions to interact with the backend API for fetching 
 * movies and TV shows. It provides methods to fetch all movies, fetch a single 
 * movie by ID, fetch featured content, and search for movies or TV shows based 
 * on a search term.
 * 
 * How it works:
 * - Each function makes a network request to the specified API endpoints.
 * - Error handling is implemented to catch and log any issues during the fetch 
 *   operations.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_URL_MOVIES = `${API_BASE_URL}/api/movies`;
const API_URL_TVSHOWS = `${API_BASE_URL}/api/tvshows`;

// Fetch all movies
export const fetchMovies = async () => {
    try {
        const response = await fetch(API_URL_MOVIES);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

// Fetch all TV shows
export const fetchTVShows = async () => {
    try {
        const response = await fetch(API_URL_TVSHOWS);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching TV shows:', error);
        throw error;
    }
};

// Fetch a single movie or TV show by ID
export const fetchContentById = async (id) => {
    try {
        const movies = await fetchMovies(); // Fetch all movies
        const tvShows = await fetchTVShows(); // Fetch all TV shows

        // Search for the content in both movies and TV shows
        const content = [...movies, ...tvShows].find(item => item.id === id);

        if (!content) {
            throw new Error('Content not found');
        }

        return content; // Return the found content
    } catch (error) {
        console.error('Error fetching content by ID:', error);
        throw error;
    }
};

// Fetch featured content (movies and TV shows)
export const fetchFeaturedContent = async () => {
    try {
        const movies = await fetchMovies();
        const tvShows = await fetchTVShows();
        // Combine movies and TV shows
        return [...movies.slice(0, 3), ...tvShows.slice(0, 3)]; // Adjust the number of items as needed
    } catch (error) {
        console.error('Error fetching featured content:', error);
        throw error;
    }
};

// Fetch featured movies
export const fetchFeaturedContentMovies = async () => {
    try {
        const movies = await fetchMovies();
        return [...movies.slice(0, 3)]; // Adjust the number of items as needed
    } catch (error) {
        console.error('Error fetching featured movies:', error);
        throw error;
    }
};

// Fetch featured TV shows
export const fetchFeaturedContentTvShows = async () => {
    try {
        const tvShows = await fetchTVShows();
        return [...tvShows.slice(0, 3)]; // Adjust the number of items as needed
    } catch (error) {
        console.error('Error fetching featured TV shows:', error);
        throw error;
    }
};

// Fetch featured movies (for the featured movies section)
export const fetchFeaturedMovies = async () => {
    try {
        const movies = await fetchMovies();
        return movies.slice(0, 6); // Return the first 6 movies for the featured section
    } catch (error) {
        console.error('Error fetching featured movies:', error);
        throw error;
    }
};

// Fetch featured TV shows (for the featured TV shows section)
export const fetchFeaturedTVShows = async () => {
    try {
        const tvShows = await fetchTVShows();
        return tvShows.slice(0, 6); // Return the first 6 TV shows for the featured section
    } catch (error) {
        console.error('Error fetching featured TV shows:', error);
        throw error;
    }
};

// Search for movies or TV shows based on the search term
export const searchContent = async (term) => {
    try {
        const movies = await fetchMovies();
        const tvShows = await fetchTVShows();
        
        // Filter movies and TV shows based on the search term
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(term.toLowerCase()) || 
            movie.genre.toLowerCase().includes(term.toLowerCase())
        );

        const filteredTVShows = tvShows.filter(tvShow => 
            tvShow.title.toLowerCase().includes(term.toLowerCase()) || 
            tvShow.genre.toLowerCase().includes(term.toLowerCase())
        );

        return { movies: filteredMovies, tvShows: filteredTVShows };
    } catch (error) {
        console.error('Error searching content:', error);
        throw error;
    }
};