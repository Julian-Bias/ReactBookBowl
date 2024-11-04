/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        // Store the token, set it in state, and show a success message
        localStorage.setItem("token", result.token);
        setToken(result.token); // Update token state in App.jsx
        setMessage(result.message);
        // Redirect to the books page or home page
        navigate("/books");
      } else {
        setError(result.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
