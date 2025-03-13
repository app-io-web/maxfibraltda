import React, { useState } from 'react';
import '../../Styles/Mobile/MobileHeader.css';
import Sidebar from './Sidebar';
import logoText from '../../Assets/logo-text.svg'; // Nome da empresa em SVG

function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="mobile-header">
      <div className="menu-icon" onClick={toggleSidebar}>
        ☰
      </div>
      <img src={logoText} alt="MaxFibra" className="mobile-logo" />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default MobileHeader;
