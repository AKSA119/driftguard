import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Root healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'driftguard-agent-engine', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🛡️  DriftGuard Agent Engine (Sanity Context MCP)`);
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📡 Sanity MCP Client Initialized`);
  console.log(`====================================================`);
});
