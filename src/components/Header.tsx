import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import {
  COPY,
  VERIFIED_INFO,
  type Language,
  type PageKey,
} from '../data/crumbledData';
import { BrandBadge } from './BrandBadge';

interface HeaderProps {
  currentPage: PageKey;
  lang: Language;
  isDark: boolean;
  onNavigate: (page: PageKey) => void;
  onToggleLang: () => void;
  onToggleTheme: () => void;
}

const NAV_ORDER: PageKey[] = ['home', 'products', 'gallery', 'contact'];

export function Header({
  currentPage,
  lang,
  isDark,
  onNavigate,
  onToggleLang,
  onToggleTheme,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = COPY[lang];

  const handleSelectPage = (page: PageKey) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 dark:bg-[#081523]/95 backdrop-blur-md border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-6">
        {/* Zone 1: Designed circular badge + Brand name ONLY */}
        <button
          type="button"
          onClick={() => handleSelectPage('home')}
          className="flex items-center gap-3 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A45C] rounded-lg"
        >
          <BrandBadge size="sm" />
          <span
            className={`text-lg sm:text-xl font-bold tracking-tight text-[#0F2A44] dark:text-[#FAF6EE] whitespace-nowrap shrink-0 ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {VERIFIED_INFO.brandFull}
          </span>
        </button>

        {/* Zone 2: 4 Clean single-line text nav links */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
          className="hidden md:flex items-center gap-7 lg:gap-9"
        >
          {NAV_ORDER.map((pageKey) => {
            const active = currentPage === pageKey;
            return (
              <button
                key={pageKey}
                type="button"
                onClick={() => handleSelectPage(pageKey)}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A45C] ${
                  active
                    ? 'text-[#0F2A44] dark:text-[#D8B66E]'
                    : 'text-[#0F2A44]/70 dark:text-[#F4EFE4]/75 hover:text-[#0F2A44] dark:hover:text-[#FAF6EE]'
                }`}
              >
                {t.nav[pageKey]}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-1 h-[1.5px] bg-[#C9A45C] transition-opacity duration-200 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Compact circular controls (Language + Icon-Only Sun/Moon + Mobile Menu) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t.actions.switchLangAria}
            title={t.actions.switchLangAria}
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold border border-[#0F2A44]/15 dark:border-[#C9A45C]/30 bg-white/80 dark:bg-[#0F2438] text-[#0F2A44] dark:text-[#D8B66E] hover:border-[#C9A45C] hover:bg-[#0F2A44] hover:text-[#FAF6EE] dark:hover:bg-[#173654] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
          >
            {t.actions.switchToOtherLang}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDark ? t.actions.toggleLightAria : t.actions.toggleDarkAria
            }
            title={
              isDark ? t.actions.toggleLightAria : t.actions.toggleDarkAria
            }
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#0F2A44]/15 dark:border-[#C9A45C]/30 bg-white/80 dark:bg-[#0F2438] text-[#0F2A44] dark:text-[#D8B66E] hover:border-[#C9A45C] hover:bg-[#0F2A44] hover:text-[#FAF6EE] dark:hover:bg-[#173654] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
          >
            {isDark ? (
              <Sun className="w-[18px] h-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={
              mobileOpen ? t.actions.closeMenuAria : t.actions.openMenuAria
            }
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-[#0F2A44]/15 dark:border-[#C9A45C]/30 bg-[#0F2A44] text-[#D8B66E] hover:bg-[#173859] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
          >
            {mobileOpen ? (
              <X className="w-[18px] h-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#0F2A44]/10 dark:border-[#C9A45C]/15 bg-[#FAF6EE] dark:bg-[#081523]">
          <nav
            aria-label={lang === 'ar' ? 'قائمة الجوال' : 'Mobile navigation'}
            className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1"
          >
            {NAV_ORDER.map((pageKey) => {
              const active = currentPage === pageKey;
              return (
                <button
                  key={pageKey}
                  type="button"
                  onClick={() => handleSelectPage(pageKey)}
                  aria-current={active ? 'page' : undefined}
                  className={`w-full text-start px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0F2A44] text-[#D8B66E] dark:bg-[#132C45]'
                      : 'text-[#0F2A44] dark:text-[#F4EFE4] hover:bg-[#0F2A44]/5 dark:hover:bg-white/5'
                  }`}
                >
                  {t.nav[pageKey]}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
