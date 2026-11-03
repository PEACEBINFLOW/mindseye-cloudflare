// API service layer for MindsEye Dashboard
// Connects to Cloudflare Worker backend

const BASE = import.meta.env.VITE_API_BASE?.trim() || 'http://localhost:8787';

async function json(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export const api = {
  async getEvents(limit = 100) {
    return json(`${BASE}/events?limit=${limit}`);
  },

  async getStats(bucket = 'minute', minutes = 60) {
    return json(`${BASE}/events/stats?bucket=${bucket}&minutes=${minutes}`);
  },

  async createEvent(payload) {
    const res = await fetch(`${BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  },
};
