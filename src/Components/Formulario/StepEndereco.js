import React from "react";

import "../../Styles/Formulario/StepEndereco.css";
import Localizacao from "./Localizacao";

const StepEndereco = ({ nextStep, prevStep, updateFormData, formData }) => {
  return (
    <div className="step-container">
      <h2>Endereço</h2>

      <label>Cidade *</label>
      <input
        type="text"
        value={formData.cidade}
        onChange={(e) => updateFormData({ cidade: e.target.value })}
        required
      />

      {/* Bairro e CEP na mesma linha */}
      <div className="linha">
        <div className="campo">
          <label>Bairro *</label>
          <input
            type="text"
            value={formData.bairro}
            onChange={(e) => updateFormData({ bairro: e.target.value })}
            required
          />
        </div>

        <div className="campo">
          <label>CEP *</label>
          <input
            type="text"
            value={formData.cep}
            onChange={(e) => updateFormData({ cep: e.target.value })}
            required
          />
        </div>
      </div>

      <label>Rua *</label>
      <input
        type="text"
        value={formData.rua}
        onChange={(e) => updateFormData({ rua: e.target.value })}
        required
      />

      {/* Número e Complemento na mesma linha */}
      <div className="linha">
        <div className="campo">
          <label>Número *</label>
          <input
            type="text"
            value={formData.numero}
            onChange={(e) => updateFormData({ numero: e.target.value })}
            required
          />
        </div>

        <div className="campo">
          <label>Complemento</label>
          <input
            type="text"
            value={formData.complemento}
            onChange={(e) => updateFormData({ complemento: e.target.value })}
          />
        </div>
      </div>

      <label>Ponto de Referência</label>
      <input
        type="text"
        value={formData.pontoReferencia}
        onChange={(e) => updateFormData({ pontoReferencia: e.target.value })}
      />

      <Localizacao setLocalizacao={(loc) => updateFormData({ latitude: loc.split(", ")[0], longitude: loc.split(", ")[1] })} />


      <div className="button-group">
        <button className="voltar" onClick={prevStep}>Voltar</button>
        <button className="proximo" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepEndereco;
