import React, { useState, useEffect } from "react";
import "../Styles/CanaisAtendimento.css";
import getDownloadLinks from "../Services/downloadLinksService";
import DownloadButtonsCanais from "./DownloadButtonsCanais";
import DownloadModal from "./DownloadModal";
import WhatsAppModal from "./WhatsAppModal"; // 🔥 Importando o modal do WhatsApp
import { FaFileInvoice, FaHeadset, FaMobileAlt, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const CanaisAtendimento = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState({ Android: "", IOS: "" });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    mensagem: "Gostaria de suporte via WhatsApp",
    departamento: "Atendimento",
  });

  useEffect(() => {
    const fetchLinks = async () => {
      const links = await getDownloadLinks();
      setDownloadLinks(links);
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canais = [
    { id: 1, nome: "Minhas Faturas", link: "https://ixc.maxfibraltda.com.br/central_assinante_web/login", icon: <FaFileInvoice />, external: true },
    { id: 2, nome: "Auto-Atendimento", link: "#", icon: <FaHeadset />, isWhatsApp: true },
    {
      id: 3,
      nome: "Baixe Nosso App",
      link: "#",
      icon: <FaMobileAlt />,
      isDownloadButton: true,
    },
    { id: 4, nome: "Instagram", link: "https://www.instagram.com/maxfibraoficial", icon: <FaInstagram />, external: true },
    { id: 5, nome: "Facebook", link: "https://www.facebook.com/Maxtelecomunicacoes/", icon: <FaFacebook />, external: true },
    { id: 6, nome: "Youtube", link: "https://www.youtube.com/@grupomax9951", icon: <FaYoutube />, external: true },
  ];

  return (
    <section className="canais-container">
      <div className="canais-texto">
        <h2>Outros canais de atendimento</h2>
        <p>Estamos sempre prontos para lhe atender. Você pode se interessar por essas opções.</p>
      </div>

      <div className="canais-botoes">
        {canais.map((canal) => (
          <div key={canal.id} className={`canal-wrapper ${activeCard === canal.id ? "active" : ""}`}>
            <a
              href={canal.link}
              className="canal-botao"
              target={canal.external ? "_blank" : "_self"}
              rel={canal.external ? "noopener noreferrer" : ""}
              onClick={(e) => {
                if (canal.isDownloadButton) {
                  e.preventDefault();
                  if (isMobile) {
                    setIsModalOpen(true);
                  } else {
                    setActiveCard(activeCard === canal.id ? null : canal.id);
                  }
                }
                if (canal.isWhatsApp) {
                  e.preventDefault();
                  setIsWhatsAppModalOpen(true);
                }
              }}
            >
              <div className="border"></div>
              <div className="content">
                <div className="icon">{canal.icon}</div>
                <span className="nome-canal">{canal.nome}</span>
              </div>
            </a>
            {!isMobile && canal.isDownloadButton && activeCard === canal.id && (
              <DownloadButtonsCanais androidLink={downloadLinks.Android} iosLink={downloadLinks.IOS} />
            )}
          </div>
        ))}
      </div>

      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        androidLink={downloadLinks.Android}
        iosLink={downloadLinks.IOS}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        formData={formData}
      />
    </section>
  );
};

export default CanaisAtendimento;