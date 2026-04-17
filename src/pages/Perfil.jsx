import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Star, LogOut, Award, Briefcase } from 'lucide-react';

const Perfil = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario_logado');
    if (usuarioLogado) {
      setPerfil(JSON.parse(usuarioLogado));
      setLoading(false);
    } else {
      carregarPerfilDoBanco();
    }
  }, []);

  async function carregarPerfilDoBanco() {
    try {
      const { data, error } = await supabase
        .from('perfis')
        .select('*')
        .limit(1)
        .single();

      if (!error) setPerfil(data);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('usuario_logado');
    navigate('/login');
  };

  if (loading) return <div className="page-container">Carregando perfil...</div>;

  if (!perfil) {
    return (
      <div className="page-container" style={{ textAlign: 'center' }}>
        <h2>Acesse sua conta para ver seu perfil</h2>
        <button onClick={() => navigate('/login')} className="btn-primary" style={{ marginTop: '1rem' }}>Fazer Login</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={handleLogout} style={{ color: '#E53E3E', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <LogOut size={18} /> Sair
        </button>
      </div>

      <div className="card text-center" style={{ padding: '3rem 2rem', marginBottom: '2rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <User size={48} />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{perfil.nome}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{perfil.titulo_profissional || 'Voluntário Enthusiasta'}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem' }}>{perfil.horas_amor || 0}h</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Horas de Amor</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>{perfil.avaliacao || 5.0} <Star size={20} fill="var(--primary-dark)" /></h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Avaliação</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem' }}>{perfil.causas_ajudadas || 0}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Causas Ajudadas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={20} color="var(--primary)" /> Suas Experiências
          </h3>
          <p style={{ color: 'var(--text-main)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {perfil.experiencias || 'Nenhuma experiência cadastrada ainda. Adicione suas competências para atrair mais causas!'}
          </p>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} color="var(--primary)" /> Conquistas
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ padding: '0.5rem 1rem', background: 'var(--primary-ultra-light)', color: 'var(--primary-dark)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>Primeiro Match</span>
            <span style={{ padding: '0.5rem 1rem', background: '#D1FAE5', color: '#059669', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>10 Horas Concluídas</span>
            <span style={{ padding: '0.5rem 1rem', background: '#FEF3C7', color: '#D97706', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>Doador de Talento</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
