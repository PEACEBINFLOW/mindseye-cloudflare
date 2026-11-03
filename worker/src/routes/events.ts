import { Hono } from 'hono';
import type { Env } from '../types';
import { parseTags } from '../utils/binflow';

const events = new Hono<{ Bindings: Env }>();

// POST /events — create event
events.post('/', async (c) => {
  const body = await c.req.json();
  const { timestamp, type, source, value, tags } = body;

  if (!type || !source) {
    return c.json({ error: 'type and source are required' }, 400);
  }

  const ts = timestamp || new Date().toISOString();
  const tagsJson = JSON.stringify(tags || []);

  const result = await c.env.DB
    .prepare(
      'INSERT INTO events (timestamp, type, source, value, tags) VALUES (?, ?, ?, ?, ?) RETURNING *'
    )
    .bind(ts, type, source, value ?? null, tagsJson)
    .first();

  return c.json(result, 201);
});

// GET /events — list recent events
events.get('/', async (c) => {
  const limit = Math.min(parseInt(c.req.query('limit') || '100', 10), 500);

  const { results } = await c.env.DB
    .prepare('SELECT * FROM events ORDER BY timestamp DESC LIMIT ?')
    .bind(limit)
    .all();

  const rows = results.map((r: any) => ({
    ...r,
    tags: parseTags(r.tags),
  }));

  return c.json(rows);
});

// GET /events/stats — time-bucket aggregation
events.get('/stats', async (c) => {
  const minutes = Math.min(parseInt(c.req.query('minutes') || '60', 10), 1440);
  const bucket = (c.req.query('bucket') || 'minute').toLowerCase();

  const since = new Date(Date.now() - minutes * 60 * 1000).toISOString();

  let groupExpr: string;
  if (bucket === 'day') {
    groupExpr = "strftime('%Y-%m-%d', timestamp)";
  } else if (bucket === 'hour') {
    groupExpr = "strftime('%Y-%m-%dT%H:00:00', timestamp)";
  } else {
    groupExpr = "strftime('%Y-%m-%dT%H:%M:00', timestamp)";
  }

  const { results } = await c.env.DB
    .prepare(
      `SELECT ${groupExpr} AS bucket,
              COUNT(*) AS count,
              AVG(value) AS avgValue
       FROM events
       WHERE timestamp >= ?
       GROUP BY bucket
       ORDER BY bucket ASC`
    )
    .bind(since)
    .all();

  return c.json(results);
});

export default events;
