// src/components/SubscribeForm.jsx
import React, { useState } from 'react';

const SubscribeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // to display success/error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      if (res.ok) {
        const data = await res.json();
        setStatus({ success: true, message: `Subscribed! Your ID: ${data.userId}` });
        setName(""); setEmail(""); // reset form
      } else {
        const errData = await res.json();
        setStatus({ success: false, message: errData.error || "Subscription failed" });
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      setStatus({ success: false, message: "Network error" });
    }
  };

  return (
    <div className="subscribe-form">
      <h3>Subscribe to our Newsletter</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name}
          onChange={e => setName(e.target.value)}
          required 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required 
        />
        <button type="submit" className="btn primary">Subscribe</button>
      </form>
      {status && (
        <p className={status.success ? "success-msg" : "error-msg"}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default SubscribeForm;