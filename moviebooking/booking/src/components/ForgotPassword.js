import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/forgotPassword', {
                email: email
            });
            console.log(response.data); // Handle the response as needed
            // Optionally, show a success message to the user
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#01161E' }}>
                {/* Navbar content */}
            </nav>

            {/* Forgot Password Card */}
            <div className="container login-container">
                <div className="card">
                    <div className="card-body" style={{ backgroundColor: '#AEC3B0' }}>
                        <h5 className="card-title">Forgot Password</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="custom-login-button btn btn-primary btn-block">
                                Send Recovery Email
                            </button>
                        </form>
                        <p className="mt-3">Don't have an account? <a href="SignUp.html" id="signupLink">Sign Up</a></p>
                        <p className="mt-3">Go back to login page: <a href="Login.html" id="login">Login</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
