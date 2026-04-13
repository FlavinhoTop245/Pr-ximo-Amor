import React from 'react';
import { Building2, HeartHandshake } from 'lucide-react';

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

export default SobreNos;
