import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ManageMovie from './components/ManageMovie';
import ManagePromotions from './components/ManagePromotions';
import ManageUsers from './components/ManageUsers';
import { MoviesProvider } from './components/MoviesContext';
import SignupPage from './components/Signup';
import EditProfile from './components/EditProfile';
import Login from './components/Login';

function App() {
  const[isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if the user is logged in
    setIsAdmin(storedIsAdmin);
    setIsLoggedIn(storedIsLoggedIn);
}, []);

const handleLogin = () => {
  // Simulate an admin login and set in localStorage
  setIsAdmin(true);
  localStorage.setItem('isAdmin', 'true');
};

const handleLogout = () => {
  // Simulate a logout and clear localStorage
  setIsAdmin(false);
  setIsLoggedIn(false); // Update state to reflect logged-out status
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('isLoggedIn'); // Remove logged-in status from local storage
  navigate('/');
};

  return (
    <MoviesProvider>
    <Router>
      <div>
        <nav>
        <Link to="/">Home</Link>
          {isAdmin && <Link to="/manage-movies">Manage Movies</Link>}
          {isAdmin && <Link to="/manage-promotions">Manage Promotions</Link>}
          {isAdmin && <Link to="/manage-users">Manage Users</Link>}
          {/* Add a login/logout button for demonstration */}
          {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="nav-link">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>
              </>
            )}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignupPage />} />
          <Route path="/EditProfile" element={isLoggedIn ? <EditProfile />  : <Navigate replace to="/login" />} />
          {isAdmin && <Route path="/manage-movies" element={<ManageMovie />} />}
          {isAdmin && <Route path="/manage-promotions" element={<ManagePromotions />} />}
          {isAdmin && <Route path="/manage-users" element={<ManageUsers />} />}
          {/* Redirect non-admin users if they try to access admin pages directly */}
          <Route path="/manage-movies" element={<p>Access denied. Admins only.</p>} />
          <Route path="/manage-promotions" element={<p>Access denied. Admins only.</p>} />
          <Route path="/manage-users" element={<p>Access denied.</p>} />
        </Routes>
      </div>
    </Router>
    </MoviesProvider>
  );
}

export default App;

