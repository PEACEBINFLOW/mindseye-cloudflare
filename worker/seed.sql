-- Sample seed data
INSERT INTO events (timestamp, type, source, value, tags) VALUES
  (datetime('now', '-5 minutes'), 'signal',  'mindseye', 0.72, '["demo","alpha"]'),
  (datetime('now', '-4 minutes'), 'signal',  'mindseye', 0.65, '["demo","alpha"]'),
  (datetime('now', '-3 minutes'), 'note',    'binflow',  NULL, '["note"]'),
  (datetime('now', '-2 minutes'), 'signal',  'sensor',   0.91, '["spike","beta"]'),
  (datetime('now', '-1 minutes'), 'anomaly', 'mindseye', 0.15, '["flat","gamma"]');
