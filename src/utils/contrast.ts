/**
 * Converts a hex color string to RGB.
 * Handles shorthand hex (e.g. "#fff") and full hex (e.g. "#ffffff").
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove hash if present
  const cleanHex = hex.replace(/^#/, '');
  
  if (cleanHex.length !== 3 && cleanHex.length !== 6) {
    return null;
  }
  
  let r = 0, g = 0, b = 0;
  
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  
  return { r, g, b };
};

/**
 * Calculates the relative luminance of an RGB color.
 * Formula from WCAG 2.0/2.1.
 */
export const getRelativeLuminance = (r: number, g: number, b: number): number => {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;
  
  const rL = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gL = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bL = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
};

/**
 * Calculates the contrast ratio between two hex colors.
 * Returns a value between 1 and 21 (e.g. 4.5, 21.0).
 */
export const getContrastRatio = (hex1: string, hex2: string): number => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  if (!rgb1 || !rgb2) return 1.0;
  
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  const ratio = (lighter + 0.05) / (darker + 0.05);
  // Round to two decimal places
  return Math.round(ratio * 100) / 100;
};

export interface ContrastResult {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}

/**
 * Evaluates WCAG 2.1 compliance for a given contrast ratio.
 */
export const evaluateContrast = (ratio: number): ContrastResult => {
  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
    aaaLarge: ratio >= 4.5,
  };
};

/**
 * Automatically calculates if a text color should be white or black for high contrast
 * on a given background color.
 */
export const getIdealTextColor = (bgHex: string): string => {
  const rgb = hexToRgb(bgHex);
  if (!rgb) return '#000000';
  const l = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  // Using standard threshold 0.179 for luminance
  return l > 0.179 ? '#000000' : '#ffffff';
};
