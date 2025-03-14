import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import MobileHeader from '../Components/Mobile/MobileHeader';
import BannerSlider from '../Components/BannerSlider';
import DynamicPhrase from '../Components/DynamicPhrase';
import Planos from '../Components/Planos/Planos';
import Beneficios from '../Components/Beneficios/Beneficios';
import DuvidasFrequentes from "../Components/DuvidasFrequentes";
import MockupApp from "../Components/MockupApp/MockupApp";


import '../Styles/Home.css';

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="home">
      {isMobile ? <MobileHeader /> : <Header />}
      <main className="content">
      <BannerSlider />
      <Beneficios />
      <DynamicPhrase />
      <Planos />
      <DuvidasFrequentes />
      <MockupApp />
      </main>
    </div>
  );
}

export default Home;
