/**
 * ProtectedRoute.js
 * 
 * This component ensures that only authenticated users can access certain routes.
 * If a user is not authenticated, they will be redirected to the login page.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 