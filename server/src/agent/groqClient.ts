import dotenv from 'dotenv';
import { AuditResult, AuditIssue, RefactorResult, KnowledgeBaseItem } from '../types.js';

dotenv.config();

class GroqAgentService {
  private apiKey: string | null = null;
  private model: string = 'openai/gpt-oss-120b';

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || null;
  }

  public setApiKey(key: string) {
    this.apiKey = key.trim();
  }

  public getApiKey(): string | null {
    return this.apiKey || process.env.GROQ_API_KEY || null;
  }

  public hasKey(): boolean {
    const k = this.getApiKey();
    return !!(k && k.startsWith('gsk_'));
  }

  public async auditCode(code: string, kbItems: KnowledgeBaseItem[]): Promise<AuditResult | null> {
    const activeKey = this.getApiKey();
    if (!activeKey || !this.hasKey()) return null;

    const lines = code.split('\n');
    const numberedCode = lines.map((l, idx) => `${idx + 1}: ${l}`).join('\n');

    const systemPrompt = `You are DriftGuard, an autonomous code auditor powered by Sanity Context Knowledge Bases over the Model Context Protocol (MCP).
Your task is to analyze user-provided code and flag ANY deprecated, outdated, breaking, or hallucinated patterns.
Cross-reference the code against the provided Sanity Knowledge Base items and modern ecosystem best practices.
You MUST output strictly valid JSON matching this schema with NO markdown wrapping, NO backticks:
{
  "ecosystem": "detected-framework",
  "totalIssues": number,
  "criticalCount": number,
  "highCount": number,
  "issues": [
    {
      "id": "unique-id",
      "lineNumber": 1,
      "snippet": "exact line from code",
      "feature": "Name of deprecated feature",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM",
      "summary": "Clear explanation of deprecation and why it breaks",
      "deprecatedIn": "version",
      "removedIn": "version",
      "replacementPattern": "canonical modern syntax",
      "source": {
        "url": "https://...",
        "title": "Official Doc or RFC Title",
        "section": "Section Name"
      },
      "contradiction": {
        "hasConflict": true,
        "conflictingClaim": "Outdated tutorial / LLM claim",
        "officialClaim": "Official release notes claim",
        "resolution": "Sanity Studio Human Ruling",
        "resolvedBy": "Lead Architect",
        "resolvedAt": "2024-11-15T10:30:00Z"
      }
    }
  ],
  "contradictionsFound": number,
  "scannedAt": "ISO Date",
  "mcpSource": "Sanity Context MCP Knowledge Base (Groq Llama 3.3 Enhanced)"
}`;

    const userPrompt = `AUTHORITATIVE KNOWLEDGE BASE RULINGS:
${JSON.stringify(kbItems, null, 2)}

USER CODE UNDER AUDIT (with 1-indexed line numbers):
${numberedCode}

Audit every line carefully. Match exact line numbers. Output ONLY the JSON.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getApiKey()}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API audit error:', errorText);
        return null;
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      if (!content) return null;

      const parsed: AuditResult = JSON.parse(content);
      return parsed;
    } catch (err) {
      console.error('Groq audit execution failed:', err);
      return null;
    }
  }

  public async refactorCode(
    originalCode: string,
    issues: AuditIssue[],
    ecosystem: string
  ): Promise<RefactorResult | null> {
    if (!this.hasKey()) return null;

    const systemPrompt = `You are DriftGuard's Grounded Refactoring Engine.
Your task is to take the original user code and refactor it into clean, modern, canonical syntax, fixing all identified deprecations.
Rules:
1. Preserve user code structure, comments, variables, and logic that are not deprecated.
2. Replace all deprecated patterns with canonical modern syntax according to official RFCs.
3. Return strictly valid JSON with no markdown wrapping:
{
  "refactoredCode": "string",
  "changesApplied": [
    {
      "feature": "Feature name",
      "before": "old code snippet",
      "after": "new canonical snippet",
      "sourceRef": "https://..."
    }
  ],
  "explanation": "Summary of refactoring grounded in Sanity Knowledge Base"
}`;

    const userPrompt = `ECOSYSTEM: ${ecosystem}
ISSUES TO FIX:
${JSON.stringify(issues, null, 2)}

ORIGINAL CODE:
${originalCode}

Refactor the code now. Output ONLY the JSON.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getApiKey()}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API refactor error:', errorText);
        return null;
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      if (!content) return null;

      const parsed: RefactorResult = JSON.parse(content);
      return parsed;
    } catch (err) {
      console.error('Groq refactor execution failed:', err);
      return null;
    }
  }
}

export const groqService = new GroqAgentService();
