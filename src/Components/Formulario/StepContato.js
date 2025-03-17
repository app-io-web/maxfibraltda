import React from "react";

const StepContato = ({ nextStep, prevStep, updateFormData, formData }) => {
  return (
    <div className="step-container">
      <h2 >Contato</h2>
      <label>Email *</label>
      <input type="email" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })} required />

      <label>Telefone 1 *</label>
      <input type="tel" value={formData.telefone1} onChange={(e) => updateFormData({ telefone1: e.target.value })} required />

      <label>Telefone 2 *</label>
      <input type="tel" value={formData.telefone2} onChange={(e) => updateFormData({ telefone2: e.target.value })} required />

      <div className="button-group">
        <button className="voltar" onClick={prevStep}>Voltar</button>
        <button className="proximo" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepContato;
