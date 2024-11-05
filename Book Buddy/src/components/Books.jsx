import React, { useEffect, useState } from "react";
import { fetchAllBooks } from "../API";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const navigate = useNavigate();

  const getBooks = async () => {
    const APIResponse = await fetchAllBooks();
    if (APIResponse.success) {
      setBooks(APIResponse.data.books); 
    } else {
      setError(APIResponse.error || "Failed to fetch books.");
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const booksToDisplay = searchParams
    ? books.filter((book) => book.title.toLowerCase().includes(searchParams))
    : books;

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <>
      <div className="books-container">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
          />
        </label>
      </div>

      {error && <div className="error-message">Error: {error}</div>}
      <div>
        {booksToDisplay.length > 0 ? (
          booksToDisplay.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <button onClick={() => handleBookClick(book.id)}>
                See Details
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </>
  );
};

export default Books;
