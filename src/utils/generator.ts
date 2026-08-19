import type { DesignTokens } from '../types';

/**
 * Generates W3C Standard design tokens JSON file.
 */
export const generateTokensJson = (tokens: DesignTokens): string => {
  const result = {
    metadata: {
      name: tokens.name,
      author: tokens.author,
      description: tokens.description,
      version: tokens.version,
      generatedAt: new Date().toISOString(),
    },
    color: Object.fromEntries(
      Object.entries(tokens.colors).map(([key, token]) => [
        key,
        {
          light: { $value: token.light, $type: 'color', $description: token.description },
          dark: { $value: token.dark, $type: 'color' }
        }
      ])
    ),
    typography: {
      family: { $value: tokens.typography.fontFamily, $type: 'fontFamily' },
      baseSize: { $value: `${tokens.typography.baseSize}px`, $type: 'dimension' },
      lineHeight: { $value: tokens.typography.lineHeight, $type: 'dimension' },
      letterSpacing: { $value: tokens.typography.letterSpacing, $type: 'dimension' },
    },
    spacing: {
      baseUnit: { $value: tokens.spacing.baseUnit, $type: 'dimension' },
      scale: { $value: tokens.spacing.scale, $type: 'custom' }
    },
    radius: Object.fromEntries(
      Object.entries(tokens.radius).map(([key, val]) => [key, { $value: val, $type: 'dimension' }])
    ),
    shadow: Object.fromEntries(
      Object.entries(tokens.shadows).map(([key, val]) => [key, { $value: val, $type: 'shadow' }])
    ),
    motion: {
      duration: {
        fast: { $value: tokens.motion.durationFast, $type: 'duration' },
        normal: { $value: tokens.motion.durationNormal, $type: 'duration' },
        slow: { $value: tokens.motion.durationSlow, $type: 'duration' },
      },
      easing: {
        default: { $value: tokens.motion.easeDefault, $type: 'cubic-bezier' },
        in: { $value: tokens.motion.easeIn, $type: 'cubic-bezier' },
        out: { $value: tokens.motion.easeOut, $type: 'cubic-bezier' },
        easeInOut: { $value: tokens.motion.easeInOut, $type: 'cubic-bezier' },
      },
    },
    icons: {
      sizeSm: { $value: tokens.icons.sizeSm, $type: 'dimension' },
      sizeMd: { $value: tokens.icons.sizeMd, $type: 'dimension' },
      sizeLg: { $value: tokens.icons.sizeLg, $type: 'dimension' },
      strokeWidth: { $value: tokens.icons.strokeWidth, $type: 'dimension' },
    },
  };

  return JSON.stringify(result, null, 2);
};

/**
 * Generates variables.css for CSS Custom Properties.
 */
export const generateCssVariables = (tokens: DesignTokens): string => {
  const baseSpacing = tokens.spacing.baseUnit;

  const lightColors = Object.entries(tokens.colors)
    .map(([key, token]) => `  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${token.light};`)
    .join('\n');

  const darkColors = Object.entries(tokens.colors)
    .map(([key, token]) => `  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${token.dark};`)
    .join('\n');

  const radii = Object.entries(tokens.radius)
    .map(([key, val]) => `  --radius-${key}: ${val};`)
    .join('\n');

  const shadows = Object.entries(tokens.shadows)
    .map(([key, val]) => `  --shadow-${key}: ${val};`)
    .join('\n');

  const spacing = tokens.spacing.scale
    .map((multiplier) => `  --spacing-${multiplier}: ${baseSpacing * multiplier}px;`)
    .join('\n');

  return `/* 
 * CSS Variables generated from ${tokens.name} by ${tokens.author}
 * Supporting theme switches via '.dark' class toggle on root.
 */

:root {
  /* Fonts */
  --font-sans: ${tokens.typography.fontFamily};

  /* Colors (Light Theme) */
${lightColors}

  /* Border Radii */
${radii}

  /* Shadows */
${shadows}

  /* Spacing Scale (Base unit: ${baseSpacing}px) */
${spacing}

  /* Motion */
  --motion-duration-fast: ${tokens.motion.durationFast};
  --motion-duration-normal: ${tokens.motion.durationNormal};
  --motion-duration-slow: ${tokens.motion.durationSlow};
  --motion-ease-default: ${tokens.motion.easeDefault};
  --motion-ease-in: ${tokens.motion.easeIn};
  --motion-ease-out: ${tokens.motion.easeOut};
  --motion-ease-in-out: ${tokens.motion.easeInOut};

  /* Icons */
  --icon-size-sm: ${tokens.icons.sizeSm};
  --icon-size-md: ${tokens.icons.sizeMd};
  --icon-size-lg: ${tokens.icons.sizeLg};
  --icon-stroke: ${tokens.icons.strokeWidth};
}

.dark {
  /* Colors (Dark Theme) Override */
${darkColors}
}
`;
};

/**
 * Generates tailwind.config.js mapped to custom properties.
 */
export const generateTailwindConfig = (tokens: DesignTokens): string => {
  const colorMappings = Object.keys(tokens.colors)
    .map((key) => {
      const kebabName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `        '${key}': 'var(--color-${kebabName})',`;
    })
    .join('\n');

  const spacingMappings = tokens.spacing.scale
    .map((multiplier) => `        'token-${multiplier}': 'var(--spacing-${multiplier})',`)
    .join('\n');

  const radiusMappings = Object.keys(tokens.radius)
    .map((key) => `        '${key}': 'var(--radius-${key})',`)
    .join('\n');

  const shadowMappings = Object.keys(tokens.shadows)
    .map((key) => `        '${key}': 'var(--shadow-${key})',`)
    .join('\n');

  return `/** @type {import('tailwindcss').Config} */
// Mapped configuration generated from ${tokens.name}
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
${colorMappings}
      },
      spacing: {
${spacingMappings}
      },
      borderRadius: {
${radiusMappings}
      },
      boxShadow: {
${shadowMappings}
      },
      transitionDuration: {
        fast: 'var(--motion-duration-fast)',
        normal: 'var(--motion-duration-normal)',
        slow: 'var(--motion-duration-slow)',
      },
      transitionTimingFunction: {
        default: 'var(--motion-ease-default)',
        'in-out-custom': 'var(--motion-ease-in-out)',
      },
      width: {
        'icon-sm': 'var(--icon-size-sm)',
        'icon-md': 'var(--icon-size-md)',
        'icon-lg': 'var(--icon-size-lg)',
      },
      height: {
        'icon-sm': 'var(--icon-size-sm)',
        'icon-md': 'var(--icon-size-md)',
        'icon-lg': 'var(--icon-size-lg)',
      },
      strokeWidth: {
        'icon': 'var(--icon-stroke)',
      }
    },
  },
  plugins: [],
}
`;
};

/**
 * Generates TS definitions for props contracts.
 */
export const generateTypesTs = (tokens: DesignTokens): string => {
  return `/**
 * TypeScript Contracts generated from Design System: ${tokens.name}
 * Use these contracts in your UI component library to enforce styling constraints.
 */

// Color themes and variations
export type ThemeMode = 'light' | 'dark';

export type ComponentVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'danger';

export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon';

// Button Props contract
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Input Props contract
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isFullWidth?: boolean;
}

// Card Props contract
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Badge Props contract
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  variant?: 'solid' | 'soft' | 'outline';
}

// Toast Props contract
export interface ToastProps {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
  onClose?: (id: string) => void;
}
`;
};

/**
 * Generates AI cursorrules mapping guidelines.
 */
export const generateCursorRules = (tokens: DesignTokens): string => {
  const baseSpacing = tokens.spacing.baseUnit;

  const colorTableRows = Object.keys(tokens.colors)
    .map((key) => {
      const kebabName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `| ${key} | \`var(--color-${kebabName})\` | \`var(--color-${kebabName})\` | \`bg-${key}\` / \`text-${key}\` |`;
    })
    .join('\n');

  const spacingGuidelines = tokens.spacing.scale
    .slice(0, 5)
    .map((multiplier) => `- Token ${multiplier} (\`${baseSpacing * multiplier}px\` equivalent): Use class \`p-token-${multiplier}\` or \`m-token-${multiplier}\``)
    .join('\n');

  return `# ${tokens.name} AI Coding Rules

This ruleset guides AI code generators (Cursor, v0, Bolt, Copilot) to build UI components that conform 100% to the project's brand identity.

---

## 1. Zero Hardcoding Rule
- NEVER use raw hex values (e.g. \`#6366f1\`, \`#ffffff\`) for colors.
- NEVER use arbitrary pixel values for padding, margin, or border radius.
- Always use the semantic custom properties or Tailwind classes provided below.

---

## 2. Color Mapping Specifications
Ensure all dynamic colors are mapped as follows:

| Target Area | Light CSS | Dark CSS | Tailwind Class |
| :--- | :--- | :--- | :--- |
${colorTableRows}

---

## 3. Spatial & Responsive Spacing (Base Scale: ${baseSpacing}px)
Always use the token spacing utility classes. Do not use standard Tailwind arbitrary padding:
${spacingGuidelines}

---

## 4. Border Radius Scaling
Map elements to their target styling specs:
- Small components (Checkboxes, badges): \`rounded-xs\` or \`var(--radius-xs)\`
- Interactive components (Inputs, standard buttons): \`rounded-md\` or \`var(--radius-md)\`
- Surface components (Cards, lists): \`rounded-lg\` or \`var(--radius-lg)\`
- Dialogs/Modals: \`rounded-xl\` or \`var(--radius-xl)\`
- Circular components (Avatars, pills): \`rounded-full\` or \`var(--radius-full)\`

---

## 5. Animation & Timing Guidelines
- Standard transitions: \`transition-all duration-normal ease-default\`
- Fast micro-interactions (Button click, switch slide): \`duration-fast\`
- Heavy elements entry (Modal fade in, panel slide in): \`duration-slow\`
`;
};

/**
 * Generates variables conforming to Material Web Components specifications.
 */
export const generateMaterialWebCss = (tokens: DesignTokens): string => {
  const lightColors = Object.entries(tokens.colors)
    .map(([key, token]) => `  --md-sys-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${token.light};`)
    .join('\n');

  const darkColors = Object.entries(tokens.colors)
    .map(([key, token]) => `  --md-sys-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${token.dark};`)
    .join('\n');

  return `/* 
 * Material Web Components (MWC) Variables
 * Compatible with github.com/material-components/material-web
 */

:root {
${lightColors}

  /* Shape tokens */
  --md-sys-shape-corner-small: ${tokens.radius.sm};
  --md-sys-shape-corner-medium: ${tokens.radius.md};
  --md-sys-shape-corner-large: ${tokens.radius.lg};
  --md-sys-shape-corner-full: ${tokens.radius.full};
}

@media (prefers-color-scheme: dark) {
  :root {
${darkColors}
  }
}
`;
};

/**
 * Generates Android XML colors.xml resource files.
 */
export const generateMaterialAndroidXml = (tokens: DesignTokens): string => {
  const lightColors = Object.entries(tokens.colors)
    .map(([key, token]) => `    <color name="md_theme_light_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}">${token.light}</color>`)
    .join('\n');

  const darkColors = Object.entries(tokens.colors)
    .map(([key, token]) => `    <color name="md_theme_dark_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}">${token.dark}</color>`)
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<!-- 
  Material Components Android Resource Colors
  Compatible with github.com/material-components/material-components-android
-->
<resources>
  <!-- Light Theme Mappings -->
${lightColors}

  <!-- Dark Theme Mappings -->
${darkColors}
  
  <!-- Shapes & Radii -->
  <dimen name="md_sys_shape_corner_small">${tokens.radius.sm}</dimen>
  <dimen name="md_sys_shape_corner_medium">${tokens.radius.md}</dimen>
  <dimen name="md_sys_shape_corner_large">${tokens.radius.lg}</dimen>
</resources>
`;
};

/**
 * Generates Jetpack Compose Color & ColorScheme Kotlin theme file.
 */
export const generateMaterialComposeKotlin = (tokens: DesignTokens): string => {
  const lightColors = Object.entries(tokens.colors)
    .map(([key, token]) => `val Light${key.charAt(0).toUpperCase() + key.slice(1)} = Color(0xFF${token.light.replace('#', '')})`)
    .join('\n');

  const darkColors = Object.entries(tokens.colors)
    .map(([key, token]) => `val Dark${key.charAt(0).toUpperCase() + key.slice(1)} = Color(0xFF${token.dark.replace('#', '')})`)
    .join('\n');

  return `package com.example.ui.theme

import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.ui.graphics.Color

/* 
 * Jetpack Compose Material 3 Theme Color Mappings
 * Compatible with material-components for Android / Jetpack Compose
 */

// Light Theme Raw Colors
${lightColors}

// Dark Theme Raw Colors
${darkColors}

val LightColorScheme = lightColorScheme(
  primary = LightPrimary,
  secondary = LightSecondary,
  background = LightBg,
  surface = LightCard,
  error = LightError,
)

val DarkColorScheme = darkColorScheme(
  primary = DarkPrimary,
  secondary = DarkSecondary,
  background = DarkBg,
  surface = DarkCard,
  error = DarkError,
)
`;
};

/**
 * Generates Flutter Dart theme definition class.
 */
export const generateMaterialFlutterDart = (tokens: DesignTokens): string => {
  const lightColors = Object.entries(tokens.colors)
    .map(([key, token]) => `  static const Color light${key.charAt(0).toUpperCase() + key.slice(1)} = Color(0xFF${token.light.replace('#', '')});`)
    .join('\n');

  const darkColors = Object.entries(tokens.colors)
    .map(([key, token]) => `  static const Color dark${key.charAt(0).toUpperCase() + key.slice(1)} = Color(0xFF${token.dark.replace('#', '')});`)
    .join('\n');

  return `import 'package:flutter/material.dart';

/*
 * Flutter Material Components Theme Overrides
 * Compatible with github.com/material-components/material-components-flutter
 */
class AppTheme {
  // Light Theme Colors
${lightColors}

  // Dark Theme Colors
${darkColors}

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      fontFamily: '${tokens.typography.fontFamily.replace(/'/g, '')}',
      colorScheme: const ColorScheme.light(
        primary: lightPrimary,
        secondary: lightSecondary,
        surface: lightCard,
        error: lightError,
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      fontFamily: '${tokens.typography.fontFamily.replace(/'/g, '')}',
      colorScheme: const ColorScheme.dark(
        primary: darkPrimary,
        secondary: darkSecondary,
        surface: darkCard,
        error: darkError,
      ),
    );
  }
}
`;
};
