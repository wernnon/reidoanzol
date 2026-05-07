import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Ícones
import { 
  FaMapMarkerAlt, FaWind, FaTint, FaUmbrella, FaSun, 
  FaArrowDown, FaArrowUp, FaFish, FaCloudRain, FaLightbulb, FaRegClock 
} from 'react-icons/fa';
import { 
  WiDayCloudy, WiMoonAltFull, WiMoonAltNew, WiMoonAltFirstQuarter, 
  WiMoonAltThirdQuarter, WiBarometer, WiHumidity, WiNightClear, WiSunrise, WiSunset 
} from 'react-icons/wi';
import { GiFishingHook, GiWaveCrest, GiRiver, GiWaterDrop } from 'react-icons/gi';

import styles from './Previsao.module.css';

// --- LOCAIS DE PESCA EM RONDÔNIA ---
const RONDONIA_SPOTS = {
  madeira: {
    id: 'madeira', name: "Rio Madeira", location: "Porto Velho, RO", lat: -8.7619, lon: -63.9039,
    riverLevel: "15.8m", riverTrend: "Baixando", waterTemp: "28°C", waterClarity: "Barrenta",
    targetSpecies: ["Piraíba", "Pirarara", "Jau", "Cachorra"]
  },
  guapore: {
    id: 'guapore', name: "Rio Guaporé", location: "Costa Marques, RO", lat: -12.4367, lon: -64.2281,
    riverLevel: "6.4m", riverTrend: "Estável", waterTemp: "29°C", waterClarity: "Cristalina",
    targetSpecies: ["Tucunaré", "Tambaqui", "Cachara", "Pirapitinga"]
  },
  mamore: {
    id: 'mamore', name: "Rio Mamoré", location: "Guajará-Mirim, RO", lat: -10.7828, lon: -65.3394,
    riverLevel: "11.2m", riverTrend: "Subindo", waterTemp: "27°C", waterClarity: "Turva",
    targetSpecies: ["Dourada", "Barbado", "Pacu", "Surubim"]
  },
  machado: {
    id: 'machado', name: "Rio Machado", location: "Ji-Paraná, RO", lat: -10.8735, lon: -61.9442,
    riverLevel: "8.1m", riverTrend: "Baixando Rápido", waterTemp: "28.5°C", waterClarity: "Semi-turva",
    targetSpecies: ["Cachorra", "Tucunaré", "Matrinxã", "Apapá"]
  }
};

// --- FUNÇÕES DE LÓGICA E ALGORITMOS ---

// 1. Interpretação do Clima e Fundo
const getWeatherInterpretation = (code, isDay) => {
  if (code === 0) return { text: "Céu Limpo", icon: isDay ? <FaSun className={styles.iconSun} /> : <WiNightClear className={styles.iconMoon} />, bg: isDay ? "linear-gradient(120deg, #2980b9, #6dd5fa)" : "linear-gradient(to bottom, #0f2027, #203a43)" };
  if (code >= 1 && code <= 3) return { text: "Nublado", icon: <WiDayCloudy className={styles.iconCloud} />, bg: isDay ? "linear-gradient(to bottom, #757f9a, #d7dde8)" : "linear-gradient(to bottom, #141e30, #243b55)" };
  if (code >= 51 && code <= 67) return { text: "Chuva / Garoa", icon: <FaCloudRain className={styles.iconRain} />, bg: "linear-gradient(to bottom, #3a7bd5, #3a6073)" };
  if (code >= 71 && code <= 99) return { text: "Tempestade", icon: <FaUmbrella className={styles.iconRain} />, bg: "linear-gradient(to bottom, #232526, #414345)" };
  return { text: "Indefinido", icon: <WiDayCloudy />, bg: "linear-gradient(to bottom, #1e3c72, #2a5298)" };
};

// 2. Cálculo Real da Fase da Lua Atual (CORRIGIDO)
const getMoonPhase = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();
  
  // CORREÇÃO AQUI: Declarando as variáveis corretamente para o Strict Mode
  let c = 0, e = 0, jd = 0, b = 0; 
  
  if (month < 3) { year--; month += 12; }
  ++month; c = 365.25 * year; e = 30.6 * month;
  jd = c + e + day - 694039.09; 
  jd /= 29.5305882; 
  b = parseInt(jd); jd -= b; 
  b = Math.round(jd * 8); 
  if (b >= 8) b = 0;
  
  switch(b) {
    case 0: return { name: "Lua Nova", icon: <WiMoonAltNew /> };
    case 1: case 2: return { name: "Crescente", icon: <WiMoonAltFirstQuarter /> };
    case 3: case 4: return { name: "Lua Cheia", icon: <WiMoonAltFull /> };
    case 5: case 6: return { name: "Minguante", icon: <WiMoonAltThirdQuarter /> };
    case 7: return { name: "Lua Nova", icon: <WiMoonAltNew /> };
    default: return { name: "Lua Cheia", icon: <WiMoonAltFull /> };
  }
};

// 3. Algoritmo de Probabilidade de Pesca baseado no Clima Real
const calculateFishingScore = (temp, wind, pressure, weatherCode) => {
  let score = 50; 
  // Temperatura
  if (temp >= 24 && temp <= 29) score += 20; 
  else if (temp > 29 && temp <= 33) score += 5;
  else score -= 10;
  // Vento
  if (wind < 12) score += 15;
  else if (wind > 20) score -= 20;
  // Pressão (Pesca prefere pressão alta e estável)
  if (pressure > 1012) score += 15;
  else if (pressure < 1008) score -= 10;
  // Chuva leve anima o peixe, tempestade afunda
  if (weatherCode >= 51 && weatherCode <= 63) score += 10;
  if (weatherCode > 70) score -= 30;

  score = Math.max(10, Math.min(score, 100)); // Trava entre 10 e 100
  
  let text = "Baixa"; let color = "#ff4d4f";
  if (score > 80) { text = "Excelente"; color = "#00e676"; }
  else if (score > 60) { text = "Boa"; color = "#fbc531"; }
  else if (score > 40) { text = "Moderada"; color = "#fa8231"; }

  return { score, text, color };
};

// 4. Gerador de Dicas Dinâmicas
const getGuideTip = (temp, wind, pressure) => {
  if (wind > 18) return "Vento forte! Evite iscas de superfície leves. Trabalhe jigs e iscas de fundo nas margens abrigadas.";
  if (pressure < 1008) return "Pressão atmosférica em queda. O peixe tende a ficar letárgico no fundo. Pesque lento e com iscas naturais.";
  if (temp > 32) return "Água muito quente na superfície. Busque estruturas mais profundas ou pesque no início da manhã e final da tarde.";
  if (temp >= 24 && temp <= 29) return "Clima ideal! Dia perfeito para abusar das iscas de superfície (Zaras, Poppers) próximo às galhadas.";
  return "Condições normais. Varie os trabalhos de isca até encontrar o padrão do dia.";
};


function PrevisaoPage() {
  const { t } = useTranslation();
  const [selectedSpotKey, setSelectedSpotKey] = useState('madeira');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const spot = RONDONIA_SPOTS[selectedSpotKey];

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${spot.lat}&longitude=${spot.lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=sunrise,sunset&timezone=America%2FPorto_Velho&forecast_days=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        const current = data.current;
        const daily = data.daily;
        const interpretation = getWeatherInterpretation(current.weather_code, current.is_day);
        const fishingMetrics = calculateFishingScore(current.temperature_2m, current.wind_speed_10m, current.surface_pressure, current.weather_code);
        const moon = getMoonPhase();
        const tip = getGuideTip(current.temperature_2m, current.wind_speed_10m, current.surface_pressure);

        // Formatar horários do Sol
        const formatTime = (isoString) => new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setWeatherData({
          tempNum: current.temperature_2m,
          temp: `${Math.round(current.temperature_2m)}°C`,
          humidity: `${current.relative_humidity_2m}%`,
          wind: `${Math.round(current.wind_speed_10m)} km/h`,
          pressure: `${Math.round(current.surface_pressure)} hPa`,
          precipitation: `${current.precipitation} mm`,
          sunrise: formatTime(daily.sunrise[0]),
          sunset: formatTime(daily.sunset[0]),
          isDay: current.is_day === 1,
          fishingActivity: fishingMetrics,
          moon: moon,
          guideTip: tip,
          ...interpretation
        });
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [spot.lat, spot.lon]);

  return (
    <main className={styles.forecastContainer}>
      <div className={styles.ambientBackground} style={{ background: weatherData ? weatherData.bg : '#000b18' }}></div>

      <section className={styles.contentWrapper}>
        
        <header className={styles.header}>
          <h2>{t('forecast.title', 'Radar do Pescador')}</h2>
          <p className={styles.subtitle}>Cruze os dados meteorológicos reais com a inteligência do pescador.</p>
        </header>

        {/* SELETOR */}
        <div className={styles.spotSelector}>
          {Object.values(RONDONIA_SPOTS).map(s => (
            <button 
              key={s.id}
              className={`${styles.spotBtn} ${selectedSpotKey === s.id ? styles.activeSpot : ''}`}
              onClick={() => setSelectedSpotKey(s.id)}
            >
              <GiRiver className={styles.spotIcon} />
              <div className={styles.spotText}>
                <strong>{s.name}</strong>
                <span>{s.location}</span>
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* CORREÇÃO: Adicionado o || !weatherData para proteger a tela */}
          {loading || !weatherData ? (
            <motion.div key="loading" className={styles.loadingBox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WiDayCloudy className={styles.spinIcon} />
              <p>Analisando os ventos em {spot.location}...</p>
            </motion.div>
  
          ) : (
            <motion.div 
              key={spot.id}
              className={styles.dashboardGrid}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* CARD 1: CLIMA PRINCIPAL */}
              <div className={`${styles.card} ${styles.weatherCard}`}>
                <div className={styles.weatherHeader}>
                  <div className={styles.locationBadge}>
                    <FaMapMarkerAlt className={styles.iconAccent} /> {spot.location}
                  </div>
                  <span className={styles.liveBadge}>🔴 AO VIVO</span>
                </div>

                <div className={styles.weatherMain}>
                  {weatherData.icon}
                  <div className={styles.tempBox}>
                    <h1>{weatherData.temp}</h1>
                    <span>{weatherData.text}</span>
                  </div>
                </div>

                <div className={styles.weatherGrid}>
                  <div className={styles.detailItem}>
                    <WiHumidity className={styles.detailIconHuge} /> 
                    <div><small>Umidade</small><br/><strong>{weatherData.humidity}</strong></div>
                  </div>
                  <div className={styles.detailItem}>
                    <FaWind className={styles.detailIcon} /> 
                    <div><small>Vento</small><br/><strong>{weatherData.wind}</strong></div>
                  </div>
                  <div className={styles.detailItem}>
                    <WiBarometer className={styles.detailIconHuge} /> 
                    <div><small>Pressão</small><br/><strong>{weatherData.pressure}</strong></div>
                  </div>
                  <div className={styles.detailItem}>
                    <FaTint className={styles.detailIcon} /> 
                    <div><small>Chuva Atual</small><br/><strong>{weatherData.precipitation}</strong></div>
                  </div>
                </div>
              </div>

              {/* CARD 2: DICA DO PILOTEIRO (NOVO) */}
              <div className={`${styles.card} ${styles.tipCard}`}>
                <h3 className={styles.cardTitle}><FaLightbulb color="#fbc531"/> Dica do Piloteiro (Tempo Real)</h3>
                <div className={styles.tipContent}>
                  <p>{weatherData.guideTip}</p>
                </div>
                <div className={styles.speciesSection}>
                  <h5><FaFish /> Alvos na Região</h5>
                  <div className={styles.speciesTags}>
                    {spot.targetSpecies.map((species, i) => (
                      <span key={i} className={styles.speciesTag}>{species}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARD 3: PREVISÃO DE AÇÃO (CALCULADA) */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}><GiFishingHook /> Índice de Ação</h3>
                <div className={styles.activitySection}>
                  <div className={styles.activityHeader}>
                    <span>Qualidade do Dia</span>
                    <span className={styles.statusBadge} style={{backgroundColor: weatherData.fishingActivity.color + '40', color: weatherData.fishingActivity.color, border: `1px solid ${weatherData.fishingActivity.color}`}}>
                      {weatherData.fishingActivity.text}
                    </span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <motion.div 
                      className={styles.progressBarFill} 
                      initial={{ width: 0 }} 
                      animate={{ width: `${weatherData.fishingActivity.score}%` }} 
                      transition={{ duration: 1.5, delay: 0.2, type: 'spring' }}
                      style={{ background: weatherData.fishingActivity.color }}
                    />
                  </div>
                  <p className={styles.scoreText}>{weatherData.fishingActivity.score}/100 de chances de sucesso baseadas no clima atual.</p>
                </div>
              </div>

              {/* CARD 4: HORÁRIOS E LUA (NOVO) */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}><FaRegClock /> Ciclo Solar & Lunar</h3>
                <div className={styles.sunMoonGrid}>
                  <div className={styles.sunMoonItem}>
                    <WiSunrise className={styles.sunIcon} />
                    <div className={styles.sunText}>
                      <small>Nascer do Sol</small>
                      <strong>{weatherData.sunrise}</strong>
                    </div>
                  </div>
                  <div className={styles.sunMoonItem}>
                    <WiSunset className={styles.sunIcon} />
                    <div className={styles.sunText}>
                      <small>Pôr do Sol</small>
                      <strong>{weatherData.sunset}</strong>
                    </div>
                  </div>
                  <div className={styles.sunMoonItem}>
                    <span className={styles.moonIconWrap}>{weatherData.moon.icon}</span>
                    <div className={styles.sunText}>
                      <small>Fase Atual</small>
                      <strong>{weatherData.moon.name}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 5: ÁGUA (ESTÁTICO/INFORMATIVO) */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}><GiWaveCrest /> Estado do Rio</h3>
                <div className={styles.waterInfo}>
                  <div className={styles.waterData}>
                    <span className={styles.label}>Nível</span>
                    <span className={styles.valueHighlight}>{spot.riverLevel}</span>
                  </div>
                  <div className={styles.waterData}>
                    <span className={styles.label}>Tendência</span>
                    <span className={spot.riverTrend.includes('Baixando') ? styles.trendDown : styles.trendUp}>
                      {spot.riverTrend.includes('Baixando') ? <FaArrowDown /> : <FaArrowUp />} {spot.riverTrend}
                    </span>
                  </div>
                  <div className={styles.waterData}>
                    <span className={styles.label}>Visibilidade</span>
                    <span className={styles.value}><GiWaterDrop color="#00cec9"/> {spot.waterClarity}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </main>
  );
}

export default PrevisaoPage;