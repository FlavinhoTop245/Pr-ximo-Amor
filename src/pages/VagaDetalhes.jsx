import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Building2, MapPin, Briefcase, Clock, ArrowLeft, Heart, Send, CheckCircle2 } from 'lucide-react';

const VagaDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [querContrato, setQuerContrato] = useState(false);

  useEffect(() => {
    fetchVaga();
  }, [id]);

  const fetchVaga = async () => {
    try {
      const { data, error } = await supabase
        .from('vagas')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setVaga(data);
    } catch (err) {
      console.error(err);
      navigate('/vagas');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulação de candidatura
      const { error } = await supabase
        .from('candidaturas')
        .insert([{ 
          vaga_id: id, 
          perfil_id: 'd3f66c7b-779d-4c3e-9087-951b539c941c', // Perfil mock
          mensagem: mensagem,
          quer_contrato: querContrato
        }]);

      if (error) throw error;
      setApplied(true);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !vaga) return <div className="page-container">Carregando detalhes...</div>;

  return (
    <div className="page-container">
      <button 
        onClick={() => navigate('/vagas')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <ArrowLeft size={18} /> Voltar para Vagas
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Main Content */}
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', background: 'var(--primary-ultra-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)' }}>
                  <Building2 size={40} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{vaga.titulo}</h1>
                  <p style={{ fontSize: '1.125rem', color: 'var(--primary-dark)', fontWeight: 600 }}>{vaga.empresa}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', padding: '0.5rem 1rem', background: 'var(--accent-green-light)', color: '#059669', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
                  {vaga.match_percent}% Match
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <MapPin size={20} /> {vaga.localizacao}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <Briefcase size={20} /> {vaga.duracao}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <Clock size={20} /> Publicada recentemente
              </div>
            </div>

            <div style={{ lineHeight: '1.8', color: 'var(--text-main)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Descrição do Projeto</h3>
              <p style={{ whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>{vaga.descricao || 'Nenhuma descrição detalhada fornecida.'}</p>
              
              <h3 style={{ marginBottom: '1rem' }}>O que buscamos</h3>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Comprometimento com a causa social.</li>
                <li>Habilidade técnica demonstrada em projetos anteriores.</li>
                <li>Boa comunicação e trabalho em equipe.</li>
                <li>Disponibilidade para reuniões semanais de alinhamento.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar / Actions */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '100px', background: 'var(--bg-surface)' }}>
            {!applied ? (
              <>
                <h3 style={{ marginBottom: '1.5rem' }}>Interessado no projeto?</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>
                  Sua compatibilidade é alta! Aplique agora para entrar em contato com a instituição.
                </p>
                
                {!showApplyForm ? (
                  <button 
                    onClick={() => setShowApplyForm(true)}
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                  >
                    Quero me Candidatar <Send size={18} />
                  </button>
                ) : (
                  <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Mensagem para a Empresa</label>
                      <textarea 
                        required
                        placeholder="Conte por que você quer ajudar..."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', minHeight: '120px' }}
                      />
                    </div>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={querContrato}
                        onChange={(e) => setQuerContrato(e.target.checked)}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Tenho interesse em contrato futuro</span>
                    </label>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={() => setShowApplyForm(false)} className="btn-outline" style={{ flex: 1 }}>Cancelar</button>
                      <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Enviar</button>
                    </div>
                  </form>
                )}
                
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <button style={{ color: 'var(--primary)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}>
                    <Heart size={18} /> Salvar para depois
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--accent-green-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', margin: '0 auto 1.5rem' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ marginBottom: '1rem' }}>Candidatura Enviada!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  A {vaga.empresa} recebeu seu interesse. Fique de olho nas suas mensagens!
                </p>
                <button onClick={() => navigate('/vagas')} className="btn-outline" style={{ width: '100%' }}>Ver outras vagas</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VagaDetalhes;
