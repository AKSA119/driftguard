import React from 'react';
import { Play, Sparkles, Code2, AlertTriangle } from 'lucide-react';
import { PRESETS } from '../presets';
import { CodePreset } from '../types';

interface CodeEditorProps {
  code: string;
  onChangeCode: (newCode: string) => void;
  selectedPreset: string;
  onSelectPreset: (preset: CodePreset) => void;
  onRunAudit: () => void;
  isAuditing: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChangeCode,
  selectedPreset,
  onSelectPreset,
  onRunAudit,
  isAuditing,
}) => {
  const lineCount = code.split('\n').length;

  return (
    <div className="flex flex-col h-full bg-[#111318] rounded-xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 px-4 py-2.5 bg-[#16181F] gap-2">
        {/* Preset Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedPreset === preset.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-700/60'
              }`}
            >
              <span>{preset.name}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-black/40 text-slate-400">
                {preset.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Audit Button */}
        <button
          onClick={onRunAudit}
          disabled={isAuditing}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-md ${
            isAuditing
              ? 'bg-slate-700 cursor-not-allowed opacity-80'
              : 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-rose-900/30 active:scale-95'
          }`}
        >
          {isAuditing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

      {/* Code Area with Line Numbers */}
      <div className="relative flex-1 flex min-h-[360px] bg-[#0E1015] font-mono text-sm leading-relaxed overflow-hidden">
        {/* Line Numbers */}
        <div className="py-4 pl-3 pr-2 text-right select-none bg-[#0B0D11] text-slate-600 border-r border-slate-800/80 w-12 font-mono text-xs">
          {Array.from({ length: Math.max(lineCount, 15) }, (_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full bg-transparent text-slate-200 p-4 font-mono text-xs leading-6 outline-none resize-none selection:bg-rose-500/30 focus:ring-0 overflow-y-auto"
          placeholder="// Paste AI-generated or developer code here to scan for deprecated patterns..."
        />
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/80 bg-[#12141A] text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Editor: UTF-8</span>
          <span className="text-slate-600">•</span>
          <span>{lineCount} lines</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400/80">
          <AlertTriangle className="w-3 h-3" />
          <span>Scans imports, AST patterns & breaking API changes</span>
        </div>
      </div>
    </div>
  );
};
