import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'; // Adjust path if necessary
import Books from './components/Books'; // Your books list component
import Login from './components/Login'; // Your login component
import Register from './components/Register'; // Your register component
import Account from './components/Account'; // Your account component
import SingleBook from './components/SingleBook'; // Your single book component
import bookLogo from './assets/books.png';
import './components/Styles.css'; // Global styles
import React from 'react';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <header>
        <h1>
          <img id='logo-image' src={bookLogo} alt="Library Logo" /> Library App
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
