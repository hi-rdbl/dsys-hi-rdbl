import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { getContrastRatio, evaluateContrast } from '../utils/contrast';
import { ShieldCheck, ShieldAlert, Palette } from 'lucide-react';

export const ColorsTab: React.FC = () => {
  const { tokens, colorMode, updateColorToken } = useDesignSystem();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Color System</h1>
          <p className="text-slate-400 text-sm">
            Configure primitive and semantic color tokens. Preview light/dark values and audit contrast ratios live.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left pane: Token Editor Sliders (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-indigo-400" />
              Modifier Inputs
            </h3>
            
            <div className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              {Object.entries(tokens.colors).map(([key, _token]) => {
                const colorKey = key as keyof typeof tokens.colors;
                const value = tokens.colors[colorKey][colorMode];
                return (
                  <div key={key} className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-lg border border-slate-700 overflow-hidden cursor-pointer flex-shrink-0">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateColorToken(colorKey, colorMode, e.target.value)}
                          className="absolute -inset-1 cursor-pointer w-12 h-12 border-none bg-none p-0 outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateColorToken(colorKey, colorMode, e.target.value)}
                        className="flex-1 min-w-0 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs font-mono uppercase text-slate-300 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right pane: Spacious Brandbook Color Swatches (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(tokens.colors).map(([key, token]) => {
              const colorKey = key as keyof typeof tokens.colors;
              const lightVal = token.light;
              const darkVal = token.dark;
              
              // Calculate contrast against the selected background color
              const currentBg = tokens.colors.bg[colorMode];
              const activeVal = tokens.colors[colorKey][colorMode];
              
              // If it's a text token, measure vs background.
              // If it's a background/card token, measure vs text.
              // Otherwise (primary, secondary, success, etc.), measure white text vs this color.
              let contrastAgainst = currentBg;
              let contrastLabel = `vs Background (${colorMode})`;
              
              if (colorKey === 'bg' || colorKey === 'card' || colorKey === 'border') {
                contrastAgainst = tokens.colors.text[colorMode];
                contrastLabel = `vs Body Text (${colorMode})`;
              } else if (colorKey === 'text' || colorKey === 'textMuted') {
                contrastAgainst = currentBg;
                contrastLabel = `vs Background (${colorMode})`;
              } else {
                contrastAgainst = '#ffffff'; // Measure contrast for button labels (white text)
                contrastLabel = 'vs White Text';
              }
              
              const ratio = getContrastRatio(activeVal, contrastAgainst);
              const contrastEval = evaluateContrast(ratio);

              return (
                <div 
                  key={key} 
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/80 transition-all border border-slate-800/80"
                >
                  <div className="space-y-4">
                    {/* Swatch Preview Block */}
                    <div className="flex gap-2">
                      {/* Light Swatch */}
                      <div className="flex-1 flex flex-col gap-1">
                        <div 
                          className="h-14 rounded-lg shadow-inner border border-black/10"
                          style={{ backgroundColor: lightVal }}
                        />
                        <span className="text-[10px] text-slate-500 font-mono text-center uppercase">Light: {lightVal}</span>
                      </div>
                      {/* Dark Swatch */}
                      <div className="flex-1 flex flex-col gap-1">
                        <div 
                          className="h-14 rounded-lg shadow-inner border border-white/5"
                          style={{ backgroundColor: darkVal }}
                        />
                        <span className="text-[10px] text-slate-500 font-mono text-center uppercase">Dark: {darkVal}</span>
                      </div>
                    </div>

                    {/* Meta information */}
                    <div>
                      <h4 className="text-sm font-bold text-white capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {token.description}
                      </p>
                    </div>
                  </div>

                  {/* Contrast Auditor Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-medium leading-none">{contrastLabel}</span>
                      <span className="font-bold text-slate-300 mt-1">{ratio}:1 Ratio</span>
                    </div>
                    
                    <div className="flex gap-1.5">
                      {contrastEval.aaNormal ? (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> AA PASS
                        </span>
                      ) : (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold uppercase flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> AA FAIL
                        </span>
                      )}

                      {contrastEval.aaaNormal && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase">
                          AAA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
