import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Ícones
import { 
  FaPlus, FaTrophy, FaWeightHanging, FaRuler, 
  FaMapMarkerAlt, FaCalendarAlt, FaFish 
} from 'react-icons/fa';
import { WiMoonAltFull, WiDaySunny } from 'react-icons/wi';
import { GiFishingLure } from 'react-icons/gi';

import styles from './Diario.module.css';

// --- DADOS FICTÍCIOS DO DIÁRIO DO USUÁRIO ---
const MY_STATS = {
  totalCatches: 47,
  biggestCatch: "Pirarara - 32kg",
  topSpecies: "Tucunaré",
};

const MY_CATCHES = [
  {
    id: 1,
    species: "Tucunaré Açu",
    weight: "7.2 kg",
    length: "82 cm",
    location: "Rio Guaporé, RO",
    date: "15 Abr 2026",
    gear: "Isca Yara Devassa",
    weather: "Ensolarado, 32°C",
    moon: "Lua Cheia",
    img: "https://images.unsplash.com/photo-1544322986-74b88baea9ee?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    species: "Pirarara",
    weight: "32.0 kg",
    length: "115 cm",
    location: "Rio Madeira, RO",
    date: "02 Mar 2026",
    gear: "Anzol 8/0 + Tuvira",
    weather: "Nublado, 28°C",
    moon: "Lua Nova",
    img: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop" // Placeholder genérico
  },
  {
    id: 3,
    species: "Cachorra",
    weight: "6.5 kg",
    length: "90 cm",
    location: "Rio Machado, RO",
    date: "20 Fev 2026",
    gear: "Jig de Pelo 15g",
    weather: "Pancadas de Chuva, 26°C",
    moon: "Quarto Crescente",
    img: "https://images.unsplash.com/photo-1527437934671-61474b530017?q=80&w=600&auto=format&fit=crop"
  }
];

function DiarioPage() {
  const { t } = useTranslation();

  return (
    <main className={styles.logbookContainer}>
      <div className={styles.ambientBackground}></div>

      <section className={styles.contentWrapper}>
        
        {/* CABEÇALHO & AÇÃO PRINCIPAL */}
        <header className={styles.header}>
          <div>
            <h2>{t('logbook.title', 'Meu Diário de Pesca')}</h2>
            <p className={styles.subtitle}>{t('logbook.subtitle', 'As suas histórias, recordes e dados salvos para a eternidade.')}</p>
          </div>
          <motion.button 
            className={styles.addBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Registar Captura
          </motion.button>
        </header>

        {/* ESTATÍSTICAS PESSOAIS */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ color: '#00cec9', background: 'rgba(0, 206, 201, 0.1)' }}>
              <FaFish />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total de Capturas</span>
              <span className={styles.statValue}>{MY_STATS.totalCatches}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ color: '#fbc531', background: 'rgba(251, 197, 49, 0.1)' }}>
              <FaTrophy />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Maior Troféu</span>
              <span className={styles.statValue}>{MY_STATS.biggestCatch}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ color: '#0984e3', background: 'rgba(9, 132, 227, 0.1)' }}>
              <GiFishingLure />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Espécie Frequente</span>
              <span className={styles.statValue}>{MY_STATS.topSpecies}</span>
            </div>
          </div>
        </div>

        {/* HISTÓRICO DE CAPTURAS */}
        <div className={styles.timelineSection}>
          <h3 className={styles.sectionTitle}>Últimos Troféus</h3>
          
          <div className={styles.catchesGrid}>
            {MY_CATCHES.map((peixe) => (
              <motion.div 
                key={peixe.id} 
                className={styles.catchCard}
                whileHover={{ y: -5 }}
              >
                {/* Imagem do Peixe */}
                <div className={styles.catchImage}>
                  <img src={peixe.img} alt={peixe.species} onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Foto+do+Peixe'} />
                  <div className={styles.catchDate}>
                    <FaCalendarAlt /> {peixe.date}
                  </div>
                </div>

                {/* Dados da Captura */}
                <div className={styles.catchContent}>
                  <div className={styles.catchHeader}>
                    <h4>{peixe.species}</h4>
                    <div className={styles.badges}>
                      <span className={styles.weightBadge}><FaWeightHanging /> {peixe.weight}</span>
                      <span className={styles.lengthBadge}><FaRuler /> {peixe.length}</span>
                    </div>
                  </div>

                  <div className={styles.catchDetails}>
                    <p><FaMapMarkerAlt className={styles.detailIcon} /> {peixe.location}</p>
                    <p className={styles.gearLink}><GiFishingLure className={styles.detailIcon} /> {peixe.gear}</p>
                  </div>

                  {/* Contexto Ambiental */}
                  <div className={styles.environmentalData}>
                    <span title="Clima na hora da captura"><WiDaySunny /> {peixe.weather.split(',')[0]}</span>
                    <span title="Fase da lua"><WiMoonAltFull /> {peixe.moon}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}

export default DiarioPage;