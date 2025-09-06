import styles from './About.module.css';

// ADICIONE AS IMAGENS NA SUA PASTA 'src/assets'
import heroImage from '../../assets/local-evento.jpg'; // Imagem principal para o topo
import eventImage1 from '../../assets/evento-foto-1.jpeg'; // Foto de um evento passado
import eventImage2 from '../../assets/evento-foto-2.jpeg'; // Foto de um evento passado
import eventImage3 from '../../assets/evento-foto-3.jpeg'; // Foto de um evento passado

function AboutPage() {
  return (
    <main className={styles.aboutContainer}>
      <title>Sobre a SOPESCAR</title>

      {/* --- Seção Hero --- */}
      <header className={styles.heroSection} style={{ backgroundImage: `url(${heroImage})` }}>
        <div className={styles.heroOverlay}>
          <h1>SOPESCAR</h1>
          <p>Promovendo a Paixão pela Pesca Esportiva em Rondônia</p>
        </div>
      </header>

      {/* --- Seção Quem Somos --- */}
      <section className={styles.section}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>Nossa Missão</h2>
          <p>
            A SOPESCAR (Sociedade de Pesca Esportiva) é a força organizadora por trás dos maiores torneios de pesca da região. Nossa missão é fomentar o esporte, valorizar a cultura ribeirinha e garantir competições justas, seguras e memoráveis para todos os participantes, sempre com foco na sustentabilidade e no respeito ao meio ambiente.
          </p>
        </div>
      </section>

      {/* --- Seção O Que Fazemos --- */}
      <section className={`${styles.section} ${styles.activitiesSection}`}>
        <h2 className={styles.sectionTitle}>O Que Fazemos</h2>
        <div className={styles.activitiesGrid}>
          <div className={styles.activityCard}>
            <h3>Organização de Campeonatos</h3>
            <p>Planejamos e executamos torneios de pesca esportiva, como o famoso TOPAS, cuidando de toda a logística para uma experiência impecável[cite: 46].</p>
          </div>
          <div className={styles.activityCard}>
            <h3>Regras e Inscrições</h3>
            <p>Somos responsáveis por definir o regulamento das competições e gerenciar todo o processo de inscrição das equipes participantes[cite: 46].</p>
          </div>
          <div className={styles.activityCard}>
            <h3>Premiação e Reconhecimento</h3>
            <p>Garantimos uma premiação justa e atraente para os vencedores, celebrando o talento e a dedicação dos melhores pescadores[cite: 46].</p>
          </div>
          <div className={styles.activityCard}>
            <h3>Divulgação do Esporte</h3>
            <p>Em parceria com entidades como a SEMTEL, trabalhamos na divulgação dos eventos para fortalecer o turismo e a comunidade pesqueira local[cite: 50].</p>
          </div>
        </div>
      </section>
      
      {/* --- Seção de Galeria de Fotos --- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Momentos Inesquecíveis</h2>
        <p className={styles.sectionSubtitle}>Confira alguns registros de nossos últimos eventos.</p>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <img src={eventImage1} alt="Pescadores durante o torneio" />
          </div>
          <div className={styles.galleryItem}>
            <img src={eventImage2} alt="Premiação do evento de pesca" />
          </div>
          <div className={styles.galleryItem}>
            <img src={eventImage3} alt="Barcos alinhados para a largada" />
          </div>
        </div>
      </section>

    </main>
  );
}

export default AboutPage;