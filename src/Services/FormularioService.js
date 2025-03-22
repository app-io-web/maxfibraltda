const API_URL = "https://max.api.email.nexusnerds.com.br/enviar-formulario";

const FormularioService = {
  enviarFormulario: async (formData) => {
    try {
      // 🔥 Ajustando os dados antes de enviar
      const dadosCorrigidos = {
        nome: formData.nome,
        cpf: formData.cpf,
        rg: formData.rg?.trim() || "Não informado", // 🔥 Garante que RG seja enviado
        dataNascimento: formData.dataNascimento?.trim() || "Não informado", // 🔥 Evita erro caso esteja vazio
        telefone1: formData.telefone1?.trim() || "N/A", // 🔥 Evita undefined
        telefone2: formData.telefone2?.trim() || "",
        telefone3: formData.telefone3?.trim() || "",
        email: formData.email,
        cidade: formData.cidade,
        bairro: formData.bairro,
        rua: formData.rua?.trim() || formData.endereco?.trim() || "N/A", // 🔥 Garante que rua tenha valor
        endereco: formData.endereco?.trim() || formData.rua?.trim() || "N/A",
        numero: formData.numero?.trim() || "N/A",
        cep: formData.cep,
        complemento: formData.complemento || "",
        latitude: formData.latitude ? String(formData.latitude) : "",
        longitude: formData.longitude ? String(formData.longitude) : "",
        vendedor: formData.vendedor || "Não informado", // 🔥 Evita erro se estiver vazio
        plano: formData.plano,
        streaming: formData.streaming || "Nenhum",
        vencimento: formData.vencimento,
        vendedorEmail: formData.vendedorEmail || "Não informado",
      };

      // 🔍 Log dos dados antes do envio
      //console.log("📤 Enviando para API:", JSON.stringify(dadosCorrigidos, null, 2));

      // 🔥 Fazendo a requisição
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCorrigidos),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erro ao enviar formulário:", errorData);
        throw new Error(`Erro ao enviar formulário: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Erro no envio do formulário:", error);
      throw error;
    }
  },
};

export default FormularioService;
