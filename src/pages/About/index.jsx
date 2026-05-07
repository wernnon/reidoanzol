import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Ícones
import { FaStore, FaShip, FaTrophy, FaMobileAlt, FaLeaf, FaHandshake } from 'react-icons/fa';

import styles from './About.module.css';

// IMAGENS
// Mantive os teus imports locais caso queiras usar como backup, 
// mas a imagem de fundo agora vem diretamente do URL do Unsplash no estilo inline.
import heroImage from '../../assets/local-evento.jpg';
import eventImage1 from '../../assets/evento-foto-1.jpeg';
import eventImage2 from '../../assets/evento-foto-2.jpeg';
import eventImage3 from '../../assets/evento-foto-3.jpeg';

function AboutPage() {
  const { t } = useTranslation();

  // Variantes de animação para scroll reveal
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  // NOVA IMAGEM DE FUNDO (Pescador ao pôr do sol)
  const newHeroBg = "https://images.unsplash.com/photo-1493086608933-2882db8dd184?q=80&w=1600&auto=format&fit=crop";

  return (
    <main className={styles.aboutContainer}>
      
      {/* --- HERO SECTION --- */}
      <section className={styles.heroSection}>
        <div 
          className={styles.heroBackground} 
          style={{ backgroundImage: `url(${newHeroBg})` }} 
        />
        <div className={styles.heroOverlay}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.heroContent}
          >
            <h1>REI DO ANZOL</h1>
            <p className={styles.tagline}>O Maior Ecossistema de Pesca Desportiva da Amazónia</p>
            <div className={styles.heroDivider}></div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className={styles.contentWrapper}>
        
        {/* MISSÃO E VISÃO */}
        <motion.section 
          className={styles.missionSection}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className={styles.missionText}>
            <h2 className={styles.gradientTitle}>A Nossa Missão</h2>
            <p>
              O <strong>Rei do Anzol</strong> nasceu da paixão pelas águas de Rondônia. Somos mais do que um aplicativo; somos a ponte definitiva entre o pescador, o rio e o mercado.
            </p>
            <p>
              A nossa missão é modernizar e unir a pesca desportiva, oferecendo tecnologia de ponta para prever o clima, ligar pescadores a excelentes guias locais e criar um marketplace seguro para a compra e venda de equipamentos. Trabalhamos incansavelmente para fomentar o turismo de pesca sustentável, provando que a paixão pelo anzol deve caminhar sempre lado a lado com a preservação ambiental.
            </p>
            <div className={styles.badgesWrapper}>
              <span className={styles.missionBadge}><FaLeaf /> Pesca Sustentável</span>
              <span className={styles.missionBadge}><FaHandshake /> Tecnologia & Comunidade</span>
            </div>
          </div>
        </motion.section>

        {/* O QUE FAZEMOS (Alinhado com as abas do app) */}
        <section className={styles.activitiesSection}>
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Os Nossos Pilares</h2>
            <p>Descubra como o Rei do Anzol revoluciona a sua pescaria do planeamento à captura.</p>
          </motion.div>

          <motion.div 
            className={styles.activitiesGrid}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className={styles.activityCard} variants={fadeInUp}>
              <div className={styles.iconWrap}><FaStore /></div>
              <h3>Marketplace Especializado</h3>
              <p>O maior cais virtual para pescadores. Compre e venda equipamentos, barcos e iscas diretamente com lojistas verificados e entusiastas da região.</p>
            </motion.div>

            <motion.div className={styles.activityCard} variants={fadeInUp}>
              <div className={styles.iconWrap}><FaMobileAlt /></div>
              <h3>Radar & Inteligência</h3>
              <p>Cruzamos dados de pressão atmosférica, vento, chuva e fases da lua para lhe dar a probabilidade exata de sucesso antes mesmo de atirar a isca na água.</p>
            </motion.div>

            <motion.div className={styles.activityCard} variants={fadeInUp}>
              <div className={styles.iconWrap}><FaShip /></div>
              <h3>Conexão com Piloteiros</h3>
              <p>A central de guias mais completa do estado. Encontre os mestres do Rio Madeira, Guaporé e Machado, avaliados pela própria comunidade.</p>
            </motion.div>

            <motion.div className={styles.activityCard} variants={fadeInUp}>
              <div className={styles.iconWrap}><FaTrophy /></div>
              <h3>Diário e Competições</h3>
              <p>Registe os seus maiores troféus, acompanhe o seu histórico pessoal e inscreva-se diretamente nos maiores campeonatos de pesca desportiva.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* GALERIA */}
        <section className={styles.gallerySection}>
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Galeria de Honra</h2>
            <p>Registros inesquecíveis das nossas águas e da nossa comunidade.</p>
          </motion.div>

          <motion.div 
            className={styles.galleryGrid}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className={styles.galleryItem} variants={fadeInUp}>
              <img src={eventImage1} alt="Pescador exibindo o troféu" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1596700760447-0245a4a98eb3?q=80&w=600'} />
              <div className={styles.imageOverlay}><span>Troféus da Amazónia</span></div>
            </motion.div>
            
            <motion.div className={styles.galleryItem} variants={fadeInUp}>
              <img src={eventImage2} alt="Iscas e equipamentos" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=600'} />
              <div className={styles.imageOverlay}><span>A Ferramenta Certa</span></div>
            </motion.div>
            
            <motion.div className={styles.galleryItem} variants={fadeInUp}>
              <img src={eventImage3} alt="Barco navegando no rio" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600'} />
              <div className={styles.imageOverlay}><span>Exploração sem Limites</span></div>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}

export default AboutPage;