import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { presets } from '../utils/presets';
import { LayoutGrid, Palette, Type, Sliders, Zap, Settings, Upload } from 'lucide-react';

export const TokenEditor: React.FC = () => {
  const {
    tokens,
    activePresetId,
    colorMode,
    updateColorToken,
    updateTypography,
    updateSpacing,
    updateRadius,
    updateShadow,
    updateMotion,
    updateIconToken,
    updateMetadata,
    loadPreset,
    importTokens,
  } = useDesignSystem();

  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'typography' | 'spacing' | 'motion' | 'settings'>('presets');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  // Handle json file uploading
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importTokens(content);
      if (res.success) {
        setImportSuccess(true);
        setImportError('');
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError(res.error || 'Failed to import tokens.');
        setImportSuccess(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-100 select-none">
      {/* Editor Navigation */}
      <div className="grid grid-cols-6 border-b border-slate-800 text-center text-xs">
        <button
          onClick={() => setActiveTab('presets')}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 hover:bg-slate-800/50 transition-all ${
            activeTab === 'presets' ? 'border-indigo-500 text-indigo-400 font-semibold' : 'border-transparent text-slate-400'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Presets</span>
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 hover:bg-slate-800/50 transition-all ${
            activeTab === 'colors' ? 'border-indigo-500 text-indigo-400 font-semibold' : 'border-transparent text-slate-400'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Colors</span>
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 hover:bg-slate-800/50 transition-all ${
            activeTab === 'typography' ? 'border-indigo-500 text-indigo-400 font-semibold' : 'border-transparent text-slate-400'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Typo</span>
        </button>
        <button
          onClick={() => setActiveTab('spacing')}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 hover:bg-slate-800/50 transition-all ${
            activeTab === 'spacing' ? 'border-indigo-500 text-indigo-400 font-semibold' : 'border-transparent text-slate-400'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Layout</span>
        </button>
        <button
          onClick={() => setActiveTab('motion')}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 hover:bg-slate-800/50 transition-all ${
            activeTab === 'motion' ? 'border-indigo-500 text-indigo-400 font-semibold' : 'border-transparent text-slate-400'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Motion</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 hover:bg-slate-800/50 transition-all ${
            activeTab === 'settings' ? 'border-indigo-500 text-indigo-400 font-semibold' : 'border-transparent text-slate-400'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Meta</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Tab 1: Presets & Imports */}
        {activeTab === 'presets' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-md font-bold mb-2 flex items-center gap-2 text-white">
                Preset Frameworks
              </h3>
              <p className="text-xs text-slate-400">
                Load predefined templates to jumpstart your UI design styles.
              </p>
            </div>
            
            <div className="space-y-3">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                    activePresetId === preset.id
                      ? 'border-indigo-500 bg-indigo-950/20 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{preset.name}</span>
                    {activePresetId === preset.id && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{preset.description}</p>
                </button>
              ))}
            </div>

            {/* Drag & Drop JSON importer */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-semibold text-white mb-2">Import tokens.json</h3>
              <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer bg-slate-950/20 hover:bg-slate-950/40 transition-all">
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-medium text-slate-300">Choose file or drag here</span>
                <span className="text-[10px] text-slate-500 mt-1">Accepts tokens.json W3C files</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {importError && (
                <div className="mt-3 p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                  {importError}
                </div>
              )}

              {importSuccess && (
                <div className="mt-3 p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Design tokens imported successfully!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Color Palette */}
        {activeTab === 'colors' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-bold mb-1 text-white">Color Token Mapping</h3>
              <p className="text-xs text-slate-400">
                Adjust primary palette and surface variables. Current view: <span className="text-indigo-400 capitalize font-bold">{colorMode} mode</span>.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {Object.entries(tokens.colors).map(([key, token]) => {
                const colorKey = key as keyof typeof tokens.colors;
                const value = tokens.colors[colorKey][colorMode];
                return (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30 border border-slate-800">
                    <div className="flex-1 min-w-0 pr-4">
                      <span className="text-xs font-semibold capitalize text-slate-200">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <p className="text-[10px] text-slate-500 truncate" title={token.description}>
                        {token.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase select-all">
                        {value}
                      </span>
                      <div className="relative w-8 h-8 rounded-full border border-slate-700 overflow-hidden cursor-pointer">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateColorToken(colorKey, colorMode, e.target.value)}
                          className="absolute -inset-1 cursor-pointer w-12 h-12 border-none bg-none p-0 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Typography */}
        {activeTab === 'typography' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-md font-bold mb-1 text-white">Typography & Fonts</h3>
              <p className="text-xs text-slate-400">Customize font sizes and scale ratios.</p>
            </div>

            <div className="space-y-4 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              {/* Font Family */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Font Family</label>
                <select
                  value={tokens.typography.fontFamily}
                  onChange={(e) => updateTypography('fontFamily', e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200"
                >
                  <option value="'Inter', sans-serif">Inter (Sans)</option>
                  <option value="'Roboto', 'Inter', sans-serif">Roboto (Google)</option>
                  <option value="'JetBrains Mono', monospace">JetBrains Mono (Slab)</option>
                  <option value="system-ui, -apple-system, sans-serif">System UI</option>
                </select>
              </div>

              {/* Base Font Size */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Base Font Size</span>
                  <span className="text-indigo-400 font-mono">{tokens.typography.baseSize}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={tokens.typography.baseSize}
                  onChange={(e) => updateTypography('baseSize', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Line Height */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Line Height</label>
                <input
                  type="text"
                  value={tokens.typography.lineHeight}
                  onChange={(e) => updateTypography('lineHeight', e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200 font-mono"
                />
              </div>

              {/* Letter Spacing */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Letter Spacing</label>
                <input
                  type="text"
                  value={tokens.typography.letterSpacing}
                  onChange={(e) => updateTypography('letterSpacing', e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Radius & Spacing */}
        {activeTab === 'spacing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-bold mb-1 text-white">Layout Grid & Corner Radii</h3>
              <p className="text-xs text-slate-400">Define base spacing multiples and container shapes.</p>
            </div>

            {/* Base Spacing Unit */}
            <div className="space-y-3 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">Base Spacing Unit</span>
                <span className="text-indigo-400 font-mono">{tokens.spacing.baseUnit}px grid</span>
              </div>
              <input
                type="range"
                min="4"
                max="16"
                step="2"
                value={tokens.spacing.baseUnit}
                onChange={(e) => updateSpacing(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>4px</span>
                <span>8px (M3)</span>
                <span>12px</span>
                <span>16px</span>
              </div>
            </div>

            {/* Corner Radius Controls */}
            <div className="space-y-3 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-xs font-semibold text-slate-300">Border Radius Scale</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(tokens.radius).map(([key, val]) => {
                  if (key === 'none' || key === 'full') return null;
                  const radiusKey = key as keyof typeof tokens.radius;
                  return (
                    <div key={key} className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-semibold text-slate-500">{key}</label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => updateRadius(radiusKey, e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-slate-200"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Icon Token Controls */}
            <div className="space-y-3 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-xs font-semibold text-slate-300">Icon Sizing & Stroke</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-semibold text-slate-500">Size Sm</label>
                  <input
                    type="text"
                    value={tokens.icons.sizeSm}
                    onChange={(e) => updateIconToken('sizeSm', e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-semibold text-slate-500">Size Md</label>
                  <input
                    type="text"
                    value={tokens.icons.sizeMd}
                    onChange={(e) => updateIconToken('sizeMd', e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-semibold text-slate-500">Size Lg</label>
                  <input
                    type="text"
                    value={tokens.icons.sizeLg}
                    onChange={(e) => updateIconToken('sizeLg', e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-semibold text-slate-500">Stroke Width</label>
                  <input
                    type="text"
                    value={tokens.icons.strokeWidth}
                    onChange={(e) => updateIconToken('strokeWidth', e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Shadows & Motion */}
        {activeTab === 'motion' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-bold mb-1 text-white">Motion, Easing & Depth</h3>
              <p className="text-xs text-slate-400">Control duration keys, cubic easing, and shadow tokens.</p>
            </div>

            {/* Transition Durations */}
            <div className="space-y-3 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-xs font-semibold text-slate-300">Transition Durations</h4>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Fast (switches)</span>
                  <input
                    type="text"
                    value={tokens.motion.durationFast}
                    onChange={(e) => updateMotion('durationFast', e.target.value)}
                    className="w-24 px-2 py-1 text-right text-xs bg-slate-900 border border-slate-800 rounded font-mono text-slate-200"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Normal (buttons)</span>
                  <input
                    type="text"
                    value={tokens.motion.durationNormal}
                    onChange={(e) => updateMotion('durationNormal', e.target.value)}
                    className="w-24 px-2 py-1 text-right text-xs bg-slate-900 border border-slate-800 rounded font-mono text-slate-200"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Slow (modals)</span>
                  <input
                    type="text"
                    value={tokens.motion.durationSlow}
                    onChange={(e) => updateMotion('durationSlow', e.target.value)}
                    className="w-24 px-2 py-1 text-right text-xs bg-slate-900 border border-slate-800 rounded font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Custom Easings */}
            <div className="space-y-3 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-xs font-semibold text-slate-300">Timing Curves</h4>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Ease Default</label>
                <input
                  type="text"
                  value={tokens.motion.easeDefault}
                  onChange={(e) => updateMotion('easeDefault', e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-slate-200"
                />
              </div>
            </div>

            {/* Elevation Shadows */}
            <div className="space-y-3 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-xs font-semibold text-slate-300">Box Shadow Layers</h4>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Shadow md</span>
                  <input
                    type="text"
                    value={tokens.shadows.md}
                    onChange={(e) => updateShadow('md', e.target.value)}
                    className="w-48 px-2 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono text-slate-200 text-right truncate"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Shadow lg</span>
                  <input
                    type="text"
                    value={tokens.shadows.lg}
                    onChange={(e) => updateShadow('lg', e.target.value)}
                    className="w-48 px-2 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono text-slate-200 text-right truncate"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Metadata & System settings */}
        {activeTab === 'settings' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-md font-bold mb-1 text-white">System Config & Metadata</h3>
              <p className="text-xs text-slate-400">
                Identify ownership, naming version, and targets.
              </p>
            </div>

            <div className="space-y-4 bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Design System Name</label>
                <input
                  type="text"
                  value={tokens.name}
                  onChange={(e) => updateMetadata('name', e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200"
                />
              </div>

              {/* Author */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Author / Designer</label>
                <input
                  type="text"
                  value={tokens.author}
                  onChange={(e) => updateMetadata('author', e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200"
                />
              </div>

              {/* Version */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Version</label>
                <input
                  type="text"
                  value={tokens.version}
                  onChange={(e) => updateMetadata('version', e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200 font-mono"
                />
              </div>

              {/* Framework target */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Export Target Framework</label>
                <select
                  value={tokens.targetFramework}
                  onChange={(e) => updateMetadata('version', e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none text-slate-200"
                >
                  <option value="react-tailwind">React + Tailwind CSS</option>
                  <option value="vue-css">Vue + Vanilla CSS Modules</option>
                  <option value="web-components">Vanilla HTML / Web Components</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};
