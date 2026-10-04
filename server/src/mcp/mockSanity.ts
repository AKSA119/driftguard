import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KnowledgeBaseItem } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDatasetDir(): string {
  const candidates = [
    path.resolve(__dirname, '../../../data'),
    path.resolve(process.cwd(), 'data'),
    path.resolve(process.cwd(), '../data'),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  return candidates[0];
}

const DATA_DIR = getDatasetDir();

class MockSanityKnowledgeBase {
  private items: KnowledgeBaseItem[] = [];

  constructor() {
    this.loadDatasets();
  }

  private loadDatasets() {
    const files = [
      'vercel-ai-sdk-kb.json',
      'nextjs-migration-kb.json',
      'pydantic-v2-kb.json'
    ];

    for (const file of files) {
      const filePath = path.join(DATA_DIR, file);
      try {
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          const parsed = JSON.parse(content) as KnowledgeBaseItem[];
          this.items.push(...parsed);
        }
      } catch (err) {
        console.error(`Failed to load dataset ${file}:`, err);
      }
    }
  }

  public getAll(): KnowledgeBaseItem[] {
    return this.items;
  }

  public query(queryText: string, ecosystem?: string): KnowledgeBaseItem[] {
    const lowerQuery = queryText.toLowerCase();
    return this.items.filter((item) => {
      if (ecosystem && item.ecosystem !== ecosystem) {
        return false;
      }
      return (
        item.feature.toLowerCase().includes(lowerQuery) ||
        item.deprecatedPattern.toLowerCase().includes(lowerQuery) ||
        item.summary.toLowerCase().includes(lowerQuery) ||
        (item.contradiction?.conflictingClaim &&
          item.contradiction.conflictingClaim.toLowerCase().includes(lowerQuery))
      );
    });
  }

  public getByEcosystem(ecosystem: string): KnowledgeBaseItem[] {
    return this.items.filter((item) => item.ecosystem === ecosystem);
  }

  public getContradictions(): KnowledgeBaseItem[] {
    return this.items.filter((item) => item.contradiction?.hasConflict);
  }
}

export const mockSanity = new MockSanityKnowledgeBase();
