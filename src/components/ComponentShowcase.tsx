import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { getContrastRatio, evaluateContrast } from '../utils/contrast';
import { 
  Info, CheckCircle2, AlertTriangle, XCircle, Loader2, Plus, Copy, Check
} from 'lucide-react';

const ICON_PATHS: Record<string, string> = {
  Home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  Settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  User: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  Help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
  Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/>',
  Moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  Info: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/>',
  CheckCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  AlertTriangle: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
  XCircle: '<circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/>',
  Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
};

export const ComponentShowcase: React.FC = () => {
  const { tokens, colorMode } = useDesignSystem();
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  // Interactive states for components
  const [btnLoading, setBtnLoading] = useState(false);
  const [textVal, setTextVal] = useState('John Doe');
  const [textError, setTextError] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showToast] = useState(true);
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error' | 'info'>('success');
  const [progressVal, setProgressVal] = useState(65);

  // Icon explorer states
  const [selectedIcon, setSelectedIcon] = useState('Home');
  const [selectedColor, setSelectedColor] = useState<'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'>('primary');
  const [iconSizeKey, setIconSizeKey] = useState<'sizeSm' | 'sizeMd' | 'sizeLg'>('sizeMd');
  const [iconCopied, setIconCopied] = useState<'svg' | 'jsx' | null>(null);

  const handleCopyIconSvg = () => {
    const path = ICON_PATHS[selectedIcon];
    const stroke = tokens.icons.strokeWidth;
    const size = tokens.icons[iconSizeKey];
    const color = tokens.colors[selectedColor][colorMode];
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
    navigator.clipboard.writeText(svgCode);
    setIconCopied('svg');
    setTimeout(() => setIconCopied(null), 2000);
  };

  const handleCopyIconJsx = () => {
    const path = ICON_PATHS[selectedIcon];
    const sizeVar = iconSizeKey === 'sizeSm' ? 'sm' : iconSizeKey === 'sizeMd' ? 'md' : 'lg';
    const jsxCode = `import React from 'react';

export const ${selectedIcon}Icon = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    style={{
      width: 'var(--icon-size-${sizeVar})',
      height: 'var(--icon-size-${sizeVar})',
      stroke: 'var(--color-${selectedColor})',
      strokeWidth: 'var(--icon-stroke)',
      ...style,
    }}
  >
    ${path}
  </svg>
);`;
    navigator.clipboard.writeText(jsxCode);
    setIconCopied('jsx');
    setTimeout(() => setIconCopied(null), 2000);
  };

  // Apply CSS custom properties dynamically to the container
  useEffect(() => {
    const el = showcaseRef.current;
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

  // Handle live form validation
  useEffect(() => {
    if (!textVal) {
      setTextError('Full Name is required.');
    } else if (textVal.length < 3) {
      setTextError('Must be at least 3 characters.');
    } else {
      setTextError('');
    }
  }, [textVal]);

  // Simulate loader toggle
  const triggerButtonLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  // Contrast checking calculations
  const textBgContrast = getContrastRatio(tokens.colors.text[colorMode], tokens.colors.bg[colorMode]);
  const primaryBgContrast = getContrastRatio('#ffffff', tokens.colors.primary[colorMode]);

  const primaryContrastEval = evaluateContrast(primaryBgContrast);
  const bodyContrastEval = evaluateContrast(textBgContrast);

  return (
    <div 
      ref={showcaseRef}
      className="w-full transition-colors duration-300 overflow-y-auto max-h-[85vh] p-6 rounded-2xl"
      style={{ 
        backgroundColor: 'var(--color-bg)', 
        color: 'var(--color-text)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[var(--color-border)] mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1 text-[var(--color-text)]">
            {tokens.name}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Created by {tokens.author} • v{tokens.version}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0 bg-slate-900/60 dark:bg-slate-950/40 p-1.5 rounded-lg border border-white/5">
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Preview Mode</span>
            <span className="text-xs font-semibold capitalize text-indigo-400">{colorMode} Theme</span>
          </div>
        </div>
      </div>

      {/* WCAG Contrast Auditor Panel */}
      <div className="mb-8 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          WCAG 2.1 Accessibility Audit
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">Primary Button Contrast (White Text)</p>
              <p className="text-lg font-bold text-[var(--color-text)]">{primaryBgContrast}:1 Ratio</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${primaryContrastEval.aaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                AA Normal: {primaryContrastEval.aaNormal ? 'PASS' : 'FAIL'}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${primaryContrastEval.aaaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                AAA Normal: {primaryContrastEval.aaaNormal ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">Body Text contrast vs Page BG</p>
              <p className="text-lg font-bold text-[var(--color-text)]">{textBgContrast}:1 Ratio</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${bodyContrastEval.aaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                AA Normal: {bodyContrastEval.aaNormal ? 'PASS' : 'FAIL'}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${bodyContrastEval.aaaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                AAA Normal: {bodyContrastEval.aaaNormal ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Preview Categories */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Category 1: Buttons & Actions */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2">
            Interactive Control Matrix (Buttons)
          </h3>
          <div className="space-y-4 bg-[var(--color-card)] p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Primary Button */}
              <button 
                onClick={triggerButtonLoading}
                disabled={btnLoading}
                className="px-4 py-2 text-sm font-semibold shadow-[var(--shadow-sm)] active:scale-95 transition-all text-white flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  transitionDuration: 'var(--motion-duration-fast)',
                  transitionTimingFunction: 'var(--motion-ease-default)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              >
                {btnLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Primary Solid'}
              </button>

              {/* Secondary Outlined */}
              <button 
                className="px-4 py-2 text-sm font-semibold border transition-all active:scale-95 flex items-center gap-2"
                style={{
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'transparent',
                  borderRadius: 'var(--radius-md)',
                  transitionDuration: 'var(--motion-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Secondary Outlined
              </button>

              {/* Accent Soft */}
              <button 
                className="px-4 py-2 text-sm font-semibold transition-all active:scale-95"
                style={{
                  color: 'var(--color-accent)',
                  backgroundColor: 'rgba(129,140,248,0.1)',
                  borderRadius: 'var(--radius-md)',
                  transitionDuration: 'var(--motion-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(129,140,248,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(129,140,248,0.1)'}
              >
                Soft Accent
              </button>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Danger State */}
              <button 
                className="px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-sm)]"
                style={{
                  backgroundColor: 'var(--color-error)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                Danger Action
              </button>

              {/* Ghost state */}
              <button 
                className="px-4 py-2 text-sm font-semibold transition-all"
                style={{
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'transparent',
                  borderRadius: 'var(--radius-md)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                Ghost Action
              </button>

              {/* Disabled Button */}
              <button 
                disabled
                className="px-4 py-2 text-sm font-semibold opacity-40 cursor-not-allowed text-white"
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                Disabled
              </button>
            </div>

            {/* Button Sizes */}
            <div className="pt-2 flex items-end gap-3 flex-wrap">
              <button className="px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-sm)' }}>
                Size sm
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}>
                Size md
              </button>
              <button className="px-5 py-2.5 text-base font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-lg)' }}>
                Size lg
              </button>
              <button className="p-2 text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category 2: Form Controls & Inputs */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2">
            Inputs & Form Elements
          </h3>
          <div className="space-y-4 bg-[var(--color-card)] p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
            {/* Text Input (With validation) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text)]">
                Full Name
              </label>
              <input 
                type="text"
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder="Enter full name"
                className="px-3 py-2 text-sm bg-transparent border outline-none w-full transition-all focus:ring-2 focus:ring-offset-2"
                style={{
                  borderRadius: 'var(--radius-md)',
                  borderColor: textError ? 'var(--color-error)' : 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
              {textError ? (
                <span className="text-[11px] font-medium flex items-center gap-1" style={{ color: 'var(--color-error)' }}>
                  <XCircle className="w-3.5 h-3.5" /> {textError}
                </span>
              ) : (
                <span className="text-[11px] text-[var(--color-text-muted)]">
                  Enter your official legal name
                </span>
              )}
            </div>

            {/* Select Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text)]">
                Preferred Environment
              </label>
              <select 
                className="px-3 py-2 text-sm bg-transparent border outline-none w-full"
                style={{
                  borderRadius: 'var(--radius-md)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                <option value="react" className="bg-slate-900 text-white">React + Tailwind CSS</option>
                <option value="vue" className="bg-slate-900 text-white">Vue.js + Native CSS</option>
                <option value="wc" className="bg-slate-900 text-white">Standard Web Components</option>
              </select>
            </div>

            {/* Checkbox and Switches */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="rounded w-4 h-4"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-sm text-[var(--color-text)]">Remember my selection</span>
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

        {/* Category 3: Cards & Data Display */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2">
            Surfaces, Badges & Tooltips
          </h3>
          <div className="space-y-4">
            {/* Elevated Card */}
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
                  <h4 className="text-md font-bold mb-1">Standard Surface Card</h4>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">
                    Leverages border-radius, shadows, and spacing tokens automatically.
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                    Active
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(192, 132, 252, 0.15)' }}>
                    SaaS
                  </span>
                </div>
              </div>

              {/* Status Indicator Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-[var(--color-border)] mt-4">
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-md)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">Success</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-success)' }}>Completed</span>
                </div>
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-md)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">Warning</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-warning)' }}>Pending</span>
                </div>
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-md)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">Error</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-error)' }}>Alerted</span>
                </div>
                <div className="flex flex-col p-2 bg-[var(--color-bg)] rounded-[var(--radius-md)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">Info</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-info)' }}>Active</span>
                </div>
              </div>
            </div>

            {/* Badges Stack */}
            <div className="flex flex-wrap gap-2 items-center bg-[var(--color-card)] p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'var(--color-success)', color: '#030308' }}>Success Solid</span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-error)' }}>Error Soft</span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium border" style={{ borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>Warning Outline</span>
              <span className="text-xs px-2.5 py-1 rounded font-medium text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Square primary</span>
            </div>
          </div>
        </div>

        {/* Category 4: Navigation, Feedback & Skeleton */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2">
            Navigation, Status & Toast
          </h3>
          <div className="space-y-4 bg-[var(--color-card)] p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
            
            {/* Tabs */}
            <div className="flex border-b border-[var(--color-border)]">
              {['details', 'permissions', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 text-xs font-semibold capitalize border-b-2 -mb-[2px] transition-all"
                  style={{
                    color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    borderBottomColor: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span>System Initialization</span>
                <span>{progressVal}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden cursor-pointer" onClick={() => setProgressVal(Math.round(Math.random() * 100))}>
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
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase font-semibold text-[var(--color-text-muted)]">Skeleton Loader (Pulse)</span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-border)] animate-pulse" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 w-1/3 bg-[var(--color-border)] rounded animate-pulse" />
                  <div className="h-2 w-2/3 bg-[var(--color-border)] rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Toast overlay inside card */}
            {showToast && (
              <div 
                className="p-3 border flex items-center justify-between shadow-[var(--shadow-md)] mt-2"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div className="flex items-center gap-2">
                  {toastType === 'success' && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />}
                  {toastType === 'warning' && <AlertTriangle className="w-4 h-4 text-[var(--color-warning)]" />}
                  {toastType === 'error' && <XCircle className="w-4 h-4 text-[var(--color-error)]" />}
                  {toastType === 'info' && <Info className="w-4 h-4 text-[var(--color-info)]" />}
                  <span className="text-xs font-semibold">
                    {toastType === 'success' && 'Configuration updated successfully!'}
                    {toastType === 'warning' && 'Contrast ratio is below 4.5:1.'}
                    {toastType === 'error' && 'Failed to save to cloud.'}
                    {toastType === 'info' && 'Tokens loaded from Base64 link.'}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    const types: ('success'|'warning'|'error'|'info')[] = ['success', 'warning', 'error', 'info'];
                    const nextIndex = (types.indexOf(toastType) + 1) % types.length;
                    setToastType(types[nextIndex]);
                  }}
                  className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-border)] hover:bg-white/5 active:scale-95"
                >
                  Cycle Type
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Category 5: Icon Generator & Explorer (Full width) */}
      <div className="mt-12 pt-8 border-t border-[var(--color-border)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">
              Icon Explorer & Code Generator
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Select and customize svg icons directly mapped to your active size, stroke, and color tokens.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[var(--color-card)] p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          {/* Left panel: Icon selection catalog */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold text-[var(--color-text)] uppercase tracking-wider block">
              Icon Catalog
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {Object.keys(ICON_PATHS).map((iconName) => {
                const isSelected = selectedIcon === iconName;
                return (
                  <button
                    key={iconName}
                    onClick={() => setSelectedIcon(iconName)}
                    className="p-3 border rounded-[var(--radius-md)] flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 text-center"
                    style={{
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: ICON_PATHS[iconName] }}
                    />
                    <span className="text-[9px] font-medium truncate w-full text-[var(--color-text-muted)]">
                      {iconName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center panel: Customization controls */}
          <div className="lg:col-span-3 space-y-4 border-l border-r border-[var(--color-border)]/60 px-4">
            <span className="text-xs font-semibold text-[var(--color-text)] uppercase tracking-wider block">
              Token Modifiers
            </span>
            
            {/* Color mapping */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Stroke Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value as any)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-[var(--color-border)] rounded-[var(--radius-sm)] text-[var(--color-text)]"
              >
                <option value="primary">Primary Brand</option>
                <option value="secondary">Secondary UI</option>
                <option value="accent">Accent Callout</option>
                <option value="success">Success State</option>
                <option value="warning">Warning State</option>
                <option value="error">Error State</option>
                <option value="info">Info State</option>
              </select>
            </div>

            {/* Size mapping */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Size Token</label>
              <div className="grid grid-cols-3 gap-1">
                {(['sizeSm', 'sizeMd', 'sizeLg'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setIconSizeKey(size)}
                    className="py-1 text-[10px] font-semibold border rounded-[var(--radius-sm)] bg-slate-900"
                    style={{
                      borderColor: iconSizeKey === size ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: iconSizeKey === size ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    }}
                  >
                    {size === 'sizeSm' ? 'sm' : size === 'sizeMd' ? 'md' : 'lg'} ({tokens.icons[size]})
                  </button>
                ))}
              </div>
            </div>
            
            {/* Active stroke width display */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] block mb-1">Stroke thickness</span>
              <span className="text-xs font-mono font-semibold">{tokens.icons.strokeWidth} (Global Token)</span>
            </div>
          </div>

          {/* Right panel: Active live icon view + Exporters */}
          <div className="lg:col-span-3 flex flex-col items-center justify-between h-full space-y-4 py-2">
            <span className="text-xs font-semibold text-[var(--color-text)] uppercase tracking-wider block self-start">
              Live Preview & Code
            </span>
            
            {/* Live rendered icon */}
            <div 
              className="p-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] flex items-center justify-center bg-[var(--color-bg)] w-28 h-28"
              style={{
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={tokens.icons[iconSizeKey]}
                height={tokens.icons[iconSizeKey]}
                viewBox="0 0 24 24"
                fill="none"
                stroke={tokens.colors[selectedColor][colorMode]}
                strokeWidth={tokens.icons.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: ICON_PATHS[selectedIcon] }}
              />
            </div>

            {/* Exporter copy triggers */}
            <div className="w-full space-y-2">
              <button
                onClick={handleCopyIconSvg}
                className="w-full py-1.5 px-3 rounded-[var(--radius-sm)] text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700/80 hover:border-slate-600 transition-all text-white bg-slate-900 active:scale-95"
              >
                {iconCopied === 'svg' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SVG Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SVG Markup</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyIconJsx}
                className="w-full py-1.5 px-3 rounded-[var(--radius-sm)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-white bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 active:scale-95"
              >
                {iconCopied === 'jsx' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>JSX Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy React JSX</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
