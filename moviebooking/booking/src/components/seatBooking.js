// import React, { useState } from 'react';
// import './seatBooking.css';

// function MovieTickets() {
//     const [ticketCounts, setTicketCounts] = useState({
//         child: 0,
//         Adult: 0,
//         senior: 0
//     });

//     const [selectedSeats, setSelectedSeats] = useState([]);

//     const ticketPrices = {
//         child: 5,
//         Adult: 15,
//         senior: 6
//     };

//     const numRows = 10; // Number of rows
//     const numColumns = 8; // Number of columns

//     const updateTotal = () => {
//         const totalSelectedTickets = Object.values(ticketCounts).reduce((acc, curr) => acc + curr, 0);
//         const totalPrice = Object.keys(ticketCounts).reduce((acc, type) => acc + (ticketCounts[type] * ticketPrices[type]), 0);

//         return { totalSelectedTickets, totalPrice };
//     };

//     const handleTicketChange = (type, value) => {
//         const newCounts = { ...ticketCounts, [type]: value };
//         setTicketCounts(newCounts);
//     };

//     const handleSeatClick = (row, column) => {
//         const seatId = `${row}-${column}`;
//         const updatedSelectedSeats = selectedSeats.includes(seatId)
//             ? selectedSeats.filter(id => id !== seatId)
//             : [...selectedSeats, seatId];
//         setSelectedSeats(updatedSelectedSeats);
//     };

//     // Generate seat elements dynamically
//     const generateSeats = () => {
//         const seats = [];
//         for (let i = 1; i <= numRows; i++) {
//             const row = [];
//             for (let j = 1; j <= numColumns; j++) {
//                 const seatId = `${i}-${j}`;
//                 row.push(
//                     <div
//                         key={seatId}
//                         className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
//                         onClick={() => handleSeatClick(i, j)}
//                     ></div>
//                 );
//             }
//             seats.push(<div className="row" key={i}>{row}</div>);
//         }
//         return seats;
//     };

//     // Check if seats are selected or tickets are added
//     const isContinueEnabled = () => {
//         return selectedSeats.length > 0 && Object.values(ticketCounts).some(count => count > 0);
//     };

//     return (
//         <div className='body'>
//             <nav className="navbar navbar-expand-lg">
//         <div className="container-fluid">
//           <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif', fontFamily: 'Lilita One, cursive' }} href="Main.php">
//             <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="logo" /></i> MovieHub
//           </a>
//         </div>
//       </nav>
      
//         <div className="movie-container">
//             <div>
//                 <label htmlFor="showtime">Select Showtime:</label>
//                 <select id="showtime">
//                     <option value="0">Select Showtime</option>
//                     <option value="1">12:00 PM</option>
//                     <option value="2">3:00 PM</option>
//                     <option value="3">6:00 PM</option>
//                 </select>
//                 <lable htmlFor="showDate">Select Date</lable>
//                 <input type="date" id="showdate" name="showdate"></input>
//                 <h5>Select category and Ticket:</h5>
                
//                 <div className="ticket-row">
//                     <div className="ticket-group">
//                         <label htmlFor="child">Child(0-17):</label>
//                         <div className="ticket-input">
//                             <button className="ticket-decrease" type="button" onClick={() => handleTicketChange('child', Math.max(ticketCounts.child - 1, 0))}>-</button>
//                             <input
//                                 type="number"
//                                 id="child"
//                                 name="child"
//                                 min="0"
//                                 value={ticketCounts.child}
//                                 onChange={(e) => handleTicketChange('child', parseInt(e.target.value) || 0)}
//                             />
//                             <button className="ticket-increase" type="button" onClick={() => handleTicketChange('child', ticketCounts.child + 1)}>+</button>
//                         </div>
//                     </div>
//                     <div className="ticket-group">
//                         <label htmlFor="above18">Adult(18-59):</label>
//                         <div className="ticket-input">
//                             <button className="ticket-decrease" type="button" onClick={() => handleTicketChange('Adult', Math.max(ticketCounts.Adult - 1, 0))}>-</button>
//                             <input
//                                 type="number"
//                                 id="Adult"
//                                 name="Adult"
//                                 min="0"
//                                 value={ticketCounts.Adult}
//                                 onChange={(e) => handleTicketChange('Adult', parseInt(e.target.value) || 0)}
//                             />
//                             <button className="ticket-increase" type="button" onClick={() => handleTicketChange('Adult', ticketCounts.Adult + 1)}>+</button>
//                         </div>
//                     </div>
//                     <div className="ticket-group">
//                         <label htmlFor="senior">Senior(&gt;60):</label>
//                         <div className="ticket-input">
//                             <button className="ticket-decrease" type="button" onClick={() => handleTicketChange('senior', Math.max(ticketCounts.senior - 1, 0))}>-</button>
//                             <input
//                                 type="number"
//                                 id="senior"
//                                 name="senior"
//                                 min="0"
//                                 value={ticketCounts.senior}
//                                 onChange={(e) => handleTicketChange('senior', parseInt(e.target.value) || 0)}
//                             />
//                             <button className="ticket-increase" type="button" onClick={() => handleTicketChange('senior', ticketCounts.senior + 1)}>+</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div style={{backgroundColor:'#124559'}}>
//                 <ul className="showcase">
//                     <li>
//                         <div className="seat"></div>
//                         <small>N/A</small>
//                     </li>
//                     <li>
//                         <div className="seat selected"></div>
//                         <small>Selected</small>
//                     </li>
//                     <li>
//                         <div className="seat occupied"></div>
//                         <small>Occupied</small>
//                     </li>
//                 </ul>
//                 <div className="container" >
//                     <div className="screen"></div>
//                     {generateSeats()}
//                     <p className="text">
//                         You have selected <span id="count">{updateTotal().totalSelectedTickets}</span><br />
//                         Subtotal: $<span id="total">{updateTotal().totalPrice.toFixed(2)}</span>
//                     </p>
//                     <button className='continue' disabled={!isContinueEnabled()}><a href="try">Continue</a></button>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default MovieTickets;


import React, { useState, useEffect } from 'react';
import './seatBooking.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function MovieTickets({ showDates, showTimes }) {
    const [ticketCounts, setTicketCounts] = useState({
        child: 0,
        Adult: 0,
        senior: 0
    });

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedShowtime, setSelectedShowtime] = useState(''); // State to store selected showtime
    const [selectedDate, setSelectedDate] = useState(''); // State to store selected date
    const [showErrorMessage, setShowErrorMessage] = useState(false); // State to toggle error message
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const navigate = useNavigate();

    const ticketPrices = {
        child: 5,
        Adult: 15,
        senior: 6
    };

    const numRows = 10; // Number of rows
    const numColumns = 8; // Number of columns

    const updateTotal = () => {
        const totalSelectedTickets = Object.values(ticketCounts).reduce((acc, curr) => acc + curr, 0);
        const totalPrice = Object.keys(ticketCounts).reduce((acc, type) => acc + (ticketCounts[type] * ticketPrices[type]), 0);

        return { totalSelectedTickets, totalPrice };
    };

    const handleTicketChange = (type, value) => {
        const newCounts = { ...ticketCounts, [type]: value };
        setTicketCounts(newCounts);
    };

    const handleSeatClick = (row, column) => {
        const seatId = `${row}-${column}`;
        const updatedSelectedSeats = selectedSeats.includes(seatId)
            ? selectedSeats.filter(id => id !== seatId)
            : [...selectedSeats, seatId];
        setSelectedSeats(updatedSelectedSeats);
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

    // Check if seats are selected and categories are chosen
    const isContinueEnabled = () => {
        const areSeatsSelected = selectedSeats.length > 0;
        const areCategoriesChosen = Object.values(ticketCounts).some(count => count > 0);
        const isShowtimeSelected = selectedShowtime !== '';
        const isDateSelected = selectedDate !== '';
    
        if (!areSeatsSelected || !areCategoriesChosen || !isShowtimeSelected || !isDateSelected) {
            setShowErrorMessage(true);
            return false;
        } else {
            setShowErrorMessage(false);
            return true;
        }
    };
    
    const handleCheckout = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className='body'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    {/* Removed the Movies dropdown */}
                    <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif', fontFamily: 'Lilita One, cursive' }} href="Main.php">
                        <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="logo" /></i> MovieHub
                    </a>
                </div>
            </nav>
            {showErrorMessage && <div className="error-message">Please select showtime, date, seats, and tickets before continuing.</div>}
            <div className="movie-container">
                <div>
                    <label htmlFor="showtime">Select Showtime:</label>
                    <select id="showtime" onChange={(e) => setSelectedShowtime(e.target.value)}>
                        <option value="">Select Showtime</option>
                        {showTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                    <label htmlFor="showDate">Select Date:</label>
                    <select id="showDate" onChange={(e) => setSelectedDate(e.target.value)}>
                        <option value="">Select Date</option>
                        {showDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                    <h5>Select category and Ticket:</h5>
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
