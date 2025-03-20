import React, { useState, useEffect } from "react";
import "../../../Styles/Formulario/Mobile/StepEnderecoMobile.css";
import SolicitarLocalizacaoModal from "../../Formulario/SolicitarLocalizacaoModal";
import GooglePlacesService from "../../../Services/GooglePlacesService";
import ViaCEPService from "../../../Services/ViaCEPService";

const StepEnderecoMobile = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cepsDisponiveis, setCepsDisponiveis] = useState([]);

  useEffect(() => {
    const localizacaoAceita = localStorage.getItem("localizacaoAceita");

    if (localizacaoAceita === "true") {
      solicitarLocalizacao();
    } else {
      setShowModal(true);
    }
  }, []);

  const handleCepChange = (e) => {
    const cepSelecionado = e.target.value;
  
    // 🔥 Encontra o objeto do CEP selecionado na lista de CEPs disponíveis
    const cepData = cepsDisponiveis.find((cep) => cep.cep === cepSelecionado);
  
    if (cepData) {
      updateFormData({
        cep: cepData.cep,
        bairro: cepData.bairro, // 🔥 Atualiza o bairro automaticamente
      });
    }
  };
  

  useEffect(() => {
    const autocompleteInstance = GooglePlacesService.carregarGoogleAutocomplete(
      "autocomplete",
      (instance) => {
        GooglePlacesService.preencherEndereco(
          instance,
          (novoEndereco) => {
            updateFormData(novoEndereco); // 🔥 Atualiza todos os campos
          },
          (uf, cidade, rua) => {
            return ViaCEPService.buscarCepPorEndereco(uf, cidade, rua)
              .then((ceps) => {
                console.log("CEPs encontrados:", ceps);
                setCepsDisponiveis(ceps);
              })
              .catch((error) => console.error("Erro ao definir CEPs:", error));
          }
        );
      }
    );
  }, []);

  // 🔥 Sempre que a lista de CEPs mudar, preenche automaticamente se houver apenas um
  useEffect(() => {
    if (cepsDisponiveis.length === 1) {
      updateFormData({ cep: cepsDisponiveis[0].cep });
    }
  }, [cepsDisponiveis]);

  const solicitarLocalizacao = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateFormData({ latitude, longitude });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          updateFormData({ latitude: "Não informada", longitude: "Não informada" });
        }
      );
    } else {
      updateFormData({ latitude: "Não disponível", longitude: "Não disponível" });
    }
  };

  const handleConfirmLocation = () => {
    setShowModal(false);
    localStorage.setItem("localizacaoAceita", "true");

    setTimeout(() => {
      solicitarLocalizacao();
    }, 500);
  };

  const handleCancelLocation = () => {
    setShowModal(false);
    localStorage.setItem("localizacaoAceita", "false");
  };

  return (
    <div className="step-container-mobile">
      {showModal && <SolicitarLocalizacaoModal onConfirm={handleConfirmLocation} onCancel={handleCancelLocation} />}

      <h2>Endereço</h2>

      <div>
        <label>Digite Seu Endereço</label>
        <input
          type="text"
          id="autocomplete"
          value={formData.rua || ""}
          onChange={(e) => updateFormData({ rua: e.target.value })}
          required
        />
      </div>

      {/* 🔥 Dropdown só aparece se houver mais de um CEP disponível */}
      {cepsDisponiveis.length > 1 && (
        <div className="cep-sugestoes">
          <label>Selecione um CEP disponível:</label>
          <select 
              value={formData.cep || ""}
              onChange={handleCepChange} // 🔥 Agora o bairro será atualizado junto com o CEP
            >
              <option value="">Escolha um CEP</option>
              {cepsDisponiveis.map((cepData, index) => (
                <option key={index} value={cepData.cep}>
                  {cepData.cep} - {cepData.logradouro}, {cepData.bairro}
                </option>
              ))}
            </select>

        </div>
      )}

      <label>Bairro *</label>
      <input
        type="text"
        value={formData.bairro || ""}
        onChange={(e) => updateFormData({ bairro: e.target.value })}
        required
      />

      <div className="input-duplo">
        <div>
          <label>CEP *</label>
          <input
            type="text"
            value={formData.cep || ""}
            onChange={(e) => updateFormData({ cep: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Cidade *</label>
          <input
            type="text"
            value={formData.cidade || ""}
            onChange={(e) => updateFormData({ cidade: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="input-duplo">
        <div>
          <label>Número *</label>
          <input
            type="text"
            value={formData.numero || ""}
            onChange={(e) => updateFormData({ numero: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Complemento</label>
          <input
            type="text"
            value={formData.complemento || ""}
            onChange={(e) => updateFormData({ complemento: e.target.value })}
          />
        </div>
      </div>

      {/* 🔥 Campos ocultos para armazenar Latitude e Longitude */}
      <input type="hidden" value={formData.latitude || ""} />
      <input type="hidden" value={formData.longitude || ""} />

      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
        <button className="proximo-mobile" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default StepEnderecoMobile;
