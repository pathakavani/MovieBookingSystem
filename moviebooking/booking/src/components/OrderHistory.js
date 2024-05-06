import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { email } = useSelector((state) => state.login);

  useEffect(() => {
    // Fetch the user's order history from the backend
    axios
      .get(`http://localhost:8080/getUserOrders?email=${email}`)
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
      });
  }, [email]);

  const fetchMovieTitle = async (showID) => {
    try {
      const response = await axios.get(`http://localhost:8080/getMovieTitle?showID=${showID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie title:', error);
      return '';
    }
  };

  return (
    <div className="order-history-container">
      <div className="title">
        <h2>Order History</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Booking Number</th>
            <th>Movie</th>
            <th>Promo ID</th>
            <th>Ticket Price</th>
            <th>Sales Tax</th>
            <th>Online Fees</th>
            <th>Order Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.bookingNumber}>
              <td>{order.bookingNumber}</td>
              <td>
                <MovieTitleLoader showID={order.showID} fetchMovieTitle={fetchMovieTitle} />
              </td>
              <td>{order.promoID}</td>
              <td>{order.ticketPrice}</td>
              <td>{order.salesTax}</td>
              <td>{order.onlineFee}</td>
              <td>{order.orderTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MovieTitleLoader = ({ showID, fetchMovieTitle }) => {
  const [movieTitle, setMovieTitle] = useState('Loading...');

  useEffect(() => {
    const fetchTitle = async () => {
      const title = await fetchMovieTitle(showID);
      setMovieTitle(title);
    };
    fetchTitle();
  }, [showID, fetchMovieTitle]);

  return <>{movieTitle}</>;
};

export default OrderHistory;
