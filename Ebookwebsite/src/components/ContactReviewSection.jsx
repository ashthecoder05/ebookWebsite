import React, { useState } from 'react';
import './ContactReviewSection.css';

const ContactReviewSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="contact-review-section" id="contact">
      <div className="contact-review-container">
        <div className="section-header">
          <h2>📬 Contact Us & Reviews</h2>
          <p>We'd love to hear from you! Share your thoughts or get in touch.</p>
        </div>

        <div className="contact-review-content">
          <div className="contact-form">
            <h3>✍️ Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rate Your Experience</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star ${formData.rating >= star ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>

          <div className="reviews-section">
            <h3>🌟 What Parents Say</h3>
            <div className="reviews-container">
              <div className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">Sarah M.</span>
                  <span className="review-stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="review-text">
                  "My kids love these stories! They make complex tech concepts so accessible and fun."
                </p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">John D.</span>
                  <span className="review-stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="review-text">
                  "Finally, a resource that helps me explain my work in tech to my children!"
                </p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">Lisa R.</span>
                  <span className="review-stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="review-text">
                  "The stories are engaging and educational. Perfect for family reading time!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactReviewSection; 