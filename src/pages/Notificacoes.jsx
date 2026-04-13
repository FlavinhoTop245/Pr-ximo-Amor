import React from 'react';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';

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

export default Notificacoes;
