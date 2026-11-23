import { useMemo, useState } from 'react';
import { Maximize2, Search, X } from 'lucide-react';
import {
  COPY,
  PRODUCTS,
  REAL_PHOTOS,
  type Language,
} from '../data/crumbledData';
import { BrandBadge } from '../components/BrandBadge';
import { PhotoFrame } from '../components/PhotoFrame';
import { CustomOrdersComposer } from '../components/CustomOrdersComposer';

interface ProductsPageProps {
  lang: Language;
  onOpenPhoto: (index: number) => void;
}

type CategoryFilter = 'all' | 'signature' | 'bespoke';

export function ProductsPage({ lang, onOpenPhoto }: ProductsPageProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');
  const t = COPY[lang];

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (filter !== 'all' && item.category !== filter) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        item.nameAr,
        item.nameEn,
        item.subtitleAr ?? '',
        item.subtitleEn ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [filter, normalizedQuery]);

  const signatureItems = filteredProducts.filter(
    (p) => p.category === 'signature',
  );
  const bespokeItems = filteredProducts.filter((p) => p.category === 'bespoke');

  const getPhotoIndex = (photoUrl?: string) =>
    photoUrl ? REAL_PHOTOS.findIndex((photo) => photo.url === photoUrl) : -1;

  const handleReset = () => {
    setFilter('all');
    setQuery('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12">
      {/* Page Header with Brand Emblem */}
      <header className="space-y-6 pb-8 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15">
        <div className="flex items-start gap-4 sm:gap-5">
          <BrandBadge size="md" className="mt-0.5" />
          <div className="space-y-2">
            <h1
              className={`heading-balance text-3xl sm:text-4xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.products.title}
            </h1>
            <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 max-w-2xl leading-relaxed">
              {t.products.subtitle}
            </p>
            <p className="text-sm font-medium text-[#9A742B] dark:text-[#D8B66E]">
              {t.products.inscriptionHighlight}
            </p>
          </div>
        </div>

        {/* Interactive Category Tabs + Instant Bilingual Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label={t.products.title}
            className="inline-flex items-center gap-1 p-1 rounded-full bg-[#EFE7D8] dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/20 self-start"
          >
            {(
              [
                { key: 'all', label: t.products.filterAll },
                { key: 'signature', label: t.products.filterSignature },
                { key: 'bespoke', label: t.products.filterBespoke },
              ] as const
            ).map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0F2A44] text-[#FAF6EE] dark:bg-[#C9A45C] dark:text-[#081523]'
                      : 'text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 hover:text-[#0F2A44] dark:hover:text-[#FAF6EE]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto lg:min-w-[340px]">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-[#0F2A44]/50 dark:text-[#D8B66E]/70 absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t.products.searchLabel}
                placeholder={t.products.searchPlaceholder}
                className="w-full rounded-full ps-10 pe-10 py-2.5 text-sm bg-white dark:bg-[#0E2236] text-[#0F2A44] dark:text-[#FAF6EE] placeholder:text-[#0F2A44]/50 dark:placeholder:text-[#F4EFE4]/50 border border-[#0F2A44]/15 dark:border-[#C9A45C]/25 focus:border-[#C9A45C] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={t.actions.clearSearch}
                  className="w-7 h-7 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 end-2 text-[#0F2A44]/65 dark:text-[#D8B66E] hover:bg-[#0F2A44]/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
            <span className="text-xs font-medium text-[#9A742B] dark:text-[#D8B66E] whitespace-nowrap tabular-nums">
              {t.products.resultsCount(filteredProducts.length)}
            </span>
          </div>
        </div>
      </header>

      {/* Empty Search Result State */}
      {filteredProducts.length === 0 && (
        <div className="rounded-2xl p-10 text-center bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/20 space-y-4">
          <p className="text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
            {t.products.noResultsTitle}
          </p>
          <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75">
            {t.products.noResultsDesc}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#C9A45C] dark:text-[#081523] dark:hover:bg-[#D8B66E] transition-colors cursor-pointer"
          >
            {t.actions.resetFilters}
          </button>
        </div>
      )}

      {/* Signature Cakes & Sweets (Real Photography, Zero Prices) */}
      {signatureItems.length > 0 && (
        <section className="space-y-6">
          <h2
            className={`text-xl sm:text-2xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.products.filterSignature}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureItems.map((item) => {
              const photoIdx = getPhotoIndex(item.photoUrl);
              return (
                <article
                  key={item.id}
                  className="group rounded-xl overflow-hidden bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 flex flex-col transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  {item.photoUrl && (
                    <button
                      type="button"
                      onClick={() => photoIdx >= 0 && onOpenPhoto(photoIdx)}
                      aria-label={`${t.actions.zoomPhotoAria}: ${
                        lang === 'ar' ? item.nameAr : item.nameEn
                      }`}
                      className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C9A45C]"
                    >
                      <PhotoFrame
                        src={item.photoUrl}
                        alt={
                          lang === 'ar'
                            ? item.photoAltAr ?? item.nameAr
                            : item.photoAltEn ?? item.nameEn
                        }
                        fallbackTitle={lang === 'ar' ? item.nameAr : item.nameEn}
                        className="w-full h-full"
                        imgClassName="group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-3 end-3 w-9 h-9 rounded-full flex items-center justify-center bg-[#0F2A44]/85 text-[#D8B66E] border border-[#C9A45C]/30"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  )}
                  <div className="p-5 space-y-2 flex-1">
                    <h3 className="text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                      {lang === 'ar' ? item.nameAr : item.nameEn}
                    </h3>
                    {(item.subtitleAr || item.subtitleEn) && (
                      <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
                        {lang === 'ar' ? item.subtitleAr : item.subtitleEn}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Custom, 3D Cakes, Catering & Inscription */}
      {bespokeItems.length > 0 && (
        <section className="space-y-6">
          <h2
            className={`text-xl sm:text-2xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.products.filterBespoke}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bespokeItems.map((service, idx) => (
              <article
                key={service.id}
                className="rounded-xl p-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/20 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#9A742B] dark:text-[#D8B66E] tabular-nums">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                    {lang === 'ar' ? service.nameAr : service.nameEn}
                  </h3>
                  <p className="text-sm text-[#0F2A44]/75 dark:text-[#F4EFE4]/75 leading-relaxed">
                    {lang === 'ar' ? service.subtitleAr : service.subtitleEn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Custom Orders & Catering Message Composer */}
      <CustomOrdersComposer lang={lang} showDeliveryNote />
    </div>
  );
}
