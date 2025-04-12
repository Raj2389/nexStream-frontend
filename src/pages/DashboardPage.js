import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserData } from '../api';
import { 
    Box, 
    Typography, 
    Paper, 
    Button, 
    CircularProgress, 
    Grid,
    Avatar,
    Divider,
    Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Dashboard mounted');
        console.log('Current user state:', user);
        
        const loadUserData = async () => {
            console.log('Starting loadUserData');
            
            if (!user) {
                console.log('No user found, redirecting to login');
                navigate('/login');
                return;
            }

            try {
                console.log('Attempting to fetch user data');
                setLoading(true);
                const data = await fetchUserData();
                console.log('Successfully received user data:', data);
                setUserData(data);
            } catch (err) {
                console.error('Error in loadUserData:', err);
                console.error('Error details:', {
                    message: err.message,
                    stack: err.stack
                });
                setError(err.message || 'Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [user, navigate]);

    if (!user) {
        console.log('No user found in render, redirecting to login');
        navigate('/login');
        return null;
    }

    if (loading) {
        console.log('Rendering loading state');
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress />
                <Typography variant="body1">Loading your profile...</Typography>
            </Box>
        );
    }

    if (error) {
        console.log('Rendering error state:', error);
        return (
            <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </Button>
            </Box>
        );
    }

    console.log('Rendering dashboard with user data:', userData);
    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    {/* Profile Section */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            mb: 3,
                            p: 2,
                            borderRight: { md: 1 },
                            borderColor: 'divider'
                        }}>
                            <Avatar 
                                sx={{ 
                                    width: 120, 
                                    height: 120, 
                                    mb: 2,
                                    bgcolor: 'primary.main'
                                }}
                            >
                                <AccountCircleIcon sx={{ fontSize: 80 }} />
                            </Avatar>
                            <Typography variant="h5" gutterBottom>
                                {userData?.firstName || user?.firstName} {userData?.lastName || user?.lastName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {userData?.email || user?.email}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Account Details Section */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Account Details
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        User ID
                                    </Typography>
                                    <Typography variant="body1">
                                        {userData?.id || user?.id}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body1">
                                        {userData?.email || user?.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Actions Section */}
                    <Grid item xs={12}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            mt: 3,
                            gap: 2
                        }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => navigate('/')}
                            >
                                Back to Home
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default DashboardPage; 