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
      <header className="space-y-6 pb-8 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15">
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
              <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 max-w-xl">
                {t.gallery.subtitle}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#9A742B] dark:text-[#D8B66E]">
            {t.gallery.tapHint}
          </p>
        </div>

        {/* Real Photo Filter Tabs */}
        <div
          role="tablist"
          aria-label={t.gallery.title}
          className="inline-flex items-center gap-1 p-1 rounded-full bg-[#EFE7D8] dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/20"
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
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0F2A44] text-[#FAF6EE] dark:bg-[#C9A45C] dark:text-[#081523]'
                    : 'text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 hover:text-[#0F2A44] dark:hover:text-[#FAF6EE]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Editorial Grid of the 5 Real Photographs Only */}
      <section className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {visiblePhotos.map(({ photo, originalIndex }, idx) => {
          const isLead =
            category === 'all'
              ? idx < 2
              : visiblePhotos.length === 2;
          return (
            <figure
              key={photo.id}
              className={`group rounded-2xl overflow-hidden bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 ${
                isLead ? 'md:col-span-3' : 'md:col-span-2'
              }`}
            >
              <button
                type="button"
                onClick={() => onOpenPhoto(originalIndex)}
                aria-label={`${t.actions.zoomPhotoAria}: ${
                  lang === 'ar' ? photo.titleAr : photo.titleEn
                }`}
                className="block w-full text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C9A45C]"
              >
                <div
                  className={`relative overflow-hidden ${
                    isLead ? 'aspect-[4/3]' : 'aspect-[4/5]'
                  }`}
                >
                  <PhotoFrame
                    src={photo.url}
                    alt={lang === 'ar' ? photo.altAr : photo.altEn}
                    fallbackTitle={
                      lang === 'ar' ? photo.titleAr : photo.titleEn
                    }
                    className="w-full h-full"
                    imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
                    priority={originalIndex === 0}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 end-4 w-10 h-10 rounded-full flex items-center justify-center bg-[#0F2A44]/85 text-[#D8B66E] border border-[#C9A45C]/35 transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <figcaption className="p-5 flex items-baseline justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                      {lang === 'ar' ? photo.titleAr : photo.titleEn}
                    </p>
                    <p className="text-xs sm:text-sm text-[#0F2A44]/70 dark:text-[#F4EFE4]/70">
                      {lang === 'ar' ? photo.captionAr : photo.captionEn}
                    </p>
                  </div>
                  <span className="text-xs text-[#9A742B] dark:text-[#D8B66E] tabular-nums shrink-0">
                    0{originalIndex + 1}
                  </span>
                </figcaption>
              </button>
            </figure>
          );
        })}
      </section>

      {/* Quiet Instagram DM Footer Bar */}
      <div className="rounded-xl p-6 bg-[#F3ECE0] dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-[#0F2A44]/85 dark:text-[#F4EFE4]/85">
          {t.gallery.followPrompt}
        </p>
        <a
          href={VERIFIED_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#C9A45C] dark:text-[#081523] dark:hover:bg-[#D8B66E] transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Instagram className="w-4 h-4" aria-hidden="true" />
          <span>{t.actions.instagramDm}</span>
        </a>
      </div>
    </div>
  );
}
