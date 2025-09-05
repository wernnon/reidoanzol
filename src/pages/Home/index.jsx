import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import styles from './Home.module.css';

import pesca1 from '../../assets/pesca1.jpg';
import pesca2 from '../../assets/pesca2.jpg';
import pesca3 from '../../assets/pesca3.jpg';
import pesca4 from '../../assets/pesca4.jpeg';

function HomePage() {
  return (
    <main className={styles.homeContainer}>
      <title>PVH Pesca Show - O Festival de Pesca de Porto Velho</title>
      
      {/* Seção Principal com Carrossel e Texto */}
      <div className={styles.homeLayout}>
        <div className={styles.carouselWrapper}>
          <Carousel 
            autoPlay={true} 
            infiniteLoop={true} 
            showThumbs={false} 
            showStatus={false}
            showArrows={false}
            interval={5000}
          >
            <div>
              <img src={pesca1} alt="Homem pescando em um barco ao amanhecer" />
              <p className="legend">PVH Pesca Show em Vila Nova de Teotônio</p>
            </div>
            <div>
              <img src={pesca2} alt="Peixe tucunaré sendo segurado por um pescador" />
              <p className="legend">A Emoção da Pesca Esportiva</p>
            </div>
            <div>
              <img src={pesca3} alt="Paisagem de um rio amazônico com céu azul" />
              <p className="legend">Valorizando a Cultura Ribeirinha</p>
            </div>
            <div>
              <img src={pesca4} alt="Pescador arremessando a linha na água" />
              <p className="legend">Técnicas e Estratégias de Pesca</p>
            </div>
          </Carousel>
        </div>
        
        <div className={styles.content}>
          <h1>PVH Pesca Show: Mais que um Torneio, uma Celebração!</h1>
          <p>
            O Festival de Pesca Esportiva foi criado para fomentar o turismo, valorizar a cultura local e incentivar a prática sustentável da pesca. 
            É uma celebração da nossa cultura, gastronomia e do turismo de base comunitária.
          </p>
          <p>
            Não fique de fora deste grande evento! Mostre sua paixão pela pesca, junte-se a nós e faça parte desta experiência única.
          </p>
          
          <div className={styles.buttonContainer}>
            <Link to="/" className={styles.actionButton}>
              Inscreva-se agora no Torneio
            </Link>
          </div>
        </div>
      </div>

      {/* --- NOVA SEÇÃO: ESTRUTURA DO EVENTO --- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Estrutura Completa Para Você</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🍽️</span>
            <h3>Área Gastronômica</h3>
            <p>Barracas com pratos típicos da região, com destaque para o pescado fresco.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎨</span>
            <h3>Espaço do Artesanato</h3>
            <p>Tendas para exposição e venda de produtos artesanais que representam a cultura local.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎶</span>
            <h3>Palco Principal</h3>
            <p>Apresentações musicais e culturais com os melhores artistas regionais.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎣</span>
            <h3>Área de Competição</h3>
            <p>Espaço seguro e delimitado para o torneio, com suporte de equipe técnica especializada.</p>
          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO: BENEFÍCIOS DO FESTIVAL --- */}
      <section className={`${styles.section} ${styles.benefitsSection}`}>
        <div className={styles.benefitContent}>
          <h2 className={styles.sectionTitle}>Um Evento que Fortalece a Nossa Região</h2>
          <ul>
            <li>Fomenta o turismo e movimenta a economia local.</li>
            <li>Valoriza a cultura ribeirinha e a tradição pesqueira.</li>
            <li>Oferece ampla visibilidade para parceiros e patrocinadores.</li>
            <li>Reúne esporte, lazer, cultura e gastronomia em um só lugar.</li>
          </ul>
        </div>
        <div className={styles.benefitImage}>
          <img src={pesca2} alt="Pescador exibindo um peixe tucunaré" />
        </div>
      </section>

    </main>
  );
}

export default HomePage;