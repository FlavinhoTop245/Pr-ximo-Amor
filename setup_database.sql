-- Tabela de Vagas (Caso não exista ou precise ser recriada/atualizada)
CREATE TABLE IF NOT EXISTS public.vagas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    empresa TEXT NOT NULL,
    localizacao TEXT NOT NULL,
    duracao TEXT NOT NULL,
    descricao TEXT,
    match_percent INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Perfis
CREATE TABLE IF NOT EXISTS public.perfis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    titulo_profissional TEXT NOT NULL,
    horas_amor INTEGER DEFAULT 0,
    avaliacao NUMERIC(3, 1) DEFAULT 0.0,
    causas_ajudadas INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Mensagens/Conversas (Simplificada para a v1)
CREATE TABLE IF NOT EXISTS public.mensagens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    remetente_nome TEXT NOT NULL,
    ultima_mensagem TEXT NOT NULL,
    data_mensagem TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inserindo alguns dados "mock" (iniciais) para testes do Perfil e Mensagens
INSERT INTO public.perfis (nome, titulo_profissional, horas_amor, avaliacao, causas_ajudadas) 
VALUES ('João Voluntário', 'Desenvolvedor Full Stack Sênior | Apaixonado por Educação', 142, 4.9, 8);

INSERT INTO public.mensagens (remetente_nome, ultima_mensagem) 
VALUES ('ONG Educar Mais', 'Entrevista agendada - Hoje 14:00');

INSERT INTO public.mensagens (remetente_nome, ultima_mensagem) 
VALUES ('Tech For Good', 'Muito obrigado pelo PR! 🙏');

-- Dando permissões anônimas de leitura para podermos visualizar na aplicação (apenas para testes)
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS muito abertas apenas para desenvolvimento. 
-- *AVISO: Em produção, você deve restringir de acordo com user_id (Autenticação)*
CREATE POLICY "Permitir leitura pública para vagas" ON public.vagas FOR SELECT USING (true);
CREATE POLICY "Permitir inserção pública para vagas" ON public.vagas FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura pública para perfis" ON public.perfis FOR SELECT USING (true);
CREATE POLICY "Permitir inserção pública para perfis" ON public.perfis FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura pública para mensagens" ON public.mensagens FOR SELECT USING (true);
CREATE POLICY "Permitir inserção pública para mensagens" ON public.mensagens FOR INSERT WITH CHECK (true);
