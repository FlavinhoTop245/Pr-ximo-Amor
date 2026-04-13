import React from 'react';
import { MessageCircle } from 'lucide-react';

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

export default Mensagens;
