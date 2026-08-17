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
  ArrowRight,
  Bell,
  Lock,
  Check,
  Loader2
} from 'lucide-react';

export const LivePreviewSidebar: React.FC = () => {
  const { tokens, colorMode, toggleColorMode } = useDesignSystem();
  const containerRef = useRef<HTMLDivElement>(null);

  // Viewport mode inside sidebar playground
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');

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
        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
            Component Playground
          </span>
        </div>

        {/* Viewport & Theme switcher group */}
        <div className="flex items-center gap-2">
          {/* Device toggle */}
          <div className="flex border border-slate-200 bg-slate-50 rounded-lg p-0.5">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                deviceMode === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              💻
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                deviceMode === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📱
            </button>
          </div>

          {/* Theme switcher for active preview tokens */}
          <button
            onClick={toggleColorMode}
            className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 transition-all active:scale-90 flex items-center justify-center bg-slate-50 hover:bg-slate-100"
            title={`Toggle Token Theme`}
          >
            {colorMode === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* VIEW 1: MOBILE DEVICE MOCKUP FRAME */}
      {deviceMode === 'mobile' && (
        <div 
          className="flex-1 border-4 border-slate-800 bg-[var(--color-bg)] rounded-[32px] overflow-hidden flex flex-col relative shadow-lg animate-fadeIn"
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
            
            {/* Buttons Section */}
            <div className="space-y-1.5">
              <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Button Matrix</span>
              <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-2">
                
                {/* Row 1: Primary Brand with/without icon */}
                <div className="flex gap-2">
                  <button
                    onClick={triggerLoading}
                    className="flex-1 py-1.5 text-[9px] font-bold text-white shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    {btnLoading ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Play className="w-2.5 h-2.5" />}
                    <span>Primary</span>
                  </button>
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold text-white transition-all active:scale-95 flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    <span>Text Only</span>
                  </button>
                </div>

                {/* Row 2: Secondary Outlined with/without icon */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold border transition-all active:scale-95 flex items-center justify-center gap-1"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    <Settings className="w-2.5 h-2.5 text-[var(--color-text-muted)]" />
                    <span>Outlined</span>
                  </button>
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold border transition-all active:scale-95 flex items-center justify-center"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    <span>Secondary</span>
                  </button>
                </div>

                {/* Row 3: Soft Tonal (text only) & Ghost (with icon) */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold transition-all active:scale-95 flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))',
                      color: 'var(--color-primary)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    <span>Soft Tonal</span>
                  </button>

                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 text-[var(--color-primary)]"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    <span>Ghost Link</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                {/* Row 4: Danger Action, IconButton, and Disabled */}
                <div className="flex items-center gap-2">
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold text-white transition-all active:scale-95 flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-error)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    <span>Danger</span>
                  </button>

                  {/* Circular Icon button */}
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

                  {/* Disabled state */}
                  <button
                    disabled
                    className="flex-1 py-1.5 text-[9px] font-bold border opacity-40 cursor-not-allowed flex items-center justify-center gap-1 bg-slate-900/10"
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

            {/* Form & Selection controls */}
            <div className="space-y-1.5">
              <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Selection Controls</span>
              <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/30 space-y-3">
                
                {/* Checkbox */}
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
                  <span className="text-[10px] font-medium">Automatic Backups</span>
                </div>

                {/* Radio selection */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--color-border)]/50">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Billing Cycle</span>
                  <div className="flex gap-4">
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

                {/* Toggle switch */}
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

            {/* Sizing & Progress */}
            <div className="space-y-1.5">
              <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Disk Allocation</span>
              <div
                className="p-3 border shadow-[var(--shadow-sm)] bg-[var(--color-card)]"
                style={{
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                }}
              >
                <div className="flex justify-between text-[8px] font-semibold text-[var(--color-text-muted)] mb-1">
                  <span>Utilization</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-800/40 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: 'var(--color-primary)' }} />
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Bottom Tab Navigation */}
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
      )}

      {/* VIEW 2: DESKTOP BROWSER MOCKUP FRAME */}
      {deviceMode === 'desktop' && (
        <div 
          className="flex-1 border border-slate-200 dark:border-slate-800 bg-[var(--color-bg)] rounded-2xl overflow-hidden flex flex-col relative shadow-lg animate-fadeIn text-[var(--color-text)]"
          style={{
            borderColor: 'var(--color-border)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {/* Top Address bar */}
          <div className="px-3 py-2 bg-[var(--color-card)]/40 border-b border-[var(--color-border)] flex items-center gap-2">
            <div className="flex gap-1 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="bg-[var(--color-bg)]/80 border border-[var(--color-border)] px-3 py-0.5 rounded text-[8px] text-[var(--color-text-muted)] font-mono flex-1 text-center truncate">
              app.dsys-hi-rdbl.com
            </div>
          </div>

          {/* Desktop Dashboard Mock */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[460px]">
            {/* Quick header */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <div>
                <h5 className="text-xs font-extrabold">System Dashboard</h5>
                <span className="text-[8px] text-[var(--color-text-muted)]">Auditing design changes</span>
              </div>
              <div className="w-5.5 h-5.5 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
            </div>

            {/* Button variations */}
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/20 space-y-2">
              <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">Buttons Grid</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="py-1 text-[9px] font-bold text-white flex items-center justify-center gap-1"
                  style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
                >
                  <Play className="w-2.5 h-2.5" />
                  <span>Primary</span>
                </button>
                <button
                  className="py-1 text-[9px] font-bold text-white flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
                >
                  <span>Solid</span>
                </button>
                <button
                  className="py-1 text-[9px] font-bold border flex items-center justify-center gap-1"
                  style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                >
                  <Settings className="w-2.5 h-2.5" />
                  <span>Outlined</span>
                </button>
                <button
                  className="py-1 text-[9px] font-bold border flex items-center justify-center"
                  style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                >
                  <span>Secondary</span>
                </button>
              </div>
            </div>

            {/* Interactive Selectors card */}
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/20 space-y-2">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsChecked(!isChecked)}
              >
                <div 
                  className="w-3.5 h-3.5 border flex items-center justify-center transition-all flex-shrink-0"
                  style={{
                    borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: isChecked ? 'var(--color-primary)' : 'transparent',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                </div>
                <span className="text-[9px] font-bold">Checkboxes enabled</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
