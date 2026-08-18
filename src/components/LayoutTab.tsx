import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { Grid, Minimize2 } from 'lucide-react';

export const LayoutTab: React.FC = () => {
  const { tokens, updateSpacing, updateRadius, updateIconToken, updateSpacingScale } = useDesignSystem();
  
  const baseUnit = tokens.spacing.baseUnit;
  
  // Local state to manage comma-separated multipliers input
  const [scaleInput, setScaleInput] = useState(() => tokens.spacing.scale.join(', '));

  const handleUpdateScaleArray = (val: string) => {
    setScaleInput(val);
    const parsed = val.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num) && num > 0);
    
    if (parsed.length > 0) {
      updateSpacingScale(parsed);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Grid, Spacing & Corners</h1>
        <p className="text-slate-400 text-sm">
          Define your base spatial unit to generate spacing helper scales, configure border radii, and customize icon dimensions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left pane: Modifiers (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-panel p-5 rounded-2xl space-y-6">
            
            {/* Spacing modifiers */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Grid className="w-4 h-4 text-indigo-400" />
                Spacing Base Unit
              </h3>
              
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">Base Grid Multiplier</span>
                <span className="text-indigo-400 font-mono">{baseUnit}px</span>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="4"
                  max="16"
                  step="2"
                  value={baseUnit}
                  onChange={(e) => updateSpacing(parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                
                {/* Spacing Stepper */}
                <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8 flex-shrink-0">
                  <button
                    onClick={() => updateSpacing(Math.max(4, baseUnit - 2))}
                    className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white font-bold text-xs h-full transition-colors"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-slate-300 min-w-[24px] text-center">
                    {baseUnit}
                  </span>
                  <button
                    onClick={() => updateSpacing(Math.min(16, baseUnit + 2))}
                    className="px-2.5 hover:bg-slate-900 text-slate-400 hover:text-white font-bold text-xs h-full transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customizable Spacing Scale Array */}
              <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-800/40">
                <label className="text-[10px] uppercase font-bold text-slate-500">Spacing Scale Array</label>
                <input
                  type="text"
                  value={scaleInput}
                  onChange={(e) => handleUpdateScaleArray(e.target.value)}
                  className="w-full bg-slate-955 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-300 font-mono outline-none focus:border-slate-700"
                  placeholder="e.g. 1, 2, 3, 4, 6, 8, 12, 16"
                />
                <span className="text-[9px] text-slate-500 leading-normal">
                  Type multipliers separated by commas. Multiplies the base grid unit to generate layout spacing tokens.
                </span>
              </div>
            </div>

            {/* Radius modifiers */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Minimize2 className="w-4 h-4 text-indigo-400" />
                Border Radius Scale
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(tokens.radius).map(([key, val]) => {
                  if (key === 'none' || key === 'full' || key === 'button') return null;
                  const radiusKey = key as keyof typeof tokens.radius;
                  const numVal = parseInt(val) || 0;
                  
                  return (
                    <div key={key} className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500">{key}</label>
                      <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8">
                        <button
                          onClick={() => updateRadius(radiusKey, `${Math.max(0, numVal - 1)}px`)}
                          className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => updateRadius(radiusKey, e.target.value)}
                          className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                        />
                        <button
                          onClick={() => updateRadius(radiusKey, `${numVal + 1}px`)}
                          className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Button Radius Selector */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Button Shape Style
              </h3>
              <select
                value={tokens.radius.button}
                onChange={(e) => updateRadius('button', e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none text-slate-200 focus:border-indigo-500"
              >
                <option value="0px">Square (0px)</option>
                <option value="var(--radius-xs)">Extra Small (xs)</option>
                <option value="var(--radius-sm)">Small (sm)</option>
                <option value="var(--radius-md)">Medium (md)</option>
                <option value="var(--radius-lg)">Large (lg)</option>
                <option value="var(--radius-xl)">Extra Large (xl)</option>
                <option value="var(--radius-xxl)">Double Extra Large (xxl)</option>
                <option value="var(--radius-full)">Pill / Capsule (full)</option>
              </select>
              <span className="text-[10px] text-slate-500 block leading-normal">
                Sets the semantic <code>--radius-button</code> token used across all button presets.
              </span>
            </div>

            {/* Icon Token Modifiers */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                Icon Size & Stroke
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Size Sm */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Size Sm</label>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8">
                    <button
                      onClick={() => updateIconToken('sizeSm', `${Math.max(0, parseInt(tokens.icons.sizeSm) - 1)}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={tokens.icons.sizeSm}
                      onChange={(e) => updateIconToken('sizeSm', e.target.value)}
                      className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                    />
                    <button
                      onClick={() => updateIconToken('sizeSm', `${parseInt(tokens.icons.sizeSm) + 1}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Size Md */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Size Md</label>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8">
                    <button
                      onClick={() => updateIconToken('sizeMd', `${Math.max(0, parseInt(tokens.icons.sizeMd) - 1)}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={tokens.icons.sizeMd}
                      onChange={(e) => updateIconToken('sizeMd', e.target.value)}
                      className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                    />
                    <button
                      onClick={() => updateIconToken('sizeMd', `${parseInt(tokens.icons.sizeMd) + 1}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Size Lg */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Size Lg</label>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8">
                    <button
                      onClick={() => updateIconToken('sizeLg', `${Math.max(0, parseInt(tokens.icons.sizeLg) - 1)}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={tokens.icons.sizeLg}
                      onChange={(e) => updateIconToken('sizeLg', e.target.value)}
                      className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                    />
                    <button
                      onClick={() => updateIconToken('sizeLg', `${parseInt(tokens.icons.sizeLg) + 1}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Stroke Width */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Stroke</label>
                  <div className="flex items-center border border-slate-800 bg-slate-950/60 rounded-lg overflow-hidden h-8">
                    <button
                      onClick={() => updateIconToken('strokeWidth', `${Math.max(0.5, parseFloat(tokens.icons.strokeWidth) - 0.5)}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={tokens.icons.strokeWidth}
                      onChange={(e) => updateIconToken('strokeWidth', e.target.value)}
                      className="w-full bg-transparent text-center text-xs font-mono text-slate-200 outline-none border-none px-1"
                    />
                    <button
                      onClick={() => updateIconToken('strokeWidth', `${parseFloat(tokens.icons.strokeWidth) + 0.5}px`)}
                      className="px-2 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-bold h-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right pane: Spacious visualizers (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Spacing Bars visualizer */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Spacing Scale Visualizer
            </h3>
            <div className="space-y-3.5">
              {tokens.spacing.scale.map((multiplier) => {
                const pxVal = baseUnit * multiplier;
                return (
                  <div key={multiplier} className="flex items-center gap-4 text-xs font-mono">
                    <span className="w-20 text-slate-400 text-right">Token {multiplier}</span>
                    <span className="w-12 text-indigo-400 font-bold text-right">{pxVal}px</span>
                    <div className="flex-1 h-5 bg-slate-955 border border-slate-900 flex items-center">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-md animate-fadeIn"
                        style={{ width: `${pxVal * 3}px`, maxWidth: '100%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Border Radius visualizer */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Border Radius Visualizer
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(tokens.radius).map(([key, val]) => {
                return (
                  <div 
                    key={key} 
                    className="aspect-square bg-slate-950/40 border border-slate-800 flex flex-col items-center justify-center text-center p-3 transition-all hover:scale-105"
                    style={{ borderRadius: val }}
                  >
                    <span className="text-xs font-bold text-white capitalize">{key}</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1">{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
