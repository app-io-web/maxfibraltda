import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrecoPlano from "./PrecoPlano";
import StreamingService from "../../Services/StreamingService";
import "../../Styles/Formulario/StepPlano.css";


const StepPlano = ({ nextStep, prevStep, updateFormData, formData }) => {
  const navigate = useNavigate();
  const [streamingOptions, setStreamingOptions] = useState([]);
  const [isEditingPlano, setIsEditingPlano] = useState(false); // Estado para ativar edição
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

    // Atualiza os dados antes de avançar
    updateFormData({
      vencimento: formData.vencimento,
      streaming: formData.streaming,
    });

    // **AVANÇA PARA O PRÓXIMO STEP**
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
    <div className="step-container">
      <h2 className="titulo-confirmacao">Plano Escolhido</h2>

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
        <div className="precoD-planoD-containeMobile">
            <PrecoPlano plano={formData.plano} />
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
      <select
        value={formData.vencimento || ""}
        onChange={(e) => {
          updateFormData({ vencimento: e.target.value });
        }}
      >
        <option value="">Selecione</option>
        <option value="05">Dia 05</option>
        <option value="10">Dia 10</option>
        <option value="20">Dia 20</option>
      </select>

      <div className="button-group">
        <button className="voltar" onClick={prevStep}>
          Voltar
        </button>
        <button className="proximo" onClick={handleNext}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepPlano;
