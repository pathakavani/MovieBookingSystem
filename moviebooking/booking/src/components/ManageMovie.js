import React, { useState, useContext, useEffect } from 'react';
import { MoviesContext } from './MoviesContext';
import './ManageMovie.css';
import MovieModal from "./MovieModal";
import axios from 'axios';

function ManageMovie() {
  const { movies, addMovie, editMovie, deleteMovie } = useContext(MoviesContext);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const initialState = {
    id: null,
    title: '',
    category: '',
    cast: '',
    director: '',
    producer: '',
    synopsis: '',
    reviews: '',
    poster: '',
    trailer: '',
    mpaaRating: '',
    showDates: '',
    showTimes: '',
  };

  const [movie, setMovie] = useState(initialState);
  const [apiMovies, setApiMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/movies')
      .then(response => {
        setApiMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movie.id) {
      try {
        await axios.put(`http://localhost:8080/updateMovie/${movie.id}`, movie);
        editMovie(movie);
      } catch (error) {
        console.error('Error updating movie:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8080/addMovie', movie);
        addMovie(response.data);
      } catch (error) {
        console.error('Error adding movie:', error);
      }
    }
    setMovie(initialState);
    setShowForm(false);
  };

  const handleEdit = (movieToEdit) => {
    setMovie(movieToEdit);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this movie?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/deleteMovie/${id}`);
        deleteMovie(id);
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      {!showForm && (
        <button className='add-movie-button' onClick={() => { setMovie(initialState); setShowForm(true); }}>Add Movie</button>
      )}
      {showForm && (
        <div className='form-container'>
          <h2>{movie.id ? "Edit Movie" : "Add New Movie"}</h2>
          <div className='back-button'>
            <button onClick={() => setShowForm(false)}>Back to Movie List</button>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={movie.title} onChange={handleChange} />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={movie.category} onChange={handleChange} />
            </label>
            <label>
              Cast:
              <input type="text" name="cast" value={movie.cast} onChange={handleChange} />
            </label>
            <label>
              Director:
              <input type="text" name="director" value={movie.director} onChange={handleChange} />
            </label>
            <label>
              Producer:
              <input type="text" name="producer" value={movie.producer} onChange={handleChange} />
            </label>
            <label>
              Synopsis:
              <textarea name="synopsis" value={movie.synopsis} onChange={handleChange} />
            </label>
            <label>
              Reviews:
              <textarea name="reviews" value={movie.reviews} onChange={handleChange} />
            </label>
            <label>
              Poster URL:
              <input type="text" name="poster" value={movie.poster} onChange={handleChange} placeholder="Enter URL for the movie poster" />
            </label>
            <label>
              Trailer URL:
              <input type="text" name="trailer" value={movie.trailer} onChange={handleChange} placeholder="Enter YouTube URL for the trailer" />
            </label>
            <label>
              MPAA Rating:
              <select name="mpaaRating" value={movie.mpaaRating} onChange={handleChange}>
                <option value="">Select Rating</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
              </select>
            </label>
            <label>
              Show Dates:
              <input type="date" name="showDates" value={movie.showDates} onChange={handleChange} />
            </label>
            <label>
              Show Times:
              <input type="time" name="showTimes" value={movie.showTimes} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {!showForm && (
        <div className='movie-list-container'>
          <h3>Movie List</h3>
          {apiMovies.map((movie) => (
            <div key={movie.id} className='movie-item' onClick={() => handleMovieClick(movie)}>
              <p>{movie.title}</p>
              <button onClick={() => handleEdit(movie)}>Edit</button>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}

export default ManageMovie;
