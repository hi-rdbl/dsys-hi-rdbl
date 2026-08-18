import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';
import { 
  Copy, 
  Check, 
  Search, 
  Plus, 
  Sparkles, 
  AlertCircle, 
  Minimize2,
  RefreshCw,
  RotateCw,
  Download,
  Code,
  FileCode,
  CheckSquare,
  Square,
  Trash2,
  BookOpen,
  Import
} from 'lucide-react';

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

// 30+ Free-to-use Lucide vector icons library definitions
const FREE_ICON_LIBRARY: Record<string, string> = {
  // Navigation & Chevrons
  ChevronRight: '<path d="m9 18 6-6-6-6"/>',
  ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
  ChevronUp: '<path d="m18 15-6-6-6 6"/>',
  ChevronDown: '<path d="m6 9 6 6 6-6"/>',
  ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  ArrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  ArrowUp: '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
  ArrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  
  // Media & Controls
  Play: '<polygon points="5 3 19 12 5 21 5 3"/>',
  Pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
  Stop: '<rect x="4" y="4" width="16" height="16"/>',
  Volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',
  VolumeX: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
  Camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  Image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  
  // E-Commerce & Finance
  ShoppingCart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  ShoppingBag: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  CreditCard: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" x2="23" y1="10" y2="10"/>',
  DollarSign: '<line x1="12" x2="12" y1="1" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  Wallet: '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6z"/>',
  
  // Communication & Location
  Mail: '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  Phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  MessageSquare: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  Globe: '<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  MapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  
  // Security & Flags
  Lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  Unlock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  Key: '<path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6"/>',
  Shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  AlertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  
  // Files & Storage
  Folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  File: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>',
  Database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  Server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" x2="6" y1="6" y2="6"/><line x1="6" x2="6" y1="18" y2="18"/>',
  
  // Brands
  Github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  Twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>'
};

export const IconsTab: React.FC = () => {
  const { tokens, colorMode } = useDesignSystem();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // PERSISTENCE: Load brand icons from localStorage database
  const [localIcons, setLocalIcons] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('aura_custom_icons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ICON_PATHS;
  });

  const [selectedIcon, setSelectedIcon] = useState('Home');
  const [checkedIcons, setCheckedIcons] = useState<string[]>(() => Object.keys(localIcons));
  
  // Styling state controls
  const [selectedColor, setSelectedColor] = useState<'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'>('primary');
  const [iconSizeKey, setIconSizeKey] = useState<'sizeSm' | 'sizeMd' | 'sizeLg'>('sizeMd');
  
  // Copies and saving logs
  const [copiedState, setCopiedState] = useState<'svg' | 'jsx' | 'uri' | 'library' | 'saved' | 'imported' | null>(null);

  // SVG Studio canvas states
  const [rawSvgCode, setRawSvgCode] = useState('');
  const [bgMode, setBgMode] = useState<'grid' | 'white' | 'dark'>('grid');
  const [zoomLevel, setZoomLevel] = useState(120);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  // Search & custom input values
  const [searchQuery, setSearchQuery] = useState('');
  const [freeSearchQuery, setFreeSearchQuery] = useState('');
  const [customIconName, setCustomIconName] = useState('');
  const [customIconPath, setCustomIconPath] = useState('');
  const [customIconError, setCustomIconError] = useState('');

  // Persist updated icons database to localStorage
  useEffect(() => {
    localStorage.setItem('aura_custom_icons', JSON.stringify(localIcons));
  }, [localIcons]);

  // Inject current token variables to container styles
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    Object.entries(tokens.colors).forEach(([key, val]) => {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      el.style.setProperty(`--color-${kebabKey}`, val[colorMode]);
    });

    Object.entries(tokens.icons).forEach(([key, val]) => {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      el.style.setProperty(`--icon-${kebabKey}`, val);
    });
  }, [tokens, colorMode]);

  // Sync XML source input when loaded icon changes
  useEffect(() => {
    const path = localIcons[selectedIcon] || '';
    const stroke = tokens.icons.strokeWidth;
    const size = tokens.icons[iconSizeKey];
    const color = tokens.colors[selectedColor][colorMode];
    
    const initialXml = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
  ${path}
</svg>`;
    setRawSvgCode(initialXml);
  }, [selectedIcon, localIcons, iconSizeKey, selectedColor, tokens, colorMode]);

  const filteredIconKeys = Object.keys(localIcons).filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search through the packaged Free Lucide Icon list
  const filteredFreeIcons = Object.entries(FREE_ICON_LIBRARY).filter(([name]) =>
    name.toLowerCase().includes(freeSearchQuery.toLowerCase())
  );

  // Checkbox library toggle handlers
  const handleToggleIconChecked = (iconName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (checkedIcons.includes(iconName)) {
      setCheckedIcons(prev => prev.filter(name => name !== iconName));
    } else {
      setCheckedIcons(prev => [...prev, iconName]);
    }
  };

  const handleSelectAll = () => {
    setCheckedIcons(Object.keys(localIcons));
  };

  const handleDeselectAll = () => {
    setCheckedIcons([]);
  };

  // SVGO Minifier
  const handleOptimizeSvg = () => {
    let clean = rawSvgCode;
    clean = clean.replace(/<\?xml.*\?>/gi, '');
    clean = clean.replace(/<!DOCTYPE.*?>/gi, '');
    clean = clean.replace(/<!--[\s\S]*?-->/g, '');
    clean = clean.replace(/\sxmlns:[\w-]+=[\'\"].*?[\'\"]/g, '');
    clean = clean.replace(/\s(x|y|id|class|xml:space|enable-background|sketch:type)=[\'\"].*?[\'\"]/gi, '');
    clean = clean.replace(/(-?\d+\.\d{3,})/g, (val) => Number(val).toFixed(2));
    clean = clean.replace(/>\s+</g, '><');
    setRawSvgCode(clean.trim());
  };

  // XML Code Beautifier
  const handleBeautifySvg = () => {
    let raw = rawSvgCode.replace(/>\s+</g, '><').trim();
    let formatted = '';
    let reg = /(>)(<)(\/*)/g;
    raw = raw.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    
    raw.split('\r\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>$/)) {
        indent = 1;
      }
      formatted += '  '.repeat(pad) + node + '\r\n';
      pad += indent;
    });
    setRawSvgCode(formatted.trim());
  };

  // Replace colors in XML editor dynamically
  const handleSyncColors = () => {
    const activeColor = tokens.colors[selectedColor][colorMode];
    let code = rawSvgCode;
    code = code.replace(/stroke="[^"]*"/gi, `stroke="${activeColor}"`);
    setRawSvgCode(code);
  };

  // Update existing catalog entries with editor path changes
  const handleSaveToCatalog = () => {
    const match = rawSvgCode.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    if (match && match[1]) {
      setLocalIcons(prev => ({
        ...prev,
        [selectedIcon]: match[1].trim()
      }));
      setCopiedState('saved');
      setTimeout(() => setCopiedState(null), 1800);
    }
  };

  // Import a free Lucide/Feather icon directly into local database
  const handleImportFreeIcon = (iconName: string, pathData: string) => {
    if (localIcons[iconName]) {
      alert(`"${iconName}" is already present in your active library.`);
      return;
    }
    setLocalIcons(prev => ({
      ...prev,
      [iconName]: pathData
    }));
    setCheckedIcons(prev => [...prev, iconName]);
    setSelectedIcon(iconName);
    setCopiedState('imported');
  };

  const handleAddCustomIcon = () => {
    if (!customIconName.trim() || !customIconPath.trim()) return;
    
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

    setCheckedIcons(prev => [...prev, formattedName]);
    setSelectedIcon(formattedName);
    setCustomIconName('');
    setCustomIconPath('');
    setCustomIconError('');
  };

  // Delete an icon from active local library
  const handleDeleteIcon = (iconName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (Object.keys(localIcons).length <= 1) {
      alert("At least one icon must remain in the catalog library!");
      return;
    }
    const confirmDelete = window.confirm(`Remove "${iconName}" from your local database catalog?`);
    if (!confirmDelete) return;

    setLocalIcons(prev => {
      const updated = { ...prev };
      delete updated[iconName];
      return updated;
    });

    setCheckedIcons(prev => prev.filter(name => name !== iconName));
    if (selectedIcon === iconName) {
      const keys = Object.keys(localIcons).filter(k => k !== iconName);
      setSelectedIcon(keys[0]);
    }
  };

  // Exporters
  const handleCopyRawSvg = () => {
    navigator.clipboard.writeText(rawSvgCode);
    setCopiedState('svg');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleCopyReactJsx = () => {
    const match = rawSvgCode.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    const innerPath = match && match[1] ? match[1].trim() : '';
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
    ${innerPath}
  </svg>
);`;
    navigator.clipboard.writeText(jsxCode);
    setCopiedState('jsx');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleCopyDataUri = () => {
    const encoded = encodeURIComponent(rawSvgCode)
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");
    const uri = `data:image/svg+xml;utf8,${encoded}`;
    navigator.clipboard.writeText(uri);
    setCopiedState('uri');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleDownloadSvgFile = () => {
    const blob = new Blob([rawSvgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedIcon.toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportSelectedLibrary = () => {
    if (checkedIcons.length === 0) {
      alert("Please select at least one icon checkbox in the catalog!");
      return;
    }
    const header = `import React from 'react';

// ==========================================================================
// Aura UI Design System - Exported Selected Icon Library Module
// Generated: ${new Date().toISOString().split('T')[0]}
// ==========================================================================

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

`;
    const body = checkedIcons.map((name) => {
      const path = localIcons[name] || '';
      return `export const ${name}Icon: React.FC<IconProps> = ({ className = '', style = {} }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    style={{
      width: 'var(--icon-size-md)',
      height: 'var(--icon-size-md)',
      stroke: 'var(--color-primary)',
      strokeWidth: 'var(--icon-stroke)',
      ...style,
    }}
  >
    ${path}
  </svg>
);`;
    }).join('\n\n');

    navigator.clipboard.writeText(header + body);
    setCopiedState('library');
    setTimeout(() => setCopiedState(null), 2500);
  };

  // SVG grid backdrop styles
  const gridStyle = bgMode === 'grid' 
    ? {
        backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.18) 1px, transparent 0)',
        backgroundSize: '12px 12px',
        backgroundColor: colorMode === 'dark' ? '#0f172a' : '#f8fafc'
      }
    : bgMode === 'white'
    ? { backgroundColor: '#ffffff' }
    : { backgroundColor: '#020617' };

  return (
    <div ref={containerRef} className="space-y-8 animate-fadeIn">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">SVG Viewer & Icon Studio</h1>
          <p className="text-slate-500 text-sm">
            Professional dual-pane vector graphics workstation. Customize codes, search free Lucide libraries, and compile selected icons into your system.
          </p>
        </div>

        {/* Selected Library Code Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportSelectedLibrary}
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold rounded-xl text-white flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            {copiedState === 'library' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Selected Library Copied!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Export Library ({checkedIcons.length} Checked)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DUAL PANE SVG WORKSTATION STUDIO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANE: SVG Code Editor & Operations (7 Columns) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="glass-panel p-5 rounded-2xl space-y-4 flex flex-col">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  SVG XML Source Code
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Active: {selectedIcon}
              </span>
            </div>

            {/* Code editor textarea */}
            <div className="relative">
              <textarea
                value={rawSvgCode}
                onChange={(e) => setRawSvgCode(e.target.value)}
                spellCheck={false}
                className="w-full h-80 p-5 bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed border border-slate-800 rounded-xl outline-none focus:ring-1 focus:ring-slate-700 resize-none overflow-y-auto"
              />
            </div>

            {/* Quick Operations Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 justify-between">
              
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={handleBeautifySvg}
                  title="Format Code Layout"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-700 flex items-center gap-1 transition-all"
                >
                  <FileCode className="w-3 h-3 text-slate-500" />
                  <span>Beautify</span>
                </button>

                <button
                  onClick={handleOptimizeSvg}
                  title="Minify and Clean XML tags"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-700 flex items-center gap-1 transition-all"
                >
                  <Minimize2 className="w-3 h-3 text-slate-500" />
                  <span>Clean/Optimize</span>
                </button>

                <button
                  onClick={handleSyncColors}
                  title="Force replace fill/stroke codes to match active token color"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-700 flex items-center gap-1 transition-all"
                >
                  <RefreshCw className="w-3 h-3 text-slate-500" />
                  <span>Sync Color</span>
                </button>
              </div>

              {/* Save changes back to state */}
              <button
                onClick={handleSaveToCatalog}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-[10px] font-bold rounded-lg text-white transition-all active:scale-95"
              >
                {copiedState === 'saved' ? 'Saved to Catalog!' : 'Save changes to catalog'}
              </button>

            </div>

          </div>
        </div>

        {/* RIGHT PANE: Live Visualizer & Studio Control (5 Columns) */}
        <div className="xl:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Visual Studio Canvas
              </span>

              {/* Background modes */}
              <div className="flex border border-slate-200 bg-white rounded-lg p-0.5 shadow-sm text-[9px] font-extrabold">
                <button
                  onClick={() => setBgMode('grid')}
                  className={`px-2 py-1 rounded ${bgMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setBgMode('white')}
                  className={`px-2 py-1 rounded ${bgMode === 'white' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                >
                  Light
                </button>
                <button
                  onClick={() => setBgMode('dark')}
                  className={`px-2 py-1 rounded ${bgMode === 'dark' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Visualizer output box */}
            <div 
              className="w-full h-56 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={gridStyle}
            >
              <div 
                className="transition-all duration-150 flex items-center justify-center"
                style={{
                  transform: `rotate(${rotateAngle}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1}) scale(${zoomLevel / 100})`,
                }}
                dangerouslySetInnerHTML={{ __html: rawSvgCode }}
              />
              
              <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-slate-400/80 bg-slate-900/10 px-1.5 py-0.5 rounded">
                Scale: {zoomLevel}% | Rot: {rotateAngle}°
              </div>
            </div>

            {/* Controls panel: Zoom, Rotate, Flip */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              
              {/* Zoom Slider */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-slate-500">Zoom Canvas</span>
                <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                  <span className="font-mono text-[10px] w-8 text-right font-bold text-slate-600">{zoomLevel}%</span>
                </div>
              </div>

              {/* Transformations buttons */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-bold text-slate-500">Transforms</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRotateAngle((prev) => (prev + 90) % 360)}
                    className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-90 transition-all flex items-center gap-1 text-[10px] font-bold text-slate-600"
                    title="Rotate clockwise"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Rotate</span>
                  </button>

                  <button
                    onClick={() => setFlipH(!flipH)}
                    className={`p-1.5 border rounded-lg active:scale-90 transition-all text-[10px] font-bold ${
                      flipH ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Flip H
                  </button>

                  <button
                    onClick={() => setFlipV(!flipV)}
                    className={`p-1.5 border rounded-lg active:scale-90 transition-all text-[10px] font-bold ${
                      flipV ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Flip V
                  </button>
                </div>
              </div>

              {/* Dimensions and color binding */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-extrabold text-slate-400">Color Token</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 outline-none font-bold"
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

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-extrabold text-slate-400">Dimension</label>
                  <select
                    value={iconSizeKey}
                    onChange={(e) => setIconSizeKey(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 outline-none font-bold"
                  >
                    <option value="sizeSm">Small ({tokens.icons.sizeSm})</option>
                    <option value="sizeMd">Medium ({tokens.icons.sizeMd})</option>
                    <option value="sizeLg">Large ({tokens.icons.sizeLg})</option>
                  </select>
                </div>
              </div>

              {/* Exporters code triggers */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <button
                  onClick={handleCopyRawSvg}
                  className="py-2 rounded-lg text-xs font-bold text-center border border-slate-700 text-white bg-slate-900 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  {copiedState === 'svg' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SVG</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyReactJsx}
                  className="py-2 rounded-lg text-xs font-bold text-center border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-slate-700"
                >
                  {copiedState === 'jsx' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSX</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyDataUri}
                  className="py-2 rounded-lg text-xs font-bold text-center border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-slate-700"
                >
                  {copiedState === 'uri' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Data URI</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadSvgFile}
                  className="py-2 rounded-lg text-xs font-bold text-center border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download SVG</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ICON SELECTION CATALOG GRID (With checkboxes & Solid Fallback Stroke Colors) */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">My Brand Library Catalog</h3>
            <p className="text-[10px] text-slate-400">
              Select or deselect icons to configure what goes into your exported library. Click card to load into XML studio.
            </p>
          </div>

          {/* Catalog Operations */}
          <div className="flex flex-wrap items-center gap-3">
            {copiedState === 'imported' && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                Icon added successfully!
              </span>
            )}
            
            <div className="flex border border-slate-200 bg-white rounded-lg p-0.5 text-[10px] font-extrabold shadow-sm">
              <button
                onClick={handleSelectAll}
                className="px-2.5 py-1 rounded text-slate-700 hover:bg-slate-50"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-2.5 py-1 rounded text-slate-700 hover:bg-slate-50"
              >
                Deselect All
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-lg outline-none text-xs font-bold text-slate-700 max-w-[150px]"
              />
            </div>
          </div>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {filteredIconKeys.map((iconName) => {
            const isSelected = selectedIcon === iconName;
            const isChecked = checkedIcons.includes(iconName);
            const path = localIcons[iconName];
            return (
              <div
                key={iconName}
                onClick={() => setSelectedIcon(iconName)}
                className="p-4 border rounded-xl flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all hover:shadow-sm relative select-none"
                style={{
                  borderColor: isSelected ? 'var(--color-primary, #6366f1)' : 'var(--color-border, #e2e8f0)',
                  backgroundColor: isSelected ? 'var(--color-primary-12, rgba(99, 102, 241, 0.05))' : 'transparent',
                }}
              >
                {/* Checkbox toggle inside card */}
                <button
                  onClick={(e) => handleToggleIconChecked(iconName, e)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-[var(--color-primary,#4f46e5)] fill-slate-50" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300" />
                  )}
                </button>

                {/* Delete button (only show if catalog has > 1 item) */}
                <button
                  onClick={(e) => handleDeleteIcon(iconName, e)}
                  className="absolute bottom-2 right-2 opacity-0 hover:opacity-100 group-hover:opacity-100 text-rose-500 hover:text-rose-700 transition-opacity p-0.5"
                  title="Remove from database"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* SVG Visualizer wrapper with safe dynamic fallback strokes */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isSelected ? 'var(--color-primary, #6366f1)' : 'var(--color-text-muted, #64748b)'}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: path }}
                />
                <span className="text-[10px] font-extrabold truncate w-full text-slate-600 text-center">
                  {iconName}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* DISCOVERY: SEARCH & IMPORT FREE LUCIDE ICONS (Local Database Sync) */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Browse & Import Free Lucide Icons</h3>
              <p className="text-[10px] text-slate-400">
                Search through our catalog of free-to-use vector assets and click to import them directly to your local workspace database.
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search free icons..."
              value={freeSearchQuery}
              onChange={(e) => setFreeSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg outline-none text-xs font-bold text-slate-700 max-w-[200px]"
            />
          </div>
        </div>

        {/* Free search result catalog */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[220px] overflow-y-auto pr-1">
          {filteredFreeIcons.map(([name, path]) => {
            const isAlreadyAdded = !!localIcons[name];
            return (
              <div
                key={name}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 relative select-none transition-all ${
                  isAlreadyAdded ? 'opacity-50 bg-slate-50 border-dashed border-slate-200' : 'hover:shadow-sm hover:bg-slate-50'
                }`}
              >
                {/* SVG render */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: path }}
                />
                
                <span className="text-[9px] font-extrabold text-slate-500 truncate w-full text-center">
                  {name}
                </span>

                {/* Import trigger */}
                {isAlreadyAdded ? (
                  <span className="text-[8px] font-bold text-slate-400 absolute top-1 right-1 px-1 bg-slate-200/50 rounded">
                    Added
                  </span>
                ) : (
                  <button
                    onClick={() => handleImportFreeIcon(name, path)}
                    className="absolute top-1.5 right-1.5 text-indigo-600 hover:text-indigo-800 transition-colors p-0.5 bg-indigo-50 hover:bg-indigo-100 rounded"
                    title="Import to brand library"
                  >
                    <Import className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          {filteredFreeIcons.length === 0 && (
            <div className="col-span-8 text-center py-8 text-xs text-slate-400">
              No matching Lucide icons found in free database query.
            </div>
          )}
        </div>

      </div>

      {/* SVG Vector Path Injector */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Plus className="w-4.5 h-4.5 text-indigo-500" />
          <h3 className="text-sm font-extrabold text-slate-800">Inject Custom SVG Vector Asset</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Icon Name</label>
            <input
              type="text"
              placeholder="e.g. ChevronRight, Heart"
              value={customIconName}
              onChange={(e) => setCustomIconName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none text-slate-700 font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">SVG Inner Path Elements</label>
            <input
              type="text"
              placeholder='e.g. <path d="m9 18 6-6-6-6"/>'
              value={customIconPath}
              onChange={(e) => setCustomIconPath(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none text-slate-700 font-mono"
            />
          </div>

          <div>
            <button
              onClick={handleAddCustomIcon}
              disabled={!customIconName.trim() || !customIconPath.trim()}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-lg text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-sm"
            >
              Add to Catalog
            </button>
          </div>
        </div>

        {customIconError && (
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-rose-500 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{customIconError}</span>
          </div>
        )}
      </div>

    </div>
  );
};
