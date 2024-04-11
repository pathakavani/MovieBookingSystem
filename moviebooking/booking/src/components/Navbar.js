import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

export default function Navbar({user}) 
{
    const nav = useNavigate();
    const [cuser, setUser] = useState(user);
    const handleLogout = () => {
        setUser(false);
        nav('/', {user : false})
      };

    return (
        <div>
             <nav>
                <Link to="/">Home</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>
                <Link to="/EditProfile">Edit Profile</Link>
            {cuser && <>
                <Link to="/manage-movies">Manage Movies</Link>
                <Link to="/manage-promotions">Manage Promotions</Link>
                <Link to="/manage-users">Manage Users</Link>
            </>}
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </nav>
        </div>
    )
}