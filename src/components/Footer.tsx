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
    <footer className="mt-20 border-t border-[#0F2A44]/15 dark:border-[#C9A45C]/25 bg-[#F3ECE0] dark:bg-[#06111D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand Anchor: Brand name & Mouthful & Delightful ONLY */}
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
              <p className="text-sm font-medium tracking-wider text-[#263F59] dark:text-[#E6DFD2] font-display-en">
                {VERIFIED_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Site Navigation */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-[#263F59] dark:text-[#E6DFD2]">
              {lang === 'ar' ? 'الصفحات' : 'Pages'}
            </p>
            <div className="grid grid-cols-2 gap-y-1 gap-x-4">
              {NAV_ORDER.map((pageKey) => (
                <button
                  key={pageKey}
                  type="button"
                  onClick={() => onNavigate(pageKey)}
                  className="min-h-[44px] text-start text-base font-medium text-[#0F2A44] dark:text-[#FAF6EE] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  {t.nav[pageKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Verified Links: Instagram & Order Hub ONLY */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-[#263F59] dark:text-[#E6DFD2]">
              {lang === 'ar' ? 'الروابط المباشرة' : 'Direct Links'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.actions.orderViaInstagram}
                title={t.actions.orderViaInstagram}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395C] dark:bg-[#D8B464] dark:text-[#081523] dark:hover:bg-[#E5C57B] transition-colors"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.actions.orderHub}
                title={t.actions.orderHub}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center border-2 border-[#0F2A44]/40 dark:border-[#F4EFE4]/45 bg-white dark:bg-[#0F2438] text-[#0F2A44] dark:text-[#FAF6EE] hover:border-[#0F2A44] dark:hover:border-[#FAF6EE] transition-colors"
              >
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#0F2A44]/15 dark:border-[#C9A45C]/25 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-medium text-[#263F59] dark:text-[#E6DFD2]">
          <p>{t.footer.rights}</p>
          <p className="font-display-en tracking-wide">{VERIFIED_INFO.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
