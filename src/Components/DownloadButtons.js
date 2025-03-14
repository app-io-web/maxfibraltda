import React, { useState, useEffect } from "react";
import getDownloadLinks from "../Services/downloadLinksService";
import "../Styles/DownloadButtons.css"; // Importa o CSS separado
import { FaAndroid, FaApple } from "react-icons/fa";

const DownloadButtons = () => {
  const [links, setLinks] = useState({ Android: "", IOS: "" });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await getDownloadLinks();
      setLinks(data);
    };

    fetchLinks();
  }, []);

  return (
    <div
      className={`download-buttons-container ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botão inicial "Baixe Agora" */}
      {!isHovered && <button className="download-button">Baixe Agora</button>}

      {/* Botões Android e iOS ao passar o mouse */}
      {isHovered && (
        <div className="download-options">
          {links.Android && (
            <a href={links.Android} className="download-button android" target="_blank" rel="noopener noreferrer">
              <FaAndroid className="icon" /> Android
            </a>
          )}
          {links.IOS && (
            <a href={links.IOS} className="download-button ios" target="_blank" rel="noopener noreferrer">
              <FaApple className="icon" /> iOS
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default DownloadButtons;
