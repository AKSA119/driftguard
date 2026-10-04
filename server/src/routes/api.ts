import { Router, Request, Response } from 'express';
import { scanCode } from '../agent/scanner.js';
import { refactorCode } from '../agent/refactorer.js';
import { sanityClient } from '../mcp/sanityClient.js';
import { groqService } from '../agent/groqClient.js';

export const apiRouter = Router();

// 1. Audit code endpoint
apiRouter.post('/audit', async (req: Request, res: Response) => {
  try {
    const { code, ecosystem } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Field "code" is required.' });
    }

    const result = await scanCode(code, ecosystem);
    return res.json(result);
  } catch (err: any) {
    console.error('Error during code audit:', err);
    return res.status(500).json({ error: err.message || 'Internal audit error' });
  }
});

// 2. Refactor code endpoint
apiRouter.post('/refactor', async (req: Request, res: Response) => {
  try {
    const { code, issues, ecosystem } = req.body;
    if (!code || !issues) {
      return res.status(400).json({ error: 'Both "code" and "issues" are required.' });
    }

    const result = await refactorCode(code, issues, ecosystem || 'vercel-ai-sdk');
    return res.json(result);
  } catch (err: any) {
    console.error('Error during code refactor:', err);
    return res.status(500).json({ error: err.message || 'Internal refactor error' });
  }
});

// 3. MCP Status endpoint
apiRouter.get('/mcp-status', async (_req: Request, res: Response) => {
  try {
    const status = await sanityClient.getStatus();
    return res.json({
      ...status,
      groqConnected: groqService.hasKey(),
      groqModel: 'openai/gpt-oss-120b',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 4. Knowledge Base Inspector endpoint
apiRouter.get('/knowledge-base', (_req: Request, res: Response) => {
  try {
    const items = sanityClient.getAllKnowledgeBaseItems();
    const contradictions = sanityClient.getContradictions();
    return res.json({ items, contradictions });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 5. Dynamic MCP Configuration endpoint
apiRouter.post('/mcp-configure', async (req: Request, res: Response) => {
  try {
    const { endpoint, projectId, dataset, token, groqApiKey } = req.body;
    sanityClient.updateConfig({ endpoint, projectId, dataset, token });
    if (groqApiKey && typeof groqApiKey === 'string') {
      groqService.setApiKey(groqApiKey);
    }
    const newStatus = await sanityClient.getStatus();
    return res.json({
      success: true,
      status: {
        ...newStatus,
        groqConnected: groqService.hasKey(),
        groqModel: 'openai/gpt-oss-120b',
      },
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});
