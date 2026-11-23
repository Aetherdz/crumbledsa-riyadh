import { useEffect, useState } from 'react';
import {
  COPY,
  REAL_PHOTOS,
  type CustomServiceKey,
  type Language,
  type PageKey,
} from './data/crumbledData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

const HASH_TO_PAGE: Record<string, PageKey> = {
  '': 'home',
  '#': 'home',
  '#/': 'home',
  '#/home': 'home',
  '#/products': 'products',
  '#/gallery': 'gallery',
  '#/contact': 'contact',
};

const PAGE_TO_HASH: Record<PageKey, string> = {
  home: '#/',
  products: '#/products',
  gallery: '#/gallery',
  contact: '#/contact',
};

function getPageFromHash(): PageKey {
  if (typeof window === 'undefined') return 'home';
  const normalized = window.location.hash.toLowerCase().trim();
  return HASH_TO_PAGE[normalized] ?? 'home';
}

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [page, setPage] = useState<PageKey>(getPageFromHash);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('crumbled-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [composerService, setComposerService] =
    useState<CustomServiceKey>('inscription');

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const pageTitle = COPY[lang].nav[page];
    document.title =
      lang === 'ar'
        ? `${pageTitle} | Crumbled كرمبلد — الرياض`
        : `${pageTitle} | Crumbled Riyadh`;
  }, [lang, page]);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    try {
      localStorage.setItem('crumbled-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (nextPage: PageKey) => {
    setPage(nextPage);
    const nextHash = PAGE_TO_HASH[nextPage];
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenComposer = (service: CustomServiceKey) => {
    setComposerService(service);
    setPage('products');
    const nextHash = PAGE_TO_HASH.products;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.requestAnimationFrame(() => {
      const target = document.getElementById('custom-composer');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#0F2A44] dark:bg-[#081523] dark:text-[#F4EFE4] transition-colors duration-200">
      <Header
        currentPage={page}
        lang={lang}
        isDark={isDark}
        onNavigate={handleNavigate}
        onToggleLang={handleToggleLang}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        {page === 'home' && (
          <HomePage lang={lang} onNavigate={handleNavigate} />
        )}
        {page === 'products' && (
          <ProductsPage
            lang={lang}
            initialService={composerService}
            onOpenPhoto={setLightboxIndex}
          />
        )}
        {page === 'gallery' && (
          <GalleryPage lang={lang} onOpenPhoto={setLightboxIndex} />
        )}
        {page === 'contact' && (
          <ContactPage lang={lang} onOpenComposer={handleOpenComposer} />
        )}
      </main>

      <Footer lang={lang} onNavigate={handleNavigate} />

      <Lightbox
        photos={REAL_PHOTOS}
        activeIndex={lightboxIndex}
        lang={lang}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </div>
  );
}
