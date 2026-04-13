import React from 'react';
import { User, Star } from 'lucide-react';

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

export default Perfil;
