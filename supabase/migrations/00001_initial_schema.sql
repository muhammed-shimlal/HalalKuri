-- Create custom types for enums
CREATE TYPE member_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE contribution_status AS ENUM ('PAID', 'PENDING');
CREATE TYPE user_role AS ENUM ('admin', 'member');

-- Profiles table (links to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Members table
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  status member_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contributions table
CREATE TABLE public.contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  month VARCHAR(20) NOT NULL,
  year INTEGER NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status contribution_status NOT NULL DEFAULT 'PENDING',
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(member_id, month, year)
);

-- Recipients table
CREATE TABLE public.recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  month VARCHAR(20) NOT NULL,
  year INTEGER NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  reason TEXT,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(month, year)
);

-- Announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Settings table (Should only have one row)
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name VARCHAR(150) NOT NULL DEFAULT 'Halal Kuri',
  contact_phone VARCHAR(30),
  contact_email VARCHAR(150),
  office_address TEXT,
  shared_login_username VARCHAR(100),
  admin_username VARCHAR(100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Website Content table (Dynamic pages content)
CREATE TABLE public.website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes
CREATE INDEX idx_members_number ON public.members(member_number);
CREATE INDEX idx_members_status ON public.members(status);
CREATE INDEX idx_contributions_member ON public.contributions(member_id);
CREATE INDEX idx_contributions_date ON public.contributions(month, year);
CREATE INDEX idx_recipients_member ON public.recipients(member_id);
CREATE INDEX idx_recipients_date ON public.recipients(month, year);
CREATE INDEX idx_announcements_published ON public.announcements(published);

-- Row Level Security (RLS)

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: Users can read their own profile, Admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update profiles" ON public.profiles FOR UPDATE USING (public.is_admin());

-- Members: Everyone (authenticated) can read, Admins can do all
CREATE POLICY "Members can view members" ON public.members FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can insert members" ON public.members FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update members" ON public.members FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete members" ON public.members FOR DELETE USING (public.is_admin());

-- Contributions: Everyone (authenticated) can read, Admins can do all
CREATE POLICY "Members can view contributions" ON public.contributions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage contributions" ON public.contributions FOR ALL USING (public.is_admin());

-- Recipients: Everyone (authenticated) can read, Admins can do all
CREATE POLICY "Members can view recipients" ON public.recipients FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage recipients" ON public.recipients FOR ALL USING (public.is_admin());

-- Announcements: Members can read published, Admins can do all
CREATE POLICY "Members can view published announcements" ON public.announcements FOR SELECT USING (published = true AND auth.role() = 'authenticated');
CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL USING (public.is_admin());

-- Documents: Everyone (authenticated) can read, Admins can do all
CREATE POLICY "Members can view documents" ON public.documents FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage documents" ON public.documents FOR ALL USING (public.is_admin());

-- Settings: Admins can do all, Members cannot view (handled by default deny)
CREATE POLICY "Admins can manage settings" ON public.settings FOR ALL USING (public.is_admin());

-- Website Content: Anonymous/Everyone can read, Admins can update
CREATE POLICY "Anyone can view website content" ON public.website_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage website content" ON public.website_content FOR ALL USING (public.is_admin());

-- Create Storage Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true) ON CONFLICT DO NOTHING;

-- Storage RLS
CREATE POLICY "Anyone can view documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Admins can upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND public.is_admin());
CREATE POLICY "Admins can update documents" ON storage.objects FOR UPDATE USING (bucket_id = 'documents' AND public.is_admin());
CREATE POLICY "Admins can delete documents" ON storage.objects FOR DELETE USING (bucket_id = 'documents' AND public.is_admin());
