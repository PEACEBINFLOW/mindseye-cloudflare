-- 0001_init.sql — initial schema
CREATE TABLE IF NOT EXISTS events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp   TEXT    NOT NULL DEFAULT (datetime('now')),
  type        TEXT    NOT NULL,
  source      TEXT    NOT NULL,
  value       REAL    DEFAULT NULL,
  tags        TEXT    DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_events_type      ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_source    ON events(source);
