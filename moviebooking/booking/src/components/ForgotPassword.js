import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#01161E' }}>
                <div className="container-fluid">
                    <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif, Lilita One, cursive' }} href="/">
                        <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="logo" /></i> UGAMovieFinder
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
                        <h5 className="card-title">Forgot Password</h5>
                        <form id="passwordrecovery" action="SendRecoveryEmail.php" method="post">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" name="email" required />
                            </div>
                            <button type="submit" className="custom-login-button btn btn-primary btn-block">Send Recovery Email</button>
                        </form>
                        <p className="mt-3">Don't have an account? <a href="SignUp.html" id="signupLink">Sign Up</a></p>
                        <p className="mt-3">Go back to login page: <a href="Login.html" id="login">Login</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;