import React, { useState } from 'react';
import { Check, Copy, Download, ArrowLeft, Sparkles, ExternalLink, GitCommit, FileCode2 } from 'lucide-react';
import { RefactorResult } from '../types';

interface VisualDiffViewerProps {
  refactorResult: RefactorResult;
  onReset: () => void;
}

export const VisualDiffViewer: React.FC<VisualDiffViewerProps> = ({ refactorResult, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refactorResult.refactoredCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPatch = () => {
    const patchContent = `--- a/source.ts\n+++ b/source.ts\n@@ -1 +1 @@\n${refactorResult.changesApplied
      .map((c) => `- ${c.before}\n+ ${c.after}`)
      .join('\n')}\n`;
    const blob = new Blob([patchContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'driftguard-sanity.patch';
    a.click();
    URL.revokeObjectURL(url);
  };

  const originalLines = refactorResult.originalCode.split('\n');
  const refactoredLines = refactorResult.refactoredCode.split('\n');

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0F141A] to-slate-900 border border-emerald-500/30 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <span>Sanity Grounded Refactor</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                {refactorResult.changesApplied.length} changes applied
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
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
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPatch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .patch</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Applied Changes Accordion Cards */}
      <div className="p-4 rounded-2xl bg-[#0E1017] border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-rose-400" />
            <span>Grounded Transformations Breakdown</span>
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">100% Verified in Sanity</span>
        </div>

        <div className="space-y-2.5">
          {refactorResult.changesApplied.map((change, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#0A0C11] border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-200">{change.feature}</span>
                <a
                  href={change.sourceRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold group"
                >
                  <span>Changelog Citation</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-red-950/25 text-red-300 border border-red-900/40 overflow-x-auto">
                  <span className="text-red-500 font-bold mr-1.5 select-none">-</span>
                  {change.before}
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/25 text-emerald-300 border border-emerald-900/40 overflow-x-auto">
                  <span className="text-emerald-500 font-bold mr-1.5 select-none">+</span>
                  {change.after}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* True Split Side-by-Side Git Diff */}
      <div className="rounded-2xl border border-slate-800 bg-[#0A0C11] shadow-2xl overflow-hidden">
        <div className="grid grid-cols-2 bg-[#12151E] border-b border-slate-800 text-xs text-slate-400 divide-x divide-slate-800 font-mono">
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-red-400 font-bold flex items-center gap-1.5">
              <span>● Deprecated Input</span>
            </span>
            <span className="text-[11px] text-slate-500">{originalLines.length} lines</span>
          </div>

          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span>● Modern Grounded Syntax</span>
            </span>
            <span className="text-[11px] text-slate-500">{refactoredLines.length} lines</span>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-slate-800 font-mono text-xs leading-6 overflow-x-auto min-h-[360px]">
          {/* Left Column: Deprecated Input */}
          <div className="p-4 bg-[#090B0E] text-slate-400 overflow-x-auto">
            {originalLines.map((line, i) => {
              const isRemoved = refactorResult.changesApplied.some(
                (c) => line.includes(c.before) || (c.before && line.trim() && c.before.includes(line.trim()))
              );
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-1.5 rounded ${
                    isRemoved ? 'bg-red-500/15 text-red-300 font-medium' : ''
                  }`}
                >
                  <span className="w-6 text-right select-none text-slate-600 text-[10px] shrink-0">{i + 1}</span>
                  <span className="select-none text-red-500 w-3">{isRemoved ? '-' : ' '}</span>
                  <span className="whitespace-pre overflow-x-auto">{line || ' '}</span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Modern Canonical Code */}
          <div className="p-4 bg-[#0A0D12] text-emerald-200 overflow-x-auto">
            {refactoredLines.map((line, i) => {
              const isAdded = refactorResult.changesApplied.some(
                (c) => line.includes(c.after) || (c.after && line.trim() && c.after.includes(line.trim()))
              );
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-1.5 rounded ${
                    isAdded ? 'bg-emerald-500/15 text-emerald-300 font-medium' : ''
                  }`}
                >
                  <span className="w-6 text-right select-none text-slate-600 text-[10px] shrink-0">{i + 1}</span>
                  <span className="select-none text-emerald-500 w-3">{isAdded ? '+' : ' '}</span>
                  <span className="whitespace-pre overflow-x-auto">{line || ' '}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
