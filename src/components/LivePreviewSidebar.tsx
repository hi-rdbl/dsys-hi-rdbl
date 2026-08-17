import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { 
  Moon, 
  Sun, 
  Sparkles, 
  Wifi, 
  Battery, 
  User, 
  Search, 
  Layers,
  Play,
  Settings,
  Folder,
  ArrowRight,
  Trash2,
  Bell,
  Lock,
  Check,
  Loader2
} from 'lucide-react';

export const LivePreviewSidebar: React.FC = () => {
  const { tokens, colorMode, toggleColorMode } = useDesignSystem();
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction local states
  const [btnLoading, setBtnLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [radioSelection, setRadioSelection] = useState<'standard' | 'express'>('standard');

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

  const triggerLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1500);
  };

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
        className="flex-1 border-4 border-slate-800 dark:border-slate-800 bg-[var(--color-bg)] rounded-[32px] overflow-hidden flex flex-col relative shadow-2xl"
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
            <span className="text-[10px] font-extrabold">Live Console</span>
          </div>
          <div className="w-5.5 h-5.5 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
            <User className="w-3 h-3 text-[var(--color-text)]" />
          </div>
        </div>

        {/* Scrollable Phone Viewport */}
        <div className="flex-1 p-3.5 space-y-4 overflow-y-auto max-h-[380px]">
          
          {/* Button Matrix Section */}
          <div className="space-y-1.5">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Button Matrix (Interactive)</span>
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-2">
              
              {/* Row 1: Primary Brand & Outlined */}
              <div className="flex gap-2">
                <button
                  onClick={triggerLoading}
                  className="flex-1 py-1.5 text-[9px] font-bold text-white shadow-[var(--shadow-sm)] active:scale-95 transition-all flex items-center justify-center gap-1"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: 'var(--radius-button)',
                    transitionDuration: 'var(--motion-duration-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                >
                  {btnLoading ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Play className="w-2.5 h-2.5" />}
                  <span>Primary</span>
                </button>

                <button
                  className="flex-1 py-1.5 text-[9px] font-bold border transition-all active:scale-95 flex items-center justify-center gap-1"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                    borderRadius: 'var(--radius-button)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Settings className="w-2.5 h-2.5 text-[var(--color-text-muted)]" />
                  <span>Outlined</span>
                </button>
              </div>

              {/* Row 2: Soft Tonal & Ghost */}
              <div className="flex gap-2">
                <button
                  className="flex-1 py-1.5 text-[9px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1"
                  style={{
                    backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))',
                    color: 'var(--color-primary)',
                    borderRadius: 'var(--radius-button)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-20, rgba(99,102,241,0.2))'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-12, rgba(99,102,241,0.12))'}
                >
                  <Folder className="w-2.5 h-2.5" />
                  <span>Soft Tonal</span>
                </button>

                <button
                  className="flex-1 py-1.5 text-[9px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 text-[var(--color-primary)]"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.04)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  <span>Ghost</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Row 3: Danger & Circle Icon & Disabled */}
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 py-1.5 text-[9px] font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-1"
                  style={{
                    backgroundColor: 'var(--color-error)',
                    borderRadius: 'var(--radius-button)',
                  }}
                >
                  <Trash2 className="w-2.5 h-2.5" />
                  <span>Danger</span>
                </button>

                {/* Circle Icon Button */}
                <button
                  className="w-7 h-7 flex items-center justify-center border relative transition-all active:scale-90"
                  style={{
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  <Bell className="w-3 h-3 text-[var(--color-text-muted)]" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                </button>

                {/* Disabled State */}
                <button
                  disabled
                  className="flex-1 py-1.5 text-[9px] font-bold border opacity-40 cursor-not-allowed flex items-center justify-center gap-1 bg-slate-900/10"
                  style={{
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                  }}
                >
                  <Lock className="w-2.5 h-2.5" />
                  <span>Disabled</span>
                </button>
              </div>

            </div>
          </div>

          {/* Form & Selection Controls Section */}
          <div className="space-y-1.5">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Selection Controls</span>
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-3">
              
              {/* Checkbox item */}
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsChecked(!isChecked)}
              >
                <div 
                  className="w-4 h-4 border flex items-center justify-center transition-all flex-shrink-0"
                  style={{
                    borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: isChecked ? 'var(--color-primary)' : 'transparent',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <span className="text-[10px] font-medium">Auto-upgrade plan</span>
              </div>

              {/* Radio Group Item */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--color-border)]/50">
                <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Billing Cycle</span>
                <div className="flex gap-4">
                  
                  {/* Radio 1 */}
                  <div 
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={() => setRadioSelection('standard')}
                  >
                    <div 
                      className="w-4 h-4 border rounded-full flex items-center justify-center transition-all flex-shrink-0"
                      style={{
                        borderColor: radioSelection === 'standard' ? 'var(--color-primary)' : 'var(--color-border)',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {radioSelection === 'standard' && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                      )}
                    </div>
                    <span className="text-[10px]">Monthly</span>
                  </div>

                  {/* Radio 2 */}
                  <div 
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={() => setRadioSelection('express')}
                  >
                    <div 
                      className="w-4 h-4 border rounded-full flex items-center justify-center transition-all flex-shrink-0"
                      style={{
                        borderColor: radioSelection === 'express' ? 'var(--color-primary)' : 'var(--color-border)',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {radioSelection === 'express' && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                      )}
                    </div>
                    <span className="text-[10px]">Yearly</span>
                  </div>

                </div>
              </div>

              {/* Toggle switch item */}
              <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[var(--color-border)]/50">
                <span>Webhook notifications</span>
                <div
                  onClick={() => setIsChecked(!isChecked)}
                  className="w-8 h-4.5 p-0.5 rounded-full cursor-pointer flex items-center"
                  style={{ backgroundColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)' }}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${isChecked ? 'translate-x-3.5' : 'translate-x-0'}`} />
                </div>
              </div>

            </div>
          </div>

          {/* Sizing & Skeletons card */}
          <div className="space-y-1.5">
            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Surfaces & Progress</span>
            <div
              className="p-3 border shadow-[var(--shadow-sm)] bg-[var(--color-card)]"
              style={{
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold">Disk Allocation</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: 'var(--color-success)' }}>
                  85% Used
                </span>
              </div>
              <div className="w-full h-1 rounded-full bg-slate-800/40 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: 'var(--color-primary)' }} />
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
