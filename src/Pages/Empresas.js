import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import MobileHeader from '../Components/Mobile/MobileHeader';
import DynamicPhrase from '../Components/DynamicPhrase';
import BannerEmpresarialSlider from '../Components/Empresarial/Banners/BannerEmpresarialSlider';
import BeneficiosEmpresariais from '../Components/Empresarial/BeneficiosEmpresariais';
import PlanosEmpresariais from '../Components/Empresarial/PlanosEmpresariais';
import DuvidasFrequentes from "../Components/DuvidasFrequentes";
import MockupApp from "../Components/MockupApp/MockupApp";
import CanaisAtendimento from "../Components/CanaisAtendimento";
import Footer from '../Components/Footer';



function Empresas() {
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
          <BannerEmpresarialSlider />
          <BeneficiosEmpresariais />
          <DynamicPhrase />
          <PlanosEmpresariais />
          <DuvidasFrequentes />
          <MockupApp />
          <CanaisAtendimento />
      </main>
      <div className="footer-wrapper">
        <Footer />
      </div>

      {/* Resto da sua página */}
    </div>
  );
}
  
export default Empresas;
