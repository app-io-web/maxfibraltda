import React from 'react';
import '../../Styles/Mobile/Sidebar.css';


function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Cadastre-se</a></li>
        <li><a href="#">Sobre Nós</a></li>
        <li><a href="#">Empresas</a></li>
        <li><a href="#">Trabalhe Conosco</a></li>
        <li><a href="https://ixc.maxfibraltda.com.br/central_assinante_web/login" target="_blank" rel="noopener noreferrer">Acessar Central</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
