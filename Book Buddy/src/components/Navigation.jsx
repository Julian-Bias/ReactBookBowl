/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
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
      <Link to="/login" className="nav-link">
        Login
      </Link>

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
