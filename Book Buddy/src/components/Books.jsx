/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
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
      setError(APIResponse.error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const booksToDisplay = searchParams
    ? books.filter((books) => books.name.toLowerCase().includes(searchParams))
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
        {booksToDisplay.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.name}</h3>
            <button onClick={() => handleBookClick(book.id)}>
              See Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;
