import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import StartupCompany from './StartupCompany';
import MediumCompany from './MediumCompany';
import BigCompany from './BigCompany';
import '../../Styles/Planos.css';

function PlanosEmpresariaisSlider() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="planos-slider">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
      >
        <SwiperSlide>
          <StartupCompany />
        </SwiperSlide>
        <SwiperSlide>
          <MediumCompany />
        </SwiperSlide>
        <SwiperSlide>
          <BigCompany />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default PlanosEmpresariaisSlider;