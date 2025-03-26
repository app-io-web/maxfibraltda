import React, { useState, useEffect } from 'react';
import BigCompany from './BigCompany';
import MediumCompany from './MediumCompany';
import StartupCompany from './StartupCompany';
import PlanosEmpresariaisSlider from './PlanosEmpresariaisSlider.js';

import '../../Styles/PlanosEmpresariais.css';


import '../../Styles/PlanosBackground.css';

function PlanosEmpresariais() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return React.createElement(
    'div',
    { className: 'planos-section' },
    isMobile
      ? React.createElement(PlanosEmpresariaisSlider)
      : React.createElement(
          'div',
          { id: 'planos', className: 'planos-container' },
          React.createElement(StartupCompany),
          React.createElement(MediumCompany),
          React.createElement(BigCompany)
        )
  );
}

export default PlanosEmpresariais;
