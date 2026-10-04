import React, { useState } from 'react';
import { Check, Copy, FileCode2, Sparkles, ExternalLink, ArrowRight, Download } from 'lucide-react';
import { RefactorResult } from '../types';

interface DiffViewerProps {
  refactorResult: RefactorResult;
  onReset: () => void;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ refactorResult, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refactorResult.refactoredCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = refactorResult.refactoredCode.split('\n').length;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-300">Refactoring Completed</h3>
            <p className="text-xs text-slate-400">
              {refactorResult.explanation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Modern Code</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            Edit Source
          </button>
        </div>
      </div>

      {/* Changes Applied Breakdown */}
      <div className="p-4 rounded-xl bg-[#12141A] border border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Applied Transformations ({refactorResult.changesApplied.length})
        </h4>
        <div className="space-y-2.5">
          {refactorResult.changesApplied.map((change, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-[#0B0D11] border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-rose-400">{change.feature}</span>
                <a
                  href={change.sourceRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <span>Changelog Citation</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-1.5 rounded bg-red-950/20 text-red-300 border border-red-900/30 overflow-x-auto">
                  <span className="text-red-500 select-none mr-1">-</span>
                  {change.before}
                </div>
                <div className="p-1.5 rounded bg-emerald-950/20 text-emerald-300 border border-emerald-900/30 overflow-x-auto">
                  <span className="text-emerald-500 select-none mr-1">+</span>
                  {change.after}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refactored Code Output */}
      <div className="rounded-xl border border-slate-800 bg-[#0E1015] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#16181F] border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">Refactored Modern Code</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">{lineCount} lines</span>
        </div>

        <div className="flex overflow-x-auto font-mono text-xs leading-6">
          <div className="py-4 pl-3 pr-2 text-right select-none bg-[#0B0D11] text-slate-600 border-r border-slate-800/80 w-12 font-mono text-xs">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre className="p-4 text-emerald-200/90 overflow-x-auto flex-1 font-mono">
            <code>{refactorResult.refactoredCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
