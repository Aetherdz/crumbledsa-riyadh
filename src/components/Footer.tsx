import { ExternalLink, Instagram } from 'lucide-react';
import {
  COPY,
  VERIFIED_INFO,
  VERIFIED_LINKS,
  type Language,
  type PageKey,
} from '../data/crumbledData';
import { BrandBadge } from './BrandBadge';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageKey) => void;
}

const NAV_ORDER: PageKey[] = ['home', 'products', 'gallery', 'contact'];

export function Footer({ lang, onNavigate }: FooterProps) {
  const t = COPY[lang];

  return (
    <footer className="mt-20 border-t border-[#0F2A44]/10 dark:border-[#C9A45C]/15 bg-[#F3ECE0] dark:bg-[#06111D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand Anchor */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <BrandBadge size="md" />
              <div className="space-y-0.5">
                <p
                  className={`text-xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                    lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                  }`}
                >
                  {VERIFIED_INFO.brandFull}
                </p>
                <p className="text-xs font-medium tracking-wider text-[#9A742B] dark:text-[#D8B66E] font-display-en">
                  {VERIFIED_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
              {t.home.inscriptionNote}
            </p>
          </div>

          {/* Site Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#9A742B] dark:text-[#D8B66E]">
              {lang === 'ar' ? 'الصفحات' : 'Pages'}
            </p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {NAV_ORDER.map((pageKey) => (
                <button
                  key={pageKey}
                  type="button"
                  onClick={() => onNavigate(pageKey)}
                  className="text-start text-sm text-[#0F2A44]/80 dark:text-[#F4EFE4]/80 hover:text-[#0F2A44] dark:hover:text-[#D8B66E] transition-colors cursor-pointer"
                >
                  {t.nav[pageKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Location, Rating, Direct Links & Delivery Apps (text only) */}
          <div className="space-y-4">
            <div className="space-y-1.5 text-sm text-[#0F2A44]/80 dark:text-[#F4EFE4]/80">
              <p className="font-medium text-[#0F2A44] dark:text-[#FAF6EE]">
                {t.footer.locationShort}
              </p>
              <p dir="ltr" className="text-xs leading-relaxed text-start">
                {VERIFIED_INFO.addressEn}
              </p>
              <p className="text-xs font-medium text-[#9A742B] dark:text-[#D8B66E] tabular-nums">
                {t.footer.ratingShort}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.actions.instagramDm}
                title={t.actions.instagramDm}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0F2A44] text-[#D8B66E] hover:bg-[#17395C] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
              >
                <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
              </a>
              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.actions.orderHub}
                title={t.actions.orderHub}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#0F2A44]/20 dark:border-[#C9A45C]/35 bg-white dark:bg-[#0F2438] text-[#0F2A44] dark:text-[#D8B66E] hover:border-[#C9A45C] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
              >
                <ExternalLink className="w-[17px] h-[17px]" aria-hidden="true" />
              </a>
            </div>

            <div className="text-xs text-[#0F2A44]/70 dark:text-[#F4EFE4]/70">
              <span>{t.footer.deliveryLabel}: </span>
              <span dir="ltr" className="font-medium text-[#0F2A44] dark:text-[#F4EFE4]">
                {VERIFIED_INFO.deliveryApps.join(' · ')}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#0F2A44]/65 dark:text-[#F4EFE4]/60">
          <p>{t.footer.rights}</p>
          <p className="font-display-en tracking-wide">{VERIFIED_INFO.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
