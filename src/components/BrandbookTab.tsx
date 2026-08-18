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

  // Visual card wrapper style
  const cardStyle = {
    backgroundColor: tokens.colors.card[colorMode],
    borderColor: tokens.colors.border[colorMode],
  };

  // Border style
  const borderStyle = {
    borderColor: tokens.colors.border[colorMode],
  };

  return (
    <div 
      className="space-y-8 animate-fadeIn p-6 md:p-10 rounded-[20px] border transition-colors duration-300 shadow-sm ds-preview-area"
      style={{
        backgroundColor: tokens.colors.bg[colorMode],
        color: tokens.colors.text[colorMode],
        borderColor: tokens.colors.border[colorMode]
      }}
    >
      
      {/* Brandbook Title Header */}
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4"
        style={borderStyle}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span 
              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
              style={{
                backgroundColor: `${tokens.colors.success[colorMode]}15`,
                color: tokens.colors.success[colorMode],
                borderColor: `${tokens.colors.success[colorMode]}30`,
              }}
            >
              Verified Guidelines
            </span>
            <span 
              className="text-[10px] font-mono"
              style={{ color: tokens.colors.textMuted[colorMode] }}
            >
              ID: {tokens.name.toLowerCase().replace(/ /g, '-')}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{tokens.name} Brand Guidelines</h1>
          <p 
            className="text-sm mt-1"
            style={{ color: tokens.colors.textMuted[colorMode] }}
          >
            Mathematical system guidelines and component anatomy rules.
          </p>
        </div>

        {/* Global theme toggle inside guidebook view */}
        <button
          onClick={toggleColorMode}
          className="px-4 py-2 border rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-2"
          style={{
            backgroundColor: tokens.colors.card[colorMode],
            borderColor: tokens.colors.border[colorMode],
            color: tokens.colors.text[colorMode]
          }}
        >
          <span style={{ color: tokens.colors.textMuted[colorMode] }}>Active Viewport:</span>
          <span className="capitalize font-extrabold">{colorMode} Mode</span>
        </button>
      </div>

      {/* Brandbook Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Table of Contents navigation (3 cols) */}
        <aside className="lg:col-span-3 sticky top-6 space-y-2">
          <div 
            className="p-4 rounded-xl border"
            style={cardStyle}
          >
            <span 
              className="text-[10px] font-extrabold uppercase tracking-widest block mb-4 px-2"
              style={{ color: tokens.colors.textMuted[colorMode] }}
            >
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
                    className="w-full px-3 py-2.5 rounded-lg text-left text-xs font-bold flex items-center justify-between transition-all border border-transparent"
                    style={{
                      backgroundColor: isActive ? tokens.colors.bg[colorMode] : 'transparent',
                      color: isActive ? tokens.colors.text[colorMode] : tokens.colors.textMuted[colorMode],
                      borderColor: isActive ? tokens.colors.border[colorMode] : 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" style={{ color: isActive ? tokens.colors.primary[colorMode] : tokens.colors.textMuted[colorMode] }} />
                      <span>{sec.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" style={{ color: tokens.colors.primary[colorMode] }} />}
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
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <BookOpen className="w-4 h-4" />
              01. System Overview
            </h3>
            
            <div 
              className="p-6 rounded-xl border space-y-6"
              style={cardStyle}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    Metadata Details
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1.5 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>System Name</span>
                      <span className="font-bold">{tokens.name}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Author Name</span>
                      <span className="font-bold">{tokens.author}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Active Version</span>
                      <span className="font-bold font-mono">{tokens.version}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    Integration Directives
                  </h4>
                  <p 
                    className="text-xs leading-relaxed"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    This Brandbook contains computed style tokens. These tokens represent variables driving the CSS Variables and Tailwind classes in our production apps. Any changes to typography base size or color palettes dynamically compile and propagate down to all interface components.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-4 border-t" style={borderStyle}>
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-medium"
                  style={{
                    backgroundColor: tokens.colors.bg[colorMode],
                    borderColor: tokens.colors.border[colorMode],
                    color: tokens.colors.textMuted[colorMode]
                  }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: tokens.colors.success[colorMode] }} />
                  <span>W3C Tokens Compliant</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Colors */}
          <section id="brandbook-sec-colors" className="space-y-4">
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <Palette className="w-4 h-4" />
              02. Colors & Contrast
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(tokens.colors).map((colorKey) => {
                const currentBg = tokens.colors.bg ? tokens.colors.bg[colorMode] : '#ffffff';
                const activeVal = tokens.colors[colorKey] ? tokens.colors[colorKey][colorMode] : '#000000';
                
                let contrastLabel = `vs Background (${colorMode})`;
                let contrastAgainst = currentBg;
                if (colorKey === 'bg') {
                  contrastAgainst = tokens.colors.text ? tokens.colors.text[colorMode] : '#000000';
                  contrastLabel = `vs Text (${colorMode})`;
                } else if (colorKey === 'card') {
                  contrastAgainst = tokens.colors.text ? tokens.colors.text[colorMode] : '#000000';
                  contrastLabel = `vs Text (${colorMode})`;
                } else {
                  contrastLabel = `vs Background (${colorMode})`;
                }

                const ratio = getContrastRatio(activeVal, contrastAgainst);
                const rating = evaluateContrast(ratio);

                return (
                  <div 
                    key={colorKey} 
                    className="p-5 rounded-xl border flex flex-col justify-between"
                    style={cardStyle}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">Token Key</span>
                          <h4 className="text-xs font-bold capitalize mt-0.5">{colorKey}</h4>
                        </div>
                        <button
                          onClick={() => handleCopyCode(`var(--color-${colorKey})`, colorKey)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-slate-400"
                        >
                          {copiedToken === colorKey ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Swatch */}
                      <div 
                        className="h-16 w-full rounded-lg border flex items-end p-2.5 mb-3"
                        style={{ 
                          backgroundColor: activeVal,
                          borderColor: tokens.colors.border[colorMode]
                        }}
                      >
                        <span 
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-white"
                        >
                          {activeVal.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* WCAG Contrast check */}
                    <div 
                      className="p-2.5 rounded-lg border text-[10px] space-y-1.5"
                      style={{
                        backgroundColor: tokens.colors.bg[colorMode],
                        borderColor: tokens.colors.border[colorMode]
                      }}
                    >
                      <div className="flex justify-between">
                        <span style={{ color: tokens.colors.textMuted[colorMode] }}>{contrastLabel}</span>
                        <span className="font-bold">{ratio}:1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{ color: tokens.colors.textMuted[colorMode] }}>WCAG Rating</span>
                        <span 
                          className="font-bold uppercase px-1.5 py-0.25 rounded text-[8px] border"
                          style={{
                            color: !rating.aaNormal ? tokens.colors.error[colorMode] : tokens.colors.success[colorMode],
                            backgroundColor: !rating.aaNormal ? `${tokens.colors.error[colorMode]}10` : `${tokens.colors.success[colorMode]}10`,
                            borderColor: !rating.aaNormal ? `${tokens.colors.error[colorMode]}30` : `${tokens.colors.success[colorMode]}30`,
                          }}
                        >
                          {rating.aaNormal ? 'AA PASS' : 'AA FAIL'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Typography */}
          <section id="brandbook-sec-typography" className="space-y-4">
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <Type className="w-4 h-4" />
              03. Typography Scale
            </h3>
            
            <div 
              className="p-6 rounded-xl border space-y-6"
              style={cardStyle}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <span 
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    Typography Parameters
                  </span>
                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Font Family</span>
                      <span className="font-bold">{fontFamily}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Base Size</span>
                      <span className="font-bold">{baseSize}px</span>
                    </div>
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Scale Factor</span>
                      <span className="font-bold">{scaleFactor}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Line Height</span>
                      <span className="font-bold">{lineHeight}</span>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg border text-xs"
                  style={{
                    backgroundColor: tokens.colors.bg[colorMode],
                    borderColor: tokens.colors.border[colorMode],
                    color: tokens.colors.textMuted[colorMode]
                  }}
                >
                  <span className="font-bold block mb-1">Scale Type:</span>
                  <p className="leading-relaxed">
                    A mathematical type-scale established using a multiplier of {scaleFactor} from the base font size ({baseSize}px). All sizes align perfectly to fluid typography calculations.
                  </p>
                </div>
              </div>

              {/* Visual Scale representation */}
              <div className="space-y-4 pt-4 border-t" style={borderStyle}>
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: tokens.colors.textMuted[colorMode] }}
                >
                  Visual Scale Feed
                </span>
                
                <div className="space-y-6">
                  {Object.entries(fontSizes).map(([name, size]) => (
                    <div key={name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                        <span className="uppercase font-bold">{name}</span>
                        <span>{size}px • {Math.round((size / baseSize) * 100) / 100}rem</span>
                      </div>
                      <p 
                        className="truncate"
                        style={{ 
                          fontFamily: fontFamily.replace(/'/g, ''),
                          fontSize: `${size}px`,
                          lineHeight: lineHeight,
                          letterSpacing: letterSpacing
                        }}
                      >
                        The quick brown fox jumps over the lazy dog.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Spacing */}
          <section id="brandbook-sec-spacing" className="space-y-4">
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <Grid className="w-4 h-4" />
              04. Spatial Grid
            </h3>
            
            <div 
              className="p-6 rounded-xl border space-y-6"
              style={cardStyle}
            >
              <div className="text-xs">
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                  style={{ color: tokens.colors.textMuted[colorMode] }}
                >
                  Grid Unit Base
                </span>
                <p 
                  className="text-xs"
                  style={{ color: tokens.colors.textMuted[colorMode] }}
                >
                  Built on a base unit of **{baseUnit}px**. Layout margins, gaps, paddings, and heights align cleanly to this mathematical ratio.
                </p>
              </div>

              {/* Spacing visualiser */}
              <div className="space-y-3 pt-4 border-t" style={borderStyle}>
                {tokens.spacing.scale.map((multiplier) => {
                  const sizePx = multiplier * baseUnit;
                  return (
                    <div key={multiplier} className="flex items-center gap-4 text-xs">
                      <span className="w-16 font-mono text-[10px] text-slate-500">
                        scale-{multiplier} ({sizePx}px)
                      </span>
                      <div className="flex-1 h-5 bg-slate-100 dark:bg-slate-900 rounded overflow-hidden relative border border-slate-200 dark:border-slate-800">
                        <div 
                          className="h-full"
                          style={{ 
                            width: `${sizePx}px`, 
                            backgroundColor: tokens.colors.primary[colorMode],
                            opacity: 0.85
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 5: Corners & Depth */}
          <section id="brandbook-sec-corners" className="space-y-4">
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <Minimize2 className="w-4 h-4" />
              05. Depth & Corners
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Corner Radii */}
              <div 
                className="p-6 rounded-xl border space-y-4"
                style={cardStyle}
              >
                <h4 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: tokens.colors.textMuted[colorMode] }}
                >
                  Corner Radius Options
                </h4>
                
                <div className="space-y-3">
                  {Object.entries(tokens.radius).filter(([key]) => key !== 'button').map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-500">radius-{key}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[10px] text-slate-500">{val}</span>
                        <div 
                          className="w-8 h-8 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                          style={{ borderRadius: val.includes('var') ? '10px' : val }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadow depths */}
              <div 
                className="p-6 rounded-xl border space-y-4"
                style={cardStyle}
              >
                <h4 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: tokens.colors.textMuted[colorMode] }}
                >
                  Shadow Elevations
                </h4>

                <div className="space-y-3 text-xs">
                  {Object.entries(tokens.shadows).map(([key, val]) => (
                    <div 
                      key={key} 
                      className="p-3 border rounded-lg flex justify-between items-center bg-slate-50 dark:bg-slate-950/20"
                      style={{
                        borderColor: tokens.colors.border[colorMode],
                        boxShadow: val
                      }}
                    >
                      <span className="font-mono font-bold uppercase text-[9px] text-slate-500">elevation-{key}</span>
                      <span className="text-[9px] font-mono text-slate-500 max-w-[120px] truncate" title={val}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Motion */}
          <section id="brandbook-sec-motion" className="space-y-4">
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <Zap className="w-4 h-4" />
              06. Motion Curves
            </h3>
            
            <div 
              className="p-6 rounded-xl border space-y-6"
              style={cardStyle}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <h4 
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    Duration Tokens
                  </h4>
                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Fast</span>
                      <span className="font-bold">{tokens.motion.durationFast}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Normal</span>
                      <span className="font-bold">{tokens.motion.durationNormal}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Slow</span>
                      <span className="font-bold">{tokens.motion.durationSlow}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    Easing Transitions
                  </h4>
                  <div className="space-y-2 font-mono text-[10px]">
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Default</span>
                      <span className="font-bold truncate max-w-[120px]">{tokens.motion.easeDefault}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Ease In</span>
                      <span className="font-bold truncate max-w-[120px]">{tokens.motion.easeIn}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b" style={borderStyle}>
                      <span style={{ color: tokens.colors.textMuted[colorMode] }}>Ease Out</span>
                      <span className="font-bold truncate max-w-[120px]">{tokens.motion.easeOut}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Elements */}
          <section id="brandbook-sec-elements" className="space-y-4">
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <Sparkles className="w-4 h-4" />
              07. Active Elements
            </h3>
            
            <div 
              className="p-6 rounded-xl border space-y-6"
              style={cardStyle}
            >
              <p 
                className="text-xs"
                style={{ color: tokens.colors.textMuted[colorMode] }}
              >
                Computed button and form elements compiled from active variables. Standard components render identically when compiled to Tailwind or raw CSS variables.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Buttons styled reactively */}
                <div className="space-y-4">
                  <h4 
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    Anatomy of Button Actions
                  </h4>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      className="px-4 py-2.5 text-xs font-bold text-white transition-all select-none"
                      style={{ 
                        backgroundColor: tokens.colors.primary[colorMode], 
                        borderRadius: tokens.radius.button.includes('var(') ? '10px' : tokens.radius.button,
                        boxShadow: tokens.shadows.sm
                      }}
                    >
                      Primary Button Action
                    </button>
                    
                    <button 
                      className="px-4 py-2.5 text-xs font-bold border transition-all select-none bg-transparent"
                      style={{ 
                        borderColor: tokens.colors.border[colorMode], 
                        borderRadius: tokens.radius.button.includes('var(') ? '10px' : tokens.radius.button,
                        color: tokens.colors.text[colorMode],
                      }}
                    >
                      Outline Secondary Action
                    </button>
                  </div>
                </div>

                {/* Form fields styled reactively */}
                <div className="space-y-3">
                  <h4 
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: tokens.colors.textMuted[colorMode] }}
                  >
                    Anatomy of Form Input
                  </h4>
                  <div className="space-y-1">
                    <label 
                      className="text-[10px] font-bold"
                      style={{ color: tokens.colors.textMuted[colorMode] }}
                    >
                      Username
                    </label>
                    <input 
                      type="text" 
                      value="hilmi.rodibillah" 
                      readOnly
                      className="w-full border px-3 py-1.5 text-xs outline-none bg-transparent"
                      style={{ 
                        borderColor: tokens.colors.border[colorMode], 
                        borderRadius: tokens.radius.md,
                        color: tokens.colors.text[colorMode]
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 8: Material 3 Mapping */}
          <section id="brandbook-sec-m3-mapping" className="space-y-4 scroll-mt-6">
            <h3 
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"
              style={{ color: tokens.colors.primary[colorMode] }}
            >
              <Layers className="w-4 h-4" />
              08. Material Design 3 (M3) Token Mapping
            </h3>

            <div 
              className="p-6 rounded-xl border space-y-4"
              style={cardStyle}
            >
              <div>
                <span 
                  className="px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: `${tokens.colors.primary[colorMode]}15`,
                    color: tokens.colors.primary[colorMode],
                    borderColor: `${tokens.colors.primary[colorMode]}30`,
                  }}
                >
                  Google I/O: Make Material Your Own
                </span>
                <p 
                  className="text-xs leading-relaxed mt-2"
                  style={{ color: tokens.colors.textMuted[colorMode] }}
                >
                  This mapping matrix illustrates how to map standard Android / Web Material 3 system tokens to your bespoke Aura Design System variables. Use this table as a developer configuration sheet to skin standard M3 components.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b text-[10px] uppercase font-bold tracking-wider" style={borderStyle}>
                      <th className="py-2.5 pr-4" style={{ color: tokens.colors.textMuted[colorMode] }}>M3 System Token</th>
                      <th className="py-2.5 px-4" style={{ color: tokens.colors.textMuted[colorMode] }}>Aura Variable</th>
                      <th className="py-2.5 px-4" style={{ color: tokens.colors.textMuted[colorMode] }}>Active Value ({colorMode})</th>
                      <th className="py-2.5 pl-4" style={{ color: tokens.colors.textMuted[colorMode] }}>Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-300" style={borderStyle}>
                    {/* Colors */}
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.color.primary</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--color-primary)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2" style={{ color: tokens.colors.text[colorMode] }}>
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.primary[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.primary[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Primary action accent fill.</td>
                    </tr>
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.color.secondary</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--color-secondary)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2" style={{ color: tokens.colors.text[colorMode] }}>
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.secondary[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.secondary[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Secondary tonal action color.</td>
                    </tr>
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.color.background</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--color-bg)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2" style={{ color: tokens.colors.text[colorMode] }}>
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.bg[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.bg[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Underlying canvas background.</td>
                    </tr>
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.color.surface-container</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--color-card)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2" style={{ color: tokens.colors.text[colorMode] }}>
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.card[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.card[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Elevated cards & sheets.</td>
                    </tr>
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.color.outline</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--color-border)</td>
                      <td className="py-2.5 px-4 flex items-center gap-2" style={{ color: tokens.colors.text[colorMode] }}>
                        <div className="w-3.5 h-3.5 rounded border border-black/20" style={{ backgroundColor: tokens.colors.border[colorMode] }} />
                        <span className="font-mono text-[10px] uppercase">{tokens.colors.border[colorMode]}</span>
                      </td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Borders, outlines, and dividers.</td>
                    </tr>

                    {/* Shapes */}
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.shape.corner.small</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--radius-sm)</td>
                      <td className="py-2.5 px-4 font-mono text-[11px]" style={{ color: tokens.colors.text[colorMode] }}>{tokens.radius.sm}</td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Badges, tooltips, checkboxes.</td>
                    </tr>
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.shape.corner.medium</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--radius-md)</td>
                      <td className="py-2.5 px-4 font-mono text-[11px]" style={{ color: tokens.colors.text[colorMode] }}>{tokens.radius.md}</td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Inputs, button elements, cards.</td>
                    </tr>
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.shape.corner.large</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--radius-lg)</td>
                      <td className="py-2.5 px-4 font-mono text-[11px]" style={{ color: tokens.colors.text[colorMode] }}>{tokens.radius.lg}</td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Modals, sheets, dialog containers.</td>
                    </tr>

                    {/* Motion */}
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.motion.duration.short</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--motion-duration-fast)</td>
                      <td className="py-2.5 px-4 font-mono text-[11px]" style={{ color: tokens.colors.text[colorMode] }}>{tokens.motion.durationFast}</td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Fast toggles and click scales.</td>
                    </tr>
                    <tr className="hover:bg-slate-100/10 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[10px]" style={{ color: tokens.colors.primary[colorMode] }}>md.sys.motion.easing.emphasized</td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: tokens.colors.textMuted[colorMode] }}>var(--motion-ease-default)</td>
                      <td className="py-2.5 px-4 font-mono text-[10px] max-w-[120px] truncate" style={{ color: tokens.colors.text[colorMode] }} title={tokens.motion.easeDefault}>{tokens.motion.easeDefault}</td>
                      <td className="py-2.5 pl-4 text-[11px]" style={{ color: tokens.colors.textMuted[colorMode] }}>Default layout ease timing curve.</td>
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
