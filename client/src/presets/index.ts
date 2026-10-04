import { CodePreset } from '../types';

export const PRESETS: CodePreset[] = [
  {
    id: 'vercel-ai-sdk',
    name: '⚡ Upgrade Legacy OpenAI Streaming',
    ecosystem: 'vercel-ai-sdk',
    tag: 'AI SDK v4',
    description: 'ChatGPT still writes 2023 StreamingTextResponse wrappers that crash in modern AI SDK v4.',
    code: `import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
  const { messages } = await req.json();

  // ⚠️ Outdated 2023 Pattern: ChatGPT constantly hallucinates this retired wrapper
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}`
  },
  {
    id: 'nextjs-15',
    name: '🚀 Fix Broken Next.js 15 Async Route',
    ecosystem: 'nextjs',
    tag: 'Next.js 15',
    description: 'Next.js 15 made params and cookies() asynchronous, breaking older synchronous patterns.',
    code: `import { cookies } from 'next/headers';

// ⚠️ Pages Router relic: Invalid inside Next.js App Router
export async function getServerSideProps() {
  return { props: { legacy: true } };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // ⚠️ Next.js 15: params is now a Promise; synchronous access throws warnings
  const { id } = params;
  
  // ⚠️ Next.js 15: cookies() is asynchronous
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');

  return (
    <div>
      <h1>Item ID: {id}</h1>
      <p>Token: {token?.value}</p>
    </div>
  );
}`
  },
  {
    id: 'pydantic-v2',
    name: '🐍 Migrate Pydantic Model to v2',
    ecosystem: 'pydantic',
    tag: 'Pydantic v2',
    description: 'FastAPI tutorials from 2022 teach class Config and @validator which trigger deprecation warnings in v2.',
    code: `from pydantic import BaseModel, validator

class UserProfile(BaseModel):
    id: int
    username: str
    email: str

    # ⚠️ Pydantic v2 deprecated 'class Config: orm_mode = True'
    class Config:
        orm_mode = True

    # ⚠️ Pydantic v2 deprecated @validator in favor of @field_validator
    @validator('username')
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username too short')
        return v.lower()

# ⚠️ Pydantic v2 deprecated .dict() in favor of .model_dump()
user = UserProfile(id=1, username="DevMaster", email="dev@example.com")
print(user.dict())`
  }
];
