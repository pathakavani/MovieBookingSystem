import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function OrderHistory({ currentUserID }) {
  const [orders, setOrders] = useState([]);
  const {id} = useSelector(state => state.login)

  useEffect(() => {
    // Ensure currentUserID is a valid integer before parsing
    if (!Number.isInteger(id)) {
      console.error('currentUserID must be a valid integer.');
      return;
    }

    // Fetch the user's order history from the backend
    axios
      .get(`http://localhost:8080/getUserOrders?userID=${id}`)
      .then((response) => {
        setOrders(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
      });
  }, [currentUserID]);

  const fetchMovieTitle = async (showID) => {
    try {
      const response = await axios.get(`http://localhost:8080/getMovieTitle?showID=${parseInt(showID)}`);
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
          {orders.map(async (order) => (
            <tr key={order.bookingNumber}>
              <td>{order.bookingNumber}</td>
              <td>{order.promotion}</td>
              <td>{order.adults}</td>

              <td>{order.children}</td>
              <td>{order.seniors}</td>

              <td>{order.orderTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
