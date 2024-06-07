import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [description, setDescription] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch movie details
        if (movieId) {
            axios.get(`http://localhost:8000/api/movie/${movieId}/`)
                .then(response => {
                    setMovie(response.data);
                })
                .catch(error => {
                    setError('Movie not found');
                    console.error('Error fetching movie details:', error);
                });

            // Fetch CSRF token
            axios.get(`http://localhost:8000/api/csrf/`)
                .then(response => {
                    setCsrfToken(response.data.csrfToken);
                })
                .catch(error => {
                    console.error('Error fetching CSRF token:', error);
                });
        }
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/api/submit_plot_twist/${movieId}/`, { description }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            if (response.data.status === 'success') {
                alert('Plot twist submitted successfully!');
                setDescription('');
            } else {
                alert('Error submitting plot twist:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to submit plot twist:', error);
        }
    };

    const handleVote = async (plotTwistId, type) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/${type}/${plotTwistId}/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            if (response.data.status) {
                alert('Vote updated!');
                // Optionally refresh or update the local state to reflect new vote counts
            } else {
                alert('Failed to update vote.');
            }
        } catch (error) {
            console.error('Error updating vote:', error);
        }
    };

    if (!movieId) return <p>Select a movie to see the details.</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter plot twist"
                    rows="4"
                    style={{ width: "100%" }}
                />
                <button type="submit">Submit Plot Twist</button>
            </form>
            {/* Example upvote and downvote buttons (assumes you have plotTwistId from somewhere) */}
            <button onClick={() => handleVote(1, 'upvote')}>Upvote</button>
            <button onClick={() => handleVote(1, 'downvote')}>Downvote</button>
        </div>
    );
};

export default MovieDetails;

