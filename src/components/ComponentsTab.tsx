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
  Check,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';

export const ComponentsTab: React.FC = () => {
  const { tokens, colorMode, toggleColorMode } = useDesignSystem();
  const previewRef = useRef<HTMLDivElement>(null);

  // Viewport mode: desktop dashboard vs mobile app mockup
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  // Interactive component local states
  const [btnLoading, setBtnLoading] = useState(false);
  const [textVal, setTextVal] = useState('dsys-production-db');
  const [passwordShow, setPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [radioSelection, setRadioSelection] = useState<'standard' | 'express'>('standard');
  const [progressVal, setProgressVal] = useState(72);
  const [showModal, setShowModal] = useState(false);

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
    tokens.spacing.scale.forEach((scale) => {
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
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Component Playground</h1>
          <p className="text-slate-500 text-sm">
            Visualize your design system applied realistically across Desktop and Mobile viewports.
          </p>
        </div>

        {/* Viewport Frame Select & Theme Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Device Selection */}
          <div className="flex border border-slate-200 bg-white rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Desktop View</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleColorMode}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 text-slate-700 shadow-sm"
          >
            {colorMode === 'light' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-500" />
                <span>Playground Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Playground Light</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div 
        ref={previewRef}
        className={`w-full transition-all duration-300 overflow-hidden flex justify-center p-8 border border-slate-200 rounded-2xl ${
          colorMode === 'dark' ? 'dark bg-slate-950' : 'bg-slate-100'
        }`}
      >
        
        {/* VIEW 1: FULL DESKTOP MOCKUP */}
        {deviceMode === 'desktop' && (
          <div 
            className="w-full border shadow-2xl transition-all duration-300 flex flex-col min-h-[700px] overflow-hidden relative"
            style={{
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-2xl)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {/* Mesh Gradient Ambient Glows (Highly responsive to Primary and Accent colors) */}
            <div className="absolute top-[-15%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[var(--color-primary)]/10 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[var(--color-accent)]/10 blur-[130px] pointer-events-none" />

            {/* Browser Header Bar */}
            <div className="px-4 py-3 bg-[var(--color-card)]/40 backdrop-blur-md border-b border-[var(--color-border)] flex items-center justify-between flex-shrink-0 z-10">
              <div className="flex gap-1.5 flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-[var(--color-bg)]/80 border border-[var(--color-border)] px-4 py-1 rounded-[var(--radius-sm)] text-[10px] text-[var(--color-text-muted)] font-mono max-w-sm w-full text-center truncate">
                app.dsys-hi-rdbl.com/playground
              </div>
              <div className="w-12" />
            </div>

            {/* Desktop App Layout */}
            <div className="flex flex-1 overflow-hidden h-full min-h-[600px] z-10">
              {/* Sidebar Navigation */}
              <aside className="w-52 bg-[var(--color-card)]/50 backdrop-blur-md border-r border-[var(--color-border)] p-4 flex flex-col justify-between hidden sm:flex">
                <div className="space-y-6">
                  {/* Brand */}
                  <div className="flex items-center gap-2">
                    <div className="w-6.5 h-6.5 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                      A
                    </div>
                    <span className="text-xs font-extrabold tracking-tight">Console SaaS</span>
                  </div>

                  {/* Nav Links */}
                  <div className="space-y-1 text-[11px] font-bold">
                    <button className="w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Console UI</span>
                    </button>
                    <button className="w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5" />
                      <span>System Settings</span>
                    </button>
                  </div>
                </div>

                <div className="p-2 border-t border-[var(--color-border)]">
                  <span className="text-[9px] text-[var(--color-text-muted)] font-mono">Tokens v1.2</span>
                </div>
              </aside>

              {/* Main Content Workspace */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[620px] relative">
                
                {/* Header navbar */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div>
                    <h3 className="text-sm font-extrabold">Playground Dashboard</h3>
                    <span className="text-[10px] text-[var(--color-text-muted)]">Audit and verify interactive components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Notify circular */}
                    <button className="p-1.5 border border-[var(--color-border)] rounded-full bg-[var(--color-card)]/40 hover:bg-[var(--color-card)]/80 relative">
                      <Bell className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </button>
                    <div className="w-7.5 h-7.5 rounded-full bg-[var(--color-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* WCAG Alert Banners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className="p-3 border flex items-start gap-2.5 bg-[var(--color-card)]/60 backdrop-blur-md shadow-[var(--shadow-sm)]"
                    style={{
                      borderColor: 'var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      borderLeft: '4px solid var(--color-success)',
                    }}
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-[11px] font-bold">Build Successful</h5>
                      <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">Vite compiled asset bundle in 415ms.</p>
                    </div>
                  </div>

                  <div 
                    className="p-3 border flex items-start gap-2.5 bg-[var(--color-card)]/60 backdrop-blur-md shadow-[var(--shadow-sm)]"
                    style={{
                      borderColor: 'var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      borderLeft: '4px solid var(--color-warning)',
                    }}
                  >
                    <AlertTriangle className="w-4.5 h-4.5 text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-[11px] font-bold">Contrast Warnings</h5>
                      <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">Large AA requires 3.0:1 contrast ratio.</p>
                    </div>
                  </div>
                </div>

                {/* Grid Section: Button Showroom & Form Inputs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Sizing Audited Button Showroom (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                      Buttons showroom (Audited Sizing & Offset)
                    </span>
                    
                    <div className="p-4 border border-[var(--color-border)] bg-[var(--color-card)]/40 backdrop-blur-md shadow-[var(--shadow-md)] rounded-[var(--radius-xl)] space-y-4">
                      
                      {/* Grid listing side-by-side to guarantee zero overflow */}
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-[var(--color-border)] text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                            <th className="pb-2">Variant type</th>
                            <th className="pb-2">Text only</th>
                            <th className="pb-2">With icon preview</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]/50">
                          {/* Row 1: Primary Solid */}
                          <tr>
                            <td className="py-2.5 font-bold">Primary Solid</td>
                            <td className="py-2.5">
                              <button
                                className="px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 hover:brightness-110"
                                style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
                              >
                                Solid Action
                              </button>
                            </td>
                            <td className="py-2.5">
                              <button
                                onClick={triggerButtonLoading}
                                className="px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 hover:brightness-110 flex items-center justify-center gap-1.5"
                                style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
                              >
                                {btnLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
                                <span>Deploy</span>
                              </button>
                            </td>
                          </tr>

                          {/* Row 2: Secondary Outlined */}
                          <tr>
                            <td className="py-2.5 font-bold">Secondary Outline</td>
                            <td className="py-2.5">
                              <button
                                className="px-3.5 py-1.5 text-[11px] font-bold border transition-all active:scale-95 hover:bg-[var(--color-card)]/80"
                                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', borderRadius: 'var(--radius-button)' }}
                              >
                                Outline Click
                              </button>
                            </td>
                            <td className="py-2.5">
                              <button
                                className="px-3.5 py-1.5 text-[11px] font-bold border transition-all active:scale-95 hover:bg-[var(--color-card)]/80 flex items-center justify-center gap-1.5"
                                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', borderRadius: 'var(--radius-button)' }}
                              >
                                <Settings className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                                <span>Settings</span>
                              </button>
                            </td>
                          </tr>

                          {/* Row 3: Soft Tonal */}
                          <tr>
                            <td className="py-2.5 font-bold">Soft Tonal</td>
                            <td className="py-2.5">
                              <button
                                className="px-3.5 py-1.5 text-[11px] font-bold transition-all active:scale-95 hover:opacity-95"
                                style={{ 
                                  backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))', 
                                  color: 'var(--color-primary)', 
                                  borderRadius: 'var(--radius-button)' 
                                }}
                              >
                                Tonal Style
                              </button>
                            </td>
                            <td className="py-2.5">
                              <button
                                className="px-3.5 py-1.5 text-[11px] font-bold transition-all active:scale-95 hover:opacity-95 flex items-center justify-center gap-1.5"
                                style={{ 
                                  backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))', 
                                  color: 'var(--color-primary)', 
                                  borderRadius: 'var(--radius-button)' 
                                }}
                              >
                                <Folder className="w-3.5 h-3.5" />
                                <span>Projects</span>
                              </button>
                            </td>
                          </tr>

                          {/* Row 4: Danger Action */}
                          <tr>
                            <td className="py-2.5 font-bold">Danger / Error</td>
                            <td className="py-2.5">
                              <button
                                className="px-3.5 py-1.5 text-[11px] font-bold text-white transition-all active:scale-95 hover:brightness-110"
                                style={{ backgroundColor: 'var(--color-error)', borderRadius: 'var(--radius-button)' }}
                              >
                                Terminate
                              </button>
                            </td>
                            <td className="py-2.5">
                              <button
                                className="px-3.5 py-1.5 text-[11px] font-bold text-white transition-all active:scale-95 hover:brightness-110 flex items-center justify-center gap-1.5"
                                style={{ backgroundColor: 'var(--color-error)', borderRadius: 'var(--radius-button)' }}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>

                          {/* Row 5: Link & Disabled */}
                          <tr>
                            <td className="py-2.5 font-bold">Link & Disabled</td>
                            <td className="py-2.5">
                              <button
                                className="text-[11px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
                              >
                                <span>View Docs</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </td>
                            <td className="py-2.5">
                              <button
                                disabled
                                className="px-3.5 py-1.5 text-[11px] font-bold border opacity-40 cursor-not-allowed flex items-center justify-center gap-1.5 bg-slate-900/10"
                                style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                              >
                                <Lock className="w-3.5 h-3.5" />
                                <span>Locked</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>

                  {/* Form & Selection controls (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                      Form & selection controls
                    </span>

                    <div className="p-4 border border-[var(--color-border)] bg-[var(--color-card)]/40 backdrop-blur-md shadow-[var(--shadow-md)] rounded-[var(--radius-xl)] space-y-4">
                      
                      {/* Text Input with left icon */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[var(--color-text-muted)]">Resource Search</label>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
                          <input
                            type="text"
                            value={textVal}
                            onChange={(e) => setTextVal(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 text-[11px] bg-transparent border outline-none transition-all focus:ring-1 focus:ring-[var(--color-primary)]"
                            style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                          />
                        </div>
                      </div>

                      {/* Password Input with eye icon */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[var(--color-text-muted)]">Access Token</label>
                        <div className="relative">
                          <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
                          <input
                            type={passwordShow ? 'text' : 'password'}
                            value="aura-security-key-2026"
                            readOnly
                            className="w-full pl-9 pr-9 py-1.5 text-[11px] bg-transparent border outline-none font-mono transition-all focus:ring-1 focus:ring-[var(--color-primary)]"
                            style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                          />
                          <button
                            onClick={() => setPasswordShow(!passwordShow)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                          >
                            {passwordShow ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Checkbox and Radio controls */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--color-border)]/50">
                        {/* Checkbox */}
                        <div 
                          className="flex items-center gap-2 cursor-pointer group"
                          onClick={() => setIsChecked(!isChecked)}
                        >
                          <div 
                            className="w-4 h-4 border flex items-center justify-center transition-all group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
                            style={{
                              borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                              backgroundColor: isChecked ? 'var(--color-primary)' : 'transparent',
                              borderRadius: 'var(--radius-xs)'
                            }}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                          <span className="text-[11px] font-semibold">Enable TLS 1.3</span>
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
                            <span className="text-[11px] font-semibold">Standard</span>
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
                            <span className="text-[11px] font-semibold">Express</span>
                          </div>
                        </div>
                      </div>

                      {/* Toggle Switch */}
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[var(--color-border)]/50">
                        <span>Cluster Auto-scaling</span>
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

                </div>

                {/* Project Data Grid & Progress Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Table (2 cols width) */}
                  <div 
                    className="md:col-span-2 border overflow-hidden bg-[var(--color-card)]/50 backdrop-blur-md shadow-[var(--shadow-sm)]"
                    style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}
                  >
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/40 text-[var(--color-text-muted)] font-bold">
                          <th className="p-3">Deployment Target</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
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
                              Active
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button 
                              onClick={() => setShowModal(true)}
                              className="text-[var(--color-primary)] hover:underline font-bold"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Progress & Skeletons (1 col width) */}
                  <div
                    className="p-4 border bg-[var(--color-card)]/50 backdrop-blur-md shadow-[var(--shadow-sm)] flex flex-col justify-between"
                    style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}
                  >
                    <div>
                      <div className="flex justify-between items-center text-[11px] mb-2.5">
                        <span className="font-extrabold font-mono">Disk Allocation</span>
                        <span>{progressVal}%</span>
                      </div>
                      <div 
                        className="w-full h-1.5 bg-slate-800/20 rounded-full overflow-hidden cursor-pointer"
                        onClick={() => setProgressVal(Math.round(Math.random() * 100))}
                      >
                        <div className="h-full" style={{ width: `${progressVal}%`, backgroundColor: 'var(--color-primary)' }} />
                      </div>
                    </div>

                    {/* Skeletons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border)] mt-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-border)] opacity-60 animate-pulse" />
                      <div className="space-y-1 flex-1">
                        <div className="h-2 w-1/3 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
                        <div className="h-1.5 w-1/2 bg-[var(--color-border)] opacity-60 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Mock Overlay Modal Dialog (Triggered by 'Manage' in table) */}
                {showModal && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 z-50">
                    <div 
                      className="max-w-xs w-full p-5 border bg-[var(--color-card)] backdrop-blur-lg shadow-2xl animate-fadeIn space-y-4"
                      style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-xl)' }}
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-[var(--color-text)]">Confirm Decommission</h4>
                          <p className="text-[10px] text-[var(--color-text-muted)] mt-1 leading-normal">
                            Are you sure you want to stop container <code>dsys-hi-rdbl</code>? This cannot be undone.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-3 py-1.5 text-[10px] font-bold border"
                          style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-3 py-1.5 text-[10px] font-bold text-white shadow-sm hover:brightness-110"
                          style={{
                            backgroundColor: 'var(--color-error)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          Decommission
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FULL MOBILE MOCKUP */}
        {deviceMode === 'mobile' && (
          <div 
            className="w-[320px] aspect-[9/18] border-8 border-slate-800 shadow-2xl transition-all duration-300 flex flex-col overflow-hidden relative"
            style={{
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              borderRadius: '36px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {/* Floating ambient glow mesh blobs */}
            <div className="absolute top-10 left-[-20px] w-48 h-48 rounded-full bg-[var(--color-primary)]/10 blur-[60px] pointer-events-none" />
            <div className="absolute bottom-20 right-[-20px] w-48 h-48 rounded-full bg-[var(--color-accent)]/10 blur-[60px] pointer-events-none" />

            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-4 w-28 bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Mobile Status Bar */}
            <div className="px-5 pt-5 pb-2 text-[10px] text-[var(--color-text-muted)] flex items-center justify-between select-none z-10">
              <span className="font-extrabold">9:41</span>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Mobile Top App Bar */}
            <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-card)]/30 backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[var(--color-primary)] flex items-center justify-center text-white text-[9px] font-extrabold">A</div>
                <span className="text-xs font-extrabold">Mobile Console</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-[var(--color-text)]" />
              </div>
            </div>

            {/* Mobile Scrollable Screen Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[460px] z-10 relative">
              
              {/* Button Action Matrix Card */}
              <div className="p-3 border bg-[var(--color-card)]/50 backdrop-blur-md shadow-[var(--shadow-sm)] space-y-2.5" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Quick Actions</span>
                <div className="flex gap-2">
                  <button
                    onClick={triggerButtonLoading}
                    className="flex-1 py-1.5 text-[9px] font-bold text-white shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:brightness-110"
                    style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
                  >
                    {btnLoading ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Play className="w-2.5 h-2.5" />}
                    <span>Primary</span>
                  </button>
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold border flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-[var(--color-card)]/80"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', borderRadius: 'var(--radius-button)' }}
                  >
                    <Settings className="w-2.5 h-2.5" />
                    <span>Outlined</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all hover:opacity-95"
                    style={{
                      backgroundColor: 'var(--color-primary-12, rgba(99,102,241,0.12))',
                      color: 'var(--color-primary)',
                      borderRadius: 'var(--radius-button)',
                    }}
                  >
                    <span>Soft Tonal</span>
                  </button>
                  <button
                    className="flex-1 py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all hover:brightness-110"
                    style={{ backgroundColor: 'var(--color-error)', color: 'white', borderRadius: 'var(--radius-button)' }}
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>Danger</span>
                  </button>
                </div>
              </div>

              {/* Form & Selection controls */}
              <div className="p-3 border bg-[var(--color-card)]/50 backdrop-blur-md shadow-[var(--shadow-sm)] space-y-3" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Configuration</span>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold">App Name</label>
                  <input
                    type="text"
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    className="px-2.5 py-1.5 text-[10px] bg-transparent border outline-none transition-all focus:ring-1 focus:ring-[var(--color-primary)]"
                    style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}
                  />
                </div>

                {/* Checkbox and Radio controls */}
                <div className="space-y-2 pt-2 border-t border-[var(--color-border)]/50">
                  <div 
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setIsChecked(!isChecked)}
                  >
                    <div 
                      className="w-4 h-4 border flex items-center justify-center transition-all flex-shrink-0 group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
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
                className="p-4 border bg-[var(--color-card)]/50 backdrop-blur-md shadow-[var(--shadow-sm)]"
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
            <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-md flex items-center justify-between select-none z-10">
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
