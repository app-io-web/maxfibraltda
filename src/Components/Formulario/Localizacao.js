import React, { useState, useEffect } from "react";
import "../../Styles/Formulario/Localizacao.css";

const Localizacao = ({ setLocalizacao }) => {
  const [localizacao, setLocal] = useState("Obtendo localização...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
          setLocal(loc);
          setLocalizacao(loc);
        },
        () => {
          setLocal("Permissão negada ou erro ao obter localização.");
          setLocalizacao("Permissão negada ou erro ao obter localização.");
        }
      );
    } else {
      setLocal("Geolocalização não suportada pelo navegador.");
      setLocalizacao("Geolocalização não suportada pelo navegador.");
    }
  }, [setLocalizacao]);

  return (
    <div className="localizacao-container">
      <label>Localização:</label>
      <input type="text" value={localizacao} readOnly />
    </div>
  );
};

export default Localizacao;
