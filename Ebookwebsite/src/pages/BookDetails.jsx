import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById } from '../services/api';
import './BookDetails.css';
import logo from '../assets/logo.png';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookById(id);
        
        // If this is "The Balance Kingdom" book, override some properties
        if (data.title === "The Balance Kingdom: A Story of RSI") {
          data.author = "Finance Blog";
          data.releaseDate = "2025-06-04T00:00:00.000Z";
        }
        
        setBook(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Function to handle PDF download
  const handleDownload = async (e) => {
    e.preventDefault();
    
    if (!book || !book.pdfPath) {
      setDownloadStatus('error');
      return;
    }
    
    try {
      setDownloadStatus('loading');
      
      // Construct the PDF URL
      const pdfUrl = `http://localhost:5001${book.pdfPath}`;
      
      // Create an invisible anchor and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.download = `${book.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setDownloadStatus('error');
    }
  };
  
  // Custom description for "The Balance Kingdom" book
  const getCustomDescription = () => {
    if (book.title === "The Balance Kingdom: A Story of RSI") {
      return (
        <>
          <p>The Balance Kingdom: A Story of RSI is a magical, educational tale that introduces young readers (and curious adults) to the concept of market balance through the story of Welles, a wise old turtle in the kingdom of Marketland. Through charming storytelling and engaging illustrations, the book explains how values rise and fall — and how to understand these movements using a special tool called the RSI, or Relative Strength Indicator.</p>
          <p>The character of Welles is inspired by the real-life J. Welles Wilder Jr., the brilliant mind who created the RSI indicator in 1978 after a successful career in real estate. His groundbreaking book, New Concepts in Technical Trading Systems, introduced not only the RSI but several other technical indicators that are still widely used by traders across the globe today. This story pays tribute to Wilder's legacy by blending his technical insight with a fairytale world that makes complex ideas simple, visual, and fun to learn.</p>
          <p>Whether you're a budding trader, a curious child, or someone who enjoys stories with a deeper message about balance and value, The Balance Kingdom offers a unique journey into the heart of how markets — and life — move in cycles.</p>
        </>
      );
    }
    return <p>{book.description}</p>;
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  if (loading) {
    return (
      <div className="book-details-page">
        <div className="book-details-container loading">
          <div className="loading-message">Loading book details...</div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="book-details-page">
        <div className="book-details-container error">
          <div className="error-message">{error || 'Book not found'}</div>
          <button className="back-button" onClick={handleGoBack}>
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="book-details-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            {!logoError ? (
              <img 
                src={logo} 
                alt="eBook Library Logo" 
                className="nav-logo-img" 
                onError={handleLogoError}
              />
            ) : (
              <span className="nav-logo-text">eBook Library</span>
            )}
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/#library" className="nav-link">Library</Link>
            <Link to="/#about" className="nav-link">About</Link>
            <Link to="/#testimonials" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      
      <div className="book-details-page">
        <div className="book-details-container">
          <button className="back-button" onClick={handleGoBack}>
            &larr; Back to Library
          </button>
          
          <div className="book-details-content">
            <div className="book-image-container">
              <img 
                src={book.coverImage ? `http://localhost:5001${book.coverImage}` : `https://placehold.co/300x450/646cff/ffffff?text=${encodeURIComponent(book.title)}`} 
                alt={book.title} 
                className="book-detail-image" 
              />
            </div>
            
            <div className="book-info-container">
              <h1 className="book-title">{book.title}</h1>
              <h2 className="book-author">By {book.author}</h2>
              
              <div className="book-meta">
                <div className="book-genre">
                  <span className="meta-label">Genre:</span> {book.genre || 'Not specified'}
                </div>
                <div className="book-release-date">
                  <span className="meta-label">Release Date:</span> {book.releaseDate ? new Date(book.releaseDate).toLocaleDateString() : 'Not specified'}
                </div>
              </div>
              
              <div className="book-description">
                <h3>About the Book</h3>
                {getCustomDescription()}
              </div>
              
              <div className="book-actions">
                <button 
                  onClick={handleDownload} 
                  className={`download-button ${downloadStatus ? `download-${downloadStatus}` : ''}`}
                  disabled={downloadStatus === 'loading'}
                >
                  {downloadStatus === 'loading' ? 'Downloading...' : 
                   downloadStatus === 'success' ? 'Download Successful!' : 
                   downloadStatus === 'error' ? 'Download Failed' : 
                   book.isFree ? 'Download Free E-Book' : 'Purchase & Download'}
                </button>
                {downloadStatus === 'error' && (
                  <p className="download-error-message">
                    Error downloading the PDF. Please try again later.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails; 