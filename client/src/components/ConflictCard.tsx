import React from 'react';
import { GitCompare, CheckCircle2, AlertOctagon, UserCheck, ShieldAlert } from 'lucide-react';
import { ContradictionInfo } from '../types';

interface ConflictCardProps {
  contradiction: ContradictionInfo;
  feature: string;
}

export const ConflictCard: React.FC<ConflictCardProps> = ({ contradiction, feature }) => {
  if (!contradiction.hasConflict) return null;

  return (
    <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-950/15 p-3.5 text-xs text-slate-200">
      <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 mb-3">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <GitCompare className="w-4 h-4" />
          <span>Sanity Contradiction Resolved: {feature}</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Conflict Flagged & Overridden
        </span>
      </div>

      {/* Side by Side Claim Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
        {/* Outdated Claim */}
        <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20">
          <div className="flex items-center gap-1.5 text-red-400 font-medium mb-1 text-[11px]">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Outdated Tutorial / LLM Training Claim:</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            "{contradiction.conflictingClaim}"
          </p>
        </div>

        {/* Official Release Claim */}
        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium mb-1 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Official Release Notes / Changelog:</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            "{contradiction.officialClaim}"
          </p>
        </div>
      </div>

      {/* Editorial Ruling from Sanity Studio */}
      <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px]">
        <UserCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="text-slate-200 font-medium">
            {contradiction.resolution}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-2">
            <span>Editor: <strong className="text-slate-400">{contradiction.resolvedBy}</strong></span>
            <span>•</span>
            <span>Recorded in Sanity Studio: {new Date(contradiction.resolvedAt || '').toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
