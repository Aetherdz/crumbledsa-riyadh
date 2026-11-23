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
  VERIFIED_INFO,
  VERIFIED_LINKS,
  type CustomServiceKey,
  type Language,
} from '../data/crumbledData';
import { BrandBadge } from '../components/BrandBadge';

interface ContactPageProps {
  lang: Language;
  onOpenComposer: (service: CustomServiceKey) => void;
}

export function ContactPage({ lang, onOpenComposer }: ContactPageProps) {
  const [copied, setCopied] = useState(false);
  const t = COPY[lang];
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(VERIFIED_INFO.addressEn);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12">
      {/* Page Header with Brand Emblem */}
      <header className="flex items-start gap-4 sm:gap-5 pb-8 border-b border-[#0F2A44]/15 dark:border-[#F4EFE4]/20">
        <BrandBadge size="md" className="mt-0.5" />
        <div className="space-y-2">
          <h1
            className={`heading-balance text-3xl sm:text-4xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-[17px] text-[#263F59] dark:text-[#E6DFD2] max-w-2xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Column 1: Direct Ordering, Messaging Channels & Once-Only Instagram Bio */}
        <section className="lg:col-span-7 rounded-2xl p-7 sm:p-9 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20 flex flex-col justify-between gap-8">
          <div className="space-y-7">
            <h2
              className={`text-2xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.contact.channelsTitle}
            </h2>

            {/* Order via Instagram */}
            <div className="pb-6 border-b border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#0F2A44] dark:text-[#FAF6EE]">
                  {t.actions.orderViaInstagram}
                </h3>
                <p className="text-base text-[#263F59] dark:text-[#E6DFD2] leading-relaxed">
                  {t.contact.instagramDesc}
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.actions.orderViaInstagram}</span>
              </a>
            </div>

            {/* Order Hub */}
            <div className="pb-6 border-b border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#0F2A44] dark:text-[#FAF6EE]">
                  {t.actions.orderHub}
                </h3>
                <p className="text-base text-[#263F59] dark:text-[#E6DFD2] leading-relaxed">
                  {t.contact.orderHubDesc}
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-semibold border-2 border-[#0F2A44]/35 dark:border-[#F4EFE4]/40 text-[#0F2A44] dark:text-[#FAF6EE] hover:bg-[#0F2A44] hover:text-[#FAF6EE] dark:hover:bg-[#FAF6EE] dark:hover:text-[#081523] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <span>{t.actions.orderHub}</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Delivery Apps — STRICTLY PLAIN TEXT, NO LINKS */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#0F2A44] dark:text-[#FAF6EE]">
                {t.contact.deliveryTitle}
              </h3>
              <p className="text-base text-[#263F59] dark:text-[#E6DFD2] leading-relaxed">
                {t.contact.deliveryDesc}
              </p>
              <ul
                dir="ltr"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-base font-bold text-[#0F2A44] dark:text-[#FAF6EE]"
              >
                {VERIFIED_INFO.deliveryApps.map((appName, idx) => (
                  <li key={appName} className="inline-flex items-center gap-5">
                    <span>{appName}</span>
                    {idx < VERIFIED_INFO.deliveryApps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="text-[#263F59] dark:text-[#E6DFD2] font-normal"
                      >
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Literal Full Bio — Appears ONCE ONLY Across the Entire Site */}
          <div className="pt-5 border-t border-[#0F2A44]/15 dark:border-[#F4EFE4]/20 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-[#263F59] dark:text-[#E6DFD2]">
              <span>{t.contact.bioLabel}</span>
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="inline-flex items-center gap-1.5 min-h-[44px] font-bold text-[#0F2A44] dark:text-[#FAF6EE] hover:underline underline-offset-4"
              >
                <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.contact.instagramAccountLabel}</span>
              </a>
            </div>
            <p className="text-base sm:text-lg font-bold text-[#0F2A44] dark:text-[#FAF6EE]">
              «{t.contact.bioText}»
            </p>
          </div>
        </section>

        {/* Column 2: Verified Riyadh Address, Plus Code, 4.6 (204) Rating & Real Embedded Google Map */}
        <section className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#0F2A44] text-[#FAF6EE] border border-[#C9A45C] flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#E4C276]">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.contact.addressLabel}</span>
            </div>

            <div className="space-y-2.5">
              <p className="text-sm font-medium text-[#EFE8DC]">
                {t.contact.addressVerifiedLabel}
              </p>
              {lang === 'ar' && (
                <p className="text-lg font-semibold leading-relaxed text-[#FAF6EE] break-words">
                  {VERIFIED_INFO.addressAr}
                </p>
              )}
              <p
                className={`leading-relaxed break-words ${
                  lang === 'ar'
                    ? 'text-base text-[#EFE8DC]'
                    : 'text-lg font-semibold text-[#FAF6EE]'
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

            {/* Verified 4.6 (204 reviews) Google Maps Rating */}
            <div className="pt-4 border-t border-[#FAF6EE]/20 space-y-2">
              <p className="text-sm font-medium text-[#EFE8DC]">
                {t.contact.ratingLabel}
              </p>
              <a
                href={VERIFIED_LINKS.googleMapsPlace}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 group"
              >
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-3xl font-bold font-display-en text-[#FAF6EE] tabular-nums">
                    {VERIFIED_INFO.googleRating}
                  </span>
                  <span className="text-base font-semibold text-[#FAF6EE] group-hover:underline underline-offset-4">
                    {t.contact.ratingValue}
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  className="flex items-center gap-1 text-[#E4C276] shrink-0"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4
                          ? 'fill-[#E4C276] text-[#E4C276]'
                          : 'fill-[#E4C276]/50 text-[#E4C276]'
                      }`}
                    />
                  ))}
                </div>
              </a>
            </div>

            {/* Real Embedded Google Map */}
            <div className="w-full overflow-hidden rounded-xl border border-[#C9A45C]/50 bg-[#0A1E31]">
              <iframe
                src={VERIFIED_LINKS.googleMapsEmbed}
                title={t.home.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[300px] border-0 block"
              />
            </div>
          </div>

          {/* Open Verified Google Maps Place + Copy Address */}
          <div className="flex flex-col gap-3">
            <a
              href={VERIFIED_LINKS.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors whitespace-nowrap"
            >
              <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t.actions.openInGoogleMaps}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              aria-live="polite"
              className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-semibold border-2 border-[#FAF6EE]/45 bg-[#143454] text-[#FAF6EE] hover:bg-[#1A426A] transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? (
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
        </section>
      </div>

      {/* Single-Line Redirect to Composer on Products Page */}
      <section className="rounded-2xl px-6 py-5 sm:px-8 sm:py-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-base sm:text-[17px] font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
          {t.contact.composerRedirectLine}
        </p>
        <button
          type="button"
          onClick={() => onOpenComposer('inscription')}
          className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#FAF6EE] dark:text-[#081523] dark:hover:bg-[#E6E0D5] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <span>{t.contact.composerRedirectButton}</span>
          <DirectionArrow className="w-4 h-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
