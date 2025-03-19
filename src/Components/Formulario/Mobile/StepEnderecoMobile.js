import React, { useState, useEffect } from "react";
import "../../../Styles/Formulario/Mobile/StepEnderecoMobile.css";
import SolicitarLocalizacaoModal from "../../Formulario/SolicitarLocalizacaoModal";

const StepEnderecoMobile = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const localizacaoAceita = localStorage.getItem("localizacaoAceita");

    if (localizacaoAceita === "true") {
      solicitarLocalizacao();
    } else {
      setShowModal(true);
    }
  }, []);

  const solicitarLocalizacao = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateFormData({ latitude, longitude });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          updateFormData({ latitude: "Não informada", longitude: "Não informada" });
        }
      );
    } else {
      updateFormData({ latitude: "Não disponível", longitude: "Não disponível" });
    }
  };

  const handleConfirmLocation = () => {
    setShowModal(false);
    localStorage.setItem("localizacaoAceita", "true");

    setTimeout(() => {
      solicitarLocalizacao();
    }, 500);
  };

  const handleCancelLocation = () => {
    setShowModal(false);
    localStorage.setItem("localizacaoAceita", "false");
  };

  return (
    <div className="step-container-mobile">
      {showModal && <SolicitarLocalizacaoModal onConfirm={handleConfirmLocation} onCancel={handleCancelLocation} />}

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

      {/* 🔥 Campos ocultos para armazenar Latitude e Longitude */}
      <input type="hidden" value={formData.latitude || ""} />
      <input type="hidden" value={formData.longitude || ""} />

      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button className="proximo-mobile" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepEnderecoMobile;
