const ViaCEPService = {
  buscarCepPorEndereco: async (uf, cidade, rua) => {
    if (!uf || !cidade || !rua) {
      console.error("Erro: UF, cidade ou rua inválidos na busca de CEP.");
      return Promise.resolve([]); // Retorna uma Promise vazia para evitar erro
    }

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      return [];
    }
  }
};

export default ViaCEPService;
