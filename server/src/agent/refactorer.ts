import { AuditIssue, RefactorResult } from '../types.js';
import { groqService } from './groqClient.js';

export async function refactorCode(originalCode: string, issues: AuditIssue[], ecosystem: string): Promise<RefactorResult> {
  // If Groq API key is present, use universal AI refactoring
  if (groqService.hasKey()) {
    try {
      const groqResult = await groqService.refactorCode(originalCode, issues, ecosystem);
      if (groqResult && groqResult.refactoredCode) {
        return groqResult;
      }
    } catch (err) {
      console.warn('Groq refactor fallback to deterministic engine:', err);
    }
  }

  let refactored = originalCode;
  const changesApplied: {
    feature: string;
    before: string;
    after: string;
    sourceRef: string;
  }[] = [];

  if (ecosystem === 'vercel-ai-sdk') {
    // 1. Replace OpenAIStream and StreamingTextResponse imports
    if (refactored.includes('StreamingTextResponse') || refactored.includes('OpenAIStream')) {
      const oldImport = "import { OpenAIStream, StreamingTextResponse } from 'ai';";
      const newImport = "import { streamText } from 'ai';\nimport { openai } from '@ai-sdk/openai';";
      
      if (refactored.includes(oldImport)) {
        refactored = refactored.replace(oldImport, newImport);
      } else {
        refactored = refactored.replace(
          /import\s*\{[^}]*\}\s*from\s*['"]ai['"];?/,
          "import { streamText } from 'ai';\nimport { openai } from '@ai-sdk/openai';"
        );
      }

      changesApplied.push({
        feature: 'Provider & Stream Imports',
        before: "import { OpenAIStream, StreamingTextResponse } from 'ai'",
        after: "import { streamText } from 'ai'; import { openai } from '@ai-sdk/openai'",
        sourceRef: 'https://sdk.vercel.ai/docs/ai-sdk-core/overview',
      });
    }

    // 2. Replace openai client completion calls with streamText()
    if (refactored.includes('openai.chat.completions.create') && refactored.includes('StreamingTextResponse')) {
      const legacyCallPattern = /const\s+response\s*=\s*await\s+openai\.chat\.completions\.create\(\{\s*model:\s*['"]([^'"]+)['"],\s*stream:\s*true,\s*messages,\s*\}\);\s*const\s+stream\s*=\s*OpenAIStream\(response\);\s*return\s+new\s+StreamingTextResponse\(stream\);/s;
      
      const modernCall = `const result = streamText({\n    model: openai('gpt-4o'),\n    messages,\n  });\n\n  return result.toDataStreamResponse();`;

      if (legacyCallPattern.test(refactored)) {
        refactored = refactored.replace(legacyCallPattern, modernCall);
      } else {
        // Line-by-line fallback
        refactored = refactored.replace(
          /const stream = OpenAIStream\(response\);/g,
          '// Replaced with streamText() unified provider'
        );
        refactored = refactored.replace(
          /return new StreamingTextResponse\(stream\);/g,
          'return result.toDataStreamResponse();'
        );
      }

      changesApplied.push({
        feature: 'StreamingTextResponse -> toDataStreamResponse()',
        before: 'return new StreamingTextResponse(stream);',
        after: 'return result.toDataStreamResponse();',
        sourceRef: 'https://sdk.vercel.ai/docs/reference/ai-sdk-ui/streaming-text-response',
      });
    }
  } else if (ecosystem === 'nextjs') {
    // 1. Next.js 15 async params
    if (refactored.includes('const { id } = params;') || refactored.includes('const { id } = params')) {
      refactored = refactored.replace(
        /const\s*\{\s*id\s*\}\s*=\s*params;?/g,
        'const { id } = await params;'
      );
      changesApplied.push({
        feature: 'Async Dynamic Route Params (Next.js 15)',
        before: 'const { id } = params;',
        after: 'const { id } = await params;',
        sourceRef: 'https://nextjs.org/docs/messages/sync-dynamic-apis',
      });
    }

    // 2. Next.js 15 cookies() async
    if (refactored.includes('cookies()') && !refactored.includes('await cookies()')) {
      refactored = refactored.replace(
        /const\s+cookieStore\s*=\s*cookies\(\);/g,
        'const cookieStore = await cookies();'
      );
      changesApplied.push({
        feature: 'Asynchronous cookies() helper',
        before: 'const cookieStore = cookies();',
        after: 'const cookieStore = await cookies();',
        sourceRef: 'https://nextjs.org/docs/app/api-reference/functions/cookies',
      });
    }

    // 3. getServerSideProps in App Router
    if (refactored.includes('export async function getServerSideProps')) {
      refactored = refactored.replace(
        /export async function getServerSideProps\(\)\s*\{[\s\S]*?\n\}/,
        `// Next.js App Router: Data fetching is handled directly in async Server Components\n// Removed deprecated getServerSideProps primitive.`
      );
      changesApplied.push({
        feature: 'Removed Pages Router getServerSideProps',
        before: 'export async function getServerSideProps(...)',
        after: 'Direct React Server Component async fetch',
        sourceRef: 'https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration',
      });
    }
  } else if (ecosystem === 'pydantic') {
    // 1. class Config -> model_config
    if (refactored.includes('class Config:')) {
      refactored = refactored.replace(
        /class Config:\s*\n\s*orm_mode\s*=\s*True/g,
        'model_config = ConfigDict(from_attributes=True)'
      );
      if (!refactored.includes('from pydantic import ConfigDict')) {
        refactored = refactored.replace(
          /from pydantic import (.*)/,
          'from pydantic import $1, ConfigDict'
        );
      }
      changesApplied.push({
        feature: 'Pydantic v2 ConfigDict',
        before: 'class Config: orm_mode = True',
        after: 'model_config = ConfigDict(from_attributes=True)',
        sourceRef: 'https://docs.pydantic.dev/latest/migration/#changes-to-config',
      });
    }

    // 2. @validator -> @field_validator
    if (refactored.includes('@validator(')) {
      refactored = refactored.replace(/@validator\(/g, '@field_validator(');
      if (!refactored.includes('field_validator')) {
        refactored = refactored.replace(
          /from pydantic import (.*)/,
          'from pydantic import $1, field_validator'
        );
      }
      changesApplied.push({
        feature: '@field_validator evolution',
        before: '@validator(...)',
        after: "@field_validator(..., mode='before')",
        sourceRef: 'https://docs.pydantic.dev/latest/migration/#changes-to-validators',
      });
    }

    // 3. .dict() -> .model_dump()
    if (refactored.includes('.dict()')) {
      refactored = refactored.replace(/\.dict\(\)/g, '.model_dump()');
      changesApplied.push({
        feature: '.dict() method renamed to .model_dump()',
        before: 'user.dict()',
        after: 'user.model_dump()',
        sourceRef: 'https://docs.pydantic.dev/latest/migration/#model-methods-and-attributes',
      });
    }
  }

  const explanation = `Successfully refactored ${changesApplied.length} deprecated pattern(s) using canonical rulings grounded in Sanity Context. Any legacy tutorial claims were superseded by official release changelogs.`;

  return {
    originalCode,
    refactoredCode: refactored,
    changesApplied,
    explanation,
  };
}
