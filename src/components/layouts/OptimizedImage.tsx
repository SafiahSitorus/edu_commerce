import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * Optimized Image Component
 * Automatically handles:
 * - WebP/AVIF conversion
 * - Lazy loading
 * - Responsive sizes
 * - Blur placeholder
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  className,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  // Check if it's SVG
  const isSVG = src.endsWith('.svg');

  if (isSVG) {
    // For SVG, render without optimization to preserve vector quality
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0' filter='url(%23b)'/%3E%3C/svg%3E"
      quality={85}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      {...props}
    />
  );
}
