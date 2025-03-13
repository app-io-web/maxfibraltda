import React, { useEffect, useState } from 'react';
import getServicosAdicionais from '../../Services/planosService';
import { FaWifi, FaTachometerAlt, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import '../../Styles/Planos.css';
import '../../Styles/PlanosAnimations.css'; // Importando o CSS de animação

function Turbo() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    const fetchServicos = async () => {
      const data = await getServicosAdicionais();
      setServicos(data.turbo); // Pegando apenas os serviços do plano Turbo
    };

    fetchServicos();
  }, []);

  return (
    <div className="plano-card turbo-animation">
      <h3>Turbo</h3>
      <p className="preco">R$ 99,90 / mês</p>

      <ul className="plano-beneficios">
        <li><FaWifi /> Wi-Fi de Alta Performance 5G</li>
        <li><FaCheckCircle /> Wi-Fi Prêmio</li>
        <li><FaTachometerAlt /> Velocidade de Download 300 Mega</li>
        <li><FaHeadset /> Suporte em 72 Horas</li>
      </ul>
      
      <div className="servicos-list">
        <h4>Serviços Inclusos</h4>
        <div className="servicos-grid">
            {servicos.map((servico, index) => {
                const imagemURL = servico.Foto && servico.Foto.length > 0 ? servico.Foto[0].url : null;

                return (
                <div key={index} className="servico-item">
                    {imagemURL ? (
                    <img src={imagemURL} alt={servico.nome || 'Serviço'} onError={(e) => e.target.src = '/placeholder.jpg'} />
                    ) : (
                    <img src="/placeholder.jpg" alt="Serviço sem imagem" />
                    )}
                </div>
                );
            })}
            </div>

      </div>

      <p className="obs">Obs.: Cliente tem acesso exclusivo a apenas 1 dos Apps mencionados acima.</p>

      <button className="assinar-btn">ASSINE AGORA</button>
    </div>
  );
}

export default Turbo;
