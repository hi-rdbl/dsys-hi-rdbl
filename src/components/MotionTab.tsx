import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { Zap, Eye, Play } from 'lucide-react';

export const MotionTab: React.FC = () => {
  const { tokens, updateShadow, updateMotion } = useDesignSystem();
  const [animate, setAnimate] = useState(false);
  const [activeEase, setActiveEase] = useState<'easeDefault' | 'easeIn' | 'easeOut' | 'easeInOut'>('easeDefault');

  const triggerAnimation = () => {
    setAnimate(true);
    // Automatically reset after duration
    const duration = parseInt(tokens.motion.durationSlow) || 500;
    setTimeout(() => setAnimate(false), duration + 200);
  };

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
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Durations</span>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Fast (150ms)</span>
                  <input
                    type="text"
                    value={tokens.motion.durationFast}
                    onChange={(e) => updateMotion('durationFast', e.target.value)}
                    className="w-24 px-2.5 py-1 text-right text-xs bg-slate-950/60 border border-slate-800 rounded font-mono text-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Normal (300ms)</span>
                  <input
                    type="text"
                    value={tokens.motion.durationNormal}
                    onChange={(e) => updateMotion('durationNormal', e.target.value)}
                    className="w-24 px-2.5 py-1 text-right text-xs bg-slate-950/60 border border-slate-800 rounded font-mono text-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Slow (500ms)</span>
                  <input
                    type="text"
                    value={tokens.motion.durationSlow}
                    onChange={(e) => updateMotion('durationSlow', e.target.value)}
                    className="w-24 px-2.5 py-1 text-right text-xs bg-slate-950/60 border border-slate-800 rounded font-mono text-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Timing Curves */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Easing Curves</span>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Ease Default</label>
                  <input
                    type="text"
                    value={tokens.motion.easeDefault}
                    onChange={(e) => updateMotion('easeDefault', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Ease In Out</label>
                  <input
                    type="text"
                    value={tokens.motion.easeInOut}
                    onChange={(e) => updateMotion('easeInOut', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Depth Shadows */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Elevation Shadows</span>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Shadow md</label>
                  <input
                    type="text"
                    value={tokens.shadows.md}
                    onChange={(e) => updateShadow('md', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Shadow lg</label>
                  <input
                    type="text"
                    value={tokens.shadows.lg}
                    onChange={(e) => updateShadow('lg', e.target.value)}
                    className="px-3.5 py-1.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none font-mono text-slate-200 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right pane: Spacious Previews (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
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
