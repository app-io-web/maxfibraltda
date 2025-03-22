import { useEffect, useState } from "react";
import "../../Styles/Formulario/StepContato.css"; // Adicione estilos conforme necessário

const StepContato = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [telefonesIguais, setTelefonesIguais] = useState(false);
  const [mostrarTelefone3, setMostrarTelefone3] = useState(false); // 🔥 Controla a exibição do Telefone 
  const [telefonesValidos, setTelefonesValidos] = useState(false);

  useEffect(() => {
    const isEmailValido = (email) => /\S+@\S+\.\S+/.test(email);
    const limparNumero = (num) => num?.replace(/\D/g, "");
  
    const emailOk = isEmailValido(formData.email);
    const t1 = limparNumero(formData.telefone1);
    const t2 = limparNumero(formData.telefone2);
    const t3 = limparNumero(formData.telefone3 || "");
  
    const telefonesOk = t1?.length >= 10 && t2?.length >= 10;
    const semDuplicatas =
      t1 !== t2 &&
      (!mostrarTelefone3 || (t3.length >= 10 && t3 !== t1 && t3 !== t2));
  
    setTelefonesValidos(emailOk && telefonesOk && semDuplicatas);
  }, [formData, mostrarTelefone3]);
  

  // 🔥 Função para formatar telefone corretamente sem travar no "-"
  const formatarTelefone = (valor) => {
    let telefone = valor.replace(/\D/g, ""); // Remove tudo que não for número

    if (telefone.length <= 2) return `(${telefone}`;
    if (telefone.length <= 7) return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
  };

  // 🔥 Função para verificar se há números repetidos
  const verificarTelefonesDuplicados = (novoValor, campo) => {
    const telefonesAtualizados = {
      telefone1: campo === "telefone1" ? novoValor : formData.telefone1,
      telefone2: campo === "telefone2" ? novoValor : formData.telefone2,
      telefone3: campo === "telefone3" ? novoValor : formData.telefone3,
    };

    const telefonesFiltrados = Object.values(telefonesAtualizados).filter(Boolean); // Remove telefones vazios
    const temRepeticao = new Set(telefonesFiltrados).size !== telefonesFiltrados.length;
    
    setTelefonesIguais(temRepeticao);
  };

  const handleTelefoneChange = (campo, valor) => {
    let telefoneFormatado = formatarTelefone(valor);
    updateFormData({ [campo]: telefoneFormatado });
    verificarTelefonesDuplicados(telefoneFormatado, campo);
  };

  return (
    <div className="step-container">
      <h2>Contato</h2>

      <label>Email *</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        required
      />

      <label>Telefone 1 *</label>
      <input
        type="tel"
        value={formData.telefone1}
        onChange={(e) => handleTelefoneChange("telefone1", e.target.value)}
        maxLength="15"
        placeholder="(00) 00000-0000"
        required
      />

      <label>Telefone 2 *</label>
      <input
        type="tel"
        value={formData.telefone2}
        onChange={(e) => handleTelefoneChange("telefone2", e.target.value)}
        maxLength="15"
        placeholder="(00) 00000-0000"
        required
      />

      {/* 🔥 Botão para adicionar outro telefone */}
      {!mostrarTelefone3 && (
        <button className="btn-adicionar" onClick={() => setMostrarTelefone3(true)}>
          + Adicionar outro telefone
        </button>
      )}

      {/* 🔥 Campo para Telefone 3, visível somente quando ativado */}
      {mostrarTelefone3 && (
        <>
          <label>Telefone 3</label>
          <input
            type="tel"
            value={formData.telefone3 || ""}
            onChange={(e) => handleTelefoneChange("telefone3", e.target.value)}
            maxLength="15"
            placeholder="(00) 00000-0000"
          />
        </>
      )}

      {/* 🔥 Mensagem de erro se os telefones forem iguais */}
      {telefonesIguais && <span className="erro-telefone">Os números devem ser diferentes!</span>}

      <div className="button-group">
        <button className="voltar" onClick={prevStep}>Voltar</button>
        <button
            className={`proximo ${telefonesValidos ? "btn-ativo" : "btn-desativado"}`}
            onClick={nextStep}
            disabled={!telefonesValidos}
          >
            Próximo
          </button>


      </div>
    </div>
  );
};

export default StepContato;
