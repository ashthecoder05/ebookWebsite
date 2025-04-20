// src/components/ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus({ success: true, message: "Thank you for reaching out! We'll get back to you soon." });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ success: false, message: "Failed to send message. Please try again." });
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus({ success: false, message: "Network error. Please try later." });
    }
  };

  return (
    <div className="contact-section">
      <h3>Contact Us</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows="4" required />
        <button type="submit" className="btn primary">Send Message</button>
      </form>
      {status && <p className={status.success ? "success-msg" : "error-msg"}>{status.message}</p>}
      {/* Alternatively, instead of or in addition to the form, list contact info */}
      
    </div>
  );
};

export default ContactForm;