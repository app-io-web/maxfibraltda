import React from 'react';
import '../Beneficios/Beneficios.css';

const BeneficiosText = () => {
  return (
    <div className="beneficio-text">
      <h2>INTERNET ILIMITADA</h2>
      <h1>Mais Velocidade Mais Conectividade de Qualidade</h1>
      <p>A MaxFibra é sempre lembrada e indicada por seus clientes pela alta qualidade dos seus serviços e pela rapidez com que opera.</p>
      
      <ul className="beneficio-list">
        <li>✅ Instalação Rápida</li>
        <li>✅ Internet Sem Limites</li>
        <li>✅ Suporte Rápido e Eficiente</li>
        <li>✅ Wi-Fi Turbo</li>
        <li>✅ Equipe Especialista</li>
        <li>✅ Sem Burocracia</li>
      </ul>

      <button className="beneficio-btn">CONTRATE AGORA MESMO</button>
    </div>
  );
};

export default BeneficiosText;
