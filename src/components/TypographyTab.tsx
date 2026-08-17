import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { Sliders } from 'lucide-react';

export const TypographyTab: React.FC = () => {
  const { tokens, updateTypography } = useDesignSystem();
  
  const { fontFamily, baseSize, scaleFactor, lineHeight, letterSpacing } = tokens.typography;

  // Calculate typography scale values based on scale factor
  const sizes = {
    display: Math.round(baseSize * Math.pow(scaleFactor, 4) * 10) / 10,
    h1: Math.round(baseSize * Math.pow(scaleFactor, 3) * 10) / 10,
    h2: Math.round(baseSize * Math.pow(scaleFactor, 2) * 10) / 10,
    h3: Math.round(baseSize * Math.pow(scaleFactor, 1) * 10) / 10,
    body: baseSize,
    small: Math.round((baseSize / scaleFactor) * 10) / 10,
  };

  const sampleText = 'The quick brown fox jumps over the lazy dog';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Typography Scale</h1>
        <p className="text-slate-400 text-sm">
          Customize font stacks, set fluid base sizing, line heights, letter spacing, and preview your typographical hierarchy.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left pane: Modifiers (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-panel p-5 rounded-2xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Font Modifiers
            </h3>

            {/* Font Family */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Font Family Stack</label>
              <select
                value={fontFamily}
                onChange={(e) => updateTypography('fontFamily', e.target.value)}
                className="px-3.5 py-2 text-sm bg-slate-950/60 border border-slate-800 rounded-lg outline-none text-slate-200"
              >
                <option value="'Inter', sans-serif">Inter (Modern Clean)</option>
                <option value="'Roboto', sans-serif">Roboto (Google Material)</option>
                <option value="'JetBrains Mono', monospace">JetBrains Mono (Monospace)</option>
                <option value="system-ui, -apple-system, sans-serif">System Default</option>
              </select>
            </div>

            {/* Base Font Size */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Base Size</span>
                <span className="text-indigo-400 font-mono">{baseSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={baseSize}
                onChange={(e) => updateTypography('baseSize', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Scale Factor */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Scale Ratio</span>
                <span className="text-indigo-400 font-mono">{scaleFactor}x</span>
              </div>
              <select
                value={scaleFactor}
                onChange={(e) => updateTypography('scaleFactor', parseFloat(e.target.value))}
                className="px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200"
              >
                <option value="1.125">1.125 (Major Second)</option>
                <option value="1.2">1.200 (Minor Third)</option>
                <option value="1.25">1.250 (Major Third)</option>
                <option value="1.333">1.333 (Perfect Fourth)</option>
                <option value="1.414">1.414 (Augmented Fourth)</option>
                <option value="1.5">1.500 (Perfect Fifth)</option>
                <option value="1.618">1.618 (Golden Ratio)</option>
              </select>
            </div>

            {/* Line Height */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Line Height</label>
              <input
                type="text"
                value={lineHeight}
                onChange={(e) => updateTypography('lineHeight', e.target.value)}
                className="px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200 font-mono"
              />
            </div>

            {/* Letter Spacing */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Letter Spacing</label>
              <input
                type="text"
                value={letterSpacing}
                onChange={(e) => updateTypography('letterSpacing', e.target.value)}
                className="px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right pane: Spacious Brandbook Typography Showcase (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-8" style={{ fontFamily }}>
            
            {/* Display size */}
            <div className="space-y-1 pb-6 border-b border-slate-800/80">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>DISPLAY TEXT</span>
                <span>{sizes.display}px (base * ratio^4)</span>
              </div>
              <h1 
                style={{ fontSize: `${sizes.display}px`, lineHeight, letterSpacing }}
                className="text-white font-extrabold truncate"
              >
                Aura Brand
              </h1>
            </div>

            {/* H1 */}
            <div className="space-y-1 pb-6 border-b border-slate-800/80">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>HEADING 1</span>
                <span>{sizes.h1}px (base * ratio^3)</span>
              </div>
              <h2 
                style={{ fontSize: `${sizes.h1}px`, lineHeight, letterSpacing }}
                className="text-white font-bold"
              >
                {sampleText}
              </h2>
            </div>

            {/* H2 */}
            <div className="space-y-1 pb-6 border-b border-slate-800/80">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>HEADING 2</span>
                <span>{sizes.h2}px (base * ratio^2)</span>
              </div>
              <h3 
                style={{ fontSize: `${sizes.h2}px`, lineHeight, letterSpacing }}
                className="text-white font-semibold"
              >
                {sampleText}
              </h3>
            </div>

            {/* H3 */}
            <div className="space-y-1 pb-6 border-b border-slate-800/80">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>HEADING 3</span>
                <span>{sizes.h3}px (base * ratio^1)</span>
              </div>
              <h4 
                style={{ fontSize: `${sizes.h3}px`, lineHeight, letterSpacing }}
                className="text-white font-semibold animate-pulse"
              >
                {sampleText}
              </h4>
            </div>

            {/* Body */}
            <div className="space-y-1 pb-6 border-b border-slate-800/80">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>BODY COPY</span>
                <span>{sizes.body}px (base)</span>
              </div>
              <p 
                style={{ fontSize: `${sizes.body}px`, lineHeight, letterSpacing }}
                className="text-slate-300 leading-relaxed"
              >
                Design systems are critical for maintaining code modularity, spatial consistency, and UI identity across multiple web frameworks. By standardizing typographic fluid scales, developers can eliminate styling drift entirely.
              </p>
            </div>

            {/* Small */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>SMALL OVERVIEW CAPTION</span>
                <span>{sizes.small}px (base / ratio)</span>
              </div>
              <p 
                style={{ fontSize: `${sizes.small}px`, lineHeight, letterSpacing }}
                className="text-slate-400"
              >
                Copyright © 2026 Aura UI Engine. Released under the MIT license guidelines.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
