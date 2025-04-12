/**
 * auth.js
 * 
 * This module contains functions for user authentication, including login and registration.
 * It handles API calls to the backend for user authentication and session management.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Session state management
let sessionActive = false;
const sessionListeners = new Set();
let refreshTimeout = null;

const notifySessionChange = () => {
    sessionListeners.forEach(listener => listener(sessionActive));
};

// Helper function for making API requests
const makeRequest = async (url, options = {}) => {
    if (!sessionActive && !url.includes('/authenticate')) {
        throw new Error('Session not active. Please login.');
    }

    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Try to refresh token if it's expired
                try {
                    await refreshToken();
                    // Retry the original request with new token
                    return makeRequest(url, options);
                } catch (refreshError) {
                    // If refresh fails, end session
                    endSession();
                    throw new Error('Session expired. Please login again.');
                }
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Refresh token function
const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        startSession(data.token, data.user, data.refreshToken);
        return data.token;
    } catch (error) {
        console.error('Token refresh error:', error);
        throw error;
    }
};

// Start a new session
const startSession = (token, user, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
    }
    sessionActive = true;
    notifySessionChange();

    // Clear existing refresh timeout
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
    }

    // Set up token refresh before expiration
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresIn = payload.exp * 1000 - Date.now();
        // Refresh 5 minutes before expiration
        const refreshTime = Math.max(expiresIn - 5 * 60 * 1000, 0);
        refreshTimeout = setTimeout(() => {
            refreshToken().catch(error => {
                console.error('Automatic token refresh failed:', error);
                endSession();
            });
        }, refreshTime);
    } catch (error) {
        console.error('Error setting up token refresh:', error);
    }
};

// End the current session
const endSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    sessionActive = false;
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
    }
    notifySessionChange();
};

// Login function
export const login = async (email, password) => {
    try {
        const url = `${API_BASE_URL}/api/users/authenticate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        
        const response = await makeRequest(url, {
            method: 'POST',
        });

        if (response.token) {
            startSession(response.token, response.user, response.refreshToken);
        }

        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Check if user is logged in
export const isAuthenticated = () => {
    return sessionActive;
};

// Get current user
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Get auth token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Logout function
export const logout = () => {
    endSession();
};

// Add session state listener
export const addSessionListener = (listener) => {
    sessionListeners.add(listener);
    return () => sessionListeners.delete(listener);
};

// Initialize session state
const token = localStorage.getItem('token');
if (token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
            sessionActive = true;
            // Set up token refresh
            const expiresIn = payload.exp * 1000 - Date.now();
            const refreshTime = Math.max(expiresIn - 5 * 60 * 1000, 0);
            refreshTimeout = setTimeout(() => {
                refreshToken().catch(error => {
                    console.error('Automatic token refresh failed:', error);
                    endSession();
                });
            }, refreshTime);
        } else {
            endSession();
        }
    } catch (error) {
        endSession();
    }
} 