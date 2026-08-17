import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { Upload, FileText, Sparkles } from 'lucide-react';

export const DashboardTab: React.FC = () => {
  const { tokens, activePresetId, presetsList, loadPreset, updateMetadata, importTokens } = useDesignSystem();
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

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
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Dashboard & Presets</h1>
        <p className="text-slate-400 text-sm">
          Load a preset style framework, configure your design system meta properties, or upload a tokens.json manifest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Col 1 & 2: Presets & Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Aesthetic Presets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presetsList.map((preset) => {
                const isActive = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => loadPreset(preset.id)}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-950/20 text-white shadow-lg'
                        : 'border-slate-800 bg-slate-900/30 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{preset.name}</span>
                      {isActive && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-extrabold uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metadata settings */}
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Design System Metadata
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Name</label>
                <input
                  type="text"
                  value={tokens.name}
                  onChange={(e) => updateMetadata('name', e.target.value)}
                  className="px-3.5 py-2 text-sm bg-slate-950/50 border border-slate-800 rounded-lg outline-none text-slate-100 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Author / Designer</label>
                <input
                  type="text"
                  value={tokens.author}
                  onChange={(e) => updateMetadata('author', e.target.value)}
                  className="px-3.5 py-2 text-sm bg-slate-950/50 border border-slate-800 rounded-lg outline-none text-slate-100 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Version</label>
                <input
                  type="text"
                  value={tokens.version}
                  onChange={(e) => updateMetadata('version', e.target.value)}
                  className="px-3.5 py-2 text-sm bg-slate-950/50 border border-slate-800 rounded-lg outline-none text-slate-100 font-mono focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
                <input
                  type="text"
                  value={tokens.description}
                  onChange={(e) => updateMetadata('description', e.target.value)}
                  className="px-3.5 py-2 text-sm bg-slate-950/50 border border-slate-800 rounded-lg outline-none text-slate-100 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Upload panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-400" />
                Import Tokens
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Drag and drop your exported `tokens.json` manifest file below to instantly load and edit the design system tokens.
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-indigo-500 hover:bg-indigo-950/5 rounded-2xl cursor-pointer bg-slate-950/20 transition-all text-center">
                <Upload className="w-8 h-8 text-slate-400 mb-3" />
                <span className="text-xs font-semibold text-slate-200">Choose file or drag here</span>
                <span className="text-[10px] text-slate-500 mt-1">W3C Standard tokens.json</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {importError && (
                <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                  {importError}
                </div>
              )}

              {importSuccess && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  Tokens loaded successfully!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
