-- Main key-value store for structured data (services, clients, portfolio, blog, team)
CREATE TABLE IF NOT EXISTS site_data (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed the known keys
INSERT INTO site_data (key, value) VALUES
  ('services', '[]'::jsonb),
  ('clients', '[]'::jsonb),
  ('portfolio', '[]'::jsonb),
  ('blog', '[]'::jsonb),
  ('team', '[]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT DEFAULT '',
  message TEXT NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW()
);
