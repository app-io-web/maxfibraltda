import React from "react";
import "../../Styles/Formulario/ModalConfirmacao.css"; // crie esse CSS ou ajuste conforme seu estilo

const ModalConfirmacao = ({ protocolo, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>✅ Cadastro Feito com Sucesso!</h2>
        <p>📌 <strong>Protocolo:</strong> {protocolo}</p>
        <button onClick={onClose} className="btn-fechar">OK</button>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
