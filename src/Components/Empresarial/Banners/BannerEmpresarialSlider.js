import React, { useEffect, useState } from 'react';
import { buscarBannersEmpresariais } from '../../../Services/Empresarial/ServiceEmpresarial';
import '../../../Styles/BannerSlider.css'; // Reutilizando estilo do site principal

function BannerEmpresarialSlider() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBanners, setSelectedBanners] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await buscarBannersEmpresariais();
      setBanners(data);
      selectBanners(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    selectBanners(banners);
  }, [banners]);

  const selectBanners = (data) => {
    if (!data || data.length === 0) return;
  
    const width = window.innerWidth;
    let images = [];
  
    data.forEach((banner) => {
      let selectedImage = null;
  
      if (width >= 3840 && banner['Banners-4K']) {
        selectedImage = banner['Banners-4K'];
      } else if (width >= 2560 && banner['Banners-2K']) {
        selectedImage = banner['Banners-2K'];
      } else if (width >= 1080 && banner['Banners-1080P']) {
        selectedImage = banner['Banners-1080P'];
      } else if (width < 1080 && banner['Banners-Mobile']) {
        selectedImage = banner['Banners-Mobile'];
      }
  
      if (selectedImage) {
        images.push(selectedImage);
      }
    });
  
    setSelectedBanners(images);
  };
  

  useEffect(() => {
    if (selectedBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === selectedBanners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedBanners]);

  if (selectedBanners.length === 0) return null;

  return (
    <div className="banner-slider">
      <img
        src={selectedBanners[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="banner-image"
      />

      {selectedBanners.length > 1 && (
        <>
          <button
            className="prev"
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0
                  ? selectedBanners.length - 1
                  : currentIndex - 1
              )
            }
          >
            ‹
          </button>
          <button
            className="next"
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % selectedBanners.length)
            }
          >
            ›
          </button>

          <div className="dots">
            {selectedBanners.map((_, index) => (
              <span
                key={index}
                className={currentIndex === index ? 'dot active' : 'dot'}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BannerEmpresarialSlider;
