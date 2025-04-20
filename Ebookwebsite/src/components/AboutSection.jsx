import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';
import aboutUsImage from '../assets/aboutus.png';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>🧠 About TinyTale</h2>
          <p>
            Welcome to ReadAIforKids – Where stories spark curiosity and build future-ready minds.
          </p>
          <p>
            We transform complex tech and finance concepts into free, kid-friendly storybooks inspired by leading innovations.
          </p>
          
          <h3>🎯 Our Mission</h3>
          <p>Making cutting-edge concepts accessible to children through engaging storytelling that encourages critical thinking and a love of learning.</p>
          
          <h3>👨‍👩‍👧 Who We're For</h3>
          <ul>
            <li>👨‍👩‍👧 Parents seeking educational content</li>
            <li>🧠 Curious kids (ages 5–12)</li>
            <li>💡 Tech-savvy families</li>
          </ul>
          
          <h3>📚 What Sets Us Apart</h3>
          <ul>
            <li>✨ <strong>Real-World Concepts:</strong> AI, Metaverse, Crypto, and FinTech stories</li>
            <li>✨ <strong>Story-First Learning:</strong> Engaging plots that simplify complex ideas</li>
            <li>✨ <strong>Free Forever:</strong> All content at no cost</li>
            <li>✨ <strong>Growing Library:</strong> Regular new content</li>
          </ul>
          
          <p>Raising the next generation of thinkers, builders, and dreamers – one story at a time. 🌍📖💡</p>
        </div>
        <div className="about-image">
          <img src={aboutUsImage} alt="Children reading and learning with technology" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 