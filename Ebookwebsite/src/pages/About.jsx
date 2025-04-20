import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page's about section
    navigate('/#about');
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column'
    }}>
      <h2>Redirecting to About section...</h2>
      <p>If you are not redirected automatically, <a href="/#about">click here</a>.</p>
    </div>
  );
};

export default About; 