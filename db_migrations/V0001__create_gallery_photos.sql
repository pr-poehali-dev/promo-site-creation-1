CREATE TABLE IF NOT EXISTS t_p31883984_promo_site_creation_.gallery_photos (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  title VARCHAR(120) DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
