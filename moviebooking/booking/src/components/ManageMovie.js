import React, { useState, useContext, useEffect } from 'react';
import { MoviesContext } from './MoviesContext';
import './ManageMovie.css';
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
    url: '',
    trailer: '',
    mpaa_rating: '',
    shows: [],
    screen: '',
    showDates: '',
    showTimes: ''
  };

  const [movie, setMovie] = useState(initialState);
  const [apiMovies, setApiMovies] = useState([]);

  const getMovies = () =>  {
    axios.get('http://localhost:8080/movies')
      .then(response => {
        setApiMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
  useEffect(() => {
     getMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movie && movie.id) {
      try {
        const response = await axios.put(`http://localhost:8080/updateMovie/${movie.id}`, movie);
        console.log('Update Movie:', response);
        alert(response.data);
        editMovie(movie); // Ensure that the correct movie object with the id property is passed
      } catch (error) {
        console.error('Error updating movie:', error);
      }
    } else {
      try {
        console.log('movie:', movie);
        const response = await axios.post('http://localhost:8080/addMovie', movie);
        addMovie(response.data);
        alert(response.data);
        console.log('adding movie response:', response.data);
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
        console.log('Delete id:', id);
        const response = await axios.delete(`http://localhost:8080/deleteMovie/${id}`);
        console.log('Delete response:', response);
        deleteMovie(id);
        getMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
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
              Release Date:
              <input type="date" name="release_date" value={movie.release_date} onChange={handleChange} />
            </label>
            <label>
              Duration:
              <input type="text" name="duration" value={movie.duration} onChange={handleChange} />
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
              <input type="text" name="poster" value={movie.url} onChange={handleChange} placeholder="Enter URL for the movie poster" />
            </label>
            <label>
              Trailer URL:
              <input type="text" name="trailer" value={movie.trailer} onChange={handleChange} placeholder="Enter YouTube URL for the trailer" />
            </label>
            <label>
              MPAA Rating:
              <select name="mpaaRating" value={movie.mpaa_rating} onChange={handleChange}>
                <option value="">Select Rating</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
              </select>
            </label>
            {movie.shows && movie.shows.length > 0 && (
              <label>
                Current Shows:
                {movie.shows.map((show, index) => (
                  <p key={index}>{show}</p>
                ))}
              </label>
            )}
            <label>
            Screen:
            <select type="text" name="screen" onChange={handleChange}>
            <option value="">Select Screen</option>
              <option value="screen1">Screen 1</option>
              <option value="screen2">Screen 2</option>
              <option value="screen3">Screen 3</option>
              <option value="screen4">Screen 4</option>
              <option value="screen5">Screen 5</option>
            </select>
          </label>
            <label>
              Show Dates:
              <input type="date" name="showDates" onChange={handleChange} />
            </label>
            <label>
              Show Times:
              <select type="time" name="showTimes" onChange={handleChange}>
              <option value="">Select Show Time</option>
              <option value="showTime1">10:00:00</option>
              <option value="showTime2">13:00:00</option>
              <option value="showTime3">16:00:00</option>
              <option value="showTime4">20:00:00</option>
            </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {!showForm && (
        <div className='movie-list-container'>
          <h3>Movie List</h3>
          {apiMovies ? (
            apiMovies.map((movie) => (
              <div key={movie.id} className='movie-item'>
                <p>{movie.title}</p>
                <button onClick={() => handleEdit(movie)}>Edit</button>
                <button onClick={() => handleDelete(movie.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageMovie;