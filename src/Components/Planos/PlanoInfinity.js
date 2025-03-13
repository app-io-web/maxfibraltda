import React, { useEffect, useState } from 'react';
import getServicosAdicionais from '../../Services/planosService'; // Caminho corrigido
import { FaWifi, FaTachometerAlt, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import '../../Styles/Planos.css';
import '../../Styles/PlanosAnimations.css'; // Importando o CSS de animação

function PlanoInfinity() { // Nome corrigido para evitar conflito com "Infinity" global
  const [servicos, setServicos] = useState([]);
  const [maisVendido, setMaisVendido] = useState(false);

  useEffect(() => {
    const fetchServicos = async () => {
      const data = await getServicosAdicionais();
      setServicos(data.infinity.servicos || []); // Pegando apenas os serviços do plano Infinity
      setMaisVendido(data.infinity.maisVendido); // Verifica se o plano Infinity é o mais vendido
    };
  
    fetchServicos();
  }, []);
  

  return (
    <div className="plano-card infinity-animation">
      {/* Se for mais vendido, exibe a tag */}
      {maisVendido && <div className="mais-vendido-tag">Mais Vendido</div>}

      <h3>Infinity</h3>
      <p className="preco">R$ 169,90 / mês</p>

      <ul className="plano-beneficios">
        <li><FaWifi /> Wi-Fi de Alta Performance 5G</li>
        <li><FaCheckCircle /> Wi-Fi Prêmio</li>
        <li><FaTachometerAlt /> Velocidade de Download 800 Mega</li>
        <li><FaHeadset /> Suporte em 48 Horas</li>
      </ul>

      <div className="servicos-list">
        <h4>Serviços Inclusos</h4>
        <div className="servicos-grid">
          {servicos.map((servico, index) => (
            <div key={index} className="servico-item">
              <img src={servico.Foto?.[0]?.url || '/placeholder.jpg'} alt={servico.nome || 'Serviço'} />
            </div>
          ))}
        </div>
      </div>

      <p className="obs">Obs.: Cliente tem acesso exclusivo a apenas 1 dos Apps mencionados acima.</p>

      <button className="assinar-btn">ASSINE AGORA</button>
    </div>
  );
}

export default PlanoInfinity;
