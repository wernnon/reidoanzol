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
  console.log("📌 Navbar carregada");

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen ? "🔒 Menu fechado" : "📂 Menu aberto");
  };

  return (
    <nav className={styles.navbar}>
      {console.log("🎨 Renderizando Navbar (logo principal, logos centrais e menu)")}

      {/* 1. Logotipo Principal (Esquerda) */}
      <Link to="/" className={styles.brand} onClick={() => console.log("🏠 Clicou no logo principal -> Home")}>
        <img src={logoPrincipal} alt="Logo PVH Pesca Show" className={styles.logo} />
      </Link>
      
      {/* 2. Logos Centrais para DESKTOP (some em telas menores) */}
      <div className={`${styles.centerLogos} ${styles.desktopOnly}`}>
        {console.log("🤝 Renderizando logos parceiros (desktop)")}
        <a href="https://www.instagram.com/so_pescar" target="_blank" rel="noopener noreferrer" onClick={() => console.log("🔗 Clicou no logo SOPESCAR (Instagram)")}>
          <img src={logoSopescar} alt="Logo SOPESCAR" />
        </a>
        <a href="https://www.instagram.com/semtel.pvh" target="_blank" rel="noopener noreferrer" onClick={() => console.log("🔗 Clicou no logo SEMTEL (Instagram)")}>
          <img src={logoSemtel} alt="Logo SEMTEL" />
        </a>
        <a href="https://www.instagram.com/dataro_it" target="_blank" rel="noopener noreferrer" onClick={() => console.log("🔗 Clicou no logo DATA-RO (Instagram)")}>
          <img src={logoDataRo} alt="Logo DATA-RO" />
        </a>
      </div>

      {/* 3. Links de Navegação e Menu Hambúrguer (Direita) */}
      <div className={styles.navRight}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`${styles.navList} ${isOpen ? styles.active : ''}`}>
          <li>
            <Link to="/" className={styles.navLink} onClick={() => { toggleMenu(); console.log("🏠 Clicou em Home"); }}>Home</Link>
          </li>
          <li>
            <Link to="/sobre" className={styles.navLink} onClick={() => { toggleMenu(); console.log("ℹ️ Clicou em Sobre"); }}>Sobre</Link>
          </li>
          <li>
            <Link to="/inscricao" className={`${styles.navLink} ${styles.subscribeLink}`} onClick={() => { toggleMenu(); console.log("📝 Clicou em Inscreva-se"); }}>Inscreva-se</Link>
          </li>
          
          {/* LOGOS PARCEIROS DEPOIS (somente no menu mobile e com links) */}
          <li className={`${styles.centerLogos} ${styles.mobileOnly}`}>
            {console.log("📱 Renderizando logos parceiros (mobile)")}
            <a href="https://www.instagram.com/so_pescar" target="_blank" rel="noopener noreferrer" onClick={() => console.log("🔗 [MOBILE] Clicou no logo SOPESCAR")}>
              <img src={logoSopescar} alt="Logo SOPESCAR" />
            </a>
            <a href="https://www.instagram.com/semtel.pvh" target="_blank" rel="noopener noreferrer" onClick={() => console.log("🔗 [MOBILE] Clicou no logo SEMTEL")}>
              <img src={logoSemtel} alt="Logo SEMTEL" />
            </a>
            <a href="https://www.instagram.com/dataro_it" target="_blank" rel="noopener noreferrer" onClick={() => console.log("🔗 [MOBILE] Clicou no logo DATA-RO")}>
              <img src={logoDataRo} alt="Logo DATA-RO" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
