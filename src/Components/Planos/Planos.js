import React, { useState, useEffect } from 'react';
import Turbo from './Turbo';
import Gold from './Gold';
import Infinity from './Infinity';
import PlanosSlider from './PlanosSlider';
import '../../Styles/Planos.css';

function Planos() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <PlanosSlider /> // Exibe o carrossel no mobile
      ) : (
        <div className="planos-container">
          <Turbo />
          <Gold />
          <Infinity />
        </div>
      )}
    </div>
  );
}

export default Planos;
