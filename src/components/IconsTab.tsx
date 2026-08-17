import React, { useState } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { Copy, Check, Search, Plus, Sparkles, AlertCircle } from 'lucide-react';

const INITIAL_ICON_PATHS: Record<string, string> = {
  Home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  Settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  User: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  Help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
  Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/>',
  Moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  Info: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/>',
  Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
};

export const IconsTab: React.FC = () => {
  const { tokens, colorMode } = useDesignSystem();
  
  // Icon collection loaded into state to support dynamic additions
  const [localIcons, setLocalIcons] = useState<Record<string, string>>(INITIAL_ICON_PATHS);
  
  const [selectedIcon, setSelectedIcon] = useState('Home');
  const [selectedColor, setSelectedColor] = useState<'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'>('primary');
  const [iconSizeKey, setIconSizeKey] = useState<'sizeSm' | 'sizeMd' | 'sizeLg'>('sizeMd');
  const [iconCopied, setIconCopied] = useState<'svg' | 'jsx' | 'library' | null>(null);

  // Search query & Custom SVG injector states
  const [searchQuery, setSearchQuery] = useState('');
  const [customIconName, setCustomIconName] = useState('');
  const [customIconPath, setCustomIconPath] = useState('');
  const [customIconError, setCustomIconError] = useState('');

  const filteredIconKeys = Object.keys(localIcons).filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyIconSvg = () => {
    const path = localIcons[selectedIcon] || '';
    const stroke = tokens.icons.strokeWidth;
    const size = tokens.icons[iconSizeKey];
    const color = tokens.colors[selectedColor][colorMode];
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
    navigator.clipboard.writeText(svgCode);
    setIconCopied('svg');
    setTimeout(() => setIconCopied(null), 2000);
  };

  const handleCopyIconJsx = () => {
    const path = localIcons[selectedIcon] || '';
    const sizeVar = iconSizeKey === 'sizeSm' ? 'sm' : iconSizeKey === 'sizeMd' ? 'md' : 'lg';
    const jsxCode = `import React from 'react';

export const ${selectedIcon}Icon = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    style={{
      width: 'var(--icon-size-${sizeVar})',
      height: 'var(--icon-size-${sizeVar})',
      stroke: 'var(--color-${selectedColor})',
      strokeWidth: 'var(--icon-stroke)',
      ...style,
    }}
  >
    ${path}
  </svg>
);`;
    navigator.clipboard.writeText(jsxCode);
    setIconCopied('jsx');
    setTimeout(() => setIconCopied(null), 2000);
  };

  // Export full React Icon catalog containing all loaded icons in one file
  const handleCopyFullLibrary = () => {
    const header = `import React from 'react';\n\n// ==========================================================================\n// Aura UI Design System - Icon Library Module\n// ==========================================================================\n\ninterface IconProps {\n  className?: string;\n  style?: React.CSSProperties;\n}\n\n`;
    const body = Object.entries(localIcons).map(([name, path]) => {
      return `export const ${name}Icon: React.FC<IconProps> = ({ className = '', style = {} }) => (\n  <svg \n    xmlns="http://www.w3.org/2000/svg" \n    viewBox="0 0 24 24" \n    fill="none" \n    strokeLinecap="round" \n    strokeLinejoin="round"\n    className={className}\n    style={{\n      width: 'var(--icon-size-md)',\n      height: 'var(--icon-size-md)',\n      stroke: 'var(--color-primary)',\n      strokeWidth: 'var(--icon-stroke)',\n      ...style,\n    }}\n  >\n    ${path}\n  </svg>\n);`;
    }).join('\n\n');

    navigator.clipboard.writeText(header + body);
    setIconCopied('library');
    setTimeout(() => setIconCopied(null), 2000);
  };

  const handleAddCustomIcon = () => {
    if (!customIconName.trim() || !customIconPath.trim()) return;
    
    // Format name to ensure it is alphanumeric PascalCase
    const formattedName = customIconName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^\w/, (c) => c.toUpperCase());

    if (localIcons[formattedName]) {
      setCustomIconError(`"${formattedName}" already exists.`);
      return;
    }

    setLocalIcons((prev) => ({
      ...prev,
      [formattedName]: customIconPath.trim(),
    }));

    setSelectedIcon(formattedName);
    setCustomIconName('');
    setCustomIconPath('');
    setCustomIconError('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Icon Code Explorer</h1>
        <p className="text-slate-400 text-sm">
          Customize and export inline SVG assets, paste custom paths, or extract a fully variable-compliant React icon library.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left panel: Icon selection catalog & search (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            
            {/* Search and Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Icon Catalog
              </span>
              <div className="relative flex-1 sm:max-w-[180px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none text-slate-200"
                />
              </div>
            </div>

            {/* Catalog grid */}
            <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[300px] pr-1">
              {filteredIconKeys.map((iconName) => {
                const isSelected = selectedIcon === iconName;
                const path = localIcons[iconName];
                return (
                  <button
                    key={iconName}
                    onClick={() => setSelectedIcon(iconName)}
                    className="p-3 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 text-center min-h-[75px]"
                    style={{
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: path }}
                    />
                    <span className="text-[9px] font-bold truncate w-full text-slate-400 mt-1">
                      {iconName}
                    </span>
                  </button>
                );
              })}
              {filteredIconKeys.length === 0 && (
                <div className="col-span-3 text-center py-8 text-xs text-slate-500">
                  No matching icons found.
                </div>
              )}
            </div>
          </div>

          {/* Custom SVG Path Injector */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Plus className="w-4.5 h-4.5 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Inject Custom SVG
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Icon Name</label>
                <input
                  type="text"
                  placeholder="e.g. ChevronRight, Bag"
                  value={customIconName}
                  onChange={(e) => setCustomIconName(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none text-slate-200"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">SVG Inner Path Elements</label>
                <textarea
                  placeholder='e.g. <path d="m9 18 6-6-6-6"/>'
                  value={customIconPath}
                  onChange={(e) => setCustomIconPath(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-950/60 border border-slate-800 rounded-lg outline-none text-slate-200 font-mono h-16 resize-none"
                />
              </div>

              {customIconError && (
                <div className="flex items-center gap-1.5 text-[9px] font-semibold text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{customIconError}</span>
                </div>
              )}

              <button
                onClick={handleAddCustomIcon}
                disabled={!customIconName.trim() || !customIconPath.trim()}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                Add to Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Center panel: Customization controls (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Styling Rules
            </span>
            
            {/* Color mapping */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500">Stroke Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 outline-none"
              >
                <option value="primary">Primary Brand</option>
                <option value="secondary">Secondary UI</option>
                <option value="accent">Accent Callout</option>
                <option value="success">Success State</option>
                <option value="warning">Warning State</option>
                <option value="error">Error State</option>
                <option value="info">Info State</option>
              </select>
            </div>

            {/* Size mapping */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500">Dimension Token</label>
              <div className="grid grid-cols-3 gap-1">
                {(['sizeSm', 'sizeMd', 'sizeLg'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setIconSizeKey(size)}
                    className="py-1 text-[10px] font-semibold border rounded-md bg-slate-950"
                    style={{
                      borderColor: iconSizeKey === size ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: iconSizeKey === size ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                    }}
                  >
                    {size === 'sizeSm' ? 'sm' : size === 'sizeMd' ? 'md' : 'lg'}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-500 block text-center font-mono mt-1">
                Size Value: {tokens.icons[iconSizeKey]}
              </span>
            </div>
            
            {/* Active stroke width display */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Stroke Width</span>
              <span className="text-xs font-mono font-semibold text-slate-300">{tokens.icons.strokeWidth}</span>
            </div>
          </div>
        </div>

        {/* Right panel: Active live icon view + Exporters (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-between h-full min-h-[360px]">
            <span className="text-xs font-bold text-white uppercase tracking-wider block self-start mb-4">
              Visualizer
            </span>
            
            {/* Live rendered icon */}
            <div className="p-8 rounded-2xl border border-slate-800/80 flex items-center justify-center bg-slate-950/40 w-32 h-32 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={tokens.icons[iconSizeKey]}
                height={tokens.icons[iconSizeKey]}
                viewBox="0 0 24 24"
                fill="none"
                stroke={tokens.colors[selectedColor][colorMode]}
                strokeWidth={tokens.icons.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: localIcons[selectedIcon] || '' }}
              />
            </div>

            {/* Exporter copy triggers */}
            <div className="w-full space-y-2 mt-6">
              <button
                onClick={handleCopyIconSvg}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 hover:border-slate-600 transition-all text-white bg-slate-900 active:scale-95"
              >
                {iconCopied === 'svg' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SVG Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SVG Code</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyIconJsx}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 active:scale-95"
              >
                {iconCopied === 'jsx' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>JSX Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy React JSX</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyFullLibrary}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-white bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 active:scale-95"
              >
                {iconCopied === 'library' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Full Library Copied!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                    <span>Copy React Library File</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
