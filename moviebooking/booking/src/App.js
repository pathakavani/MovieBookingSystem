import './App.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ManageMovie from './components/ManageMovie';
import ManagePromotions from './components/ManagePromotions';
import ManageUsers from './components/ManageUsers';
import { MoviesProvider } from './components/MoviesContext';
import SignupPage from './components/Signup';
import EditProfile from './components/EditProfile';
import Login from './components/Login';
import ForgetPassword from './components/ForgotPassword';
import EmailConfirmation from './components/EmailConfirmation';
import RegConfirmation from './components/RegConfirmation';
import ChangePassword from './components/ChangePassword';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let { token, email } = useParams();
  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAdmin(storedIsAdmin);
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleLogout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <MoviesProvider>
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            {isAdmin && <>
              <Link to="/manage-movies">Manage Movies</Link>
              <Link to="/manage-promotions">Manage Promotions</Link>
              <Link to="/manage-users">Manage Users</Link>
            </>}
            {isLoggedIn && !isAdmin && <>
              <Link to="/EditProfile">Edit Profile</Link>
            </>}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="nav-link">Logout</button>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword" element={<ChangePassword token={token} email={email} />}/>
            <Route path="/regConfirmation" element={<RegConfirmation />} />
            <Route path="/EmailConfirmation" element={<EmailConfirmation />} />
            <Route path="/regConfirmation" element={<RegConfirmation />} />
            <Route path="/editprofile" element={isLoggedIn ? <EditProfile /> : <Navigate replace to="/login" />} />
            {isAdmin && <Route path="/manage-movies" element={<ManageMovie />} />}
            {isAdmin && <Route path="/manage-promotions" element={<ManagePromotions />} />}
            {isAdmin && <Route path="/manage-users" element={<ManageUsers />} />}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </Router>
    </MoviesProvider>
  );
}

export default App;
