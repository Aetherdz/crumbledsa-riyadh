import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
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
  type CustomServiceKey,
  type Language,
  type PageKey,
} from '../data/crumbledData';
import { PhotoFrame } from '../components/PhotoFrame';
import { HowToOrderSection } from '../components/HowToOrderSection';
import { FaqAccordion } from '../components/FaqAccordion';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageKey) => void;
  onOpenComposer: (service: CustomServiceKey) => void;
  onOpenPhoto: (index: number) => void;
}

export function HomePage({
  lang,
  onNavigate,
  onOpenComposer,
  onOpenPhoto,
}: HomePageProps) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [addressCopied, setAddressCopied] = useState(false);
  const heroStoppedRef = useRef(false);

  const t = COPY[lang];
  const isRtl = lang === 'ar';
  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;

  const stopAutoplay = () => {
    heroStoppedRef.current = true;
    setAutoplayActive(false);
  };

  useEffect(() => {
    if (!autoplayActive || heroStoppedRef.current) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const handleFirstScroll = () => {
      if (window.scrollY > 40) {
        stopAutoplay();
      }
    };

    window.addEventListener('scroll', handleFirstScroll, { passive: true });
    const intervalId = window.setInterval(() => {
      if (!heroStoppedRef.current) {
        setHeroIndex((prev) => (prev + 1) % REAL_PHOTOS.length);
      }
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
      window.clearInterval(intervalId);
    };
  }, [autoplayActive]);

  const activeHeroPhoto = REAL_PHOTOS[heroIndex];
  const signatureProducts = PRODUCTS.filter((p) => p.category === 'signature');
  const bespokeProducts = PRODUCTS.filter((p) => p.category === 'bespoke');

  const handlePrevHero = () => {
    stopAutoplay();
    setHeroIndex((prev) => (prev - 1 + REAL_PHOTOS.length) % REAL_PHOTOS.length);
  };

  const handleNextHero = () => {
    stopAutoplay();
    setHeroIndex((prev) => (prev + 1) % REAL_PHOTOS.length);
  };

  const handleSelectHero = (idx: number) => {
    stopAutoplay();
    setHeroIndex(idx);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(VERIFIED_INFO.addressEn);
      setAddressCopied(true);
      window.setTimeout(() => setAddressCopied(false), 2000);
    } catch {
      setAddressCopied(false);
    }
  };

  return (
    <div className="space-y-18 sm:space-y-24">
      {/* 1. Unified Deep Navy Display Hero — Cloud Cake Default + Slow Autoplay */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div
          onMouseEnter={stopAutoplay}
          onPointerDown={stopAutoplay}
          onFocusCapture={stopAutoplay}
          className="relative overflow-hidden rounded-2xl bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#C9A45C]/45 shadow-md"
        >
          {/* Desktop Full-Bleed End-Anchored Photo with Dark Navy Text-Side Scrim */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] lg:min-h-[600px]">
            {/* Photo Half (Top on Mobile, Background/End Half on Desktop) */}
            <div className="relative order-1 lg:order-2 lg:col-span-6 min-h-[300px] sm:min-h-[380px] lg:min-h-full">
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
                imgClassName="object-cover"
                priority
              />
              {/* Directional Dark Gradient into Deep Navy Panel */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/20 to-transparent lg:bg-gradient-to-t lg:from-[#0F2A44]/55 lg:via-transparent lg:to-transparent`}
              />
              <div
                aria-hidden="true"
                className={`hidden lg:block pointer-events-none absolute inset-y-0 w-36 ${
                  isRtl
                    ? 'right-0 bg-gradient-to-l from-[#0F2A44] via-[#0F2A44]/75 to-transparent'
                    : 'left-0 bg-gradient-to-r from-[#0F2A44] via-[#0F2A44]/75 to-transparent'
                }`}
              />

              {/* Zoom Button & Active Photo Label */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#081523]/85 text-[#FAF6EE] border border-[#FAF6EE]/25">
                  {lang === 'ar'
                    ? activeHeroPhoto.titleAr
                    : activeHeroPhoto.titleEn}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    stopAutoplay();
                    onOpenPhoto(heroIndex);
                  }}
                  aria-label={t.actions.zoomPhotoAria}
                  className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center bg-[#081523]/85 text-[#FAF6EE] border-2 border-[#FAF6EE]/30 hover:bg-[#0F2A44] transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Larger Clear Switcher Dots & Arrows */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handlePrevHero}
                    aria-label={t.actions.prevPhotoAria}
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-[#081523]/85 text-[#FAF6EE] border-2 border-[#FAF6EE]/35 hover:bg-[#0F2A44] transition-colors cursor-pointer"
                  >
                    {isRtl ? (
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>

                  <div
                    role="tablist"
                    aria-label={t.actions.selectHeroPhotoAria}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#081523]/85 border-2 border-[#FAF6EE]/25"
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
                          onClick={() => handleSelectHero(idx)}
                          className={`rounded-full transition-all duration-200 motion-reduce:transition-none cursor-pointer ${
                            isActive
                              ? 'w-7 h-3 bg-[#D4AE5E]'
                              : 'w-3 h-3 bg-[#FAF6EE]/50 hover:bg-[#FAF6EE]'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextHero}
                    aria-label={t.actions.nextPhotoAria}
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-[#081523]/85 text-[#FAF6EE] border-2 border-[#FAF6EE]/35 hover:bg-[#0F2A44] transition-colors cursor-pointer"
                  >
                    {isRtl ? (
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#081523]/85 text-[#FAF6EE] tabular-nums">
                  {heroIndex + 1} / {REAL_PHOTOS.length}
                </span>
              </div>
            </div>

            {/* Monumental Brand Text Half */}
            <div className="relative z-10 order-2 lg:order-1 lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                {/* Oversized Display Titles + Small Gold Tagline */}
                <h1 className="heading-balance space-y-1">
                  <span className="block font-display-en text-5xl sm:text-6xl lg:text-7xl xl:text-[5.1rem] font-bold tracking-tight leading-[0.98] text-[#D8B66E]">
                    {VERIFIED_INFO.brandEn}
                  </span>
                  <span className="block font-display-ar text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#FAF6EE]">
                    {VERIFIED_INFO.brandAr}
                  </span>
                </h1>

                <p className="text-base sm:text-lg italic tracking-wide text-[#D8B66E] font-display-en">
                  {VERIFIED_INFO.tagline}
                </p>

                {/* Single Concise Line */}
                <p className="text-base sm:text-lg text-[#F4EFE4] leading-relaxed max-w-md pt-1">
                  {t.home.heroLine}
                </p>
              </div>

              <div className="space-y-6">
                {/* Rating & Address Badges Inside the Hero Panel */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={VERIFIED_LINKS.googleMapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#0A1E31] text-[#FAF6EE] border-2 border-[#FAF6EE]/25 hover:border-[#D8B66E] transition-colors tabular-nums"
                  >
                    <Star
                      className="w-4 h-4 fill-[#D8B66E] text-[#D8B66E] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{t.home.ratingText}</span>
                  </a>

                  <a
                    href={VERIFIED_LINKS.googleMapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#0A1E31] text-[#FAF6EE] border-2 border-[#FAF6EE]/25 hover:border-[#D8B66E] transition-colors"
                  >
                    <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{t.home.heroAddressShort}</span>
                  </a>
                </div>

                {/* ONLY Two Buttons: Order Hub (Primary Gold) & Instagram DM */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={VERIFIED_LINKS.orderHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-[#D4AE5E] text-[#081523] hover:bg-[#E0BE74] transition-colors whitespace-nowrap"
                  >
                    <span>{t.actions.orderHub}</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href={VERIFIED_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-medium border-2 border-[#FAF6EE]/40 text-[#FAF6EE] hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    <Instagram className="w-4 h-4" aria-hidden="true" />
                    <span>{t.actions.instagramDm}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Photo Service Zones (All 5 Existing Real Photos, Service Names Only) */}
      <section
        aria-label={t.home.productsTitle}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Zone 1: Cloud Cake -> Products */}
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="group relative rounded-2xl overflow-hidden text-start bg-[#0F2A44] border border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 aspect-[4/5] cursor-pointer"
          >
            <PhotoFrame
              src={REAL_PHOTOS[0].url}
              alt={lang === 'ar' ? REAL_PHOTOS[0].altAr : REAL_PHOTOS[0].altEn}
              fallbackTitle={t.home.serviceZones.cloudCake}
              className="w-full h-full"
              imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081523]/90 via-[#081523]/45 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between gap-3 text-[#FAF6EE]">
              <span
                className={`text-xl font-bold ${
                  lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {t.home.serviceZones.cloudCake}
              </span>
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44]/90 border border-[#FAF6EE]/30"
              >
                <DirectionArrow className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Zone 2: Cake Inscription (Chocolate Cake + Caramel Pour) -> Composer */}
          <button
            type="button"
            onClick={() => onOpenComposer('inscription')}
            className="group relative rounded-2xl overflow-hidden text-start bg-[#0F2A44] border border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 aspect-[4/5] cursor-pointer"
          >
            <div className="grid grid-rows-2 w-full h-full gap-0.5 bg-[#0F2A44]">
              <PhotoFrame
                src={REAL_PHOTOS[1].url}
                alt={
                  lang === 'ar' ? REAL_PHOTOS[1].altAr : REAL_PHOTOS[1].altEn
                }
                fallbackTitle={t.home.serviceZones.inscription}
                className="w-full h-full"
                imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
              />
              <PhotoFrame
                src={REAL_PHOTOS[3].url}
                alt={
                  lang === 'ar' ? REAL_PHOTOS[3].altAr : REAL_PHOTOS[3].altEn
                }
                fallbackTitle={t.home.serviceZones.inscription}
                className="w-full h-full"
                imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081523]/90 via-[#081523]/45 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between gap-3 text-[#FAF6EE]">
              <span
                className={`text-xl font-bold ${
                  lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {t.home.serviceZones.inscription}
              </span>
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44]/90 border border-[#FAF6EE]/30"
              >
                <DirectionArrow className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Zone 3: Catering & Occasions (Choux d'Amour + Dates Warmer) -> Composer */}
          <button
            type="button"
            onClick={() => onOpenComposer('catering')}
            className="group relative rounded-2xl overflow-hidden text-start bg-[#0F2A44] border border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 aspect-[4/5] cursor-pointer"
          >
            <div className="grid grid-rows-2 w-full h-full gap-0.5 bg-[#0F2A44]">
              <PhotoFrame
                src={REAL_PHOTOS[2].url}
                alt={
                  lang === 'ar' ? REAL_PHOTOS[2].altAr : REAL_PHOTOS[2].altEn
                }
                fallbackTitle={t.home.serviceZones.catering}
                className="w-full h-full"
                imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
              />
              <PhotoFrame
                src={REAL_PHOTOS[4].url}
                alt={
                  lang === 'ar' ? REAL_PHOTOS[4].altAr : REAL_PHOTOS[4].altEn
                }
                fallbackTitle={t.home.serviceZones.catering}
                className="w-full h-full"
                imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081523]/90 via-[#081523]/45 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between gap-3 text-[#FAF6EE]">
              <span
                className={`text-xl font-bold ${
                  lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {t.home.serviceZones.catering}
              </span>
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-[#0F2A44]/90 border border-[#FAF6EE]/30"
              >
                <DirectionArrow className="w-4 h-4" />
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* 3. Products & Services Editorial Index (Zero Prices) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 pb-5">
          <div className="space-y-1.5">
            <h2
              className={`heading-balance text-2xl sm:text-3xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.home.productsTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#D5D0C6]">
              {t.home.productsSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A44] dark:text-[#FAF6EE] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <span>{t.actions.viewProducts}</span>
            <DirectionArrow className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Signature Items Editorial List */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 flex flex-col justify-between">
            <div className="space-y-5">
              <p className="text-xs font-semibold text-[#0F2A44]/65 dark:text-[#CBD5E1]">
                {t.products.filterSignature}
              </p>
              <ul className="divide-y divide-[#0F2A44]/10 dark:divide-[#F4EFE4]/10">
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
                        <p className="text-xs sm:text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6]">
                          {lang === 'ar' ? item.subtitleAr : item.subtitleEn}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#0F2A44]/60 dark:text-[#CBD5E1] tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bespoke Cakes & Catering Editorial Panel */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#C9A45C]/40 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold text-[#E2DDD2]">
                {t.home.bespokeHeading}
              </p>
              <ul className="divide-y divide-[#FAF6EE]/15">
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
              onClick={() => onOpenComposer('inscription')}
              className="inline-flex items-center justify-between gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#D4AE5E] text-[#081523] hover:bg-[#E0BE74] transition-colors cursor-pointer"
            >
              <span>{t.customComposer.title}</span>
              <DirectionArrow className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. How to Order — Compact 4-Path Linked List */}
      <HowToOrderSection lang={lang} />

      {/* 5. FAQ Accordion — 4 Verified Questions */}
      <FaqAccordion lang={lang} />

      {/* 6. Visit Card — Full-Width Navy Card, Thin Gold Border, Exact Verified Order */}
      <section
        aria-label={t.home.visitHeading}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full rounded-2xl p-6 sm:p-9 bg-[#0F2A44] text-[#FAF6EE] border border-[#C9A45C] space-y-6">
          <p className="text-base sm:text-xl font-medium leading-relaxed text-[#FAF6EE] break-words">
            {lang === 'ar' ? VERIFIED_INFO.addressAr : VERIFIED_INFO.addressEn}
          </p>

          <div>
            <a
              href={VERIFIED_LINKS.googleMapsSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#FAF6EE] hover:underline underline-offset-4 tabular-nums"
            >
              <Star
                className="w-4 h-4 fill-[#D8B66E] text-[#D8B66E] shrink-0"
                aria-hidden="true"
              />
              <span>{t.home.ratingText}</span>
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={VERIFIED_LINKS.googleMapsSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 min-h-[56px] px-6 rounded-xl inline-flex items-center justify-center gap-2.5 text-base font-semibold bg-[#D4AE5E] text-[#081523] hover:bg-[#E0BE74] transition-colors"
            >
              <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t.actions.openInGoogleMaps}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              aria-live="polite"
              className="w-full h-14 min-h-[56px] px-6 rounded-xl inline-flex items-center justify-center gap-2.5 text-base font-medium border-2 border-[#FAF6EE]/35 bg-[#143454] text-[#FAF6EE] hover:bg-[#1A426A] transition-colors cursor-pointer"
            >
              {addressCopied ? (
                <>
                  <Check className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.actions.addressCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.actions.copyAddress}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
