const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchAllBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    const result = await response.json();
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.data || "Book not found" };
    }
  } catch (error) {
    console.error("Error fetching Book by ID", error);
    return { success: false, error: error.message };
  }
};
