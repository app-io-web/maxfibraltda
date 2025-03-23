// src/Services/WebhookService.js

const WEBHOOK_URL = "https://webhook.nexusnerds.com.br/webhook/635756cb-c686-4c91-b5cb-4f0118d94379";

const WebhookService = {
  enviarParaWebhook: async (dados) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar para webhook: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("❌ WebhookService.erro:", error);
      throw error;
    }
  },
};

export default WebhookService;
