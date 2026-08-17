import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { 
  CheckCircle2, 
  Loader2, 
  Moon, 
  Sun, 
  Search, 
  Settings, 
  User, 
  Layers,
  Laptop,
  Smartphone,
  Wifi,
  Battery,
  Play,
  Folder,
  ArrowRight,
  Trash2,
  Bell,
  Lock,
  Check
} from 'lucide-react';

export const ComponentsTab: React.FC = () => {
  const { tokens, colorMode, toggleColorMode } = useDesignSystem();
  const previewRef = useRef<HTMLDivElement>(null);

  // Viewport mode: desktop dashboard vs mobile app
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  // Component local states
  const [btnLoading, setBtnLoading] = useState(false);
  const [textVal, setTextVal] = useState('Jane Doe');
  const [isChecked, setIsChecked] = useState(true);
  const [radioSelection, setRadioSelection] = useState<'standard' | 'express'>('standard');
  const [progressVal, setProgressVal] = useState(72);
  const [showAlertBlock] = useState(true);

  // Apply CSS custom properties dynamically to the container
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    // Apply colors
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
    el.style.setProperty('--motion-duration-normal', tokens.motion.durationNormal);
    el.style.setProperty('--motion-duration-slow', tokens.motion.durationSlow);
    el.style.setProperty('--motion-ease-default', tokens.motion.easeDefault);
  }, [tokens, colorMode]);

  const triggerButtonLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Component Playground</h1>
          <p className="text-slate-400 text-sm">
            Inspect your design tokens inside a high-fidelity Desktop browser shell or Mobile phone viewport frame.
          </p>
        </div>

        {/* Viewport Frame Select & Theme Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Device Selection */}
          <div className="flex border border-slate-800 bg-slate-900/60 rounded-xl p-1">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleColorMode}
            className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 text-slate-300"
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

      {/* Main Canvas Area */}
      <div 
        ref={previewRef}
        className={`w-full transition-all duration-300 overflow-hidden flex justify-center p-6 ${
          colorMode === 'dark' ? 'dark bg-slate-950' : 'bg-slate-100'
        }`}
      >
        
        {/* VIEW 1: DESKTOP APP SHELL MOCKUP */}
        {deviceMode === 'desktop' && (
          <div 
            className="w-full border shadow-2xl transition-all duration-300 flex flex-col min-h-[600px] overflow-hidden animate-fadeIn"
            style={{
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-2xl)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {/* Browser Top Window controls */}
            <div className="px-4 py-3 bg-[var(--color-card)]/40 border-b border-[var(--color-border)] flex items-center justify-between">
              {/* Window buttons */}
              <div className="flex gap-1.5 flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              
              {/* URL Bar */}
              <div className="bg-[var(--color-bg)]/80 border border-[var(--color-border)] px-4 py-1 rounded-[var(--radius-sm)] text-[10px] text-[var(--color-text-muted)] font-mono max-w-sm w-full text-center truncate">
                app.dsys-hi-rdbl.com
              </div>

              <div className="w-12" />
            </div>

            {/* Browser App Layout */}
            <div className="flex flex-1 overflow-hidden h-full">
              {/* Left sidebar nav */}
              <aside className="w-48 bg-[var(--color-card)]/60 border-r border-[var(--color-border)] p-4 flex flex-col justify-between hidden sm:flex">
                <div className="space-y-6">
                  {/* Brand logo */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white text-[10px] font-extrabold">A</div>
                    <span className="text-xs font-extrabold">Aura Console</span>
                  </div>

                  {/* Sidebar links */}
                  <div className="space-y-1 text-[11px] font-bold">
                    <button className="w-full text-left px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      Dashboard
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                      Projects
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                      Settings
                    </button>
                  </div>
                </div>

                <span className="text-[9px] text-[var(--color-text-muted)] font-mono">v1.2 Released</span>
              </aside>

              {/* Main content body */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[580px] relative">
                
                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div>
                    <h3 className="text-sm font-extrabold">System Overview</h3>
                    <span className="text-[10px] text-[var(--color-text-muted)]">Manage active build pipelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-7 h-7 rounded-full bg-[var(--color-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-[var(--color-text)]" />
                    </div>
                  </div>
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Button Matrix */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Button Matrix</h4>
                    <div className="p-4 border border-[var(--color-border)] bg-[var(--color-card)]/40 rounded-[var(--radius-lg)] space-y-3">
                      
                      {/* Row 1: Primary Brand & Outlined */}
                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={triggerButtonLoading}
                          className="px-4 py-2 text-[11px] font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 flex-1"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          {btnLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                          <span>Primary Solid</span>
                        </button>
                        
                        <button
                          className="px-4 py-2 text-[11px] font-bold border transition-all active:scale-95 flex items-center justify-center gap-1.5 flex-1"
                          style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          <Settings className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                          <span>Outlined</span>
                        </button>
                      </div>

                      {/* Row 2: Soft Tonal & Ghost */}
                      <div className="flex gap-3 flex-wrap">
                        <button
                          className="px-4 py-2 text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 flex-1"
                          style={{
                            backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))',
                            color: 'var(--color-primary)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          <Folder className="w-3.5 h-3.5" />
                          <span>Soft Tonal</span>
                        </button>

                        <button
                          className="px-4 py-2 text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 text-[var(--color-primary)] flex-1"
                          style={{ borderRadius: 'var(--radius-button)' }}
                        >
                          <span>Ghost Link</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Row 3: Danger & Circle Icon & Disabled */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          className="px-4 py-2 text-[11px] font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-1.5 flex-1"
                          style={{
                            backgroundColor: 'var(--color-error)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Danger Action</span>
                        </button>

                        {/* IconButton */}
                        <button
                          className="w-9 h-9 flex items-center justify-center border relative transition-all active:scale-90"
                          style={{
                            borderColor: 'var(--color-border)',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          <Bell className="w-4 h-4 text-[var(--color-text-muted)]" />
                          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
                        </button>

                        {/* Disabled state */}
                        <button
                          disabled
                          className="px-4 py-2 text-[11px] font-bold border opacity-40 cursor-not-allowed flex items-center justify-center gap-1.5 bg-slate-900/10 flex-1"
                          style={{
                            borderColor: 'var(--color-border)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </button>
                      </div>

                    </div>

                    {/* Checkbox and Radio controls */}
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Inputs & selection controls</h4>
                    <div className="p-4 border border-[var(--color-border)] bg-[var(--color-card)]/40 rounded-[var(--radius-lg)] space-y-4">
                      
                      {/* Text field input */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[var(--color-text-muted)]">Database Name</label>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
                          <input
                            type="text"
                            value={textVal}
                            onChange={(e) => setTextVal(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 text-[11px] bg-transparent border outline-none"
                            style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                          />
                        </div>
                      </div>

                      {/* Checkbox and Radio controls */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--color-border)]/50">
                        {/* Checkbox */}
                        <div 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => setIsChecked(!isChecked)}
                        >
                          <div 
                            className="w-4 h-4 border flex items-center justify-center transition-all"
                            style={{
                              borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                              backgroundColor: isChecked ? 'var(--color-primary)' : 'transparent',
                              borderRadius: 'var(--radius-xs)'
                            }}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                          <span className="text-[11px] font-semibold">Enable Backups</span>
                        </div>

                        {/* Radio selection */}
                        <div className="flex gap-3">
                          <div 
                            className="flex items-center gap-1.5 cursor-pointer"
                            onClick={() => setRadioSelection('standard')}
                          >
                            <div 
                              className="w-4 h-4 border rounded-full flex items-center justify-center transition-all"
                              style={{
                                borderColor: radioSelection === 'standard' ? 'var(--color-primary)' : 'var(--color-border)',
                                backgroundColor: 'transparent'
                              }}
                            >
                              {radioSelection === 'standard' && (
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                              )}
                            </div>
                            <span className="text-[11px]">Monthly</span>
                          </div>

                          <div 
                            className="flex items-center gap-1.5 cursor-pointer"
                            onClick={() => setRadioSelection('express')}
                          >
                            <div 
                              className="w-4 h-4 border rounded-full flex items-center justify-center transition-all"
                              style={{
                                borderColor: radioSelection === 'express' ? 'var(--color-primary)' : 'var(--color-border)',
                                backgroundColor: 'transparent'
                              }}
                            >
                              {radioSelection === 'express' && (
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                              )}
                            </div>
                            <span className="text-[11px]">Yearly</span>
                          </div>
                        </div>
                      </div>

                      {/* Toggle Switch */}
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[var(--color-border)]/50">
                        <span>Production sync</span>
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

                  {/* Right Column: Feedback, Progress & Card */}
                  <div className="space-y-4">
                    {/* Banners */}
                    {showAlertBlock && (
                      <div 
                        className="p-3 border flex items-start gap-2.5 bg-[var(--color-card)]"
                        style={{
                          borderColor: 'var(--color-border)',
                          borderRadius: 'var(--radius-md)',
                          borderLeft: '4px solid var(--color-success)',
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="text-[11px] font-bold">Pipeline Active</h5>
                          <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">Deployment ready on dsys.hi-rdbl.com.</p>
                        </div>
                      </div>
                    )}

                    {/* Progress Card */}
                    <div
                      className="p-4 border bg-[var(--color-card)]"
                      style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}
                    >
                      <div className="flex justify-between items-center text-[11px] mb-2.5">
                        <span className="font-extrabold">Build Progress</span>
                        <span>{progressVal}%</span>
                      </div>
                      <div 
                        className="w-full h-1.5 bg-slate-800/30 rounded-full overflow-hidden cursor-pointer"
                        onClick={() => setProgressVal(Math.round(Math.random() * 100))}
                      >
                        <div className="h-full" style={{ width: `${progressVal}%`, backgroundColor: 'var(--color-primary)' }} />
                      </div>

                      {/* Pulse Skeleton */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--color-border)]">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-border)] opacity-60 animate-pulse" />
                        <div className="space-y-1 flex-1">
                          <div className="h-2 w-1/3 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
                          <div className="h-1.5 w-1/2 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Table Data */}
                <div 
                  className="border overflow-hidden bg-[var(--color-card)]"
                  style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}
                >
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/40 text-[var(--color-text-muted)]">
                        <th className="p-3 font-bold">App Name</th>
                        <th className="p-3 font-bold">Status</th>
                        <th className="p-3 font-bold text-right">Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      <tr>
                        <td className="p-3 font-extrabold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                          <span>dsys-hi-rdbl</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full font-bold text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-[var(--color-success)]">
                            Live
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button className="text-[var(--color-primary)] hover:underline font-bold">Open</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MOBILE VIEWPORT MOCKUP */}
        {deviceMode === 'mobile' && (
          <div 
            className="w-[320px] aspect-[9/18] border-8 border-slate-800 shadow-2xl transition-all duration-300 flex flex-col overflow-hidden relative animate-fadeIn"
            style={{
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              borderRadius: '36px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-4 w-28 bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
              {/* Speaker Line */}
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Mobile Status Bar */}
            <div className="px-5 pt-5 pb-2 text-[10px] text-[var(--color-text-muted)] flex items-center justify-between select-none">
              <span className="font-extrabold">9:41</span>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Mobile Top App Bar */}
            <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-card)]/30">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[var(--color-primary)] flex items-center justify-center text-white text-[9px] font-extrabold">A</div>
                <span className="text-xs font-extrabold">Console App</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-[var(--color-text)]" />
              </div>
            </div>

            {/* Mobile Scrollable Screen Content */}
            <div className="flex-1 p-4 space-y-5 overflow-y-auto max-h-[460px]">
              
              {/* Button Action Matrix Card */}
              <div className="p-3 border bg-[var(--color-card)]/50 space-y-2.5" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Quick Actions</span>
                <div className="flex gap-2">
                  <button
                    onClick={triggerButtonLoading}
                    className="flex-1 py-1.5 text-[9px] font-bold text-white shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                    style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
                  >
                    {btnLoading ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Play className="w-2.5 h-2.5" />}
                    <span>Primary</span>
                  </button>
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold border flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', borderRadius: 'var(--radius-button)' }}
                  >
                    <Settings className="w-2.5 h-2.5" />
                    <span>Outlined</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all"
                    style={{
                      backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))',
                      color: 'var(--color-primary)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    <Folder className="w-2.5 h-2.5" />
                    <span>Soft Tonal</span>
                  </button>
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 bg-red-600 active:scale-95 transition-all"
                    style={{ backgroundColor: 'var(--color-error)', color: 'white', borderRadius: 'var(--radius-button)' }}
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>Danger</span>
                  </button>
                </div>
              </div>

              {/* Form & Selection controls */}
              <div className="p-3 border bg-[var(--color-card)]/50 space-y-3" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Configuration</span>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold">App Name</label>
                  <input
                    type="text"
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    className="px-2.5 py-1.5 text-[10px] bg-transparent border outline-none"
                    style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                  />
                </div>

                {/* Checkbox and Radio controls */}
                <div className="space-y-2 pt-2 border-t border-[var(--color-border)]/50">
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

                  <div className="flex gap-3.5 pt-1">
                    <div 
                      className="flex items-center gap-1.5 cursor-pointer"
                      onClick={() => setRadioSelection('standard')}
                    >
                      <div 
                        className="w-3.5 h-3.5 border rounded-full flex items-center justify-center transition-all flex-shrink-0"
                        style={{
                          borderColor: radioSelection === 'standard' ? 'var(--color-primary)' : 'var(--color-border)',
                          backgroundColor: 'transparent'
                        }}
                      >
                        {radioSelection === 'standard' && (
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                        )}
                      </div>
                      <span className="text-[10px]">Monthly</span>
                    </div>

                    <div 
                      className="flex items-center gap-1.5 cursor-pointer"
                      onClick={() => setRadioSelection('express')}
                    >
                      <div 
                        className="w-3.5 h-3.5 border rounded-full flex items-center justify-center transition-all flex-shrink-0"
                        style={{
                          borderColor: radioSelection === 'express' ? 'var(--color-primary)' : 'var(--color-border)',
                          backgroundColor: 'transparent'
                        }}
                      >
                        {radioSelection === 'express' && (
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                        )}
                      </div>
                      <span className="text-[10px]">Yearly</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[var(--color-border)]/50">
                  <span>Auto-deploy to Prod</span>
                  <div
                    onClick={() => setIsChecked(!isChecked)}
                    className="w-7 h-4.5 p-0.5 rounded-full cursor-pointer flex items-center"
                    style={{ backgroundColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)' }}
                  >
                    <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${isChecked ? 'translate-x-3.5' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>

              {/* Progress Surface card */}
              <div
                className="p-4 border bg-[var(--color-card)] shadow-[var(--shadow-sm)]"
                style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-xl)' }}
              >
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="font-extrabold">Build Progress</span>
                  <span>{progressVal}%</span>
                </div>
                <div className="w-full h-1 bg-slate-800/40 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: `${progressVal}%`, backgroundColor: 'var(--color-primary)' }} />
                </div>
              </div>

            </div>

            {/* Mobile Bottom Tab Navigation */}
            <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-card)]/80 flex items-center justify-between select-none">
              <button className="flex flex-col items-center gap-0.5 text-[var(--color-primary)]">
                <Layers className="w-4.5 h-4.5" />
                <span className="text-[8px] font-bold">Home</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                <Search className="w-4.5 h-4.5" />
                <span className="text-[8px] font-bold">Search</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                <User className="w-4.5 h-4.5" />
                <span className="text-[8px] font-bold">Profile</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
