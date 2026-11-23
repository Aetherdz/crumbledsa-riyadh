import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Instagram,
  MapPin,
  Star,
} from 'lucide-react';
import {
  COPY,
  REAL_PHOTOS,
  VERIFIED_INFO,
  VERIFIED_LINKS,
  type Language,
  type PageKey,
} from '../data/crumbledData';
import { PhotoFrame } from '../components/PhotoFrame';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageKey) => void;
}

export function HomePage({ lang, onNavigate }: HomePageProps) {
  const [addressCopied, setAddressCopied] = useState(false);

  const t = COPY[lang];
  const isRtl = lang === 'ar';
  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;
  const heroPhoto = REAL_PHOTOS[0];

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
    <div className="space-y-14 sm:space-y-18">
      {/* 1. Unified Deep Navy Hero — Single Static Cloud Cake Photo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-2xl bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#C9A45C]/45 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[560px]">
            {/* Single Static Cloud Cake Photo */}
            <div className="relative order-1 lg:order-2 lg:col-span-6 min-h-[280px] sm:min-h-[360px] lg:min-h-full">
              <PhotoFrame
                src={heroPhoto.url}
                alt={lang === 'ar' ? heroPhoto.altAr : heroPhoto.altEn}
                fallbackTitle={
                  lang === 'ar' ? heroPhoto.titleAr : heroPhoto.titleEn
                }
                className="w-full h-full"
                imgClassName="object-cover"
                priority
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/20 to-transparent lg:bg-gradient-to-t lg:from-[#0F2A44]/40 lg:via-transparent lg:to-transparent"
              />
              <div
                aria-hidden="true"
                className={`hidden lg:block pointer-events-none absolute inset-y-0 w-36 ${
                  isRtl
                    ? 'right-0 bg-gradient-to-l from-[#0F2A44] via-[#0F2A44]/75 to-transparent'
                    : 'left-0 bg-gradient-to-r from-[#0F2A44] via-[#0F2A44]/75 to-transparent'
                }`}
              />
            </div>

            {/* Brand Display, Trust Proof & Single Primary Action */}
            <div className="relative z-10 order-2 lg:order-1 lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
              <div className="space-y-5">
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

                <p className="text-base sm:text-lg text-[#F4EFE4] leading-relaxed max-w-md pt-1">
                  {t.home.heroLine}
                </p>
              </div>

              <div className="space-y-6">
                {/* Trust Proof Only: 4.6 on Google Maps */}
                <div>
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
                </div>

                {/* Single Primary CTA (Instagram DM) + Quiet Text Link (Order Hub) */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={VERIFIED_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-[#D4AE5E] text-[#081523] hover:bg-[#E0BE74] transition-colors whitespace-nowrap"
                  >
                    <Instagram className="w-4 h-4" aria-hidden="true" />
                    <span>{t.actions.instagramDm}</span>
                  </a>

                  <a
                    href={VERIFIED_LINKS.orderHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E6E0D5] underline underline-offset-4 decoration-[#FAF6EE]/45 hover:text-[#FAF6EE] hover:decoration-[#FAF6EE] transition-colors whitespace-nowrap"
                  >
                    <span>{t.actions.orderHub}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Concise Single-Line Services Pointer to Products Page */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl px-6 py-5 sm:px-8 sm:py-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg font-medium text-[#0F2A44] dark:text-[#FAF6EE]">
            {t.home.servicesSummaryLine}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#FAF6EE] dark:text-[#081523] dark:hover:bg-[#E6E0D5] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>{t.actions.showProducts}</span>
            <DirectionArrow className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* 3. Visit Card — Untouched Full-Width Navy Card with Thin Gold Border & Stacked 56px Buttons */}
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
