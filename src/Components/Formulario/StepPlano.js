import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrecoPlano from "./PrecoPlano";
import StreamingService from "../../Services/StreamingService";
import VendedorService from "../../Services/VendedorService"; // Importa o service dos vendedores
import "../../Styles/Formulario/StepPlano.css";

const StepPlano = ({ nextStep, prevStep, updateFormData, formData }) => {
  const navigate = useNavigate();
  const [streamingOptions, setStreamingOptions] = useState([]);
  const [vendedores, setVendedores] = useState([]); // ✅ Estado para vendedores
  const [isEditingPlano, setIsEditingPlano] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState(formData.plano);

  useEffect(() => {
    // 🔥 Busca os serviços de streaming com base no plano escolhido
    const fetchStreamingOptions = async () => {
      if (formData.plano) {
        const services = await StreamingService.getStreamingByPlano(formData.plano);
        setStreamingOptions(services);
      }
    };

    // 🔥 Busca a lista de vendedores da API
    const fetchVendedores = async () => {
      const vendedoresList = await VendedorService.getVendedores();
      setVendedores(vendedoresList);
    };

    fetchStreamingOptions();
    fetchVendedores(); // ✅ Busca os vendedores na montagem do componente
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

    if (!formData.vendedor) {
      alert("Selecione um vendedor!");
      return;
    }

    console.log("🚀 Enviando dados para Cadastro:", formData);

    // Atualiza os dados antes de avançar
    updateFormData({
      vencimento: formData.vencimento,
      streaming: formData.streaming,
      vendedor: formData.vendedor,
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

      {/* ✅ Novo Select de Vendedor */}
      <label>Selecione um Vendedor:</label>
      <select
        value={formData.vendedor || ""}
        onChange={(e) => updateFormData({ vendedor: e.target.value })}
      >
        <option value="">Escolha um vendedor</option>
        {vendedores.map((vendedor, index) => (
          <option key={index} value={vendedor}>
            {vendedor}
          </option>
        ))}
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
