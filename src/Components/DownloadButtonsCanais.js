import React from "react";
import "../Styles/DownloadButtons.css";
import { FaAndroid, FaApple } from "react-icons/fa";

const DownloadButtonsCanais = ({ androidLink, iosLink, isMobile }) => {
  if (!androidLink && !iosLink) return null;

  return (
    <div className={`download-buttons-canais canais-container ${isMobile ? "mobile" : ""}`}>
      {androidLink && (
        <a href={androidLink} className="canais-download-btn canais-android" target="_blank" rel="noopener noreferrer">
          <FaAndroid className="icon" /> Android
        </a>
      )}
      {iosLink && (
        <a href={iosLink} className="canais-download-btn canais-ios" target="_blank" rel="noopener noreferrer">
          <FaApple className="icon" /> iOS
        </a>
      )}
    </div>
  );
};

export default DownloadButtonsCanais;
