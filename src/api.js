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

// Base URL for the backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Movies endpoints
const API_URL_MOVIES = `${API_BASE_URL}/api/movies`;
const API_URL_TVSHOWS = `${API_BASE_URL}/api/tvshows`;

// Helper function for making API requests
const makeRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Fetch all movies
export const fetchMovies = async () => {
    return makeRequest(API_URL_MOVIES);
};

// Fetch all TV shows
export const fetchTVShows = async () => {
    return makeRequest(API_URL_TVSHOWS);
};

// Fetch a single movie by ID
export const fetchMovieById = async (id) => {
    try {
        const response = await fetch(`${API_URL_MOVIES}/${id}`);
        if (!response.ok) {
            throw new Error(`Movie not found: ${response.status}`);
        }
        const movieData = await response.json().catch(() => {
            throw new Error('Invalid JSON response from movies endpoint');
        });
        return movieData;
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
};

// Fetch a single TV show by ID
export const fetchTVShowById = async (id) => {
    try {
        console.log('Fetching TV show with ID:', id);
        const url = `${API_URL_TVSHOWS}/${id}`;
        console.log('TV Show URL:', url);
        
        const response = await fetch(url);
        console.log('TV Show Response Status:', response.status);
        
        if (!response.ok) {
            throw new Error(`TV show not found: ${response.status}`);
        }
        
        const tvShowData = await response.json();
        console.log('TV Show Data:', tvShowData);
        return tvShowData;
    } catch (error) {
        console.error('Error fetching TV show:', error);
        throw error;
    }
};

// Fetch featured content (movies and TV shows)
export const fetchFeaturedContent = async () => {
    const [movies, tvShows] = await Promise.all([
        makeRequest(`${API_URL_MOVIES}/featured`),
        makeRequest(`${API_URL_TVSHOWS}/featured`)
    ]);
    return [...movies, ...tvShows];
};

// Fetch featured movies
export const fetchFeaturedMovies = async () => {
    return makeRequest(`${API_URL_MOVIES}/featured`);
};

// Fetch featured TV shows
export const fetchFeaturedTVShows = async () => {
    return makeRequest(`${API_URL_TVSHOWS}/featured`);
};

// Fetch featured movies (for the featured movies section)
export const fetchFeaturedContentMovies = async () => {
    return makeRequest(`${API_URL_MOVIES}/featured`);
};

// Fetch featured TV shows (for the featured TV shows section)
export const fetchFeaturedContentTvShows = async () => {
    return makeRequest(`${API_URL_TVSHOWS}/featured`);
};

// Search for movies or TV shows
export const searchContent = async (term) => {
    const [movies, tvShows] = await Promise.all([
        makeRequest(`${API_URL_MOVIES}/search?title=${encodeURIComponent(term)}`),
        makeRequest(`${API_URL_TVSHOWS}/search?title=${encodeURIComponent(term)}`)
    ]);

    return { movies, tvShows };
};

export const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token ? 'Present' : 'Missing');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();
        console.log('User data received:', data);
        return data;
    } catch (error) {
        console.error('Error in fetchUserData:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        console.log('Attempting login with:', email);
        const response = await fetch(`${API_BASE_URL}/api/users/authenticate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Login response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Login error response:', errorData);
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Raw login response data:', data);
        
        if (!data || !data.token) {
            console.error('Invalid response structure:', data);
            throw new Error('Invalid response from server');
        }

        // Store the token immediately
        localStorage.setItem('token', data.token);
        console.log('Token stored in localStorage');

        // Extract user data
        const userData = {
            userId: data.user.id,
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName
        };

        console.log('Processed user data:', userData);

        return {
            token: data.token,
            user: userData
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        console.log('Attempting registration with:', userData);
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};