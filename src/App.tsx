import React from 'react';
import { DesignSystemProvider, useDesignSystem } from './context/DesignSystemContext';
import { TokenEditor } from './components/TokenEditor';
import { ComponentShowcase } from './components/ComponentShowcase';
import { ExportPanel } from './components/ExportPanel';
import { Sun, Moon, Cpu } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { colorMode, toggleColorMode } = useDesignSystem();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* Global Top Banner Navigation */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cpu className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Design System Builder
            </span>
            <span className="ml-2 text-[10px] bg-slate-800 border border-slate-700/60 text-slate-400 font-mono px-1.5 py-0.5 rounded">
              AI & Dev Engine v1.2
            </span>
          </div>
        </div>

        {/* Global actions: Theme Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Active Canvas Mode:</span>
            <span className="capitalize">{colorMode}</span>
          </div>

          <button
            onClick={toggleColorMode}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all text-slate-300 hover:text-white"
            title={`Switch preview to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          >
            {colorMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Panel Grid */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        
        {/* Pane 1: Editor Sidebar */}
        <aside className="w-full xl:w-[28%] h-2/5 xl:h-full flex-shrink-0">
          <TokenEditor />
        </aside>

        {/* Pane 2: Live Showcase Canvas */}
        <main className="flex-1 h-3/5 xl:h-full bg-slate-950 p-4 xl:p-8 overflow-y-auto flex items-center justify-center">
          <div className="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden border border-slate-900 bg-slate-900/40 backdrop-blur-xl">
            <ComponentShowcase />
          </div>
        </main>

        {/* Pane 3: Exporter Panels */}
        <section className="w-full xl:w-[32%] h-2/5 xl:h-full flex-shrink-0">
          <ExportPanel />
        </section>

      </div>
    </div>
  );
};

function App() {
  return (
    <DesignSystemProvider>
      <DashboardContent />
    </DesignSystemProvider>
  );
}

export default App;
