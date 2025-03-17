import React from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import "../../Styles/Formulario/Stepper.css";

const Stepper = ({ step }) => {
  const steps = [
    { title: "Dados Pessoais", icon: <FaUser /> },
    { title: "Contato", icon: <FaEnvelope /> },
    { title: "Endereço", icon: <FaMapMarkerAlt /> },
    { title: "Plano", icon: <FaClipboardList /> },
    { title: "Confirmação", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="stepper-container">
      {steps.map((item, index) => (
        <div key={index} className={`step-item ${step === index + 1 ? "active" : ""}`}>
          <div className="step-icon">{item.icon}</div>
          {step === index + 1 && <span className="step-title">{item.title}</span>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;