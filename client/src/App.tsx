import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBento } from './components/HeroBento';
import { BentoComparison } from './components/BentoComparison';
import { InteractiveCodeEditor } from './components/InteractiveCodeEditor';
import { AuditResults } from './components/AuditResults';
import { VisualDiffViewer } from './components/VisualDiffViewer';
import { DataPipelineGraphic } from './components/DataPipelineGraphic';
import { KnowledgeBaseShowcase } from './components/KnowledgeBaseShowcase';
import { SanityModal } from './components/SanityModal';
import { PRESETS } from './presets';
import { AuditResult, RefactorResult, McpStatus, CodePreset } from './types';
import { ShieldCheck, BookOpen, Layers, Terminal, Sparkles, Code2 } from 'lucide-react';

export const App: React.FC = () => {
  const [code, setCode] = useState<string>(PRESETS[0].code);
  const [selectedPreset, setSelectedPreset] = useState<string>(PRESETS[0].id);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [refactorResult, setRefactorResult] = useState<RefactorResult | null>(null);
  const [mcpStatus, setMcpStatus] = useState<McpStatus | null>(null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [isRefactoring, setIsRefactoring] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  // Fetch MCP status on mount
  useEffect(() => {
    fetchMcpStatus();
  }, []);

  const fetchMcpStatus = async () => {
    try {
      const res = await fetch('/api/mcp-status');
      if (res.ok) {
        const data = await res.json();
        setMcpStatus(data);
      }
    } catch (err) {
      console.warn('Could not fetch MCP status', err);
    }
  };

  const handleSelectPreset = (preset: CodePreset) => {
    setSelectedPreset(preset.id);
    setCode(preset.code);
    setAuditResult(null);
    setRefactorResult(null);
    setActiveLine(null);
  };

  const handleRunAudit = async () => {
    setIsAuditing(true);
    setRefactorResult(null);
    setActiveLine(null);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        const data: AuditResult = await res.json();
        setAuditResult(data);
        if (data.issues.length > 0) {
          setActiveLine(data.issues[0].lineNumber);
        }
      }
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleRefactor = async () => {
    if (!auditResult) return;
    setIsRefactoring(true);
    try {
      const res = await fetch('/api/refactor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          issues: auditResult.issues,
          ecosystem: auditResult.ecosystem,
        }),
      });

      if (res.ok) {
        const data: RefactorResult = await res.json();
        setRefactorResult(data);
      }
    } catch (err) {
      console.error('Refactoring failed:', err);
    } finally {
      setIsRefactoring(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080A0E] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-white">
      {/* 1. Floating Navigation Bar */}
      <Header
        mcpStatus={mcpStatus}
        onOpenSanityModal={() => setIsModalOpen(true)}
      />

      {/* 2. Asymmetric Hero Bento Section */}
      <HeroBento onOpenSanityModal={() => setIsModalOpen(true)} />

      {/* 3. Bento Comparison Section */}
      <BentoComparison />

      {/* 4. Live Developer Studio Section */}
      <section id="studio" className="py-20 px-6 border-t border-slate-800/80 bg-[#0A0C11] relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 font-bold text-xs mb-2 border border-rose-500/20">
                <Terminal className="w-3.5 h-3.5" />
                <span>Interactive Developer Workspace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Live Code Sanitizer & Refactor Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select a real-world breaking change scenario or paste code below to see the agent query Sanity Context over MCP.
              </p>
            </div>

            {refactorResult && (
              <button
                onClick={() => setRefactorResult(null)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-500/30 transition-all self-start sm:self-auto"
              >
                ← Return to Diagnostic Inspection
              </button>
            )}
          </div>

          {/* Main 2-Column Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Interactive Code Editor */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                  Code Under Inspection
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Gutter dots (🔴/🟡) indicate crash risks
                </span>
              </div>

              <InteractiveCodeEditor
                code={code}
                onChangeCode={setCode}
                selectedPreset={selectedPreset}
                onSelectPreset={handleSelectPreset}
                onRunAudit={handleRunAudit}
                isAuditing={isAuditing}
                issues={auditResult ? auditResult.issues : []}
                activeLine={activeLine}
                onSelectLine={(line) => setActiveLine(line)}
              />
            </div>

            {/* Right Column: Diagnostics or Visual Git Diff */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {refactorResult ? 'Side-by-Side Git Diff' : 'Sanity Context MCP Diagnostics'}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {auditResult ? `${auditResult.totalIssues} issue(s) detected` : 'Waiting for scan'}
                </span>
              </div>

              {refactorResult ? (
                <VisualDiffViewer
                  refactorResult={refactorResult}
                  onReset={() => setRefactorResult(null)}
                />
              ) : (
                <AuditResults
                  auditResult={auditResult}
                  onRefactor={handleRefactor}
                  isRefactoring={isRefactoring}
                  activeLine={activeLine}
                  onSelectLine={(line) => setActiveLine(line)}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Data Pipeline & Architecture Graphic Section */}
      <DataPipelineGraphic />

      {/* 6. Knowledge Base Ecosystem Showcase */}
      <KnowledgeBaseShowcase onOpenSanityModal={() => setIsModalOpen(true)} />

      {/* 7. Footer */}
      <footer className="border-t border-slate-800/80 bg-[#06070B] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-300 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              DriftGuard
            </span>
            <span>•</span>
            <span>Sanity Hackathon Submission: Path 1</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#why-sanity" className="hover:text-white transition-colors">Why Sanity</a>
            <a href="#studio" className="hover:text-white transition-colors text-rose-400 font-semibold">Studio</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#ecosystems" className="hover:text-white transition-colors">Knowledge Bases</a>
          </div>
        </div>
      </footer>

      {/* Sanity Knowledge Base & MCP Config Modal */}
      <SanityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mcpStatus={mcpStatus}
        onRefreshStatus={fetchMcpStatus}
      />
    </div>
  );
};
