import React, { useState } from 'react';
import { Terminal, Database, GitCompare, Sparkles, ShieldCheck, ArrowRight, Layers, FileCode, CheckCircle2 } from 'lucide-react';

export const DataPipelineGraphic: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    {
      id: 1,
      title: '1. AST & Symbol Scanner',
      subtitle: 'Code Parsing',
      icon: <FileCode className="w-5 h-5 text-amber-400" />,
      description:
        'Interprets input code and identifies imports, call expressions, and configuration blocks that match fast-moving library surfaces.',
      badge: 'AST Parser',
    },
    {
      id: 2,
      title: '2. Model Context Protocol',
      subtitle: 'JSON-RPC Tool Call',
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
      description:
        'Dispatches an MCP tool call (tools/call: query_knowledge_base) to the Sanity Context endpoint without vendor lock-in.',
      badge: 'MCP Protocol v1',
    },
    {
      id: 3,
      title: '3. Sanity Knowledge Base',
      subtitle: 'Structured Content',
      icon: <Database className="w-5 h-5 text-rose-400" />,
      description:
        'Sanity distills documentation, GitHub release notes, and deprecation notices into structured, queryable schemas.',
      badge: 'Sanity Context',
    },
    {
      id: 4,
      title: '4. Contradiction Arbiter',
      subtitle: 'Human-in-the-Loop',
      icon: <GitCompare className="w-5 h-5 text-orange-400" />,
      description:
        'When outdated tutorials contradict new release changelogs, Sanity surfaces both side-by-side. The human editorial decision is applied permanently.',
      badge: 'Studio Override',
    },
    {
      id: 5,
      title: '5. Grounded Code Refactor',
      subtitle: 'Side-by-Side Diff',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      description:
        'Generates canonical code replacements accompanied by exact source links, eradicating runtime crashes.',
      badge: 'Verified Diff',
    },
  ];

  return (
    <section id="architecture" className="py-20 px-6 border-t border-slate-800/80 bg-[#080A0E]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">
            Under The Hood Architecture
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Sanity Context Powers DriftGuard
          </h3>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            The end-to-end data pipeline connecting developer code to Sanity Knowledge Bases via the open Model Context Protocol.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-8">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                  isActive
                    ? 'bg-[#141722] border-rose-500/60 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/40'
                    : 'bg-[#0E1017] border-slate-800/80 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">{step.icon}</div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    Step {step.id}
                  </span>
                </div>
                <div className="font-bold text-xs text-white">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Highlighted Step Details Card */}
        <div className="p-6 rounded-2xl bg-[#0E1017] border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0">
              {steps[activeStep - 1].icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-white">{steps[activeStep - 1].title}</h4>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 font-mono font-medium border border-rose-500/30">
                  {steps[activeStep - 1].badge}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {steps[activeStep - 1].description}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-slate-400 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Standard MCP JSON-RPC 2.0</span>
          </div>
        </div>
      </div>
    </section>
  );
};
