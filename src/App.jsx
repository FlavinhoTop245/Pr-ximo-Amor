import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HeartHandshake, Briefcase, User, MessageSquare, Bell, Search, Star, MessageCircle, MapPin, Building2, CheckCircle2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/logo.png" alt="Logo Árvore" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', backgroundColor: 'transparent' }} />
        Próximo Amor
      </div>
      <div className="nav-links">
        <Link to="/sobre-nos" className={path === '/sobre-nos' || path === '/' ? 'active' : ''}>Sobre Nós</Link>
        <Link to="/vagas" className={path === '/vagas' ? 'active' : ''}>Vagas</Link>
        <Link to="/perfil" className={path === '/perfil' ? 'active' : ''}>Perfil</Link>
        <Link to="/mensagens" className={path === '/mensagens' ? 'active' : ''}>Mensagens</Link>
      </div>
      <div className="nav-actions">
        <Link to="/notificacoes" className="btn-icon badge">
          <Bell size={20} />
        </Link>
        <button className="btn-icon">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

const SobreNos = () => (
  <div className="page-container glass" style={{ borderRadius: 'var(--radius-lg)' }}>
    <div className="section-header">
      <h1 className="section-title">Muito mais que vagas. Uma ponte de impacto social.</h1>
      <p className="section-subtitle">O Próximo Amor conecta talentos temporários e voluntários qualificados a empresas dispostas a colaborar por uma causa maior.</p>
    </div>

    <div className="grid grid-cols-2 gap-6 mt-4">
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
          <Building2 size={24} /> Para Empresas
        </h3>
        <p>Encontre profissionais dedicados enquanto fomenta uma cultura de impacto e desenvolvimento de soft skills através do voluntariado corporativo.</p>
      </div>
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
          <HeartHandshake size={24} /> Para Voluntários
        </h3>
        <p>Ofereça seus serviços por uma causa, ganhe experiência prática, avaliações para seu portfólio e expanda seu networking com empresas parceiras.</p>
      </div>
    </div>
  </div>
);

const Vagas = () => {
    return (
        <div className="page-container">
            <div className="section-header">
            <h1 className="section-title">Oportunidades de Impacto</h1>
            <p className="section-subtitle">Encontre o projeto ideal para suas habilidades e comece a transformar o mundo hoje.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input type="text" placeholder="Buscar por área de atuação..." style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', outline: 'none' }} />
                <button className="btn-primary"><Search size={20} /> Filtrar</button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div className="card" key={item}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-ultra-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)' }}>
                                <Building2 size={20} />
                            </div>
                            <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', backgroundColor: '#e6f7ff', color: 'var(--primary-dark)', borderRadius: '1rem', fontWeight: 600 }}>95% Match</span>
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Desenvolvedor Front-end Voluntário</h3>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}><MapPin size={16} /> Remoto • ONG CodeForAll</p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}><Briefcase size={16} /> Duração: 3 meses</p>
                        
                        <button className="btn-outline" style={{ width: '100%' }}>Ver Detalhes</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Perfil = () => (
  <div className="page-container">
    <div className="card text-center" style={{ padding: '3rem 2rem' }}>
      <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <User size={48} />
      </div>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>João Voluntário</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Desenvolvedor Full Stack Sênior | Apaixonado por Educação</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem' }}>142h</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Horas de Amor</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>4.9 <Star size={20} fill="var(--primary-dark)" /></h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Avaliação</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem' }}>8</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Causas Ajudadas</p>
        </div>
      </div>
    </div>
  </div>
);

const Mensagens = () => (
  <div className="page-container" style={{ display: 'flex', height: 'calc(100vh - 150px)', padding: '2rem 0' }}>
    <div style={{ width: '300px', borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Chat</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary-ultra-light)', cursor: 'pointer' }}>
          <h4 style={{ color: 'var(--primary-dark)' }}>ONG Educar Mais</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Entrevista agendada - Hoje 14:00</p>
        </div>
        <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
          <h4>Tech For Good</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Muito obrigado pelo PR! 🙏</p>
        </div>
      </div>
    </div>
    <div style={{ flex: 1, padding: '0 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
      <MessageCircle size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
      <p>Selecione uma conversa para começar a alinhar os detalhes</p>
    </div>
  </div>
);

const Notificacoes = () => (
  <div className="page-container max-w-2xl">
    <div className="section-header" style={{ textAlign: 'left' }}>
      <h1 className="section-title">Notificações</h1>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="card" style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1.5rem' }}>
         <div style={{ color: 'white', backgroundColor: 'var(--primary)', borderRadius: '50%', padding: '0.5rem' }}>
            <HeartHandshake size={20} />
         </div>
         <div>
            <h4 style={{ marginBottom: '0.25rem' }}>Novo Match de Perfil!</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>O projeto "Sistema de Doações" do Instituto Vida procura desenvolvedores com suas habilidades.</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>Há 2 horas</span>
         </div>
      </div>
      <div className="card" style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1.5rem' }}>
         <div style={{ color: 'white', backgroundColor: '#38b000', borderRadius: '50%', padding: '0.5rem' }}>
            <CheckCircle2 size={20} />
         </div>
         <div>
            <h4 style={{ marginBottom: '0.25rem' }}>Certificado Emitido</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Você recebeu um certificado de 40 horas pelo seu trabalho no projeto SOS Natureza.</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>Há 1 dia</span>
         </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => (
    <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '1rem', textAlign: 'center', fontWeight: '500' }}>
        Total de Horas de "Amor" intermediadas: <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>42.890h</span> ❤️
    </div>
);

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
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
