import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { 
  Play,
  Settings,
  ArrowRight,
  Bell,
  Lock,
  Check,
  Loader2,
  Info
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
      className="w-96 h-full overflow-hidden border-l flex flex-col p-6 flex-shrink-0 select-none bg-white border-slate-200 text-slate-800"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Info className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
            Live Spec Preview
          </span>
        </div>

        {/* Theme switcher */}
        <button
          onClick={toggleColorMode}
          className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all active:scale-95 flex items-center gap-1 bg-slate-50 hover:bg-slate-100"
        >
          <span>Mode:</span>
          <span className="capitalize text-[var(--color-primary)]">{colorMode}</span>
        </button>
      </div>

      {/* Scrollable Raw Components Spec List */}
      <div 
        className="flex-1 overflow-y-auto space-y-6 pr-1 pb-4"
        style={{
          fontFamily: 'var(--font-sans)',
        }}
      >
        
        {/* SECTION 1: BUTTON MATRIX */}
        <div className="space-y-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Button Presets</span>
          <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
            
            {/* Primary Solid Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold text-slate-500">Primary Solid</span>
              <button
                onClick={triggerLoading}
                className="px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                {btnLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
                <span>Active</span>
              </button>
            </div>

            {/* Outlined Secondary Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold text-slate-500">Secondary Outline</span>
              <button
                className="px-3.5 py-1.5 text-[11px] font-bold border transition-all active:scale-95 flex items-center justify-center gap-1.5"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                <Settings className="w-3 h-3 text-[var(--color-text-muted)]" />
                <span>Options</span>
              </button>
            </div>

            {/* Soft Tonal Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold text-slate-500">Soft Tonal</span>
              <button
                className="px-3.5 py-1.5 text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))',
                  color: 'var(--color-primary)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                <span>Tonal Style</span>
              </button>
            </div>

            {/* Ghost Link Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold text-slate-500">Ghost Link</span>
              <button
                className="text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 text-[var(--color-primary)]"
              >
                <span>Docs</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Circle Icon and Disabled Row */}
            <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-500">Circle & Locked</span>
              <div className="flex items-center gap-2">
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
                <button
                  disabled
                  className="px-3 py-1.5 text-[10px] font-bold border opacity-40 cursor-not-allowed flex items-center justify-center gap-1 bg-slate-900/10"
                  style={{
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                  }}
                >
                  <Lock className="w-2.5 h-2.5" />
                  <span>Locked</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: SELECTION CONTROLS */}
        <div className="space-y-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Selection Controls</span>
          <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
            
            {/* Custom Checkbox */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setIsChecked(!isChecked)}
            >
              <div 
                className="w-4.5 h-4.5 border flex items-center justify-center transition-all flex-shrink-0"
                style={{
                  borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: isChecked ? 'var(--color-primary)' : 'transparent',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>
              <span className="text-[11px] font-semibold">Checkbox Option</span>
            </div>

            {/* Custom Radio Group */}
            <div className="flex gap-4 pt-1">
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
                <span className="text-[11px] font-semibold">Radio A</span>
              </div>

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
                <span className="text-[11px] font-semibold">Radio B</span>
              </div>
            </div>

            {/* Switch Toggle */}
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/50">
              <span className="font-semibold">Switch Toggle</span>
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

        {/* SECTION 3: SPACING & RADIUS VISUAL PREVIEW */}
        <div className="space-y-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Radius & Spacing Specs</span>
          <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4">
            
            {/* Radius Preview block */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-semibold text-slate-500 block">Radius Scale (Button)</span>
              <div 
                className="h-10 w-full border flex items-center justify-center text-[10px] font-bold uppercase transition-all bg-[var(--color-card)]/50"
                style={{
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                var(--radius-button)
              </div>
            </div>

            {/* Spacing preview block */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-semibold text-slate-500 block">Spacing (Base Unit)</span>
              <div className="flex gap-2 items-end h-8">
                <div className="h-full bg-[var(--color-primary)] opacity-40" style={{ width: 'var(--spacing-1)' }} title="spacing-1" />
                <div className="h-full bg-[var(--color-primary)] opacity-60" style={{ width: 'var(--spacing-2)' }} title="spacing-2" />
                <div className="h-full bg-[var(--color-primary)] opacity-80" style={{ width: 'var(--spacing-3)' }} title="spacing-3" />
                <div className="h-full bg-[var(--color-primary)]" style={{ width: 'var(--spacing-4)' }} title="spacing-4" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
