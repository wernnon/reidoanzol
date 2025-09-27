import React, { useState } from 'react';
import styles from './Sorteio.module.css';
import { Link } from 'react-router-dom';

function SorteioPage() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/register-raffle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ocorreu um erro.');
      }

      setMessage(`Obrigado por participar, ${nome}! Você já está concorrendo. Boa sorte!`);
      setNome('');
      setTelefone('');

    } catch (error) {
      setMessage(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(99) 99999-9999"
                required
              />
            </div>
          </fieldset>

          {message && <p className={styles.message}>{message}</p>}

          <div className={styles.submitContainer}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Enviando...' : 'Confirmar Participação'}
            </button>
            <Link to="/" className={styles.backButton}>Voltar para a Home</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SorteioPage;