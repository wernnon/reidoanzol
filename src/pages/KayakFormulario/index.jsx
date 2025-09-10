import React, { useState } from 'react';
import styles from './KayakFormulario.module.css';

// Função para formatar número de telefone
const formatPhone = (value) => {
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');
  let formatted = '';
  if (numbers.length <= 2) formatted = `(${numbers}`;
  else if (numbers.length <= 7) formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  else formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;

  return formatted;
};

function FormularioCompetidorPage() {
  const initialFormState = {
    nome: '',
    telefone: '',
    email: '',
    termsRules: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // --- Funções de input ---
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === 'telefone') {
      formattedValue = formatPhone(value);
    }
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  // --- Envio do formulário ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("🚀 Enviando formulário do competidor...");

    const submissionData = {
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
    };

    console.log("📦 Dados enviados para API:", submissionData);

    try {
      const response = await fetch("http://localhost:3001/api/kayak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      console.log("✅ Resposta da API:", result);

      if (response.ok) { // Verifica se a resposta HTTP é de sucesso
        console.log("🎉 Inscrição de competidor concluída com sucesso!");
        setIsModalVisible(true);
      } else {
        console.error("❌ Erro da API:", result);
        alert(result.message || "Erro ao enviar inscrição");
      }
    } catch (error) {
      console.error("💥 Erro de conexão com a API:", error);
      alert("Erro de conexão com a API");
    }
  };

  const closeModal = () => {
    console.log("❎ Fechando modal de sucesso");
    setIsModalVisible(false);
    resetForm();
  };

  // --- JSX do Formulário ---
  return (
    <>
      {isModalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.modalIcon}>✔️</span>
            <h2>Inscrição Concluída!</h2>
            <p>Sua inscrição foi registrada com sucesso. Boa sorte!</p>
            <button onClick={closeModal} className={styles.modalButton}>Fechar</button>
          </div>
        </div>
      )}

      <main className={styles.registrationContainer}>
        <title>Inscrição - Competição</title>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1>Formulário de Inscrição</h1>
            <p>Preencha seus dados para se inscrever na competição.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <fieldset className={styles.formSection}>
              <legend>Dados do Competidor</legend>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome Completo</label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="telefone">Telefone</label>
                  <input type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" value={formData.email} onChange={handleInputChange} required />
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.formSection}>
              <legend>Termos e Acordos</legend>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="termsRules" name="termsRules" checked={formData.termsRules} onChange={handleCheckboxChange} required />
                <label htmlFor="termsRules">
                  Declaro que li e concordo com os termos e regras da competição.
                </label>
              </div>
            </fieldset>

            <div className={styles.submitContainer}>
              <button type="submit" className={styles.submitButton}>Confirmar Inscrição</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default FormularioCompetidorPage;