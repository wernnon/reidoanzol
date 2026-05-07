import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Ícones
import { FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { GiAnchor } from 'react-icons/gi';

import styles from './Footer.module.css';
import logoDataRo from '../../assets/dataro-logo.png'; 
import logorei from '../../assets/logo_rei.png'; 

function Footer() {
  // Array matemático para as bolhas
  const bubbles = Array.from({ length: 8 });

  return (
    <footer className={styles.footerWrapper}>
      
      {/* --- ANIMAÇÕES DE FUNDO PROFUNDO --- */}
      <div className={styles.environmentBackground}>
        {bubbles.map((_, index) => (
          <motion.div 
            key={index} 
            className={styles.bubble}
            style={{ 
              left: `${Math.random() * 90}%`, 
              width: `${Math.random() * 15 + 5}px`, 
              height: `${Math.random() * 15 + 5}px` 
            }}
            animate={{ y: [100, -800], opacity: [0, 0.4, 0] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          />
        ))}
        <motion.div className={styles.anchorWrapper} animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <GiAnchor className={styles.anchorIcon} />
        </motion.div>
      </div>

      {/* --- CONTEÚDO DO RODAPÉ --- */}
      <div className={styles.footerContent}>
        
        {/* Grelha Principal */}
        <div className={styles.gridContainer}>
          
          <div className={styles.brandColumn}>
            <img src={logorei} alt="Rei do Anzol" className={styles.footerLogo} />
            <p className={styles.brandText}>
              A sua bússola para a melhor experiência de pesca desportiva. Navegue, explore e conquiste os rios com o Rei do Anzol.
            </p>
            <div className={styles.socialLinks}>
              <motion.a href="#" whileHover={{ y: -5, scale: 1.1 }} className={styles.socialIcon}><FaInstagram /></motion.a>
              <motion.a href="#" whileHover={{ y: -5, scale: 1.1 }} className={styles.socialIcon}><FaFacebookF /></motion.a>
              <motion.a href="#" whileHover={{ y: -5, scale: 1.1 }} className={styles.socialIcon}><FaYoutube /></motion.a>
            </div>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Navegação Rápida</h3>
            <ul className={styles.quickLinks}>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">Sobre Nós</Link></li>
              <li><Link to="/campeonatos">Campeonatos</Link></li>
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/booking">Piloteiros</Link></li>
            </ul>
          </div>

          <div className={styles.contactColumn}>
            <h3 className={styles.columnTitle}>Os Nossos Canais</h3>
            <ul className={styles.contactInfo}>
              <li>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <div>
                  <strong>Sede Principal</strong>
                  <span>Porto Velho, Rondônia - Brasil</span>
                </div>
              </li>
              <li>
                <FaPhoneAlt className={styles.contactIcon} />
                <div>
                  <strong>Atendimento</strong>
                  <span>(69) 99908-9202</span>
                </div>
              </li>
              <li>
                <FaEnvelope className={styles.contactIcon} />
                <div>
                  <strong>E-mail</strong>
                  <span>contato@dataro-it.com.br</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra de Copyright */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} <strong>Rei do Anzol</strong>. Todos os direitos reservados.</p>
          </div>
          
          <div className={styles.credits}>
            <p>Desenvolvido com excelência por</p>
            <a href="https://www.dataro-it.com.br" target="_blank" rel="noopener noreferrer" className={styles.dataroLink}>
              <img src={logoDataRo} alt="DATA-RO IT" className={styles.dataroLogo} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;