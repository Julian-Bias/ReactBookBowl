import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log("Account data fetched:", result);
        if (response.ok) {
          setUserData(result);
          setCheckedOutBooks(result.books || []);
        } else {
          setError(result.message || "Failed to fetch account data.");
          navigate("/login");
        }
      } catch (error) {
        setError("An error occurred while fetching account data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [navigate]);

  const returnBook = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in.");
      return;
    }

    try {
      // Delete the reservation using the bookId directly
      const response = await fetch(`${API_URL}/reservations/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("Failed to return book:", result);
        throw new Error(result.message || "Failed to return the book.");
      }

      // Remove the book from the checked-out list after successful return
      setCheckedOutBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    } catch (error) {
      setError(error.message);
      console.error("Error returning book:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <div className="account-details">
        <p>
          <strong>First Name:</strong> {userData.firstname}
        </p>
        <p>
          <strong>Last Name:</strong> {userData.lastname}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <h3>Checked Out Books</h3>
        {checkedOutBooks.length > 0 ? (
          <ul>
            {checkedOutBooks.map((book) => (
              <li key={book.id}>
                {book.title} by {book.author}
                <button onClick={() => returnBook(book.id)}>Return Book</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books checked out.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
