import { ExternalLink, Instagram, MapPin } from 'lucide-react';
import {
  COPY,
  VERIFIED_INFO,
  VERIFIED_LINKS,
  type Language,
} from '../data/crumbledData';

interface HowToOrderSectionProps {
  lang: Language;
}

export function HowToOrderSection({ lang }: HowToOrderSectionProps) {
  const t = COPY[lang];
  const steps = t.home.howToOrderSteps;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
      <div className="space-y-1.5 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15 pb-5">
        <h2
          className={`heading-balance text-2xl sm:text-3xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
            lang === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {t.home.howToOrderTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#F4EFE4]/75">
          {t.home.howToOrderSubtitle}
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#0E2236] border border-[#0F2A44]/15 dark:border-[#F4EFE4]/15 divide-y divide-[#0F2A44]/10 dark:divide-[#F4EFE4]/10">
        {/* 1. Order Hub */}
        <a
          href={VERIFIED_LINKS.orderHub}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 hover:bg-[#0F2A44]/[0.03] dark:hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-baseline gap-4 min-w-0">
            <span className="text-xs font-semibold text-[#0F2A44]/60 dark:text-[#CBD5E1] tabular-nums shrink-0">
              01
            </span>
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                {steps.orderHubTitle}
              </h3>
              <p className="text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6]">
                {steps.orderHubDesc}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A44] dark:text-[#FAF6EE] group-hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            <span>{t.actions.orderHub}</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </span>
        </a>

        {/* 2. Instagram DM */}
        <a
          href={VERIFIED_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 hover:bg-[#0F2A44]/[0.03] dark:hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-baseline gap-4 min-w-0">
            <span className="text-xs font-semibold text-[#0F2A44]/60 dark:text-[#CBD5E1] tabular-nums shrink-0">
              02
            </span>
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                {steps.instagramTitle}
              </h3>
              <p className="text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6]">
                {steps.instagramDesc}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A44] dark:text-[#FAF6EE] group-hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span>{t.actions.instagramDm}</span>
          </span>
        </a>

        {/* 3. Delivery Apps (Inline Plain Text Only — NO LINKS) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5">
          <div className="flex items-baseline gap-4 min-w-0">
            <span className="text-xs font-semibold text-[#0F2A44]/60 dark:text-[#CBD5E1] tabular-nums shrink-0">
              03
            </span>
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                {steps.deliveryTitle}
              </h3>
              <p className="text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6]">
                {steps.deliveryDesc}{' '}
                <span
                  dir="ltr"
                  className="font-semibold text-[#0F2A44] dark:text-[#FAF6EE]"
                >
                  {VERIFIED_INFO.deliveryApps.join(' · ')}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 4. Visit Branch + Google Maps Search Link */}
        <a
          href={VERIFIED_LINKS.googleMapsSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 hover:bg-[#0F2A44]/[0.03] dark:hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-baseline gap-4 min-w-0">
            <span className="text-xs font-semibold text-[#0F2A44]/60 dark:text-[#CBD5E1] tabular-nums shrink-0">
              04
            </span>
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                {steps.visitTitle}
              </h3>
              <p className="text-sm text-[#0F2A44]/75 dark:text-[#D5D0C6]">
                {steps.visitDesc}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A44] dark:text-[#FAF6EE] group-hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.actions.openGoogleMaps}</span>
          </span>
        </a>
      </div>
    </section>
  );
}
