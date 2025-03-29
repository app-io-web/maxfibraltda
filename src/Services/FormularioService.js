const API_URL = "https://max.api.email.nexusnerds.com.br/enviar-formulario";

const FormularioService = {
  enviarFormulario: async (formData) => {
    try {
      const isEmpresa = formData.tipoDocumento === "CNPJ";

      const dadosCorrigidos = {
        nome: formData.nome,
        cpf: formData.cpf,
        rg: formData.rg?.trim() || "Não informado",
        dataNascimento: formData.dataNascimento?.trim() || "Não informado",
        telefone1: formData.telefone1?.trim() || "N/A",
        telefone2: formData.telefone2?.trim() || "",
        telefone3: formData.telefone3?.trim() || "",
        email: formData.email,
        cidade: formData.cidade,
        bairro: formData.bairro,
        rua: formData.rua?.trim() || formData.endereco?.trim() || "N/A",
        endereco: formData.endereco?.trim() || formData.rua?.trim() || "N/A",
        numero: formData.numero?.trim() || "N/A",
        cep: formData.cep,
        complemento: formData.complemento || "",
        latitude: formData.latitude ? String(formData.latitude) : "",
        longitude: formData.longitude ? String(formData.longitude) : "",
        vendedor: formData.vendedor || "Não informado",
        plano: formData.plano,
        streaming: formData.streaming || "Nenhum",
        vencimento: formData.vencimento,
        vendedorEmail: formData.vendedorEmail || "Não informado",
      
        // ✅ Campos fixos
        tipoDocumento: formData.tipoDocumento || "CPF",
        isEmpresa: isEmpresa,
      };
      
      // ✅ Se for empresa, adiciona campos exclusivos
      if (isEmpresa) {
        dadosCorrigidos.ie = formData.ie || "Não informado";
        dadosCorrigidos.nomeFantasia = formData.nomeFantasia || "Não informado";
        dadosCorrigidos.responsavel = formData.responsavel || "Não informado";
        dadosCorrigidos.cpfResponsavel = formData.cpfResponsavel || "Não informado";
        dadosCorrigidos.dataNascimentoResponsavel = formData.dataNascimentoResponsavel || "Não informado";
        dadosCorrigidos.dataAberturaEmpresa = formData.dataAberturaEmpresa || "Não informada";
      }

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
