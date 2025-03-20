import React, { useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import "../../Styles/Formulario/StepConfirmacao.css";
import "../../Styles/Formulario/StepConfirmacaoEstilizado.css";

const StepConfirmacao = ({ prevStep, formData }) => {
  const [activeCard, setActiveCard] = useState("dadosPessoais");

  const toggleCard = (card) => {
    setActiveCard(activeCard === card ? "" : card);
  };

  return (
    <div className="step-container">
      <h2 className="titulo-confirmacao">
        <FaCheckCircle /> Confirmação do Cadastro
      </h2>

      <div className="cards-container">
        {/* Card 1 - Dados Pessoais */}
        <div className={`confirmacao-card ${activeCard === "dadosPessoais" ? "ativo" : ""}`} onClick={() => toggleCard("dadosPessoais")}>
          <h3><FaUser /> Dados Pessoais</h3>
          {activeCard === "dadosPessoais" && (
            <div className="conteudo-card">
              <p><strong>Nome:</strong> {formData.nome}</p>
              <p><strong>CPF:</strong> {formData.cpf}</p>
              <p><strong>RG:</strong> {formData.rg}</p>
              <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
            </div>
          )}
        </div>

        {/* Card 2 - Contato */}
        <div className={`confirmacao-card ${activeCard === "contato" ? "ativo" : ""}`} onClick={() => toggleCard("contato")}>
          <h3><FaEnvelope /> Contato</h3>
          {activeCard === "contato" && (
            <div className="conteudo-card">
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Telefone 1:</strong> {formData.telefone1}</p>
              <p><strong>Telefone 2:</strong> {formData.telefone2}</p>
            </div>
          )}
        </div>

        {/* Card 3 - Endereço */}
        <div className={`confirmacao-card ${activeCard === "endereco" ? "ativo" : ""}`} onClick={() => toggleCard("endereco")}>
          <h3><FaMapMarkerAlt /> Endereço</h3>
          {activeCard === "endereco" && (
            <div className="conteudo-card">
              <p><strong>Cidade:</strong> {formData.cidade}</p>
              <p><strong>Cep:</strong> {formData.cep}</p>
              <p><strong>Bairro:</strong> {formData.bairro}</p>
              <p><strong>Nª:</strong> {formData.numero}</p>
              <p><strong>Rua:</strong> {formData.rua}</p>
              <p><strong>Complemento:</strong> {formData.complemento || "Não informado"}</p>
              <p><strong>Longitude:</strong> {formData.longitude || "Não informado"}</p>
              <p><strong>Latitude:</strong> {formData.latitude || "Não informado"}</p>
            </div>
          )}
        </div>

        {/* Card 4 - Plano Escolhido */}
        <div className={`confirmacao-card ${activeCard === "plano" ? "ativo" : ""}`} onClick={() => toggleCard("plano")}>
          <h3><FaCheckCircle /> Plano Escolhido</h3>
          {activeCard === "plano" && (
            <div className="conteudo-card">
              <p><strong>Plano:</strong> {formData.plano}</p>
              <p><strong>Streaming Adicional:</strong> {formData.streaming || "Nenhum"}</p>
              <p><strong>Data de Vencimento:</strong> {formData.vencimento}</p>
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        <button className="botao-voltar" onClick={prevStep}>Voltar</button>
        <button className="botao-finalizar">Finalizar Cadastro</button>
      </div>
    </div>
  );
};

export default StepConfirmacao;
