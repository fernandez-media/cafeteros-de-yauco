import React from 'react';

/**
 * Map of optimized image variants generated at /public/assets/opt/.
 * Each entry has the original aspect ratio and the available widths.
 * Files exist as: /assets/opt/{name}-{width}.avif and .webp
 */
export const IMAGE_VARIANTS = {
  hero: { widths: [640, 1280, 1920], ratio: 16 / 9 },
  dsc01912: { widths: [640, 1280, 1920], ratio: 1 },
  dsc04629: { widths: [640, 1280, 1920], ratio: 1 },
  dsc04710: { widths: [640, 1280, 1920], ratio: 1 },
  dsc04989: { widths: [640, 1280, 1920], ratio: 1 },
  'cafeteros-logo': { widths: [96, 192, 384], ratio: 1 },
  merch1: { widths: [320, 640, 960], ratio: 1 },
  merch2: { widths: [320, 640, 960], ratio: 1 },
  merch3: { widths: [320, 640, 960], ratio: 1 },
  merch4: { widths: [320, 640, 960], ratio: 1 },
} as const;

export type ImageName = keyof typeof IMAGE_VARIANTS;

type Props = {
  name: ImageName;
  alt: string;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'sync' | 'async' | 'auto';
  draggable?: boolean;
  ariaHidden?: boolean;
  pictureClassName?: string;
};

const buildSrcSet = (name: string, widths: readonly number[], ext: 'avif' | 'webp') =>
  widths.map((w) => `/assets/opt/${name}-${w}.${ext} ${w}w`).join(', ');

const ResponsiveImage: React.FC<Props> = ({
  name,
  alt,
  sizes = '100vw',
  className,
  style,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  draggable,
  ariaHidden,
  pictureClassName,
}) => {
  const variant = IMAGE_VARIANTS[name];
  const widths = variant.widths;
  const fallbackWidth = widths[widths.length - 1];
  const fallbackSrc = `/assets/opt/${name}-${fallbackWidth}.webp`;

  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={buildSrcSet(name, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet(name, widths, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        draggable={draggable}
        aria-hidden={ariaHidden}
        className={className}
        style={style}
      />
    </picture>
  );
};

export default ResponsiveImage;
