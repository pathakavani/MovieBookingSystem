import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const encodedPassword = btoa(password);;
  const handleSubmit = async (event) => { // Use async to handle asynchronous logic
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', null, {
        params: {
          email: email,
          password: encodedPassword
        }
      });
      if (response.status === 200) { // Use triple equals for strict comparison
        // Check the response data for login status
        console.log(response.data)
        if (response.data === "Login successful as admin") {
          const isAdmin = response.data == "Login successful as admin";
          // Redirect to homepage upon successful login
          localStorage.setItem('isAdmin', isAdmin);
          navigate('/');
        } else if (response.data === "Login successful as customer") {
          // Redirect to homepage upon successful login
          navigate('/');
        } else {
          // Display the response data (error message) if login failed
          console.error('Login failed:', response.data);
          toast.error(response.data);
          toast.error('Invalid credentals. Please try again.');
        }
      } else {
        // Handle other HTTP status codes (e.g., 400 Bad Request)
        console.error('Login failed:', response.statusText);
        toast.error(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      if(error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('No response received. Check your network connection.');
      } else {
        toast.error('Error setting up the request.');
      }
    }
  };

  return (
    <div>
        {/* HTML header */}
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Login Page</title>
            {/* Include Bootstrap CSS */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,300;1,900&family=Lilita+One&display=swap" rel="stylesheet" />
        </head>
        <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
            <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif, Lilita One, cursive' }} href="/">
                <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="MovieHub Logo" /></i> MovieHub
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
                </ul>
            </div>
            </div>
        </nav>

        {/* Login Card */}
        <div className="container login-container">
            <div className="card">
            <div className="card-body" style={{ backgroundColor: '#AEC3B0' }}>
                <h2 className="card-title">Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="custom-login-button btn btn-primary btn-block">Login</button>
                </form>
                <p className="mt-3">Don't have an account? <a href="#" onClick={() => navigate('/signup')}>Sign Up</a></p>
                <p className="mt-3">Forgot password? <a href="#" onClick={() => {
                  console.log('Forgot password link clicked');
                  navigate('/forgotPassword');
                }}>Reset Password</a></p>
            </div>
            </div>
        </div>
      </div>

      {/* Include Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default Login;