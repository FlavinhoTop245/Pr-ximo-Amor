import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
    const [totalHours, setTotalHours] = useState(0);

    useEffect(() => {
        async function fetchTotalHours() {
            try {
                const { data, error } = await supabase
                    .from('perfis')
                    .select('horas_amor');

                if (error) throw error;
                
                const sum = data.reduce((acc, curr) => acc + (curr.horas_amor || 0), 0);
                setTotalHours(sum);
            } catch (error) {
                console.error('Error fetching total hours:', error);
                setTotalHours(42890); // Fallback value
            }
        }

        fetchTotalHours();
    }, []);

    return (
        <div style={{ 
            background: 'var(--primary-dark)', 
            color: 'white', 
            padding: '1rem', 
            textAlign: 'center', 
            fontWeight: '500', 
            boxShadow: 'inset 0 -2px 10px rgba(0,0,0,0.1)',
            animation: 'slideDown 0.5s ease-out'
        }}>
            Total de Horas de "Amor" intermediadas: <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>{totalHours.toLocaleString()}h</span> ❤️
            <style>
                {`
                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }
                `}
            </style>
        </div>
    );
};

export default Dashboard;
