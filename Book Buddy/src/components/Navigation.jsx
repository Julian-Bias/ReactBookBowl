import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles.css";

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!token;

  return (
    <nav className="navigation">
      <Link to="/books" className="nav-link">
        Home
      </Link>

      {/* Conditionally render Login link only if the user is not logged in */}
      {!isLoggedIn && (
        <Link to="/login" className="nav-link">
          Login
        </Link>
      )}

      {isLoggedIn ? (
        <>
          <Link to="/account" className="nav-link">
            Account
          </Link>
          <button onClick={handleLogout} className="nav-link logout-button">
            Logout
          </button>
        </>
      ) : (
        <Link to="/register" className="nav-link">
          Register
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
