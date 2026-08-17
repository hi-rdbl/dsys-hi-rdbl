import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { getContrastRatio, evaluateContrast } from '../utils/contrast';
import { Palette } from 'lucide-react';

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
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-medium leading-none">{contrastLabel}</span>
                        <span className="font-bold text-slate-300 mt-1">{ratio}:1 Ratio</span>
                      </div>
                    </div>

                    {/* Visual Contrast Gauge */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full relative my-2 flex items-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-indigo-500 rounded-full opacity-20" />
                      <div className="absolute left-[10%] w-0.5 h-2 bg-slate-700" title="3.0 - AA Large Text" />
                      <div className="absolute left-[17.5%] w-0.5 h-2 bg-slate-700" title="4.5 - AA Normal Text" />
                      <div className="absolute left-[30%] w-0.5 h-2 bg-slate-700" title="7.0 - AAA Normal Text" />
                      <div 
                        className="absolute w-2.5 h-2.5 rounded-full bg-white border border-slate-900 shadow-md transition-all duration-300"
                        style={{ left: `calc(${Math.min(((ratio - 1) / 20) * 100, 100)}% - 5px)` }}
                      />
                    </div>

                    {/* WCAG Compliance Matrix with Tooltips */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] select-none">
                      
                      {/* AA Normal (4.5:1) */}
                      <div className="group relative flex flex-col items-center justify-center p-1.5 rounded bg-slate-950/40 border border-slate-800/40 cursor-help">
                        <span className="text-slate-500 font-bold text-[9px] mb-0.5">Body AA</span>
                        {contrastEval.aaNormal ? (
                          <span className="text-emerald-400 font-bold">Pass</span>
                        ) : (
                          <span className="text-rose-400 font-bold">Fail</span>
                        )}
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl bg-slate-950 border border-slate-800 p-3 text-[10px] leading-relaxed text-slate-300 opacity-0 shadow-2xl transition-all duration-200 group-hover:opacity-100">
                          <p className="font-bold text-white mb-1">Body Text AA Compliance</p>
                          Requires a contrast ratio of at least <strong className="text-emerald-400 font-mono">4.5:1</strong> for normal body text (under 18pt/24px). Fails indicate small text is hard to read.
                          <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-slate-800 bg-slate-950" />
                        </div>
                      </div>

                      {/* AA Large (3.0:1) */}
                      <div className="group relative flex flex-col items-center justify-center p-1.5 rounded bg-slate-950/40 border border-slate-800/40 cursor-help">
                        <span className="text-slate-500 font-bold text-[9px] mb-0.5">Large AA</span>
                        {contrastEval.aaLarge ? (
                          <span className="text-emerald-400 font-bold">Pass</span>
                        ) : (
                          <span className="text-rose-400 font-bold">Fail</span>
                        )}
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl bg-slate-950 border border-slate-800 p-3 text-[10px] leading-relaxed text-slate-300 opacity-0 shadow-2xl transition-all duration-200 group-hover:opacity-100">
                          <p className="font-bold text-white mb-1">Large Text AA Compliance</p>
                          Requires a contrast ratio of at least <strong className="text-emerald-400 font-mono">3.0:1</strong> for large headings (18pt/24px+) or UI components/borders/icons.
                          <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-slate-800 bg-slate-950" />
                        </div>
                      </div>

                      {/* AAA Gold (7.0:1) */}
                      <div className="group relative flex flex-col items-center justify-center p-1.5 rounded bg-slate-950/40 border border-slate-800/40 cursor-help">
                        <span className="text-slate-500 font-bold text-[9px] mb-0.5">Text AAA</span>
                        {contrastEval.aaaNormal ? (
                          <span className="text-indigo-400 font-bold">Pass</span>
                        ) : (
                          <span className="text-slate-500 font-semibold">Fail</span>
                        )}
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl bg-slate-950 border border-slate-800 p-3 text-[10px] leading-relaxed text-slate-300 opacity-0 shadow-2xl transition-all duration-200 group-hover:opacity-100">
                          <p className="font-bold text-white mb-1">Text AAA Compliance</p>
                          Requires a contrast ratio of at least <strong className="text-indigo-400 font-mono">7.0:1</strong>. This is the gold standard for maximum text readability and visual comfort.
                          <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-slate-800 bg-slate-950" />
                        </div>
                      </div>

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
