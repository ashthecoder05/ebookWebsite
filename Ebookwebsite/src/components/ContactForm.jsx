import React, { useState } from 'react';
import '../App.css'; // Make sure to create styling for the form in your CSS

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch('http://localhost:5001/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setSubmitStatus('success');
          
          // Reset the form after successful submission
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          setSubmitStatus('error');
          console.error('Submission error:', data.message);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        
        // Clear status after a delay
        setTimeout(() => {
          setSubmitStatus('');
        }, 5000);
      }
    } else {
      setSubmitStatus('error');
    }
  };
  
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Have a question or feedback? We'd love to hear from you!</p>
      
      {submitStatus === 'success' && (
        <div className="success-message">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="error-message">
          There was a problem submitting your message. Please try again later.
        </div>
      )}
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? 'error' : ''}
          />
          {formErrors.name && <span className="error-text">{formErrors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <span className="error-text">{formErrors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={formErrors.subject ? 'error' : ''}
          />
          {formErrors.subject && <span className="error-text">{formErrors.subject}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={formErrors.message ? 'error' : ''}
          ></textarea>
          {formErrors.message && <span className="error-text">{formErrors.message}</span>}
        </div>
        
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      <div className="contact-info">
        <h3>Other Ways to Reach Us</h3>
        <p><strong>Email:</strong> support@ebookaudio.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Address:</strong> 123 Book Street, Reading City</p>
      </div>
    </div>
  );
};

export default ContactForm; 