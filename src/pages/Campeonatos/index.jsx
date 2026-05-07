import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Ícones
import { 
  FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaMedal, 
  FaUsers, FaMoneyBillWave, FaArrowRight, FaShip 
} from 'react-icons/fa';
import { GiFishingBoat, GiWoodCanoe, GiFishBucket } from 'react-icons/gi';

import styles from './Campeonatos.module.css';

// --- DADOS FICTÍCIOS (Ambientados em Rondônia - 2026) ---
const HIGHLIGHT_EVENT = {
  id: 'mega-1',
  title: "Rei do Madeira 2026",
  date: "12 a 14 de Junho, 2026",
  location: "Porto Velho, RO",
  prize: "R$ 100.000 + Barco Alumínio",
  fee: "R$ 1.500 / Equipe",
  category: "Embarcada (Trio)",
  target: "Predadores Livres",
  // Imagem nova, perfeitamente alinhada com pesca de torneio
  img: "https://images.unsplash.com/photo-1529230117010-b6c436154f25?q=80&w=1200&auto=format&fit=crop"
};

const UPCOMING_EVENTS = [
  {
    id: 1, title: "Copa Guaporé de Caiaque", date: "05 de Julho, 2026",
    location: "Costa Marques, RO", prize: "R$ 15.000", fee: "R$ 250 / Pescador",
    icon: <GiWoodCanoe />, type: "Caiaque"
  },
  {
    id: 2, title: "Torneio Mestre do Pincho", date: "20 de Agosto, 2026",
    location: "Rio Machado, Ji-Paraná", prize: "R$ 25.000", fee: "R$ 600 / Dupla",
    icon: <GiFishingBoat />, type: "Barco"
  },
  {
    id: 3, title: "Festival de Barranco - Mamoré", date: "10 de Setembro, 2026",
    location: "Guajará-Mirim, RO", prize: "R$ 5.000 + Kits", fee: "R$ 100 / Pescador",
    icon: <GiFishBucket />, type: "Barranco"
  }
];

const STATE_RANKING = [
  { rank: 1, name: "Roberto 'Capita' Alves", points: 2450, team: "Equipe Voraz", avatar: "https://i.pravatar.cc/150?img=11" },
  { rank: 2, name: "Márcio Ferreira", points: 2120, team: "Tucuna RO", avatar: "https://i.pravatar.cc/150?img=12" },
  { rank: 3, name: "Lucas Pescador", points: 1980, team: "Caiaqueiros PVH", avatar: "https://i.pravatar.cc/150?img=13" },
  { rank: 4, name: "João Pedro Silva", points: 1850, team: "Sem Fronteiras", avatar: "https://i.pravatar.cc/150?img=14" },
  { rank: 5, name: "André Machado", points: 1600, team: "Madeira Fishing", avatar: "https://i.pravatar.cc/150?img=15" },
];

function CampeonatosPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('eventos'); // 'eventos' | 'ranking'

  return (
    <main className={styles.champContainer}>
      <div className={styles.ambientBackground}></div>

      <section className={styles.contentWrapper}>
        
        {/* CABEÇALHO */}
        <header className={styles.header}>
          <h2><FaTrophy className={styles.goldIcon} /> {t('championships.title', 'Arena de Campeões')}</h2>
          <p className={styles.subtitle}>Inscreva-se nos maiores torneios do estado e acompanhe o ranking oficial.</p>
        </header>

        {/* TABS DE NAVEGAÇÃO */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'eventos' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('eventos')}
          >
            Próximos Torneios
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'ranking' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('ranking')}
          >
            Ranking Estadual 2026
          </button>
        </div>

        <AnimatePresence mode="wait">
          
          {/* TAB 1: EVENTOS E INSCRIÇÕES */}
          {activeTab === 'eventos' && (
            <motion.div 
              key="eventos"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={styles.eventsSection}
            >
              
              {/* DESTAQUE PRINCIPAL (HERO CARD) */}
              <div className={styles.highlightCard}>
                <div className={styles.highlightImage}>
                  <img src={HIGHLIGHT_EVENT.img} alt={HIGHLIGHT_EVENT.title} />
                  <div className={styles.overlayGradient}></div>
                  <span className={styles.megaBadge}>MEGA EVENTO</span>
                </div>
                
                <div className={styles.highlightContent}>
                  <div className={styles.hlHeader}>
                    <h3>{HIGHLIGHT_EVENT.title}</h3>
                    <p><FaMapMarkerAlt className={styles.detailIcon}/> {HIGHLIGHT_EVENT.location}</p>
                  </div>

                  <div className={styles.hlGrid}>
                    <div className={styles.hlItem}>
                      <FaCalendarAlt className={styles.hlIcon} />
                      <div><small>Data</small><strong>{HIGHLIGHT_EVENT.date}</strong></div>
                    </div>
                    <div className={styles.hlItem}>
                      <FaMoneyBillWave className={styles.hlIconGold} />
                      <div><small>Premiação Total</small><strong>{HIGHLIGHT_EVENT.prize}</strong></div>
                    </div>
                    <div className={styles.hlItem}>
                      <FaUsers className={styles.hlIcon} />
                      <div><small>Categoria</small><strong>{HIGHLIGHT_EVENT.category}</strong></div>
                    </div>
                    <div className={styles.hlItem}>
                      <FaShip className={styles.hlIcon} />
                      <div><small>Taxa de Inscrição</small><strong>{HIGHLIGHT_EVENT.fee}</strong></div>
                    </div>
                  </div>

                  <button className={styles.registerBtnGigante}>
                    Garantir Vaga <FaArrowRight />
                  </button>
                </div>
              </div>

              {/* GRID DE PRÓXIMOS EVENTOS */}
              <h3 className={styles.sectionTitle}>Calendário Oficial</h3>
              <div className={styles.eventsGrid}>
                {UPCOMING_EVENTS.map((event) => (
                  <motion.div 
                    key={event.id} 
                    className={styles.eventCard}
                    whileHover={{ y: -5 }}
                  >
                    <div className={styles.eventHeader}>
                      <div className={styles.eventIconWrap}>{event.icon}</div>
                      <span className={styles.eventType}>{event.type}</span>
                    </div>
                    
                    <h4 className={styles.eventTitle}>{event.title}</h4>
                    
                    <ul className={styles.eventDetailsList}>
                      <li><FaCalendarAlt className={styles.listIcon}/> {event.date}</li>
                      <li><FaMapMarkerAlt className={styles.listIcon}/> {event.location}</li>
                      <li className={styles.prizeHighlight}><FaTrophy className={styles.listIconGold}/> {event.prize}</li>
                    </ul>

                    <div className={styles.eventFooter}>
                      <span className={styles.eventFee}>{event.fee}</span>
                      <button className={styles.registerBtnSmall}>Inscrever-se</button>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          )}

          {/* TAB 2: RANKING ESTADUAL */}
          {activeTab === 'ranking' && (
            <motion.div 
              key="ranking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.rankingSection}
            >
              
              <div className={styles.rankingHeaderBox}>
                <h3>Top Pescadores de Rondônia</h3>
                <p>A pontuação é calculada com base nos resultados dos torneios oficiais de 2026.</p>
              </div>

              <div className={styles.rankingList}>
                {STATE_RANKING.map((angler) => {
                  let medalColor = "transparent";
                  if (angler.rank === 1) medalColor = "#f1c40f"; // Ouro
                  if (angler.rank === 2) medalColor = "#bdc3c7"; // Prata
                  if (angler.rank === 3) medalColor = "#cd7f32"; // Bronze

                  return (
                    <motion.div 
                      key={angler.rank} 
                      className={`${styles.rankingItem} ${angler.rank <= 3 ? styles.podiumItem : ''}`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className={styles.rankNumber} style={{ color: medalColor !== "transparent" ? medalColor : '#8892b0' }}>
                        {angler.rank <= 3 ? <FaMedal size={28} /> : `#${angler.rank}`}
                      </div>
                      
                      <div className={styles.anglerProfile}>
                        <img src={angler.avatar} alt={angler.name} className={styles.anglerAvatar} />
                        <div className={styles.anglerInfo}>
                          <h4>{angler.name}</h4>
                          <span>{angler.team}</span>
                        </div>
                      </div>

                      <div className={styles.anglerPoints}>
                        <strong>{angler.points}</strong> pts
                      </div>
                    </motion.div>
                  )
                })}
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </section>
    </main>
  );
}

export default CampeonatosPage;