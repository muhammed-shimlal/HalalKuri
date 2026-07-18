-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUMs
CREATE TYPE member_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE contribution_status AS ENUM ('PAID', 'PENDING');

-- Create members table
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    status member_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contributions table
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    status contribution_status NOT NULL DEFAULT 'PENDING',
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(member_id, month, year)
);

-- Create recipients table
CREATE TABLE recipients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    reason TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(month, year)
);

-- Create announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create website_content table
CREATE TABLE website_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_username VARCHAR(100),
    shared_login_username VARCHAR(100),
    app_name VARCHAR(150),
    contact_phone VARCHAR(30),
    contact_email VARCHAR(150),
    office_address TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (id, admin_username, shared_login_username, app_name, contact_phone, contact_email, office_address) 
VALUES (
    uuid_generate_v4(), 
    'admin@halalkuri.com', 
    'member@halalkuri.com', 
    'Premium Halal Kuri', 
    '+1234567890', 
    'contact@halalkuri.com', 
    '123 Main Street, City'
);

-- Insert default website content
INSERT INTO website_content (id, page, title, content) VALUES
(uuid_generate_v4(), 'Home', '100% Shariah Compliant', 'A modern, transparent, and interest-free cooperative system designed exclusively for our private community members.'),
(uuid_generate_v4(), 'About', 'About Us', 'This platform is exclusively for an already selected group of members participating in a Private Halal Kuri.'),
(uuid_generate_v4(), 'FAQ', 'Frequently Asked Questions', 'Find answers to common questions about Halal Kuri.');

-- Create Indexes
CREATE INDEX idx_members_member_number ON members(member_number);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_contributions_member_id ON contributions(member_id);
CREATE INDEX idx_contributions_month_year ON contributions(month, year);
CREATE INDEX idx_recipients_month_year ON recipients(month, year);
CREATE INDEX idx_announcements_published ON announcements(published);

-- ROW LEVEL SECURITY (RLS)

-- Enable RLS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Note: Since this is an MVP without complex custom claims, we assume Supabase Auth is used.
-- 'Admin' and 'Member' logic can be enforced via app metadata or email domain matching, 
-- but for simplicity here we rely on standard authenticated status combined with app-side UI locks.
-- In production, create a profiles table or use auth.users -> raw_app_meta_data for strict DB-level roles.

-- Read Policies
CREATE POLICY "Allow public read access on website_content" ON website_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read on members" ON members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read on contributions" ON contributions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read on recipients" ON recipients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read on announcements" ON announcements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read on documents" ON documents FOR SELECT TO authenticated USING (true);

-- Write Policies (Assuming all authenticated users who have access to the dashboard are trusted for this MVP)
-- To restrict writes to Admin ONLY, replace `TO authenticated` with `USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1))`
CREATE POLICY "Allow admin write on members" ON members FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1));
CREATE POLICY "Allow admin write on contributions" ON contributions FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1));
CREATE POLICY "Allow admin write on recipients" ON recipients FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1));
CREATE POLICY "Allow admin write on announcements" ON announcements FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1));
CREATE POLICY "Allow admin write on documents" ON documents FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1));
CREATE POLICY "Allow admin write on website_content" ON website_content FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1));
CREATE POLICY "Allow admin write on settings" ON settings FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = (SELECT admin_username FROM settings LIMIT 1));

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_members_modtime BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contributions_modtime BEFORE UPDATE ON contributions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recipients_modtime BEFORE UPDATE ON recipients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_modtime BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_modtime BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_modtime BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_website_content_modtime BEFORE UPDATE ON website_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
