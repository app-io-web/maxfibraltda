import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PrecoPlanoMobile from "./PrecoPlanoMobile";
import "../../../Styles/Formulario/Mobile/StepPlanoMobile.css";
import StreamingService from "../../../Services/StreamingService";

const StepPlanoMobile = ({ nextStep, prevStep, updateFormData, formData }) => {
  const navigate = useNavigate();
  const [streamingOptions, setStreamingOptions] = useState([]);
  const [isEditingPlano, setIsEditingPlano] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState(formData.plano);

  useEffect(() => {
    const fetchStreamingOptions = async () => {
      if (formData.plano) {
        const services = await StreamingService.getStreamingByPlano(formData.plano);
        setStreamingOptions(services);
      }
    };
    fetchStreamingOptions();
  }, [formData.plano]);

  const handleNext = () => {
    if (!formData.plano) {
      alert("Selecione um plano antes de continuar!");
      return;
    }

    if (!formData.vencimento) {
      alert("Selecione uma data de vencimento!");
      return;
    }

    console.log("🚀 Enviando dados para Cadastro:", formData);

    updateFormData({
      vencimento: formData.vencimento,
      streaming: formData.streaming,
    });

    nextStep();
  };

  const handleEditPlano = () => {
    setIsEditingPlano(true);
  };

  const handleSavePlano = () => {
    updateFormData({ plano: selectedPlano });
    setIsEditingPlano(false);
  };

  return (
    <div className="step-container-mobile">
      <h2 className="titulo-confirmacao">Plano Escolhido</h2>

      <div className="plano-selecionado-wrapper">
        <label>Plano Selecionado:</label>
        <div className="plano-selecionado-container">
          {isEditingPlano ? (
            <select value={selectedPlano} onChange={(e) => setSelectedPlano(e.target.value)} className="plano-edit-select">
              <option value="Gold">Gold</option>
              <option value="Infinity">Infinity</option>
              <option value="Turbo">Turbo</option>
            </select>
          ) : (
            <span className="plano-text">{formData.plano}</span>
          )}

          <span className="alterar-button" onClick={isEditingPlano ? handleSavePlano : handleEditPlano}>
            {isEditingPlano ? "Salvar" : "Alterar"}
          </span>
        </div>
      </div>

      <div className="precoM-planoM-containeMobile">
        <PrecoPlanoMobile plano={formData.plano} />
      </div>


      <label>Streaming Adicional:</label>
      <select value={formData.streaming} onChange={(e) => updateFormData({ streaming: e.target.value })}>
        <option value="">Nenhum</option>
        {streamingOptions.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>

      <label>Data de Vencimento:</label>
      <select className="custom-select" value={formData.vencimento} onChange={(e) => updateFormData({ vencimento: e.target.value })}>
        <option value="">Selecione</option>
        <option value="05">Dia 05</option>
        <option value="10">Dia 10</option>
        <option value="20">Dia 20</option>
      </select>

      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>
          Voltar
        </button>
        <button className="proximo-mobile" onClick={handleNext}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepPlanoMobile;
