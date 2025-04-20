import React from 'react';
import { Link } from 'react-router-dom';
import './TestimonialsSection.css';
import ContactForm from '../pages/ContactForm';

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>What Our Readers Say</h2>
          <p>Hear from our community of readers and audiobook enthusiasts</p>
        </div>
  
        
        <div className="contact-form-container">
          <h3>Get in Touch</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;