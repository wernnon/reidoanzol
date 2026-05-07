import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast'; // Importação do Toaster Premium

// Ícones Premium
import { FaUser, FaIdCard, FaCalendarAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

import styles from './Register.module.css';
import logorei from '../../assets/logo_rei.png';

// Importação da API de Autenticação
import { authAPI } from '../../api/auth';

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Estados do Formulário
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados de UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNÇÕES DE FORMATAÇÃO E VALIDAÇÃO ---
  const handleNameChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[0-9!@#$%^&*()_+=[\]{};"\\|<>/?]/g, '');
    setFullName(sanitizedValue);
  };

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 11) value = value.slice(0, 11); 
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
  };

  const today = new Date().toISOString().split('T')[0];

  // --- SUBMISSÃO REAL CONECTADA À API E AOS TOASTS ---
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error(t('register.passwordMismatch', 'As senhas não coincidem, Capitão!'));
      return;
    }
    
    if (cpf.length < 14) {
      toast.error(t('register.invalidCpf', 'Por favor, insira um CPF válido com 11 dígitos.'));
      return;
    }

    setIsLoading(true);

    try {
      await authAPI.registerUser({ email, password, fullName, cpf, birthDate });

      toast.success(t('register.success', 'Bem-vindo a bordo! A sua conta foi criada.'));
      navigate('/'); 
      
    } catch (error) {
      console.error(error);
      toast.error(t('register.error', 'Erro ao criar conta. Tente novamente.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.registerContainer}>
      <div className={styles.ambientBackground}></div>

      <Link to="/login" className={styles.backButton}>
        <FaArrowLeft /> {t('register.back', 'Voltar ao Login')}
      </Link>

      <motion.div 
        className={styles.glassCard}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className={styles.cardHeader}>
          <img src={logorei} alt="Rei do Anzol" className={styles.logo} />
          <h2>{t('register.title', 'Junte-se à Frota')}</h2>
          <p>{t('register.subtitle', 'Crie o seu diário de bordo e explore o ecossistema.')}</p>
        </div>

        <form onSubmit={handleRegister} className={styles.registerForm}>
          
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">{t('register.nameLabel', 'Nome Completo')}</label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input 
                type="text" id="fullName" placeholder={t('register.namePlaceholder', 'Sem números, apenas letras')} 
                value={fullName} onChange={handleNameChange} required maxLength="80" disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="cpf">{t('register.cpfLabel', 'CPF')}</label>
              <div className={styles.inputWrapper}>
                <FaIdCard className={styles.inputIcon} />
                <input type="text" id="cpf" placeholder="000.000.000-00" value={cpf} onChange={handleCpfChange} required disabled={isLoading} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="birthDate">{t('register.birthLabel', 'Data de Nascimento')}</label>
              <div className={styles.inputWrapper}>
                <FaCalendarAlt className={styles.inputIcon} />
                <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} max={today} required disabled={isLoading} />
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">{t('register.emailLabel', 'E-mail')}</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.inputIcon} />
              <input type="email" id="email" placeholder="pescador@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="password">{t('register.passwordLabel', 'Senha')}</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" disabled={isLoading} />
                <button type="button" className={styles.togglePasswordBtn} onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">{t('register.confirmPasswordLabel', 'Confirmar Senha')}</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength="6" disabled={isLoading} />
                <button type="button" className={styles.togglePasswordBtn} onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <motion.button 
            type="submit" 
            className={styles.submitBtn} 
            whileHover={{ scale: isLoading ? 1 : 1.02 }} 
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? t('register.loading', 'A Ancorar...') : t('register.submitBtn', 'Ancorar e Registar')}
          </motion.button>
        </form>

        <div className={styles.cardFooter}>
          <p>
            {t('register.hasAccount', 'Já faz parte da tripulação?')} 
            <Link to="/login" className={styles.loginLink}>
              {t('register.loginLink', 'Entrar')}
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

export default RegisterPage;