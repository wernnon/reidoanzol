import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importe se você usa react-router-dom
import styles from './ConfirmacaoEmail.module.css';
// Se você tem uma instância do supabase client, importe-a
// import { supabase } from '../../api/supabaseClient'; // O caminho pode variar

const ConfirmacaoEmail = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // O supabase-js automaticamente detecta a sessão na URL quando a página carrega.
    // Você pode usar onAuthStateChange para reagir a isso, mas para uma simples
    // página de confirmação, apenas exibir a mensagem pode ser suficiente.
    // Se precisar fazer algo específico (como redirecionar), você pode usar:
    /*
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('Usuário logado com sucesso após verificação!');
        // Aqui você poderia, por exemplo, redirecionar o usuário para o dashboard
        // window.location.href = '/dashboard';
      }
    });

    return () => subscription.unsubscribe();
    */
    setLoading(false); // Apenas para simular
  }, []);

  if (loading) {
    return <div className={styles.container}><p>Verificando...</p></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>E-mail verificado com sucesso!</h1>
        <p>Sua conta foi ativada. Agora você já pode acessar a plataforma.</p>
        <Link to="/login" className={styles.loginButton}>Ir para o Login</Link>
      </div>
    </div>
  );
};

export default ConfirmacaoEmail;