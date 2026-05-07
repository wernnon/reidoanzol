import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- Preparação para i18n (Traduções)

// Ícones
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaStore, FaBookOpen, FaTrophy, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';
import { GiShipWheel, GiFishingHook } from 'react-icons/gi';
import { MdOutlineWaves } from 'react-icons/md';
import { FaFish } from 'react-icons/fa';
import { GiWoodCanoe, GiLeafSwirl, GiFallingLeaf } from 'react-icons/gi';

import styles from './Navbar.module.css';

// Assets
import logorei from '../../assets/logo_rei.png';
import logoDataRo from '../../assets/dataro-logo.png';

// --- Configuração dos Links (Agora com chaves (keys) para o i18n) ---
const navLinksConfig = [
  { key: 'home', defaultName: 'Início', path: '/', icon: <FaHome />, color: '#00a8ff' },
  { key: 'marketplace', defaultName: 'Marketplace', path: '/marketplace', icon: <FaStore />, color: '#00b894' },
  { key: 'forecast', defaultName: 'Previsão', path: '/previsao', icon: <MdOutlineWaves />, color: '#00cec9' },
  { key: 'logbook', defaultName: 'Diário', path: '/diario', icon: <FaBookOpen />, color: '#e17055' },
  { key: 'guides', defaultName: 'Piloteiros', path: '/piloteiros', icon: <GiShipWheel />, color: '#0984e3' },
  { key: 'championships', defaultName: 'Campeonatos', path: '/campeonatos', icon: <FaTrophy />, color: '#fbc531' },
  { key: 'about', defaultName: 'Sobre', path: '/sobre', icon: <FaInfoCircle />, color: '#9c88ff' },
];

const Navbar = () => {
  const { t } = useTranslation(); // Hook do i18n
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const carouselRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 180;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: "spring", stiffness: 80, damping: 12 } },
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      
      {/* Background Animado */}
      <div className={styles.environmentBackground}>
        <motion.div className={styles.canoe} animate={{ x: [-100, window.innerWidth], y: [0, 5, -5, 0] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}><GiWoodCanoe /></motion.div>
        <motion.div className={styles.fish1} animate={{ x: [-50, 200, -50], y: [0, -15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}><FaFish /></motion.div>
        <motion.div className={styles.fish2} animate={{ x: [100, -150, 100], y: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}><FaFish /></motion.div>
      </div>

      <div className={styles.gridContainer}>
        
        {/* 1. ESQUERDA: Logo Principal + Botão de Perfil */}
        <div className={styles.leftArea}>
          <Link to="/">
            <motion.img 
              src={logorei} 
              alt="Logo Rei Do Anzol" 
              className={styles.logoBase}
              whileHover={{ scale: 1.05 }}
            />
          </Link>

          {/* NOVO: Botão de Perfil (Preparado para i18n) */}
          <Link to="/login" className={styles.profileBtn}>
             <FaUserCircle className={styles.profileIcon} />
             {/* Se não houver tradução 'nav.profile', ele usa 'Perfil' */}
             <span className={styles.profileLabel}>{t('nav.profile', 'Entrar')}</span>
          </Link>
        </div>

        {/* 2. CENTRO: Logo DataRo */}
        <div className={styles.centerArea}>
           <img src={logoDataRo} alt="Logo Data RO" className={`${styles.logoBase} ${styles.logoPartner}`} />
        </div>

        {/* 3. DIREITA: Carrossel de Botões & Mobile */}
        <div className={styles.rightArea}>
           
           <div className={styles.carouselWrapper}>
             <button className={`${styles.elegantArrow} ${styles.arrowLeft}`} onClick={() => scrollCarousel('left')}>
               <FaChevronLeft />
             </button>
             
             <div className={styles.carouselTrack} ref={carouselRef}>
                {navLinksConfig.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  // Tradução dinâmica com base na key
                  const linkName = t(`nav.${link.key}`, link.defaultName); 

                  return (
                    <Link to={link.path} key={index} className={styles.squareLinkWrapper}>
                      <motion.div 
                        className={`${styles.squareBtn} ${isActive ? styles.activeBtn : ''}`}
                        style={{ '--theme-color': link.color }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={styles.glowEffect} />
                        <span className={styles.btnIcon}>{link.icon}</span>
                        {/* A CLASSE btnLabel FOI CORRIGIDA NO CSS PARA NÃO VAZAR TEXTO */}
                        <span className={styles.btnLabel} title={linkName}>{linkName}</span>
                        
                        {isActive && <motion.div layoutId="navIndicator" className={styles.magicIndicator} />}
                      </motion.div>
                    </Link>
                  );
                })}
             </div>

             <button className={`${styles.elegantArrow} ${styles.arrowRight}`} onClick={() => scrollCarousel('right')}>
               <FaChevronRight />
             </button>
           </div>

           {/* Menu Mobile */}
           <motion.button className={styles.hamburger} onClick={toggleMenu} whileTap={{ scale: 0.8 }}><FaBars /></motion.button>
        </div>
      </div>

      {/* Menu Drawer Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className={styles.mobileMenu} initial="closed" animate="open" exit="closed" variants={menuVariants}>
            <div className={styles.mobileHeader}>
               <span className={styles.mobileTitle}>{t('nav.menu', 'Navegação')}</span>
               <button className={styles.closeBtn} onClick={toggleMenu}><FaTimes/></button>
            </div>
            <ul className={styles.mobileList}>
              
              {/* Botão Perfil no Mobile também! */}
              <li>
                <Link to="/perfil" onClick={toggleMenu} className={styles.mobileLink} style={{'--theme-color': '#fff'}}>
                  <FaUserCircle className={styles.mobileIcon} />
                  <span className={styles.mobileText}>{t('nav.profile', 'Meu Perfil')}</span>
                </Link>
              </li>

              {navLinksConfig.map((link, index) => {
                const linkName = t(`nav.${link.key}`, link.defaultName);
                return (
                  <li key={index}>
                    <Link to={link.path} onClick={toggleMenu} className={styles.mobileLink} style={{'--theme-color': link.color}}>
                      <span className={styles.mobileIcon}>{link.icon}</span>
                      <span className={styles.mobileText}>{linkName}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className={styles.hookDecoration}><GiFishingHook size={200} /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;