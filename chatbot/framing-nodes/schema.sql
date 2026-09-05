-- Framing tool v2 — Postgres schema.
--
-- Two entities:
--   nodes    — libraries in the access tree. Each has a parent (except root),
--              a read capability, a write capability, a human name, and audit
--              fields for the future reports view.
--   framings — the actual documents (metrics pyramid + decisions + uncertainties
--              + subframes). Each framing lives inside exactly one node.
--
-- One helper table:
--   write_leases — soft-lock. At most one row per node; whoever holds a
--              non-expired lease is the current editor. Refreshed on every
--              save; other write-URL holders can force-take the lease.
--
-- Access model is enforced in application code (routes.js), not by row-level
-- security — the URL tokens ARE the capability.

CREATE TABLE IF NOT EXISTS nodes (
  id               SERIAL PRIMARY KEY,
  read_id          TEXT UNIQUE NOT NULL,
  write_token      TEXT UNIQUE NOT NULL,
  parent_id        INTEGER REFERENCES nodes(id) ON DELETE CASCADE,
  name             TEXT NOT NULL DEFAULT 'Untitled library',
  owner_label      TEXT NOT NULL DEFAULT '',
  is_root          BOOLEAN NOT NULL DEFAULT FALSE,
  is_public_users  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_write_at   TIMESTAMPTZ,
  created_ip_hash  TEXT
);

CREATE INDEX IF NOT EXISTS idx_nodes_parent      ON nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_nodes_read_id     ON nodes(read_id);
CREATE INDEX IF NOT EXISTS idx_nodes_write_token ON nodes(write_token);

-- Exactly one row may have is_root = true and exactly one is_public_users = true.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_root_node
  ON nodes((is_root)) WHERE is_root;
CREATE UNIQUE INDEX IF NOT EXISTS uniq_public_users_node
  ON nodes((is_public_users)) WHERE is_public_users;

CREATE TABLE IF NOT EXISTS framings (
  id           SERIAL PRIMARY KEY,
  node_id      INTEGER NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  title        TEXT NOT NULL DEFAULT 'Untitled framing',
  content      JSONB NOT NULL,
  size_bytes   INTEGER GENERATED ALWAYS AS (octet_length(content::text)) STORED,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_framings_node
  ON framings(node_id);
CREATE INDEX IF NOT EXISTS idx_framings_node_updated
  ON framings(node_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS write_leases (
  node_id      INTEGER PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
  holder_id    TEXT NOT NULL,
  holder_label TEXT,
  claimed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  refreshed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at   TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_write_leases_expires
  ON write_leases(expires_at);

-- updated_at auto-bump trigger for both nodes and framings.
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS nodes_touch ON nodes;
CREATE TRIGGER nodes_touch BEFORE UPDATE ON nodes
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

DROP TRIGGER IF EXISTS framings_touch ON framings;
CREATE TRIGGER framings_touch BEFORE UPDATE ON framings
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
