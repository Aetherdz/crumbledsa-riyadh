import { useState } from 'react';
import {
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
  type Language,
} from '../data/crumbledData';
import { BrandBadge } from '../components/BrandBadge';
import { CustomOrdersComposer } from '../components/CustomOrdersComposer';

interface ContactPageProps {
  lang: Language;
}

export function ContactPage({ lang }: ContactPageProps) {
  const [copied, setCopied] = useState(false);
  const t = COPY[lang];

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
      <header className="flex items-start gap-4 sm:gap-5 pb-8 border-b border-[#0F2A44]/15 dark:border-[#F4EFE4]/15">
        <BrandBadge size="md" className="mt-0.5" />
        <div className="space-y-2">
          <h1
            className={`heading-balance text-3xl sm:text-4xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.contact.title}
          </h1>
          <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#D5D0C6] max-w-2xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Column 1: Direct Ordering, Messaging Channels & Once-Only Instagram Bio */}
        <section className="lg:col-span-7 rounded-2xl p-7 sm:p-9 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 flex flex-col justify-between gap-8">
          <div className="space-y-7">
            <h2
              className={`text-2xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.contact.channelsTitle}
            </h2>

            {/* Order Hub */}
            <div className="pb-6 border-b border-[#0F2A44]/10 dark:border-[#F4EFE4]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                  {t.actions.orderHub}
                </h3>
                <p className="text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6]">
                  {t.contact.orderHubDesc}
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#D4AE5E] text-[#081523] hover:bg-[#E0BE74] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <span>{t.actions.orderHub}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Instagram DM */}
            <div className="pb-6 border-b border-[#0F2A44]/10 dark:border-[#F4EFE4]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                  {t.actions.instagramDm}
                </h3>
                <p className="text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6] leading-relaxed">
                  {t.contact.instagramDesc}
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium border-2 border-[#0F2A44]/25 dark:border-[#F4EFE4]/30 text-[#0F2A44] dark:text-[#FAF6EE] hover:border-[#0F2A44] dark:hover:border-[#FAF6EE] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>{t.actions.instagramDm}</span>
              </a>
            </div>

            {/* Delivery Apps — STRICTLY PLAIN TEXT, NO LINKS */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                {t.contact.deliveryTitle}
              </h3>
              <p className="text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6]">
                {t.contact.deliveryDesc}
              </p>
              <ul
                dir="ltr"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]"
              >
                {VERIFIED_INFO.deliveryApps.map((appName, idx) => (
                  <li key={appName} className="inline-flex items-center gap-5">
                    <span>{appName}</span>
                    {idx < VERIFIED_INFO.deliveryApps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="text-[#0F2A44]/30 dark:text-[#F4EFE4]/35 font-normal"
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
          <div className="pt-5 border-t border-[#0F2A44]/10 dark:border-[#F4EFE4]/15 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-[#0F2A44]/70 dark:text-[#CBD5E1]">
              <span>{t.contact.bioLabel}</span>
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="inline-flex items-center gap-1.5 font-semibold text-[#0F2A44] dark:text-[#FAF6EE] hover:underline underline-offset-4"
              >
                <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.contact.instagramAccountLabel}</span>
              </a>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
              «{t.contact.bioText}»
            </p>
          </div>
        </section>

        {/* Column 2: Verified Riyadh Address, Google Maps Search Link & 4.6 Rating */}
        <section className="lg:col-span-5 rounded-2xl p-7 sm:p-9 bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#C9A45C]/40 flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#E2DDD2]">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.contact.addressLabel}</span>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-[#CBD5E1]">
                {t.contact.addressVerifiedLabel}
              </p>
              {lang === 'ar' && (
                <p className="text-lg font-semibold leading-relaxed text-[#FAF6EE]">
                  {VERIFIED_INFO.addressAr}
                </p>
              )}
              <p
                dir="ltr"
                className={`leading-relaxed text-start ${
                  lang === 'ar'
                    ? 'text-sm text-[#E2DDD2]'
                    : 'text-lg font-semibold text-[#FAF6EE]'
                }`}
              >
                {VERIFIED_INFO.addressEn}
              </p>

              {/* Open on Google Maps Search + Clear Copy Address Button */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={VERIFIED_LINKS.googleMapsSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#D4AE5E] text-[#081523] hover:bg-[#E0BE74] transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.actions.openGoogleMaps}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  aria-live="polite"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium border-2 border-[#FAF6EE]/35 bg-[#143454] text-[#FAF6EE] hover:bg-[#1A426A] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>{t.actions.addressCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>{t.actions.copyAddress}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Verified 4.6 Google Maps Rating */}
          <div className="pt-6 border-t border-[#FAF6EE]/20 space-y-3">
            <p className="text-xs font-medium text-[#E2DDD2]">
              {t.contact.ratingLabel}
            </p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-bold font-display-en text-[#FAF6EE] tabular-nums">
                  {VERIFIED_INFO.googleRating}
                </span>
                <span className="text-sm text-[#E2DDD2]">
                  {t.contact.ratingValue}
                </span>
              </div>
              <div
                aria-hidden="true"
                className="flex items-center gap-1 text-[#D8B66E]"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4
                        ? 'fill-[#D8B66E] text-[#D8B66E]'
                        : 'fill-[#D8B66E]/45 text-[#D8B66E]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Orders & Catering Message Composer */}
      <CustomOrdersComposer lang={lang} />
    </div>
  );
}
