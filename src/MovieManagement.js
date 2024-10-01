import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [currentId, setCurrentId] = useState(null);

    const fetchMovies = async () => {
        const response = await axios.get('http://localhost:8080/api/movies');
        setMovies(response.data);
    };

    const addMovie = async (e) => {
        e.preventDefault();
        const newMovie = { title, description, genre, releaseDate };
        
        if (currentId) {
            await axios.put(`http://localhost:8080/api/movies/${currentId}`, newMovie);
        } else {
            await axios.post('http://localhost:8080/api/movies', newMovie);
        }
        
        setTitle('');
        setDescription('');
        setGenre('');
        setReleaseDate('');
        setCurrentId(null);
        fetchMovies();
    };

    const editMovie = (movie) => {
        setTitle(movie.title);
        setDescription(movie.description);
        setGenre(movie.genre);
        setReleaseDate(movie.releaseDate);
        setCurrentId(movie.id);
    };

    const deleteMovie = async (id) => {
        await axios.delete(`http://localhost:8080/api/movies/${id}`);
        fetchMovies();
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movie Management</h1>
            <form onSubmit={addMovie}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Genre" 
                    value={genre} 
                    onChange={(e) => setGenre(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={releaseDate} 
                    onChange={(e) => setReleaseDate(e.target.value)} 
                    required 
                />
                <button type="submit">{currentId ? 'Update' : 'Add'} Movie</button>
            </form>
            <h2>Movie List</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <p>{movie.genre}</p>
                        <p>{movie.releaseDate}</p>
                        <button onClick={() => editMovie(movie)}>Edit</button>
                        <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieManagement.css'; // Import the CSS file

const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [currentId, setCurrentId] = useState(null);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/movies');
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const addMovie = async (e) => {
        e.preventDefault();
        const newMovie = { title, description, genre, releaseDate };
        
        try {
            if (currentId) {
                await axios.put(`http://localhost:8080/api/movies/${currentId}`, newMovie);
            } else {
                await axios.post('http://localhost:8080/api/movies', newMovie);
            }
            // Reset form fields
            setTitle('');
            setDescription('');
            setGenre('');
            setReleaseDate('');
            setCurrentId(null);
            fetchMovies(); // Refresh movie list after add/update
        } catch (error) {
            console.error("Error adding/updating movie:", error);
        }
    };

    const editMovie = (movie) => {
        setTitle(movie.title);
        setDescription(movie.description);
        setGenre(movie.genre);
        setReleaseDate(movie.releaseDate);
        setCurrentId(movie.id);
    };

    const deleteMovie = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/movies/${id}`);
            fetchMovies(); // Refresh movie list after deletion
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    useEffect(() => {
        fetchMovies(); // Fetch movies on component mount
    }, []);

    return (
        <div>
            <h1>Movie Management</h1>
            <form onSubmit={addMovie}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Genre" 
                    value={genre} 
                    onChange={(e) => setGenre(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={releaseDate} 
                    onChange={(e) => setReleaseDate(e.target.value)} 
                    required 
                />
                <button type="submit">{currentId ? 'Update' : 'Add'} Movie</button>
            </form>
            <h2>Movie List</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <p>{movie.genre}</p>
                        <p>{movie.releaseDate}</p>
                        <button onClick={() => editMovie(movie)}>Edit</button>
                        <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieManagement;
