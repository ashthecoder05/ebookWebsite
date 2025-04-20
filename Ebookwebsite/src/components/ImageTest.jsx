import React from 'react';
import aboutUsImage from '../assets/aboutus.png';

const ImageTest = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Image Test</h2>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <img 
          src={aboutUsImage} 
          alt="Test Image" 
          style={{ width: '100%', height: 'auto' }}
          onError={(e) => {
            console.error("Image failed to load:", e);
            e.target.src = "https://placehold.co/600x400/ff6600/ffffff?text=Image+Failed+To+Load";
          }}
        />
      </div>
      <p>Image path: {aboutUsImage}</p>
    </div>
  );
};

export default ImageTest; 