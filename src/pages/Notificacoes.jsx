import React, { useState, useEffect } from 'react';
import { HeartHandshake, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarNotificacoes() {
      try {
        const { data, error } = await supabase
          .from('notificacoes')
          .select('*')
          .order('criado_em', { ascending: false });

        if (error) throw error;
        setNotificacoes(data);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarNotificacoes();
  }, []);

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'match': return <HeartHandshake size={20} />;
      case 'certificado': return <CheckCircle2 size={20} />;
      default: return <AlertCircle size={20} />;
    }
  };

  const getIconColor = (tipo) => {
    switch (tipo) {
      case 'match': return 'var(--primary)';
      case 'certificado': return '#38b000';
      default: return '#fb8500';
    }
  };

  return (
    <div className="page-container max-w-2xl">
      <div className="section-header" style={{ textAlign: 'left' }}>
        <h1 className="section-title">Notificações</h1>
      </div>

      {loading ? (
        <p>Carregando notificações...</p>
      ) : notificacoes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Você não tem notificações no momento.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notificacoes.map((notif) => (
            <div className="card" key={notif.id} style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1.5rem' }}>
              <div style={{ color: 'white', backgroundColor: getIconColor(notif.tipo), borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
                {getIcon(notif.tipo)}
              </div>
              <div>
                <h4 style={{ marginBottom: '0.25rem' }}>{notif.titulo}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{notif.descricao}</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>
                  {new Date(notif.criado_em).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notificacoes;
