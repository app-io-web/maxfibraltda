import React, { useState, useEffect } from "react";
import BeneficioCard from "../Beneficios/BeneficioCard";
import { FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "../../Styles/Beneficios.css";
import "../../Styles/BeneficiosMobile.css";

// Lotties empresariais
import RedeLottie from "../../Assets/Lotties/Wifi.json";
import AtendimentoLottie from "../../Assets/Lotties/CallCenter.json";
import SegurançaLottie from "../../Assets/Lotties/Security.json";
import CloudLottie from "../../Assets/Lotties/Business.json";

function BeneficiosEmpresariais() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const beneficiosCards = [
    { animation: RedeLottie, title: "Conexão Estável", description: "Rede dedicada para sua empresa operar sem interrupções." },
    { animation: AtendimentoLottie, title: "Suporte Empresarial", description: "Atendimento técnico prioritário e especializado." },
    { animation: SegurançaLottie, title: "Segurança Avançada", description: "Firewall, proteção contra ataques e backups automáticos." },
    { animation: CloudLottie, title: "Foco em sua Empresa", description: "Temos a Solução Ideial para sua Empresa." }
  ];

  const beneficiosLista = [
    "Conexão Estável",
    "Suporte Prioritário",
    "Planos Flexíveis",
    "Alta Disponibilidade",
    "Proteção Avançada",
    "Instalação Ágil"
  ];

  const scrollToPlanos = () => {
    const section = document.getElementById("planos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return React.createElement(
    "div",
    { className: "beneficios-container" },
    React.createElement(
      "div",
      { className: "beneficios-grid" },
      !isMobile
        ? React.createElement(
            "div",
            { className: "cards-beneficios" },
            beneficiosCards.map((item, index) =>
              React.createElement(BeneficioCard, {
                key: index,
                animation: item.animation,
                title: item.title,
                description: item.description
              })
            )
          )
        : React.createElement(
            Swiper,
            {
              modules: [Autoplay],
              autoplay: { delay: 3000, disableOnInteraction: false },
              spaceBetween: 10,
              slidesPerView: 1,
              loop: true,
              centeredSlides: true,
              style: { padding: "20px 0" }
            },
            beneficiosCards.map((item, index) =>
              React.createElement(
                SwiperSlide,
                {
                  key: index,
                  style: { display: "flex", justifyContent: "center" }
                },
                React.createElement(BeneficioCard, {
                  animation: item.animation,
                  title: item.title,
                  description: item.description
                })
              )
            )
          ),

      !isMobile &&
        React.createElement(
          "div",
          { className: "beneficios-texto" },
          React.createElement("h2", { className: "titulo-beneficios" }, "SOLUÇÕES EMPRESARIAIS"),
          React.createElement("h3", { className: "subtitulo-beneficios" }, "Mais Performance e Segurança para sua Empresa"),
          React.createElement(
            "p",
            { className: "descricao-beneficios" },
            "A MaxFibra Empresarial garante conectividade robusta e suporte técnico dedicado para manter sua operação sempre online."
          ),
          React.createElement(
            "div",
            { className: "beneficios-lista" },
            beneficiosLista.map((item, index) =>
              React.createElement(
                "div",
                { key: index, className: "beneficio-item" },
                React.createElement(FaCheckCircle, { className: "icone-beneficio" }),
                React.createElement("span", null, item)
              )
            )
          ),
          React.createElement(
            "button",
            { className: "botao-beneficios", onClick: scrollToPlanos },
            React.createElement("span", { className: "top-key" }),
            React.createElement("span", { className: "text" }, "FALE COM UM CONSULTOR"),
            React.createElement("span", { className: "bottom-key-1" }),
            React.createElement("span", { className: "bottom-key-2" })
          )
        )
    )
  );
}

export default BeneficiosEmpresariais;
