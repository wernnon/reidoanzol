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
      
      {/* Novo contêiner para o layout flex */}
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
              [cite_start]<p className="legend">PVH Pesca Show em Vila Nova de Teotônio [cite: 3]</p>
            </div>
            <div>
              <img src={pesca2} alt="Peixe tucunaré sendo segurado por um pescador" />
              <p className="legend">A Emoção da Pesca Esportiva</p>
            </div>
            <div>
              <img src={pesca3} alt="Paisagem de um rio amazônico com céu azul" />
              [cite_start]<p className="legend">Valorizando a Cultura Ribeirinha [cite: 68]</p>
            </div>
            <div>
              <img src={pesca4} alt="Pescador arremessando a linha na água" />
              <p className="legend">Técnicas e Estratégias de Pesca</p>
            </div>
          </Carousel>
        </div>
        
        <div className={styles.content}>
          [cite_start]<h1>PVH Pesca Show: Mais que um Torneio, uma Celebração! [cite: 204]</h1>
          <p>
            [cite_start]O Festival de Pesca Esportiva foi criado para fomentar o turismo, valorizar a cultura local e incentivar a prática sustentável da pesca[cite: 11]. 
            [cite_start]É uma celebração da nossa cultura, gastronomia e do turismo de base comunitária, fortalecendo a economia e as tradições da nossa região[cite: 12, 68].
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
    </main>
  );
}

export default HomePage;