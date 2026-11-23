import { useState } from 'react';
import { Instagram, Maximize2 } from 'lucide-react';
import {
  COPY,
  REAL_PHOTOS,
  VERIFIED_LINKS,
  type GalleryCategory,
  type Language,
} from '../data/crumbledData';
import { BrandBadge } from '../components/BrandBadge';
import { PhotoFrame } from '../components/PhotoFrame';

interface GalleryPageProps {
  lang: Language;
  onOpenPhoto: (index: number) => void;
}

export function GalleryPage({ lang, onOpenPhoto }: GalleryPageProps) {
  const [category, setCategory] = useState<GalleryCategory>('all');
  const t = COPY[lang];

  const visiblePhotos = REAL_PHOTOS.map((photo, originalIndex) => ({
    photo,
    originalIndex,
  })).filter(
    ({ photo }) => category === 'all' || photo.galleryCategory === category,
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
      {/* Page Header with Brand Emblem & Category Filters */}
      <header className="space-y-6 pb-8 border-b border-[#0F2A44]/15 dark:border-[#C9A45C]/25">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="flex items-start gap-4 sm:gap-5">
            <BrandBadge size="md" className="mt-0.5" />
            <div className="space-y-2">
              <h1
                className={`heading-balance text-3xl sm:text-4xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                  lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {t.gallery.title}
              </h1>
              <p className="text-base sm:text-[17px] text-[#263F59] dark:text-[#E6DFD2] max-w-xl">
                {t.gallery.subtitle}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium text-[#263F59] dark:text-[#E6DFD2]">
            {t.gallery.tapHint}
          </p>
        </div>

        {/* Photo Filter Tabs */}
        <div
          role="tablist"
          aria-label={t.gallery.title}
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#EFE7D8] dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20"
        >
          {(
            [
              { key: 'all', label: t.gallery.filterAll },
              { key: 'cakes', label: t.gallery.filterCakes },
              { key: 'sweets', label: t.gallery.filterSweets },
            ] as const
          ).map((tab) => {
            const active = category === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(tab.key)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0F2A44] text-[#FAF6EE] dark:bg-[#D8B464] dark:text-[#081523]'
                    : 'text-[#0F2A44] dark:text-[#FAF6EE] hover:bg-[#0F2A44]/10 dark:hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Framed Natural-Aspect Gallery Grid — Unified Background, No Cropping, No Text Underneath */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePhotos.map(({ photo, originalIndex }) => {
          const photoName = lang === 'ar' ? photo.titleAr : photo.titleEn;

          return (
            <div
              key={photo.id}
              className="group rounded-2xl overflow-hidden bg-[#EFE7D8] dark:bg-[#0B1C2E] border border-[#0F2A44]/20 dark:border-[#C9A45C]/30 p-3 sm:p-4"
            >
              <button
                type="button"
                onClick={() => onOpenPhoto(originalIndex)}
                aria-label={`${t.actions.zoomPhotoAria}: ${photoName}`}
                className="relative block w-full h-[300px] sm:h-[340px] rounded-xl overflow-hidden bg-[#EFE7D8] dark:bg-[#0B1C2E] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
              >
                <PhotoFrame
                  src={photo.url}
                  alt={photoName}
                  fallbackTitle={photoName}
                  fit="contain"
                  className="w-full h-full bg-[#EFE7D8] dark:bg-[#0B1C2E]"
                  imgClassName="group-hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 end-3 w-10 h-10 rounded-full flex items-center justify-center bg-[#0F2A44]/90 text-[#FAF6EE] border border-[#FAF6EE]/35 transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
                >
                  <Maximize2 className="w-4 h-4" />
                </span>
              </button>
            </div>
          );
        })}
      </section>

      {/* Quiet Instagram DM Footer Bar */}
      <div className="rounded-xl p-6 bg-[#EFE7D8] dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-base font-medium text-[#0F2A44] dark:text-[#FAF6EE]">
          {t.gallery.followPrompt}
        </p>
        <a
          href={VERIFIED_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.actions.orderViaInstagram}</span>
        </a>
      </div>
    </div>
  );
}
