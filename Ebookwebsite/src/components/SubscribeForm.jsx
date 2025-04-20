import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubscribeForm.css';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        setError(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
      // Reset the subscribed state after a few seconds
      if (subscribed) {
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      }
    }
  };

  return (
    <section className="subscribe-section" id="subscribe">
      <div className="subscribe-wrapper">
        <div className="subscribe-container">
          <h2 className="subscribe-title">Subscribe to Our Newsletter</h2>
          <p className="subscribe-description">Get the latest updates, news, and special offers directly to your inbox.</p>
          
          {subscribed ? (
            <div className="subscribe-success">
              <p>Thank you for subscribing! You'll receive our updates soon.</p>
            </div>
          ) : (
            <form className="subscribe-form" onSubmit={handleSubmit}>
              <div className="form-input-group">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? 'error' : ''}
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="subscribe-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {error && <span className="error-text">{error}</span>}
              <div className="privacy-note">
                <small>We respect your privacy. Unsubscribe at any time.</small>
              </div>
            </form>
          )}
        </div>
        
        <div className="footer-links-container">
          <div className="footer-column">
            <h3>Navigate</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#library">Library</Link></li>
              <li><Link to="/#testimonials">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Connect</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 EbookAudio Platform. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default SubscribeForm; 