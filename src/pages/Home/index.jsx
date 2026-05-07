import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { motion, AnimatePresence } from 'framer-motion';

// Ícones Premium para as novas funcionalidades
import { FaWater, FaMoon, FaMapMarkedAlt, FaCameraRetro, FaChartLine, FaShieldAlt, FaStar, FaAnchor, FaTrophy } from 'react-icons/fa';
import { GiShipWheel, GiFishingPole, GiFishCorpse } from 'react-icons/gi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import styles from './Home.module.css';

// --- IMAGENS PRINCIPAIS ---
import pesca2 from '../../assets/pesca2.jpg';
import pesca3 from '../../assets/pesca3.jpg';
import pesca4 from '../../assets/pesca4.jpeg';
import localEventoImg from '../../assets/local-evento.jpg';

// --- IMAGENS DOS PATROCINADORES ---
import logoPatrocinador from '../../assets/logo-patrocinador.png';
import logoPatrocinador2 from '../../assets/logo-patrocinador2.png';
import logoPatrocinador3 from '../../assets/logo-patrocinador3.png';
// (Mantenha os outros imports de 4 a 23 exatamente como estavam no seu código original)

const sponsors = [
  { img: logoPatrocinador, name: 'Empório de Pescados' },
  { img: logoPatrocinador2, name: 'Ademicon Consórcio' },
  { img: logoPatrocinador3, name: 'Lounge Sushi Bar' },
  // ... coloque todos os seus 23 patrocinadores aqui
];

function HomePage() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  return (
    <main className={styles.homeContainer}>
      
      {/* 1. HERO SECTION (A Nova Central do Pescador) */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div> {/* Efeito de fundo profundo */}
        <div className={styles.homeLayout}>
          
          <motion.div className={styles.contentCard} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className={styles.mainTitle}>O Seu Ecossistema de <span className={styles.highlightText}>Pesca Desportiva</span></h1>
            <p className={styles.justifiedText}>
              A evolução da pesca chegou. O <strong>Rei do Anzol</strong> não é apenas um festival, é a sua bússola definitiva. Conecte-se com os melhores guias, analise a hidrologia em tempo real e eternize os seus troféus com inteligência artificial.
            </p>
            
            <div className={styles.buttonGroup}>
              <Link to="/booking" className={`${styles.actionButton} ${styles.primaryBtn}`}>
                <GiShipWheel size={22} /> Encontrar Piloteiro
              </Link>
              <Link to="/previsao" className={`${styles.actionButton} ${styles.secondaryBtn}`}>
                <MdOutlineDashboardCustomize size={22} /> Ver Previsão
              </Link>
            </div>
          </motion.div>

          <motion.div className={styles.carouselWrapper} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} interval={4000} className={styles.premiumCarousel}>
              <div><img src={pesca2} alt="Tucunaré" /><p className="legend">A Emoção do Tucunaré</p></div>
              <div><img src={pesca3} alt="Rio Amazonas" /><p className="legend">Rios que Escondem Gigantes</p></div>
              <div><img src={pesca4} alt="Técnicas" /><p className="legend">Técnica, Paciência e Respeito</p></div>
            </Carousel>
          </motion.div>

        </div>
      </section>

      {/* 2. FUNCIONALIDADE: PREVISÃO DE PESCA */}
      <motion.section className={styles.featureSection} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className={styles.featureText}>
          <h2 className={styles.sectionTitle}>Dashboard de Previsão <span className={styles.highlightText}>Hidrolunar</span></h2>
          <p className={styles.subtitle}>Não dependa da sorte. Cruze dados cruciais para saber exatamente quando e onde o peixe está ativo.</p>
          
          <div className={styles.perksGrid}>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaWater /></div>
              <div>
                <h4>Nível do Rio em Tempo Real</h4>
                <p>Integração com a ANA. Saiba se o rio está enchendo, vazando ou estável antes de sair de casa.</p>
              </div>
            </div>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaMoon /></div>
              <div>
                <h4>Tabela Solunar Inteligente</h4>
                <p>Horários de pico de atividade alimentar baseados na fase da lua e na sua geolocalização exata.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featureGraphic}>
          {/* Um elemento visual simulando o dashboard */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}><FaChartLine /> Status do Rio Madeira</div>
            <div className={styles.mockupBody}>
              <div className={styles.statRow}><span>Transparência:</span> <strong className={styles.textGreen}>Limpa</strong></div>
              <div className={styles.statRow}><span>Tendência:</span> <strong>Vazando (Lento)</strong></div>
              <div className={styles.statRow}><span>Pico Solunar:</span> <strong className={styles.textHighlight}>14:30 - 16:00</strong></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. FUNCIONALIDADE: DIÁRIO DE BORDO */}
      <motion.section className={`${styles.featureSection} ${styles.reverseLayout}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className={styles.featureText}>
          <h2 className={styles.sectionTitle}>Diário de Bordo <span className={styles.highlightText}>Inteligente</span></h2>
          <p className={styles.subtitle}>Transforme a sua galeria de fotos num banco de dados pessoal de sucesso.</p>
          
          <div className={styles.perksGrid}>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaCameraRetro /></div>
              <div>
                <h4>Leitura de Metadados (EXIF)</h4>
                <p>Suba a foto e o sistema captura a data e condições climáticas do momento da fisgada.</p>
              </div>
            </div>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaShieldAlt /></div>
              <div>
                <h4>Privacidade do Pesqueiro</h4>
                <p>Pescador não revela o ponto! Mostre no mapa público apenas a região, mantendo a coordenada exata apenas para si.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featureGraphic}>
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}><GiFishingPole /> Suas Estatísticas</div>
            <div className={styles.mockupBody}>
               <p>Você captura <strong>70%</strong> dos seus Tucunarés com iscas de superfície em dias nublados.</p>
               <div className={styles.barChart}>
                  <div className={styles.barFill} style={{width: '70%'}}>Superfície</div>
               </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. FUNCIONALIDADE: BOOKING DE PILOTEIROS */}
      <motion.section className={styles.featureSection} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className={styles.featureText}>
          <h2 className={styles.sectionTitle}>O "Uber" da <span className={styles.highlightText}>Pesca</span></h2>
          <p className={styles.subtitle}>Tem o equipamento, mas não conhece as manhas do rio? Nós conectamos você aos lendas locais.</p>
          
          <div className={styles.perksGrid}>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaAnchor /></div>
              <div>
                <h4>Guias e Piloteiros Certificados</h4>
                <p>Perfis detalhados com o tipo de embarcação e especialidades (ex: Fly Fishing, Pesca de Couro).</p>
              </div>
            </div>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}><FaStar /></div>
              <div>
                <h4>Agendamento e Avaliações</h4>
                <p>Verifique a disponibilidade do guia em tempo real e leia reviews de outros pescadores.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featureGraphic}>
           <img src={pesca4} alt="Piloteiro no Rio" className={styles.roundedImage} />
        </div>
      </motion.section>

      {/* 5. O LEGADO DO TOPAS (História) */}
      <motion.section className={styles.legacySection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className={styles.legacyContent}>
          <FaTrophy className={styles.legacyIcon} />
          <h2>O Legado do XIII TOPAS</h2>
          <p>O PVH Pesca Show 2025 fez história em Porto Velho. Agradecemos a todos os competidores que fizeram deste festival um marco na pesca esportiva de Rondônia.</p>
          <button onClick={() => setPopupVisible(true)} className={styles.outlineBtn}>Ver Galeria dos Campeões</button>
        </div>
      </motion.section>

      {/* 6. PATROCINADORES (CARROSSEL INFINITO) */}
      <section className={styles.sponsorsSection}>
        <h2 className={styles.sectionTitleWhite}>Quem Torna Tudo Possível</h2>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div key={index} className={styles.sponsorItem}>
                <img src={sponsor.img} alt={sponsor.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default HomePage;