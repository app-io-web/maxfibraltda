import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Formulario from "../Components/Formulario/Formulario";
import InformacoesPlano from "../Components/Formulario/InformacoesPlano";
import "../Styles/Cadastro.css";

const Cadastro = () => {
  const location = useLocation();

  console.log("🚀 ~ Cadastro -> location.state", location.state); // Depuração para verificar os valores recebidos

  const [planoSelecionado, setPlanoSelecionado] = useState(location.state?.plano || "Gold");
  const [streamingSelecionado, setStreamingSelecionado] = useState(location.state?.streaming || "Deezer");
  const [vencimentoSelecionado, setVencimentoSelecionado] = useState(location.state?.vencimento || "05");


  return (
    <div className="cadastro-container">
      <InformacoesPlano 
        plano={planoSelecionado} 
        streaming={streamingSelecionado} 
        vencimento={vencimentoSelecionado} 
      />
      <Formulario 
        setPlanoSelecionado={setPlanoSelecionado} 
        setStreamingSelecionado={setStreamingSelecionado} 
        setVencimentoSelecionado={setVencimentoSelecionado}
      />
    </div>
  );
};

export default Cadastro;
