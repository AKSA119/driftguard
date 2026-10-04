import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck, GitFork, ArrowRight } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="why-sanity" className="py-20 px-6 border-t border-slate-800/80 bg-[#090B0F]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">
            The Problem We Cannot Afford to Get Wrong
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Standard RAG Fails on Fast-Moving Code
          </h3>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            When major frameworks upgrade, the internet is flooded with outdated StackOverflow answers. Generic vector search dumps both into the LLM prompt, forcing the model to guess.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Standard LLM / RAG */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-red-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Standard LLMs & Naive RAG</h4>
                <p className="text-xs text-red-400">Blends conflicting information without context</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Hallucinates Obsolete APIs:</strong> Saturated training data causes models to output deprecated methods like <code className="text-red-300">StreamingTextResponse</code>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Confused by Contradictions:</strong> When a 2023 tutorial contradicts a 2024 changelog, vector similarity retrieves both, leading to random picks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span>
                  <strong>No Audit Trail:</strong> Zero source verification; developers waste hours debugging code that looks syntactically valid.
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: Sanity Context Solution */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-emerald-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Sanity Context MCP Architecture</h4>
                <p className="text-xs text-emerald-400">Structured Knowledge Base with Human Contradiction Resolution</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Contradiction Flagging:</strong> Discrepancies between community tutorials and official release notes surface side-by-side in the Sanity Dashboard.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Human Editorial Override:</strong> Decisions made once by engineering leads persist across every future agent interaction over MCP.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>
                  <strong>100% Traceable Citations:</strong> Every line diagnosis points directly to the authoritative changelog anchor.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
