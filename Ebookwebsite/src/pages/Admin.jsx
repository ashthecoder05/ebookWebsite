// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import '../App.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    price: 0,
    isFree: false,
    featured: false,
    pdfFile: null,
    coverImage: null
  });
  
  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      
      try {
        let endpoint = '';
        
        switch (activeTab) {
          case 'books':
            endpoint = 'http://localhost:5001/api/books';
            break;
          case 'contacts':
            endpoint = 'http://localhost:5001/api/contact';
            break;
          case 'subscriptions':
            endpoint = 'http://localhost:5001/api/subscribe';
            break;
          default:
            return;
        }
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${activeTab}`);
        }
        
        const data = await response.json();
        
        switch (activeTab) {
          case 'books':
            setBooks(data);
            break;
          case 'contacts':
            setContacts(data);
            break;
          case 'subscriptions':
            setSubscriptions(data);
            break;
          default:
            return;
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        setError(`Failed to load ${activeTab}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleSubmitBook = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.description || !formData.genre) {
      setError('Please fill out all required fields');
      return;
    }
    
    if (!formData.pdfFile) {
      setError('PDF file is required');
      return;
    }
    
    if (!formData.coverImage) {
      setError('Cover image is required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      
      // Append text data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('isFree', formData.isFree);
      formDataToSend.append('featured', formData.featured);
      
      // Append files
      formDataToSend.append('pdf', formData.pdfFile);
      formDataToSend.append('coverImage', formData.coverImage);
      
      const response = await fetch('http://localhost:5001/api/books', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      
      // Refresh book list
      const booksResponse = await fetch('http://localhost:5001/api/books');
      const booksData = await booksResponse.json();
      setBooks(booksData);
      
      // Reset form
      setFormData({
        title: '',
        author: '',
        description: '',
        genre: '',
        price: 0,
        isFree: false,
        featured: false,
        pdfFile: null,
        coverImage: null
      });
      
      // Reset file inputs
      document.getElementById('pdfFile').value = '';
      document.getElementById('coverImage').value = '';
      
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5001/api/books/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      
      // Remove from state
      setBooks(books.filter(book => book._id !== id));
      
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleMarkAsResponded = async (id) => {
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5001/api/contact/${id}/respond`, {
        method: 'PATCH',
      });
      
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      
      // Update in state
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, responded: true } : contact
      ));
      
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to update contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5001/api/contact/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      
      // Remove from state
      setContacts(contacts.filter(contact => contact._id !== id));
      
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Failed to delete contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteSubscription = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5001/api/subscribe/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }
      
      // Remove from state
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
      
    } catch (error) {
      console.error('Error deleting subscription:', error);
      setError('Failed to delete subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'books' ? 'active' : ''} 
          onClick={() => handleTabChange('books')}
        >
          Books
        </button>
        <button 
          className={activeTab === 'contacts' ? 'active' : ''} 
          onClick={() => handleTabChange('contacts')}
        >
          Contact Submissions
        </button>
        <button 
          className={activeTab === 'subscriptions' ? 'active' : ''} 
          onClick={() => handleTabChange('subscriptions')}
        >
          Newsletter Subscriptions
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="admin-content">
          {activeTab === 'books' && (
            <div className="books-section">
              <h2>Add New Book</h2>
              <form className="book-form" onSubmit={handleSubmitBook}>
                <div className="form-group">
                  <label htmlFor="title">Title*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="author">Author*</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description*</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="genre">Genre*</label>
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="isFree"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="isFree">Free Book</label>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="featured">Featured</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="pdfFile">PDF File*</label>
                  <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    onChange={handleInputChange}
                    accept=".pdf"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="coverImage">Cover Image*</label>
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    required
                  />
                </div>
                
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Book'}
                </button>
              </form>
              
              <h2>Manage Books</h2>
              {books.length === 0 ? (
                <p>No books found</p>
              ) : (
                <div className="books-list">
                  {books.map(book => (
                    <div key={book._id} className="book-card">
                      <div className="book-image">
                        <img 
                          src={`http://localhost:5001${book.coverImage}`} 
                          alt={book.title} 
                          className="book-thumbnail" 
                        />
                      </div>
                      <div className="book-details">
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p>
                          <strong>Price:</strong> {book.isFree ? 'Free' : `$${book.price.toFixed(2)}`}
                        </p>
                        <p>
                          <strong>Featured:</strong> {book.featured ? 'Yes' : 'No'}
                        </p>
                        <div className="book-actions">
                          <a 
                            href={`http://localhost:5001${book.pdfPath}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="view-button"
                          >
                            View PDF
                          </a>
                          <button 
                            className="delete-button"
                            onClick={() => handleDeleteBook(book._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'contacts' && (
            <div className="contacts-section">
              <h2>Contact Form Submissions</h2>
              {contacts.length === 0 ? (
                <p>No contact submissions found</p>
              ) : (
                <div className="contacts-list">
                  {contacts.map(contact => (
                    <div key={contact._id} className="contact-card">
                      <div className="contact-header">
                        <h3>{contact.subject}</h3>
                        <span className={`contact-status ${contact.responded ? 'responded' : 'pending'}`}>
                          {contact.responded ? 'Responded' : 'Pending'}
                        </span>
                      </div>
                      <div className="contact-details">
                        <p><strong>From:</strong> {contact.name} ({contact.email})</p>
                        <p><strong>Date:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                        <p><strong>Message:</strong></p>
                        <div className="contact-message">{contact.message}</div>
                      </div>
                      <div className="contact-actions">
                        {!contact.responded && (
                          <button 
                            className="respond-button"
                            onClick={() => handleMarkAsResponded(contact._id)}
                            disabled={loading}
                          >
                            Mark as Responded
                          </button>
                        )}
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteContact(contact._id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'subscriptions' && (
            <div className="subscriptions-section">
              <h2>Newsletter Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <p>No subscriptions found</p>
              ) : (
                <div className="subscriptions-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Subscribed Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map(sub => (
                        <tr key={sub._id}>
                          <td>{sub.email}</td>
                          <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`subscription-status ${sub.isActive ? 'active' : 'inactive'}`}>
                              {sub.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="delete-button"
                              onClick={() => handleDeleteSubscription(sub._id)}
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
