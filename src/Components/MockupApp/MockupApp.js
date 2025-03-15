import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 🔥 Importando animação do Framer Motion
import "../../Styles/MockupApp.css";
import mockupImg from "../../Assets/Mockup/MOCKUP.png";
import DownloadButtons from "../DownloadButtons"; // Ajuste o caminho conforme necessário

import mockupImgApple from "../../Assets/Mockup/imgs/MockupsSecudary/MOCKUP-2---APPLESTORE.png";
import mockupImgPlay from "../../Assets/Mockup/imgs/MockupsSecudary/MOCKUP-2---PLAYSTORE.png";



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
          <li>Verificar o consumo da sua conexão.</li>
        </ul>
          {/* Aqui entra os botões de download */}
          <DownloadButtons />
      </div>

      <motion.div 
  className="mockup-wrapper"
  initial={{ opacity: 0, y: 50 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.8, ease: "easeOut" }} 
  viewport={{ once: true, amount: 0.3 }} 
>
  {/* 🔹 Mockups secundários inclinados */}
  <motion.img 
    src={mockupImgApple} 
    alt="Mockup Apple Store"
    className="mockup-secondary apple"
    initial={{ opacity: 0, rotate: -15, x: -50 }} 
    whileInView={{ opacity: 1, rotate: -10, x: 0 }} 
    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
  />

  <motion.img 
    src={mockupImgPlay} 
    alt="Mockup Play Store"
    className="mockup-secondary play"
    initial={{ opacity: 0, rotate: 15, x: 50 }} 
    whileInView={{ opacity: 1, rotate: 10, x: 0 }} 
    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
  />

  {/* 🔹 Fundo Branco Dentro do Mockup */}
  <div className="mockup-bg"></div>

  {/* 🔹 Mockup principal */}
  <img src={mockupImg} alt="Mockup do App" className="mockup-img" />

  {/* 🔄 Slider de Imagens do App */}
  <div className="slider-container">
      <motion.img
        key={currentImageIndex}
        src={appScreenshots[currentImageIndex]}
        alt="Tela do aplicativo"
        className="app-screenshot"
        initial={{ opacity: 0.5 }}  // 🔹 Começa invisível
        animate={{ opacity: 1 }}  // 🔹 Aparece gradualmente
        exit={{ opacity: 0 }}     // 🔹 Some suavemente
        transition={{ duration: 1.5, ease: "easeInOut" }} // 🔥 Mais suave e fluido
      />
</div>

</motion.div>



    </section>
  );
};

export default MockupApp;
