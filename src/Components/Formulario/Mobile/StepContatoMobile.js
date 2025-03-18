import React from "react";
import "../../../Styles/Formulario/Mobile/StepContatoMobile.css";

const StepContatoMobile = ({ nextStep, prevStep, updateFormData, formData }) => {
  return (
    <div className="step-container-mobile">
      <h2>Contato</h2>

      <label>Email *</label>
      <input type="email" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })} required />

      <label>Telefone 1 *</label>
      <input type="tel" value={formData.telefone1} onChange={(e) => updateFormData({ telefone1: e.target.value })} required />

      <label>Telefone 2</label>
      <input type="tel" value={formData.telefone2} onChange={(e) => updateFormData({ telefone2: e.target.value })} />

      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button className="proximo-mobile" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepContatoMobile;
