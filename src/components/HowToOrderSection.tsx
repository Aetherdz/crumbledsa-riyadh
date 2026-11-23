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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Order Hub */}
        <article className="rounded-xl p-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col justify-between gap-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#9A742B] dark:text-[#D8B66E] tabular-nums">
              01
            </span>
            <h3 className="text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
              {steps.orderHubTitle}
            </h3>
            <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
              {steps.orderHubDesc}
            </p>
          </div>
          <a
            href={VERIFIED_LINKS.orderHub}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F2A44] dark:text-[#D8B66E] hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <span>{t.actions.orderHub}</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </article>

        {/* 2. Instagram DM */}
        <article className="rounded-xl p-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col justify-between gap-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#9A742B] dark:text-[#D8B66E] tabular-nums">
              02
            </span>
            <h3 className="text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
              {steps.instagramTitle}
            </h3>
            <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
              {steps.instagramDesc}
            </p>
          </div>
          <a
            href={VERIFIED_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F2A44] dark:text-[#D8B66E] hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.actions.instagramDm}</span>
          </a>
        </article>

        {/* 3. Delivery Apps (Plain Text Only — NO LINKS) */}
        <article className="rounded-xl p-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col justify-between gap-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#9A742B] dark:text-[#D8B66E] tabular-nums">
              03
            </span>
            <h3 className="text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
              {steps.deliveryTitle}
            </h3>
            <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
              {steps.deliveryDesc}
            </p>
          </div>
          <p
            dir="ltr"
            className="text-sm font-semibold text-[#0F2A44] dark:text-[#D8B66E] text-start"
          >
            {VERIFIED_INFO.deliveryApps.join(' · ')}
          </p>
        </article>

        {/* 4. Visit Branch in Riyadh + Google Maps Search Link */}
        <article className="rounded-xl p-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col justify-between gap-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#9A742B] dark:text-[#D8B66E] tabular-nums">
              04
            </span>
            <h3 className="text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
              {steps.visitTitle}
            </h3>
            <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
              {steps.visitDesc}
            </p>
          </div>
          <a
            href={VERIFIED_LINKS.googleMapsSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F2A44] dark:text-[#D8B66E] hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{t.actions.openGoogleMaps}</span>
          </a>
        </article>
      </div>
    </section>
  );
}
