// import React, { useEffect, useState } from 'react';
// import axios from './axiosConfig'; 
// import { Link } from 'react-router-dom';

// const MovieSearchPage = () => {
//     const [query, setQuery] = useState('');
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         fetchMovies();  // Fetch popular movies 
//     }, []);

//     const fetchMovies = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/popular_movies/');
//             setMovies(response.data.movies);
//         } catch (error) {
//             console.error('Failed to fetch popular movies:', error);
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8000/movie_search/?query=${query}`);
//             setMovies(response.data.movies);
//         } catch (error) {
//             console.error('Error fetching movies:', error);
//             setMovies([]);
//         }
//     };

//     return (
//         <div>
//             <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
//             <button onClick={handleSearch}>Search</button>
//             <div>
//                 {movies.length > 0 ? (
//                     movies.map(movie => (
//                         <div key={movie.id}>
//                             <Link to={`/movie/${movie.id}`}>
//                                 <h4>{movie.title}</h4>
//                                 <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//                             </Link>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No movies found</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MovieSearchPage;

import React, { useEffect, useState } from 'react';
import axios from './axiosConfig'; 
import { Link } from 'react-router-dom';

const MovieSearchPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();  // Fetch popular movies 
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/popular_movies/');
            setMovies(response.data.movies);
        } catch (error) {
            console.error('Failed to fetch popular movies:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/movie_search/?query=${query}`);
            setMovies(response.data.movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center my-6">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-input px-4 py-2 w-full sm:w-auto" />
                <button onClick={handleSearch} className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Search</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover"/>
                                <h4 className="text-lg font-semibold p-4">{movie.title}</h4>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No movies found</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearchPage;









