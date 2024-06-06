import React, { useState } from 'react';
import axios from 'axios';

const MovieSearchPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/movie_search/?query=${query}`);
            if (response.data && Array.isArray(response.data.movies)) {
                setMovies(response.data.movies);
            } else {
                setMovies([]); // Handle cases where movies is not an array
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]); // Reset movies on error
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <div>
                {movies && movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id}>
                            <h4>{movie.title}</h4>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
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
