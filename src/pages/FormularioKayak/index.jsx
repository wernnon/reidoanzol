import React, { useState } from 'react';
import styles from '../../pages/Formulario/Formulario.module.css';

const formatPhone = (value) => {
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};


function FormularioKayakPage() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const resetForm = () => {
    setNome('');
    setTelefone('');
    setEmail('');
    setTermsAccepted(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      nome,
      telefone: telefone.replace(/\D/g, ''),
      email,
    };

    try {
      const response = await fetch("https://reidoanzol-api.vercel.app/api/register-kayak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setIsModalVisible(true);
      } else {
        alert(`Erro ao enviar inscrição: ${result.error || 'Tente novamente.'}`);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão com a API. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isModalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.modalIcon}>✔️</span>
            <h2>Inscrição Concluída!</h2>
            <p>Sua inscrição para a competição de caiaque foi realizada com sucesso. Boa sorte!</p>
            <button onClick={closeModal} className={styles.modalButton}>Fechar</button>
          </div>
        </div>
      )}

      <main className={styles.registrationContainer}>
        <title>Inscrição Caiaque - PVH Pesca Show</title>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1>Inscrição - Competição de Caiaque</h1>
            <p>Preencha seus dados para garantir sua vaga na competição individual.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <fieldset className={styles.formSection}>
              <legend>1. Dados do Competidor</legend>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">Nome Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={telefone}
                    onChange={(e) => setTelefone(formatPhone(e.target.value))}
                    placeholder="(99) 99999-9999"
                    required
                  />
                </div>
                 <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    required
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.formSection}>
              <legend>2. Termos e Acordos</legend>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="termsRules"
                  name="termsRules"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <label htmlFor="termsRules">
                  Declaro que li e concordo com o regulamento do torneio, incluindo a obrigatoriedade do uso de colete salva-vidas.
                </label>
              </div>
            </fieldset>

            <div className={styles.submitContainer}>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Confirmar Inscrição'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default FormularioKayakPage;

