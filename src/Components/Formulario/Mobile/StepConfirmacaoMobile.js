import React, { useState } from "react";
import dayjs from "dayjs"; // 🔥 Importa para formatar a data corretamente
import "dayjs/locale/pt-br";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Ícones de abrir/fechar
import "../../../Styles/Formulario/Mobile/StepConfirmacaoMobile.css";

const StepConfirmacaoMobile = ({ prevStep, formData }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Função para alternar visibilidade da seção
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // 🔥 Formata a data de nascimento corretamente antes de exibir
  const formatarData = (data) => {
    return data ? dayjs(data).format("DD/MM/YYYY") : "Não informado";
  };

  return (
    <div className="step-container-mobile">
      <h2>Confirmação</h2>

      {/* 🔹 DADOS PESSOAIS */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("dadosPessoais")}>
          <h3>Dados Pessoais</h3>
          {expandedSection === "dadosPessoais" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "dadosPessoais" && (
          <div className="accordion-content">
            <p><strong>Nome:</strong> {formData.nome}</p>
            <p><strong>CPF:</strong> {formData.cpf}</p>
            <p><strong>RG:</strong> {formData.rg}</p>
            <p><strong>Data de Nascimento:</strong> {formatarData(formData.dataNascimento)}</p> {/* 🔥 Corrigido */}
          </div>
        )}
      </div>

      {/* 🔹 CONTATO */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("contato")}>
          <h3>Contato</h3>
          {expandedSection === "contato" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "contato" && (
          <div className="accordion-content">
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Telefone 1:</strong> {formData.telefone1}</p>
            <p><strong>Telefone 2:</strong> {formData.telefone2}</p>
          </div>
        )}
      </div>

      {/* 🔹 ENDEREÇO */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("endereco")}>
          <h3>Endereço</h3>
          {expandedSection === "endereco" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "endereco" && (
          <div className="accordion-content">
            <p><strong>Cidade:</strong> {formData.cidade}</p>
            <p><strong>Bairro:</strong> {formData.bairro}</p>
            <p><strong>Endereço:</strong> {formData.endereco}, {formData.numero} - {formData.cep}</p>
            <p><strong>Complemento:</strong> {formData.complemento || "Não informado"}</p>
          </div>
        )}
      </div>

      {/* 🔹 PLANO ESCOLHIDO */}
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleSection("plano")}>
          <h3>Plano Escolhido</h3>
          {expandedSection === "plano" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "plano" && (
          <div className="accordion-content">
            <p><strong>Plano:</strong> {formData.plano}</p>
            <p><strong>Streaming Adicional:</strong> {formData.streaming || "Nenhum"}</p>
            <p><strong>Data de Vencimento:</strong> {formData.vencimento}</p>
          </div>
        )}
      </div>

      {/* BOTÕES */}
      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button className="finalizar-mobile">Finalizar Cadastro</button>
      </div>
    </div>
  );
};

export default StepConfirmacaoMobile;
