import React, { useEffect, useState } from "react";
import "../Styles/Footer.css";
import { FaFacebook, FaInstagram, FaYoutube, FaAndroid, FaApple } from "react-icons/fa";
import getDownloadLinks from "../Services/downloadLinksService";
import { fetchSocialLinks } from "../Services/socialMediaService";

const Footer = () => {
  const [downloadLinks, setDownloadLinks] = useState({ Android: "", IOS: "" });
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const links = await getDownloadLinks();
      setDownloadLinks(links);

      const social = await fetchSocialLinks();
      setSocialLinks(social);
    };
    fetchLinks();
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Sobre nós</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Trabalhe conosco</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Planos</h4>
          <ul>
            <li><a href="#">Internet</a></li>
            <li><a href="#">TV e Streaming</a></li>
            <li><a href="#">Para empresas</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Siga a Max Fibra nas redes sociais</h4>
          <div className="footer-social-icons">
            {socialLinks.map((social) => (
              <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.platform === "facebook" && <FaFacebook />}
                {social.platform === "instagram" && <FaInstagram />}
                {social.platform === "youtube" && <FaYoutube />}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4>Baixe o app Max Fibra</h4>
          <div className="footer-app-links">
            <a href={downloadLinks.Android} target="_blank" rel="noopener noreferrer">
              <FaAndroid /> Google Play
            </a>
            <a href={downloadLinks.IOS} target="_blank" rel="noopener noreferrer">
              <FaApple /> App Store
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>CNPJ: 14.935.962-0001-47 - MAX TECNOLOGIA E TELECOMUNICACAO - MTT LTDA</p>
      </div>
    </footer>
  );
};

export default Footer;