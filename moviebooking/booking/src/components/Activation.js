import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Activation.css';

const Activation = () => {
    const [emailId, setEmail] = useState('');

    useEffect(() => {
        const getUrlParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const emailId = searchParams.get('email');
            return {emailId};
        };
        const {emailId } = getUrlParams();
        setEmail(emailId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to change the password
            const response = await axios.post('http://localhost:8080/activation', null, {
                params: {
                    email: emailId
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                alert("Your Account is Activated! Login to continue");
            }
            else{
                console.error(response.data);
                alert("Failed to activate your account");
            }
        } catch (error) {
            console.error("Error activating the account:", error);
            alert("Failed to activate your account");
        }
    };

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
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary btn-block mt-4" style={{ fontSize: '16px' }}>
          Click to Activate
        </button>
        <p style={{ fontSize: '14px' }}>Login to continue. <a href="Login" style={{ color: 'red' }}>Log In</a></p>
      </form>
    </div>
  </div>
</div>

  );
};

export default Activation;
