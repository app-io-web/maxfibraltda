import axios from 'axios';

const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

const getServicosAdicionais = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v2/tables/m6y3n25batwj4kk/records`, {
      headers: {
        'xc-token': API_TOKEN,
        'Content-Type': 'application/json',
      },
      params: {
        fields: 'Plano - Turbo - Serviço Adicional,Plano - Gold - Serviço Adicional,Plano - Infinity - Serviço Adicional',
        limit: 1,
      },
    });

    const data = response.data.list[0];

    return {
      turbo: data["Plano - Turbo - Serviço Adicional"]?.[0]?.Serviços || [],
      gold: data["Plano - Gold - Serviço Adicional"]?.[0]?.Serviços || [],
      infinity: data["Plano - Infinity - Serviço Adicional"]?.[0]?.Serviços || [],
    };
  } catch (error) {
    console.error('Erro ao buscar os serviços adicionais:', error);
    return { turbo: [], gold: [], infinity: [] };
  }
};

export default getServicosAdicionais;
