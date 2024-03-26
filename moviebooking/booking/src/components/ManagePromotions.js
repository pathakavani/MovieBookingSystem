// ManagePromotions.js
import React, { useState } from 'react';
import './ManagePromotions.css';

function ManagePromotions() {
  const [promotion, setPromotion] = useState({
    title: '',
    description: '',
    discountCode: '',
    validUntil: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here. Send the data to a server.
    console.log(promotion);
    alert("Promotion submitted! (Not really, but it will when we hook up the backend.)");
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
          Description:
          <textarea name="description" value={promotion.description} onChange={handleChange} />
        </label>
        <label>
          Discount Code:
          <input type="text" name="discountCode" value={promotion.discountCode} onChange={handleChange} />
        </label>
        <label>
          Valid Until:
          <input type="date" name="validUntil" value={promotion.validUntil} onChange={handleChange} />
        </label>
        <button type="submit">Submit Promotion</button>
      </form>
    </div>
  );
}

export default ManagePromotions;
