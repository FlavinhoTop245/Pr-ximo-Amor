import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, FileText, CheckCircle, XCircle, Briefcase } from 'lucide-react';

const GestaoCandidatos = () => {
  const navigate = useNavigate();
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem('empresa_logada');
    if (!logged) {
      navigate('/empresa/login');
      return;
    }
    fetchCandidatos();
  }, [navigate]);

  const fetchCandidatos = async () => {
    try {
      // Como não temos dados reais de candidaturas ainda, vou mockar alguns para a demonstração
      // Mas a estrutura está pronta para o Supabase
      const mockData = [
        { 
          id: 1, 
          nome: 'Alice Silva', 
          vaga: 'Desenvolvedor Front-end', 
          quer_contrato: true, 
          match: 95,
          mensagem: 'Tenho muita experiência com React e quero contribuir com a causa.'
        },
        { 
          id: 2, 
          nome: 'Bruno Souza', 
          vaga: 'Designer UX', 
          quer_contrato: false, 
          match: 88,
          mensagem: 'Gostaria de ajudar no design do novo portal.'
        },
        { 
          id: 3, 
          nome: 'Carla Lima', 
          vaga: 'Desenvolvedor Front-end', 
          quer_contrato: true, 
          match: 92,
          mensagem: 'Busco uma oportunidade de contrato após o período de voluntariado.'
        }
      ];
      setCandidatos(mockData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContratar = (candidato) => {
    alert(`Iniciando processo de contrato para ${candidato.nome}!`);
    // Aqui faria o insert na tabela 'contratacoes'
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">Gerenciamento de Candidatos</h1>
        <p className="section-subtitle">Analise os perfis dos voluntários que se candidataram às suas vagas.</p>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Voluntário</th>
                <th style={{ padding: '1rem' }}>Vaga</th>
                <th style={{ padding: '1rem' }}>Interesse em Contrato</th>
                <th style={{ padding: '1rem' }}>Match</th>
                <th style={{ padding: '1rem' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {candidatos.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', background: 'var(--primary-ultra-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--primary-dark)' }}>
                        <User size={16} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{c.nome}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{c.vaga}</td>
                  <td style={{ padding: '1rem' }}>
                    {c.quer_contrato ? (
                      <span style={{ background: '#D1FAE5', color: '#059669', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                        Sim, busca contrato
                      </span>
                    ) : (
                      <span style={{ background: 'var(--bg-color)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem' }}>
                        Apenas voluntariado
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}>
                        <div style={{ width: `${c.match}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{c.match}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" title="Ver Mensagem" style={{ color: 'var(--text-muted)' }}><FileText size={18} /></button>
                      <button 
                        onClick={() => handleContratar(c)}
                        className="btn-primary" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                      >
                        {c.quer_contrato ? 'Oferecer Contrato' : 'Aprovar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestaoCandidatos;
