import React, { useEffect, useState } from "react";
import "../../Styles/Formulario/InformacoesPlano.css";

const precosPlanos = {
  "Gold": "R$ 129,90 / mês",
  "Infinity": "R$ 169,90 / mês",
  "Turbo": "R$ 99,90 / mês",
  "Startup Company": "R$ 199,90 / mês",
  "Medium Company": "R$ 299,90 / mês",
  "Big Company": "R$ 399,90 / mês"
};

const velocidadesPlanos = {
  "Gold": "600 Mega",
  "Infinity": "800 Mega",
  "Turbo": "400 Mega",
  "Startup Company": "50 Mega",
  "Medium Company": "100 Mega",
  "Big Company": "200 Mega"
};


const InformacoesPlano = ({ plano, streaming, vencimento, tipoDocumento }) => {
  const [planoAtual, setPlanoAtual] = useState(plano);
  const [streamingAtual, setStreamingAtual] = useState(streaming);
  const [vencimentoAtual, setVencimentoAtual] = useState(vencimento);


  useEffect(() => {
    setPlanoAtual(plano);
  }, [plano]);

  useEffect(() => {
    setStreamingAtual(streaming);
  }, [streaming]);

  useEffect(() => {
    setVencimentoAtual(vencimento);
  }, [vencimento]); // Atualiza sempre que `vencimento` mudar

  const preco = precosPlanos[planoAtual] || "Não disponível";
  const velocidade = velocidadesPlanos[planoAtual] || "Não informado";

  return (
    <div className="plano-container">
      <h2 className="TituloInforPlano">Seu Pedido</h2>
      <div className="plano-detalhes">
        <div className="plano-item">
          <span className="plano-label">Plano:</span>
          <span className="plano-valor">{planoAtual || "Nenhum plano selecionado"}</span>
        </div>
        <div className="plano-item">
          <span className="plano-label">Velocidade:</span>
          <span className="plano-valor">{velocidade || "Não selecionado"}</span>
        </div>
        <div className="plano-item">
          <span className="plano-label">Serviços:</span>
          <span className="plano-valor">Wi-Fi Turbinado</span>
        </div>
        <div className="plano-item">
          <span className="plano-label">Modem Wi-Fi:</span>
          <span className="plano-valor">Incluído</span>
        </div>

        {tipoDocumento !== "CNPJ" && streamingAtual && streamingAtual !== "" && (
          <div className="plano-item">
            <span className="plano-label">Serviço Adicional:</span>
            <span className="plano-valor">{streamingAtual}</span>
          </div>
        )}


        <div className="plano-item">
          <span className="plano-label">Data de Vencimento:</span>
          <span className="plano-valor">{vencimentoAtual || "Não informado"}</span>
        </div>

        <div className="plano-total">
          <span>Total:</span>
          <span class="precoCadastro">{preco}</span>
        </div>
      </div>
    </div>
  );
};

export default InformacoesPlano;