import './styles/styles.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import MovieSearchPage from './components/MovieSearchPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import './App.css';
import NavBar from './components/NavBar'; 


const App = () => {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/about" element={<AboutPage/>} /> 
        <Route path="/movie-search" element={<MovieSearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;


