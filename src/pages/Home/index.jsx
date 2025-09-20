import { Link } from 'react-router-dom';
import React, { useState } from 'react'; // Movido para o topo para organização
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import styles from './Home.module.css';

// --- IMAGENS PRINCIPAIS ---
//import pesca1 from '../../assets/pesca1.jpg';
import pesca2 from '../../assets/pesca2.jpg';
import pesca3 from '../../assets/pesca3.jpg';
import pesca4 from '../../assets/pesca4.jpeg';

// --- IMAGENS DAS SEÇÕES ---
import sopescarLogo from '../../assets/sopescar-logo.png';
import semtelLogo2 from '../../assets/semtel-logo2.png';
import localEventoImg from '../../assets/local-evento.jpg';
import estruturaLayoutImg from '../../assets/estrutura-layout.jpg';
import gastronomiaIcon from '../../assets/gastronomia-icon.png';

// --- IMAGENS DOS PATROCINADORES ---
import logoPatrocinador from '../../assets/logo-patrocinador.png';
import logoPatrocinador2 from '../../assets/logo-patrocinador2.png';
import logoPatrocinador3 from '../../assets/logo-patrocinador3.png';
import logoPatrocinador4 from '../../assets/logo-patrocinador4.png';
import logoPatrocinador5 from '../../assets/logo-patrocinador5.png';


// --- COMPONENTE DAS REGRAS (Definido separadamente para melhor organização) ---
function RulesSection() {
  const [activeRules, setActiveRules] = useState('embarcado');

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Regras do Torneio (XIII TOPAS)</h2>

      <div className={styles.rulesToggle}>
        <button
          className={`${styles.toggleButton} ${activeRules === 'embarcado' ? styles.activeToggle : ''}`}
          onClick={() => setActiveRules('embarcado')}
        >
          Pesca Embarcada
        </button>
        <button
          className={`${styles.toggleButton} ${activeRules === 'caiaque' ? styles.activeToggle : ''}`}
          onClick={() => setActiveRules('caiaque')}
        >
          Pesca em Caiaque
        </button>
      </div>

      {/* REGRAS PARA PESCA EMBARCADA */}
      {activeRules === 'embarcado' && (
        <div className={styles.rulesGrid}>
          <div className={styles.ruleCard}>
            <h3>🏆 Premiação</h3>
            <div className={styles.cardPlaceholder}>
              <p>Prêmios a definir.</p>
              <span>Em breve, mais informações.</span>
            </div>
          </div>
          <div className={styles.ruleCard}>
            <h3>🎣 Cronograma (Embarcada)</h3>
            <ul>
              <li><strong>Data:</strong> Domingo, 28 de Setembro de 2025.</li>
              <li><strong>Horário:</strong> Largada às 07h30 e término às 12h30.</li>
              <li><strong>Tolerância:</strong> 30 minutos.</li>
              <li><strong>Apuração:</strong> À tarde, após o término.</li>
            </ul>
          </div>
          <div className={styles.ruleCard}>
            <h3>👥 Equipes e Participantes</h3>
            <ul>
              <li>Equipes de até 4 pessoas por embarcação.</li>
              <li>O condutor deve ter habilitação fluvial (ARRAIS).</li>
              <li><strong>Obrigatório:</strong> Uso de coletes salva-vidas durante o trajeto.</li>
              <li><strong>Obrigatório:</strong> Todos devem portar Carteira de Pesca válida.</li>
              <li>Menores devem estar acompanhados por responsável legal na embarcação.</li>
            </ul>
          </div>
          <div className={styles.ruleCard}>
            <h3>📍 Local (Embarcada)</h3>
            <p>Nas águas do rio Madeira e afluentes, entre o limite da Usina de Santo Antônio até a região de Morrinhos.</p>
          </div>
          <div className={styles.ruleCard}>
            <h3>📏 Pontuação e Validação</h3>
            <ul>
              <li>A pontuação é baseada nos centímetros de cada peixe (apenas um exemplar por espécie).</li>
              <li>A captura, medição e soltura devem ser registradas em um <strong>vídeo de até 90 segundos, sem cortes</strong>.</li>
              <li>O vídeo deve mostrar a sobrevivência do peixe na soltura.</li>
              <li>A medição deve usar as réguas oficiais do evento.</li>
            </ul>
          </div>
          <div className={styles.ruleCard}>
            <h3>🛠️ Equipamentos</h3>
            <p><strong>Permitidos:</strong> Carretilhas, molinetes, linha de mão, varas, iscas (conforme lei) e puçá.</p>
            <p><strong>Proibidos:</strong> Redes, tarrafas, espinhéis e garatéias (uso causa desclassificação).</p>
          </div>
        </div>
      )}

      {/* REGRAS PARA PESCA EM CAIAQUE */}
      {activeRules === 'caiaque' && (
        <div className={styles.rulesGrid}>
          <div className={styles.ruleCard}>
            <h3>🏆 Premiação (Caiaque)</h3>
            <div className={styles.cardPlaceholder}>
              <p>Prêmios a definir.</p>
              <span>Em breve, mais informações.</span>
            </div>
          </div>
          <div className={styles.ruleCard}>
            <h3>🛶 Cronograma (Caiaque)</h3>
            <ul>
              <li><strong>Data:</strong> Sábado, 27 de Setembro de 2025.</li>
              <li><strong>Modalidade:</strong> Caiaque Individual.</li>
              <li><strong>Horário:</strong> Abertura às 07h30 e término às 12h30.</li>
              <li><strong>Tolerância:</strong> 30 minutos.</li>
              <li><strong>Apuração:</strong> À tarde, após o término.</li>
            </ul>
          </div>
           <div className={styles.ruleCard}>
            <h3>📍 Local (Caiaque)</h3>
            <p>A pesca ocorrerá exclusivamente no lago localizado à margem esquerda da Vila Nova Teotônio.</p>
          </div>
          <div className={styles.ruleCard}>
            <h3>📜 Regras Gerais</h3>
            <p>As regras de <strong>Inscrição, Pontuação, Validação por Vídeo, Equipamentos</strong> e critérios de <strong>Desempate</strong> seguem o regulamento principal do torneio.</p>
          </div>
        </div>
      )}
    </section>
  );
}


// --- COMPONENTE PRINCIPAL DA PÁGINA ---
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
              <img src={localEventoImg} alt="1º FESTIVAL DE PESCA - VILA NOVA DE TEOTÔNIO" />
              <p className="legend">1º FESTIVAL DE PESCA - VILA NOVA DE TEOTÔNIO</p>
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
        
         <div className={styles.buttonContainer}>
            <Link to="/inscricao" className={styles.actionButton}>
              Inscreva-se agora no Torneio
            </Link>
            {/* BOTÃO ALTERADO */}
            <button 
              className={`${styles.actionButton} ${styles.disabledButton}`} 
              disabled
            >
              Inscrição Caiaque (Esgotado)
            </button>
          
        </div>
      </div>

      {/* Seção Estrutura do Evento */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Estrutura Completa Para Você</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <img src={gastronomiaIcon} alt="Ícone da Área Gastronômica" className={styles.featureImageIcon} />
            <h3>Área Gastronômica</h3>
            <p>Barracas com pratos típicos da região, com destaque para o pescado.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎨</span>
            <h3>Espaço do Artesanato</h3>
            <p>Tendas para exposição e venda de produtos artesanais locais.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎶</span>
            <h3>Palco Principal</h3>
            <p>Para apresentações musicais e culturais com artistas regionais.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎣</span>
            <h3>Área de Competição</h3>
            <p>Espaço delimitado para o torneio de pesca, com segurança e equipe técnica.</p>
          </div>
        </div>
      </section>

      {/* Seção Benefícios do Festival */}
      <section className={`${styles.section} ${styles.benefitsSection}`}>
        <div className={styles.benefitContent}>
          <h2 className={styles.sectionTitle}>Um Evento que Fortalece a Nossa Região</h2>
          <ul>
            <li>Fomenta o turismo e movimenta a economia local.</li>
            <li>Valoriza a cultura ribeirinha.</li>
            <li>Oferece ampla visibilidade.</li>
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
            <p>27 e 28 de setembro de 2025</p>
          </div>
          <div className={styles.infoBox}>
            <h3>Local</h3>
            <p>Tradicional Vila Nova de Teotônio / Porto Velho - Rondônia</p>
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
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={sopescarLogo} alt="Logo SOPESCAR" className={styles.orgLogo} />
            </a>
            <h3>SOPESCAR</h3>
            <ul>
              <li>Regras e Inscrições</li>
              <li>Organização do Campeonato</li>
              <li>Premiação</li>
            </ul>
          </div>
          <div className={styles.responsibilityCard}>
            <a href="https://www.portovelho.ro.gov.br/artigo/49898/reestruturacao-secretaria-municipal-de-turismo-esporte-e-lazer-chega-para-fortalecer-as-acoes-e-se-aproximar-da-populacao" target="_blank" rel="noopener noreferrer">
              <img src={semtelLogo2} alt="Logo SEMTEL" className={styles.orgLogo} />
            </a>
            <h3>SEMTEL</h3>
            <ul>
              <li>Atrações regionais</li>
              <li>Estrutura do evento</li>
            </ul>
          </div>
          <div className={styles.responsibilityCard}>
            <div className={styles.orgLogoCombined}>
              <img src={semtelLogo2} alt="Logo SEMTEL" className={styles.orgLogoSmall} />
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

      {/* Seção de Downloads */}
      <section className={`${styles.section} ${styles.downloadSection}`}>
        <div className={styles.downloadContent}>
          <h2 className={styles.sectionTitle}>Informações Completas</h2>
          <p>Acesse a apresentação e os regulamentos do evento para conferir todos os detalhes.</p>
          <div className={styles.downloadButtonsContainer}>
            <a 
              href="/APRESENTAÇÃO-PVH-PESCA-SHOW.pdf" 
              download
              className={styles.actionButton}
            >
              Baixar Apresentação
            </a>
            <a 
              href="/REGULAMENTO-PVH-PESCA-SHOW.pdf"
              download="REGULAMENTO-PVH-PESCA-EMBARCADA.pdf"  
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              Regulamento (Pesca Embarcada)
            </a>
            <a 
              href="/REGULAMENTO-PVH-PESCA-CAIAQUE.pdf"
              download="REGULAMENTO-PVH-PESCA-CAIAQUE.pdf"  
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              Regulamento (Pesca em Caiaque)
            </a>
          </div>
        </div>
      </section>
      
      {/* AQUI VOCÊ CHAMA O COMPONENTE DE REGRAS */}
      <RulesSection />

      {/* Seção de Patrocinadores */}
      <section className={`${styles.section} ${styles.sponsorsSection}`}>
        <h2 className={styles.sectionTitle}>Nossos Patrocinadores</h2>
        <div className={styles.sponsorsGrid}>
          <div className={styles.sponsorItem}>
            <img src={logoPatrocinador} alt="Logo Empório de Pescados" />
            <p>Empório de Pescados</p>
          </div>
          <div className={styles.sponsorItem}>
            <img src={logoPatrocinador2} alt="Logo Ademicon" />
            <p>Ademicon Consórcio</p>
          </div>
          <div className={styles.sponsorItem}>
            <img src={logoPatrocinador3} alt="Logo Lounge Sushi Bar" />
            <p>Lounge Sushi Bar</p>
          </div>
          <div className={styles.sponsorItem}>
            <img src={logoPatrocinador4} alt="Logo Marquinhos Variedades" />
            <p>Marquinhos Variedades</p>
          </div>
          <div className={styles.sponsorItem}>
            <img src={logoPatrocinador5} alt="Logo Ponce Energia" />
            <p>Ponce Energia</p>
          </div>
        </div>
      </section>
      
    </main>
  );
}

export default HomePage;