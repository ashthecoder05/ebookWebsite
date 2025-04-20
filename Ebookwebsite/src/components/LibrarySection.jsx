import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/api';
import './LibrarySection.css';

// Fallback sample book data in case API fails
const sampleBooks = [
  {
    id: 1,
    title: "The Great Adventure",
    author: "Jane Smith",
    cover: "https://placehold.co/200x300/646cff/ffffff?text=Adventure",
    category: "Fiction",
    rating: 4.5,
    pdfUrl: "/pdfs/the-great-adventure.pdf"
  },
  {
    id: 2,
    title: "Business Strategy",
    author: "John Doe",
    cover: "https://placehold.co/200x300/ff6600/ffffff?text=Business",
    category: "Business",
    rating: 4.2,
    pdfUrl: "/pdfs/business-strategy.pdf"
  },
  {
    id: 3,
    title: "Python Programming",
    author: "Mark Wilson",
    cover: "https://placehold.co/200x300/94b75c/ffffff?text=Programming",
    category: "Technology",
    rating: 4.8,
    pdfUrl: "/pdfs/python-programming.pdf"
  },
  {
    id: 4,
    title: "Mindful Living",
    author: "Sarah Johnson",
    cover: "https://placehold.co/200x300/2e2a33/ffffff?text=Mindfulness",
    category: "Self-Help",
    rating: 4.3,
    pdfUrl: "/pdfs/mindful-living.pdf"
  },
  {
    id: 5,
    title: "Crypto Economics",
    author: "Michael Chen",
    cover: "https://placehold.co/200x300/646cff/ffffff?text=Crypto",
    category: "Finance",
    rating: 4.0,
    pdfUrl: "/pdfs/crypto-economics.pdf"
  },
  
];

const LibrarySection = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawApiData, setRawApiData] = useState(null); // Store raw API data for debugging

  useEffect(() => {
    // Fetch books from the API
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        console.log('Books from API:', data);
        setRawApiData(data); // Store raw API data for debugging
        
        if (data && data.length > 0) {
          setBooks(data);
        } else {
          // Fallback to sample data if API returns empty results
          console.log('No books returned from API, using sample data');
          setBooks(sampleBooks);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Using sample data instead.');
        setBooks(sampleBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Transform API book data to match expected format if needed
  const processedBooks = books.map(book => {
    console.log('Processing book:', book); // Debug each book being processed
    
    const processedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.coverImage ? `http://localhost:5001${book.coverImage}` : `https://placehold.co/200x300/646cff/ffffff?text=${encodeURIComponent(book.title)}`,
      category: book.genre || 'Uncategorized',
      rating: 4.0, // Default rating if not provided
      pdfUrl: book.pdfPath ? `http://localhost:5001${book.pdfPath}` : '#'
    };
    
    console.log('Processed book:', processedBook); // Debug the processed book
    return processedBook;
  });
  
  // Get unique categories for the filter
  const categories = ['All', ...new Set(processedBooks.map(book => book.category))];
  
  // Filter books based on selected category
  const filteredBooks = filter === 'All' 
    ? processedBooks 
    : processedBooks.filter(book => book.category === filter);

  // Debug information
  console.log('Raw API data:', rawApiData);
  console.log('Processed books:', processedBooks);
  console.log('Filtered books:', filteredBooks);
  console.log('Categories:', categories);
  console.log('Current filter:', filter);

  if (loading) {
    return (
      <section className="library-section" id="library">
        <div className="library-container">
          <div className="library-header">
            <h2>Browse Our Library</h2>
            <p>Loading books...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="library-section" id="library">
      <div className="library-container">
        <div className="library-header">
          <h2>Browse Our Library</h2>
          <p>Discover our collection of ebooks and audiobooks across various genres.</p>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="library-filters">
            {categories.map(category => (
              <button 
                key={category}
                className={`filter-button ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="books-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <div className="book-card" key={book.id}>
                <div className="book-cover">
                  <img src={book.cover} alt={book.title} />
                  <div className="book-overlay">
                    <Link to={`/book/${book.id}`} className="view-button">View Details</Link>
                  </div>
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="book-author">By {book.author}</p>
                  <div className="book-rating">
                    {/* Star rating display */}
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(book.rating) ? 'star filled' : 'star'}>★</span>
                      ))}
                    </div>
                    <span>{book.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-books-message">No books available in this category.</p>
          )}
        </div>
        
      
      </div>
    </section>
  );
};

export default LibrarySection; 