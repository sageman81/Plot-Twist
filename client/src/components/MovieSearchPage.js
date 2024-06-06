import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <div>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <h4>{movie.title}</h4>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearchPage;










