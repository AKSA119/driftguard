import { sanityClient } from '../mcp/sanityClient.js';
import { AuditIssue, AuditResult } from '../types.js';
import { groqService } from './groqClient.js';

export function detectEcosystem(code: string): string {
  if (code.includes('StreamingTextResponse') || code.includes('OpenAIStream') || code.includes('ai') || code.includes('streamText')) {
    return 'vercel-ai-sdk';
  }
  if (code.includes('getServerSideProps') || code.includes('next/headers') || code.includes('params') || code.includes('next/server')) {
    return 'nextjs';
  }
  if (code.includes('BaseModel') || code.includes('@validator') || code.includes('orm_mode') || code.includes('.dict()')) {
    return 'pydantic';
  }
  return 'general-typescript';
}

export async function scanCode(code: string, ecosystemHint?: string): Promise<AuditResult> {
  const ecosystem = ecosystemHint || detectEcosystem(code);
  const kbItems = await sanityClient.queryKnowledgeBase('', ecosystem);

  // If Groq API key is present, run universal AI analysis over any code
  if (groqService.hasKey()) {
    try {
      const groqResult = await groqService.auditCode(code, kbItems);
      if (groqResult && groqResult.issues) {
        return groqResult;
      }
    } catch (err) {
      console.warn('Groq AI audit fallback to deterministic scanner:', err);
    }
  }

  // Deterministic fallback scanner
  const lines = code.split('\n');
  const issues: AuditIssue[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    for (const item of kbItems) {
      let isMatch = false;

      // Match logic based on item patterns
      if (item.id === 'ai-sdk-001' && (line.includes('StreamingTextResponse') || line.includes('new StreamingTextResponse'))) {
        isMatch = true;
      } else if (item.id === 'ai-sdk-002' && (line.includes('OpenAIStream(') || line.includes("from 'ai'") && line.includes('OpenAIStream'))) {
        isMatch = true;
      } else if (item.id === 'ai-sdk-003' && line.includes('experimental_onFunctionCall')) {
        isMatch = true;
      } else if (item.id === 'nextjs-001' && (line.match(/const\s*\{\s*.*\s*\}\s*=\s*params/) || (line.includes('params.') && !line.includes('await params')))) {
        isMatch = true;
      } else if (item.id === 'nextjs-002' && line.includes('export async function getServerSideProps')) {
        isMatch = true;
      } else if (item.id === 'nextjs-003' && line.includes('cookies()') && !line.includes('await cookies()')) {
        isMatch = true;
      } else if (item.id === 'pydantic-001' && (line.includes('class Config:') || line.includes('orm_mode = True'))) {
        isMatch = true;
      } else if (item.id === 'pydantic-002' && (line.includes('@validator(') || line.includes('@root_validator('))) {
        isMatch = true;
      } else if (item.id === 'pydantic-003' && line.includes('.dict()')) {
        isMatch = true;
      }

      if (isMatch) {
        // Avoid duplicate issue for the exact same line & item
        const exists = issues.some((iss) => iss.lineNumber === lineNum && iss.feature === item.feature);
        if (!exists) {
          issues.push({
            id: `${item.id}-line-${lineNum}`,
            lineNumber: lineNum,
            snippet: line.trim(),
            feature: item.feature,
            severity: item.severity,
            summary: item.summary,
            deprecatedIn: item.deprecatedIn,
            removedIn: item.removedIn,
            replacementPattern: item.replacementPattern,
            source: {
              url: item.sourceUrl,
              title: item.sourceTitle,
              section: item.sourceSection,
            },
            contradiction: item.contradiction,
          });
        }
      }
    }
  }

  const criticalCount = issues.filter((i) => i.severity === 'CRITICAL').length;
  const highCount = issues.filter((i) => i.severity === 'HIGH').length;
  const contradictionsFound = issues.filter((i) => i.contradiction?.hasConflict).length;

  return {
    ecosystem,
    totalIssues: issues.length,
    criticalCount,
    highCount,
    issues,
    contradictionsFound,
    scannedAt: new Date().toISOString(),
    mcpSource: 'Sanity Context MCP Knowledge Base',
  };
}
