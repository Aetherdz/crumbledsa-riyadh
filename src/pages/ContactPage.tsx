import { useState } from 'react';
import { Check, Copy, ExternalLink, Instagram, MapPin, Star } from 'lucide-react';
import {
  COPY,
  VERIFIED_INFO,
  VERIFIED_LINKS,
  type Language,
} from '../data/crumbledData';
import { BrandBadge } from '../components/BrandBadge';

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
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12">
      {/* Page Header with Brand Emblem */}
      <header className="flex items-start gap-4 sm:gap-5 pb-8 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15">
        <BrandBadge size="md" className="mt-0.5" />
        <div className="space-y-2">
          <h1
            className={`heading-balance text-3xl sm:text-4xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.contact.title}
          </h1>
          <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 max-w-2xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Column 1: Direct Ordering & Messaging Channels */}
        <section className="lg:col-span-7 rounded-2xl p-7 sm:p-9 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/20 flex flex-col justify-between gap-8">
          <div className="space-y-7">
            <h2
              className={`text-2xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.contact.channelsTitle}
            </h2>

            {/* Order Hub */}
            <div className="pb-6 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                  {t.actions.orderHub}
                </h3>
                <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75">
                  {t.contact.orderHubDesc}
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#C9A45C] dark:text-[#081523] dark:hover:bg-[#D8B66E] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <span>{t.actions.orderHub}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Instagram DM */}
            <div className="pb-6 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                  {t.actions.instagramDm}
                </h3>
                <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
                  {t.contact.instagramDesc}
                </p>
              </div>
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-[#0F2A44]/20 dark:border-[#C9A45C]/35 text-[#0F2A44] dark:text-[#FAF6EE] hover:border-[#C9A45C] hover:bg-[#0F2A44]/5 dark:hover:bg-white/5 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <Instagram
                  className="w-4 h-4 text-[#9A742B] dark:text-[#D8B66E]"
                  aria-hidden="true"
                />
                <span>{t.actions.instagramDm}</span>
              </a>
            </div>

            {/* Delivery Apps — STRICTLY PLAIN TEXT, NO LINKS */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                {t.contact.deliveryTitle}
              </h3>
              <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75">
                {t.contact.deliveryDesc}
              </p>
              <ul
                dir="ltr"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-base font-semibold text-[#0F2A44] dark:text-[#D8B66E]"
              >
                {VERIFIED_INFO.deliveryApps.map((appName, idx) => (
                  <li key={appName} className="inline-flex items-center gap-5">
                    <span>{appName}</span>
                    {idx < VERIFIED_INFO.deliveryApps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="text-[#0F2A44]/25 dark:text-[#C9A45C]/35 font-normal"
                      >
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="pt-5 border-t border-[#0F2A44]/10 dark:border-[#C9A45C]/15 text-sm font-medium text-[#9A742B] dark:text-[#D8B66E]">
            {t.contact.inscriptionReminder}
          </p>
        </section>

        {/* Column 2: Verified Riyadh Address & Google Maps Rating */}
        <section className="lg:col-span-5 rounded-2xl p-7 sm:p-9 bg-[#0F2A44] text-[#FAF6EE] border border-[#C9A45C]/30 flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D8B66E]">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.contact.addressLabel}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyAddress}
                aria-label={
                  copied ? t.actions.addressCopied : t.actions.copyAddress
                }
                title={copied ? t.actions.addressCopied : t.actions.copyAddress}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#C9A45C]/40 bg-[#143454] text-[#D8B66E] hover:bg-[#1A426A] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
              >
                {copied ? (
                  <Check className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-[#D8CFC0]">
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
                    ? 'text-sm text-[#DFD7C8]'
                    : 'text-lg font-semibold text-[#FAF6EE]'
                }`}
              >
                {VERIFIED_INFO.addressEn}
              </p>
              {copied && (
                <p
                  role="status"
                  className="text-xs font-medium text-[#D8B66E]"
                >
                  {t.actions.addressCopied}
                </p>
              )}
            </div>
          </div>

          {/* Verified 4.6 Google Maps Rating */}
          <div className="pt-6 border-t border-[#C9A45C]/25 space-y-3">
            <p className="text-xs font-medium text-[#D8B66E]">
              {t.contact.ratingLabel}
            </p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-bold font-display-en text-[#FAF6EE] tabular-nums">
                  {VERIFIED_INFO.googleRating}
                </span>
                <span className="text-sm text-[#DFD7C8]">
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
    </div>
  );
}
