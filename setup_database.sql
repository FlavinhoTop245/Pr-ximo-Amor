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

-- Tabela de Notificações
CREATE TABLE IF NOT EXISTS public.notificacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    tipo TEXT NOT NULL, -- match, certificado, alerta
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inserindo alguns dados "mock" (iniciais) para testes do Perfil e Mensagens
INSERT INTO public.perfis (nome, titulo_profissional, horas_amor, avaliacao, causas_ajudadas) 
VALUES ('João Voluntário', 'Desenvolvedor Full Stack Sênior | Apaixonado por Educação', 142, 4.9, 8);

INSERT INTO public.mensagens (remetente_nome, ultima_mensagem) 
VALUES ('ONG Educar Mais', 'Entrevista agendada - Hoje 14:00');

INSERT INTO public.mensagens (remetente_nome, ultima_mensagem) 
VALUES ('Tech For Good', 'Muito obrigado pelo PR! 🙏');

INSERT INTO public.notificacoes (titulo, descricao, tipo) 
VALUES ('Novo Match de Perfil!', 'O projeto "Sistema de Doações" do Instituto Vida procura desenvolvedores com suas habilidades.', 'match');

INSERT INTO public.notificacoes (titulo, descricao, tipo) 
VALUES ('Certificado Emitido', 'Você recebeu um certificado de 40 horas pelo seu trabalho no projeto SOS Natureza.', 'certificado');

-- Dando permissões anônimas de leitura para podermos visualizar na aplicação (apenas para testes)
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notificacoes ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS muito abertas apenas para desenvolvimento. 
-- *AVISO: Em produção, você deve restringir de acordo com user_id (Autenticação)*
DROP POLICY IF EXISTS "Permitir leitura pública para vagas" ON public.vagas;
CREATE POLICY "Permitir leitura pública para vagas" ON public.vagas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção pública para vagas" ON public.vagas;
CREATE POLICY "Permitir inserção pública para vagas" ON public.vagas FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura pública para perfis" ON public.perfis;
CREATE POLICY "Permitir leitura pública para perfis" ON public.perfis FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção pública para perfis" ON public.perfis;
CREATE POLICY "Permitir inserção pública para perfis" ON public.perfis FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura pública para mensagens" ON public.mensagens;
CREATE POLICY "Permitir leitura pública para mensagens" ON public.mensagens FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção pública para mensagens" ON public.mensagens;
CREATE POLICY "Permitir inserção pública para mensagens" ON public.mensagens FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura pública para notificacoes" ON public.notificacoes;
CREATE POLICY "Permitir leitura pública para notificacoes" ON public.notificacoes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção pública para notificacoes" ON public.notificacoes;
CREATE POLICY "Permitir inserção pública para notificacoes" ON public.notificacoes FOR INSERT WITH CHECK (true);
