import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Admin from './pages/Admin';
import BookDetails from './pages/BookDetails';
import ContactForm from './components/ContactForm';
import SubscribeForm from './components/SubscribeForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/library" element={<Navigate to="/#library" />} />
            <Route path="/contact" element={<Navigate to="/#testimonials" />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reviews" element={<Navigate to="/#testimonials" />} />
          </Routes>
        </main>
        
        <SubscribeForm />
      </div>
    </Router>
  );
};

export default App;