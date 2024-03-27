import React from 'react';
import './EmailConfirmation.css';

const EmailConfirmation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand active" href="/">
          <p>Password reset link sent to your email!</p>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default EmailConfirmation;
