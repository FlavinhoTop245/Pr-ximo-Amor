import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

// Páginas
import SobreNos from './pages/SobreNos';
import Vagas from './pages/Vagas';
import Perfil from './pages/Perfil';
import Mensagens from './pages/Mensagens';
import Notificacoes from './pages/Notificacoes';
import NovaVaga from './pages/NovaVaga';
import AuthEmpresa from './pages/AuthEmpresa';
import DashboardEmpresa from './pages/DashboardEmpresa';
import GestaoCandidatos from './pages/GestaoCandidatos';
import GestaoContratos from './pages/GestaoContratos';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Dashboard />
        <Routes>
          <Route path="/" element={<SobreNos />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/vagas" element={<Vagas />} />
          <Route path="/nova-vaga" element={<NovaVaga />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          
          {/* Rotas de Empresa */}
          <Route path="/empresa/login" element={<AuthEmpresa />} />
          <Route path="/empresa/dashboard" element={<DashboardEmpresa />} />
          <Route path="/empresa/candidatos" element={<GestaoCandidatos />} />
          <Route path="/empresa/contratos" element={<GestaoContratos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
