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
  Sun,
  Moon
} from 'lucide-react';

type TabId = 'dashboard' | 'colors' | 'typography' | 'spacing' | 'motion' | 'components' | 'icons' | 'export';

const MainDashboard: React.FC = () => {
  const { colorMode, toggleColorMode } = useDesignSystem();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

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

  // Determine if we should show the 3rd column compact preview panel
  const showPreviewSidebar = ['colors', 'typography', 'spacing', 'motion'].includes(activeTab);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full flex-shrink-0">
        {/* Sidebar Header Logo */}
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Cpu className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white tracking-tight leading-none">
              Aura Engine
            </h2>
            <span className="text-[9px] text-slate-500 font-mono mt-1 block">
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
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-800/80 space-y-4">
          <div className="p-3 bg-slate-950/60 border border-slate-800/40 rounded-xl flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Canvas Theme</span>
              <span className="text-xs font-bold capitalize text-slate-300">{colorMode} Mode</span>
            </div>
            <button
              onClick={toggleColorMode}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all active:scale-90"
              title="Toggle preview color mode"
            >
              {colorMode === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Spacious Content Canvas */}
      <main className="flex-1 h-full overflow-y-auto bg-slate-950 p-8 xl:p-12 border-r border-slate-800/50">
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
      </main>

      {/* Sticky 3rd Column Live Preview Panel */}
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
