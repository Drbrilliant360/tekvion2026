
-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: admins can read all, users can read own
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Site settings (single row)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT 'Tekvion Technology L.L.C',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  address TEXT DEFAULT '',
  copyright TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON public.site_settings
  FOR SELECT USING (true);
CREATE POLICY "Admins can update settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Hero slides
CREATE TABLE public.hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active slides" ON public.hero_slides
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage slides" ON public.hero_slides
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read services" ON public.services
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read testimonials" ON public.testimonials
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Solutions
CREATE TABLE public.solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Database',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read solutions" ON public.solutions
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage solutions" ON public.solutions
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read messages" ON public.contact_messages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update messages" ON public.contact_messages
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete messages" ON public.contact_messages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- About content (single row)
CREATE TABLE public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  executive_summary TEXT NOT NULL DEFAULT '',
  vision TEXT NOT NULL DEFAULT '',
  mission TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read about" ON public.about_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can update about" ON public.about_content
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert about" ON public.about_content
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.site_settings (company_name, phone, email, address, copyright) VALUES ('Tekvion Technology L.L.C', '+971-XXX-XXXX', 'info@tekvion.com', 'Dubai, UAE', '© 2025 Tekvion Technology L.L.C. All rights reserved.');

INSERT INTO public.about_content (executive_summary, vision, mission) VALUES (
  'is a Dubai-based technology consulting and services company delivering high-impact solutions across IT infrastructure, cloud, cybersecurity, artificial intelligence, and data-driven platforms.',
  'To be the most trusted technology partner for growth—helping businesses use data, cloud, and automation to innovate faster, operate smarter, and deliver exceptional customer experiences.',
  'We deliver end-to-end digital transformation by combining strategy, engineering, and design. From discovery to deployment, we build secure, scalable solutions that accelerate outcomes and create lasting value.'
);

INSERT INTO public.hero_slides (title, description, sort_order) VALUES
  ('Innovating with AI & Cloud', 'We deliver AI, cloud and automation solutions to accelerate business outcomes and drive measurable value.', 0),
  ('Cloud-Native Platforms', 'Build and operate resilient cloud platforms that scale with your business and reduce time-to-market.', 1),
  ('Data & Analytics at Scale', 'Turn data into actionable insights with analytics, machine learning and trustworthy data platforms.', 2),
  ('Digital Transformation Solutions', 'We design and deliver end-to-end digital transformation — strategy, cloud, data and automation to drive measurable business outcomes.', 3);

INSERT INTO public.testimonials (name, text) VALUES
  ('Nafidh', 'Tekvion transformed our digital infrastructure with their exceptional cloud and AI solutions. Their end-to-end approach to digital transformation delivered measurable business outcomes within months. Highly recommended.'),
  ('Ahmed', 'The team at Tekvion provided outstanding cybersecurity and cloud migration services. Their expertise and dedication to client success is unmatched in the region.'),
  ('Sarah', 'Working with Tekvion on our data analytics platform was a game-changer. They delivered a scalable, future-proof solution that exceeded our expectations.');

INSERT INTO public.services (title, description, sort_order) VALUES
  ('AI & Machine Learning', 'Applied AI and ML solutions to automate decisions, personalize experiences and unlock new revenue streams.', 0),
  ('Cloud Computing', 'Cloud strategy, migration and managed services to build resilient, scalable platforms for modern apps.', 1),
  ('Big Data & Analytics', 'Scalable data platforms and analytics pipelines that turn raw data into actionable business insight.', 2),
  ('Cybersecurity', 'Comprehensive security services to protect data, secure applications and manage risk across your estate.', 3),
  ('API & Integration', 'Connect platforms and workflows with secure APIs, integrations, and scalable orchestration.', 4),
  ('Mobile & Web Development', 'Modern web and mobile products with exceptional UX, scalable architecture and rapid delivery.', 5),
  ('Intelligent Automation', 'Streamline operations with workflow automation, RPA, and AI-driven process optimization.', 6),
  ('IT & Infrastructure', 'Resilient infrastructure, observability, and managed services to keep systems secure and fast.', 7);

INSERT INTO public.solutions (title, icon_name, sort_order) VALUES
  ('Data Management', 'Database', 0),
  ('Enterprise Applications', 'Building2', 1),
  ('Automation and Integration', 'Cog', 2),
  ('Artificial Intelligence and Agentic AI', 'Lightbulb', 3),
  ('Cybersecurity and Digital Trust', 'Shield', 4),
  ('AI Infrastructure & Cloud Sovereignty', 'Cloud', 5),
  ('Sustainable & Green Technology', 'Leaf', 6),
  ('Information Technology Governance', 'Scale', 7),
  ('Managed IT Services', 'Monitor', 8),
  ('IT Service Management', 'ListChecks', 9);
