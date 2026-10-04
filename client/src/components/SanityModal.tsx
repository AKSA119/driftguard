import React, { useState, useEffect } from 'react';
import { X, Database, GitCompare, Radio, Check, ExternalLink, ShieldCheck, Key, RefreshCw } from 'lucide-react';
import { McpStatus } from '../types';

interface SanityModalProps {
  isOpen: boolean;
  onClose: () => void;
  mcpStatus: McpStatus | null;
  onRefreshStatus: () => void;
}

export const SanityModal: React.FC<SanityModalProps> = ({
  isOpen,
  onClose,
  mcpStatus,
  onRefreshStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'kb' | 'contradictions' | 'config'>('kb');
  const [kbData, setKbData] = useState<{ items: any[]; contradictions: any[] }>({
    items: [],
    contradictions: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Configuration form state
  const [endpoint, setEndpoint] = useState('');
  const [projectId, setProjectId] = useState('');
  const [dataset, setDataset] = useState('production');
  const [token, setToken] = useState('');
  const [groqApiKey, setGroqApiKey] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchKbData();
    }
  }, [isOpen]);

  const fetchKbData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/knowledge-base');
      const data = await res.json();
      setKbData(data);
    } catch (err) {
      console.error('Failed to fetch KB data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/mcp-configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, projectId, dataset, token, groqApiKey }),
      });
      setSaveSuccess(true);
      onRefreshStatus();
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to save config', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#111319] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#161821]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Sanity Context & Knowledge Base
              </h3>
              <p className="text-xs text-slate-400">
                Grounding AI agents in verified structured content via Model Context Protocol (MCP)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-[#0F1117] px-6">
          <button
            onClick={() => setActiveTab('kb')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'kb'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Indexed Knowledge Base ({kbData.items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contradictions')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'contradictions'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Resolved Contradictions ({kbData.contradictions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>MCP Connection & Config</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* TAB 1: KNOWLEDGE BASE ITEMS */}
          {activeTab === 'kb' && (
            <div className="space-y-3">
              {kbData.items.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#14161E] border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200">{item.feature}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {item.ecosystem}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mb-2">{item.summary}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <span>{item.sourceTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span>Deprecated: {item.deprecatedIn} → Removed: {item.removedIn}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CONTRADICTIONS & HUMAN OVERRIDES */}
          {activeTab === 'contradictions' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-slate-300">
                <strong className="text-rose-400 font-semibold">The Sanity Advantage:</strong> When outdated web articles conflict with new breaking change changelogs, Sanity flags both claims and preserves human editorial decisions across every agent interaction.
              </div>

              {kbData.contradictions.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#14161E] border border-amber-500/20">
                  <div className="font-bold text-amber-300 mb-2">{item.feature}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] mb-2">
                    <div className="p-2 rounded bg-red-950/20 border border-red-900/30 text-slate-300">
                      <div className="text-red-400 font-medium mb-0.5">Outdated Claim:</div>
                      "{item.contradiction?.conflictingClaim}"
                    </div>
                    <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/30 text-slate-300">
                      <div className="text-emerald-400 font-medium mb-0.5">Authoritative Claim:</div>
                      "{item.contradiction?.officialClaim}"
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-800">
                    <strong className="text-rose-400">Sanity Studio Ruling:</strong> {item.contradiction?.resolution}
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Decision made by {item.contradiction?.resolvedBy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MCP CONFIGURATION */}
          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <div className="font-semibold text-slate-200 mb-1">Model Context Protocol (MCP) Endpoint</div>
                <p className="text-slate-400 text-xs">
                  Connect DriftGuard to your live Sanity Context MCP endpoint. If blank, DriftGuard runs in high-fidelity simulation mode using pre-seeded datasets.
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Sanity Context MCP URL</label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="https://context.sanity.io/v1/mcp/your-project-id"
                  className="w-full px-3 py-2 rounded-lg bg-[#14161E] border border-slate-800 text-slate-200 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Sanity Project ID</label>
                  <input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="abc123xy"
                    className="w-full px-3 py-2 rounded-lg bg-[#14161E] border border-slate-800 text-slate-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Dataset</label>
                  <input
                    type="text"
                    value={dataset}
                    onChange={(e) => setDataset(e.target.value)}
                    placeholder="production"
                    className="w-full px-3 py-2 rounded-lg bg-[#14161E] border border-slate-800 text-slate-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Sanity API / Context Token (Optional)</label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="sk..."
                  className="w-full px-3 py-2 rounded-lg bg-[#14161E] border border-slate-800 text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* GROQ LLM API KEY SECTION */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/30 text-slate-300 space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="text-cyan-400">⚡</span>
                    <span>AI Agent Engine (Groq Llama 3.3 70B)</span>
                  </div>
                  {mcpStatus?.groqConnected ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                      ● Groq Active (Universal Mode)
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                      Offline Presets Mode
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Provide your free Groq API key to unlock <strong>Universal Code Auditing & Refactoring</strong> on ANY code you type or paste.
                </p>
                <div>
                  <label className="block text-slate-300 font-medium mb-1 text-[11px]">
                    Groq API Key (<a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Get free key at console.groq.com</a>)
                  </label>
                  <input
                    type="password"
                    value={groqApiKey}
                    onChange={(e) => setGroqApiKey(e.target.value)}
                    placeholder="gsk_..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1119] border border-cyan-500/30 text-cyan-200 font-mono text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Update MCP Connection</span>
                </button>

                {saveSuccess && (
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-4 h-4" />
                    <span>Configuration updated!</span>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
