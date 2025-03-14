import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 🔥 Importando animação do Framer Motion
import "../../Styles/MockupApp.css";
import mockupImg from "../../Assets/Mockup/MOCKUP.png";
import DownloadButtons from "../DownloadButtons"; // Ajuste o caminho conforme necessário


// Importação dinâmica das imagens dentro da pasta 'imgs'
const imagesContext = require.context("../../Assets/Mockup/imgs", false, /\.(png|jpe?g|svg)$/);
const appScreenshots = imagesContext.keys().map(imagesContext);

const MockupApp = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % appScreenshots.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mockup-container">
      <div className="text-content">
        <h3 className="green-text">ESQUEÇA BUROCRACIAS NO ATENDIMENTO</h3>
        <h2>Com o <strong>app da Max Fibra</strong> você pode:</h2>
        <ul>
          <li>Baixar a segunda via de faturas.</li>
          <li>Consultar o código de barras do boleto.</li>
          <li>Visualizar todo o seu histórico financeiro.</li>
          <li>Realizar abertura de protocolo de atendimento.</li>
          <li>Verificar o consumo da sua conexão.</li>
        </ul>
          {/* Aqui entra os botões de download */}
          <DownloadButtons />
      </div>

      {/* 🔥 Animação do Mockup ao entrar na tela */}
      <motion.div 
        className="mockup-wrapper"
        initial={{ opacity: 0, y: 50 }} // Começa invisível e mais abaixo
        whileInView={{ opacity: 1, y: 0 }} // Aparece ao entrar na tela
        transition={{ duration: 0.8, ease: "easeOut" }} // Tempo da animação
        viewport={{ once: true, amount: 0.3 }} // Ativa uma vez quando 30% visível
      >
        <img src={mockupImg} alt="Mockup do App" className="mockup-img" />

        <div className={`slider-container ${fade ? "fade-in" : "fade-out"}`}>
          <img
            src={appScreenshots[currentImageIndex]}
            alt="Tela do aplicativo"
            className="app-screenshot"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MockupApp;
