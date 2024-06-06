import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/movie-search">Movie Search</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/logout">Logout</Link></li>
               
            </ul>
        </nav>
    );
}

export default NavBar;
