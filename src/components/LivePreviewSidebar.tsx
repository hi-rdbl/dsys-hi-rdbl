import React, { useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { Moon, Sun, Sparkles } from 'lucide-react';

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
      className={`w-96 h-full overflow-y-auto border-l flex flex-col p-6 flex-shrink-0 transition-colors duration-300 ${
        colorMode === 'dark' ? 'dark bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        borderColor: 'var(--color-border)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          Live Spec Preview
        </span>
        
        {/* Inside-preview Theme Switcher */}
        <button
          onClick={toggleColorMode}
          className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all active:scale-90 flex items-center justify-center bg-[var(--color-card)]/50"
          title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        >
          {colorMode === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="space-y-6">
        {/* Buttons Section */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Buttons</h4>
          <div className="p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-3">
            <button
              className="w-full px-4 py-2 text-xs font-bold text-white shadow-[var(--shadow-sm)] active:scale-95 transition-all"
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
              className="w-full px-4 py-2 text-xs font-bold border transition-all active:scale-95"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                borderRadius: 'var(--radius-button)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.06)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Outlined Secondary
            </button>
          </div>
        </div>

        {/* Form elements */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Inputs & Form</h4>
          <div className="p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[var(--color-text)]">Email Address</label>
              <input
                type="text"
                readOnly
                value="hello@dsys.hi-rdbl.com"
                className="px-3 py-1.5 text-xs bg-transparent border outline-none w-full cursor-default"
                style={{
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-button)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[10px] text-[var(--color-text)]">Auto-upgrade plan</span>
              <div
                className="w-8 h-5 p-0.5 rounded-full cursor-pointer flex items-center"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <div className="w-4 h-4 bg-white rounded-full translate-x-3 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Surfaces & Progress */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Surfaces & Feedback</h4>
          <div
            className="p-4 border shadow-[var(--shadow-sm)]"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold">Server Metrics</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: 'var(--color-success)' }}>
                Healthy
              </span>
            </div>
            
            <div className="space-y-1 mt-3">
              <div className="flex justify-between text-[9px] font-semibold text-[var(--color-text-muted)]">
                <span>Disk Allocation</span>
                <span>85%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800/40 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: 'var(--color-primary)' }} />
              </div>
            </div>

            {/* Pulse Skeleton */}
            <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-[var(--color-border)]">
              <div className="w-7 h-7 rounded-full bg-[var(--color-border)] opacity-60 animate-pulse" />
              <div className="space-y-1 flex-1">
                <div className="h-2 w-1/3 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
                <div className="h-1.5 w-2/3 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
