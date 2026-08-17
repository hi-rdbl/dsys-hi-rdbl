import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import {
  generateTokensJson,
  generateCssVariables,
  generateTailwindConfig,
  generateTypesTs,
  generateCursorRules,
} from '../utils/generator';
import { Copy, Check, Download, Share2, FileCode, CheckCircle } from 'lucide-react';

export const ExportPanel: React.FC = () => {
  const { tokens, getShareUrl } = useDesignSystem();
  const [activeTab, setActiveTab] = useState<'json' | 'css' | 'tailwind' | 'types' | 'cursorrules'>('json');
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Generate source contents on-the-fly
  const contents = {
    json: { code: generateTokensJson(tokens), fileName: 'tokens.json' },
    css: { code: generateCssVariables(tokens), fileName: 'variables.css' },
    tailwind: { code: generateTailwindConfig(tokens), fileName: 'tailwind.config.js' },
    types: { code: generateTypesTs(tokens), fileName: 'types.ts' },
    cursorrules: { code: generateCursorRules(tokens), fileName: '.cursorrules' },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contents[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const { code, fileName } = contents[activeTab];
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-100 select-none">
      
      {/* Top Header & Share Link Button */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Asset Exporter</h3>
        </div>
        <button
          onClick={handleShare}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 border ${
            shareCopied 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
              : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500'
          }`}
        >
          {shareCopied ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Config Link</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs overflow-x-auto">
        {(Object.keys(contents) as Array<keyof typeof contents>).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCopied(false);
            }}
            className={`px-4 py-3 border-b-2 whitespace-nowrap hover:bg-slate-800/40 transition-all ${
              activeTab === tab 
                ? 'border-indigo-500 text-indigo-400 font-semibold' 
                : 'border-transparent text-slate-400'
            }`}
          >
            {contents[tab].fileName}
          </button>
        ))}
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 relative font-mono text-[11px] leading-relaxed text-slate-300">
        
        {/* Floating actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={handleCopy}
            title="Copy to Clipboard"
            className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-90 transition-all text-slate-400 hover:text-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleDownload}
            title="Download File"
            className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-90 transition-all text-slate-400 hover:text-white"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Syntax highlight mock container */}
        <pre className="overflow-x-auto w-full select-text mt-4">
          <code>{contents[activeTab].code}</code>
        </pre>
      </div>

      {/* Info footer */}
      <div className="p-3 text-[10px] text-slate-500 text-center border-t border-slate-800 bg-slate-900/50">
        Copy the configuration directly into your codebase to start using it.
      </div>
    </div>
  );
};
