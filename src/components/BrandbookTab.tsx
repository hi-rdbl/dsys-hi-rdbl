import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { getContrastRatio, evaluateContrast } from '../utils/contrast';
import { 
  BookOpen, 
  Palette, 
  Type, 
  Grid, 
  Minimize2, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Copy,
  ChevronRight,
  Layers
} from 'lucide-react';

export const BrandbookTab: React.FC = () => {
  const { tokens, colorMode, toggleColorMode } = useDesignSystem();
  const [activeSection, setActiveSection] = useState<'overview' | 'colors' | 'typography' | 'spacing' | 'corners' | 'motion' | 'elements' | 'm3-mapping'>('overview');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const baseUnit = tokens.spacing.baseUnit;
  const { fontFamily, baseSize, scaleFactor, lineHeight, letterSpacing } = tokens.typography;

  const fontSizes = {
    display: Math.round(baseSize * Math.pow(scaleFactor, 4) * 10) / 10,
    h1: Math.round(baseSize * Math.pow(scaleFactor, 3) * 10) / 10,
    h2: Math.round(baseSize * Math.pow(scaleFactor, 2) * 10) / 10,
    h3: Math.round(baseSize * Math.pow(scaleFactor, 1) * 10) / 10,
    body: baseSize,
    small: Math.round((baseSize / scaleFactor) * 10) / 10,
  };

  const handleCopyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const sections = [
    { id: 'overview', name: '01. System Overview', icon: BookOpen },
    { id: 'colors', name: '02. Colors & Contrast', icon: Palette },
    { id: 'typography', name: '03. Typography Scale', icon: Type },
    { id: 'spacing', name: '04. Spatial Grid', icon: Grid },
    { id: 'corners', name: '05. Depth & Corners', icon: Minimize2 },
    { id: 'motion', name: '06. Motion Curves', icon: Zap },
    { id: 'elements', name: '07. Active Elements', icon: Sparkles },
    { id: 'm3-mapping', name: '08. Material 3 Mapping', icon: Layers },
  ] as const;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 pb-16 bg-slate-950 p-6 md:p-10 rounded-[24px] border border-slate-800 shadow-2xl">
      
      {/* Brandbook Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
              Verified Brandbook
            </span>
            <span className="text-[10px] text-slate-500 font-mono">ID: {tokens.name.toLowerCase().replace(/ /g, '-')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">{tokens.name} Brand Guidelines</h1>
          <p className="text-slate-400 text-sm mt-1">
            Standard source-of-truth manual containing mathematical design variables and component anatomy rules.
          </p>
        </div>

        {/* Global theme toggle inside guidebook view */}
        <button
          onClick={toggleColorMode}
          className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-xl text-xs font-bold text-slate-300 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Active Viewport:</span>
          <span className="text-white capitalize font-extrabold">{colorMode} Mode</span>
        </button>
      </div>

      {/* Brandbook Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Table of Contents navigation (3 cols) */}
        <aside className="lg:col-span-3 sticky top-6 space-y-2">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-4 px-2">
              Sections Index
            </span>
            <nav className="space-y-1">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      document.getElementById(`brandbook-sec-${sec.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white border border-slate-800'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span>{sec.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Col: Spacious visual guidelines (9 cols) */}
        <div className="lg:col-span-9 space-y-10">
          
          {/* Section 1: Overview */}
          <section id="brandbook-sec-overview" className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              01. System Overview
            </h3>
            
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Metadata Details</h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">System Name</span>
                      <span className="font-bold text-white">{tokens.name}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Author Name</span>
                      <span className="font-bold text-white">{tokens.author}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Active Version</span>
                      <span className="font-bold font-mono text-white">{tokens.version}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Integration Directives</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This Brandbook contains computed style tokens. These tokens represent variables driving the CSS Variables and Tailwind classes in our production apps. Any changes to typography base size or color palettes dynamically compile and propagate down to all interface components.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 text-[10px] text-slate-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>W3C Tokens Compliant</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 text-[10px] text-slate-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WCAG Accessibility Audited</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Colors & Contrast */}
          <section id="brandbook-sec-colors" className="space-y-4 scroll-mt-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4" />
              02. Colors & Contrast
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(tokens.colors).map(([key, token]) => {
                const colorKey = key as keyof typeof tokens.colors;
                const lightVal = token.light;
                const darkVal = token.dark;
                
                // Contrast calculation
                const currentBg = tokens.colors.bg ? tokens.colors.bg[colorMode] : '#ffffff';
                const activeVal = tokens.colors[colorKey] ? tokens.colors[colorKey][colorMode] : '#000000';
                let contrastAgainst = currentBg;
                let contrastLabel = `vs Background (${colorMode})`;
                
                if (colorKey === 'bg' || colorKey === 'card' || colorKey === 'border') {
                  contrastAgainst = tokens.colors.text ? tokens.colors.text[colorMode] : '#000000';
                  contrastLabel = `vs Text (${colorMode})`;
                } else if (colorKey === 'text' || colorKey === 'textMuted') {
                  contrastAgainst = currentBg;
                  contrastLabel = `vs Background (${colorMode})`;
                } else {
                  contrastAgainst = '#ffffff';
                  contrastLabel = 'vs White Text';
                }

                const ratio = getContrastRatio(activeVal, contrastAgainst);
                const contrastEval = evaluateContrast(ratio);

                return (
                  <div key={key} className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Visual Swatch Row */}
                      <div className="flex gap-2">
                        <div className="flex-1 flex flex-col gap-1 text-center">
                          <div className="h-10 rounded-lg border border-black/10 shadow-inner" style={{ backgroundColor: lightVal }} />
                          <span className="text-[9px] text-slate-500 font-mono uppercase">Light: {lightVal}</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1 text-center">
                          <div className="h-10 rounded-lg border border-white/5 shadow-inner" style={{ backgroundColor: darkVal }} />
                          <span className="text-[9px] text-slate-500 font-mono uppercase">Dark: {darkVal}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                          <button
                            onClick={() => handleCopyCode(`var(--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()})`, key)}
                            className="text-[10px] text-slate-500 hover:text-white flex items-center gap-1 transition-colors"
                          >
                            {copiedToken === key ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Token</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">{token.description}</p>
                      </div>
                    </div>

                    {/* WCAG Compliance footer */}
                    <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                      <div className="text-slate-400">
                        <span className="text-slate-500 block text-[9px]">{contrastLabel}</span>
                        <strong className="font-bold font-mono text-slate-300">{ratio}:1 Ratio</strong>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${contrastEval.aaNormal ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'bg-rose-500/10 text-rose-400 border border-rose-500/10'}`}>
                          Body AA: {contrastEval.aaNormal ? 'Pass' : 'Fail'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${contrastEval.aaaNormal ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10' : 'bg-slate-800 text-slate-500 border border-slate-800'}`}>
                          Text AAA: {contrastEval.aaaNormal ? 'Pass' : 'Fail'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Typography Scale */}
          <section id="brandbook-sec-typography" className="space-y-4 scroll-mt-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Type className="w-4 h-4" />
              03. Typography Scale
            </h3>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-slate-800/60 pb-6 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Font Stack</span>
                  <span className="font-bold text-white truncate block mt-0.5">{fontFamily}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Base Size</span>
                  <span className="font-bold text-white block mt-0.5">{baseSize}px</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Scale Factor</span>
                  <span className="font-bold text-white block mt-0.5">{scaleFactor}x</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Line Height</span>
                  <span className="font-bold text-white block mt-0.5">{lineHeight}</span>
                </div>
              </div>

              {/* Rendering Typography Scale visual sample */}
              <div className="space-y-6">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Typographical Hierarchy Previews
                </span>
                
                <div className="space-y-5">
                  {Object.entries(fontSizes).map(([sizeKey, pxVal]) => {
                    return (
                      <div key={sizeKey} className="flex flex-col md:flex-row md:items-baseline border-b border-slate-800/40 pb-4 gap-2">
                        <div className="w-32 flex-shrink-0 text-left font-mono">
                          <span className="text-xs font-bold text-white capitalize block">{sizeKey}</span>
                          <span className="text-[10px] text-indigo-400 block mt-0.5">{pxVal}px</span>
                        </div>
                        <div 
                          className="flex-1 truncate"
                          style={{ 
                            fontFamily: fontFamily.replace(/'/g, ''), 
                            fontSize: `${pxVal}px`,
                            lineHeight: lineHeight,
                            letterSpacing: letterSpacing
                          }}
                        >
                          The quick brown fox jumps over the lazy dog.
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Spatial Grid */}
          <section id="brandbook-sec-spacing" className="space-y-4 scroll-mt-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Grid className="w-4 h-4" />
              04. Spatial Grid & Spacing
            </h3>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Spacing base grid unit</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">Derived multipliers array generating all layout spacers variables.</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Base Unit</span>
                  <span className="text-xl font-extrabold text-indigo-400 font-mono">{baseUnit}px</span>
                </div>
              </div>

              {/* Spacer bar chart */}
              <div className="space-y-4">
                {tokens.spacing.scale.map((multiplier) => {
                  const pxVal = baseUnit * multiplier;
                  return (
                    <div key={multiplier} className="flex items-center gap-4 text-xs font-mono">
                      <span className="w-20 text-slate-500 text-right">spacing-{multiplier}</span>
                      <span className="w-12 text-indigo-400 font-bold text-right">{pxVal}px</span>
                      <div className="flex-1 h-4.5 bg-slate-950/60 border border-slate-900 rounded-md flex items-center">
                        <div 
                          className="h-full bg-indigo-500/80 hover:bg-indigo-500 transition-colors rounded-md"
                          style={{ width: `${pxVal * 3}px`, maxWidth: '100%' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 5: Depth & Corners */}
          <section id="brandbook-sec-corners" className="space-y-4 scroll-mt-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Minimize2 className="w-4 h-4" />
              05. Depth, Corners & Radius
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Corner Radius preview */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Border Radius Curvature
                </span>
                
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(tokens.radius).map(([key, val]) => {
                    return (
                      <div key={key} className="bg-slate-950/40 border border-slate-800/80 p-3 flex flex-col items-center justify-center text-center rounded-xl" style={{ borderRadius: val }}>
                        <span className="text-[11px] font-bold text-slate-300 capitalize">{key}</span>
                        <span className="text-[9px] text-slate-500 font-mono mt-0.5">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shadow Elevation preview */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Shadow Elevation Depth
                </span>

                <div className="space-y-3">
                  {Object.entries(tokens.shadows).map(([key, val]) => {
                    return (
                      <div 
                        key={key} 
                        className="p-3 bg-slate-900 border border-slate-800/60 rounded-xl flex items-center justify-between text-xs transition-shadow"
                        style={{ boxShadow: val }}
                      >
                        <span className="font-bold text-slate-300 capitalize">Elevation: {key}</span>
                        <span className="text-[9px] text-slate-500 font-mono truncate max-w-[120px]">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Motion Curves */}
          <section id="brandbook-sec-motion" className="space-y-4 scroll-mt-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              06. Motion & Easing Curves
            </h3>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Duration Constants</h4>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span>Fast Interaction</span>
                      <span className="font-bold text-indigo-400">{tokens.motion.durationFast}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span>Normal Entry</span>
                      <span className="font-bold text-indigo-400">{tokens.motion.durationNormal}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span>Heavy Layout</span>
                      <span className="font-bold text-indigo-400">{tokens.motion.durationSlow}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Easing Bezier Curves</h4>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span>Default</span>
                      <span className="text-slate-400 text-[10px] truncate max-w-[130px]">{tokens.motion.easeDefault}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span>Ease In</span>
                      <span className="text-slate-400 text-[10px] truncate max-w-[130px]">{tokens.motion.easeIn}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span>Ease Out</span>
                      <span className="text-slate-400 text-[10px] truncate max-w-[130px]">{tokens.motion.easeOut}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Running Bubble ease animation simulator */}
              <div className="space-y-3 pt-4 border-t border-slate-800/40">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Motion Simulator Loop
                </span>
                
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-16 text-slate-400 font-mono">Simulator:</div>
                    <div className="flex-1 h-6 bg-slate-900 border border-slate-800 rounded-full relative overflow-hidden flex items-center px-1">
                      <div 
                        className="w-4 h-4 rounded-full bg-indigo-500 absolute animate-motionLoop"
                        style={{
                          animationDuration: tokens.motion.durationNormal,
                          animationTimingFunction: tokens.motion.easeDefault
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Active Elements */}
          <section id="brandbook-sec-elements" className="space-y-4 scroll-mt-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              07. Active Elements & Components
            </h3>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Button variations styled reactively */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Button Standards</h4>
                  <div className="flex flex-wrap gap-2.5">
                    <button 
                      className="px-4 py-2 text-xs font-bold text-white transition-all active:scale-95"
                      style={{ 
                        backgroundColor: tokens.colors.primary[colorMode], 
                        borderRadius: tokens.radius.button,
                        boxShadow: tokens.shadows.md
                      }}
                    >
                      Primary Solid
                    </button>
                    
                    <button 
                      className="px-4 py-2 text-xs font-bold border transition-all active:scale-95 bg-transparent"
                      style={{ 
                        borderColor: tokens.colors.border[colorMode], 
                        color: tokens.colors.text[colorMode],
                        borderRadius: tokens.radius.button 
                      }}
                    >
                      Outline button
                    </button>
                  </div>
                </div>

                {/* Form fields styled reactively */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Anatomy of Form Input</h4>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Username</label>
                    <input 
                      type="text" 
                      value="hilmi.rodibillah" 
                      readOnly
                      className="w-full bg-slate-900 border px-3 py-1.5 text-xs text-slate-200 outline-none"
                      style={{ 
                        borderColor: tokens.colors.border[colorMode], 
                        borderRadius: tokens.radius.md 
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 8: Material 3 Mapping */}
          <section id="brandbook-sec-m3-mapping" className="space-y-4 scroll-mt-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              08. Material Design 3 (M3) Token Mapping
            </h3>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase tracking-wider border border-indigo-500/20">
                  Google I/O 2026: Make Material Your Own
                </span>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  This mapping matrix illustrates how to map standard Android / Web Material 3 system tokens to your bespoke Aura Design System variables. Use this table as a developer configuration sheet to skin standard M3 components.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                      <th className="py-2.5 pr-4">M3 System Token</th>
                      <th className="py-2.5 px-4">Aura Variable</th>
                      <th className="py-2.5 px-4">Active Value ({colorMode})</th>
                      <th className="py-2.5 pl-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300">
                    {/* Colors */}
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.color.primary</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--color-primary)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.primary[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.primary[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Primary action accent fill.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.color.secondary</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--color-secondary)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.secondary[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.secondary[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Secondary tonal action color.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.color.background</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--color-bg)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.bg[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.bg[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Underlying canvas background.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.color.surface-container</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--color-card)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.card[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.card[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Elevated cards & sheets.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.color.outline</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--color-border)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.border[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.border[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Borders, outlines, and dividers.</td>
                    </tr>

                    {/* Shapes */}
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.shape.corner.small</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--radius-sm)</td>
                      <td className="py-2.5 px-4 font-mono text-slate-300 text-[11px]">{tokens.radius.sm}</td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Badges, tooltips, checkboxes.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.shape.corner.medium</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--radius-md)</td>
                      <td className="py-2.5 px-4 font-mono text-slate-300 text-[11px]">{tokens.radius.md}</td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Inputs, button elements, cards.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.shape.corner.large</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--radius-lg)</td>
                      <td className="py-2.5 px-4 font-mono text-slate-300 text-[11px]">{tokens.radius.lg}</td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Modals, sheets, dialog containers.</td>
                    </tr>

                    {/* Motion */}
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.motion.duration.short</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--motion-duration-fast)</td>
                      <td className="py-2.5 px-4 font-mono text-slate-300 text-[11px]">{tokens.motion.durationFast}</td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Fast toggles and click scales.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-indigo-400 text-[10px]">md.sys.motion.easing.emphasized</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">var(--motion-ease-default)</td>
                      <td className="py-2.5 px-4 font-mono text-slate-300 text-[10px] max-w-[120px] truncate" title={tokens.motion.easeDefault}>{tokens.motion.easeDefault}</td>
                      <td className="py-2.5 pl-4 text-slate-400 text-[11px]">Default layout ease timing curve.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
};
