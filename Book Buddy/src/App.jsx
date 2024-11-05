import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import SingleBook from "./components/SingleBook";
import bookLogo from "./assets/books.png";
import "./components/Styles.css";
import React from "react";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} alt="Library Logo" /> Library App
        </h1>
      </header>
      <Navigation token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/books/:id" element={<SingleBook />} />
      </Routes>
    </Router>
  );
}

export default App;
