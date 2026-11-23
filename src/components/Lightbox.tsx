import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { COPY, type Language, type RealPhoto } from '../data/crumbledData';
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
  const goPrev = () =>
    onSelectIndex((activeIndex - 1 + photos.length) % photos.length);
  const goNext = () => onSelectIndex((activeIndex + 1) % photos.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'ar' ? photo.titleAr : photo.titleEn}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06101B]/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between gap-4">
          <div className="text-sm text-[#D8B66E] tabular-nums">
            {activeIndex + 1} / {photos.length}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.closeLightboxAria}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0F2A44] text-[#F4EFE4] border border-[#C9A45C]/40 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative w-full flex items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={goPrev}
            aria-label={t.actions.prevPhotoAria}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44]/90 text-[#F4EFE4] border border-[#C9A45C]/40 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
          >
            {isRtl ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          <div className="w-full max-h-[72vh] aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden border border-[#C9A45C]/30 bg-[#0F2A44]">
            <PhotoFrame
              src={photo.url}
              alt={lang === 'ar' ? photo.altAr : photo.altEn}
              fallbackTitle={lang === 'ar' ? photo.titleAr : photo.titleEn}
              className="w-full h-full"
              imgClassName="object-contain bg-[#0A1B2C]"
              priority
            />
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label={t.actions.nextPhotoAria}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44]/90 text-[#F4EFE4] border border-[#C9A45C]/40 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
          >
            {isRtl ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-center space-y-1">
          <p
            className={`text-lg sm:text-xl font-semibold text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {lang === 'ar' ? photo.titleAr : photo.titleEn}
          </p>
          <p className="text-sm text-[#D8CFC0]">
            {lang === 'ar' ? photo.captionAr : photo.captionEn}
          </p>
        </div>
      </div>
    </div>
  );
}
