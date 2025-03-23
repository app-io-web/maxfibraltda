import React, { useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import "../../Styles/Formulario/StepConfirmacao.css";
import "../../Styles/Formulario/StepConfirmacaoEstilizado.css";
import FormularioService from "../../Services/FormularioService"; // 🔥 Importa o service
import ModalConfirmacao from "./ModalConfirmacao"; // ajuste o caminho se necessário
import WebhookService from "../../Services/WebhookService"; // 👈 novo service


const StepConfirmacao = ({ prevStep, formData }) => {
  const [loading, setLoading] = useState(false); // 🔥 Estado de loading
  const [activeCard, setActiveCard] = useState("dadosPessoais");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [protocoloGerado, setProtocoloGerado] = useState("");

  const toggleCard = (card) => {
    setActiveCard(activeCard === card ? "" : card);
  };



  const handleSubmit = async () => {
    setLoading(true);

    // 🚀 Garante que o email do vendedor também seja enviado
    if (!formData.vendedor || !formData.vendedorEmail) {
      alert("Erro: O vendedor e o e-mail do vendedor são obrigatórios!");
      setLoading(false);
      return;
    }

    // 🚀 Corrige e garante que os campos essenciais estão preenchidos corretamente
    const dadosCorrigidos = {
      ...formData,
      endereco: formData.endereco?.trim() || formData.rua?.trim() || "", // Se rua estiver vazia, evitar erro
      rua: formData.rua?.trim() || formData.endereco?.trim() || "", // Garante que rua sempre tenha valor
      telefone1: formData.telefone1?.trim() || "N/A", // Evita undefined ou string vazia
      telefone3: formData.telefone3?.trim() || "", // Garante que telefone3 seja enviado, mesmo se vazio
      latitude: formData.latitude ? String(formData.latitude) : "", // Converte para string se existir
      longitude: formData.longitude ? String(formData.longitude) : "", // Converte para string se existir
      vendedorEmail: formData.vendedorEmail, // ✅ Inclui o e-mail do vendedor
    };

    // 🔍 Remove espaços extras dos campos string
    Object.keys(dadosCorrigidos).forEach((key) => {
      if (typeof dadosCorrigidos[key] === "string") {
        dadosCorrigidos[key] = dadosCorrigidos[key].trim();
      }
    });

    // 🔍 Depuração: Verifica os dados antes de enviar
    //console.log("📤 Dados corrigidos enviados:", JSON.stringify(dadosCorrigidos, null, 2));

    // 🚨 Verificação de campos obrigatórios
    const camposObrigatorios = ["nome", "cpf", "telefone1", "email", "cidade", "bairro", "rua", "cep", "numero", "vendedor", "vendedorEmail"];
    const camposFaltando = camposObrigatorios.filter((campo) => !dadosCorrigidos[campo]);

    if (camposFaltando.length > 0) {
      console.error("❌ Campos obrigatórios ausentes:", camposFaltando);
      alert(`⚠️ Os seguintes campos estão vazios e são obrigatórios:\n\n${camposFaltando.join("\n")}`);
      setLoading(false);
      return;
    }

    try {
      const response = await FormularioService.enviarFormulario(dadosCorrigidos);

  // ✅ Envia para o webhook do n8n
   await WebhookService.enviarParaWebhook(dadosCorrigidos);



    // ✅ Em vez de alert, exibe o modal
    setProtocoloGerado(response.protocolo);
    setMostrarModal(true);

    } catch (error) {
      console.error("❌ Erro ao enviar formulário:", error);
      alert("❌ Erro ao enviar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="step-container">
      <h2 className="titulo-confirmacao">
        <FaCheckCircle /> Confirmação do Cadastro
      </h2>

      <div className="cards-container">
        {/* Card 1 - Dados Pessoais */}
        <div className={`confirmacao-card ${activeCard === "dadosPessoais" ? "ativo" : ""}`} onClick={() => toggleCard("dadosPessoais")}>
          <h3><FaUser /> Dados Pessoais</h3>
          {activeCard === "dadosPessoais" && (
            <div className="conteudo-card">
              <p><strong>Nome:</strong> {formData.nome}</p>
              <p><strong>CPF:</strong> {formData.cpf}</p>
              <p><strong>RG:</strong> {formData.rg}</p>
              <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
            </div>
          )}
        </div>

        {/* Card 2 - Contato */}
        <div className={`confirmacao-card ${activeCard === "contato" ? "ativo" : ""}`} onClick={() => toggleCard("contato")}>
          <h3><FaEnvelope /> Contato</h3>
          {activeCard === "contato" && (
            <div className="conteudo-card">
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Telefone 1:</strong> {formData.telefone1}</p>
              <p><strong>Telefone 2:</strong> {formData.telefone2}</p>
              {/* 🔥 Telefone 3 só aparece se estiver preenchido */}
              {formData.telefone3 && <p><strong>Telefone 3:</strong> {formData.telefone3}</p>}
            </div>
          )}
        </div>

        {/* Card 3 - Endereço */}
        <div className={`confirmacao-card ${activeCard === "endereco" ? "ativo" : ""}`} onClick={() => toggleCard("endereco")}>
          <h3><FaMapMarkerAlt /> Endereço</h3>
          {activeCard === "endereco" && (
            <div className="conteudo-card">
              <p><strong>Cidade:</strong> {formData.cidade}</p>
              <p><strong>CEP:</strong> {formData.cep}</p>
              <p><strong>Bairro:</strong> {formData.bairro}</p>
              <p><strong>Rua:</strong> {formData.rua}, Nº {formData.numero}</p>
              <p><strong>Pto Referencia:</strong> {formData.complemento || "Não informado"}</p>
              
              {/* 🔥 Adiciona link para Google Maps caso latitude e longitude existam */}
              {formData.latitude && formData.longitude && (
                <p>
                  <strong>📍 Localização no Google Maps:</strong><br />
                  <a 
                    href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}
                  >
                    🌍 Ver no Google Maps
                  </a>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Card 4 - Plano Escolhido */}
        <div className={`confirmacao-card ${activeCard === "plano" ? "ativo" : ""}`} onClick={() => toggleCard("plano")}>
          <h3><FaCheckCircle /> Plano Escolhido</h3>
          {activeCard === "plano" && (
            <div className="conteudo-card">
              <p><strong>Plano:</strong> {formData.plano}</p>
              <p><strong>Serviço Adicional:</strong> {formData.streaming || "Nenhum"}</p>
              <p><strong>Data de Vencimento:</strong> {formData.vencimento}</p>
              <p><strong>Vendedor:</strong> {formData.vendedor}</p>
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        <button className="botao-voltar" onClick={prevStep}>Voltar</button>
        <button 
          className="finalizar-mobile" 
          onClick={handleSubmit} 
          disabled={loading} // 🔥 Desativa botão enquanto está carregando
        >
          {loading ? "Enviando..." : "Finalizar Cadastro"}
        </button>
      </div>
      {mostrarModal && (
      <ModalConfirmacao
        protocolo={protocoloGerado}
        onClose={() => setMostrarModal(false)}
      />
    )}
    </div>
  );
};

export default StepConfirmacao;
