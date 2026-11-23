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
  const heroPhotoName = lang === 'ar' ? heroPhoto.titleAr : heroPhoto.titleEn;

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
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Unified Deep Navy Hero — Single Static Cloud Cake Photo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#C9A45C]/55 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[560px]">
            {/* Single Static Cloud Cake Photo — Framed on Cake, Bowl & Hands Only (Top Printed Text Cropped Out) */}
            <div className="relative order-1 lg:order-2 lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:min-h-full overflow-hidden bg-[#0F2A44]">
              <PhotoFrame
                src={heroPhoto.url}
                alt={heroPhotoName}
                fallbackTitle={heroPhotoName}
                className="w-full h-full bg-[#0F2A44] dark:bg-[#0F2A44]"
                fit="cover"
                objectPosition="object-bottom"
                imgClassName="origin-bottom scale-[1.12] lg:scale-[1.48]"
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

            {/* Brand Display, Trust Proof & Single Unmistakable Primary Action */}
            <div className="relative z-10 order-2 lg:order-1 lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-7">
              <div className="space-y-4">
                <h1 className="heading-balance space-y-1">
                  <span className="block font-display-en text-5xl sm:text-6xl lg:text-7xl xl:text-[5.1rem] font-bold tracking-tight leading-[0.98] text-[#E4C276]">
                    {VERIFIED_INFO.brandEn}
                  </span>
                  <span className="block font-display-ar text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#FAF6EE]">
                    {VERIFIED_INFO.brandAr}
                  </span>
                </h1>

                <p className="text-lg sm:text-xl italic tracking-wide text-[#E4C276] font-display-en">
                  {VERIFIED_INFO.tagline}
                </p>

                <p className="text-[17px] sm:text-lg text-[#FAF6EE] leading-relaxed max-w-md pt-1">
                  {t.home.heroLine}
                </p>
              </div>

              <div className="space-y-5">
                {/* Trust Proof Only: 4.6 on Google Maps (204 reviews) */}
                <div>
                  <a
                    href={VERIFIED_LINKS.googleMapsPlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold bg-[#0A1E31] text-[#FAF6EE] border-2 border-[#FAF6EE]/35 hover:border-[#E4C276] transition-colors tabular-nums"
                  >
                    <Star
                      className="w-4 h-4 fill-[#E4C276] text-[#E4C276] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{t.home.ratingText}</span>
                  </a>
                </div>

                {/* Single Unmistakable Primary CTA (Order via Instagram) + Quiet Secondary Text Link (Order Hub) */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
                  <a
                    href={VERIFIED_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[54px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base sm:text-lg font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors whitespace-nowrap shadow-sm"
                  >
                    <Instagram className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{t.actions.orderViaInstagram}</span>
                  </a>

                  <a
                    href={VERIFIED_LINKS.orderHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center sm:justify-start gap-1.5 min-h-[44px] text-base font-medium text-[#F4EFE4] underline underline-offset-4 decoration-[#FAF6EE]/65 hover:text-white hover:decoration-white transition-colors whitespace-nowrap"
                  >
                    <span>{t.actions.orderHub}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Clear Pricing & Order Details Confirmation Line */}
        <p className="text-base sm:text-[17px] font-medium text-[#0F2A44] dark:text-[#F4EFE4] leading-relaxed px-1">
          {t.home.pricingNotice}
        </p>
      </section>

      {/* 2. Concise Single-Line Services Pointer to Products Page */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl px-6 py-5 sm:px-8 sm:py-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
            {t.home.servicesSummaryLine}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#FAF6EE] dark:text-[#081523] dark:hover:bg-[#E6E0D5] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>{t.actions.showProducts}</span>
            <DirectionArrow className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* 3. Visit Card — Full-Width Navy Card with Thin Gold Border, Plus Code, Embedded Google Map & Stacked 56px Buttons */}
      <section
        aria-label={t.home.visitHeading}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full rounded-2xl p-6 sm:p-9 bg-[#0F2A44] text-[#FAF6EE] border border-[#C9A45C] space-y-6">
          <div className="space-y-2.5">
            {lang === 'ar' && (
              <p className="text-lg sm:text-xl font-semibold leading-relaxed text-[#FAF6EE] break-words">
                {VERIFIED_INFO.addressAr}
              </p>
            )}
            <p
              className={`leading-relaxed break-words ${
                lang === 'ar'
                  ? 'text-base text-[#EFE8DC]'
                  : 'text-lg sm:text-xl font-semibold text-[#FAF6EE]'
              }`}
            >
              <bdi dir="ltr">{VERIFIED_INFO.addressEn}</bdi>
            </p>
            <p className="text-base font-medium text-[#E4C276]">
              {t.home.plusCodeLabel}{' '}
              <bdi dir="ltr" className="font-bold text-[#FAF6EE]">
                {VERIFIED_INFO.plusCode}
              </bdi>
            </p>
          </div>

          <div>
            <a
              href={VERIFIED_LINKS.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#FAF6EE] hover:underline underline-offset-4 tabular-nums"
            >
              <Star
                className="w-4 h-4 fill-[#E4C276] text-[#E4C276] shrink-0"
                aria-hidden="true"
              />
              <span>{t.home.ratingText}</span>
            </a>
          </div>

          {/* Embedded Google Map Preview */}
          <div className="w-full overflow-hidden rounded-xl border border-[#C9A45C]/50 bg-[#0A1E31]">
            <iframe
              src={VERIFIED_LINKS.googleMapsEmbed}
              title={t.home.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] border-0 block"
            />
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={VERIFIED_LINKS.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 min-h-[56px] px-6 rounded-xl inline-flex items-center justify-center gap-2.5 text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors"
            >
              <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t.actions.openInGoogleMaps}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              aria-live="polite"
              className="w-full h-14 min-h-[56px] px-6 rounded-xl inline-flex items-center justify-center gap-2.5 text-base font-semibold border-2 border-[#FAF6EE]/45 bg-[#143454] text-[#FAF6EE] hover:bg-[#1A426A] transition-colors cursor-pointer"
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
