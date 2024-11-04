const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

// Fetch all books
export async function fetchAllBooks() {
    try {
      const response = await fetch(`${API_URL}/books`);
      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to fetch books." };
    }
  }
  

// Fetch a book by its ID
export const fetchBookById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book.");
      }
      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      return { success: false, error: error.message };
    }
  };
  

// Return a book by its ID
const returnBook = async (reservationId, bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in.");
      return;
    }
  
    try {
      // Convert reservationId to an integer if it's not already
      const id = parseInt(reservationId, 10);
  
      const response = await fetch(`${API_URL}/reservations/${id}`, {
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
  
      // If successful, remove the book from the checked-out list
      setCheckedOutBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
  
    } catch (error) {
      setError(error.message);
      console.error("Error returning book:", error);
    }
  };
  
  
  

// Fetch user data
export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, message: error.message };
  }
};





