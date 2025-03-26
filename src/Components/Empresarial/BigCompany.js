import React, { useEffect, useState } from 'react';
import { buscarPlanosEmpresariais } from '../../Services/Empresarial/servicePlanosEmpresariais';
import '../../Styles/PlanosEmpresariais.css';
import { FaWifi, FaHeadset, FaClock, FaNetworkWired, FaServer } from 'react-icons/fa';

function BigCompany() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    buscarPlanosEmpresariais().then(data => {
      if (data) setDados(data.big);
    });
  }, []);

  if (!dados) return null;

  return React.createElement(
    'div',
    { className: 'plano-empresarial-card' },
    React.createElement('div', { className: 'plano-empresarial-header' }, 'Big Company'),
    React.createElement('p', { className: 'plano-empresarial-preco' }, `${dados.Valor} / mês`),
    React.createElement('div', { className: 'plano-empresarial-info' },
      React.createElement('span', null, React.createElement(FaNetworkWired, { className: 'plano-icon' }), dados.Tecnologia),
      React.createElement('span', null, React.createElement(FaWifi, { className: 'plano-icon' }), dados.Moldem),
      React.createElement('span', null, React.createElement(FaServer, { className: 'plano-icon' }), `IP: ${dados.IP}`),
      React.createElement('span', null, React.createElement(FaClock, { className: 'plano-icon' }), `SLA: ${dados.Tempo_de_SLA}`),
      React.createElement('span', null, React.createElement(FaHeadset, { className: 'plano-icon' }), dados.Suporte)
    ),
    React.createElement('button', {
      className: 'botao-beneficios',
      onClick: () => {
        const section = document.getElementById('formulario-contato');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 'ASSINE AGORA')
  );
}

export default BigCompany;
