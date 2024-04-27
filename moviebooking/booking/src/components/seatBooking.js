import React, { useState, useEffect } from 'react';
import './seatBooking.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function MovieTickets() {
    const [ticketCounts, setTicketCounts] = useState({
        child: 0,
        Adult: 0,
        senior: 0
    });

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedShowtime, setSelectedShowtime] = useState(''); // State to store selected showtime
    const [selectedDate, setSelectedDate] = useState(''); // State to store selected date
    const [showErrorMessage, setShowErrorMessage] = useState(false); // State to toggle error message
    const isLoggedIn = useSelector((state) => state.login.email);
    //console.log("isLoggedIn:", isLoggedIn);  
    const navigate = useNavigate();
    const [showDates, setShowDates] = useState([]);
    const [showTimes, setShowTimes] = useState([]);
    const movieId = 3;

    const ticketPrices = {
        child: 5,
        Adult: 15,
        senior: 6
    };

    const numRows = 10; // Number of rows
    const numColumns = 8; // Number of columns

    // Fetch show dates and times from the API based on the retrieved movie object
    useEffect(() => {
        // if (movie && movie.id) {
        fetch(`http://localhost:8080/getShowDateTime?movieId=${movieId}`)
            .then(response => response.json())
            .then(data => {
                const dates = Object.keys(data);
                setShowDates(dates);

                // Set initial show times for the first date
                if (dates.length > 0) {
                    const initialTimes = data[dates[0]];
                    setShowTimes(initialTimes);

                    setSelectedDate(dates[0]); // Set the default selected date
                }
            })
            .catch(error => console.error('Error fetching show dates and times:', error));
        // }
    }, []);

    // Update show times when the selected date changes
    useEffect(() => {
        if (selectedDate) {
            fetch(`http://localhost:8080/getShowDateTime?movieId=${movieId}`)
                .then(response => response.json())
                .then(data => {
                    const selectedTimes = data[selectedDate];
                    setShowTimes(selectedTimes);
                })
                .catch(error => console.error('Error fetching show times for the selected date:', error));
        }
    }, [selectedDate]);


    const updateTotal = () => {
        const totalSelectedTickets = Object.values(ticketCounts).reduce((acc, curr) => acc + curr, 0);
        const totalPrice = Object.keys(ticketCounts).reduce((acc, type) => acc + (ticketCounts[type] * ticketPrices[type]), 0);

        return { totalSelectedTickets, totalPrice };
    };

    const handleTicketChange = (type, value) => {
        setTicketCounts(prevCounts => ({ ...prevCounts, [type]: value }));
    };

    const handleSeatClick = (row, column) => {
        const seatId = `${row}-${column}`;
        setSelectedSeats(prevSeats => prevSeats.includes(seatId)
            ? prevSeats.filter(id => id !== seatId)
            : [...prevSeats, seatId]
        );
    };

    // Generate seat elements dynamically
    const generateSeats = () => {
        const seats = [];
        for (let i = 1; i <= numRows; i++) {
            const row = [];
            for (let j = 1; j <= numColumns; j++) {
                const seatId = `${i}-${j}`;
                row.push(
                    <div
                        key={seatId}
                        className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(i, j)}
                    ></div>
                );
            }
            seats.push(<div className="row" key={i}>{row}</div>);
        }
        return seats;
    };

    const handleCheckout = () => {
        const areCategoriesChosen = Object.values(ticketCounts).some(count => count > 0);
        if (!areCategoriesChosen || !selectedShowtime || !selectedDate || selectedSeats.length === 0) {
            setShowErrorMessage(true);
        } else {
            if (!isLoggedIn) {
                navigate('/login');
            } else {
                // Check if the user is already logged in and navigate accordingly
                navigate('/checkout');
            }
        }
    };
    

    const isContinueEnabled = () => {
        const areSeatsSelected = selectedSeats.length > 0;
        const areCategoriesChosen = Object.values(ticketCounts).some(count => count > 0);
        const isValid = areSeatsSelected && areCategoriesChosen && selectedShowtime && selectedDate;

        return isValid;
    };

    useEffect(() => {
        setShowErrorMessage(!isContinueEnabled());
    }, [selectedSeats, ticketCounts, selectedShowtime, selectedDate]);
    

    return (
        <div className='body'>
            {showErrorMessage && (
                <div className="error-message">Please select showtime, date, seats, and tickets before continuing.</div>
            )}
            <div className="movie-container">
                <div>
                    <label htmlFor="showDate">Select Date:</label>
                        <select id="showDate" onChange={(e) => setSelectedDate(e.target.value)}>
                        <option value="">Select Date</option>
                        {showDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                        </select>
                    <label htmlFor="showtime">Select Showtime:</label>
                        <select id="showtime" onChange={(e) => setSelectedShowtime(e.target.value)}>
                            <option value="">Select Showtime</option>
                            {showTimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                        <label htmlFor="category">Select Category and Tickets:</label>
                    <div className="ticket-row">
                        <div className="ticket-group">
                            <label htmlFor="child">Child(0-17):</label>
                            <div className="ticket-input">
                                <button className="ticket-decrease" type="button" onClick={() => handleTicketChange('child', Math.max(ticketCounts.child - 1, 0))}>-</button>
                                <input
                                    type="number"
                                    id="child"
                                    name="child"
                                    min="0"
                                    value={ticketCounts.child}
                                    onChange={(e) => handleTicketChange('child', parseInt(e.target.value) || 0)}
                                />
                                <button className="ticket-increase" type="button" onClick={() => handleTicketChange('child', ticketCounts.child + 1)}>+</button>
                            </div>
                        </div>
                        <div className="ticket-group">
                            <label htmlFor="above18">Adult(18-59):</label>
                            <div className="ticket-input">
                                <button className="ticket-decrease" type="button" onClick={() => handleTicketChange('Adult', Math.max(ticketCounts.Adult - 1, 0))}>-</button>
                                <input
                                    type="number"
                                    id="Adult"
                                    name="Adult"
                                    min="0"
                                    value={ticketCounts.Adult}
                                    onChange={(e) => handleTicketChange('Adult', parseInt(e.target.value) || 0)}
                                />
                                <button className="ticket-increase" type="button" onClick={() => handleTicketChange('Adult', ticketCounts.Adult + 1)}>+</button>
                            </div>
                        </div>
                        <div className="ticket-group">
                            <label htmlFor="senior">Senior(&gt;60):</label>
                            <div className="ticket-input">
                                <button className="ticket-decrease" type="button" onClick={() => handleTicketChange('senior', Math.max(ticketCounts.senior - 1, 0))}>-</button>
                                <input
                                    type="number"
                                    id="senior"
                                    name="senior"
                                    min="0"
                                    value={ticketCounts.senior}
                                    onChange={(e) => handleTicketChange('senior', parseInt(e.target.value) || 0)}
                                />
                                <button className="ticket-increase" type="button" onClick={() => handleTicketChange('senior', ticketCounts.senior + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#124559' }}>
                    <ul className="showcase">
                        <li>
                            <div className="seat"></div>
                            <small>N/A</small>
                        </li>
                        <li>
                            <div className="seat selected"></div>
                            <small>Selected</small>
                        </li>
                        <li>
                            <div className="seat occupied"></div>
                            <small>Occupied</small>
                        </li>
                    </ul>
                    <div className="container" >
                        <div className="screen"></div>
                        {generateSeats()}
                        <p className="text">
                            You have selected <span id="count">{updateTotal().totalSelectedTickets}</span><br />
                            Subtotal: $<span id="total">{updateTotal().totalPrice.toFixed(2)}</span>
                        </p>
                        <button className='continue' disabled={!isContinueEnabled()} onClick={handleCheckout}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieTickets;