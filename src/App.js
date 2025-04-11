import React from 'react'; // Import React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import { Box } from '@mui/material'; // Import Box from Material-UI
import EntryPage from './pages/EntryPage'; // Entry point for users
import HomePage from './pages/HomePage'; // Home page component
import LoginPage from './pages/LoginPage'; // Login page component
import RegistrationPage from './pages/RegistrationPage'; // Registration page component
import Footer from './components/Footer'; // Import the Footer component
import MoviesListingPage from './pages/MoviesListingPage'; // Import the MoviesListingPage
import TVShowDetailsPage from './pages/TVShowDetailsPage'; // Import the TVShowDetailsPage
import Details from './pages/Details'; // Import the Details component
import './App.css'; // Optional: Import any global styles

const App = () => {
    return (
        <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<EntryPage />} /> {/* Entry point */}
                    <Route path="/home" element={<HomePage />} /> {/* Home page for logged-in users */}
                    <Route path="/login" element={<LoginPage />} /> {/* Login page */}
                    <Route path="/register" element={<RegistrationPage />} /> {/* Registration page */}
                    <Route path="/movies" element={<MoviesListingPage />} /> {/* Route for MoviesListingPage */}
                    <Route path="/tv-shows" element={<TVShowDetailsPage />} /> {/* Route for TVShowDetailsPage */}
                    <Route path="/details/:id" element={<Details />} /> {/* Route for Details page */}
                </Routes>
                <Footer /> {/* Include the Footer component here */}
            </Box>
        </Router>
    );
};

export default App;