/**
 * Image Optimization Utilities
 */

/**
 * Generate blur data URL for placeholder
 */
export function getBlurDataURL(width: number = 10, height: number = 10): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="blur" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
      <rect width="100%" height="100%" fill="#f0f0f0" filter="url(#blur)"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Get responsive image sizes based on breakpoints
 */
export function getImageSizes(type: 'hero' | 'card' | 'thumbnail' | 'full'): string {
  const sizesMap = {
    hero: '100vw',
    card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    thumbnail: '(max-width: 640px) 50vw, 200px',
    full: '100vw',
  };
  
  return sizesMap[type];
}

/**
 * Optimize SVG by removing unnecessary attributes
 */
export function optimizeSVG(svgString: string): string {
  return svgString
    .replace(/<!--.*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .trim();
}

/**
 * Check if image format is supported
 */
export function isSupportedFormat(filename: string): boolean {
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.gif'];
  return supportedFormats.some(format => filename.toLowerCase().endsWith(format));
}

/**
 * Get image format from filename
 */
export function getImageFormat(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension || 'unknown';
}

/**
 * Calculate aspect ratio
 */
export function getAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Get optimized dimensions for responsive images
 */
export function getOptimizedDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number = 1920
): { width: number; height: number } {
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight };
  }
  
  const aspectRatio = getAspectRatio(originalWidth, originalHeight);
  return {
    width: maxWidth,
    height: Math.round(maxWidth / aspectRatio),
  };
}
