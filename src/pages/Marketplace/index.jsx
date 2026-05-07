import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { 
  FaShip, FaTshirt, FaMapMarkedAlt, FaSearch, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
import { GiFishingPole, GiHook } from 'react-icons/gi';
import { MdSettingsInputComponent, MdOutlineRadar } from 'react-icons/md';

import styles from './Marketplace.module.css';

// --- BANCO DE DADOS EXPANDIDO (40 ITENS) ---
const ALL_PRODUCTS = [
  { id: 1, name: "Bass Boat Nitro Z21", price: "R$ 380.000,00", category: "Náutica", img: "https://images.unsplash.com/photo-1544322986-74b88baea9ee?q=80&w=500" },
  { id: 2, name: "Carretilha Shimano Curado DC", price: "R$ 1.850,00", category: "Equipamento", img: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=500" },
  { id: 3, name: "Sonar Garmin Striker Vivid", price: "R$ 3.200,00", category: "Eletrônica", img: "https://images.unsplash.com/photo-1527437934671-61474b530017?q=80&w=500" },
  { id: 4, name: "Isca Artificial Yara Devassa", price: "R$ 65,00", category: "Iscas", img: "https://images.unsplash.com/photo-1611078174249-163f25114ce9?q=80&w=500" },
  { id: 5, name: "Vara Lumis Infinity 17lb", price: "R$ 450,00", category: "Equipamento", img: "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=500" },
  { id: 6, name: "Motor Mercury 300HP V8", price: "R$ 145.000,00", category: "Náutica", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=500" },
  { id: 7, name: "Camisa de Pesca King Brasil", price: "R$ 120,00", category: "Vestuário", img: "https://images.unsplash.com/photo-1523381235312-3a1647fa9921?q=80&w=500" },
  { id: 8, name: "Caiaque Hook Milha Náutica", price: "R$ 5.800,00", category: "Náutica", img: "https://images.unsplash.com/photo-1559100068-cd8976a436d8?q=80&w=500" },
  { id: 9, name: "Linha Multifilamento 8X", price: "R$ 89,00", category: "Equipamento", img: "https://images.unsplash.com/photo-1622322062602-0c9f80164893?q=80&w=500" },
  { id: 10, name: "Pousada Rio Negro - Pacote 7 dias", price: "R$ 12.500,00", category: "Turismo", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500" },
  // ... Gerando mais itens para completar 40
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: i + 11,
    name: `Produto Especial #${i + 11}`,
    price: `R$ ${(Math.random() * 1000 + 50).toFixed(2)}`,
    category: ["Equipamento", "Iscas", "Náutica", "Eletrônica", "Vestuário", "Turismo"][Math.floor(Math.random() * 6)],
    img: `https://images.unsplash.com/photo-${1500000000000 + (i * 123456)}?q=80&w=500&auto=format&fit=crop`
  }))
];

const ITEMS_PER_PAGE = 20;

function MarketplacePage() {
  const { t } = useTranslation();
  
  // Estados
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de Filtro
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'Todas' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Lógica de Paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'Todas', label: 'Todas', icon: <FaSearch /> },
    { id: 'Equipamento', label: 'Equipamento', icon: <GiFishingPole /> },
    { id: 'Iscas', label: 'Iscas', icon: <GiHook /> },
    { id: 'Náutica', label: 'Náutica', icon: <FaShip /> },
    { id: 'Eletrônica', label: 'Eletrônica', icon: <MdOutlineRadar /> },
    { id: 'Vestuário', label: 'Vestuário', icon: <FaTshirt /> },
    { id: 'Turismo', label: 'Turismo', icon: <FaMapMarkedAlt /> },
  ];

  return (
    <main className={styles.marketContainer}>
      <div className={styles.ambientBackground}></div>

      <section className={styles.marketplaceLayout}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.searchBox}>
             <FaSearch className={styles.searchIcon} />
             <input 
              type="text" 
              placeholder="Pesquisar..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
             />
          </div>

          <h3 className={styles.sidebarTitle}>Categorias</h3>
          <ul className={styles.categoryList}>
            {categories.map(cat => (
              <li 
                key={cat.id} 
                className={selectedCategory === cat.id ? styles.activeCat : ''}
                onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
              >
                {cat.icon} {cat.label}
              </li>
            ))}
          </ul>

          <div className={styles.promoBox}>
             <MdSettingsInputComponent className={styles.promoIcon}/>
             <h4>Monte o seu Conjunto</h4>
             <p>A nossa IA cruza a carretilha perfeita para a sua vara.</p>
             <button>Iniciar</button>
          </div>
        </aside>

        {/* GRID DE PRODUTOS */}
        <div className={styles.productGridArea}>
          <div className={styles.gridHeader}>
            <h2>{selectedCategory} no Cais ({filteredProducts.length})</h2>
            <select className={styles.sortSelect}>
               <option>Relevância</option>
               <option>Menor Preço</option>
            </select>
          </div>

          <motion.div layout className={styles.productsGrid}>
            <AnimatePresence mode='popLayout'>
              {paginatedProducts.map(product => (
                <motion.div 
                  key={product.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={styles.productCard} 
                  whileHover={{ y: -8 }}
                >
                  <div className={styles.productImageWrapper}>
                     <img src={product.img} alt={product.name} onError={(e) => e.target.src = 'https://placehold.co/400x300?text=Fishing+Gear'} />
                     <span className={styles.categoryBadge}>{product.category}</span>
                  </div>
                  <div className={styles.productInfo}>
                     <h3 className={styles.productName}>{product.name}</h3>
                     <div className={styles.productPrice}>{product.price}</div>
                     <button className={styles.buyBtn}>Ver Detalhes</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* PAGINAÇÃO */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                disabled={currentPage === 1} 
                onClick={() => handlePageChange(currentPage - 1)}
                className={styles.pageArrow}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`${styles.pageNumber} ${currentPage === page ? styles.pageActive : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(currentPage + 1)}
                className={styles.pageArrow}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MarketplacePage;