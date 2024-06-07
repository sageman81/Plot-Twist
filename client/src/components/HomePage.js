// import React, { useEffect, useState } from 'react';
// import axios from './axiosConfig'; 
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//     const [topMovies, setTopMovies] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8000/api/home/')
//             .then(response => {
//                 if(response.data && response.data.movies_with_most_twists) {
//                     setTopMovies(response.data.movies_with_most_twists);
//                 } else {
//                     console.error('Unexpected response structure:', response.data);
//                     setTopMovies([]);  // Ensure this is set to an empty array if data is incorrect
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching top movies:', error);
//                 setTopMovies([]);  // Handle error by setting a default state
//             });
//     }, []);

//     return (
//         <div>
//             <h1>Top Movies Based on Plot Twists</h1>
//             {topMovies.length > 0 ? (
//                 topMovies.map(movie => (
//                     <div key={movie.movie_id}>
//                         <Link to={`/movie/${movie.movie_id}`}>
//                             <img src={movie.poster_path} alt={movie.title} />
//                             <h2>{movie.title}</h2>
//                             <p>Release Date: {movie.release_date}</p>
//                         </Link>
//                     </div>
//                 ))
//             ) : (
//                 <p>No top movies found</p>
//             )}
//         </div>
//     );
// };

// export default HomePage;

// import React, { useEffect, useState } from 'react';
// import axios from './axiosConfig'; 
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//     const [topMovies, setTopMovies] = useState([]);
//     return (
//         <div className="p-6 max-w-sm mx-auto bg-blue-200 rounded-xl shadow-lg flex items-center space-x-4">
//           <div className="shrink-0">
//             <img className="h-12 w-12" src="https://tailwindcss.com/img/logo.svg" alt="Tailwind Logo" />
//           </div>
//           <div>
//             <div className="text-xl font-medium text-black">Tailwind Works!</div>
//             <p className="text-gray-500">You have successfully integrated Tailwind CSS.</p>
//           </div>
//         </div>
//       );
//     };
    


//     useEffect(() => {
//         axios.get('http://localhost:8000/api/home/')
//             .then(response => {
//                 if (response.data && response.data.movies_with_most_twists) {
//                     setTopMovies(response.data.movies_with_most_twists);
//                 } else {
//                     console.error('Unexpected response structure:', response.data);
//                     setTopMovies([]);  // Ensure this is set to an empty array if data is incorrect
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching top movies:', error);
//                 setTopMovies([]);  // Handle error by setting a default state
//             });
//     }, []);

//     return (
//         <div className="bg-gray-800 min-h-screen text-white">
//             <div className="container mx-auto px-4 py-6">
//                 <h1 className="text-xl font-bold mb-4">Top Movies Based on Plot Twists</h1>
//                 {topMovies.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {topMovies.map(movie => (
//                             <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:bg-gray-600 transition-colors duration-300">
//                                 <img src={movie.poster_path} alt={movie.title} className="w-full h-64 object-cover"/>
//                                 <div className="p-4">
//                                     <h2 className="text-lg font-semibold">{movie.title}</h2>
//                                     <p>Release Date: {movie.release_date}</p>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 ) : (
//                     <p>No top movies found</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HomePage;
import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [topMovies, setTopMovies] = useState([]);

    // Fetch movies on component mount
    useEffect(() => {
        axios.get('http://localhost:8000/api/home/')
            .then(response => {
                if (response.data && response.data.movies_with_most_twists) {
                    setTopMovies(response.data.movies_with_most_twists);
                } else {
                    console.error('Unexpected response structure:', response.data);
                    setTopMovies([]);  // Ensure this is set to an empty array if data is incorrect
                }
            })
            .catch(error => {
                console.error('Error fetching top movies:', error);
                setTopMovies([]);  // Handle error by setting a default state
            });
    }, []);

    return (
        <div className="bg-gray-800 min-h-screen text-white">
            <div className="container mx-auto px-4 py-6">
                {/* Tailwind Test Component */}
                <div className="p-6 max-w-sm mx-auto bg-blue-200 rounded-xl shadow-lg flex items-center space-x-4">
                    <div className="shrink-0">
                        <img className="h-12 w-12" src="https://tailwindcss.com/img/logo.svg" alt="Tailwind Logo" />
                    </div>
                    <div>
                        <div className="text-xl font-medium text-black">Tailwind Works!</div>
                        <p className="text-gray-500">You have successfully integrated Tailwind CSS.</p>
                    </div>
                </div>

                {/* Movies Grid */}
                <h1 className="text-xl font-bold mb-4">Top Movies Based on Plot Twists</h1>
                {topMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {topMovies.map(movie => (
                            <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:bg-gray-600 transition-colors duration-300">
                                <img src={movie.poster_path} alt={movie.title} className="w-full h-64 object-cover"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">{movie.title}</h2>
                                    <p>Release Date: {movie.release_date}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No top movies found</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
