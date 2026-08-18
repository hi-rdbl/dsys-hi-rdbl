export type ColorMode = 'light' | 'dark';

export interface ColorToken {
  light: string;
  dark: string;
  description: string;
}

export interface ColorPalette {
  primary: ColorToken;
  primaryHover: ColorToken;
  secondary: ColorToken;
  secondaryHover: ColorToken;
  accent: ColorToken;
  bg: ColorToken;
  card: ColorToken;
  border: ColorToken;
  text: ColorToken;
  textMuted: ColorToken;
  success: ColorToken;
  warning: ColorToken;
  error: ColorToken;
  info: ColorToken;
  [key: string]: ColorToken; // Index signature for dynamic custom color tokens
}

export interface TypographyToken {
  fontFamily: string;
  baseSize: number; // in px
  scaleFactor: number; // e.g. 1.2 for Minor Third
  lineHeight: string; // relative, e.g. "1.5"
  letterSpacing: string; // e.g. "0.02em"
}

export interface SpacingToken {
  baseUnit: number; // e.g. 4 or 8 px
  scale: number[]; // multiplier array e.g. [1, 2, 3, 4, 6, 8, 12, 16]
}

export interface RadiusToken {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  full: string;
  button: string;
}

export interface ShadowToken {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  focus: string;
}

export interface MotionToken {
  durationFast: string; // e.g., "150ms"
  durationNormal: string; // e.g., "300ms"
  durationSlow: string; // e.g., "500ms"
  easeDefault: string; // cubic-bezier
  easeIn: string;
  easeOut: string;
  easeInOut: string;
}

export interface IconToken {
  sizeSm: string;
  sizeMd: string;
  sizeLg: string;
  strokeWidth: string;
}

export interface DesignTokens {
  name: string;
  author: string;
  description: string;
  version: string;
  targetFramework: 'react-tailwind' | 'vue-css' | 'web-components';
  colors: ColorPalette;
  typography: TypographyToken;
  spacing: SpacingToken;
  radius: RadiusToken;
  shadows: ShadowToken;
  motion: MotionToken;
  icons: IconToken;
}

export interface DesignSystemPreset {
  id: string;
  name: string;
  description: string;
  tokens: DesignTokens;
}
