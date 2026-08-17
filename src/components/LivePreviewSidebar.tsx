import React, { useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { 
  Moon, 
  Sun, 
  Sparkles, 
  Wifi, 
  Battery, 
  User, 
  Search, 
  Layers 
} from 'lucide-react';

export const LivePreviewSidebar: React.FC = () => {
  const { tokens, colorMode, toggleColorMode } = useDesignSystem();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Apply color tokens
    Object.entries(tokens.colors).forEach(([key, val]) => {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      el.style.setProperty(`--color-${kebabKey}`, val[colorMode]);
    });

    // Apply typography
    el.style.setProperty('--font-sans', tokens.typography.fontFamily);

    // Apply radius scale
    Object.entries(tokens.radius).forEach(([key, val]) => {
      el.style.setProperty(`--radius-${key}`, val);
    });

    // Apply spacing scale
    const base = tokens.spacing.baseUnit;
    [1, 2, 3, 4, 5, 6, 8, 10, 12, 16].forEach((scale) => {
      el.style.setProperty(`--spacing-${scale}`, `${base * scale}px`);
    });

    // Apply shadows
    Object.entries(tokens.shadows).forEach(([key, val]) => {
      el.style.setProperty(`--shadow-${key}`, val);
    });

    // Apply motion
    el.style.setProperty('--motion-duration-fast', tokens.motion.durationFast);
  }, [tokens, colorMode]);

  return (
    <div 
      ref={containerRef}
      className={`w-96 h-full overflow-hidden border-l flex flex-col p-6 flex-shrink-0 transition-colors duration-300 select-none ${
        colorMode === 'dark' ? 'dark bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/20 dark:border-slate-800/80 mb-4 flex-shrink-0">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          Live Spec Preview
        </span>
        
        {/* Inside-preview Theme Switcher */}
        <button
          onClick={toggleColorMode}
          className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-400 transition-all active:scale-90 flex items-center justify-center bg-slate-100 dark:bg-slate-900/60"
          title={`Switch theme`}
        >
          {colorMode === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* MOBILE DEVICE MOCKUP FRAME */}
      <div 
        className="flex-1 border-4 border-slate-800 dark:border-slate-800 bg-[var(--color-bg)] rounded-[32px] overflow-hidden flex flex-col relative shadow-xl"
        style={{
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-3.5 w-24 bg-slate-800 rounded-b-lg z-50 flex items-center justify-center">
          <div className="w-6 h-0.5 bg-slate-700 rounded-full" />
        </div>

        {/* Mobile Status Bar */}
        <div className="px-4 pt-4 pb-1.5 text-[9px] text-[var(--color-text-muted)] flex items-center justify-between">
          <span className="font-extrabold">9:41</span>
          <div className="flex items-center gap-1">
            <Wifi className="w-2.5 h-2.5" />
            <Battery className="w-3 h-3" />
          </div>
        </div>

        {/* Mobile App Bar */}
        <div className="px-3.5 py-2 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-card)]/30">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-[var(--color-primary)] flex items-center justify-center text-white text-[8px] font-extrabold">A</div>
            <span className="text-[10px] font-extrabold">Console app</span>
          </div>
          <div className="w-5.5 h-5.5 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
            <User className="w-3 h-3 text-[var(--color-text)]" />
          </div>
        </div>

        {/* Scrollable Phone Viewport */}
        <div className="flex-1 p-3.5 space-y-4 overflow-y-auto max-h-[360px]">
          
          {/* Buttons Card */}
          <div className="space-y-2">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Button Presets</span>
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-2.5">
              <button
                className="w-full py-1.5 text-[10px] font-bold text-white shadow-[var(--shadow-sm)] active:scale-95 transition-all"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-button)',
                  transitionDuration: 'var(--motion-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              >
                Primary Brand
              </button>
              <button
                className="w-full py-1.5 text-[10px] font-bold border transition-all active:scale-95"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  borderRadius: 'var(--radius-button)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Secondary Outline
              </button>
            </div>
          </div>

          {/* Form & Switch */}
          <div className="space-y-2">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Inputs & Form</span>
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold">Email Address</label>
                <input
                  type="text"
                  readOnly
                  value="hello@dsys.hi-rdbl.com"
                  className="px-2.5 py-1 text-[10px] bg-transparent border outline-none w-full cursor-default"
                  style={{
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] pt-0.5">
                <span>Auto-upgrade plan</span>
                <div
                  className="w-7 h-4.5 p-0.5 rounded-full flex items-center bg-[var(--color-primary)]"
                >
                  <div className="w-3.5 h-3.5 bg-white rounded-full translate-x-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics card */}
          <div className="space-y-2">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Surfaces & Progress</span>
            <div
              className="p-3 border shadow-[var(--shadow-sm)] bg-[var(--color-card)]"
              style={{
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold">Server Metrics</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: 'var(--color-success)' }}>
                  Healthy
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] font-semibold text-[var(--color-text-muted)]">
                  <span>Disk Allocation</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-800/40 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: 'var(--color-primary)' }} />
                </div>
              </div>

              {/* Pulse Skeleton */}
              <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-[var(--color-border)]">
                <div className="w-5 h-5 rounded-full bg-[var(--color-border)] opacity-60 animate-pulse" />
                <div className="space-y-0.5 flex-1">
                  <div className="h-1.5 w-1/3 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
                  <div className="h-1 w-1/2 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Tab Navigation */}
        <div className="px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-card)]/80 flex items-center justify-between flex-shrink-0">
          <button className="flex flex-col items-center gap-0.5 text-[var(--color-primary)]">
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-[var(--color-text-muted)]">
            <Search className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold">Search</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-[var(--color-text-muted)]">
            <User className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold">Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
};
