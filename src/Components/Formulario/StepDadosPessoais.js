import React, { useState, useEffect } from "react";

import "../../Styles/Formulario/Formulario.css";

const StepDadosPessoais = ({ nextStep, updateFormData, formData, isMobile }) => {

  const [cpfValido, setCpfValido] = useState(true); // Estado para validação do CPF
  const [formCompleto, setFormCompleto] = useState(false);
  const [rgValido, setRgValido] = useState(true);



  // Verifica se todos os campos estão preenchidos
  useEffect(() => {
    const camposPreenchidos =
      formData.nome?.trim() &&
      formData.cpf?.trim() &&
      formData.rg?.trim() &&
      formData.dataNascimento?.trim();

    setFormCompleto(Boolean(camposPreenchidos && cpfValido));
  }, [formData, cpfValido]);




  // 🔥 Função para formatar o CPF automaticamente
  const formatarCPF = (valor) => {
    let cpf = valor.replace(/\D/g, ""); // Remove tudo que não for número
    if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita a 11 dígitos

    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
  };

  const validarRG = (rg) => {
    if (!rg) return false;
  
    // Remove tudo que não for número ou 'X'
    const rgLimpo = rg.replace(/[^\dXx]/g, "").toUpperCase();
  
    // Tem que ter 9 dígitos
    if (rgLimpo.length !== 9) return false;
  
    const corpo = rgLimpo.slice(0, 8);
    const digito = rgLimpo.slice(8);
  
    let soma = 0;
    let peso = 2;
  
    for (let i = 7; i >= 0; i--) {
      soma += parseInt(corpo[i]) * peso;
      peso++;
    }
  
    let resto = soma % 11;
    let dvCalculado;
  
    if (resto === 10) {
      dvCalculado = 'X';
    } else if (resto === 11 || resto === 0) {
      dvCalculado = '0';
    } else {
      dvCalculado = String(resto);
    }
  
    return dvCalculado === digito;
  };
  
  



  // 🔥 Função para validar CPF (algoritmo oficial)
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove não números
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  };

  // 🔥 Quando o usuário digita, formata e valida o CPF
  const handleCPFChange = (e) => {
    const cpfFormatado = formatarCPF(e.target.value);
    const cpfEhValido = validarCPF(cpfFormatado);

    setCpfValido(cpfEhValido);
    updateFormData({ cpf: cpfFormatado });
  };

  const handleRGChange = (e) => {
    const valor = e.target.value;
    updateFormData({ rg: valor });
  
    // Valida em tempo real se o campo tiver 9 caracteres
    if (valor.replace(/[^\dXx]/g, "").length === 9) {
      setRgValido(validarRG(valor));
    } else {
      setRgValido(true); // evita erro enquanto digita
    }
  };









  return (
    <div className="step-container">
      <h2 className="titulo-confirmacao">Dados de Cadastro</h2>

      <label>Nome Completo *</label>
      <input
        type="text"
        value={formData.nome}
        onChange={(e) => updateFormData({ nome: e.target.value })}
        required
      />

      {/* Divisão dos campos CPF & RG e Data de Nascimento */}
      <div className={`input-duplo ${isMobile ? "coluna" : ""}`}>
        <div>
        <label>CPF *</label>
            <input
              type="text"
              value={formData.cpf}
              onChange={handleCPFChange}
              required
              placeholder="000.000.000-00"
              maxLength="14" // Limita a 14 caracteres por conta da formatação
              className={cpfValido ? "" : "input-invalido"} // 🔥 Adiciona classe se CPF for inválido
            />
      {!cpfValido && <span className="erro-cpf">CPF inválido!</span>} {/* Exibe erro */}
        </div>

      <div>
        <label>RG *</label>
        <input
          type="text"
          value={formData.rg}
          onChange={handleRGChange}
          required
          placeholder="0.000.000-XX"
          maxLength="12"
          className={rgValido ? "" : "input-invalido"}
        />
        {!rgValido && <span className="erro-rg">RG inválido!</span>}
      </div>

      </div>

      <div>
        <label>Data de Nascimento *</label>
        <input
          type="date"
          value={formData.dataNascimento}
          onChange={(e) => updateFormData({ dataNascimento: e.target.value })}
          required
        />
      </div>

      <div className="button-group">
      <button
          className={`botao-proximo ${formCompleto ? "botao-habilitado" : "botao-desabilitado"}`}
          onClick={nextStep}
          disabled={!formCompleto}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepDadosPessoais;
