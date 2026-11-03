import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import health from './routes/health';
import events from './routes/events';

const app = new Hono<{ Bindings: Env }>();

// CORS for frontend (Pages domain)
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.route('/health', health);
app.route('/events', events);

// 404
app.notFound((c) => c.json({ error: 'Not Found' }, 404));

// Error handler
app.onError((err, c) => {
  console.error('🔥 Error:', err);
  return c.json({ error: err.message || 'Internal Server Error' }, 500);
});

export default app;
