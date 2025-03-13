import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const BeneficioCard = ({ animation, title, description }) => {
  return (
    <div className="beneficio-card">
      <Player autoplay loop src={animation} style={{ height: "100px", width: "100px" }} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default BeneficioCard;
