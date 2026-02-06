-- Initialize roles table and default roles
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO roles (name) VALUES ('常備兵') ON CONFLICT (name) DO NOTHING;
INSERT INTO roles (name) VALUES ('替代役') ON CONFLICT (name) DO NOTHING;
INSERT INTO roles (name) VALUES ('補充兵') ON CONFLICT (name) DO NOTHING;
INSERT INTO roles (name) VALUES ('admin') ON CONFLICT (name) DO NOTHING;
