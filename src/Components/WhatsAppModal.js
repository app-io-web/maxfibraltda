import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../Assets/Lotties/SucesseendMensagem.json";
import errorAnimation from "../Assets/Lotties/errorSendMesagem.json";
import "../Styles/WhatsAppModal.css";
import { FaWhatsapp } from "react-icons/fa";
import { fetchWhatsAppNumber } from "../Services/whatsappService";
import { enviarMensagemWhatsApp } from "../Services/EnvioWhatsappOpa";
import { enviarEmailAtendimento } from "../Services/emailService"; // Importando o novo service de e-mail

const WhatsAppModal = ({ isOpen, onClose }) => {
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [loading, setLoading] = useState(false); // 🔹 Estado para controlar o loading
    const [protocolo, setProtocolo] = useState(""); // Novo estado para armazenar o protocolo
    const [formData, setFormData] = useState({
      nome: "",
      cpf: "",
      telefone: "",
      email: "", // Novo campo de e-mail
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
          
          // 🔹 Resetando o formulário ao abrir o modal
          setFormData({
              nome: "",
              cpf: "",
              telefone: "",
              email: "",
              mensagem: "",
              departamento: ""
          });
      }
  }, [isOpen]); // 🔹 O modal será resetado sempre que `isOpen` mudar
  

  const handleCloseModal = () => {
    setFormData({
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        mensagem: "",
        departamento: ""
    });
    onClose();
};


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: name === "cpf" ? formatarCpfCnpj(value) : 
                  name === "telefone" ? formatPhoneNumber(value) : value,
      });
    };

    // 🔹 Função para formatar CPF ou CNPJ automaticamente
    const formatarCpfCnpj = (valor) => {
      valor = valor.replace(/\D/g, ""); // Remove tudo que não for número

      if (valor.length <= 11) {
          // Formatar como CPF: XXX.XXX.XXX-XX
          valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
          valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
          valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
          // Formatar como CNPJ: XX.XXX.XXX/XXXX-XX
          valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
          valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
          valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
          valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
      }

      return valor;
    };

    // Formatar telefone (XX) XXXXX-XXXX dinamicamente
    const formatPhoneNumber = (value) => {
        value = value.replace(/\D/g, ""); // Remove tudo que não for número
        value = value.substring(0, 11); // Limita a 11 dígitos

        if (value.length > 2) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 10) {
            value = `${value.substring(0, 10)}-${value.substring(10)}`;
        }
        return value;
    };

  




    const handleSendMessage = async () => {
      try {
          setLoading(true); // 🔹 Bloqueia o botão e ativa o loading
  
          const { nome, cpf, telefone, email, departamento, mensagem } = formData;
  
          if (!nome || !telefone || !departamento || !email) {
              alert("Preencha todos os campos obrigatórios, incluindo o e-mail e o departamento.");
              setLoading(false); // 🔹 Desbloqueia o botão em caso de erro
              return;
          }
  
          // Enviar mensagem via WhatsApp
          const response = await enviarMensagemWhatsApp(nome, telefone, departamento, mensagem);
          
          if (response.success) {
              // Enviar e-mail com os detalhes do atendimento
              const emailResponse = await enviarEmailAtendimento(nome, cpf, telefone, email, departamento, mensagem);
  
              console.log("Resposta da API de e-mail:", emailResponse);
  
              if (emailResponse.message && emailResponse.message.includes("sucesso")) {
                  setProtocolo(emailResponse.protocolo); // Salva o protocolo retornado pela API
                  setSuccessModal(true); // 🔹 Exibe o modal de sucesso sem fechar o modal do formulário
              } else {
                  setErrorModal("Erro ao enviar e-mail.");
              }
          } else {
              setErrorModal(response.error || "Erro ao enviar mensagem.");
          }
      } catch (error) {
          setErrorModal(error.message || "Falha ao processar o atendimento.");
      } finally {
          setLoading(false); // 🔹 Sempre desbloqueia o botão após o envio
      }
  };
  
  

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    onClose();
    const { nome, cpf, telefone, email, mensagem, departamento } = formData;

    const textoFormatado = `*Protocolo:* ${protocolo}%0A%0A` +  // Adiciona o protocolo
                           `*Nome:* ${nome}%0A` +
                           `*CPF:* ${cpf}%0A` +
                           `*Telefone:* +55 ${telefone}%0A` +
                           `*E-mail:* ${email}%0A%0A` +
                           `*Departamento:* ${departamento}%0A` +
                           `*Mensagem:* ${mensagem}`;

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
                <div className="custom-loader-container">
                <div className="custom-loader">
                    <div className="custom-orbe" style={{ "--index": 0 }}></div>
                    <div className="custom-orbe" style={{ "--index": 1 }}></div>
                    <div className="custom-orbe" style={{ "--index": 2 }}></div>
                    <div className="custom-orbe" style={{ "--index": 3 }}></div>
                    <div className="custom-orbe" style={{ "--index": 4 }}></div>
                </div>
            </div>
            ) : (
              <>
                <label>Nome Completo</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite seu nome" />
    
                <label>CPF / CNPJ</label>
                <input 
                    type="text" 
                    name="cpf" 
                    value={formData.cpf} 
                    onChange={handleChange} 
                    placeholder="Digite seu CPF ou CNPJ" 
                    maxLength="18" // Limite máximo de caracteres para CNPJ formatado
                />

                <label>Telefone</label>
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Digite seu telefone" maxLength="15" />

                <label>E-mail</label> {/* Novo campo de e-mail */}
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" />
    
                <label>Departamento</label>
                <select name="departamento" value={formData.departamento} onChange={handleChange}>
                  <option value="" disabled>Selecione um departamento</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Suporte">Suporte</option>
                  <option value="Outros">Outros</option>
                </select>
    
                <label>Mensagem</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Digite sua mensagem"
                    maxLength={150} // 🔹 Limita a 150 caracteres
                  ></textarea>
                  <small>{formData.mensagem.length}/150 caracteres</small> {/* 🔹 Exibe o contador */}

                <button 
                    className="whatsapp-modal-button" 
                    onClick={handleSendMessage} 
                    disabled={loading} // 🔹 Botão desativado enquanto carrega
                >
                    {loading ? (
                        <div className="loading-spinner"></div> // 🔹 Exibe o loading
                    ) : (
                        <>
                            <FaWhatsapp /> Abrir Atendimento
                        </>
                    )}
                </button>

              </>
            )}
            <button className="whatsapp-modal-close-btn" onClick={handleCloseModal}>Fechar</button>

          </div>
        </div>
        
        {/* Modal de Sucesso */}
        {successModal && (
          <div className="whatsapp-modal-overlay" onClick={handleCloseSuccessModal}>
            <div className="whatsapp-modal-content" onClick={(e) => e.stopPropagation()}>
              <Player autoplay loop src={successAnimation} style={{ height: "120px", width: "120px" }} />
              <h3>Mensagem enviada com sucesso!</h3>
              <p>Você será redirecionado para o WhatsApp e receberá um e-mail com os detalhes do atendimento.</p>
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
