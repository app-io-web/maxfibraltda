import axios from "axios";

const API_URL = "https://api.opasuite.nexusnerds.com.br/send-whatsapp"; // Altere para a URL do servidor em produção

export const enviarMensagemWhatsApp = async (nome, telefone, departamento) => {
    try {
        //console.log("Dados enviados para o servidor:", { nome, telefone, departamento }); // 👀 LOG PARA DEBUG

        const response = await axios.post(API_URL, {
            nome,
            telefone,
            departamento
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao enviar mensagem pelo WhatsApp:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.error || "Falha ao enviar mensagem");
    }
};
