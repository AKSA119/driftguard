import React from 'react';
import { Database, ExternalLink, Layers, GitCompare, ShieldCheck } from 'lucide-react';

interface KnowledgeBaseShowcaseProps {
  onOpenSanityModal: () => void;
}

export const KnowledgeBaseShowcase: React.FC<KnowledgeBaseShowcaseProps> = ({ onOpenSanityModal }) => {
  const ecosystems = [
    {
      id: 'vercel-ai-sdk',
      name: 'Vercel AI SDK Core',
      version: 'v3.x → v4.x',
      badge: 'LLM Streaming',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description:
        'Tracks the major transition to unified streamText() and toDataStreamResponse(), eradicating legacy OpenAIStream wrappers.',
      rulings: 3,
      contradictions: 2,
      docUrl: 'https://sdk.vercel.ai/docs/ai-sdk-core/overview',
    },
    {
      id: 'nextjs',
      name: 'Next.js 14 → 15 Migration',
      version: 'v14.x → v15.x',
      badge: 'Async Request APIs',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      description:
        'Enforces asynchronous params and cookies() for React 19 microtask alignment, and blocks Pages Router primitives in App Router.',
      rulings: 3,
      contradictions: 2,
      docUrl: 'https://nextjs.org/docs/messages/sync-dynamic-apis',
    },
    {
      id: 'pydantic',
      name: 'Pydantic v1 → v2 Migration',
      version: 'v1.x → v2.x',
      badge: 'Python Data Models',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description:
        'Standardizes ConfigDict(from_attributes=True), @field_validator, and .model_dump() replacements across Python schemas.',
      rulings: 3,
      contradictions: 2,
      docUrl: 'https://docs.pydantic.dev/latest/migration/',
    },
  ];

  return (
    <section id="ecosystems" className="py-20 px-6 border-t border-slate-800/80 bg-[#090B0F]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">
              Verified Grounding Data
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Indexed Sanity Knowledge Bases
            </h3>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Curated official documentation and release changelogs where accuracy is non-negotiable.
            </p>
          </div>

          <button
            onClick={onOpenSanityModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all shadow-md self-start sm:self-auto"
          >
            <Database className="w-4 h-4 text-rose-400" />
            <span>Inspect Sanity Dashboard Data</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ecosystems.map((eco) => (
            <div
              key={eco.id}
              className="p-6 rounded-2xl bg-[#0E1017] border border-slate-800/90 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${eco.badgeColor}`}>
                    {eco.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">{eco.version}</span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">{eco.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{eco.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between py-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 mb-3">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{eco.rulings} Rules</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>{eco.contradictions} Contradictions</span>
                  </span>
                </div>

                <a
                  href={eco.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium group"
                >
                  <span>Official RFC Specification</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
