import React from 'react';
import { XCircle, ShieldCheck, Sparkles, CheckCircle2, GitCompare, ArrowRight } from 'lucide-react';

export const BentoComparison: React.FC = () => {
  return (
    <section id="why-sanity" className="py-20 px-4 sm:px-6 border-t border-slate-800/80 bg-[#07090D] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 font-bold text-xs mb-2 border border-rose-500/20 font-mono">
              <span>✱ WHY SANITY CONTEXT WINS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              The Architecture of Truth.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              Why standard vector similarity falls apart when documentation conflicts, and how Sanity Context guarantees canonical code.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span>METHODOLOGY :: SANITY_MCP_V1</span>
          </div>
        </div>

        {/* 3-Card Asymmetric Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Bento Card 1: Outdated LLM Memory (4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#0B0D13] border border-red-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 text-lg font-black">
                ✱
              </div>

              <div className="text-red-400 font-mono text-[11px] uppercase font-bold tracking-wider mb-1">
                The Pain Point
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-4">
                Outdated LLM Memory.
              </h3>

              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Standard LLMs are trained on billions of lines of obsolete 2022 code. When Next.js or the Vercel AI SDK release breaking changes, models continue recommending dead APIs that fail at runtime.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 font-mono text-[11px] text-red-300 space-y-1">
              <div className="text-slate-500 line-through">// 2023 Outdated Pattern</div>
              <div className="line-through">new StreamingTextResponse(stream);</div>
              <div className="text-red-400 text-[10px] font-bold">💥 Runtime Crash in v4</div>
            </div>
          </div>

          {/* Bento Card 2: Vibrant Crimson-to-Purple Card (4 cols) - Inspired by Canva Ref 4 */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-purple-800 text-white shadow-2xl shadow-rose-950/50 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white mb-6 text-lg font-black">
                ✦
              </div>

              <div className="text-white/80 font-mono text-[11px] uppercase font-bold tracking-wider mb-1">
                The Hackathon Secret Sauce
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-4">
                Contradiction Arbiter.
              </h3>

              <p className="text-white/90 text-xs leading-relaxed mb-6">
                When two web sources contradict each other (e.g. an old tutorial vs. a new changelog), Sanity surfaces both side-by-side in your dashboard. The human decision you make carries across all future builds over MCP.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/30 border border-white/20 backdrop-blur text-[11px] space-y-1 font-mono">
              <div className="text-rose-200 font-bold">SANITY STUDIO RULING:</div>
              <div className="text-white">"Official Release Notes supersede all 3.x community tutorials."</div>
            </div>
          </div>

          {/* Bento Card 3: Cyber Grounded Modern Syntax (4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#0B0D13] border border-cyan-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 text-lg font-black">
                ✱
              </div>

              <div className="text-cyan-400 font-mono text-[11px] uppercase font-bold tracking-wider mb-1">
                The Outcome
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-4">
                100% Grounded Diff.
              </h3>

              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                DriftGuard translates the human-approved Sanity ruling directly into modern, type-safe syntax. Every line links to the official RFC document anchor.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 font-mono text-[11px] text-cyan-300 space-y-1">
              <div className="text-slate-400">// Grounded Canonical Syntax</div>
              <div className="text-emerald-400 font-bold">result.toDataStreamResponse();</div>
              <div className="text-cyan-400 text-[10px]">✔ Grounded in Official RFC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
