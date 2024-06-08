// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavBar = () => {
//     return (
//         <nav className="bg-gray-800 text-white p-4">
//             <ul className="flex space-x-4">
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/about">About</Link></li>
//               <li><Link to="/movie-search">Movie Search</Link></li>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/logout">Logout</Link></li>
               
//             </ul>
//         </nav>
//     );
// }

// export default NavBar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // Using useNavigate instead of useHistory

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/movie-search?query=${query}`); // Navigate using the new useNavigate hook
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-4 py-2 w-full md:w-auto"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Search
            </button>
        </form>
    );
};

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link to="/" className="text-lg font-bold">Plot Twist</Link>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto`}>
                    <ul className="md:flex md:space-x-4">
                        <li className="mt-4 md:mt-0"><SearchBar /></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/movie-search">Movie Search</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
