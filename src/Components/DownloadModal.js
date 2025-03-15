import React from "react";
import "../Styles/DownloadModal.css"; // Importa o CSS atualizado
import { FaAndroid, FaApple } from "react-icons/fa";

const DownloadModal = ({ isOpen, onClose, androidLink, iosLink }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="content">
          <h3>Baixe Nosso App</h3>
          <p>Escolha a plataforma para download:</p>

          <div className="modal-buttons">
            {androidLink && (
              <a href={androidLink} className="modal-download-btn android" target="_blank" rel="noopener noreferrer">
                <FaAndroid className="icon" /> Android
              </a>
            )}
            {iosLink && (
              <a href={iosLink} className="modal-download-btn ios" target="_blank" rel="noopener noreferrer">
                <FaApple className="icon" /> iOS
              </a>
            )}
          </div>

          <button className="modal-close-btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
