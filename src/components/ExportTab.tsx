import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import {
  generateTokensJson,
  generateCssVariables,
  generateTailwindConfig,
  generateTypesTs,
  generateCursorRules,
  generateMaterialWebCss,
  generateMaterialAndroidXml,
  generateMaterialComposeKotlin,
  generateMaterialFlutterDart,
} from '../utils/generator';
import { Copy, Check, Download, Share2, CheckCircle } from 'lucide-react';

type ExportTabId = 
  | 'json' 
  | 'css' 
  | 'tailwind' 
  | 'materialWeb' 
  | 'materialAndroid' 
  | 'materialCompose' 
  | 'materialFlutter' 
  | 'types' 
  | 'cursorrules';

export const ExportTab: React.FC = () => {
  const { tokens, getShareUrl } = useDesignSystem();
  const [activeTab, setActiveTab] = useState<ExportTabId>('json');
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const contents = {
    json: { 
      code: generateTokensJson(tokens), 
      fileName: 'tokens.json', 
      desc: 'Industry-standard W3C Draft design tokens.' 
    },
    css: { 
      code: generateCssVariables(tokens), 
      fileName: 'variables.css', 
      desc: 'CSS custom properties supporting automatic theme toggle.' 
    },
    tailwind: { 
      code: generateTailwindConfig(tokens), 
      fileName: 'tailwind.config.js', 
      desc: 'Extend custom properties directly in Tailwind config.' 
    },
    materialWeb: {
      code: generateMaterialWebCss(tokens),
      fileName: 'material-web.css',
      desc: 'Material Web Components (material-web) CSS custom properties.'
    },
    materialAndroid: {
      code: generateMaterialAndroidXml(tokens),
      fileName: 'colors.xml',
      desc: 'Android Resources XML color files compatible with material-components-android.'
    },
    materialCompose: {
      code: generateMaterialComposeKotlin(tokens),
      fileName: 'Theme.kt',
      desc: 'Jetpack Compose Kotlin ColorScheme properties.'
    },
    materialFlutter: {
      code: generateMaterialFlutterDart(tokens),
      fileName: 'app_theme.dart',
      desc: 'Flutter ThemeData configurations compatible with material-components-flutter.'
    },
    types: { 
      code: generateTypesTs(tokens), 
      fileName: 'types.ts', 
      desc: 'TypeScript prop interfaces for component variations.' 
    },
    cursorrules: { 
      code: generateCursorRules(tokens), 
      fileName: '.cursorrules', 
      desc: 'AI Coding instructions to enforce styling rules.' 
    },
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
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Export Code & AI Sync</h1>
        <p className="text-slate-400 text-sm">
          Generate standard JSON schemas, CSS overrides, Tailwind extensions, TypeScript models, or `.cursorrules` prompt docs instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left card: Sharing (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-400" />
                Cloud Share Link
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Share this exact configuration by copying the URL link. The state is compressed directly in the URL query so anyone can open and edit it instantly!
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleShare}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 border ${
                  shareCopied 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-lg' 
                    : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'
                }`}
              >
                {shareCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Share Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Shareable URL</span>
                  </>
                )}
              </button>

              <span className="text-[10px] text-slate-500 block text-center">
                Requires no database or account registration.
              </span>
            </div>
          </div>
        </div>

        {/* Right card: Code tabs (8 cols) */}
        <div className="xl:col-span-8 space-y-4">
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-[65vh]">
            
            {/* Tab navigation */}
            <div className="flex border-b border-slate-800 text-xs overflow-x-auto bg-slate-900/60">
              {(Object.keys(contents) as Array<keyof typeof contents>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCopied(false);
                  }}
                  className={`px-5 py-3.5 border-b-2 whitespace-nowrap hover:bg-slate-800/40 transition-all font-semibold ${
                    activeTab === tab 
                      ? 'border-indigo-500 text-indigo-400' 
                      : 'border-transparent text-slate-400'
                  }`}
                >
                  {contents[tab].fileName}
                </button>
              ))}
            </div>

            {/* Tab description banner */}
            <div className="p-3 bg-slate-950/60 border-b border-slate-900 flex justify-between items-center text-xs text-slate-400">
              <span>{contents[activeTab].desc}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[11px] font-bold text-white flex items-center gap-1 transition-all active:scale-95"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[11px] font-bold text-white flex items-center gap-1 transition-all active:scale-95"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code output */}
            <div className="flex-1 overflow-auto bg-slate-950 p-6 font-mono text-[11px] leading-relaxed text-slate-300 select-text">
              <pre>
                <code>{contents[activeTab].code}</code>
              </pre>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
