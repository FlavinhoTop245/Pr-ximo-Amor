import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Building2, Mail, Lock, User, ArrowRight } from 'lucide-react';

const AuthEmpresa = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Simulação de login para a demo (procurando na tabela empresas)
        const { data, error } = await supabase
          .from('empresas')
          .select('*')
          .eq('email', formData.email)
          .eq('senha', formData.senha)
          .single();

        if (error || !data) throw new Error('Credenciais inválidas');
        
        // Salva "sessão" básica
        localStorage.setItem('empresa_logada', JSON.stringify(data));
        navigate('/empresa/dashboard');
      } else {
        // Cadastro
        const { data, error } = await supabase
          .from('empresas')
          .insert([{ nome: formData.nome, email: formData.email, senha: formData.senha }])
          .select()
          .single();

        if (error) throw error;
        
        localStorage.setItem('empresa_logada', JSON.stringify(data));
        navigate('/empresa/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'var(--primary-ultra-light)', 
            borderRadius: 'var(--radius-md)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1rem',
            color: 'var(--primary-dark)'
          }}>
            <Building2 size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {isLogin ? 'Portal da Empresa' : 'Cadastre sua Empresa'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Acesse para gerenciar suas vagas e voluntários' : 'Comece a gerar impacto social hoje mesmo'}
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            background: '#FFF5F5', 
            color: '#E53E3E', 
            borderRadius: 'var(--radius-sm)', 
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            border: '1px solid #FED7D7'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nome da Empresa</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="Ex: Instituto Vida"
                  value={formData.nome}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Corporativo</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                name="email"
                required
                placeholder="empresa@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                name="senha"
                required
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Aguarde...' : (isLogin ? 'Entrar no Portal' : 'Criar Conta')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Ainda não tem conta?' : 'Já possui conta?'}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ color: 'var(--primary)', fontWeight: 600, marginLeft: '0.5rem' }}
            >
              {isLogin ? 'Cadastre sua Empresa' : 'Fazer Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthEmpresa;
