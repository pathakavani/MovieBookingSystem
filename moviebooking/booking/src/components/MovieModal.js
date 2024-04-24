import React from 'react';
import './MovieModal.css'; 

const MovieModal = ({ movie, onClose }) => {
  const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoID = extractVideoID(movie.trailer);
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  const formatDates = (dates) => {
    return Array.isArray(dates) ? dates.join(', ') : dates;
  };

  const formatTimes = (times) => {
    return Array.isArray(times) ? times.join(', ') : times;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{movie.title}</h2>
        <div className="modal-trailer">
          {videoID ? (
            <iframe
              width="560"
              height="315"
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Trailer not available.</p>
          )}
        </div>
        <p><strong>Category:</strong> {movie.category}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Producer:</strong> {movie.producer}</p>
        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
        <p><strong>Reviews:</strong> {movie.reviews}</p>
        <p><strong>MPAA Rating:</strong> {movie.mpaaRating}</p>
        <p><strong>Show Dates:</strong> {formatDates(movie.showDates)}</p>
        <p><strong>Show Times:</strong> {formatTimes(movie.showTimes)}</p>
        <a href="/seatBooking.js" className="booking-button">Book Now</a>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MovieModal;