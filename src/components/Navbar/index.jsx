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
        <a href="https://www.instagram.com/so_pescar" target="_blank" rel="noopener noreferrer">
          <img src={logoSopescar} alt="Logo SOPESCAR" />
        </a>
        <a href="https://www.instagram.com/semtel.pvh" target="_blank" rel="noopener noreferrer">
          <img src={logoSemtel} alt="Logo SEMTEL" />
        </a>
        <a href="https://www.instagram.com/dataro_it" target="_blank" rel="noopener noreferrer">
          <img src={logoDataRo} alt="Logo DATA-RO" />
        </a>
      </div>

      {/* 3. Links de Navegação e Menu Hambúrguer (Direita) */}
      <div className={styles.navRight}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`${styles.navList} ${isOpen ? styles.active : ''}`}>
          <li><Link to="/" className={styles.navLink} onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/sobre" className={styles.navLink} onClick={toggleMenu}>Sobre</Link></li>
          <li><a href="/#btn_formulario" className={`${styles.navLink} ${styles.subscribeLink}`} onClick={toggleMenu}>Inscreva-se</a></li>
          
          {/* LOGOS PARCEIROS DEPOIS (somente no menu mobile e com links) */}
          <li className={`${styles.centerLogos} ${styles.mobileOnly}`}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={logoSopescar} alt="Logo SOPESCAR" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={logoSemtel} alt="Logo SEMTEL" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={logoDataRo} alt="Logo DATA-RO" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;