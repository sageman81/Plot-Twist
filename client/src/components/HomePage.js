import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
   

    const [plotTwists, setPlotTwists] = useState([]);

    useEffect(() => {
        const fetchTopPlotTwists = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/top-plot-twists/');
                console.log(response.data); // Log the whole response data
                setPlotTwists(response.data.plot_twists);

                setPlotTwists(response.data.plot_twists);
            } catch (error) {
                console.error('Failed to fetch top plot twists:', error);
            }
        };

        fetchTopPlotTwists();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <header className="bg-blue-500 text-white p-4 mb-4">
                <h1 className="text-lg">Welcome to Plot Twist!</h1>
                <nav>
                    {/* Navigation links here */}
                </nav>
            </header>

            <h1 className="text-2xl font-bold mb-4">Top Plot Twists</h1>
            {plotTwists.length > 0 ? (
                plotTwists.map(pt => (
                    <div key={pt.plot_twist_id} className="bg-white p-4 rounded shadow mb-4">
                        <h2 className="text-xl font-semibold">{pt.movie_title}</h2>
                        <p>{pt.description}</p>
                        <img src={pt.poster_path} alt={`Poster for ${pt.movie_title}`} className="w-full h-auto mt-2" />
                        <p className="mt-2">Votes: {pt.votes}</p>
                    </div>
                ))
            ) : (
                <p>No plot twists have been submitted yet.</p>
            )}
        </div>
    );
};

export default HomePage;
