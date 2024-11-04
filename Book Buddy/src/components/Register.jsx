/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css"

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
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
        const response = await fetch(`${API_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        if (response.ok) {
          // Store the token and show a success message
          localStorage.setItem("token", result.token);
          setMessage(result.message);
          // Redirect or further processing
          navigate("/");
        } else {
          setError(result.message || "Registration failed.");
        }
      } catch (error) {
        setError("An error occurred during registration.");
      }
    };
  
    return (
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
  
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
  
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
  
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
  
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default Register;