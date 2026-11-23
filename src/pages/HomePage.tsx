import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Instagram,
  MapPin,
  Maximize2,
  Star,
} from 'lucide-react';
import {
  COPY,
  PRODUCTS,
  REAL_PHOTOS,
  VERIFIED_INFO,
  VERIFIED_LINKS,
  type Language,
  type PageKey,
} from '../data/crumbledData';
import { BrandBadge } from '../components/BrandBadge';
import { PhotoFrame } from '../components/PhotoFrame';
import { HowToOrderSection } from '../components/HowToOrderSection';
import { FaqAccordion } from '../components/FaqAccordion';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageKey) => void;
  onOpenPhoto: (index: number) => void;
}

export function HomePage({ lang, onNavigate, onOpenPhoto }: HomePageProps) {
  const [heroIndex, setHeroIndex] = useState(0);
  const t = COPY[lang];
  const isRtl = lang === 'ar';
  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;

  const activeHeroPhoto = REAL_PHOTOS[heroIndex];
  const showcasePhotos = REAL_PHOTOS.slice(1);
  const signatureProducts = PRODUCTS.filter((p) => p.category === 'signature');
  const bespokeProducts = PRODUCTS.filter((p) => p.category === 'bespoke');

  const handlePrevHero = () =>
    setHeroIndex((prev) => (prev - 1 + REAL_PHOTOS.length) % REAL_PHOTOS.length);
  const handleNextHero = () =>
    setHeroIndex((prev) => (prev + 1) % REAL_PHOTOS.length);

  const quickHighlights = [
    {
      key: 'rating',
      label: t.home.quickHighlights.ratingLabel,
      value: t.home.quickHighlights.ratingValue,
      tabular: true,
    },
    {
      key: 'location',
      label: t.home.quickHighlights.locationLabel,
      value: t.home.quickHighlights.locationValue,
      tabular: false,
    },
    {
      key: 'inscription',
      label: t.home.quickHighlights.inscriptionLabel,
      value: t.home.quickHighlights.inscriptionValue,
      tabular: false,
    },
    {
      key: 'bespoke',
      label: t.home.quickHighlights.bespokeLabel,
      value: t.home.quickHighlights.bespokeValue,
      tabular: false,
    },
  ];

  return (
    <div className="space-y-18 sm:space-y-24">
      {/* 1. Enhanced Hero — Wider Cloud Cake Default Frame + Circular Preview Indicators */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-stretch">
          {/* Wider Photography Frame (Cloud Cake Default + 5 Real Photos Switcher) */}
          <div className="lg:col-span-8 order-1">
            <div className="group relative h-full min-h-[370px] sm:min-h-[490px] lg:min-h-[560px] rounded-2xl overflow-hidden border border-[#0F2A44]/12 dark:border-[#C9A45C]/20 shadow-sm">
              <PhotoFrame
                key={activeHeroPhoto.id}
                src={activeHeroPhoto.url}
                alt={
                  lang === 'ar'
                    ? activeHeroPhoto.altAr
                    : activeHeroPhoto.altEn
                }
                fallbackTitle={
                  lang === 'ar'
                    ? activeHeroPhoto.titleAr
                    : activeHeroPhoto.titleEn
                }
                className="w-full h-full"
                imgClassName="group-hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
                priority
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081523]/85 via-[#081523]/35 to-transparent"
              />

              {/* Top-end Zoom & Counter */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#0F2A44]/85 text-[#D8B66E] border border-[#C9A45C]/30 tabular-nums">
                  {heroIndex + 1} / {REAL_PHOTOS.length}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenPhoto(heroIndex)}
                  aria-label={t.actions.zoomPhotoAria}
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44]/90 text-[#D8B66E] border border-[#C9A45C]/40 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
                >
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Bottom Caption + Circular Switcher Indicators */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-0.5 text-[#FAF6EE]">
                  <p
                    className={`text-lg sm:text-2xl font-semibold tracking-wide ${
                      lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                    }`}
                  >
                    {lang === 'ar'
                      ? activeHeroPhoto.titleAr
                      : activeHeroPhoto.titleEn}
                  </p>
                  <p className="text-xs sm:text-sm text-[#EAE0CE]">
                    {lang === 'ar'
                      ? activeHeroPhoto.captionAr
                      : activeHeroPhoto.captionEn}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handlePrevHero}
                    aria-label={t.actions.prevPhotoAria}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0F2A44]/85 text-[#FAF6EE] border border-[#C9A45C]/40 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
                  >
                    {isRtl ? (
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>

                  <div
                    role="tablist"
                    aria-label={t.actions.selectHeroPhotoAria}
                    className="flex items-center gap-1.5 px-2.5 py-2 rounded-full bg-[#0F2A44]/80 border border-[#C9A45C]/30"
                  >
                    {REAL_PHOTOS.map((photo, idx) => {
                      const isActive = idx === heroIndex;
                      return (
                        <button
                          key={photo.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`${t.actions.selectHeroPhotoAria}: ${
                            lang === 'ar' ? photo.titleAr : photo.titleEn
                          }`}
                          onClick={() => setHeroIndex(idx)}
                          className={`rounded-full transition-all duration-200 motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E] ${
                            isActive
                              ? 'w-5 h-2.5 bg-[#D8B66E]'
                              : 'w-2.5 h-2.5 bg-[#FAF6EE]/45 hover:bg-[#FAF6EE]/80'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextHero}
                    aria-label={t.actions.nextPhotoAria}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0F2A44]/85 text-[#FAF6EE] border border-[#C9A45C]/40 hover:bg-[#17395B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
                  >
                    {isRtl ? (
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Brand Anchor & Verified Actions */}
          <div className="lg:col-span-4 order-2 flex flex-col justify-between rounded-2xl p-7 sm:p-8 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <BrandBadge size="lg" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#9A742B] dark:text-[#D8B66E]">
                    {lang === 'ar'
                      ? 'المحمدية، الرياض'
                      : 'Al Mohammadiyyah, Riyadh'}
                  </p>
                  <p className="text-sm font-medium text-[#0F2A44]/80 dark:text-[#F4EFE4]/80 tabular-nums">
                    {t.home.ratingText}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <h1
                  className={`heading-balance text-3xl sm:text-4xl font-bold leading-[1.2] text-[#0F2A44] dark:text-[#FAF6EE] ${
                    lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                  }`}
                >
                  {VERIFIED_INFO.brandFull}
                </h1>
                <p className="text-xl sm:text-2xl italic text-[#9A742B] dark:text-[#D8B66E] font-display-en">
                  {VERIFIED_INFO.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0F2A44]/10 dark:border-[#C9A45C]/15">
                <p className="text-base text-[#0F2A44]/85 dark:text-[#F4EFE4]/90 leading-relaxed">
                  {t.home.inscriptionNote}
                </p>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={VERIFIED_LINKS.orderHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#C9A45C] dark:text-[#081523] dark:hover:bg-[#D8B66E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
                >
                  <span>{t.actions.orderHub}</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={VERIFIED_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-[#0F2A44]/20 dark:border-[#C9A45C]/35 text-[#0F2A44] dark:text-[#FAF6EE] hover:border-[#C9A45C] hover:bg-[#0F2A44]/5 dark:hover:bg-white/5 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
                >
                  <Instagram
                    className="w-4 h-4 text-[#9A742B] dark:text-[#D8B66E]"
                    aria-hidden="true"
                  />
                  <span>{t.actions.instagramDm}</span>
                </a>
              </div>

              <p className="text-xs text-[#0F2A44]/65 dark:text-[#F4EFE4]/65">
                {t.home.deliveryHeading}:{' '}
                <span
                  dir="ltr"
                  className="font-medium text-[#0F2A44] dark:text-[#F4EFE4]"
                >
                  {VERIFIED_INFO.deliveryApps.join(' · ')}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Quick Highlights Strip — 4 Verified Fact Cards Below Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickHighlights.map((card) => (
            <div
              key={card.key}
              className="rounded-xl px-5 py-4 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 space-y-1"
            >
              <p className="text-xs font-medium text-[#9A742B] dark:text-[#D8B66E]">
                {card.label}
              </p>
              <p
                className={`text-sm sm:text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE] ${
                  card.tabular ? 'tabular-nums' : ''
                }`}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Photos First — Curated Showcase of the Remaining Real Photographs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15 pb-5">
          <div className="space-y-1.5">
            <h2
              className={`heading-balance text-2xl sm:text-3xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.home.photosTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#F4EFE4]/75">
              {t.home.photosSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F2A44] dark:text-[#D8B66E] hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <span>{t.actions.viewGallery}</span>
            <DirectionArrow className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {showcasePhotos.map((photo, idx) => {
            const globalIndex = idx + 1;
            return (
              <figure
                key={photo.id}
                className="group relative rounded-xl overflow-hidden bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none"
              >
                <button
                  type="button"
                  onClick={() => onOpenPhoto(globalIndex)}
                  aria-label={`${t.actions.zoomPhotoAria}: ${
                    lang === 'ar' ? photo.titleAr : photo.titleEn
                  }`}
                  className="block w-full text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C9A45C]"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <PhotoFrame
                      src={photo.url}
                      alt={lang === 'ar' ? photo.altAr : photo.altEn}
                      fallbackTitle={
                        lang === 'ar' ? photo.titleAr : photo.titleEn
                      }
                      className="w-full h-full"
                      imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 end-3 w-9 h-9 rounded-full flex items-center justify-center bg-[#0F2A44]/85 text-[#D8B66E] border border-[#C9A45C]/30"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <figcaption className="p-4 space-y-1">
                    <p className="text-sm font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                      {lang === 'ar' ? photo.titleAr : photo.titleEn}
                    </p>
                    <p className="text-xs text-[#0F2A44]/70 dark:text-[#F4EFE4]/70">
                      {lang === 'ar' ? photo.captionAr : photo.captionEn}
                    </p>
                  </figcaption>
                </button>
              </figure>
            );
          })}
        </div>
      </section>

      {/* 4. Products & Services — Clean Editorial Menu Index After Photography (Zero Prices) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15 pb-5">
          <div className="space-y-1.5">
            <h2
              className={`heading-balance text-2xl sm:text-3xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.home.productsTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#F4EFE4]/75">
              {t.home.productsSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F2A44] dark:text-[#D8B66E] hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <span>{t.actions.viewProducts}</span>
            <DirectionArrow className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Signature Items Editorial List */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col justify-between">
            <div className="space-y-5">
              <p className="text-xs font-semibold text-[#9A742B] dark:text-[#D8B66E]">
                {t.products.filterSignature}
              </p>
              <ul className="divide-y divide-[#0F2A44]/10 dark:divide-[#C9A45C]/15">
                {signatureProducts.map((item, idx) => (
                  <li
                    key={item.id}
                    className="py-4 first:pt-1 last:pb-1 flex items-baseline justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <h3 className="text-base sm:text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                        {lang === 'ar' ? item.nameAr : item.nameEn}
                      </h3>
                      {(item.subtitleAr || item.subtitleEn) && (
                        <p className="text-xs sm:text-sm text-[#0F2A44]/70 dark:text-[#F4EFE4]/70">
                          {lang === 'ar' ? item.subtitleAr : item.subtitleEn}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-[#9A742B] dark:text-[#D8B66E] tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bespoke Cakes & Catering Editorial Panel */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#0F2A44] text-[#FAF6EE] border border-[#C9A45C]/30 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold text-[#D8B66E]">
                {t.home.bespokeHeading}
              </p>
              <ul className="divide-y divide-[#C9A45C]/20">
                {bespokeProducts.map((service) => (
                  <li
                    key={service.id}
                    className="py-4 first:pt-1 last:pb-1 space-y-1"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-[#FAF6EE]">
                      {lang === 'ar' ? service.nameAr : service.nameEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#DFD7C8] leading-relaxed">
                      {lang === 'ar' ? service.subtitleAr : service.subtitleEn}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="inline-flex items-center justify-between gap-2 px-5 py-3 rounded-full text-sm font-medium bg-[#C9A45C] text-[#081523] hover:bg-[#D8B66E] transition-colors cursor-pointer"
            >
              <span>{t.actions.viewProducts}</span>
              <DirectionArrow className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. How to Order — 4 Verified Real Paths Only */}
      <HowToOrderSection lang={lang} />

      {/* 6. FAQ Accordion — Strictly 5 Verified Questions */}
      <FaqAccordion lang={lang} />

      {/* 7. Verified Riyadh Visit & Rating Strip + Google Maps Search Link */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-7 sm:p-9 bg-[#F3ECE0] dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/20 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-medium text-[#9A742B] dark:text-[#D8B66E]">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.home.locationHeading}</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
              {lang === 'ar' ? VERIFIED_INFO.addressAr : VERIFIED_INFO.addressEn}
            </p>
            {lang === 'ar' && (
              <p
                dir="ltr"
                className="text-xs sm:text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 text-start"
              >
                {VERIFIED_INFO.addressEn}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#0F2A44]/80 dark:text-[#F4EFE4]/80 pt-1">
              <span className="inline-flex items-center gap-1.5 font-medium tabular-nums">
                <Star
                  className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]"
                  aria-hidden="true"
                />
                {t.home.ratingText}
              </span>
              <span
                aria-hidden="true"
                className="text-[#0F2A44]/30 dark:text-[#C9A45C]/40"
              >
                ·
              </span>
              <span>
                {t.home.deliveryHeading}:{' '}
                <span dir="ltr" className="font-medium">
                  {VERIFIED_INFO.deliveryApps.join(' · ')}
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={VERIFIED_LINKS.googleMapsSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-[#0F2A44]/20 dark:border-[#C9A45C]/35 text-[#0F2A44] dark:text-[#FAF6EE] hover:border-[#C9A45C] hover:bg-[#0F2A44]/5 dark:hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-[#9A742B] dark:text-[#D8B66E]" aria-hidden="true" />
              <span>{t.actions.openGoogleMaps}</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#C9A45C] dark:text-[#081523] dark:hover:bg-[#D8B66E] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{t.actions.visitUs}</span>
              <DirectionArrow className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
