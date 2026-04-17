import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Star, MessageSquare, Calendar, Award } from 'lucide-react';

const GestaoContratos = () => {
  const navigate = useNavigate();
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem('empresa_logada');
    if (!logged) {
      navigate('/empresa/login');
      return;
    }
    fetchContratos();
  }, [navigate]);

  const fetchContratos = async () => {
    // Mock de contratos ativos
    const mockContratos = [
      {
        id: 1,
        voluntario: 'Alice Silva',
        vaga: 'Desenvolvedor Front-end',
        data: '15/04/2026',
        status: 'Ativo',
        feedback: ''
      },
      {
        id: 2,
        voluntario: 'Roberto Santos',
        vaga: 'Gestor de Projetos',
        data: '10/03/2026',
        status: 'Finalizado',
        feedback: 'Excelente profissional, entregou tudo no prazo.'
      }
    ];
    setContratos(mockContratos);
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">Contratos & Feedback</h1>
        <p className="section-subtitle">Gerencie os voluntários contratados e deixe seu feedback sobre o desempenho.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {contratos.map(con => (
          <div key={con.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ 
                  background: con.status === 'Ativo' ? '#D1FAE5' : '#E9ECEF', 
                  color: con.status === 'Ativo' ? '#059669' : 'var(--text-muted)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}>
                  {con.status}
                </span>
                <h3 style={{ fontSize: '1.25rem' }}>{con.voluntario}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{con.vaga}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={14} /> Contratado em {con.data}
                </p>
              </div>
            </div>

            {con.feedback ? (
              <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <p style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--text-main)' }}>"{con.feedback}"</p>
                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.75rem', color: '#F59E0B' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <textarea 
                  placeholder="Deixe um feedback sobre o voluntário..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', minHeight: '80px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} style={{ color: 'var(--border-color)', cursor: 'pointer' }} />)}
                  </div>
                  <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Salvar Feedback
                  </button>
                </div>
              </div>
            )}
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button className="btn-outline" style={{ flex: 1, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <MessageSquare size={16} /> Chat
              </button>
              <button className="btn-outline" style={{ flex: 1, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Award size={16} /> Certificado
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestaoContratos;
