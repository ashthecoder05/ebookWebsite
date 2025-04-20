import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Import corresponding CSS
import bannerImage from '../assets/banner.png';  // Import the banner image
import logo from '../assets/logo.png';  // Import the logo image
import LibrarySection from '../components/LibrarySection';  // Import the LibrarySection component
import AboutSection from '../components/AboutSection';  // Import the AboutSection component
import TestimonialsSection from '../components/TestimonialsSection';  // Import the TestimonialsSection component
import ContactForm from './ContactForm';  // Import the ContactForm component (kept for reference)

const Home = () => {
  // Function to scroll to library section
  const scrollToLibrary = (e) => {
    e.preventDefault();
    const libraryElement = document.getElementById('library');
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to about section
  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to testimonials section which now includes the contact form
  const scrollToContact = (e) => {
    e.preventDefault();
    const testimonialsElement = document.getElementById('testimonials');
    if (testimonialsElement) {
      testimonialsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      <div className="hero-wrapper">
        <div className="navigation-bar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#library" onClick={scrollToLibrary}>Library</a></li>
            <li><a href="#about" onClick={scrollToAbout}>About Us</a></li>
            <li><a href="#contact" onClick={scrollToContact}>Contact</a></li>
            <li><a href="#subscribe" onClick={(e) => {
              e.preventDefault();
              const subscribeElement = document.getElementById('subscribe');
              if (subscribeElement) {
                subscribeElement.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="subscribe-link">Subscribe</a></li>
          </ul>
        </div>
        
        <div className="hero-content">
          <div className="hero-logo-container">
            <img src={logo} alt="EbookAudio Logo" className="hero-logo" />
          </div>
          <div className="hero-badge">#1 E-BOOK  PLATFORM</div>
          
          <h1 className="hero-title">Stay worry-free with EbookAudio.</h1>
          
          <p className="hero-subtitle">
            Enjoy summer while exploring new titles from the comfort of your home.
          </p>
          
          <div className="hero-cta">
            <a href="#library" onClick={scrollToLibrary} className="cta-button">Explore Ebooks</a>
            <a href="#about" onClick={scrollToAbout} className="secondary-button">Learn More</a>
          </div>
        </div>
        
        <div className="hero-illustration" style={{backgroundImage: `url(${bannerImage})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0}}>
          {/* Banner image as background */}
        </div>
      </div>
      <div id="library">
        <LibrarySection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      {/* Removed standalone contact section */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default Home;