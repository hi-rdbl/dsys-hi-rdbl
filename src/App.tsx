import React, { useState } from 'react';
import { DesignSystemProvider, useDesignSystem } from './context/DesignSystemContext';
import { DashboardTab } from './components/DashboardTab';
import { ColorsTab } from './components/ColorsTab';
import { TypographyTab } from './components/TypographyTab';
import { LayoutTab } from './components/LayoutTab';
import { MotionTab } from './components/MotionTab';
import { ComponentsTab } from './components/ComponentsTab';
import { IconsTab } from './components/IconsTab';
import { ExportTab } from './components/ExportTab';
import { LivePreviewSidebar } from './components/LivePreviewSidebar';

import {
  LayoutGrid,
  Palette,
  Type,
  Sliders,
  Zap,
  Sparkles,
  Cpu,
  Download,
  ChevronDown,
  Code,
  BookOpen,
  Eye,
  Copy,
  Check
} from 'lucide-react';

type TabId = 'dashboard' | 'colors' | 'typography' | 'spacing' | 'motion' | 'components' | 'icons' | 'export';

const MainDashboard: React.FC = () => {
  const { tokens } = useDesignSystem();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [copiedState, setCopiedState] = useState<'figma' | 'guidebook' | 'code' | null>(null);

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard & Presets', icon: LayoutGrid },
    { id: 'colors', name: 'Color Palette', icon: Palette },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'spacing', name: 'Spacing & Corners', icon: Sliders },
    { id: 'motion', name: 'Depth & Motion', icon: Zap },
    { id: 'components', name: 'Component Playground', icon: Sparkles },
    { id: 'icons', name: 'Icon Generator', icon: Cpu },
    { id: 'export', name: 'Export Assets', icon: Download },
  ] as const;

  // Determine if we should show the 3rd column playground preview panel
  const showPreviewSidebar = ['colors', 'typography', 'spacing', 'motion'].includes(activeTab);

  // Copy Figma token payload
  const handleCopyFigmaToken = () => {
    navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
    setCopiedState('figma');
    setTimeout(() => setCopiedState(null), 2000);
  };

  // Download tokens JSON
  const handleDownloadCode = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tokens, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "tokens.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setCopiedState('code');
    setTimeout(() => setCopiedState(null), 2000);
  };

  // Copy Guidebook URL
  const handleCopyGuidebookLink = () => {
    const docUrl = `${window.location.origin}/guidebook.md`;
    navigator.clipboard.writeText(docUrl);
    setCopiedState('guidebook');
    setTimeout(() => setCopiedState(null), 2000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans select-none">
      
      {/* Sidebar Navigation (Monochrome Theme) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0">
        {/* Sidebar Header Logo */}
        <div className="p-6 border-b border-slate-200/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-950/10">
            <Cpu className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
              Aura Engine
            </h2>
            <span className="text-[9px] text-slate-400 font-mono mt-1 block">
              v1.2 • AI & Dev Ready
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3.5 transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-950/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-200/80 text-[10px] text-slate-400 text-center font-semibold">
          © 2026 Aura Design System
        </div>
      </aside>

      {/* Main Spacious Content Canvas (With Top Header Bar) */}
      <main className="flex-1 h-full flex flex-col bg-slate-50 border-r border-slate-200/60 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between flex-shrink-0 z-30">
          <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-slate-800 font-extrabold capitalize">
              {navigationItems.find(item => item.id === activeTab)?.name || activeTab}
            </span>
          </div>

          {/* Download Dropdown Container */}
          <div className="relative">
            <button
              onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Assets</span>
              <ChevronDown className="w-3 h-3 text-slate-400 transition-transform duration-200" style={{ transform: showDownloadDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {/* Frost Dropdown overlay (replicating uploaded design) */}
            {showDownloadDropdown && (
              <>
                {/* Backdrop closer */}
                <div className="fixed inset-0 z-40" onClick={() => setShowDownloadDropdown(false)} />
                
                {/* Visual dropdown card */}
                <div className="absolute right-0 mt-3 w-[640px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 animate-fadeIn">
                  
                  {/* Panel 1: Figma plugin */}
                  <div className="flex flex-col items-center justify-between text-center p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-700">
                        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="currentColor" />
                        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="currentColor" />
                        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="currentColor" />
                        <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" fill="currentColor" />
                        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex-1 mb-5">
                      <h4 className="text-xs font-extrabold text-slate-950 mb-1">Figma plugin</h4>
                      <p className="text-[10px] text-slate-400 leading-normal">Import design system tokens seamlessly into Figma file canvas.</p>
                    </div>
                    <button
                      onClick={handleCopyFigmaToken}
                      className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-[10px] font-bold text-white transition-all active:scale-95 w-full flex items-center justify-center gap-1.5"
                    >
                      {copiedState === 'figma' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Token</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Panel 2: Code */}
                  <div className="flex flex-col items-center justify-between text-center p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <Code className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="flex-1 mb-5">
                      <h4 className="text-xs font-extrabold text-slate-950 mb-1">Code</h4>
                      <p className="text-[10px] text-slate-400 leading-normal">Extract JSON design variables drive Tailwind config settings.</p>
                    </div>
                    <button
                      onClick={handleDownloadCode}
                      className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-[10px] font-bold text-white transition-all active:scale-95 w-full flex items-center justify-center gap-1.5"
                    >
                      {copiedState === 'code' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3" />
                          <span>Download JSON</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Panel 3: Guidebook */}
                  <div className="flex flex-col items-center justify-between text-center p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="flex-1 mb-4">
                      <h4 className="text-xs font-extrabold text-slate-950 mb-1">Guidebook</h4>
                      <p className="text-[10px] text-slate-400 leading-normal">Read design manual rules layout, contrast, and specs guides.</p>
                    </div>
                    
                    {/* View Button & Copy Link Link */}
                    <div className="w-full space-y-2">
                      <a
                        href="/walkthrough.md"
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 rounded-full bg-slate-950 hover:bg-slate-900 text-[9px] font-extrabold tracking-wider text-white transition-all active:scale-95 w-full flex items-center justify-center gap-1 uppercase"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </a>
                      <button
                        onClick={handleCopyGuidebookLink}
                        className="text-[9px] font-extrabold tracking-wider text-slate-500 hover:text-slate-800 transition-colors w-full uppercase flex items-center justify-center gap-1"
                      >
                        {copiedState === 'guidebook' ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-500" />
                            <span>Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>
        </header>

        {/* Scrollable Viewport workspace */}
        <div className="flex-1 overflow-y-auto p-8 xl:p-12">
          <div className={`mx-auto ${showPreviewSidebar ? 'max-w-4xl' : 'max-w-5xl'} transition-all duration-300`}>
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'colors' && <ColorsTab />}
            {activeTab === 'typography' && <TypographyTab />}
            {activeTab === 'spacing' && <LayoutTab />}
            {activeTab === 'motion' && <MotionTab />}
            {activeTab === 'components' && <ComponentsTab />}
            {activeTab === 'icons' && <IconsTab />}
            {activeTab === 'export' && <ExportTab />}
          </div>
        </div>

      </main>

      {/* Unified Component Playground (Sticky Column 3) */}
      {showPreviewSidebar && <LivePreviewSidebar />}

    </div>
  );
};

function App() {
  return (
    <DesignSystemProvider>
      <MainDashboard />
    </DesignSystemProvider>
  );
}

export default App;
