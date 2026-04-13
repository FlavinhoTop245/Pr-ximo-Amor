import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Briefcase, Building2, MapPin, AlignLeft, Clock } from 'lucide-react';

const NovaVaga = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    empresa: '',
    localizacao: '',
    duracao: '',
    descricao: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      const { error } = await supabase
        .from('vagas')
        .insert([
          {
            titulo: formData.titulo,
            empresa: formData.empresa,
            localizacao: formData.localizacao,
            duracao: formData.duracao,
            descricao: formData.descricao,
            match_percent: Math.floor(Math.random() * (100 - 70 + 1) + 70) // Gera um match aleatório para simular o sistema
          }
        ]);

      if (error) throw error;

      // Se der certo, volta para a página de vagas
      navigate('/vagas');
    } catch (error) {
      console.error('Erro ao salvar vaga:', error);
      setErro('Ocorreu um erro ao salvar a vaga. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-container max-w-2xl">
      <div className="section-header">
        <h1 className="section-title">Cadastrar Nova Vaga</h1>
        <p className="section-subtitle">Preencha os dados abaixo para publicar uma oportunidade de voluntariado e encontrar o talento ideal.</p>
      </div>

      <div className="card">
        {erro && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffeef0', borderRadius: 'var(--radius-sm)' }}>{erro}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <Briefcase size={18} /> Título da Vaga
            </label>
            <input 
              type="text" 
              name="titulo" 
              required
              placeholder="Ex: Desenvolvedor Front-end Voluntário"
              value={formData.titulo}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <Building2 size={18} /> Nome da Empresa ou ONG
            </label>
            <input 
              type="text" 
              name="empresa" 
              required
              placeholder="Ex: Instituto Vida Verde"
              value={formData.empresa}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <MapPin size={18} /> Localização
              </label>
              <input 
                type="text" 
                name="localizacao" 
                required
                placeholder="Ex: Remoto, São Paulo - SP"
                value={formData.localizacao}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <Clock size={18} /> Duração do Projeto
              </label>
              <input 
                type="text" 
                name="duracao" 
                required
                placeholder="Ex: 3 meses, Contínuo"
                value={formData.duracao}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <AlignLeft size={18} /> Descrição das Atividades
            </label>
            <textarea 
              name="descricao" 
              required
              rows="4"
              placeholder="Descreva o que o voluntário irá fazer, requisitos desejados e impacto do projeto..."
              value={formData.descricao}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/vagas')} 
              className="btn-outline" 
              style={{ flex: 1 }}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ flex: 2, justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Publicar Vaga'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NovaVaga;
