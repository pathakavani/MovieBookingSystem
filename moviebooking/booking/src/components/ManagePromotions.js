// ManagePromotions.js
import React, { useState } from 'react';
import './ManagePromotions.css';
import axios from 'axios';

function ManagePromotions() {
  const [promotion, setPromotion] = useState({
    title: '',
    promoCode: '',
    startDate: '',
    endDate: '',
    discount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };

  const handleSubmit = async(e) => {    
      e.preventDefault();
      try {
        // Send the promotion data to the backend
        const response = await axios.post('http://localhost:8080/addPromotion', promotion);
        console.log(response.data); // Log the response from the backend
        alert("Promotion submitted successfully!");
      } catch (error) {
        console.error('Error submitting promotion:', error);
        alert("Failed to submit promotion. Please try again later.");
      }
    };

  return (
    <div className='manage-promotions-container'>
      <h2>Manage Promotions</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={promotion.title} onChange={handleChange} />
        </label>
        <label>
          Discount Code:
          <input type="text" name="promoCode" value={promotion.promoCode} onChange={handleChange} />
        </label>
        <label>
          Discount amount:
          <input type="text" name="discount" value={promotion.discount} onChange={handleChange} />
        </label>
        <label>
          Start date:
          <input type="date" name="startDate" value={promotion.startDate} onChange={handleChange} />
        </label>
        <label>
          Valid Until:
          <input type="date" name="endDate" value={promotion.endDate} onChange={handleChange} />
        </label>
        <button type="submit">Submit Promotion</button>
      </form>
    </div>
  );
}

export default ManagePromotions;
