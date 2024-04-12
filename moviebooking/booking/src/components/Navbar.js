import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/editprofile">Profile</Link>
          {user.isAdmin && (
            <>
              <Link to="/manage-movies">Manage Movies</Link>
              <Link to="/manage-promotions">Manage Promotions</Link>
              <Link to="/manage-users">Manage Users</Link>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
