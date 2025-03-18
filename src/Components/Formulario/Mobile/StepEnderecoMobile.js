import React from "react";
import "../../../Styles/Formulario/Mobile/StepEnderecoMobile.css";

const StepEnderecoMobile = ({ nextStep, prevStep, updateFormData, formData }) => {
  return (
    <div className="step-container-mobile">
      <h2>Endereço</h2>

      <label>Cidade *</label>
      <input type="text" value={formData.cidade} onChange={(e) => updateFormData({ cidade: e.target.value })} required />

      <label>Bairro *</label>
      <input type="text" value={formData.bairro} onChange={(e) => updateFormData({ bairro: e.target.value })} required />
      <div className="input-duplo">
          <div>
            <label>CEP *</label>
            <input type="text" value={formData.cep} onChange={(e) => updateFormData({ cep: e.target.value })} required />
         </div>

         <div>
          <label>Endereço *</label>
          <input type="text" value={formData.endereco} onChange={(e) => updateFormData({ endereco: e.target.value })} required />
        </div>
      </div>

      <div className="input-duplo">
        <div>
          <label>Número *</label>
          <input type="text" value={formData.numero} onChange={(e) => updateFormData({ numero: e.target.value })} required />
        </div>

        <div>
          <label>Complemento</label>
          <input type="text" value={formData.complemento} onChange={(e) => updateFormData({ complemento: e.target.value })} />
        </div>
      </div>

      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button className="proximo-mobile" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepEnderecoMobile;
