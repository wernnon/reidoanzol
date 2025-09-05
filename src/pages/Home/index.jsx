import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import styles from './Home.module.css';

// --- IMAGENS PRINCIPAIS ---
import pesca1 from '../../assets/pesca1.jpg';
import pesca2 from '../../assets/pesca2.jpg';
import pesca3 from '../../assets/pesca3.jpg';
import pesca4 from '../../assets/pesca4.jpeg';

// --- IMAGENS DAS NOVAS SEÇÕES ---
import sopescarLogo from '../../assets/sopescar-logo.png';
import semtelLogo from '../../assets/semtel-logo.png';
import localEventoImg from '../../assets/local-evento.jpg';
import estruturaLayoutImg from '../../assets/estrutura-layout.jpg';


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

      {/* Seção Estrutura do Evento */}
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

      {/* Seção Benefícios do Festival */}
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

      {/* Seção Data e Local */}
      <section className={`${styles.section} ${styles.eventInfoSection}`}>
        <div className={styles.eventInfoImage}>
          <img src={localEventoImg} alt="Vila Nova de Teotônio, local do evento" />
        </div>
        <div className={styles.eventInfoContent}>
          <h2 className={styles.sectionTitle}>Data e Local do Encontro</h2>
          <div className={styles.infoBox}>
            <h3>Data</h3>
            <p>27 e 28 de Setembro</p>
          </div>
          <div className={styles.infoBox}>
            <h3>Local</h3>
            <p>Tradicional Vila Nova de Teotônio</p>
          </div>
          <p className={styles.eventDescription}>
            O festival reunirá esporte, lazer, gastronomia e cultura regional em um único espaço, abrindo oficialmente as festividades de aniversário de Porto Velho.
          </p>
        </div>
      </section>

      {/* Seção Responsáveis */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Organização e Responsabilidades</h2>
        <p className={styles.sectionSubtitle}>A realização do festival é fruto da união de esforços entre parceiros.</p>
        <div className={styles.responsibilitiesGrid}>
          <div className={styles.responsibilityCard}>
            <img src={sopescarLogo} alt="Logo SOPESCAR" className={styles.orgLogo} />
            <h3>SOPESCAR</h3>
            <ul>
              <li>Regras e Inscrições</li>
              <li>Organização do Campeonato</li>
              <li>Premiação</li>
            </ul>
          </div>
          <div className={styles.responsibilityCard}>
            <img src={semtelLogo} alt="Logo SEMTEL" className={styles.orgLogo} />
            <h3>SEMTEL</h3>
            <ul>
              <li>Atrações regionais</li>
              <li>Estrutura do evento</li>
            </ul>
          </div>
          <div className={styles.responsibilityCard}>
            <div className={styles.orgLogoCombined}>
              <img src={semtelLogo} alt="Logo SEMTEL" className={styles.orgLogoSmall} />
              <img src={sopescarLogo} alt="Logo SOPESCAR" className={styles.orgLogoSmall} />
            </div>
            <h3>SEMTEL / SOPESCAR</h3>
            <ul>
              <li>Divulgação do evento</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seção Imagem da Estrutura */}
      <section className={`${styles.section} ${styles.fullWidthSection}`}>
        <h2 className={styles.sectionTitle}>Conheça o Espaço do Festival</h2>
        <div className={styles.structureImageContainer}>
          <img src={estruturaLayoutImg} alt="Implantação da estrutura do evento PVH Pesca Show" />
          <p>Layout funcional com a disposição de todos os espaços para uma melhor experiência.</p>
        </div>
      </section>

      {/* Seção Download PDF */}
      <section className={`${styles.section} ${styles.downloadSection}`}>
        <h2 className={styles.sectionTitle}>Regulamento e Informações Completas</h2>
        <p>Acesse a apresentação completa do evento para conferir todos os detalhes, regras e oportunidades.</p>
        <a 
          href="/atualizada PVH - PESCA SHOW.pdf" 
          download 
          className={styles.actionButton}
        >
          Baixar Apresentação em PDF
        </a>
      </section>

      {/* --- NOVA SEÇÃO: REGRAS DO TORNEIO --- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Regras do Torneio (XIII TOPAS)</h2>
        <div className={styles.rulesGrid}>
          
          <div className={styles.ruleCard}>
            <h3>📅 Datas e Local</h3>
            <p><strong>Data:</strong> 27 e 28 de setembro de 2025.</p>
            <p><strong>Local:</strong> Vila Nova Teotônio, nas águas do rio Madeira e afluentes, entre a Usina de Santo Antônio até a região de Morrinhos.</p>
          </div>

          <div className={styles.ruleCard}>
            <h3>🎣 Modalidades e Cronograma</h3>
            <ul>
              <li><strong>27/09 (Sábado):</strong> Caiaque Individual, das 07h30 às 12h30, no lago à margem esquerda da Vila.</li>
              <li><strong>28/09 (Domingo):</strong> Embarcada, com largada às 07h30 e término às 12h30.</li>
              <li>Ambas com tolerância de 30 minutos. Apuração e premiação à tarde.</li>
            </ul>
          </div>

          <div className={styles.ruleCard}>
            <h3>👥 Equipes e Participantes</h3>
            <ul>
              <li>Até 4 pessoas por embarcação.</li>
              <li>Menores de idade devem estar acompanhados por responsável legal.</li>
              <li><strong>Obrigatório:</strong> Todos devem possuir Carteira de Pesca válida.</li>
              <li><strong>Obrigatório:</strong> Uso de coletes salva-vidas durante o trajeto.</li>
              <li>O condutor da embarcação deve ter habilitação fluvial (ARRAIS).</li>
            </ul>
          </div>

          <div className={styles.ruleCard}>
            <h3>📏 Pontuação e Validação</h3>
            <ul>
              <li>A pontuação é baseada nos centímetros do peixe, com valores diferentes por espécie. Apenas um exemplar de cada espécie pontua.</li>
              <li>A captura, medição e soltura devem ser registradas em um <strong>vídeo de até 90 segundos, sem cortes.</strong></li>
              <li>A medição deve usar a régua oficial do evento.</li>
              <li>Vídeos de má qualidade ou que não mostrem a sobrevivência do peixe na soltura serão invalidados.</li>
            </ul>
          </div>

          <div className={styles.ruleCard}>
            <h3>🛠️ Equipamentos</h3>
            <p><strong>Permitidos:</strong> Carretilhas, molinetes, linha de mão, varas, iscas artificiais/naturais (conforme lei) e puçá.</p>
            <p><strong>Proibidos:</strong> Redes, tarrafas, espinhéis e garatéias. O uso destes itens causa <strong>desclassificação imediata</strong>.</p>
          </div>

          <div className={styles.ruleCard}>
            <h3>🏆 Premiação</h3>
            <ul>
              <li><strong>1º Lugar:</strong> Barco de alumínio 5,5m com motor 15 HP.</li>
              <li><strong>2º Lugar:</strong> Barco de alumínio 5,5m.</li>
              <li><strong>3º Lugar:</strong> Kit com 4 varas e carretilhas.</li>
              <li><strong>4º Lugar:</strong> 4 barracas de camping.</li>
              <li><strong>5º Lugar:</strong> 4 caixas de pesca.</li>
              <li>Haverá sorteio de brindes para competidores e público.</li>
            </ul>
          </div>

          <div className={styles.ruleCard}>
            <h3>📝 Inscrições</h3>
            <p><strong>Período:</strong> De 05 a 20 de setembro de 2025.</p>
            <p><strong>Como:</strong> Gratuitas, online em <strong>reidoanzolpvh.com</strong> ou em lojas de pesca credenciadas.</p>
            <p><strong>Brinde:</strong> Equipes inscritas até 20/09 garantem uma camiseta do torneio.</p>
          </div>

          <div className={styles.ruleCard}>
            <h3>⚖️ Critério de Desempate</h3>
            <p>Em caso de empate na pontuação, o critério para desempate será a <strong>maior variedade de espécies</strong> capturadas pela equipe.</p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default HomePage;