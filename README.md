# MindsEye — Cloudflare MVP (Workers + D1 + Pages)

A minimal, edge-native MVP for MindsEye: a cognitive dashboard that visualizes time-labeled events (BinFlow-style) over time.

## Stack
- **Backend**: Cloudflare Workers + Hono + D1 (SQLite)
- **Frontend**: Cloudflare Pages + Vite + React
- **Database**: Cloudflare D1 (serverless SQL)

## Quick Start

### 1. Install dependencies
```bash
cd worker && npm install
cd ../client && npm install
