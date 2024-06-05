import './styles/styles.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import './App.css';
import NavBar from './components/NavBar'; 


const App = () => {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/about" element={<AboutPage/>} /> 
        {/* Other routes here */}
      </Routes>
    </Router>
  );
}

export default App;


