// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Importe seus componentes e páginas
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Footer from './components/Footer'; 
import FormularioPage from './pages/Formulario' ;
import FormularioKayakPage from './pages/FormularioKayak';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/inscricao" element={<FormularioPage />} />
          <Route path="/inscricao-caiaque" element={<FormularioKayakPage />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App