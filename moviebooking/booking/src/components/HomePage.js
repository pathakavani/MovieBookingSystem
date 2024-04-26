import React, { useState, useContext, useEffect, useSyncExternalStore } from 'react';
import { MoviesContext } from './MoviesContext';
import MovieModal from './MovieModal';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './HomePage.css';
import axios from "axios";

function HomePage({ route, navigation }) {
  const user = route;
  const { movies } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [moves, setMoves] = useState([]);
  const [showMoves, setShowMoves] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/movies")
            .then(data => {setMoves(data.data)
            console.log(data.data)})
            .catch(err => console.log(err));
            console.log(moves)
            // setShowMoves(moves);
  }, [])
  useEffect(() => {
    
    console.log(searchTerm)
    setMoves((moves) => moves.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    ||  movie.director.toLowerCase().includes(searchTerm.toLowerCase()) 
    ||  movie.category.toLowerCase().includes(searchTerm.toLowerCase()) 
    ||  movie.producer.toLowerCase().includes(searchTerm.toLowerCase()) 
    ||  movie.cast.toLowerCase().includes(searchTerm.toLowerCase()) 
      ))
      if (searchTerm == '') {
        axios.get("http://localhost:8080/movies")
            .then(data => setMoves(data.data))
            .catch(err => console.log(err));
      }
  }, [searchTerm])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const today = new Date();
  
  const showingNowMovies = movies.filter((movie) => {
    const showDate = new Date(movie.showDates);
    return showDate <= today;
  });

  const comingSoonMovies = movies.filter((movie) => {
    const showDate = new Date(movie.showDates);
    return showDate > today;
  });

  const filteredShowingNowMovies = searchTerm
    ? showingNowMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : showingNowMovies;

  const filteredComingSoonMovies = searchTerm
    ? comingSoonMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : comingSoonMovies;

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h1>Movie Ticket Booking Website</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for movies, directors, cast, producers, categories"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <section>
        <h2 className="section-heading">Showing Now</h2>
        <div className="movie-grid">
          {showingNowMovies ? showingNowMovies.map((movie, index) => (
            <div key={index} className="movie-card" onClick={() => openModal(movie)}>
              <img src={movie.url} alt={`${movie.title} Poster`} className="movie-poster" />
              <div className="movie-title">{movie.title}</div>
            </div>
          )): <div>
          <h1>No Movies</h1>
          </div>}
        </div>
      </section>
      <section>
        <h2 className="section-heading">Coming Soon</h2>
        <div className="movie-grid">
          {comingSoonMovies ? comingSoonMovies.map((movie, index) => (
            <div key={index} className="movie-card" onClick={() => openModal(movie)}>
              <img src={movie.poster} alt={`${movie.title} Poster`} className="movie-poster" />
              <div className="movie-title">{movie.title}</div>
            </div>
          )): <div>
            <h1>No Movies</h1>
            </div>}
        </div>
      </section>
      {modalVisible && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default HomePage;