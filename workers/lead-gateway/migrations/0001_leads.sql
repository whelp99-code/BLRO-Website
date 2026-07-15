CREATE TABLE IF NOT EXISTS leads (
  lead_id TEXT PRIMARY KEY NOT NULL,
  created_at TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  topic TEXT NOT NULL,
  source TEXT NOT NULL,
  status TEXT NOT NULL,
  encrypted_payload BLOB NOT NULL,
  payload_key_version TEXT NOT NULL,
  delivery_state TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  idempotency_hash TEXT NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS leads_expires_at_index ON leads (expires_at);
CREATE INDEX IF NOT EXISTS leads_delivery_state_index ON leads (delivery_state, created_at);
