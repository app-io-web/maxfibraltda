import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../Styles/LoadingScreen.css";
import logo from "../Assets/logo.png"; // Certifique-se do caminho correto

const LoadingScreen = ({ onFinish }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (onFinish) onFinish();
    }, 5000); // Tempo total da animação
  }, [onFinish]);

  if (!loading) return null;

  return (
    <div className="loading-container">
      {/* Linhas que vêm das bordas para o centro */}
      <motion.div
        className="loading-line left"
        initial={{ width: "0%" }}
        animate={{ width: "50%" }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="loading-line right"
        initial={{ width: "0%" }}
        animate={{ width: "50%" }}
        transition={{ duration: 1 }}
      />

      {/* Círculo ao redor da logo */}
      <motion.div
        className="loading-circle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.img
          src={logo}
          alt="MaxFibra"
          className="loading-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      </motion.div>

      {/* Portas abrindo horizontalmente */}
      <motion.div
        className="loading-door left"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.2, delay: 3, ease: "easeInOut" }}
      />
      <motion.div
        className="loading-door right"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, delay: 3, ease: "easeInOut" }}
      />
    </div>
  );
};

export default LoadingScreen;
