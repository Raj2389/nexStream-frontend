/**
 * AuthContext.js
 * 
 * This context provides authentication state and functions to the entire application.
 * It manages user authentication, login, logout, and token refresh functionality.
 * 
 * How it works:
 * - Uses React's Context API to provide authentication state to all components
 * - Manages user state and authentication tokens
 * - Provides login, logout, and token refresh functions
 * - Persists authentication state in localStorage
 */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user data and token on initial load
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        } else {
            // Clear any partial data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            console.log('AuthContext: Attempting login with:', email);
            const response = await loginUser(email, password);
            console.log('AuthContext: Login response received:', response);
            
            if (!response || !response.token || !response.user) {
                console.error('AuthContext: Invalid login response:', response);
                throw new Error('Invalid login response');
            }

            const { token, user } = response;
            
            // Validate user data
            if (!user.id) {
                console.error('AuthContext: User ID is missing:', user);
                throw new Error('User ID is missing');
            }

            const userData = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            };

            console.log('AuthContext: Setting user data:', userData);
            
            // Update state and storage
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            // Token is already stored in loginUser function
            
            return true;
        } catch (error) {
            console.error('AuthContext: Login error:', error);
            // Clear any partial data on error
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const response = await registerUser(userData);
            if (response) {
                const newUser = {
                    id: response.user.id,
                    email: response.user.email,
                    firstName: response.user.firstName,
                    lastName: response.user.lastName,
                    token: response.token
                };
                setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));
                localStorage.setItem('token', response.token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log('User logged out');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 