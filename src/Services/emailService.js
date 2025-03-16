import axios from "axios";

export const enviarEmailAtendimento = async (nome, cpf, telefone, email, departamento, mensagem) => {
    try {
        const response = await axios.post("https://max.api.email.nexusnerds.com.br/send-email", {
            nome,
            cpf,
            telefone,
            email,
            departamento,
            mensagem
        });

        console.log("Resposta da API de e-mail:", response.data); // <-- Adicionado log para debug
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error.response ? error.response.data : error.message);
        return { success: false, error: error.message || "Erro desconhecido ao enviar e-mail" };
    }
};
