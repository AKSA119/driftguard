import React from 'react';
import { ShieldCheck, Database, Radio, Sparkles, Terminal } from 'lucide-react';
import { McpStatus } from '../types';

interface HeaderProps {
  mcpStatus: McpStatus | null;
  onOpenSanityModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ mcpStatus, onOpenSanityModal }) => {
  const isLive = mcpStatus?.mode === 'live';

  return (
    <header className="sticky top-3 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 py-2.5 rounded-2xl bg-[#070A10]/85 border border-cyan-500/20 backdrop-blur-2xl shadow-2xl pointer-events-auto transition-all">
        {/* Brand & Identity */}
        <a href="#overview" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-md shadow-cyan-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
            <span className="text-slate-950 text-xs font-black">✱</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              DriftGuard
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Sanity MCP
            </span>
          </div>
        </a>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <a href="#overview" className="hover:text-white transition-colors">
            Overview
          </a>
          <a href="#why-sanity" className="hover:text-white transition-colors">
            Why Sanity
          </a>
          <a href="#studio" className="hover:text-white transition-colors flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Studio</span>
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#ecosystems" className="hover:text-white transition-colors">
            Knowledge Bases
          </a>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2.5">
          {/* MCP Health Pill */}
          <button
            onClick={onOpenSanityModal}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs bg-[#0C101A] hover:bg-[#141B2B] border border-cyan-500/20 transition-all text-slate-300 shadow-sm"
            title="Inspect Sanity Context MCP Connection"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-500' : 'bg-cyan-500'}`}></span>
            </span>
            <span className="font-medium text-[11px] text-slate-200 hidden sm:inline">
              {isLive ? 'Live Sanity MCP' : 'MCP Active'}
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
              {mcpStatus ? `${mcpStatus.latencyMs}ms` : '12ms'}
            </span>
          </button>

          {/* Launch Studio CTA Button */}
          <a
            href="#studio"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-md shadow-cyan-900/30 transition-all active:scale-95 glow-cyan"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Live Studio</span>
          </a>
        </div>
      </div>
    </header>
  );
};
