import React from 'react';
import './EmailConfirmation.css';

function EmailConfirmation() {
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
          <p>Password reset link sent to your email!</p>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
