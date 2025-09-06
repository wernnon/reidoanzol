import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

// Logo principal à esquerda
import logoPrincipal from '../../assets/logo-festival.png';

// Logos parceiros
import logoSopescar from '../../assets/sopescar-logo.png';
import logoSemtel from '../../assets/semtel-logo.png';
import logoDataRo from '../../assets/dataro-logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* 1. Logotipo Principal (Esquerda) */}
      <Link to="/" className={styles.brand}>
        <img src={logoPrincipal} alt="Logo PVH Pesca Show" className={styles.logo} />
      </Link>
      
      {/* 2. Logos Centrais para DESKTOP (some em telas menores) */}
      <div className={`${styles.centerLogos} ${styles.desktopOnly}`}>
        <img src={logoSopescar} alt="Logo SOPESCAR" />
        <img src={logoSemtel} alt="Logo SEMTEL" />
        <img src={logoDataRo} alt="Logo DATA-RO" />
      </div>

      {/* 3. Links de Navegação e Menu Hambúrguer (Direita) */}
      <div className={styles.navRight}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`${styles.navList} ${isOpen ? styles.active : ''}`}>
          {/* BOTÕES DE NAVEGAÇÃO PRIMEIRO */}
          <li><Link to="/" className={styles.navButton} onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/sobre" className={styles.navButton} onClick={toggleMenu}>Sobre</Link></li>
          <li><Link to="/inscricao" className={`${styles.navButton} ${styles.subscribeButton}`} onClick={toggleMenu}>Inscreva-se</Link></li>
          
          {/* LOGOS PARCEIROS DEPOIS (somente no menu mobile) */}
          <li className={`${styles.centerLogos} ${styles.mobileOnly}`}>
            <img src={logoSopescar} alt="Logo SOPESCAR" />
            <img src={logoSemtel} alt="Logo SEMTEL" />
            <img src={logoDataRo} alt="Logo DATA-RO" />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;