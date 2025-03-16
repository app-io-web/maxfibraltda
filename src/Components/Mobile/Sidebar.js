import React, { useEffect, useRef } from "react";
import "../../Styles/Mobile/Sidebar.css";
import SocialMediaFooter from "./SocialMediaFooter";

function Sidebar({ isOpen, toggleSidebar }) {
  const sidebarRef = useRef(null); // Criando referência para o sidebar

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Fecha o sidebar se o clique for fora dele
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Cadastre-se</a></li>
        <li><a href="#">Sobre Nós</a></li>
        <li><a href="#">Empresas</a></li>
        <li><a href="#">Trabalhe Conosco</a></li>
      </ul>

      {/* Botão fora da lista para evitar desalinhamento */}
      <a
        href="https://ixc.maxfibraltda.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="acessar-central"
      >
        <span className="text-default">Clientes Max Fibra</span>
        <span className="text-hover">Central</span>
      </a>

      <SocialMediaFooter />
    </div>
  );
}

export default Sidebar;
