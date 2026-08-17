import type { DesignTokens } from '../types';

/**
 * Encodes the DesignTokens object into a compressed, URL-safe Base64 string.
 */
export const encodeTokens = (tokens: DesignTokens): string => {
  try {
    const jsonStr = JSON.stringify(tokens);
    // Use TextEncoder to handle Unicode characters correctly
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    
    let binary = '';
    const len = utf8Bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    
    const base64 = btoa(binary);
    // Make it URL safe by replacing characters: + -> -, / -> _, and removing trailing padding =
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('Failed to encode tokens:', error);
    return '';
  }
};

/**
 * Decodes a URL-safe Base64 string back into a DesignTokens object.
 */
export const decodeTokens = (urlSafeBase64: string): DesignTokens | null => {
  try {
    // Restore base64 characters from URL-safe form
    let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');
    // Re-add padding if necessary
    const pad = base64.length % 4;
    if (pad) {
      base64 += '='.repeat(4 - pad);
    }
    
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    
    // Quick validation of the structure
    if (parsed && typeof parsed === 'object' && parsed.colors && parsed.typography && parsed.spacing) {
      return parsed as DesignTokens;
    }
    return null;
  } catch (error) {
    console.error('Failed to decode tokens:', error);
    return null;
  }
};
