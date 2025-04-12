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

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Common headers for all requests
const commonHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

// Common fetch options
const fetchOptions = {
    credentials: 'include', // Important for CORS with credentials
    headers: commonHeaders,
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'API request failed');
    }
    return response.json();
};

// Movies API endpoints
export const fetchMovies = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/movies`, fetchOptions);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const getMovie = async (id) => {
    try {
        console.log(`Fetching movie with ID: ${id}`);
        const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        const text = await response.text();
        console.log('Raw response:', text);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.status}`);
        }
        
        if (!text) {
            throw new Error('Empty response from server');
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error('Error in getMovie:', error);
        throw error;
    }
};

export const fetchFeaturedMovies = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/movies/featured`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch featured movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching featured movies:', error);
        throw error;
    }
};

export const searchMovies = async (title) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/movies/search?title=${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error('Failed to search movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

// TV Shows API endpoints
export const fetchTVShows = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tvshows`, fetchOptions);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching TV shows:', error);
        throw error;
    }
};

export const getTVShow = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tvshows/${id}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch TV show details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching TV show details:', error);
        throw error;
    }
};

export const fetchFeaturedTVShows = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tvshows/featured`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch featured TV shows');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching featured TV shows:', error);
        throw error;
    }
};

export const searchTVShows = async (title) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tvshows/search?title=${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error('Failed to search TV shows');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching TV shows:', error);
        throw error;
    }
};

// User API endpoints
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/authenticate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Fetch a single movie or TV show by ID
export const fetchContentById = async (id) => {
    try {
        // Try movie endpoint first
        const movieResponse = await fetch(`${API_BASE_URL}/api/movies/${id}`, fetchOptions);
        if (movieResponse.ok) {
            const movie = await handleResponse(movieResponse);
            return { ...movie, type: 'movie' };
        }

        // If movie not found, try TV show endpoint
        const tvResponse = await fetch(`${API_BASE_URL}/api/tvshows/${id}`, fetchOptions);
        if (tvResponse.ok) {
            const tvShow = await handleResponse(tvResponse);
            return { ...tvShow, type: 'tvshow' };
        }

        throw new Error('Content not found');
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
export const fetchFeaturedMoviesSection = async () => {
    try {
        const movies = await fetchMovies();
        return movies.slice(0, 6); // Return the first 6 movies for the featured section
    } catch (error) {
        console.error('Error fetching featured movies:', error);
        throw error;
    }
};

// Fetch featured TV shows (for the featured TV shows section)
export const fetchFeaturedTVShowsSection = async () => {
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