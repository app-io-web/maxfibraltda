import React, { useEffect, useState } from 'react';
import getBanners from '../Services/bannersService';
import '../Styles/Banner.css';

function Banner() {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState('');

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await getBanners();
      setBanners(data);
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      selectBanner();
    }
  }, [banners]);

  // Função para escolher o banner correto baseado na tela
  const selectBanner = () => {
    const width = window.innerWidth;

    let bestFitBanner = banners[0]?.["Banners-1080P"]; // Padrão Full HD (caso não detecte outra)

    if (width >= 3840) {
      bestFitBanner = banners[0]?.["Banners-4K"]; // 4K
    } else if (width >= 2560) {
      bestFitBanner = banners[0]?.["Banners-2K"]; // 2K
    } else if (width < 768) {
      bestFitBanner = banners[0]?.["Banners-Mobile"]; // Mobile
    }

    setSelectedBanner(bestFitBanner);
  };

  useEffect(() => {
    window.addEventListener('resize', selectBanner);
    return () => window.removeEventListener('resize', selectBanner);
  }, [banners]);

  return (
    <div className="banner-container">
      {selectedBanner ? (
        <img src={selectedBanner} alt="Banner dinâmico" className="banner-image" />
      ) : (
        <p>Carregando banner...</p>
      )}
    </div>
  );
}

export default Banner;
