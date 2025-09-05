// src/components/Home/index.jsx

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
      <title>Rei do Anzol - Competição de Pesca em Porto Velho</title>
      {/* O contêiner pai do carrossel agora tem os cantos arredondados e a sombra */}
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
            <p className="legend">6º Torneio de Pesca Esportiva de Extrema</p>
          </div>
          <div>
            <img src={pesca2} alt="Peixe tucunaré sendo segurado por um pescador" />
            <p className="legend">A Emoção de Fisgar um Tucunaré</p>
          </div>
          <div>
            <img src={pesca3} alt="Paisagem de um rio amazônico com céu azul" />
            <p className="legend">Paisagens Únicas de Rondônia</p>
          </div>
          <div>
            <img src={pesca4} alt="Pescador arremessando a linha na água" />
            <p className="legend">Técnicas de Arremesso Profissional</p>
          </div>
        </Carousel>

        {/* Adiciona o ícone de anzol sobre o carrossel */}
        <div className={styles.iconOverlay}>
            <span className={styles.hookIcon}>🎣</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <h1>Rei do Anzol: A Principal Competição de Porto Velho</h1>
        <p>
          🎣 Está lançado o desafio!
          <p/>
          Mostre que você tem habilidade, estratégia e paixão pela pesca na competição Rei do Anzol. Uma disputa emocionante que vai coroar o verdadeiro mestre das águas.
          <p/>
          Não fique de fora — inscreva-se agora e venha viver essa experiência única!
        </p>
        
        <div className={styles.buttonContainer}>
          
          <Link to="/" className={styles.actionButton}>
            Realize a sua inscrição
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;