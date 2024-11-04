import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles.css";

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode class to body element based on state
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

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

      {/* Dark Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="nav-link">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navigation;
