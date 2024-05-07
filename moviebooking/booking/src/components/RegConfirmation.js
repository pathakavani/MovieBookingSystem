import React from 'react';
import './RegConfirmation.css';

function RegConfirmation() {
  return (
    <div>
      <div className="orderbox">
        <div className="confirmationtext">
          <p>Your account registration has been completed!</p>
          
          <p>A registration confirmation has been sent to your email.</p>
        </div>
      </div>
      <p className="mt-3">Already have an account? <a href="Login">Log In</a></p>
    </div>
  );
}

export default RegConfirmation;
