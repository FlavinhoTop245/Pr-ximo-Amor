import React from 'react';
import { Bell, User, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={logo} alt="Logo Próximo Amor" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        Próximo Amor
      </Link>
      <div className="nav-links">
        <Link to="/sobre-nos" className={path === '/sobre-nos' || path === '/' ? 'active' : ''}>Sobre Nós</Link>
        <Link to="/vagas" className={path === '/vagas' ? 'active' : ''}>Vagas</Link>
        <Link to="/perfil" className={path === '/perfil' ? 'active' : ''}>Perfil</Link>
        <Link to="/mensagens" className={path === '/mensagens' ? 'active' : ''}>Mensagens</Link>
      </div>
      <div className="nav-actions">
        <Link to="/empresa/login" className="btn-outline" style={{ 
          padding: '0.5rem 1rem', 
          fontSize: '0.875rem', 
          color: 'var(--accent-white)', 
          borderColor: 'rgba(255,255,255,0.5)',
          background: 'rgba(255,255,255,0.1)'
        }}>
          Portal Empresa
        </Link>
        <Link to="/notificacoes" className="btn-icon badge">
          <Bell size={20} />
        </Link>
        <Link to="/login" className="btn-icon">
          <User size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
