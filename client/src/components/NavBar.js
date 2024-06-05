import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-gray-300">About</Link>
                </li>
                {/* Add additional navigation links as needed */}
            </ul>
        </nav>
    );
}

export default NavBar;
