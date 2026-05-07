import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Ícones
import { 
  FaStar, FaMapMarkerAlt, FaShip, FaCheckCircle, 
  FaPhoneAlt, FaFilter, FaSearch
} from 'react-icons/fa';
import { GiFishingHook } from 'react-icons/gi';

import styles from './Piloteiros.module.css';

// --- DADOS FICTÍCIOS DOS PILOTEIROS DE RONDÔNIA ---
const MOCK_GUIDES = [
  {
    id: 1,
    name: "Zé do Madeira",
    verified: true,
    location: "Porto Velho - Rio Madeira",
    rating: 4.9,
    reviews: 128,
    boat: "Alumínio 6m - Motor Yamaha 40HP",
    specialties: ["Pesca Pesada", "Pirarara", "Jau"],
    price: "R$ 450",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" // Retrato
  },
  {
    id: 2,
    name: "Capitão Carlos",
    verified: true,
    location: "Costa Marques - Rio Guaporé",
    rating: 5.0,
    reviews: 85,
    boat: "Bass Boat Fibra - Motor Mercury 90HP",
    specialties: ["Tucunaré", "Pincho", "Fly Fishing"],
    price: "R$ 800",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Ribeirinho João",
    verified: false,
    location: "Guajará-Mirim - Rio Mamoré",
    rating: 4.7,
    reviews: 42,
    boat: "Canoa de Madeira - Motor Rabeta",
    specialties: ["Dourada", "Pesca de Fundo", "Pacu"],
    price: "R$ 250",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mestre Silva",
    verified: true,
    location: "Ji-Paraná - Rio Machado",
    rating: 4.8,
    reviews: 96,
    boat: "Bote Alumínio 5m - Motor 15HP",
    specialties: ["Cachorra", "Matrinxã", "Isca Artificial"],
    price: "R$ 350",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
  }
];

function PiloteirosPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('Todos');

  // Filtro simples
  const filteredGuides = MOCK_GUIDES.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          guide.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = filterRegion === 'Todos' || guide.location.includes(filterRegion);
    return matchesSearch && matchesRegion;
  });

  return (
    <main className={styles.guidesContainer}>
      <div className={styles.ambientBackground}></div>

      <section className={styles.contentWrapper}>
        
        {/* CABEÇALHO */}
        <header className={styles.header}>
          <h2>{t('guides.title', 'Piloteiros & Guias Locais')}</h2>
          <p className={styles.subtitle}>
            Encontre os melhores mestres das águas para garantir o seu troféu.
          </p>
        </header>

        {/* BARRA DE PESQUISA E FILTROS */}
        <div className={styles.searchBar}>
          <div className={styles.searchInput}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou peixe (ex: Tucunaré)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filterDropdown}>
            <FaFilter className={styles.filterIcon} />
            <select 
              value={filterRegion} 
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <option value="Todos">Todas as Regiões</option>
              <option value="Madeira">Rio Madeira</option>
              <option value="Guaporé">Rio Guaporé</option>
              <option value="Mamoré">Rio Mamoré</option>
              <option value="Machado">Rio Machado</option>
            </select>
          </div>
        </div>

        {/* GRID DE GUIAS */}
        <div className={styles.guidesGrid}>
          {filteredGuides.map((guide, index) => (
            <motion.div 
              key={guide.id} 
              className={styles.guideCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Parte Superior do Card: Foto e Info Principal */}
              <div className={styles.cardHeader}>
                <div className={styles.avatarWrapper}>
                  <img src={guide.img} alt={guide.name} />
                  {guide.verified && (
                    <div className={styles.verifiedBadge} title="Piloteiro Verificado">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>
                
                <div className={styles.mainInfo}>
                  <h3>{guide.name}</h3>
                  <div className={styles.rating}>
                    <FaStar className={styles.starIcon} />
                    <strong>{guide.rating}</strong>
                    <span>({guide.reviews} avaliações)</span>
                  </div>
                  <p className={styles.location}><FaMapMarkerAlt /> {guide.location}</p>
                </div>
              </div>

              {/* Corpo do Card: Equipamento e Especialidades */}
              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <FaShip className={styles.infoIcon} />
                  <span>{guide.boat}</span>
                </div>
                
                <div className={styles.specialtiesBox}>
                  <GiFishingHook className={styles.infoIcon} />
                  <div className={styles.tags}>
                    {guide.specialties.map((spec, i) => (
                      <span key={i} className={styles.tag}>{spec}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rodapé do Card: Preço e Ação */}
              <div className={styles.cardFooter}>
                <div className={styles.priceBox}>
                  <small>Diária a partir de</small>
                  <strong>{guide.price}</strong>
                </div>
                <button className={styles.contactBtn}>
                  <FaPhoneAlt /> Reservar
                </button>
              </div>
            </motion.div>
          ))}
          
          {filteredGuides.length === 0 && (
             <div className={styles.noResults}>
                <p>Nenhum piloteiro encontrado para esta pesquisa. Tente usar outros termos.</p>
             </div>
          )}
        </div>

      </section>
    </main>
  );
}

export default PiloteirosPage;