import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from '../Components/Header';
import MobileHeader from '../Components/Mobile/MobileHeader';
import Formulario from "../Components/Formulario/Formulario";
import FormularioMobile from "../Components/Formulario/Mobile/FormularioMobile"; 
import InformacoesPlano from "../Components/Formulario/InformacoesPlano";
import InformacoesPlanoMobile from "../Components/Formulario/Mobile/InformacoesPlanoMobile"; 
import "../Styles/Cadastro.css";

const Cadastro = () => {
  const location = useLocation();

  console.log("🚀 ~ Cadastro -> location.state", location.state);

  const [planoSelecionado, setPlanoSelecionado] = useState(location.state?.plano || "Gold");
  const [streamingSelecionado, setStreamingSelecionado] = useState(location.state?.streaming || "");
  const [vencimentoSelecionado, setVencimentoSelecionado] = useState(location.state?.vencimento || "");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Adicionando Header Desktop e Mobile */}
      {!isMobile ? <Header /> : <MobileHeader />}
  
      <div className={isMobile ? "cadastro-container-mobile" : "cadastro-container"}>
        {/* Versão Desktop */}
        {!isMobile && (
          <>
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
          </>
        )}
  
        {/* Versão Mobile */}
        {isMobile && (
          <div className="cadastro-mobile-wrapper">
            <InformacoesPlanoMobile 
              plano={planoSelecionado} 
              streaming={streamingSelecionado} 
              vencimento={vencimentoSelecionado} 
            />
            <FormularioMobile
              setPlanoSelecionado={setPlanoSelecionado} 
              setStreamingSelecionado={setStreamingSelecionado} 
              setVencimentoSelecionado={setVencimentoSelecionado}
            />
          </div>
        )}
      </div>
    </>
  );
  
};

export default Cadastro;
