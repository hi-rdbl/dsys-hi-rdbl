import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Sparkles, 
  Sliders, 
  Moon, 
  Sun, 
  Search, 
  Settings, 
  User, 
  AlertTriangle,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ComponentsTab: React.FC = () => {
  const { tokens, colorMode, toggleColorMode } = useDesignSystem();
  const previewRef = useRef<HTMLDivElement>(null);

  // Component local states
  const [btnLoading, setBtnLoading] = useState(false);
  const [textVal, setTextVal] = useState('Jane Doe');
  const [textError, setTextError] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [progressVal, setProgressVal] = useState(72);
  const [showToastAlert, setShowToastAlert] = useState(true);
  const [showAlertBlock, setShowAlertBlock] = useState(true);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Component Playground</h1>
          <p className="text-slate-400 text-sm">
            Enriched catalog demonstrating navbar layouts, data grids, modal views, form validations, and custom alerts.
          </p>
        </div>
      </div>

      {/* Main Enriched Canvas Container */}
      <div 
        ref={previewRef}
        className={`w-full p-8 rounded-3xl border transition-all duration-300 space-y-8 shadow-2xl ${
          colorMode === 'dark' ? 'dark bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Canvas Header Control Strip */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text-muted)]">
              Interactive Canvas
            </span>
          </div>

          {/* Toggle On/Off Light/Dark inside Preview */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Preview Mode:
            </span>
            <button
              onClick={toggleColorMode}
              className="px-3.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 hover:bg-[var(--color-card)] text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 text-[var(--color-text)]"
            >
              {colorMode === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Component 1: Mock Navbar / Header */}
        <header 
          className="border p-4 bg-[var(--color-card)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-extrabold text-sm">
              A
            </div>
            <div>
              <span className="text-sm font-extrabold block">Aura Console</span>
              <span className="text-[10px] text-[var(--color-text-muted)] block leading-none">Console Management</span>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="relative flex-1 max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            </span>
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[var(--color-bg)]/80 border outline-none text-[var(--color-text)]"
              style={{
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-md)',
              }}
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] border border-[var(--color-border)] flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--color-text)]" />
            </div>
          </div>
        </header>

        {/* Component 2 & 3: Columns for inputs and buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Button Matrix */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              Button Variants & Sizing
            </h3>
            <div className="p-6 border border-[var(--color-border)] rounded-[var(--radius-xl)] bg-[var(--color-card)]/40 space-y-5">
              
              <div className="flex flex-wrap gap-3 items-center">
                {/* Primary */}
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

                {/* Secondary */}
                <button
                  className="px-4 py-2 text-xs font-bold border transition-all active:scale-95"
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

                {/* Accent */}
                <button
                  className="px-4 py-2 text-xs font-bold transition-all active:scale-95"
                  style={{
                    color: 'var(--color-accent)',
                    backgroundColor: 'rgba(192, 132, 252, 0.12)',
                    borderRadius: 'var(--radius-button)',
                  }}
                >
                  Soft Accent
                </button>
              </div>

              <div className="flex flex-wrap gap-3 items-center pt-1">
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
                  className="px-4 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all"
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  Ghost Button
                </button>
              </div>

              {/* Sizing display */}
              <div className="flex items-end gap-3 pt-2 flex-wrap border-t border-[var(--color-border)] mt-2">
                <button className="px-3 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}>
                  Size sm
                </button>
                <button className="px-4 py-2 text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}>
                  Size md
                </button>
                <button className="px-5 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}>
                  Size lg
                </button>
              </div>

            </div>
          </div>

          {/* Form controls */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              Form Group Controls
            </h3>
            <div className="p-6 border border-[var(--color-border)] rounded-[var(--radius-xl)] bg-[var(--color-card)]/40 space-y-4">
              
              {/* Input with live validation state */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--color-text)]">Email Address</label>
                <input
                  type="text"
                  value={textVal}
                  onChange={(e) => setTextVal(e.target.value)}
                  placeholder="Enter email address"
                  className="px-3 py-2 text-xs bg-transparent border outline-none w-full"
                  style={{
                    borderColor: textError ? 'var(--color-error)' : 'var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                    color: 'var(--color-text)',
                  }}
                />
                {textError ? (
                  <span className="text-[10px] font-semibold flex items-center gap-1 text-[var(--color-error)]" style={{ color: 'var(--color-error)' }}>
                    <XCircle className="w-3.5 h-3.5" /> {textError}
                  </span>
                ) : (
                  <span className="text-[10px] text-[var(--color-text-muted)]">Required for email notifications</span>
                )}
              </div>

              {/* Text Area */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--color-text)]">System Description</label>
                <textarea
                  rows={2}
                  placeholder="Enter design system notes..."
                  className="px-3 py-2 text-xs bg-transparent border outline-none w-full"
                  style={{
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              {/* Switches */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="rounded w-4 h-4 cursor-pointer"
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span className="text-xs text-[var(--color-text)]">Enable API webhook access</span>
                </label>

                {/* Switch Toggle */}
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

        </div>

        {/* Component 4: WCAG Accent Banners / Alert Panels */}
        {showAlertBlock && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                System Banners & Feedback
              </h3>
              <button 
                onClick={() => setShowAlertBlock(false)}
                className="text-[10px] text-[var(--color-text-muted)] underline hover:text-[var(--color-text)]"
              >
                Hide Alerts
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Success Banner */}
              <div 
                className="p-3.5 border flex items-start gap-3 bg-[var(--color-card)]"
                style={{
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: '4px solid var(--color-success)',
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold">Workspace Compiled</h4>
                  <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed mt-0.5">
                    Build executed successfully in 445ms with zero warnings.
                  </p>
                </div>
              </div>

              {/* Warning Banner */}
              <div 
                className="p-3.5 border flex items-start gap-3 bg-[var(--color-card)]"
                style={{
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: '4px solid var(--color-warning)',
                }}
              >
                <AlertTriangle className="w-5 h-5 text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold">Contrast Warning</h4>
                  <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed mt-0.5">
                    Primary action color contrast vs white text is below 4.5:1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!showAlertBlock && (
          <button onClick={() => setShowAlertBlock(true)} className="text-xs underline text-indigo-400">
            Show Alert Banners
          </button>
        )}

        {/* Component 5: Data Grid Table */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Tabular Project Data Grid
          </h3>
          <div 
            className="border overflow-hidden bg-[var(--color-card)]"
            style={{
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/50 text-[var(--color-text-muted)]">
                  <th className="p-3.5 font-bold">Project Name</th>
                  <th className="p-3.5 font-bold">Stability</th>
                  <th className="p-3.5 font-bold">Date Updated</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                <tr>
                  <td className="p-3.5 font-extrabold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>dsys-hi-rdbl</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full font-bold text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-[var(--color-success)]">
                      Production
                    </span>
                  </td>
                  <td className="p-3.5 text-[var(--color-text-muted)] font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Aug 18, 2026
                  </td>
                  <td className="p-3.5 text-right">
                    <button className="text-[var(--color-primary)] hover:underline font-bold inline-flex items-center gap-0.5">
                      Open <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-extrabold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[var(--color-accent)]" />
                    <span>brandbook-flareum</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full font-bold text-[9px] bg-amber-500/10 border border-amber-500/20 text-[var(--color-warning)]">
                      Draft Specs
                    </span>
                  </td>
                  <td className="p-3.5 text-[var(--color-text-muted)] font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Aug 17, 2026
                  </td>
                  <td className="p-3.5 text-right">
                    <button className="text-[var(--color-primary)] hover:underline font-bold inline-flex items-center gap-0.5">
                      Open <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Component 6: Modal/Dialog overlay mockup inside canvas */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Modal Dialog Mockup
          </h3>
          
          <div className="p-8 border bg-[var(--color-bg)]/80 flex items-center justify-center" style={{ borderRadius: 'var(--radius-2xl)', borderColor: 'var(--color-border)' }}>
            <div 
              className="w-full max-w-md p-6 border bg-[var(--color-card)]"
              style={{
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div className="flex items-start justify-between pb-3 border-b border-[var(--color-border)] mb-4">
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--color-text)]">Delete Project Manifest</h4>
                  <span className="text-[10px] text-[var(--color-text-muted)]">This action cannot be undone.</span>
                </div>
                <div className="w-5 h-5 rounded bg-[var(--color-border)] opacity-20" />
              </div>

              <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed mb-6">
                Are you sure you want to delete **brandbook-flareum**? Deleting this manifest will purge all custom variables, typography scales, and presets from your workspace.
              </p>

              <div className="flex items-center justify-end gap-2">
                <button 
                  className="px-3 py-1.5 text-[10px] font-bold border transition-colors hover:bg-[var(--color-bg)] text-[var(--color-text)]"
                  style={{
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="px-3 py-1.5 text-[10px] font-bold text-white shadow-md"
                  style={{
                    backgroundColor: 'var(--color-error)',
                    borderRadius: 'var(--radius-button)',
                  }}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Component 7: Skeletons & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Progress & Toast */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Progress & Status</h4>
            <div className="p-5 border border-[var(--color-border)] bg-[var(--color-card)]/30 rounded-[var(--radius-xl)] space-y-4">
              
              {/* Tabs */}
              <div className="flex border-b border-[var(--color-border)]">
                {['overview', 'settings', 'logs'].map((tab) => (
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
                  <span>Task Execution Progress</span>
                  <span>{progressVal}%</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full bg-slate-800/40 overflow-hidden cursor-pointer" 
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

              {/* Inline Toast Overlay */}
              {showToastAlert && (
                <div
                  className="p-3 border flex items-center justify-between shadow-[var(--shadow-md)] mt-2 bg-[var(--color-bg)]"
                  style={{
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" />
                    <span className="text-[11px] font-bold text-[var(--color-text)]">
                      Design System exported successfully.
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

          {/* Skeletons Loader card */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Skeleton Loaders</h4>
            <div className="p-5 border border-[var(--color-border)] bg-[var(--color-card)]/30 rounded-[var(--radius-xl)] space-y-4">
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-border)] animate-pulse" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-1/4 bg-[var(--color-border)] rounded animate-pulse" />
                    <div className="h-2 w-1/2 bg-[var(--color-border)] rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-[var(--color-border)]">
                  <div className="h-2.5 w-full bg-[var(--color-border)] rounded animate-pulse" />
                  <div className="h-2.5 w-5/6 bg-[var(--color-border)] rounded animate-pulse" />
                  <div className="h-2.5 w-2/3 bg-[var(--color-border)] rounded animate-pulse" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
