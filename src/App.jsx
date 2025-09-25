// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react'; // Importe useEffect para hooks
import ScrollToTop from './components/ScrollToTop';

// Importe seus componentes e páginas
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Footer from './components/Footer'; 
import FormularioPage from './pages/Formulario' ;
import FormularioKayakPage from './pages/FormularioKayak';
import ConfirmacaoEmail from './pages/ConfirmacaoEmail';

console.log('App.jsx carregado!'); // Log no carregamento do arquivo

function App() {
  console.log('O componente App foi renderizado!'); // Log na renderização do componente

  // Use useEffect para logs de ciclo de vida
  useEffect(() => {
    console.log('O componente App foi montado!');
    return () => {
      console.log('O componente App será desmontado!');
    };
  }, []); // O array vazio garante que o efeito rode apenas uma vez

  return (
    <BrowserRouter>
    <ScrollToTop />
      {console.log('Componente BrowserRouter renderizado.')}
      <Navbar />
      <div style={{ flex: 1 }}> {/* Div para empurrar o footer para baixo */}
        <Routes>
          {console.log('Componente Routes renderizado.')}
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/inscricao" element={<FormularioPage />} /> {/* Rota do formulário */}
          <Route path='/inscricao-caiaque' element={<FormularioKayakPage/>} /> {/* Rota do formulário de caiaque */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/confirmar-email" element={<ConfirmacaoEmail />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App