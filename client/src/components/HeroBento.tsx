import React from 'react';
import { ArrowRight, Sparkles, Database, Terminal, ShieldCheck, Radio, CheckCircle2, Zap } from 'lucide-react';

interface HeroBentoProps {
  onOpenSanityModal: () => void;
}

export const HeroBento: React.FC<HeroBentoProps> = ({ onOpenSanityModal }) => {
  return (
    <section id="overview" className="relative pt-12 pb-24 px-4 sm:px-6 overflow-hidden glow-bg">
      {/* 1. LARGE CENTER BACKGROUND ROBOT (Blended with depth and opacity) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 flex items-center justify-center w-full max-w-4xl">
        {/* Ambient Radial Cyan & Magenta Aura */}
        <div className="absolute w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-purple-600/25 blur-[120px] rounded-full" />
        
        {/* Rotating Holographic Circular HUD Rings */}
        <div className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full border border-cyan-400/20 border-dashed animate-[spin_80s_linear_infinite]" />
        <div className="absolute w-[550px] sm:w-[720px] h-[550px] sm:h-[720px] rounded-full border border-purple-500/15" />

        {/* Big Blurred 3D Cyber-Sentinel */}
        <img
          src="/driftguard_sentinel.jpg"
          alt="DriftGuard Cyber Sentinel"
          className="w-[380px] sm:w-[560px] md:w-[640px] opacity-40 mix-blend-screen filter blur-[0.5px] rounded-full object-contain [mask-image:radial-gradient(circle,black_55%,transparent_85%)] transition-opacity duration-700"
        />
      </div>

      {/* 2. FOREGROUND CONTENT (Layered cleanly on top) */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B0F17]/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-wide shadow-xl shadow-cyan-950/50 backdrop-blur-xl mb-6">
          <span className="text-cyan-400 font-extrabold text-sm">✱</span>
          <span className="uppercase tracking-wider font-mono text-[11px]">Autonomous Code Sentinel</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 font-normal">Sanity Hackathon Path 1</span>
        </div>

        {/* Massive Center Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.06] uppercase max-w-4xl">
          Stop Debugging{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Phantom AI Code.
          </span>{' '}
          Grounded in Truth.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
          AI coding tools constantly generate deprecated syntax from obsolete 2022 tutorials.{' '}
          <strong className="text-white font-semibold">DriftGuard</strong> queries authoritative Sanity Context Knowledge Bases via{' '}
          <span className="text-cyan-400 font-mono font-semibold">Model Context Protocol (MCP)</span>, surfaces conflicting documentation, and refactors broken code with zero guesswork.
        </p>

        {/* Main Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#studio"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95 glow-cyan"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Launch Live Studio</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onOpenSanityModal}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-[#0E131E]/80 hover:bg-[#151C2C] border border-cyan-500/30 backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Explore Sanity Knowledge Base</span>
          </button>
        </div>

        {/* 3. ASYMMETRIC BENTO METRIC CARDS ROW */}
        <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
          {/* Bento Card A: Cyan-to-Purple Gradient Card (4 cols) */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 text-white shadow-2xl shadow-cyan-950/40 border border-white/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/30 text-cyan-200">
                  Real-Time Audit
                </span>
                <span className="text-lg font-black">✱</span>
              </div>
              <h3 className="text-xl font-black tracking-tight mb-1">
                Zero Phantom Code
              </h3>
              <p className="text-white/85 text-xs leading-relaxed">
                Flags deprecated Next.js 15, Vercel AI SDK 4, and Pydantic v2 breaking changes in seconds.
              </p>
            </div>

            <a
              href="#studio"
              className="mt-4 inline-flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-200 transition-colors"
            >
              <span>Jump to Code Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Bento Card B: Deep Frosted Glass with Large Asterisk (4 cols) */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#090C14]/90 border border-cyan-500/20 text-white backdrop-blur-2xl shadow-xl flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-black text-white font-mono">100%</div>
                <div className="text-xs text-cyan-400 font-semibold mt-0.5">Source-Grounded</div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-lg font-black">
                ✱
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mt-4">
              Every single line diagnosis links directly to official release anchors. Zero hallucinations.
            </p>

            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Grounded via Sanity MCP</span>
            </div>
          </div>

          {/* Bento Card C: Cyber Telemetry Card (4 cols) */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#090C14]/90 border border-purple-500/20 text-white backdrop-blur-2xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-mono text-xs text-purple-300">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-bold">MCP_TELEMETRY</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                12ms Ping
              </span>
            </div>

            <div className="space-y-2 mt-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-slate-400">Knowledge Bases:</span>
                <span className="text-white font-bold">3 Synced</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-slate-400">Contradiction Overrides:</span>
                <span className="text-amber-400 font-bold">6 Active</span>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-slate-500 font-mono">
              Protocol: JSON-RPC 2.0 (Model Context Protocol)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
