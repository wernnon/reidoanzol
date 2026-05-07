import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast'; // Importação do Toaster Premium

// Ícones Premium
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

import styles from './Login.module.css';
import logorei from '../../assets/logo_rei.png';

// Importação da API de Autenticação
import { authAPI } from '../../api/auth'; 

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Estados do Formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Função Real de Login (Conectada ao Supabase + Hot Toast)
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authAPI.loginUser({ email, password });
      
      toast.success(t('login.success', 'Bem-vindo de volta, Capitão!'));
      navigate('/'); 
    } catch (error) {
      console.error(error);
      // Substituído o alert feio pelo Toast vermelho de erro
      toast.error(t('login.error', 'Erro ao entrar. Verifique o seu e-mail e senha.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.ambientBackground}></div>

      <Link to="/" className={styles.backButton}>
        <FaArrowLeft /> {t('login.back', 'Voltar ao Cais')}
      </Link>

      <motion.div 
        className={styles.glassCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.cardHeader}>
          <img src={logorei} alt="Rei do Anzol" className={styles.logo} />
          <h2>{t('login.welcome', 'Bem-vindo a Bordo')}</h2>
          <p>{t('login.subtitle', 'Aceda à sua central de pesca desportiva.')}</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">{t('login.emailLabel', 'E-mail')}</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.inputIcon} />
              <input 
                type="email" id="email" placeholder={t('login.emailPlaceholder', 'pescador@exemplo.com')}
                value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password">{t('login.passwordLabel', 'Senha')}</label>
              <Link to="/recuperar-senha" className={styles.forgotPassword}>
                {t('login.forgotPassword', 'Esqueceu a senha?')}
              </Link>
            </div>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input 
                type={showPassword ? "text" : "password"} id="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}
              />
              <button 
                type="button" className={styles.togglePasswordBtn} 
                onClick={() => setShowPassword(!showPassword)} disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <motion.button 
            type="submit" className={styles.submitBtn}
            whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}
            disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? t('login.loading', 'A entrar...') : t('login.enterBtn', 'Entrar na Plataforma')}
          </motion.button>

        </form>

        <div className={styles.cardFooter}>
          <p>
            {t('login.noAccount', 'Ainda não tem o seu diário?')} 
            <Link to="/cadastro" className={styles.registerLink}>
              {t('login.createAccount', 'Criar Conta')}
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

export default LoginPage;