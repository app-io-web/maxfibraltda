import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../Assets/Lotties/SucesseendMensagem.json";
import errorAnimation from "../Assets/Lotties/errorSendMesagem.json";
import "../Styles/WhatsAppModal.css";
import { FaWhatsapp } from "react-icons/fa";
import { fetchWhatsAppNumber } from "../Services/whatsappService";
import { enviarMensagemWhatsApp } from "../Services/EnvioWhatsappOpa";

const WhatsAppModal = ({ isOpen, onClose }) => {
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
      nome: "",
      cpf: "",
      telefone: "",
      mensagem: "",
      departamento: ""
    });
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    
    useEffect(() => {
      const loadWhatsAppNumber = async () => {
        setLoading(true);
        const numero = await fetchWhatsAppNumber();
        if (numero) setWhatsappNumber(numero);
        setLoading(false);
      };
  
      if (isOpen) {
        loadWhatsAppNumber();
      }
    }, [isOpen]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSendMessage = async () => {
      try {
          const { nome, telefone, departamento, mensagem } = formData;
          if (!nome || !telefone || !departamento) {
              alert("Preencha todos os campos obrigatórios, incluindo o departamento");
              return;
          }
          const response = await enviarMensagemWhatsApp(nome, telefone, departamento, mensagem);
          if (response.success) {
              setSuccessModal(true);
          } else {
              setErrorModal(response.error || "Erro desconhecido.");
          }
      } catch (error) {
          setErrorModal(error.message || "Falha ao enviar mensagem.");
      }
    };

    const handleCloseSuccessModal = () => {
      setSuccessModal(false);
      onClose();
      const { nome, cpf, telefone, mensagem, departamento } = formData;
      const textoFormatado = `Nome: ${nome}%0A` +
                             `CPF: ${cpf}%0A` +
                             `Telefone: ${telefone}%0A%0A` +
                             `Mensagem: ${mensagem}%0A%0A` +
                             `Departamento: ${departamento}`;
      window.location.href = `https://wa.me/${whatsappNumber}?text=${textoFormatado}`;
    };
    
    const handleCloseErrorModal = () => {
      setErrorModal(false);
    };
  
    if (!isOpen) return null;
  
    return (
      <>
        <div className="whatsapp-modal-overlay" onClick={onClose}>
          <div className="whatsapp-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Abrir Atendimento</h3>
            {loading ? (
              <p>Buscando número do WhatsApp...</p>
            ) : (
              <>
                <label>Nome Completo</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite seu nome" />
    
                <label>CPF</label>
                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="Digite seu CPF" />
    
                <label>Telefone</label>
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu telefone" />
    
                <label>Departamento</label>
                <select name="departamento" value={formData.departamento} onChange={handleChange}>
                  <option value="" disabled>Selecione um departamento</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Suporte">Suporte</option>
                  <option value="Outros">Outros</option>
                </select>
    
                <label>Mensagem</label>
                <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} placeholder="Digite sua mensagem"></textarea>
    
                <button className="whatsapp-modal-button" onClick={handleSendMessage}>
                  <FaWhatsapp /> Enviar via WhatsApp
                </button>
              </>
            )}
            <button className="whatsapp-modal-close-btn" onClick={onClose}>Fechar</button>
          </div>
        </div>
        
        {/* Modal de Sucesso */}
        {successModal && (
          <div className="whatsapp-modal-overlay" onClick={handleCloseSuccessModal}>
            <div className="whatsapp-modal-content" onClick={(e) => e.stopPropagation()}>
              <Player autoplay loop src={successAnimation} style={{ height: "120px", width: "120px" }} />
              <h3>Mensagem enviada com sucesso!</h3>
              <p>Você será redirecionado para a conversa no WhatsApp.</p>
              <button className="whatsapp-modal-button" onClick={handleCloseSuccessModal}>Ok</button>
            </div>
          </div>
        )}
        
        {/* Modal de Erro */}
        {errorModal && (
          <div className="whatsapp-modal-overlay" onClick={handleCloseErrorModal}>
            <div className="whatsapp-modal-content" onClick={(e) => e.stopPropagation()}>
              <Player autoplay loop src={errorAnimation} style={{ height: "120px", width: "120px" }} />
              <h3>Erro ao enviar mensagem</h3>
              <p>{errorModal}</p>
              <button className="whatsapp-modal-close-btn" onClick={handleCloseErrorModal}>Fechar</button>
            </div>
          </div>
        )}
      </>
    );
};

export default WhatsAppModal;