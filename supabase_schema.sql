-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_role TEXT NOT NULL DEFAULT 'student',
    avatar TEXT,
    role TEXT,
    school TEXT,
    admin_title TEXT,
    level INTEGER DEFAULT 1,
    level_title TEXT DEFAULT 'Observer',
    current_xp INTEGER DEFAULT 0,
    max_xp INTEGER DEFAULT 350,
    points INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 1,
    completed_modules JSONB DEFAULT '[]',
    completed_games JSONB DEFAULT '[]',
    completed_simulations JSONB DEFAULT '[]',
    earned_badges JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    role TEXT NOT NULL,
    description TEXT NOT NULL,
    datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    incident_type TEXT NOT NULL,
    has_attachment BOOLEAN DEFAULT false,
    file_name TEXT,
    file_base64 TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'Sedang Ditinjau',
    counselor_notes TEXT
);

-- Insert demo users
INSERT INTO public.users (name, username, email, password, user_role, avatar, role, school, admin_title)
VALUES
    ('Siswa Demo', 'siswa', 'siswa@sigap.sch.id', 'siswa123', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=siswa', 'Siswa Aktif', 'SMP Harapan Bangsa', NULL),
    ('Admin Demo', 'admin', 'admin@sigap.sch.id', 'admin123', 'admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', 'Ketua Satgas BK', 'SMP Harapan Bangsa', 'Satgas Anti-Bullying (TPPK)'),
    ('Demo User', 'demo', 'demo@sigap.sch.id', 'demo123', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo', 'Siswa Baru', 'SMP Harapan Bangsa', NULL)
ON CONFLICT (username) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access to users (for demo purposes)
CREATE POLICY "Allow public read access to users"
    ON public.users FOR SELECT
    USING (true);

-- Allow public insert access to users (for registration)
CREATE POLICY "Allow public insert access to users"
    ON public.users FOR INSERT
    WITH CHECK (true);

-- Allow public update access to users
CREATE POLICY "Allow public update access to users"
    ON public.users FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Allow public read access to reports
CREATE POLICY "Allow public read access to reports"
    ON public.reports FOR SELECT
    USING (true);

-- Allow public insert access to reports
CREATE POLICY "Allow public insert access to reports"
    ON public.reports FOR INSERT
    WITH CHECK (true);

-- Allow public update access to reports
CREATE POLICY "Allow public update access to reports"
    ON public.reports FOR UPDATE
    USING (true)
    WITH CHECK (true);
