import React from "react";
import "../../../Styles/Formulario/Mobile/StepConfirmacaoMobile.css";

const StepConfirmacaoMobile = ({ prevStep, formData }) => {
  return (
    <div className="step-container-mobile">
      <h2>Confirmação</h2>

      <div className="confirmacao-box">
        <h3>Dados Pessoais</h3>
        <p><strong>Nome:</strong> {formData.nome}</p>
        <p><strong>CPF:</strong> {formData.cpf}</p>
        <p><strong>RG:</strong> {formData.rg}</p>
        <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>

        <h3>Contato</h3>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Telefone 1:</strong> {formData.telefone1}</p>
        <p><strong>Telefone 2:</strong> {formData.telefone2}</p>

        <h3>Endereço</h3>
        <p><strong>Cidade:</strong> {formData.cidade}</p>
        <p><strong>Bairro:</strong> {formData.bairro}</p>
        <p><strong>Endereço:</strong> {formData.endereco}, {formData.numero} - {formData.cep}</p>
        <p><strong>Complemento:</strong> {formData.complemento || "Não informado"}</p>

        <h3>Plano Escolhido</h3>
        <p><strong>Plano:</strong> {formData.plano}</p>
        <p><strong>Streaming Adicional:</strong> {formData.streaming || "Nenhum"}</p>
        <p><strong>Data de Vencimento:</strong> {formData.vencimento}</p>
      </div>

      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button className="finalizar-mobile">Finalizar Cadastro</button>
      </div>
    </div>
  );
};

export default StepConfirmacaoMobile;
