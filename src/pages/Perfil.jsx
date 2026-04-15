import React, { useState, useEffect } from 'react';
import { User, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const { data, error } = await supabase
          .from('perfis')
          .select('*')
          .limit(1)
          .single();

        if (error) throw error;
        setPerfil(data);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <h2>Carregando perfil...</h2>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <h2>Nenhum perfil encontrado. Execute o script SQL no Supabase.</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card text-center" style={{ padding: '3rem 2rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <User size={48} />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{perfil.nome}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{perfil.titulo_profissional}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem' }}>{perfil.horas_amor}h</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Horas de Amor</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>{perfil.avaliacao} <Star size={20} fill="var(--primary-dark)" /></h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Avaliação</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem' }}>{perfil.causas_ajudadas}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Causas Ajudadas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
