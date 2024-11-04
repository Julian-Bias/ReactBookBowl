import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../API";
import "./Styles.css";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutMessage, setCheckoutMessage] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const response = await fetchBookById(id);
        if (response.success) {
          setBook(response.data.book);
        } else {
          setError(response.error || "Book not found");
        }
      } catch (error) {
        setError("Error fetching book data");
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, [id]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCheckoutMessage("Login required to check out.");
      return;
    }

    try {
      // Update the book's availability to false (checked out)
      const updateResponse = await fetch(`${API_URL}/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ available: false }),
      });

      if (!updateResponse.ok) {
        const updateResult = await updateResponse.json();
        throw new Error(updateResult.message || "Failed to update book status.");
      }

      // Notify the user
      setCheckoutMessage("Book checked out successfully!");

      // Update the Account component directly here
      const userToken = localStorage.getItem("token");
      const accountResponse = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const accountResult = await accountResponse.json();
      if (accountResponse.ok) {
        // Assuming the user's checked out books are part of the returned user data
        // You would need to make sure that the `userData` in Account has a checked out books array
        // Here you can dispatch an event or use context/state management to update the account state
      } else {
        console.error("Failed to fetch updated user data.");
      }

    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutMessage(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>No book data available</div>;
  }

  return (
    <div className="single-book-container">
      <div className="single-book-card">
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <img src={book.coverimage} alt={book.title} />
        <p>Description: {book.description}</p>

        {checkoutMessage && (
          <p className="checkout-message">{checkoutMessage}</p>
        )}

        {localStorage.getItem("token") ? (
          <button onClick={handleCheckout}>Checkout</button>
        ) : (
          <p className="login-required">Login required to check out.</p>
        )}

        <button onClick={() => navigate("/")}>Back to List</button>
      </div>
    </div>
  );
};

export default SingleBook;
