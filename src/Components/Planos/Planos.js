import React, { useState, useEffect } from 'react';
import Turbo from './Turbo';
import Gold from './Gold';
import Infinity from './PlanoInfinity';
import PlanosSlider from './PlanosSlider';
import getServicosAdicionais from '../../Services/planosService';
import '../../Styles/Planos.css';
import '../../Styles/PlanosBackground.css';



function Planos() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [maisVendido, setMaisVendido] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Buscar a informação da tag "Mais Vendido"
  useEffect(() => {
    const fetchMaisVendido = async () => {
      const data = await getServicosAdicionais();
      setMaisVendido(data);
    };

    fetchMaisVendido();
  }, []);

  return (
    <div className="planos-section">
      {isMobile ? (
        <PlanosSlider /> // Exibe o carrossel no mobile
      ) : (
        <div id="planos"  className="planos-container">
          <Turbo maisVendido={maisVendido?.turbo.maisVendido} />
          <Infinity maisVendido={maisVendido?.infinity.maisVendido} />
          <Gold maisVendido={maisVendido?.gold.maisVendido} />
        </div>
      )}
    </div>
  );
}

export default Planos;
