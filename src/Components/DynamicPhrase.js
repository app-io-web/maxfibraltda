import React, { useEffect, useState } from 'react';
import getDynamicPhrase from '../Services/ajustesService';
import '../Styles/DynamicPhrase.css';
import '../Styles/TextEffects.css'; // Importando os efeitos animados

function DynamicPhrase() {
  const [phrase, setPhrase] = useState(null);

  useEffect(() => {
    const fetchPhrase = async () => {
      const data = await getDynamicPhrase();
      if (data) {
        setPhrase(data);
      }
    };

    fetchPhrase();
  }, []);

  if (!phrase) return null; // Se não houver frase, não renderiza nada

  // Aplicando cor personalizada ao texto animado
  const customStyle = phrase.colorTextAnimado
    ? { color: phrase.colorTextAnimado }
    : {};

  // Para efeitos que animam letras individualmente
  const renderAnimatedText = (text, effect) => {
    return text.split("").map((char, index) => (
      <span key={index} className={`effect-${effect}`} style={customStyle}>
        {char}
      </span>
    ));
  };

  return (
    <h2 className="dynamic-phrase">
      {phrase.Part_Frase_Sem_Efeito}{" "}
      {phrase.Efeito === "jump" || phrase.Efeito === "spin"
        ? <span className={`effect-${phrase.Efeito}`} style={customStyle}>
            {renderAnimatedText(phrase.Part_Frase_Com_Efeito, phrase.Efeito)}
          </span>
        : <span className={`effect-${phrase.Efeito}`} style={customStyle}>
            {phrase.Part_Frase_Com_Efeito}
          </span>}
    </h2>
  );
}

export default DynamicPhrase;
