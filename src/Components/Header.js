import React from 'react';
import '../Styles/Header.css';
import Button from './Button';
import logo from '../Assets/logo.png'; // Substitua pelo caminho correto da logo

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="MaxFibra Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Cadastre-se</a></li>
          <li><a href="#">Sobre Nós</a></li>
          <li><a href="#">Empresas</a></li>
          <li><a href="#">Trabalhe Conosco</a></li>
        </ul>
      </nav>
      <Button text="Acessar Central" href='https://ixc.maxfibraltda.com.br/central_assinante_web/login' />
    </header>
  );
}

export default Header;
