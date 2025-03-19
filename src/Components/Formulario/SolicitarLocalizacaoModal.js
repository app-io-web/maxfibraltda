import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "../../Styles/Formulario/SolicitarLocalizacaoModal.css";
import localizationAnimation from "../../Assets/Lotties/Localization.json"; // Importa a animação

const SolicitarLocalizacaoModal = ({ onConfirm, onCancel }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Pequeno delay para evitar renderizações inconsistentes
  }, []);

  if (!isVisible) return null; // Se não estiver visível, retorna `null`

  return (
    <div className="modal-overlay">
      <div className="modal-contentLocalization">
        {/* 🔥 Animação Lottie para localização */}
        <Player
          autoplay
          loop
          src={localizationAnimation}
          style={{ height: "150px", width: "150px" }}
        />

        <h2>Permissão de Localização</h2>
        <p>Precisamos acessar sua localização para preencher os dados corretamente.</p>

        <div className="modal-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Permitir</button>
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default SolicitarLocalizacaoModal;
