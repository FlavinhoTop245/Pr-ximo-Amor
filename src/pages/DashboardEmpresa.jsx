import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Building2, Plus, Users, Briefcase, Star, ClipboardList } from 'lucide-react';

const DashboardEmpresa = () => {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem('empresa_logada');
    if (!logged) {
      navigate('/empresa/login');
      return;
    }
    const empresaData = JSON.parse(logged);
    setEmpresa(empresaData);

    fetchData(empresaData.nome);
  }, [navigate]);

  const fetchData = async (empresaNome) => {
    try {
      const { data, error } = await supabase
        .from('vagas')
        .select('*')
        .eq('empresa', empresaNome);
      
      if (error) throw error;
      setVagas(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('empresa_logada');
    navigate('/empresa/login');
  };

  if (loading) return <div className="page-container">Carregando Dashboard...</div>;

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Olá, {empresa?.nome}</h1>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>Bem-vindo ao seu painel de controle.</p>
        </div>
        <button onClick={handleLogout} className="btn-outline">Sair do Portal</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-4" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ padding: '1rem', background: 'var(--primary-ultra-light)', borderRadius: 'var(--radius-sm)', color: 'var(--primary-dark)' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{vagas.length}</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Vagas Ativas</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid #10B981' }}>
          <div style={{ padding: '1rem', background: '#D1FAE5', borderRadius: 'var(--radius-sm)', color: '#059669' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>12</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Candidatos Totais</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid #F59E0B' }}>
          <div style={{ padding: '1rem', background: '#FEF3C7', borderRadius: 'var(--radius-sm)', color: '#D97706' }}>
            <Star size={24} />
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>4.8</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Média de Feedback</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Vacancy Management */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ClipboardList size={20} /> Suas Vagas</h3>
            <Link to="/nova-vaga" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              <Plus size={16} /> Nova Vaga
            </Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {vagas.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Nenhuma vaga cadastrada ainda.</p>
            ) : (
              vagas.map(vaga => (
                <div key={vaga.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{vaga.titulo}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vaga.localizacao} • {vaga.duracao}</p>
                  </div>
                  <Link to="/empresa/candidatos" className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Ver Candidatos</Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-surface), var(--primary-ultra-light))' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Gerenciamento</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Link to="/empresa/candidatos" className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-surface)' }}>
              <Users size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
              <p style={{ fontWeight: 600 }}>Candidatos</p>
            </Link>
            <Link to="/empresa/contratos" className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-surface)' }}>
              <Star size={32} style={{ margin: '0 auto 1rem', color: '#F59E0B' }} />
              <p style={{ fontWeight: 600 }}>Contratos & Feedback</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmpresa;
