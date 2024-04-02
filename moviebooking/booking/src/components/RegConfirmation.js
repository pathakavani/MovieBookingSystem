import React from 'react';
import './RegConfirmation.css';

function RegConfirmation() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand active" href="Main.php">
            <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="MovieHub Logo" /></i> MovieHub
          </a>
        </div>
      </nav>
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
