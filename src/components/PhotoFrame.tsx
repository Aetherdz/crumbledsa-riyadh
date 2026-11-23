import { useState } from 'react';
import { BrandBadge } from './BrandBadge';

interface PhotoFrameProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  imgClassName?: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
  priority?: boolean;
}

export function PhotoFrame({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = '',
  fit = 'cover',
  objectPosition = 'object-center',
  priority = false,
}: PhotoFrameProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      className={`relative overflow-hidden bg-[#EDE5D5] dark:bg-[#0B1C2E] ${className}`}
    >
      {!hasError ? (
        <>
          {!loaded && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-[#EFE8DA] via-[#E6DCC8] to-[#EFE8DA] dark:from-[#0F2438] dark:via-[#15314B] dark:to-[#0F2438]"
            />
          )}
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full ${fitClass} ${objectPosition} transition-all duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        </>
      ) : (
        <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-b from-[#0F2A44] to-[#0A1E31] text-[#F4EFE4]">
          <BrandBadge size="md" />
          <span className="text-sm font-medium tracking-wide text-[#D8B66E]">
            {fallbackTitle}
          </span>
        </div>
      )}
    </div>
  );
}
