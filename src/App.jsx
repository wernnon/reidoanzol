// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react'; 
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

// Importe os seus componentes globais
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

// Importe as suas páginas
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import FormularioPage from './pages/Formulario';
import FormularioKayakPage from './pages/FormularioKayak';
import ConfirmacaoEmail from './pages/ConfirmacaoEmail';
import SorteioPage from './pages/Sorteio';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MarketplacePage from './pages/Marketplace';
import Previsao from './pages/Previsao';
import Diario from './pages/Diario';
import Piloteiros from './pages/Piloteiros';
import Campeonatos from './pages/Campeonatos';

console.log('App.jsx carregado!'); 

// ============================================================================
// LAYOUT PADRÃO: Tudo o que estiver aqui dentro terá Navbar em cima e Footer em baixo
// ============================================================================
const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <div className="content-wrap">
        <Outlet /> {/* Aqui é onde a Home ou o Marketplace vão aparecer */}
      </div>
      <Footer />
    </>
  );
};

function App() {
  console.log('O componente App foi renderizado!'); 

  useEffect(() => {
    console.log('O componente App foi montado!');
    return () => console.log('O componente App será desmontado!');
  }, []); 

  return (
    <BrowserRouter>
      {/* Sistema de Notificações Premium */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#0a192f',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#00e676', secondary: '#000' } }
        }} 
      />
      
      <ScrollToTop />
      
      <Routes>
        
        {/* --- GRUPO A: PÁGINAS COM NAVBAR E FOOTER (Usam o DefaultLayout) --- */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/inscricao" element={<FormularioPage />} /> 
          <Route path="/inscricao-caiaque" element={<FormularioKayakPage/>} /> 
          <Route path="/sorteio" element={<SorteioPage />} /> 
          
          {/* AQUI ESTÁ A ROTA DO MARKETPLACE! */}
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/previsao" element={<Previsao />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/piloteiros" element={<Piloteiros />} />
          <Route path="/campeonatos" element={<Campeonatos />} />
        </Route>

        {/* --- GRUPO B: PÁGINAS ISOLADAS (Ecrã inteiro de Vidro) --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/confirmar-email" element={<ConfirmacaoEmail />} />

        {/* --- ROTA CORINGA (404) --- Sempre no absoluto final do código! */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;