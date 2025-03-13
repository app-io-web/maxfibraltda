import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; // Importa Autoplay
import Turbo from './Turbo';
import Gold from './Gold';
import Infinity from './Infinity';
import '../../Styles/Planos.css';

function PlanosSlider() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return null; // Se não for mobile, não renderiza nada
  }

  return (
    <div className="planos-slider">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]} // Adiciona Autoplay
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Define o tempo do slide (5 segundos)
        spaceBetween={20}
        slidesPerView={1}
        loop={true} // Permite que o Swiper volte para o primeiro slide após o último
      >
        <SwiperSlide>
          <Turbo />
        </SwiperSlide>
        <SwiperSlide>
          <Gold />
        </SwiperSlide>
        <SwiperSlide>
          <Infinity />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default PlanosSlider;
