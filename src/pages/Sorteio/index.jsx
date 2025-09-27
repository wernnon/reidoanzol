import React, { useState } from 'react';
import styles from './Sorteio.module.css';
import { Link } from 'react-router-dom';
// A linha 'import InputMask' foi removida.

// NOVA FUNÇÃO PARA FORMATAR O TELEFONE MANUALMENTE
const formatPhoneNumber = (value) => {
  // Remove tudo que não for dígito
  const digits = value.replace(/\D/g, '');

  // Limita a 11 dígitos (DDD + 9 dígitos)
  const truncatedDigits = digits.slice(0, 11);

  // Aplica a máscara (99) 99999-9999
  if (truncatedDigits.length > 7) {
    return `(${truncatedDigits.slice(0, 2)}) ${truncatedDigits.slice(2, 7)}-${truncatedDigits.slice(7)}`;
  } else if (truncatedDigits.length > 2) {
    return `(${truncatedDigits.slice(0, 2)}) ${truncatedDigits.slice(2)}`;
  } else if (truncatedDigits.length > 0) {
    return `(${truncatedDigits}`;
  } else {
    return '';
  }
};

function SorteioPage() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setIsError(false);
    setModalMessage('');

    try {
      const cleanTelefone = telefone.replace(/\D/g, ''); 
      const response = await fetch('https://reidoanzol-api.vercel.app/api/register-raffle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone: cleanTelefone }), 
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        throw new Error(data.message || 'Ocorreu um erro.');
      }
      
      setModalMessage(`Obrigado por participar, ${nome}! Seu registro foi confirmado. Boa sorte!`);
      setIsModalVisible(true);

    } catch (error) {
      setIsError(true);
      setModalMessage(error.message);
      setIsModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    if (!isError) {
        setNome('');
        setTelefone('');
    }
  };

  return (
    <>
      {isModalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.modalIcon}>{isError ? '❌' : '✔️'}</span>
            <h2>{isError ? 'Erro na Inscrição' : 'Participação Confirmada!'}</h2>
            <p>{modalMessage}</p>
            <button onClick={closeModal} className={styles.modalButton}>
              OK
            </button>
          </div>
        </div>
      )}

      <main className={styles.sorteioContainer}>
        <title>Sorteio - PVH Pesca Show</title>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1>Participe do Sorteio</h1>
            <p>Preencha seus dados para concorrer a brindes incríveis! A participação é gratuita e aberta a todos.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <fieldset className={styles.formSection}>
              <legend>Seus Dados</legend>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telefone">Telefone (com DDD)</label>
                {/* VOLTAMOS A USAR UM INPUT NORMAL COM A NOSSA FUNÇÃO DE FORMATAÇÃO */}
                <input
                  type="tel"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))}
                  placeholder="(99) 99999-9999"
                  maxLength="15"
                  required
                />
              </div>
            </fieldset>

            <div className={styles.submitContainer}>
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Enviando...' : 'Confirmar Participação'}
              </button>
              <Link to="/" className={styles.backButton}>Voltar para a Home</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default SorteioPage;