import React from 'react';
import { Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="./logo.png" alt="Logo Árvore" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', backgroundColor: 'transparent' }} />
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

export default Navbar;
