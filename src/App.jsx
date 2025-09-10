// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
// Importe seus componentes e páginas
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Footer from './components/Footer';
import FormularioPage from './pages/Formulario';
import KayakFormulario from './pages/KayakFormulario';

function App() {
  console.log("🔄 App iniciado - carregando BrowserRouter");

  return (
    <BrowserRouter>
      {console.log("📌 Renderizando Navbar")}
      <Navbar />

      <div style={{ flex: 1 }}>
        {console.log("🛣️ Definindo rotas da aplicação")}
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {console.log("🏠 Rota '/' acessada -> HomePage carregada")}
                <HomePage />
              </>
            } 
          />
          <Route 
            path="/sobre" 
            element={
              <>
                {console.log("ℹ️ Rota '/sobre' acessada -> AboutPage carregada")}
                <AboutPage />
              </>
            } 
          />
          <Route 
            path="/inscricao" 
            element={
              <>
                {console.log("📝 Rota '/inscricao' acessada -> FormularioPage carregada")}
                <FormularioPage />
              </>
            } 
          />
          <Route 
            path="/kayak" 
            element={
              <>
                {console.log("📝 Rota '/inscricao' acessada -> FormularioPage carregada")}
                <KayakFormulario />
              </>
            } 
          />
        </Routes>
      </div>

      {console.log("📌 Renderizando Footer")}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
