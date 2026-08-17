import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { CheckCircle2, XCircle, Loader2, Plus, Sparkles, Sliders } from 'lucide-react';

export const ComponentsTab: React.FC = () => {
  const { tokens, colorMode } = useDesignSystem();
  const previewRef = useRef<HTMLDivElement>(null);

  // Playground state
  const [btnLoading, setBtnLoading] = useState(false);
  const [textVal, setTextVal] = useState('Jane Doe');
  const [textError, setTextError] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [progressVal, setProgressVal] = useState(72);
  const [showToastAlert, setShowToastAlert] = useState(true);

  // Apply CSS custom properties dynamically to the container
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    // Apply colors
    Object.entries(tokens.colors).forEach(([key, val]) => {
      el.style.setProperty(`--color-${key}`, val[colorMode]);
    });

    // Apply typography
    el.style.setProperty('--font-sans', tokens.typography.fontFamily);

    // Apply radius
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
    el.style.setProperty('--motion-duration-normal', tokens.motion.durationNormal);
    el.style.setProperty('--motion-duration-slow', tokens.motion.durationSlow);
    el.style.setProperty('--motion-ease-default', tokens.motion.easeDefault);
  }, [tokens, colorMode]);

  useEffect(() => {
    if (!textVal) {
      setTextError('Username is required.');
    } else if (textVal.length < 3) {
      setTextError('Must be at least 3 characters.');
    } else {
      setTextError('');
    }
  }, [textVal]);

  const triggerButtonLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Component Playground</h1>
        <p className="text-slate-400 text-sm">
          Interact with a comprehensive library of custom buttons, inputs, form group, navigation controls, and feedback banners.
        </p>
      </div>

      {/* Interactive Playground Canvas */}
      <div 
        ref={previewRef}
        className="w-full p-8 rounded-2xl border transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-8"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        
        {/* Box 1: Button Matrix */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Control Matrix (Buttons)
          </h3>
          <div className="p-5 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/50 space-y-4">
            
            <div className="flex flex-wrap gap-2.5 items-center">
              {/* Primary button */}
              <button
                onClick={triggerButtonLoading}
                disabled={btnLoading}
                className="px-4 py-2 text-xs font-bold text-white shadow-[var(--shadow-sm)] active:scale-95 transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-button)',
                  transitionDuration: 'var(--motion-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              >
                {btnLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Primary Solid'}
              </button>

              {/* Secondary button */}
              <button
                className="px-4 py-2 text-xs font-bold border transition-all active:scale-95"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  borderRadius: 'var(--radius-button)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Outlined Secondary
              </button>

              {/* Soft button */}
              <button
                className="px-4 py-2 text-xs font-bold transition-all active:scale-95"
                style={{
                  color: 'var(--color-accent)',
                  backgroundColor: 'rgba(192, 132, 252, 0.15)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                Soft Accent
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5 items-center pt-1">
              {/* Danger */}
              <button
                className="px-4 py-2 text-xs font-bold text-white shadow-[var(--shadow-sm)]"
                style={{
                  backgroundColor: 'var(--color-error)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                Danger
              </button>

              {/* Ghost */}
              <button
                className="px-4 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                style={{
                  borderRadius: 'var(--radius-button)',
                }}
              >
                Ghost
              </button>

              {/* Disabled */}
              <button
                disabled
                className="px-4 py-2 text-xs font-bold opacity-30 text-white cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                Disabled
              </button>
            </div>

            {/* Sizing display */}
            <div className="flex items-end gap-2.5 pt-2 flex-wrap">
              <button className="px-3 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-sm)' }}>
                Size sm
              </button>
              <button className="px-4 py-2 text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}>
                Size md
              </button>
              <button className="px-5 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-lg)' }}>
                Size lg
              </button>
              <button className="p-2 text-white flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }}>
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Box 2: Form Controls */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            Inputs & Form Components
          </h3>
          <div className="p-5 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/50 space-y-4">
            
            {/* Input with live validation state */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--color-text)]">Username</label>
              <input
                type="text"
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder="Enter username"
                className="px-3 py-2 text-xs bg-transparent border outline-none w-full"
                style={{
                  borderColor: textError ? 'var(--color-error)' : 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text)',
                }}
              />
              {textError ? (
                <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-error)' }}>
                  <XCircle className="w-3.5 h-3.5" /> {textError}
                </span>
              ) : (
                <span className="text-[10px] text-[var(--color-text-muted)]">Must be 3+ characters</span>
              )}
            </div>

            {/* Select options dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--color-text)]">Theme Preference</label>
              <select
                className="px-3 py-2 text-xs bg-transparent border outline-none w-full"
                style={{
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text)',
                }}
              >
                <option value="auto" className="bg-slate-900 text-white">System Preference</option>
                <option value="light" className="bg-slate-900 text-white">Light Mode</option>
                <option value="dark" className="bg-slate-900 text-white">Dark Mode</option>
              </select>
            </div>

            {/* Checkbox and switches */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="rounded w-4 h-4 cursor-pointer"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-xs text-[var(--color-text)]">Opt-in to telemetry</span>
              </label>

              {/* Custom Switch Toggle */}
              <div
                onClick={() => setIsChecked(!isChecked)}
                className="w-10 h-6 p-0.5 rounded-full cursor-pointer transition-all flex items-center"
                style={{
                  backgroundColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              >
                <div
                  className="w-5 h-5 bg-white rounded-full shadow-[var(--shadow-sm)] transition-all transform"
                  style={{
                    transform: isChecked ? 'translateX(16px)' : 'translateX(0px)',
                    transitionDuration: 'var(--motion-duration-fast)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Box 3: Surface Cards & Badges */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Surfaces, Badges & Accents
          </h3>
          <div className="space-y-4">
            {/* Main surface card */}
            <div
              className="p-5 border"
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-extrabold mb-1">Tethered Profile Card</h4>
                  <p className="text-[11px] text-[var(--color-text-muted)] mb-3">
                    Reacting dynamically to radius and shadow variables.
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold border" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                    Active
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(192,132,252,0.1)' }}>
                    Admin
                  </span>
                </div>
              </div>

              {/* Status table blocks */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[var(--color-border)] mt-4">
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-sm)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Success</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-success)' }}>Stable</span>
                </div>
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-sm)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Warning</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-warning)' }}>A11y</span>
                </div>
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-sm)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Error</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-error)' }}>None</span>
                </div>
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-sm)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Info</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-info)' }}>Normal</span>
                </div>
              </div>
            </div>

            {/* Badges Stack */}
            <div className="flex flex-wrap gap-2 items-center bg-[var(--color-card)]/50 p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'var(--color-success)', color: '#030308' }}>Success Solid</span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: 'var(--color-error)' }}>Error Soft</span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium border" style={{ borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>Warning Outline</span>
            </div>
          </div>
        </div>

        {/* Box 4: Navigation, Tabs & Feedbacks */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Navigation, Status & Toast Alert
          </h3>
          <div className="p-5 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-card)]/50 space-y-4">
            
            {/* Tabs */}
            <div className="flex border-b border-[var(--color-border)]">
              {['profile', 'billing', 'security'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className="px-4 py-2 text-xs font-bold capitalize border-b-2 -mb-[2px] transition-all"
                  style={{
                    color: activeSubTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    borderBottomColor: activeSubTab === tab ? 'var(--color-primary)' : 'transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span>Task Progress</span>
                <span>{progressVal}%</span>
              </div>
              <div 
                className="w-full h-2 rounded-full bg-slate-800 overflow-hidden cursor-pointer" 
                onClick={() => setProgressVal(Math.round(Math.random() * 100))}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progressVal}%`,
                    backgroundColor: 'var(--color-primary)',
                    transitionDuration: 'var(--motion-duration-normal)',
                  }}
                />
              </div>
            </div>

            {/* Skeleton loaders (Pulse animation) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--color-border)] animate-pulse" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 w-1/4 bg-[var(--color-border)] rounded animate-pulse" />
                  <div className="h-2 w-1/2 bg-[var(--color-border)] rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Inline Toast Overlay */}
            {showToastAlert && (
              <div
                className="p-3 border flex items-center justify-between shadow-[var(--shadow-md)] mt-2"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" />
                  <span className="text-[11px] font-bold text-[var(--color-text)]">
                    Engine workspace compiled successfully.
                  </span>
                </div>
                <button 
                  onClick={() => setShowToastAlert(false)}
                  className="text-[9px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                >
                  Dismiss
                </button>
              </div>
            )}
            {!showToastAlert && (
              <button 
                onClick={() => setShowToastAlert(true)}
                className="text-[10px] underline text-indigo-400"
              >
                Restore toast message
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
