import React, { useState, useEffect } from "react";
import "../../Styles/Formulario/StepEndereco.css";
import Localizacao from "./Localizacao";
import SolicitarLocalizacaoModal from "./SolicitarLocalizacaoModal";

const StepEndereco = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const localizacaoAceita = localStorage.getItem("localizacaoAceita");

    // Se o usuário já aceitou antes, NÃO mostramos o modal
    if (localizacaoAceita === "true") {
      solicitarLocalizacao();
    } else {
      setShowModal(true); // Se nunca aceitou, mostramos o modal primeiro
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
    localStorage.setItem("localizacaoAceita", "true"); // Salva que o usuário aceitou

    // Aguarda o modal fechar para solicitar a localização
    setTimeout(() => {
      solicitarLocalizacao();
    }, 500);
  };

  const handleCancelLocation = () => {
    setShowModal(false); // Agora realmente fecha o modal
    localStorage.setItem("localizacaoAceita", "false"); // Mantém a recusa registrada
  };
  
  return (
    <div className="step-container">
      {/* 🔥 Modal só aparece antes da requisição de localização */}
      {showModal && <SolicitarLocalizacaoModal onConfirm={handleConfirmLocation} onCancel={handleCancelLocation} />}

      <h2 className="titulo-confirmacao">Endereço</h2>

      <label>Cidade *</label>
      <input
        type="text"
        value={formData.cidade}
        onChange={(e) => updateFormData({ cidade: e.target.value })}
        required
      />

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
