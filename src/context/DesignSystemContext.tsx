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
  updateMotion: (key: keyof DesignTokens['motion'], value: string) => void;
  updateIconToken: (key: keyof DesignTokens['icons'], value: string) => void;
  updateMetadata: (key: 'name' | 'author' | 'description' | 'version', value: string) => void;
  loadPreset: (presetId: string) => void;
  importTokens: (jsonStr: string) => { success: boolean; error?: string };
  getShareUrl: () => string;
  toggleColorMode: () => void;
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

  const updateMotion = (key: keyof DesignTokens['motion'], value: string) => {
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

          // Rebuild DesignTokens shape
          importedTokens = {
            name: metadataObj.name || 'Imported Design Tokens',
            author: metadataObj.author || 'Imported User',
            description: metadataObj.description || 'Imported via JSON upload',
            version: metadataObj.version || '1.0.0',
            targetFramework: 'react-tailwind',
            colors: {
              primary: { light: colorObj.brand?.primary?.light?.$value || '#6366f1', dark: colorObj.brand?.primary?.dark?.$value || '#818cf8', description: 'Brand primary' },
              primaryHover: { light: colorObj.brand?.primaryHover?.light?.$value || '#4f46e5', dark: colorObj.brand?.primaryHover?.dark?.$value || '#6366f1', description: 'Brand primary hover' },
              secondary: { light: colorObj.brand?.secondary?.light?.$value || '#64748b', dark: colorObj.brand?.secondary?.dark?.$value || '#94a3b8', description: 'Secondary UI' },
              secondaryHover: { light: colorObj.brand?.secondaryHover?.light?.$value || '#475569', dark: colorObj.brand?.secondaryHover?.dark?.$value || '#cbd5e1', description: 'Secondary UI hover' },
              accent: { light: colorObj.brand?.accent?.light?.$value || '#a855f7', dark: colorObj.brand?.accent?.dark?.$value || '#c084fc', description: 'Accent' },
              bg: { light: colorObj.surface?.bg?.light?.$value || '#f8fafc', dark: colorObj.surface?.bg?.dark?.$value || '#0b0f19', description: 'Background' },
              card: { light: colorObj.surface?.card?.light?.$value || '#ffffff', dark: colorObj.surface?.card?.dark?.$value || '#111827', description: 'Card Surface' },
              border: { light: colorObj.surface?.border?.light?.$value || '#e2e8f0', dark: colorObj.surface?.border?.dark?.$value || '#1f2937', description: 'Borders' },
              text: { light: colorObj.text?.main?.light?.$value || '#0f172a', dark: colorObj.text?.main?.dark?.$value || '#f8fafc', description: 'Text main' },
              textMuted: { light: colorObj.text?.muted?.light?.$value || '#64748b', dark: colorObj.text?.muted?.dark?.$value || '#94a3b8', description: 'Text muted' },
              success: { light: colorObj.feedback?.success?.light?.$value || '#10b981', dark: colorObj.feedback?.success?.dark?.$value || '#34d399', description: 'Success' },
              warning: { light: colorObj.feedback?.warning?.light?.$value || '#f59e0b', dark: colorObj.feedback?.warning?.dark?.$value || '#fbbf24', description: 'Warning' },
              error: { light: colorObj.feedback?.error?.light?.$value || '#ef4444', dark: colorObj.feedback?.error?.dark?.$value || '#f87171', description: 'Error' },
              info: { light: colorObj.feedback?.info?.light?.$value || '#3b82f6', dark: colorObj.feedback?.info?.dark?.$value || '#60a5fa', description: 'Info' },
            },
            typography: {
              fontFamily: typographyObj.family?.$value || "'Inter', sans-serif",
              baseSize: parseInt(typographyObj.baseSize?.$value) || 16,
              scaleFactor: 1.2,
              lineHeight: typographyObj.lineHeight?.$value || '1.5',
              letterSpacing: typographyObj.letterSpacing?.$value || '-0.011em',
            },
            spacing: {
              baseUnit: 4,
              scale: [1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
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
              focus: shadowObj.focus?.$value || '0 0 0 4px rgba(99,102,241,0.5)',
            },
            motion: {
              durationFast: motionObj.duration?.fast?.$value || '150ms',
              durationNormal: motionObj.duration?.normal?.$value || '250ms',
              durationSlow: motionObj.duration?.slow?.$value || '400ms',
              easeDefault: motionObj.easing?.default?.$value || 'ease',
              easeIn: motionObj.easing?.in?.$value || 'ease-in',
              easeOut: motionObj.easing?.out?.$value || 'ease-out',
              easeInOut: motionObj.easing?.easeInOut?.$value || 'ease-in-out',
            },
            icons: {
              sizeSm: parsed.icons?.sizeSm || '14px',
              sizeMd: parsed.icons?.sizeMd || '18px',
              sizeLg: parsed.icons?.sizeLg || '24px',
              strokeWidth: parsed.icons?.strokeWidth || '1.5px',
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
