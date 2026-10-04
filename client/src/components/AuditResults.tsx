import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ArrowRight, ExternalLink, Wrench, ShieldCheck, Sparkles } from 'lucide-react';
import { AuditResult, AuditIssue } from '../types';
import { ContradictionSentinel } from './ContradictionSentinel';

interface AuditResultsProps {
  auditResult: AuditResult | null;
  onRefactor: () => void;
  isRefactoring: boolean;
  activeLine?: number | null;
  onSelectLine?: (line: number) => void;
}

export const AuditResults: React.FC<AuditResultsProps> = ({
  auditResult,
  onRefactor,
  isRefactoring,
  activeLine,
  onSelectLine,
}) => {
  if (!auditResult) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-[#0E1017] min-h-[420px]">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
          <ShieldCheck className="w-7 h-7 text-rose-500/80" />
        </div>
        <h3 className="text-base font-bold text-white">Ready for Sanity Context Audit</h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1.5 leading-relaxed">
          Select a breaking change preset or paste your code on the left, then click{' '}
          <strong className="text-rose-400">"Audit with Sanity Context"</strong> to detect deprecations, contradictory documentation, and runtime crash risks.
        </p>
      </div>
    );
  }

  const { issues, totalIssues, criticalCount, highCount, contradictionsFound, ecosystem } = auditResult;

  return (
    <div className="flex flex-col gap-4">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-slate-800 shadow-md">
          <div className="text-[11px] text-slate-400 font-medium">Total Deprecations</div>
          <div className="text-2xl font-black text-white mt-0.5">{totalIssues}</div>
          <div className="text-[10px] text-slate-500 mt-1 capitalize font-mono">{ecosystem.replace('-', ' ')}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/25 shadow-md">
          <div className="text-[11px] text-red-400 font-medium">Critical Errors</div>
          <div className="text-2xl font-black text-red-300 mt-0.5">{criticalCount}</div>
          <div className="text-[10px] text-red-400/80 mt-1 font-semibold">Runtime Crash Risk</div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/25 shadow-md">
          <div className="text-[11px] text-amber-400 font-medium">Sanity Contradictions</div>
          <div className="text-2xl font-black text-amber-300 mt-0.5">{contradictionsFound}</div>
          <div className="text-[10px] text-amber-400/80 mt-1 font-semibold">Overridden in Studio</div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/25 shadow-md flex flex-col justify-between">
          <div>
            <div className="text-[11px] text-emerald-400 font-medium">Source Grounding</div>
            <div className="text-xs font-bold text-emerald-300 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Verified</span>
            </div>
          </div>
          <div className="text-[10px] text-emerald-500 font-mono">Official RFC & Docs</div>
        </div>
      </div>

      {/* Refactor Action Bar */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-950/50 via-[#121520] to-slate-900 border border-rose-500/35 shadow-xl gap-3">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-rose-400" />
            <span>Automatic Modern Refactoring Available</span>
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Eradicate deprecated syntax using canonical rulings stored in Sanity Context.
          </p>
        </div>

        <button
          onClick={onRefactor}
          disabled={isRefactoring || totalIssues === 0}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all shadow-lg ${
            isRefactoring || totalIssues === 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 active:scale-95 shadow-rose-900/40 hover:scale-[1.02]'
          }`}
        >
          {isRefactoring ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating Modern Diff...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Refactor with Sanity Grounding</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>

      {/* Issues List */}
      <div className="flex flex-col gap-3.5">
        {issues.map((issue) => {
          const isSelected = activeLine === issue.lineNumber;

          return (
            <div
              key={issue.id}
              onClick={() => onSelectLine && onSelectLine(issue.lineNumber)}
              className={`p-4 rounded-2xl bg-[#0E1017] border transition-all shadow-lg cursor-pointer ${
                isSelected
                  ? 'border-rose-500 ring-1 ring-rose-500/40 bg-[#121522]'
                  : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Issue Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    Line {issue.lineNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      issue.severity === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : issue.severity === 'HIGH'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {issue.feature}
                  </span>
                </div>

                {/* Version details */}
                <div className="text-[11px] text-slate-500">
                  Deprecated: <span className="text-slate-400 font-mono">{issue.deprecatedIn}</span> • Removed in{' '}
                  <span className="text-red-400 font-mono font-bold">{issue.removedIn}</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-2.5 rounded-lg bg-[#07090D] border border-slate-800 font-mono text-xs text-rose-300 mb-2 overflow-x-auto">
                <code>{issue.snippet}</code>
              </div>

              {/* Explanation & Replacement */}
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">{issue.summary}</p>

              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-3">
                <strong className="text-emerald-400 font-sans font-semibold text-[11px] block mb-1">
                  Canonical Modern Syntax:
                </strong>
                <code>{issue.replacementPattern}</code>
              </div>

              {/* Sanity Source Citation */}
              <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-slate-800/80 gap-2">
                <a
                  href={issue.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[11px] text-rose-400 hover:text-rose-300 transition-colors group font-medium"
                >
                  <span>Source: {issue.source.title} ({issue.source.section})</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                  Grounded via Sanity MCP
                </span>
              </div>

              {/* Contradiction Sentinel Component */}
              {issue.contradiction && issue.contradiction.hasConflict && (
                <div onClick={(e) => e.stopPropagation()}>
                  <ContradictionSentinel contradiction={issue.contradiction} feature={issue.feature} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
