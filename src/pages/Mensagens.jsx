import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Mensagens = () => {
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarMensagens() {
      try {
        const { data, error } = await supabase
          .from('mensagens')
          .select('*')
          .order('data_mensagem', { ascending: false });

        if (error) throw error;
        setMensagens(data);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarMensagens();
  }, []);

  return (
    <div className="page-container" style={{ display: 'flex', height: 'calc(100vh - 150px)', padding: '2rem 0' }}>
      <div style={{ width: '300px', borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Chat</h2>
        
        {loading ? (
          <p>Carregando conversas...</p>
        ) : mensagens.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Nenhuma conversa encontrada. Execute o script SQL no Supabase.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mensagens.map((msg, index) => (
              <div key={msg.id} style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: index === 0 ? 'none' : '1px solid var(--border-color)', background: index === 0 ? 'var(--primary-ultra-light)' : 'transparent', cursor: 'pointer' }}>
                <h4 style={{ color: index === 0 ? 'var(--primary-dark)' : 'inherit' }}>{msg.remetente_nome}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.ultima_mensagem}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ flex: 1, padding: '0 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
        <MessageCircle size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
        <p>Selecione uma conversa para começar a alinhar os detalhes</p>
      </div>
    </div>
  );
};

export default Mensagens;
