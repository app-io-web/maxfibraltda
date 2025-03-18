import React from "react";
import "../../../Styles/Formulario/Mobile/StepDadosPessoaisMobile.css";

const StepDadosPessoaisMobile = ({ nextStep, updateFormData, formData }) => {
  return (
    <div className="step-container-mobile">
      <h2>Dados Pessoais</h2>
      <label>Nome Completo *</label>
      <input type="text" value={formData.nome} onChange={(e) => updateFormData({ nome: e.target.value })} required />

      <label>CPF *</label>
      <input type="text" value={formData.cpf} onChange={(e) => updateFormData({ cpf: e.target.value })} required />

     <label>RG </label>
     <input type="text" value={formData.rg} onChange={(e) => updateFormData({ rg: e.target.value })} required />

      <label>Data de Nascimento *</label>
      <input 
          type="text"
          onFocus={(e) => (e.target.type = "date")} 
          onBlur={(e) => (e.target.type = "text")}
          value={formData.dataNascimento} 
          onChange={(e) => updateFormData({ dataNascimento: e.target.value })} 
          placeholder="DD/MM/AAAA" 
          required 
        />


      <div className="button-group-mobile">
        <button className="proximo-mobile" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepDadosPessoaisMobile;
