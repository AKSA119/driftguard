export interface ContradictionInfo {
  hasConflict: boolean;
  conflictingClaim?: string;
  officialClaim?: string;
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface AuditIssue {
  id: string;
  lineNumber: number;
  snippet: string;
  feature: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  summary: string;
  deprecatedIn: string;
  removedIn: string;
  replacementPattern: string;
  source: {
    url: string;
    title: string;
    section: string;
  };
  contradiction?: ContradictionInfo;
}

export interface AuditResult {
  ecosystem: string;
  totalIssues: number;
  criticalCount: number;
  highCount: number;
  issues: AuditIssue[];
  contradictionsFound: number;
  scannedAt: string;
  mcpSource: string;
}

export interface RefactorResult {
  originalCode: string;
  refactoredCode: string;
  changesApplied: {
    feature: string;
    before: string;
    after: string;
    sourceRef: string;
  }[];
  explanation: string;
}

export interface McpStatus {
  mode: 'live' | 'simulation';
  endpoint: string;
  connected: boolean;
  documentsIndexed: number;
  contradictionsTracked: number;
  latencyMs: number;
  ecosystems: string[];
  groqConnected?: boolean;
  groqModel?: string;
}

export interface CodePreset {
  id: string;
  name: string;
  ecosystem: string;
  description: string;
  tag: string;
  code: string;
}
