import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Activation from './components/Activation';
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  const [user, setUser] = useState(null); // State to hold user information

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null); // Clear user information
    localStorage.removeItem('user'); // Remove user data from localStorage if stored
    window.location.href = '/'; // Redirect to home page
  };

  // useEffect(() => {
  //   // Check if user data is stored in localStorage
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser)); // If stored, set the user state
  //   }
  // }, []);

  return (
    <MoviesProvider>
      <Router>
        <div>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword" element={<ChangePassword />} />
            <Route path="/regConfirmation" element={<RegConfirmation />} />
            <Route path="/EmailConfirmation" element={<EmailConfirmation />} />
            <Route path="/activation" element={<Activation />} />
            <Route
              path="/editprofile"
              element={user ? <EditProfile /> : <Navigate to="/login" replace />}
            />
            {user && user.isAdmin && (
              <>
                <Route path="/manage-movies" element={<ManageMovie />} />
                <Route path="/manage-promotions" element={<ManagePromotions />} />
                <Route path="/manage-users" element={<ManageUsers />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </MoviesProvider>
  );
}

export default App;
