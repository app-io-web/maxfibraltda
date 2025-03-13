import React, { useState, useEffect } from "react";
import BeneficioCard from "./BeneficioCard";
import { FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Importando corretamente o Lottie
import WifiLottie from "../../Assets/Lotties/Wifi.json";
import MovieLottie from "../../Assets/Lotties/Movie.json";
import CallCenterLottie from "../../Assets/Lotties/CallCenter.json";
import DownloadLottie from "../../Assets/Lotties/Download.json";

import "../../Styles/Beneficios.css";
import "../../Styles/BeneficiosMobile.css";

const Beneficios = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lista de Benefícios dos Cards com animações Lottie
  const beneficiosCards = [
    { animation: WifiLottie, title: "Internet Fibra Ultra Rápida", description: "Internet 100% fibra óptica de alta velocidade" },
    { animation: MovieLottie, title: "Qualidade e Estabilidade", description: "Perfeito para assistir sua série favorita, jogar e trabalhar" },
    { animation: CallCenterLottie, title: "Suporte Especializado", description: "Suporte especializado que não te deixa na mão" },
    { animation: DownloadLottie, title: "Internet Sem Limites", description: "Faça downloads ilimitados sem franquia de consumo." }
  ];

  // Lista de Benefícios ao lado (Desktop)
  const beneficiosLista = [
    "Instalação Rápida",
    "Internet Sem Limites",
    "Suporte Rápido e Eficiente",
    "Wi-Fi Turbo",
    "Equipe Especialista",
    "Sem Burocracia"
  ];

  return (
    <div className="beneficios-container">
      <div className="beneficios-grid">
        {/* Exibe os cards normalmente no desktop */}
        {!isMobile ? (
          <div className="cards-beneficios">
            {beneficiosCards.map((item, index) => (
              <BeneficioCard key={index} animation={item.animation} title={item.title} description={item.description} />
            ))}
          </div>
        ) : (
          // No mobile, transforma os cards em um carrossel
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            style={{ padding: "20px 0" }}
          >
            {beneficiosCards.map((item, index) => (
              <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                <BeneficioCard animation={item.animation} title={item.title} description={item.description} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Coluna DIREITA - Título, Descrição e Lista */}
        {!isMobile && (
          <div className="beneficios-texto">
            <h2 className="titulo-beneficios">INTERNET ILIMITADA</h2>
            <h3 className="subtitulo-beneficios">Mais Velocidade Mais Conectividade de Qualidade</h3>
            <p className="descricao-beneficios">
              A MaxFibra é sempre lembrada e indicada por seus clientes pela alta qualidade dos seus serviços e pela rapidez com que opera.
            </p>

            <div className="beneficios-lista">
              {beneficiosLista.map((item, index) => (
                <div key={index} className="beneficio-item">
                  <FaCheckCircle className="icone-beneficio" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="botao-beneficios">CONTRATE AGORA MESMO</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beneficios;
