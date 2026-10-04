import React, { useState } from 'react';
import { GitCompare, CheckCircle2, AlertOctagon, UserCheck, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ContradictionInfo } from '../types';

interface ContradictionSentinelProps {
  contradiction: ContradictionInfo;
  feature: string;
  onRulingChange?: (newRuling: string) => void;
}

export const ContradictionSentinel: React.FC<ContradictionSentinelProps> = ({
  contradiction,
  feature,
  onRulingChange,
}) => {
  const [activeDecision, setActiveDecision] = useState<'canonical' | 'legacy'>('canonical');

  if (!contradiction.hasConflict) return null;

  const handleToggle = (decision: 'canonical' | 'legacy') => {
    setActiveDecision(decision);
    if (onRulingChange) {
      onRulingChange(
        decision === 'canonical'
          ? (contradiction.resolution || '')
          : 'Overridden locally: Allow legacy fallback mode.'
      );
    }
  };

  return (
    <div className="mt-3 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-[#12141C] p-4 text-xs text-slate-200 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-amber-500/20 mb-3 gap-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <GitCompare className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Sanity Contradiction Arbiter: {feature}</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
          Conflict Flagged in Sanity Studio
        </span>
      </div>

      {/* Side-by-Side Conflicting Claims */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {/* Claim 1: The Outdated Internet / LLM Memory */}
        <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1 text-[11px]">
            <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
            <span>Outdated Tutorial / ChatGPT Claim:</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed italic">
            "{contradiction.conflictingClaim}"
          </p>
        </div>

        {/* Claim 2: The Authoritative Official Changelog */}
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Official Release Notes / Changelog:</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed italic">
            "{contradiction.officialClaim}"
          </p>
        </div>
      </div>

      {/* Human Editorial Ruling from Sanity Studio */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] mb-3">
        <div className="flex items-start gap-2.5">
          <UserCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-white font-semibold">
              {contradiction.resolution}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
              <span>Decision by: <strong className="text-slate-300">{contradiction.resolvedBy}</strong></span>
              <span>•</span>
              <span>Sanity Studio Record: {new Date(contradiction.resolvedAt || '').toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sanity Studio Simulation Toggle for Judges */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
          <span>Interactive Editorial Override:</span>
        </div>

        <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-[#0E1017] border border-slate-800">
          <button
            onClick={() => handleToggle('canonical')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
              activeDecision === 'canonical'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Enforce Canonical RFC
          </button>
          <button
            onClick={() => handleToggle('legacy')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
              activeDecision === 'legacy'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Allow Legacy Fallback
          </button>
        </div>
      </div>
    </div>
  );
};
