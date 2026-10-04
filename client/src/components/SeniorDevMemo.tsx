import React, { useState } from 'react';
import { UserCheck, MessageSquare, AlertOctagon, CheckCircle2, GitCompare, ExternalLink, Sparkles } from 'lucide-react';

interface Memo {
  id: string;
  author: string;
  role: string;
  avatarColor: string;
  framework: string;
  subject: string;
  quote: string;
  conflictingClaim: string;
  officialClaim: string;
  studioRuling: string;
  sourceDoc: string;
  sourceUrl: string;
}

const MEMOS: Memo[] = [
  {
    id: 'nextjs',
    author: 'Sarah Chen',
    role: 'Staff DX Engineer & Docs Lead',
    avatarColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    framework: 'Next.js 15',
    subject: 'PSA: Why ChatGPT keeps generating broken synchronous params in Next.js 15',
    quote:
      "Hey team — Next.js 15 made route params, searchParams, and cookies() asynchronous to align with React 19 microtasks. ChatGPT was trained on two years of 2023 tutorials that access 'params.id' synchronously. In our Sanity Studio dashboard, we flagged this conflict and officially enforced the async RFC ruling so our agents never write dead syntax.",
    conflictingClaim: "Older guides and ChatGPT access 'params.id' and 'cookies()' synchronously in Server Components.",
    officialClaim: "Next.js 15 throws runtime warnings: dynamic APIs must be awaited (const { id } = await params).",
    studioRuling: "Enforce Next.js 15 Async Request APIs RFC across all generated routes.",
    sourceDoc: 'Next.js 15 Async Request APIs RFC',
    sourceUrl: 'https://nextjs.org/docs/messages/sync-dynamic-apis',
  },
  {
    id: 'ai-sdk',
    author: 'Marcus Vance',
    role: 'Principal AI Architect',
    avatarColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    framework: 'Vercel AI SDK 4',
    subject: 'Breaking Change: StreamingTextResponse is retired in AI SDK v4',
    quote:
      "Quick heads up: the OpenAIStream and StreamingTextResponse wrappers from 2023 were completely retired in AI SDK v4 in favor of unified streamText() and toDataStreamResponse(). We saw hundreds of developers copy-pasting outdated AI code that crashed in production. We logged the errata in Sanity Context so DriftGuard refactors it automatically.",
    conflictingClaim: "Popular 2023 tutorials recommend wrapping every ChatGPT stream in 'new StreamingTextResponse(stream)'.",
    officialClaim: "AI SDK Core v4 replaces provider-specific stream wrappers with model-driven streamText() helpers.",
    studioRuling: "Retire legacy stream wrappers; standardize on streamText() and toDataStreamResponse().",
    sourceDoc: 'Vercel AI SDK Core Migration Guide',
    sourceUrl: 'https://sdk.vercel.ai/docs/reference/ai-sdk-ui/streaming-text-response',
  },
  {
    id: 'pydantic',
    author: 'Elena Rostova',
    role: 'Python Systems Architect',
    avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    framework: 'Pydantic v2',
    subject: 'Notice: class Config: orm_mode = True is deprecated',
    quote:
      "When upgrading FastAPI projects to Pydantic v2, models using 'class Config: orm_mode = True' and '@validator' throw deprecation warnings. The canonical replacement is ConfigDict(from_attributes=True) and @field_validator. We codified this in our Sanity Knowledge Base so your code remains clean and future-proof.",
    conflictingClaim: "FastAPI tutorials from 2022 instantiate models using 'class Config: orm_mode = True'.",
    officialClaim: "Pydantic v2 replaces 'orm_mode' with 'from_attributes = True' inside ConfigDict.",
    studioRuling: "Prohibit orm_mode; standardize on ConfigDict(from_attributes=True).",
    sourceDoc: 'Pydantic v2 Migration Guide',
    sourceUrl: 'https://docs.pydantic.dev/latest/migration/#changes-to-config',
  },
];

export const SeniorDevMemo: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('nextjs');
  const activeMemo = MEMOS.find((m) => m.id === selectedId) || MEMOS[0];

  return (
    <section id="senior-memos" className="py-20 px-4 sm:px-6 border-t border-slate-800/80 bg-[#090C12] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-bold text-xs mb-2 border border-cyan-500/20 font-mono">
              <UserCheck className="w-3.5 h-3.5" />
              <span>THE HUMAN TOUCH IN SANITY CONTEXT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Senior Engineer Review Memos.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
              Behind every Sanity Context decision is a real human engineering lead resolving conflicting documentation so your agent never guesses.
            </p>
          </div>

          {/* Engineer Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {MEMOS.map((memo) => (
              <button
                key={memo.id}
                onClick={() => setSelectedId(memo.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedId === memo.id
                    ? 'bg-white text-slate-950 shadow-lg'
                    : 'bg-[#121620] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{memo.author}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20 text-slate-600 font-mono">
                  {memo.framework}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The Active Senior Engineer Review Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Top Author Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm border ${activeMemo.avatarColor}`}
              >
                {activeMemo.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{activeMemo.author}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {activeMemo.framework} Lead
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{activeMemo.role}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sanity Studio Override: Active</span>
            </div>
          </div>

          {/* Memo Subject & Quote */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{activeMemo.subject}</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed p-4 rounded-2xl bg-[#080B10] border border-slate-800/80 italic font-normal">
              "{activeMemo.quote}"
            </p>
          </div>

          {/* Side-by-Side Claim Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Outdated Claim */}
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20 text-xs">
              <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1.5 text-[11px]">
                <AlertOctagon className="w-4 h-4 shrink-0" />
                <span>Outdated Tutorial / ChatGPT Memory:</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                "{activeMemo.conflictingClaim}"
              </p>
            </div>

            {/* Official Claim */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1.5 text-[11px]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Authoritative Official Release:</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                "{activeMemo.officialClaim}"
              </p>
            </div>
          </div>

          {/* Human Editorial Ruling Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 via-[#111520] to-cyan-950/30 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <GitCompare className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Studio Ruling:</strong> {activeMemo.studioRuling}
              </span>
            </div>

            <a
              href={activeMemo.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold group self-start sm:self-auto shrink-0"
            >
              <span>{activeMemo.sourceDoc}</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
