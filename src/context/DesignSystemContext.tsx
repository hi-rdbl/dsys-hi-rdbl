import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DesignTokens, DesignSystemPreset, ColorMode } from '../types';
import { presets } from '../utils/presets';
import { decodeTokens, encodeTokens } from '../utils/share';

interface DesignSystemContextType {
  tokens: DesignTokens;
  activePresetId: string;
  colorMode: ColorMode;
  presetsList: DesignSystemPreset[];
  updateColorToken: (key: keyof DesignTokens['colors'], mode: ColorMode, value: string) => void;
  updateTypography: (key: keyof DesignTokens['typography'], value: string | number) => void;
  updateSpacing: (baseUnit: number) => void;
  updateRadius: (key: keyof DesignTokens['radius'], value: string) => void;
  updateShadow: (key: keyof DesignTokens['shadows'], value: string) => void;
  updateMotion: (key: keyof DesignTokens['motion'], value: string | number) => void;
  updateIconToken: (key: keyof DesignTokens['icons'], value: string) => void;
  updateMetadata: (key: 'name' | 'author' | 'description' | 'version', value: string) => void;
  loadPreset: (presetId: string) => void;
  importTokens: (jsonStr: string) => { success: boolean; error?: string };
  getShareUrl: () => string;
  toggleColorMode: () => void;
  addColorToken: (key: string, light: string, dark: string, description?: string) => void;
  deleteColorToken: (key: string) => void;
  updateSpacingScale: (scale: number[]) => void;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export const DesignSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultPreset = presets[0];
  const [tokens, setTokens] = useState<DesignTokens>(JSON.parse(JSON.stringify(defaultPreset.tokens)));
  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  // Check URL on startup for shared config
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('share');
    if (sharedData) {
      const decoded = decodeTokens(sharedData);
      if (decoded) {
        setTokens(decoded);
        setActivePresetId('custom-shared');
        // Trigger a nice console flag
        console.log('Successfully loaded shared design tokens from URL!');
      }
    }
  }, []);

  const updateColorToken = (key: keyof DesignTokens['colors'], mode: ColorMode, value: string) => {
    setTokens((prev) => {
      const newColors = { ...prev.colors };
      newColors[key] = {
        ...newColors[key],
        [mode]: value,
      };
      return {
        ...prev,
        colors: newColors,
      };
    });
    setActivePresetId('custom');
  };

  const updateTypography = (key: keyof DesignTokens['typography'], value: string | number) => {
    setTokens((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
    setActivePresetId('custom');
  };

  const updateSpacing = (baseUnit: number) => {
    setTokens((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        baseUnit,
      },
    }));
    setActivePresetId('custom');
  };

  const updateRadius = (key: keyof DesignTokens['radius'], value: string) => {
    setTokens((prev) => ({
      ...prev,
      radius: {
        ...prev.radius,
        [key]: value,
      },
    }));
    setActivePresetId('custom');
  };

  const updateShadow = (key: keyof DesignTokens['shadows'], value: string) => {
    setTokens((prev) => ({
      ...prev,
      shadows: {
        ...prev.shadows,
        [key]: value,
      },
    }));
    setActivePresetId('custom');
  };

  const updateMotion = (key: keyof DesignTokens['motion'], value: string | number) => {
    setTokens((prev) => ({
      ...prev,
      motion: {
        ...prev.motion,
        [key]: value,
      },
    }));
    setActivePresetId('custom');
  };

  const updateIconToken = (key: keyof DesignTokens['icons'], value: string) => {
    setTokens((prev) => ({
      ...prev,
      icons: {
        ...prev.icons,
        [key]: value,
      },
    }));
    setActivePresetId('custom');
  };

  const updateMetadata = (key: 'name' | 'author' | 'description' | 'version', value: string) => {
    setTokens((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const loadPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setTokens(JSON.parse(JSON.stringify(preset.tokens)));
      setActivePresetId(presetId);
    }
  };

  const importTokens = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      // Basic duck-typing check
      if (parsed && typeof parsed === 'object') {
        let importedTokens: DesignTokens;
        
        // If it's a raw tokens.json file (W3C standard format structure we exported)
        if (parsed.color && parsed.typography && parsed.radius) {
          const colorObj = parsed.color;
          const typographyObj = parsed.typography;
          const radiusObj = parsed.radius;
          const shadowObj = parsed.shadow || {};
          const motionObj = parsed.motion || {};
          const metadataObj = parsed.metadata || {};

          // Rebuild colors dynamically to support custom colors!
          const colors: Record<string, any> = {};
          
          // Backwards compatibility: Check if it's nested under legacy namespaces
          if (colorObj.brand || colorObj.surface || colorObj.text || colorObj.feedback) {
            const getVal = (path: string[], fallback: string) => {
              let curr = colorObj;
              for (const p of path) {
                if (curr && curr[p]) curr = curr[p];
                else return fallback;
              }
              return curr.$value || fallback;
            };

            colors.primary = { light: getVal(['brand', 'primary', 'light'], '#6366f1'), dark: getVal(['brand', 'primary', 'dark'], '#818cf8'), description: 'Brand primary' };
            colors.primaryHover = { light: getVal(['brand', 'primaryHover', 'light'], '#4f46e5'), dark: getVal(['brand', 'primaryHover', 'dark'], '#6366f1'), description: 'Brand primary hover' };
            colors.secondary = { light: getVal(['brand', 'secondary', 'light'], '#64748b'), dark: getVal(['brand', 'secondary', 'dark'], '#94a3b8'), description: 'Secondary UI' };
            colors.secondaryHover = { light: getVal(['brand', 'secondaryHover', 'light'], '#475569'), dark: getVal(['brand', 'secondaryHover', 'dark'], '#cbd5e1'), description: 'Secondary UI hover' };
            colors.accent = { light: getVal(['brand', 'accent', 'light'], '#a855f7'), dark: getVal(['brand', 'accent', 'dark'], '#c084fc'), description: 'Accent' };
            colors.bg = { light: getVal(['surface', 'bg', 'light'], '#f8fafc'), dark: getVal(['surface', 'bg', 'dark'], '#0b0f19'), description: 'Background' };
            colors.card = { light: getVal(['surface', 'card', 'light'], '#ffffff'), dark: getVal(['surface', 'card', 'dark'], '#111827'), description: 'Card Surface' };
            colors.border = { light: getVal(['surface', 'border', 'light'], '#e2e8f0'), dark: getVal(['surface', 'border', 'dark'], '#1f2937'), description: 'Borders' };
            colors.text = { light: getVal(['text', 'main', 'light'], '#0f172a'), dark: getVal(['text', 'main', 'dark'], '#f8fafc'), description: 'Text main' };
            colors.textMuted = { light: getVal(['text', 'muted', 'light'], '#64748b'), dark: getVal(['text', 'muted', 'dark'], '#94a3b8'), description: 'Text muted' };
            colors.success = { light: getVal(['feedback', 'success', 'light'], '#10b981'), dark: getVal(['feedback', 'success', 'dark'], '#34d399'), description: 'Success' };
            colors.warning = { light: getVal(['feedback', 'warning', 'light'], '#f59e0b'), dark: getVal(['feedback', 'warning', 'dark'], '#fbbf24'), description: 'Warning' };
            colors.error = { light: getVal(['feedback', 'error', 'light'], '#ef4444'), dark: getVal(['feedback', 'error', 'dark'], '#f87171'), description: 'Error' };
            colors.info = { light: getVal(['feedback', 'info', 'light'], '#3b82f6'), dark: getVal(['feedback', 'info', 'dark'], '#60a5fa'), description: 'Info' };
          } else {
            // Flat custom-color structure we generate and export
            Object.entries(colorObj).forEach(([key, val]: [string, any]) => {
              colors[key] = {
                light: val.light?.$value || '#6366f1',
                dark: val.dark?.$value || '#818cf8',
                description: val.light?.$description || `${key} color`
              };
            });
          }

          // Safe fallback checking for all variables
          importedTokens = {
            name: metadataObj.name || 'Imported Design Tokens',
            author: metadataObj.author || 'Imported User',
            description: metadataObj.description || 'Imported via JSON upload',
            version: metadataObj.version || '1.0.0',
            targetFramework: 'react-tailwind',
            colors: colors as any,
            typography: {
              fontFamily: typographyObj.family?.$value || "'Inter', sans-serif",
              baseSize: parseInt(typographyObj.baseSize?.$value) || 16,
              scaleFactor: parseFloat(typographyObj.scaleFactor?.$value) || 1.2,
              lineHeight: typographyObj.lineHeight?.$value || '1.5',
              letterSpacing: typographyObj.letterSpacing?.$value || '-0.011em',
            },
            spacing: {
              baseUnit: parseInt(parsed.spacing?.baseUnit?.$value) || 4,
              scale: parsed.spacing?.scale?.$value || [1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
            },
            radius: {
              none: radiusObj.none?.$value || '0px',
              xs: radiusObj.xs?.$value || '2px',
              sm: radiusObj.sm?.$value || '4px',
              md: radiusObj.md?.$value || '6px',
              lg: radiusObj.lg?.$value || '8px',
              xl: radiusObj.xl?.$value || '12px',
              xxl: radiusObj.xxl?.$value || '16px',
              full: radiusObj.full?.$value || '9999px',
              button: radiusObj.button?.$value || 'var(--radius-md)',
            },
            shadows: {
              none: shadowObj.none?.$value || 'none',
              sm: shadowObj.sm?.$value || '0 1px 2px 0 rgba(0,0,0,0.05)',
              md: shadowObj.md?.$value || '0 4px 6px -1px rgba(0,0,0,0.1)',
              lg: shadowObj.lg?.$value || '0 10px 15px -3px rgba(0,0,0,0.1)',
              xl: shadowObj.xl?.$value || '0 20px 25px -5px rgba(0,0,0,0.1)',
              focus: shadowObj.focus?.$value || '0 0 0 2px #fff, 0 0 0 4px #6366f1',
            },
            motion: {
              durationFast: motionObj.duration?.fast?.$value || '150ms',
              durationNormal: motionObj.duration?.normal?.$value || '250ms',
              durationSlow: motionObj.duration?.slow?.$value || '400ms',
              easeDefault: motionObj.easing?.default?.$value || 'ease',
              easeIn: motionObj.easing?.in?.$value || 'ease-in',
              easeOut: motionObj.easing?.out?.$value || 'ease-out',
              easeInOut: motionObj.easing?.easeInOut?.$value || 'ease-in-out',
              buttonHoverScale: parseFloat(motionObj.buttonHoverScale?.$value || parsed.motion?.buttonHoverScale) || 1.02,
              buttonActiveScale: parseFloat(motionObj.buttonActiveScale?.$value || parsed.motion?.buttonActiveScale) || 0.96,
              buttonHoverEffect: motionObj.buttonHoverEffect?.$value || parsed.motion?.buttonHoverEffect || 'scale',
              buttonActiveEffect: motionObj.buttonActiveEffect?.$value || parsed.motion?.buttonActiveEffect || 'shrink',
            },
            icons: {
              sizeSm: parsed.icons?.sizeSm?.$value || parsed.icons?.sizeSm || '14px',
              sizeMd: parsed.icons?.sizeMd?.$value || parsed.icons?.sizeMd || '18px',
              sizeLg: parsed.icons?.sizeLg?.$value || parsed.icons?.sizeLg || '24px',
              strokeWidth: parsed.icons?.strokeWidth?.$value || parsed.icons?.strokeWidth || '1.5px',
            },
          };
        } else {
          // If it matches DesignTokens shape directly
          importedTokens = parsed as DesignTokens;
        }

        setTokens(importedTokens);
        setActivePresetId('custom-imported');
        return { success: true };
      }
      return { success: false, error: 'JSON format is invalid.' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to parse JSON.' };
    }
  };

  const getShareUrl = (): string => {
    const encoded = encodeTokens(tokens);
    const url = new URL(window.location.href);
    url.searchParams.set('share', encoded);
    return url.toString();
  };

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addColorToken = (key: string, light: string, dark: string, description: string = '') => {
    const formattedKey = key.replace(/[^a-zA-Z0-9]/g, '').replace(/^\w/, (c) => c.toLowerCase());
    setTokens((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [formattedKey]: { light, dark, description }
      }
    }));
    setActivePresetId('custom');
  };

  const deleteColorToken = (key: string) => {
    setTokens((prev) => {
      const newColors = { ...prev.colors };
      delete newColors[key];
      return {
        ...prev,
        colors: newColors
      };
    });
    setActivePresetId('custom');
  };

  const updateSpacingScale = (scale: number[]) => {
    setTokens((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        scale
      }
    }));
    setActivePresetId('custom');
  };

  return (
    <DesignSystemContext.Provider
      value={{
        tokens,
        activePresetId,
        colorMode,
        presetsList: presets,
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
        getShareUrl,
        toggleColorMode,
        addColorToken,
        deleteColorToken,
        updateSpacingScale,
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
};
