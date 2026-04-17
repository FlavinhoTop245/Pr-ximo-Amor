import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, MapPin, Briefcase, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Vagas = () => {
    const navigate = useNavigate();
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        carregarVagas();
    }, []);

    async function carregarVagas() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('vagas')
                .select('*');

            if (error) throw error;
            
            setVagas(data);
        } catch (error) {
            console.error('Erro ao buscar vagas:', error);
            setErro('Não foi possível carregar as vagas no momento.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page-container">
            <div className="section-header">
                <h1 className="section-title">Oportunidades de Impacto</h1>
                <p className="section-subtitle">Encontre o projeto ideal para suas habilidades e comece a transformar o mundo hoje.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input type="text" placeholder="Buscar por área de atuação..." style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', outline: 'none' }} />
                <button className="btn-primary"><Search size={20} /> Filtrar</button>
                <button className="btn-outline" onClick={() => navigate('/nova-vaga')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} /> Criar Vaga
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem', color: 'var(--primary)' }}>
                    <h2>Carregando vagas no banco de dados...</h2>
                </div>
            ) : erro ? (
                <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>{erro}</div>
            ) : vagas.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    <p>Nenhuma vaga cadastrada ainda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {vagas.map((vaga) => (
                        <div className="card" key={vaga.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-ultra-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)' }}>
                                    <Building2 size={20} />
                                </div>
                                <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', backgroundColor: '#e6f7ff', color: 'var(--primary-dark)', borderRadius: '1rem', fontWeight: 600 }}>{vaga.match_percent}% Match</span>
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{vaga.titulo}</h3>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                <MapPin size={16} /> {vaga.localizacao} • {vaga.empresa}
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                <Briefcase size={16} /> Duração: {vaga.duracao}
                            </p>
                            
                            <button 
                                className="btn-outline" 
                                style={{ width: '100%' }}
                                onClick={() => navigate(`/vagas/${vaga.id}`)}
                            >
                                Ver Detalhes
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Vagas;
