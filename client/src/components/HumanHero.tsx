import React from 'react';
import { ArrowRight, Sparkles, Database, Terminal, ShieldCheck, Heart, UserCheck, CheckCircle2 } from 'lucide-react';

interface HumanHeroProps {
  onOpenSanityModal: () => void;
}

export const HumanHero: React.FC<HumanHeroProps> = ({ onOpenSanityModal }) => {
  return (
    <section id="overview" className="relative pt-12 pb-24 px-4 sm:px-6 overflow-hidden glow-bg">
      {/* 1. GENTLE FLOATING ROBOTIC COMPANION (Background Animation) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 flex items-center justify-center w-full max-w-4xl">
        {/* Ambient Radial Glowing Aura */}
        <div className="absolute w-[500px] sm:w-[680px] h-[500px] sm:h-[680px] bg-gradient-to-tr from-cyan-500/20 via-rose-500/10 to-purple-600/20 blur-[130px] rounded-full animate-pulse-slow" />
        
        {/* Subtle Cybernetic HUD Target Rings */}
        <div className="absolute w-[440px] sm:w-[580px] h-[440px] sm:h-[580px] rounded-full border border-cyan-400/20 border-dashed animate-[spin_90s_linear_infinite]" />
        <div className="absolute w-[520px] sm:w-[680px] h-[520px] sm:h-[680px] rounded-full border border-purple-500/15" />

        {/* Floating 3D Sentinel Mascot with Depth and Soft Vignette Mask */}
        <div className="animate-float">
          <img
            src="/driftguard_sentinel.jpg"
            alt="DriftGuard Cyber Sentinel Companion"
            className="w-[360px] sm:w-[520px] md:w-[600px] opacity-40 mix-blend-screen filter blur-[0.3px] rounded-full object-contain [mask-image:radial-gradient(circle,black_50%,transparent_82%)]"
          />
        </div>
      </div>

      {/* 2. FOREGROUND CONTENT: HUMAN WARMTH & DEVELOPER STORY */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Eyebrow: Human Curation Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D111A]/90 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide shadow-xl backdrop-blur-xl mb-6">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-bold text-white">✦ Human-Curated Intelligence:</span>
          <span>Sanity Hackathon Path 1 Challenge</span>
        </div>

        {/* Headline: Empathetic & Bold */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase max-w-4xl">
          AI Writes the Code.{' '}
          <span className="bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300 bg-clip-text text-transparent">
            Humans Keep It Honest.
          </span>
        </h1>

        {/* Subtitle: Relatable Developer Pain */}
        <p className="mt-6 text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
          We’ve all been there: it’s 2 AM, ChatGPT gave you code that looked perfect, you pasted it, and your build crashed because an import was deprecated three weeks ago.{' '}
          <strong className="text-white font-semibold">DriftGuard</strong> grounds your agent in real, human-curated changelogs from{' '}
          <span className="text-cyan-300 font-semibold underline decoration-cyan-500/40 underline-offset-4">Sanity Context</span>—so you never debug phantom documentation again.
        </p>

        {/* Dual Human CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#studio"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 hover:from-rose-500 hover:to-orange-500 shadow-xl shadow-rose-950/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Try a Live Example in Studio</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="#senior-memos"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-[#0E131E]/80 hover:bg-[#161D2E] border border-slate-700/80 backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md"
          >
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Read Senior Dev Memos</span>
          </a>
        </div>

        {/* 3. HUMAN TOUCH PILLARS (Breathable Bento Cards) */}
        <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Card 1: Real Human Editors */}
          <div className="p-6 rounded-2xl bg-[#0D111A]/90 border border-white/[0.08] text-white backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-rose-500/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                <span>Human-in-the-Loop</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">Sanity Studio</span>
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                When outdated tutorials contradict official release notes, engineering leads review both claims side-by-side in Sanity Studio and set the permanent ruling.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-rose-300 font-medium flex items-center gap-1.5">
              <span>6 Editorial Overrides Active</span>
            </div>
          </div>

          {/* Card 2: 100% Traceable Grounding */}
          <div className="p-6 rounded-2xl bg-[#0D111A]/90 border border-white/[0.08] text-white backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                <span>Zero Phantom Code</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">100% Verified</span>
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every line flagged points directly to its official GitHub changelog or RFC anchor. No vague guesses, no phantom packages, no hallucinations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-300 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Grounded via Model Context Protocol</span>
            </div>
          </div>

          {/* Card 3: Thoughtful Pair Programming */}
          <div className="p-6 rounded-2xl bg-[#0D111A]/90 border border-white/[0.08] text-white backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-amber-500/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                <span>Senior Dev Co-Pilot</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Instant Diffs</span>
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Refactors broken code while respectfully preserving your variable names, comments, and architecture. Exports clean diffs ready for review.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
              <span>Next.js 15, AI SDK 4, Pydantic v2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
