/**
 * Color Utilities
 * 
 * Helper functions for color manipulation and enhancement
 */

/**
 * Darkens a color by a given percentage
 * Supports hex colors (#rgb, #rrggbb) and named colors
 */
export function darkenColor(color: string, percent: number): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    // Convert to RGB
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Darken each component
    const darkenedR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const darkenedG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const darkenedB = Math.max(0, Math.floor(b * (1 - percent / 100)));
    
    // Convert back to hex
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`;
  }
  
  // For named colors or other formats, return a generic darker color
  return '#333';
}

/**
 * Creates a drop shadow filter string for SVG elements
 */
export function createDropShadow(
  offsetX: number = 0,
  offsetY: number = 2,
  blur: number = 4,
  color: string = 'rgba(0, 0, 0, 0.2)'
): string {
  return `drop-shadow(${offsetX}px ${offsetY}px ${blur}px ${color})`;
}
