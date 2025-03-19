import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Adiciona o suporte ao português
import "../../../Styles/Formulario/Mobile/StepDadosPessoaisMobile.css";

const StepDadosPessoaisMobile = ({ nextStep, updateFormData, formData }) => {
  const [maxDate, setMaxDate] = useState(dayjs().subtract(18, "year")); // Garante idade mínima de 18 anos
  const [isTextInput, setIsTextInput] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(formData.dataNascimento || "");
  const [cpfValido, setCpfValido] = useState(true); // Estado para validação do CPF

      useEffect(() => {
        // Define a data máxima para impedir usuários com menos de 18 anos
        setMaxDate(dayjs().subtract(18, "year"));
      }, []);

      const handleTextChange = (e) => {
        let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

        if (valor.length > 8) valor = valor.slice(0, 8); // Limita a 8 caracteres

        // Aplica a máscara automaticamente (DD/MM/AAAA)
        if (valor.length >= 2) valor = `${valor.slice(0, 2)}/${valor.slice(2)}`;
        if (valor.length >= 5) valor = `${valor.slice(0, 5)}/${valor.slice(5)}`;

        setDataNascimento(valor);
        updateFormData({ dataNascimento: valor });
      };

    // 🔥 Função para formatar o CPF automaticamente
    const formatarCPF = (valor) => {
      let cpf = valor.replace(/\D/g, ""); // Remove tudo que não for número
      if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita a 11 dígitos
  
      if (cpf.length <= 3) return cpf;
      if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
      if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
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


  return (
    <div className="step-container-mobile">
      <h2>Dados Pessoais</h2>

      <label>Nome Completo *</label>
      <input
        type="text"
        value={formData.nome}
        onChange={(e) => updateFormData({ nome: e.target.value })}
        required
      />

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

      <label>RG </label>
      <input
        type="text"
        value={formData.rg}
        onChange={(e) => updateFormData({ rg: e.target.value })}
        required
      />

      {/* 🔥 Alternar entre seleção e digitação manual */}
      <div className="data-nascimento-container">
        <label>Data de Nascimento</label>
        <span className="alternar-modo" onClick={() => setIsTextInput(!isTextInput)}>
          {isTextInput ? "Selecionar" : "Digitar"}
        </span>
      </div>

      {isTextInput ? (
        <input
          type="text"
          value={dataNascimento}
          onChange={handleTextChange}
          placeholder="DD/MM/AAAA"
          maxLength="10"
        />
      ) : (
        // 🔥 Usa o MUI DatePicker para melhor compatibilidade
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            value={dataNascimento ? dayjs(dataNascimento) : null}
            onChange={(date) => {
              const formattedDate = date ? date.format("YYYY-MM-DD") : "";
              setDataNascimento(formattedDate);
              updateFormData({ dataNascimento: formattedDate });
            }}
            format="DD/MM/YYYY"
            maxDate={maxDate} // Garante que usuários menores de 18 anos não possam selecionar
            slotProps={{ textField: { fullWidth: true, placeholder: "DD/MM/AAAA" } }}
          />
        </LocalizationProvider>
      )}

      <div className="button-group-mobile">
        <button className="proximo-mobile" onClick={nextStep}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepDadosPessoaisMobile;
