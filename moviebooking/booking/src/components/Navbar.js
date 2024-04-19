import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.login.admin)
  const email = useSelector((state) => state.login.email)
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {email ? (
        <>
          <Link to="/editprofile">Profile</Link>
          {isAdmin && (
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
