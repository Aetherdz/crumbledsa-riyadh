import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import {
  COPY,
  getInstagramPostUrl,
  type Language,
  type RealPhoto,
} from '../data/crumbledData';
import { PhotoFrame } from './PhotoFrame';

interface LightboxProps {
  photos: RealPhoto[];
  activeIndex: number | null;
  lang: Language;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function Lightbox({
  photos,
  activeIndex,
  lang,
  onClose,
  onSelectIndex,
}: LightboxProps) {
  const t = COPY[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        const delta = isRtl ? -1 : 1;
        onSelectIndex((activeIndex + delta + photos.length) % photos.length);
      } else if (event.key === 'ArrowLeft') {
        const delta = isRtl ? 1 : -1;
        onSelectIndex((activeIndex + delta + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isRtl, onClose, onSelectIndex, photos.length]);

  if (activeIndex === null) return null;

  const photo = photos[activeIndex];
  const photoName = lang === 'ar' ? photo.titleAr : photo.titleEn;
  const originalPostUrl = getInstagramPostUrl(photo.url);
  const goPrev = () =>
    onSelectIndex((activeIndex - 1 + photos.length) % photos.length);
  const goNext = () => onSelectIndex((activeIndex + 1) % photos.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photoName}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06101B]/92 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-[#E8CA82] tabular-nums">
            {activeIndex + 1} / {photos.length}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.closeLightboxAria}
            title={t.actions.closeLightboxAria}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#D4AE5E]/60 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full flex items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={goPrev}
            aria-label={t.actions.prevPhotoAria}
            title={t.actions.prevPhotoAria}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#D4AE5E]/60 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
          >
            {isRtl ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          <div className="w-full max-h-[70vh] aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden border border-[#C9A45C]/45 bg-[#0A1B2C] p-2 sm:p-3">
            <PhotoFrame
              src={photo.url}
              alt={photoName}
              fallbackTitle={photoName}
              fit="contain"
              className="w-full h-full bg-[#0A1B2C] dark:bg-[#0A1B2C]"
              priority
            />
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label={t.actions.nextPhotoAria}
            title={t.actions.nextPhotoAria}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#D4AE5E]/60 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
          >
            {isRtl ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center">
          <p
            className={`text-lg sm:text-xl font-bold text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {photoName}
          </p>
          {originalPostUrl && (
            <a
              href={originalPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold border border-[#D4AE5E]/65 text-[#F4EFE4] hover:bg-[#D4AE5E] hover:text-[#081523] transition-colors whitespace-nowrap"
            >
              <span>{t.actions.originalPost}</span>
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
