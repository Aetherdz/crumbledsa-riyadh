import { useEffect, useState } from 'react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = COPY[lang];

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
      setScrollProgress(ratio);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [currentPage]);

  const handleSelectPage = (page: PageKey) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 dark:bg-[#081523]/95 backdrop-blur-md border-b border-[#0F2A44]/15 dark:border-[#C9A45C]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[72px] sm:min-h-[80px] py-2 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Designed circular badge + Brand name ONLY */}
        <button
          type="button"
          onClick={() => handleSelectPage('home')}
          className="min-h-[44px] flex items-center gap-3 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A45C] rounded-lg"
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

        {/* Zone 2: Spacious >=44px navigation tabs with strong active contrast */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
          className="hidden md:flex items-center gap-2 lg:gap-4"
        >
          {NAV_ORDER.map((pageKey) => {
            const active = currentPage === pageKey;
            return (
              <button
                key={pageKey}
                type="button"
                onClick={() => handleSelectPage(pageKey)}
                aria-current={active ? 'page' : undefined}
                className={`min-h-[44px] px-4 py-2 rounded-full text-base whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C] ${
                  active
                    ? 'bg-[#0F2A44] text-[#FAF6EE] dark:bg-[#D4AE5E] dark:text-[#081523] font-bold shadow-xs'
                    : 'font-medium text-[#0F2A44] dark:text-[#FAF6EE] hover:bg-[#0F2A44]/10 dark:hover:bg-[#FAF6EE]/10'
                }`}
              >
                {t.nav[pageKey]}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Accessible >=44px controls with icon + AR/EN accessible labels + clear state */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t.actions.switchLangAria}
            title={t.actions.switchLangAria}
            className="min-h-[44px] min-w-[44px] px-3 rounded-full inline-flex items-center justify-center gap-1.5 text-sm font-bold border-2 border-[#0F2A44]/35 dark:border-[#D4AE5E]/65 bg-white dark:bg-[#0F2438] text-[#0F2A44] dark:text-[#FAF6EE] hover:bg-[#0F2A44] hover:text-[#FAF6EE] hover:border-[#0F2A44] dark:hover:bg-[#D4AE5E] dark:hover:text-[#081523] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
          >
            <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.actions.switchToOtherLang}</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={
              isDark ? t.actions.toggleLightAria : t.actions.toggleDarkAria
            }
            title={
              isDark ? t.actions.toggleLightAria : t.actions.toggleDarkAria
            }
            className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center border-2 transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C] ${
              isDark
                ? 'bg-[#D4AE5E] text-[#081523] border-[#D4AE5E] hover:bg-[#E0BE74]'
                : 'bg-white text-[#0F2A44] border-[#0F2A44]/35 hover:bg-[#0F2A44] hover:text-[#FAF6EE] hover:border-[#0F2A44]'
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={
              mobileOpen ? t.actions.closeMenuAria : t.actions.openMenuAria
            }
            title={
              mobileOpen ? t.actions.closeMenuAria : t.actions.openMenuAria
            }
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center border-2 border-[#0F2A44] dark:border-[#D4AE5E]/65 bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#173859] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#0F2A44]/15 dark:border-[#C9A45C]/20 bg-[#FAF6EE] dark:bg-[#081523]">
          <nav
            aria-label={lang === 'ar' ? 'قائمة الجوال' : 'Mobile navigation'}
            className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2"
          >
            {NAV_ORDER.map((pageKey) => {
              const active = currentPage === pageKey;
              return (
                <button
                  key={pageKey}
                  type="button"
                  onClick={() => handleSelectPage(pageKey)}
                  aria-current={active ? 'page' : undefined}
                  className={`w-full min-h-[48px] text-start px-4 py-3 rounded-xl text-base transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0F2A44] text-[#FAF6EE] dark:bg-[#D4AE5E] dark:text-[#081523] font-bold'
                      : 'font-medium text-[#0F2A44] dark:text-[#FAF6EE] hover:bg-[#0F2A44]/10 dark:hover:bg-white/10'
                  }`}
                >
                  {t.nav[pageKey]}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Thin 2px Gold Scroll Progress Bar (Respects prefers-reduced-motion) */}
      <div
        aria-hidden="true"
        className="w-full h-[2px] bg-transparent overflow-hidden"
      >
        <div
          className={`h-full w-full bg-[#C9A45C] dark:bg-[#D8B66E] transition-transform duration-100 ease-out motion-reduce:transition-none ${
            lang === 'ar' ? 'origin-right' : 'origin-left'
          }`}
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </header>
  );
}
