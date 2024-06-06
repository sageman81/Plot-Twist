import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams

const MovieDetails = () => {
    const { movieId } = useParams();  // Extract movieId from the URL
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

    console.log("Movie ID received:", movieId);  // Log the received movieId

    useEffect(() => {
        if (movieId) {
            axios.get(`http://localhost:8000/api/movie/${movieId}/`)
                .then(response => {
                    setMovie(response.data);
                })
                .catch(error => {
                    setError('Movie not found');
                    console.error('Error fetching movie details:', error);
                });
        }
    }, [movieId]);

    if (!movieId) return <p>Select a movie to see the details.</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
        </div>
    );
};

export default MovieDetails;

