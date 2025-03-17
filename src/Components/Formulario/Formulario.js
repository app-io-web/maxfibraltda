import React, { useState } from "react";
import "../../Styles/Formulario/Formulario.css";
import Stepper from "./Stepper";
import StepDadosPessoais from "./StepDadosPessoais";
import StepContato from "./StepContato";
import StepEndereco from "./StepEndereco";
import StepPlano from "./StepPlano";
import StepConfirmacao from "./StepConfirmacao";

const Formulario = ({ setPlanoSelecionado, setStreamingSelecionado }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "", cpf: "", rg: "", dataNascimento: "",
    email: "", telefone1: "", telefone2: "",
    cidade: "", bairro: "", endereco: "", cep: "", numero: "", complemento: "", latitude: "", longitude: "",
    plano: "Gold", streaming: "", vencimento: "",
  });

  const precosPlanos = {
    "Gold": "R$ 129,90 / mês",
    "Infinity": "R$ 169,90 / mês",
    "Turbo": "R$ 99,90 / mês",
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });

    // Atualiza o plano dinamicamente no componente pai
    if (newData.plano !== undefined) {
      setPlanoSelecionado(newData.plano);
    }

    // Atualiza o streaming dinamicamente no componente pai
    if (newData.streaming !== undefined) {
      setStreamingSelecionado(newData.streaming);
    }
  };

  return (
    <div className="container">
      {/* Formulário */}
      <div className="formulario-container">
        <Stepper step={step} />
        {step === 1 && <StepDadosPessoais nextStep={nextStep} updateFormData={updateFormData} formData={formData} />}
        {step === 2 && <StepContato nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
        {step === 3 && <StepEndereco nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
        {step === 4 && <StepPlano nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
        {step === 5 && <StepConfirmacao prevStep={prevStep} formData={formData} />}
      </div>
    </div>
  );
};

export default Formulario;
