CREATE TABLE IF NOT EXISTS analytics_events (
  event_id TEXT PRIMARY KEY,
  received_at TEXT NOT NULL,
  event_name TEXT NOT NULL,
  cta_id TEXT,
  placement TEXT,
  landing_path TEXT,
  topic TEXT,
  field TEXT,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_received_at
  ON analytics_events(received_at);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name_received_at
  ON analytics_events(event_name, received_at);

CREATE INDEX IF NOT EXISTS idx_analytics_events_expires_at
  ON analytics_events(expires_at);
