import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import MovieSearchPage from './components/MovieSearchPage';
import MovieDetails from './components/MovieDetails'; //Problems!
import SignUpPage from './components/SignUpPage';

import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import NavBar from './components/NavBar';
import  './App.css';
import './styles/styles.css';
import './output.css';


const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/movie-search" element={<MovieSearchPage />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
        </Router>
    );
}

export default App;


