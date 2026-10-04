import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Database, Zap, CheckCircle2, GitCompare, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenSanityModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSanityModal }) => {
  return (
    <section id="overview" className="relative pt-16 pb-20 px-6 overflow-hidden glow-bg">
      {/* Decorative background glow circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Hackathon Track Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-300 text-xs font-semibold mb-6 shadow-sm hover:border-rose-500/50 transition-colors cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-rose-400 font-bold">Path 1 Challenge:</span>
          <span>Ship an agent that queries real content</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.12]">
          Stop Debugging Phantom AI Code.{' '}
          <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Grounded in Real Content.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          AI coding tools constantly generate deprecated syntax from outdated 2022 tutorials.{' '}
          <strong className="text-white font-semibold">DriftGuard</strong> queries authoritative Sanity Context Knowledge Bases via{' '}
          <span className="text-rose-400 font-mono text-sm">Model Context Protocol (MCP)</span>, resolves conflicting documentation, and refactors broken code with 1-click precision.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#studio"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-xl shadow-rose-900/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Launch Interactive Studio</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onOpenSanityModal}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all hover:scale-[1.02] active:scale-95 shadow-md"
          >
            <Database className="w-4 h-4 text-rose-400" />
            <span>Explore Sanity Knowledge Base</span>
          </button>
        </div>

        {/* Live Metrics Proof Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur flex flex-col items-center">
            <span className="text-xl font-extrabold text-white">100%</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Source-Grounded</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur flex flex-col items-center">
            <span className="text-xl font-extrabold text-amber-400">6 Conflicts</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Resolved in Studio</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur flex flex-col items-center">
            <span className="text-xl font-extrabold text-rose-400">3 Frameworks</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Next.js, AI SDK, Pydantic</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur flex flex-col items-center">
            <span className="text-xl font-extrabold text-emerald-400">&lt; 15ms</span>
            <span className="text-[11px] text-slate-400 mt-0.5">MCP Protocol Latency</span>
          </div>
        </div>

        {/* Floating Product Preview Graphic */}
        <div className="mt-12 w-full max-w-4xl rounded-2xl border border-slate-800/90 bg-[#0E1017]/90 shadow-2xl overflow-hidden glow-card text-left">
          {/* Mock Browser/Editor Topbar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#141721] border-b border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-slate-500">driftguard --audit --mcp=sanity</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30">
              ● MCP Synced
            </span>
          </div>

          {/* Side-by-side teaser row */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 font-mono text-xs p-4 sm:p-5 gap-4">
            {/* Outdated AI Hallucination */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-red-400 font-semibold mb-2">
                <span>❌ Outdated AI Output (Runtime Crash)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-300">2023 Tutorial</span>
              </div>
              <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 text-slate-300 space-y-1 text-[11px]">
                <div className="text-slate-500 line-through">// Throws: StreamingTextResponse is deprecated in v4</div>
                <div className="text-red-300 line-through">const stream = OpenAIStream(response);</div>
                <div className="text-red-300 line-through">return new StreamingTextResponse(stream);</div>
              </div>
            </div>

            {/* Sanity Grounded Canonical Code */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-2">
                <span>✅ Grounded by Sanity Context MCP</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">v4 Canonical</span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-slate-300 space-y-1 text-[11px]">
                <div className="text-slate-400">// Grounded in official AI SDK Core RFC</div>
                <div className="text-emerald-300">const result = streamText(&#123; model, prompt &#125;);</div>
                <div className="text-emerald-300 font-semibold">return result.toDataStreamResponse();</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
