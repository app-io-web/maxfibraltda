import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrecoPlanoMobile from "./PrecoPlanoMobile";
import "../../../Styles/Formulario/Mobile/StepPlanoMobile.css";
import StreamingService from "../../../Services/StreamingService";

const StepPlanoMobile = ({ nextStep, prevStep, updateFormData, formData }) => {
  const navigate = useNavigate();
  const [streamingOptions, setStreamingOptions] = useState([]);

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
      streaming: formData.streaming 
    });
  
    // **AVANÇA PARA O PRÓXIMO STEP**
    nextStep();
  };
  
  

  return (
    <div className="step-container-mobile">
      <h2 className="titulo-confirmacao" >Plano Escolhido</h2>

      <label>Plano Selecionado:</label>
      <input type="text" value={formData.plano} readOnly />

      <PrecoPlanoMobile plano={formData.plano} />

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
            className="custom-select" 
            value={formData.vencimento} 
            onChange={(e) => updateFormData({ vencimento: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="05">Dia 05</option>
            <option value="10">Dia 10</option>
            <option value="20">Dia 20</option>
          </select>


      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button className="proximo-mobile" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepPlanoMobile;
