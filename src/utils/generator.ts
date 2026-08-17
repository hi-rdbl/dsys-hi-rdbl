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
    color: {
      brand: {
        primary: {
          light: { $value: tokens.colors.primary.light, $type: 'color', $description: tokens.colors.primary.description },
          dark: { $value: tokens.colors.primary.dark, $type: 'color' },
        },
        primaryHover: {
          light: { $value: tokens.colors.primaryHover.light, $type: 'color', $description: tokens.colors.primaryHover.description },
          dark: { $value: tokens.colors.primaryHover.dark, $type: 'color' },
        },
        secondary: {
          light: { $value: tokens.colors.secondary.light, $type: 'color', $description: tokens.colors.secondary.description },
          dark: { $value: tokens.colors.secondary.dark, $type: 'color' },
        },
        secondaryHover: {
          light: { $value: tokens.colors.secondaryHover.light, $type: 'color', $description: tokens.colors.secondaryHover.description },
          dark: { $value: tokens.colors.secondaryHover.dark, $type: 'color' },
        },
        accent: {
          light: { $value: tokens.colors.accent.light, $type: 'color', $description: tokens.colors.accent.description },
          dark: { $value: tokens.colors.accent.dark, $type: 'color' },
        },
      },
      surface: {
        bg: {
          light: { $value: tokens.colors.bg.light, $type: 'color', $description: tokens.colors.bg.description },
          dark: { $value: tokens.colors.bg.dark, $type: 'color' },
        },
        card: {
          light: { $value: tokens.colors.card.light, $type: 'color', $description: tokens.colors.card.description },
          dark: { $value: tokens.colors.card.dark, $type: 'color' },
        },
        border: {
          light: { $value: tokens.colors.border.light, $type: 'color', $description: tokens.colors.border.description },
          dark: { $value: tokens.colors.border.dark, $type: 'color' },
        },
      },
      text: {
        main: {
          light: { $value: tokens.colors.text.light, $type: 'color', $description: tokens.colors.text.description },
          dark: { $value: tokens.colors.text.dark, $type: 'color' },
        },
        muted: {
          light: { $value: tokens.colors.textMuted.light, $type: 'color', $description: tokens.colors.textMuted.description },
          dark: { $value: tokens.colors.textMuted.dark, $type: 'color' },
        },
      },
      feedback: {
        success: {
          light: { $value: tokens.colors.success.light, $type: 'color', $description: tokens.colors.success.description },
          dark: { $value: tokens.colors.success.dark, $type: 'color' },
        },
        warning: {
          light: { $value: tokens.colors.warning.light, $type: 'color', $description: tokens.colors.warning.description },
          dark: { $value: tokens.colors.warning.dark, $type: 'color' },
        },
        error: {
          light: { $value: tokens.colors.error.light, $type: 'color', $description: tokens.colors.error.description },
          dark: { $value: tokens.colors.error.dark, $type: 'color' },
        },
        info: {
          light: { $value: tokens.colors.info.light, $type: 'color', $description: tokens.colors.info.description },
          dark: { $value: tokens.colors.info.dark, $type: 'color' },
        },
      },
    },
    typography: {
      family: { $value: tokens.typography.fontFamily, $type: 'fontFamily' },
      baseSize: { $value: `${tokens.typography.baseSize}px`, $type: 'dimension' },
      lineHeight: { $value: tokens.typography.lineHeight, $type: 'dimension' },
      letterSpacing: { $value: tokens.typography.letterSpacing, $type: 'dimension' },
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

  return `/* 
 * CSS Variables generated from ${tokens.name} by ${tokens.author}
 * Supporting theme switches via '.dark' class toggle on root.
 */

:root {
  /* Fonts */
  --font-sans: ${tokens.typography.fontFamily};

  /* Colors (Light Theme) */
  --color-primary: ${tokens.colors.primary.light};
  --color-primary-hover: ${tokens.colors.primaryHover.light};
  --color-secondary: ${tokens.colors.secondary.light};
  --color-secondary-hover: ${tokens.colors.secondaryHover.light};
  --color-accent: ${tokens.colors.accent.light};
  --color-bg: ${tokens.colors.bg.light};
  --color-card: ${tokens.colors.card.light};
  --color-border: ${tokens.colors.border.light};
  --color-text: ${tokens.colors.text.light};
  --color-text-muted: ${tokens.colors.textMuted.light};
  --color-success: ${tokens.colors.success.light};
  --color-warning: ${tokens.colors.warning.light};
  --color-error: ${tokens.colors.error.light};
  --color-info: ${tokens.colors.info.light};

  /* Border Radii */
  --radius-none: ${tokens.radius.none};
  --radius-xs: ${tokens.radius.xs};
  --radius-sm: ${tokens.radius.sm};
  --radius-md: ${tokens.radius.md};
  --radius-lg: ${tokens.radius.lg};
  --radius-xl: ${tokens.radius.xl};
  --radius-xxl: ${tokens.radius.xxl};
  --radius-full: ${tokens.radius.full};
  --radius-button: ${tokens.radius.button};

  /* Shadows */
  --shadow-none: ${tokens.shadows.none};
  --shadow-sm: ${tokens.shadows.sm};
  --shadow-md: ${tokens.shadows.md};
  --shadow-lg: ${tokens.shadows.lg};
  --shadow-xl: ${tokens.shadows.xl};
  --shadow-focus: ${tokens.shadows.focus};

  /* Spacing Scale (Base unit: ${baseSpacing}px) */
  --spacing-1: ${baseSpacing * 1}px;
  --spacing-2: ${baseSpacing * 2}px;
  --spacing-3: ${baseSpacing * 3}px;
  --spacing-4: ${baseSpacing * 4}px;
  --spacing-5: ${baseSpacing * 5}px;
  --spacing-6: ${baseSpacing * 6}px;
  --spacing-8: ${baseSpacing * 8}px;
  --spacing-10: ${baseSpacing * 10}px;
  --spacing-12: ${baseSpacing * 12}px;
  --spacing-16: ${baseSpacing * 16}px;

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
  --color-primary: ${tokens.colors.primary.dark};
  --color-primary-hover: ${tokens.colors.primaryHover.dark};
  --color-secondary: ${tokens.colors.secondary.dark};
  --color-secondary-hover: ${tokens.colors.secondaryHover.dark};
  --color-accent: ${tokens.colors.accent.dark};
  --color-bg: ${tokens.colors.bg.dark};
  --color-card: ${tokens.colors.card.dark};
  --color-border: ${tokens.colors.border.dark};
  --color-text: ${tokens.colors.text.dark};
  --color-text-muted: ${tokens.colors.textMuted.dark};
  --color-success: ${tokens.colors.success.dark};
  --color-warning: ${tokens.colors.warning.dark};
  --color-error: ${tokens.colors.error.dark};
  --color-info: ${tokens.colors.info.dark};
}
`;
};

/**
 * Generates tailwind.config.js mapped to custom properties.
 */
export const generateTailwindConfig = (tokens: DesignTokens): string => {
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
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
        },
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      spacing: {
        'token-1': 'var(--spacing-1)',
        'token-2': 'var(--spacing-2)',
        'token-3': 'var(--spacing-3)',
        'token-4': 'var(--spacing-4)',
        'token-5': 'var(--spacing-5)',
        'token-6': 'var(--spacing-6)',
        'token-8': 'var(--spacing-8)',
        'token-10': 'var(--spacing-10)',
        'token-12': 'var(--spacing-12)',
        'token-16': 'var(--spacing-16)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        xxl: 'var(--radius-xxl)',
        full: 'var(--radius-full)',
        button: 'var(--radius-button)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
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
| Primary Action | \`var(--color-primary)\` | \`var(--color-primary)\` | \`bg-primary text-white hover:bg-primary-hover\` |
| Secondary Action | \`var(--color-secondary)\` | \`var(--color-secondary)\` | \`bg-secondary text-text hover:bg-secondary-hover\` |
| Main Canvas | \`var(--color-bg)\` | \`var(--color-bg)\` | \`bg-bg text-text\` |
| Card Surface | \`var(--color-card)\` | \`var(--color-card)\` | \`bg-card border-border\` |
| Border Lines | \`var(--color-border)\` | \`var(--color-border)\` | \`border-border\` |
| Text Primary | \`var(--color-text)\` | \`var(--color-text)\` | \`text-text\` |
| Text Secondary | \`var(--color-text-muted)\` | \`var(--color-text-muted)\` | \`text-text-muted\` |

---

## 3. Spatial & Responsive Spacing (Base Scale: ${tokens.spacing.baseUnit}px)
Always use the token spacing utility classes. Do not use standard Tailwind arbitrary padding:
- Token 1 (\`4px\` equivalent): Use class \`p-token-1\` or \`m-token-1\`
- Token 2 (\`8px\` equivalent): Use class \`p-token-2\` or \`m-token-2\`
- Token 4 (\`16px\` equivalent): Use class \`p-token-4\` or \`m-token-4\`
- Token 8 (\`32px\` equivalent): Use class \`p-token-8\` or \`m-token-8\`

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
