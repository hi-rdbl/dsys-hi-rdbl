import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { Zap, Eye, Play, Sparkles, ChevronRight } from 'lucide-react';

export const MotionTab: React.FC = () => {
  const { tokens, colorMode, updateShadow, updateMotion } = useDesignSystem();
  const [animate, setAnimate] = useState(false);
  const [activeEase, setActiveEase] = useState<'easeDefault' | 'easeIn' | 'easeOut' | 'easeInOut'>('easeDefault');
  
  // States to simulate button hover/tap in the sandbox
  const [sandboxHover, setSandboxHover] = useState(false);
  const [sandboxPress, setSandboxPress] = useState(false);

  const triggerAnimation = () => {
    setAnimate(true);
    const duration = parseInt(tokens.motion.durationSlow) || 400;
    setTimeout(() => setAnimate(false), duration + 200);
  };

  // Safe parsed values for button setup
  const hoverScale = tokens.motion.buttonHoverScale ?? 1.02;
  const activeScale = tokens.motion.buttonActiveScale ?? 0.96;
  const hoverEffect = tokens.motion.buttonHoverEffect ?? 'scale';
  const activeEffect = tokens.motion.buttonActiveEffect ?? 'shrink';

  // Retrieve current primary color mode value
  const activePrimary = tokens.colors.primary[colorMode];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Depth & Motion</h1>
        <p className="text-slate-400 text-sm">
          Define shadow layers to establish spatial elevation hierarchy, and configure transition timing curves for micro-interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left pane: Modifiers (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-panel p-5 rounded-2xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              Motion Modifiers
            </h3>

            {/* Transition Durations */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Durations</span>
              <div className="space-y-3">
                
                {/* durationFast */}
                <div className="flex items-center justify-between text-xs gap-3">
                  <span className="text-slate-400 font-medium flex-shrink-0">Fast</span>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8 w-28">
                    <button
                      onClick={() => updateMotion('durationFast', `${Math.max(0, parseInt(tokens.motion.durationFast) - 50)}ms`)}
                      className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={tokens.motion.durationFast}
                      onChange={(e) => updateMotion('durationFast', e.target.value)}
                      className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                    />
                    <button
                      onClick={() => updateMotion('durationFast', `${parseInt(tokens.motion.durationFast) + 50}ms`)}
                      className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* durationNormal */}
                <div className="flex items-center justify-between text-xs gap-3">
                  <span className="text-slate-400 font-medium flex-shrink-0">Normal</span>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8 w-28">
                    <button
                      onClick={() => updateMotion('durationNormal', `${Math.max(0, parseInt(tokens.motion.durationNormal) - 50)}ms`)}
                      className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={tokens.motion.durationNormal}
                      onChange={(e) => updateMotion('durationNormal', e.target.value)}
                      className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                    />
                    <button
                      onClick={() => updateMotion('durationNormal', `${parseInt(tokens.motion.durationNormal) + 50}ms`)}
                      className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* durationSlow */}
                <div className="flex items-center justify-between text-xs gap-3">
                  <span className="text-slate-400 font-medium flex-shrink-0">Slow</span>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8 w-28">
                    <button
                      onClick={() => updateMotion('durationSlow', `${Math.max(0, parseInt(tokens.motion.durationSlow) - 50)}ms`)}
                      className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={tokens.motion.durationSlow}
                      onChange={(e) => updateMotion('durationSlow', e.target.value)}
                      className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                    />
                    <button
                      onClick={() => updateMotion('durationSlow', `${parseInt(tokens.motion.durationSlow) + 50}ms`)}
                      className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Timing Curves */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Easing Curves</span>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Ease Default</label>
                  <input
                    type="text"
                    value={tokens.motion.easeDefault}
                    onChange={(e) => updateMotion('easeDefault', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-955 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Ease In Out</label>
                  <input
                    type="text"
                    value={tokens.motion.easeInOut}
                    onChange={(e) => updateMotion('easeInOut', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-955 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Button Animation setup */}
            <div className="space-y-3.5 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Button Animation Setup</span>
              
              <div className="space-y-3">
                {/* Hover Scale */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Hover Scale</span>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8 w-28">
                    <button
                      onClick={() => updateMotion('buttonHoverScale', Math.round((hoverScale - 0.01) * 100) / 100)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full"
                    >
                      -
                    </button>
                    <span className="w-full text-center text-xs font-mono text-slate-200">{hoverScale}x</span>
                    <button
                      onClick={() => updateMotion('buttonHoverScale', Math.round((hoverScale + 0.01) * 100) / 100)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Active Scale */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Active Tap Scale</span>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8 w-28">
                    <button
                      onClick={() => updateMotion('buttonActiveScale', Math.round((activeScale - 0.01) * 100) / 100)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full"
                    >
                      -
                    </button>
                    <span className="w-full text-center text-xs font-mono text-slate-200">{activeScale}x</span>
                    <button
                      onClick={() => updateMotion('buttonActiveScale', Math.round((activeScale + 0.01) * 100) / 100)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Hover Effect type select */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Hover Visual Effect</label>
                  <select
                    value={hoverEffect}
                    onChange={(e) => updateMotion('buttonHoverEffect', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-955 border border-slate-800 rounded-lg outline-none text-slate-200"
                  >
                    <option value="scale">Scale Up (+ shadow)</option>
                    <option value="glow">Primary shadow Glow (shadcn)</option>
                    <option value="shine">Glossy shine reflect (Tailwind UI)</option>
                    <option value="border-beam">Border Beam (Magic UI)</option>
                    <option value="slide-fill">Slide Fill Reveal (Aceternity)</option>
                    <option value="icon-reveal">Arrow Translate (Linear UI)</option>
                    <option value="none">Default color swap only</option>
                  </select>
                </div>

                {/* Active effect type select */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Active Press Effect</label>
                  <select
                    value={activeEffect}
                    onChange={(e) => updateMotion('buttonActiveEffect', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-955 border border-slate-800 rounded-lg outline-none text-slate-200"
                  >
                    <option value="shrink">Press scale shrink (Framer)</option>
                    <option value="lift">Elevate pop up</option>
                    <option value="inset">Press Inset shadow</option>
                    <option value="ripple">Radial click ripple</option>
                    <option value="none">Flat static press</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Depth Shadows */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Elevation Shadows</span>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Shadow md</label>
                  <input
                    type="text"
                    value={tokens.shadows.md}
                    onChange={(e) => updateShadow('md', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-955 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-slate-700"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Shadow lg</label>
                  <input
                    type="text"
                    value={tokens.shadows.lg}
                    onChange={(e) => updateShadow('lg', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-955 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-slate-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right pane: Previews (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Micro-Interaction Button Sandbox */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
              Micro-Interaction Button Sandbox
            </h3>
            
            <p className="text-[11px] text-slate-400">
              Hover and press the button below to test physics. Changes to hover/tap scales, easings, and shadows apply immediately.
            </p>

            <div className="h-44 rounded-xl bg-slate-950/60 border border-slate-900 flex items-center justify-center relative overflow-hidden">
              
              {/* Dynamic primary color glow at background for contrast */}
              <div className="absolute w-48 h-48 rounded-full bg-indigo-500/5 blur-[80px]" />
              
              <button
                onMouseEnter={() => setSandboxHover(true)}
                onMouseLeave={() => {
                  setSandboxHover(false);
                  setSandboxPress(false);
                }}
                onMouseDown={() => setSandboxPress(true)}
                onMouseUp={() => setSandboxPress(false)}
                className="relative px-8 py-3.5 text-sm font-extrabold text-white select-none transition-all outline-none border border-transparent"
                style={{
                  backgroundColor: hoverEffect === 'slide-fill' && sandboxHover ? 'transparent' : tokens.colors.primary[colorMode],
                  borderColor: hoverEffect === 'slide-fill' ? tokens.colors.primary[colorMode] : 'transparent',
                  borderRadius: tokens.radius.button.includes('var(') ? '12px' : tokens.radius.button,
                  transition: `all ${tokens.motion.durationFast} ${tokens.motion.easeDefault}`,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  
                  // Dynamic Transform Physics
                  transform: sandboxPress
                    ? `scale(${activeScale})`
                    : sandboxHover
                      ? `scale(${hoverScale})`
                      : 'scale(1)',
                  
                  // Dynamic Shadows
                  boxShadow: sandboxPress && activeEffect === 'inset'
                    ? 'inset 0 3px 10px rgba(0, 0, 0, 0.45)'
                    : sandboxPress
                      ? 'none'
                      : sandboxHover
                        ? hoverEffect === 'glow'
                          ? `0 0 24px ${activePrimary}99, ${tokens.shadows.lg}`
                          : activeEffect === 'lift'
                            ? tokens.shadows.xl
                            : tokens.shadows.lg
                        : tokens.shadows.sm
                }}
              >
                {/* 1. Shine Sheen Effect overlay (Tailwind UI style) */}
                {hoverEffect === 'shine' && (
                  <div
                    className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                    style={{
                      left: sandboxHover ? '130%' : '-60%',
                      transition: `all ${tokens.motion.durationNormal} ${tokens.motion.easeDefault}`,
                    }}
                  />
                )}

                {/* 2. Border Beam Effect (Magic UI style) */}
                {hoverEffect === 'border-beam' && (
                  <div 
                    className="absolute inset-0 rounded-[inherit] p-[2px] pointer-events-none overflow-hidden"
                    style={{ zIndex: 1 }}
                  >
                    {/* Rotating gradient beam outline */}
                    <div 
                      className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] bg-[conic-gradient(from_0deg,transparent_40%,var(--color-primary,#6366f1)_75%,var(--color-accent,#a855f7)_90%,transparent_100%)] animate-spin"
                      style={{ 
                        animationDuration: '3s',
                        display: sandboxHover ? 'block' : 'none'
                      }}
                    />
                    {/* Mask covering the inner area */}
                    <div 
                      className="absolute inset-[2px] rounded-[inherit]"
                      style={{ backgroundColor: tokens.colors.primary[colorMode] }}
                    />
                  </div>
                )}

                {/* 3. Slide Fill Layer (Aceternity style) */}
                {hoverEffect === 'slide-fill' && (
                  <div 
                    className="absolute inset-0 transition-all pointer-events-none"
                    style={{
                      backgroundColor: tokens.colors.accent[colorMode],
                      transform: sandboxHover ? 'translateX(0)' : 'translateX(-100%)',
                      transition: `transform ${tokens.motion.durationNormal} ${tokens.motion.easeDefault}`,
                      zIndex: 0
                    }}
                  />
                )}

                {/* 4. Click Ripple wave overlay */}
                {activeEffect === 'ripple' && sandboxPress && (
                  <span 
                    className="absolute rounded-full bg-white/25 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                    style={{
                      width: '120px',
                      height: '120px',
                      left: '50%',
                      top: '50%',
                      animationDuration: '0.6s',
                      zIndex: 15
                    }}
                  />
                )}
                
                {/* Button Content Wrap */}
                <span 
                  className="relative flex items-center justify-center gap-1 transition-transform duration-200"
                  style={{ 
                    zIndex: 10,
                    transform: sandboxHover && hoverEffect === 'icon-reveal' ? 'translateX(-3px)' : 'translateX(0)'
                  }}
                >
                  <span>Test Interactive Action</span>
                  {hoverEffect === 'icon-reveal' && (
                    <ChevronRight 
                      className="w-4 h-4 transition-all"
                      style={{
                        opacity: sandboxHover ? 1 : 0,
                        transform: sandboxHover ? 'translateX(0)' : 'translateX(-8px)',
                        transition: `all ${tokens.motion.durationFast} ${tokens.motion.easeDefault}`
                      }}
                    />
                  )}
                </span>

              </button>
            </div>
            
            {/* Status readouts */}
            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-500">
              <div className="p-2 border border-slate-900 rounded bg-slate-950/40">
                <span className="text-slate-400 font-bold block mb-1">Hover Specs:</span>
                <span>Type: {hoverEffect} • Scale: {hoverScale}x</span>
              </div>
              <div className="p-2 border border-slate-900 rounded bg-slate-950/40">
                <span className="text-slate-400 font-bold block mb-1">Press Specs:</span>
                <span>Type: {activeEffect} • Scale: {activeScale}x</span>
              </div>
            </div>
          </div>

          {/* Depth visualizer */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Eye className="w-4.5 h-4.5 text-indigo-400" />
              Shadow Depth Hierarchy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="p-5 border border-slate-800 rounded-xl bg-slate-900/40 text-center"
                style={{ boxShadow: tokens.shadows.sm }}
              >
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Elevation 1 (sm)</h4>
                <p className="text-[10px] text-slate-500 font-mono">{tokens.shadows.sm}</p>
              </div>
              <div 
                className="p-5 border border-slate-800 rounded-xl bg-slate-900/40 text-center"
                style={{ boxShadow: tokens.shadows.md }}
              >
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Elevation 2 (md)</h4>
                <p className="text-[10px] text-slate-500 font-mono">{tokens.shadows.md}</p>
              </div>
              <div 
                className="p-5 border border-slate-800 rounded-xl bg-slate-900/40 text-center"
                style={{ boxShadow: tokens.shadows.lg }}
              >
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Elevation 3 (lg)</h4>
                <p className="text-[10px] text-slate-500 font-mono">{tokens.shadows.lg}</p>
              </div>
              <div 
                className="p-5 border border-slate-800 rounded-xl bg-slate-900/40 text-center"
                style={{ boxShadow: tokens.shadows.xl }}
              >
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Elevation 4 (xl)</h4>
                <p className="text-[10px] text-slate-500 font-mono">{tokens.shadows.xl}</p>
              </div>
            </div>
          </div>

          {/* Easing & Motion Simulator */}
          <div className="glass-panel p-6 rounded-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Transition Easing Simulator
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Select a timing curve and trigger the transition test to see duration and ease in action.
                </p>
              </div>
              <button
                onClick={triggerAnimation}
                disabled={animate}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all active:scale-95 border border-indigo-500 shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Animate Test</span>
              </button>
            </div>

            {/* Easing select triggers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['easeDefault', 'easeIn', 'easeOut', 'easeInOut'] as const).map((easeKey) => (
                <button
                  key={easeKey}
                  onClick={() => setActiveEase(easeKey)}
                  className={`py-2 px-3 border rounded-lg text-xs font-bold text-center transition-all ${
                    activeEase === easeKey
                      ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400 shadow-md'
                      : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {easeKey === 'easeDefault' ? 'Default' : easeKey === 'easeIn' ? 'Ease In' : easeKey === 'easeOut' ? 'Ease Out' : 'Ease In Out'}
                </button>
              ))}
            </div>

            {/* Motion track */}
            <div className="p-8 bg-slate-950/60 rounded-xl border border-slate-900/60 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
              {/* Easing track */}
              <div className="w-full h-1.5 bg-slate-900 rounded-full relative">
                {/* Bouncing Element */}
                <div 
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg absolute -top-4 shadow-indigo-500/20 border-2 border-white/5 flex items-center justify-center font-bold text-[10px]"
                  style={{
                    left: animate ? 'calc(100% - 40px)' : '0px',
                    transitionProperty: 'left, transform, background-color',
                    transitionDuration: animate ? tokens.motion.durationSlow : '0ms',
                    transitionTimingFunction: tokens.motion[activeEase],
                    transform: animate ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                  }}
                >
                  DS
                </div>
              </div>

              {/* Status readout */}
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-8">
                <span>Start Position</span>
                <span className="text-indigo-400 uppercase font-bold">
                  Duration: {tokens.motion.durationSlow} • Timing: {tokens.motion[activeEase]}
                </span>
                <span>End Position</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
