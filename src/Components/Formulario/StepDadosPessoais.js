import React from "react";
import "../../Styles/Formulario/Formulario.css";

const StepDadosPessoais = ({ nextStep, updateFormData, formData, isMobile }) => {
  return (
    <div className="step-container">
      <h2 className="titulo-confirmacao">Dados de Cadastro</h2>

      <label>Nome Completo *</label>
      <input
        type="text"
        value={formData.nome}
        onChange={(e) => updateFormData({ nome: e.target.value })}
        required
      />

      {/* Divisão dos campos CPF & RG e Data de Nascimento */}
      <div className={`input-duplo ${isMobile ? "coluna" : ""}`}>
        <div>
          <label>CPF *</label>
          <input
            type="text"
            value={formData.cpf}
            onChange={(e) => updateFormData({ cpf: e.target.value })}
            required
          />
        </div>

        <div>
          <label>RG *</label>
          <input
            type="text"
            value={formData.rg}
            onChange={(e) => updateFormData({ rg: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label>Data de Nascimento *</label>
        <input
          type="date"
          value={formData.dataNascimento}
          onChange={(e) => updateFormData({ dataNascimento: e.target.value })}
          required
        />
      </div>

      <div className="button-group">
        <button className="proximo" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepDadosPessoais;
