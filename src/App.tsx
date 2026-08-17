import React, { useState } from 'react';
import { DesignSystemProvider } from './context/DesignSystemContext';
import { DashboardTab } from './components/DashboardTab';
import { ColorsTab } from './components/ColorsTab';
import { TypographyTab } from './components/TypographyTab';
import { LayoutTab } from './components/LayoutTab';
import { MotionTab } from './components/MotionTab';
import { IconsTab } from './components/IconsTab';
import { ExportTab } from './components/ExportTab';
import { LivePreviewSidebar } from './components/LivePreviewSidebar';

import {
  LayoutGrid,
  Palette,
  Type,
  Sliders,
  Zap,
  Cpu,
  Download
} from 'lucide-react';

type TabId = 'dashboard' | 'colors' | 'typography' | 'spacing' | 'motion' | 'icons' | 'export';

const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard & Presets', icon: LayoutGrid },
    { id: 'colors', name: 'Color Palette', icon: Palette },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'spacing', name: 'Spacing & Corners', icon: Sliders },
    { id: 'motion', name: 'Depth & Motion', icon: Zap },
    { id: 'icons', name: 'Icon Generator', icon: Cpu },
    { id: 'export', name: 'Export Assets', icon: Download },
  ] as const;

  // Determine if we should show the 3rd column playground preview panel
  const showPreviewSidebar = ['colors', 'typography', 'spacing', 'motion'].includes(activeTab);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans select-none">
      
      {/* Sidebar Navigation (Light Mode Theme) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0">
        {/* Sidebar Header Logo */}
        <div className="p-6 border-b border-slate-200/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
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
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
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

      {/* Main Spacious Content Canvas (Light Mode Theme) */}
      <main className="flex-1 h-full overflow-y-auto bg-slate-50 p-8 xl:p-12 border-r border-slate-200/60">
        <div className={`mx-auto ${showPreviewSidebar ? 'max-w-4xl' : 'max-w-5xl'} transition-all duration-300`}>
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'colors' && <ColorsTab />}
          {activeTab === 'typography' && <TypographyTab />}
          {activeTab === 'spacing' && <LayoutTab />}
          {activeTab === 'motion' && <MotionTab />}
          {activeTab === 'icons' && <IconsTab />}
          {activeTab === 'export' && <ExportTab />}
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
