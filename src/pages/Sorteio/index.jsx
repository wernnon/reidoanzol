import React, { useState } from 'react';
import styles from './Sorteio.module.css';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

// A URL da API agora vem de uma variável de ambiente do VITE
const API_URL = import.meta.env.VITE_API_BASE_URL;

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
      
      // A chamada agora usa a variável API_URL, que será o endereço correto na Vercel
      const response = await fetch(`${API_URL}/api/register-raffle`, {
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
                <InputMask
                  mask="(99) 99999-9999"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(99) 99999-9999"
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