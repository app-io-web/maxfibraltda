import React from "react";

const precosPlanos = {
  "Gold": "R$ 129,90 / mês",
  "Infinity": "R$ 169,90 / mês",
  "Turbo": "R$ 99,90 / mês",
  "Startup Company": "R$ 199,90 / mês",
  "Medium Company": "R$ 299,90 / mês",
  "Big Company": "R$ 399,90 / mês"
};

const PrecoPlanoMobile = ({ plano }) => {
  const preco = precosPlanos[plano] || "Não disponível";

  return (
    <div className="plano-preco">
      <span>Total: </span>
      <span className="preco">{preco}</span>
    </div>
  );
};

export default PrecoPlanoMobile;
