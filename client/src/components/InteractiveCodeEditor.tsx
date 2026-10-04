import React from 'react';
import { Play, Sparkles, Code2, AlertTriangle, AlertCircle } from 'lucide-react';
import { PRESETS } from '../presets';
import { CodePreset, AuditIssue } from '../types';

interface InteractiveCodeEditorProps {
  code: string;
  onChangeCode: (newCode: string) => void;
  selectedPreset: string;
  onSelectPreset: (preset: CodePreset) => void;
  onRunAudit: () => void;
  isAuditing: boolean;
  issues: AuditIssue[];
  activeLine: number | null;
  onSelectLine: (lineNumber: number) => void;
}

export const InteractiveCodeEditor: React.FC<InteractiveCodeEditorProps> = ({
  code,
  onChangeCode,
  selectedPreset,
  onSelectPreset,
  onRunAudit,
  isAuditing,
  issues,
  activeLine,
  onSelectLine,
}) => {
  const lines = code.split('\n');

  // Map issues by line number for fast gutter lookup
  const issueMap = new Map<number, AuditIssue>();
  for (const issue of issues) {
    issueMap.set(issue.lineNumber, issue);
  }

  return (
    <div className="flex flex-col h-full bg-[#090C12] rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-[#0D121B] gap-3">
        {/* Preset Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedPreset === preset.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{preset.name}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-black/40 text-slate-400 font-mono">
                {preset.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Audit Button */}
        <button
          onClick={onRunAudit}
          disabled={isAuditing}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-slate-950 transition-all shadow-lg ${
            isAuditing
              ? 'bg-slate-700 cursor-not-allowed opacity-80 text-slate-400'
              : 'bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-cyan-900/40 active:scale-95 glow-cyan'
          }`}
        >
          {isAuditing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              <span>Querying Sanity MCP...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Audit with Sanity Context</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Code Container */}
      <div className="relative flex-1 flex min-h-[420px] bg-[#07090D] font-mono text-xs leading-relaxed overflow-hidden">
        {/* Line Gutter with Gutter Colors Preserved */}
        <div className="py-4 select-none bg-[#07090D] text-slate-600 border-r border-slate-800/80 w-14 font-mono text-xs flex flex-col items-end pr-2.5">
          {lines.map((_, i) => {
            const lineNum = i + 1;
            const issue = issueMap.get(lineNum);
            const isSelected = activeLine === lineNum;

            return (
              <div
                key={i}
                onClick={() => onSelectLine(lineNum)}
                className={`h-6 flex items-center justify-end gap-1.5 cursor-pointer w-full group ${
                  isSelected ? 'text-cyan-400 font-bold' : 'hover:text-slate-300'
                }`}
              >
                {issue && (
                  <span
                    title={`${issue.severity}: ${issue.feature}`}
                    className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${
                      issue.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'
                    }`}
                  />
                )}
                <span>{lineNum}</span>
              </div>
            );
          })}
        </div>

        {/* Code Lines with Visual Wavy Underlines and Highlight Tints */}
        <div className="flex-1 relative overflow-y-auto">
          {/* Active Overlay for Highlighting & Squiggles */}
          <div className="absolute inset-0 pointer-events-none py-4 px-4 font-mono text-xs leading-6 z-0">
            {lines.map((lineText, i) => {
              const lineNum = i + 1;
              const issue = issueMap.get(lineNum);
              const isSelected = activeLine === lineNum;

              if (!issue && !isSelected) {
                return <div key={i} className="h-6" />;
              }

              return (
                <div
                  key={i}
                  className={`h-6 rounded flex items-center px-1 transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/20 ring-1 ring-cyan-500/40'
                      : issue?.severity === 'CRITICAL'
                      ? 'bg-red-500/10'
                      : 'bg-amber-500/10'
                  }`}
                >
                  <span
                    className={
                      issue?.severity === 'CRITICAL'
                        ? 'wavy-error font-medium text-transparent'
                        : issue
                        ? 'wavy-warning font-medium text-transparent'
                        : ''
                    }
                  >
                    {lineText || ' '}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Editable Textarea */}
          <textarea
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            spellCheck={false}
            className="relative z-10 w-full h-full bg-transparent text-slate-200 p-4 font-mono text-xs leading-6 outline-none resize-none selection:bg-cyan-500/30 focus:ring-0"
            placeholder="// Paste code here to scan for deprecated patterns and contradiction resolutions..."
          />
        </div>
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-800/80 bg-[#0A0D14] text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Editor: UTF-8</span>
          <span className="text-slate-600">•</span>
          <span>{lines.length} lines</span>
        </div>

        {issues.length > 0 ? (
          <div className="flex items-center gap-2 text-cyan-400 font-semibold font-mono">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>{issues.length} deprecation(s) highlighted</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-500 font-mono">
            <span>Click gutter markers (🔴/🟡) to inspect Sanity citations</span>
          </div>
        )}
      </div>
    </div>
  );
};
