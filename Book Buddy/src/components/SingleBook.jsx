/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../API";
import "./Styles.css";

const SingleBook = () => {
  const { id } = useParams();
  const naviagte = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const response = await fetchBookById(parseInt(id, 10));
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
        <button onClick={() => navigate("/")}>Back to List</button>
      </div>
    </div>
  );
};

export default SingleBook;
