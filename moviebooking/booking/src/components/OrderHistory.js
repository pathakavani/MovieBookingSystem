import React, { useState, useEffect } from 'react';
import './OrderHistory.css'; // Import the CSS file
import axios from 'axios'; // Import axios for making HTTP requests

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the user's order history from the backend
    axios.get('http://localhost:8080/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
      });
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
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
          {orders.map(order => (
            <tr key={order.bookingNumber}>
              <td>{order.bookingNumber}</td>
              <td>{order.movie}</td>
              <td>{order.promoID}</td>
              <td>{order.ticketPrice}</td>
              <td>{order.salesTax}</td>
              <td>{order.onlineFees}</td>
              <td>{order.orderTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
