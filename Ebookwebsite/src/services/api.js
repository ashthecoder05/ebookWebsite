import axios from 'axios';

// Create an axios instance with base URL
const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Book-related API calls
export const getBooks = async () => {
  try {
    console.log('Fetching books from API...');
    const response = await api.get('/books');
    console.log('API response:', response);
    console.log('Books data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    console.log(`Fetching book with ID ${id}...`);
    const response = await api.get(`/books/${id}`);
    console.log('API response:', response);
    console.log('Book data:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

export default api; 