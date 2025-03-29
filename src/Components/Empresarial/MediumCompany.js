// MediumCompany.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarPlanosEmpresariais } from '../../Services/Empresarial/servicePlanosEmpresariais';
import '../../Styles/PlanosEmpresariais.css';
import { FaWifi, FaHeadset, FaClock, FaNetworkWired, FaServer } from 'react-icons/fa';

function MediumCompany() {
  const [dados, setDados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    buscarPlanosEmpresariais().then(data => {
      if (data) setDados(data.medium);
    });
  }, []);

  const handleAssineAgora = () => {
    navigate("/cadastro", {
      state: {
        plano: "Medium Company",
        tipoDocumento: "CNPJ"
      }
    });
    
  };

  const scrollToContato = () => {
    const section = document.getElementById('formulario-contato');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!dados) return null;

  return React.createElement(
    'div',
    { className: 'plano-empresarial-card' },
    React.createElement('div', { className: 'plano-empresarial-header' }, 'Medium Company'),
    React.createElement('p', { className: 'plano-empresarial-preco' }, `${dados.Valor} / mês`),
    React.createElement('div', { className: 'plano-empresarial-info' },
      React.createElement('span', null, React.createElement(FaNetworkWired, { className: 'plano-icon' }), dados.Tecnologia),
      React.createElement('span', null, React.createElement(FaWifi, { className: 'plano-icon' }), dados.Moldem),
      React.createElement('span', null, React.createElement(FaServer, { className: 'plano-icon' }), `IP: ${dados.IP}`),
      React.createElement('span', null, React.createElement(FaClock, { className: 'plano-icon' }), `SLA: ${dados.Tempo_de_SLA}`),
      React.createElement('span', null, React.createElement(FaHeadset, { className: 'plano-icon' }), dados.Suporte)
    ),
    <button className="botao-beneficios" onClick={handleAssineAgora}>
      ASSINE AGORA
    </button>
  );
}

export default MediumCompany;
