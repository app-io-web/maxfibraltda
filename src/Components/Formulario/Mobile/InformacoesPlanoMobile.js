import React, { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../../Styles/Formulario/Mobile/InformacoesPlano.css";

const precosPlanos = {
  "Gold": "R$ 129,90 / mês",
  "Infinity": "R$ 169,90 / mês",
  "Turbo": "R$ 99,90 / mês"
};

const velocidadesPlanos = {
  "Gold": "600 Mega",
  "Infinity": "800 Mega",
  "Turbo": "400 Mega"
};

const InformacoesPlanoMobile = ({ plano, streaming, vencimento }) => {
  const [planoAtual, setPlanoAtual] = useState(plano);
  const [streamingAtual, setStreamingAtual] = useState(streaming);
  const [vencimentoAtual, setVencimentoAtual] = useState(vencimento);
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar a expansão
  const containerRef = useRef(null);

  useEffect(() => setPlanoAtual(plano), [plano]);
  useEffect(() => setStreamingAtual(streaming), [streaming]);
  useEffect(() => setVencimentoAtual(vencimento), [vencimento]);

  const preco = precosPlanos[planoAtual] || "Não disponível";
  const velocidade = velocidadesPlanos[planoAtual] || "Não informado";

  // Detecta clique fora do componente para fechar
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Verifica se Serviço Adicional ou Data de Vencimento foi selecionado
  const hasNewData = streamingAtual !== "" || vencimentoAtual !== "";

  return (
      <div ref={containerRef} className={`plano-container-mobile ${isExpanded ? "expandido" : ""}`}>

      {/* Título com Toggle para Expandir/Fechar */}
      <div className="titulo-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="TituloInforPlano">
          Seu Pedido  
          {hasNewData && <span className="notificacao"></span>} {/* Bolinha piscante */}
        </h2>
        {isExpanded ? <FaChevronUp className="icone-seta" /> : <FaChevronDown className="icone-seta" />}
      </div>

      {/* Conteúdo que expande e retrai */}
      {isExpanded && (
        <div className="plano-detalhes-mobile">
          <div className="plano-item">
            <span className="plano-label">Plano:</span>
            <span className="plano-valor">{planoAtual || "Nenhum plano selecionado"}</span>
          </div>
          <div className="plano-item">
            <span className="plano-label">Velocidade:</span>
            <span className="plano-valor">{velocidade}</span>
          </div>
          <div className="plano-item">
            <span className="plano-label">Serviços:</span>
            <span className="plano-valor">Wi-Fi Turbinado</span>
          </div>
          <div className="plano-item">
            <span className="plano-label">Modem Wi-Fi:</span>
            <span className="plano-valor">Incluído</span>
          </div>

          {streamingAtual && streamingAtual !== "" && (
            <div className="plano-item">
              <span className="plano-label">Serviço Adicional:</span>
              <span className="plano-valor">{streamingAtual}</span>
            </div>
          )}

          <div className="plano-item">
            <span className="plano-label">Data de Vencimento:</span>
            <span className="plano-valor">{vencimentoAtual}</span>
          </div>

          <div className="plano-total mobile">
            <span className="precoB">Total:</span>
            <span className="preco">{preco}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformacoesPlanoMobile;
