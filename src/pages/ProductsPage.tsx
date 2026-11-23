import { useMemo, useState } from 'react';
import { Instagram, Maximize2, Search, X } from 'lucide-react';
import {
  COPY,
  PRODUCTS,
  REAL_PHOTOS,
  VERIFIED_LINKS,
  type CustomServiceKey,
  type Language,
} from '../data/crumbledData';
import { BrandBadge } from '../components/BrandBadge';
import { PhotoFrame } from '../components/PhotoFrame';
import { CustomOrdersComposer } from '../components/CustomOrdersComposer';

interface ProductsPageProps {
  lang: Language;
  initialService?: CustomServiceKey;
  onOpenPhoto: (index: number) => void;
}

type CategoryFilter = 'all' | 'signature' | 'bespoke';

export function ProductsPage({
  lang,
  initialService = 'inscription',
  onOpenPhoto,
}: ProductsPageProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');
  const t = COPY[lang];

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (filter !== 'all' && item.category !== filter) return false;
      if (!normalizedQuery) return true;
      const haystack = [item.nameAr, item.nameEn, item.tagAr, item.tagEn]
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
      {/* Page Header with Brand Emblem */}
      <header className="space-y-6 pb-8 border-b border-[#0F2A44]/15 dark:border-[#C9A45C]/25">
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
            <p className="text-base sm:text-[17px] text-[#263F59] dark:text-[#E6DFD2] max-w-2xl">
              {t.products.subtitle}
            </p>
          </div>
        </div>

        {/* Single Clear Pricing & Order Details Confirmation Line */}
        <p className="text-base sm:text-[17px] font-medium text-[#0F2A44] dark:text-[#FAF6EE] leading-relaxed rounded-xl px-5 py-3.5 bg-[#EFE7D8] dark:bg-[#0E2236] border border-[#0F2A44]/15 dark:border-[#C9A45C]/30">
          {t.home.pricingNotice}
        </p>

        {/* Interactive Category Tabs + Instant Bilingual Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label={t.products.title}
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#EFE7D8] dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20 self-start"
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
                  className={`min-h-[44px] px-4 py-2 rounded-full text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0F2A44] text-[#FAF6EE] dark:bg-[#D8B464] dark:text-[#081523]'
                      : 'text-[#0F2A44] dark:text-[#FAF6EE] hover:bg-[#0F2A44]/10 dark:hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto lg:min-w-[360px]">
            <div className="relative flex-1">
              <Search
                className="w-5 h-5 text-[#263F59] dark:text-[#E6DFD2] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t.products.searchLabel}
                placeholder={t.products.searchPlaceholder}
                className="w-full min-h-[46px] rounded-full ps-11 pe-11 py-2.5 text-base bg-white dark:bg-[#0E2236] text-[#0F2A44] dark:text-[#FAF6EE] placeholder:text-[#263F59]/80 dark:placeholder:text-[#E6DFD2]/80 border-2 border-[#0F2A44]/25 dark:border-[#F4EFE4]/25 focus:border-[#0F2A44] dark:focus:border-[#D8B464]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={t.actions.clearSearch}
                  title={t.actions.clearSearch}
                  className="w-9 h-9 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 end-1.5 text-[#0F2A44] dark:text-[#FAF6EE] hover:bg-[#0F2A44]/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <span className="text-sm font-semibold text-[#263F59] dark:text-[#E6DFD2] whitespace-nowrap tabular-nums">
              {t.products.resultsCount(filteredProducts.length)}
            </span>
          </div>
        </div>
      </header>

      {/* Empty Search Result State */}
      {filteredProducts.length === 0 && (
        <div className="rounded-2xl p-10 text-center bg-white dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#C9A45C]/30 space-y-4">
          <p className="text-lg font-bold text-[#0F2A44] dark:text-[#FAF6EE]">
            {t.products.noResultsTitle}
          </p>
          <p className="text-base text-[#263F59] dark:text-[#E6DFD2]">
            {t.products.noResultsDesc}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-full text-base font-semibold bg-[#0F2A44] text-[#FAF6EE] hover:bg-[#17395B] dark:bg-[#D8B464] dark:text-[#081523] dark:hover:bg-[#E5C57B] transition-colors cursor-pointer"
          >
            {t.actions.resetFilters}
          </button>
        </div>
      )}

      {/* Signature Cakes & Sweets — Unified 4:5 Vertical Cards Matching 1080x1350 Posters */}
      {signatureItems.length > 0 && (
        <section className="space-y-6">
          <h2
            className={`text-2xl sm:text-3xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.products.filterSignature}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureItems.map((item) => {
              const photoIdx = getPhotoIndex(item.photoUrl);
              const itemName = lang === 'ar' ? item.nameAr : item.nameEn;
              const itemTag = lang === 'ar' ? item.tagAr : item.tagEn;
              return (
                <article
                  key={item.id}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20 flex flex-col"
                >
                  {item.photoUrl && (
                    <button
                      type="button"
                      onClick={() => photoIdx >= 0 && onOpenPhoto(photoIdx)}
                      aria-label={`${t.actions.zoomPhotoAria}: ${itemName}`}
                      className="relative w-full aspect-[4/5] overflow-hidden bg-[#EDE5D5] dark:bg-[#0B1C2E] cursor-pointer"
                    >
                      <PhotoFrame
                        src={item.photoUrl}
                        alt={itemName}
                        fallbackTitle={itemName}
                        fit="cover"
                        objectPosition="object-center"
                        className="w-full h-full bg-[#EDE5D5] dark:bg-[#0B1C2E]"
                        imgClassName="group-hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-3 end-3 w-10 h-10 rounded-full flex items-center justify-center bg-[#0F2A44]/90 text-[#FAF6EE] border border-[#FAF6EE]/35"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </button>
                  )}
                  <div className="p-5 sm:p-6 flex flex-col justify-between gap-4 flex-1">
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[#EFE7D8] text-[#0F2A44] dark:bg-[#173654] dark:text-[#F4EFE4]">
                        {itemTag}
                      </span>
                      <h3 className="text-xl font-bold text-[#0F2A44] dark:text-[#FAF6EE]">
                        {itemName}
                      </h3>
                    </div>

                    <a
                      href={VERIFIED_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors whitespace-nowrap"
                    >
                      <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{t.actions.orderViaInstagram}</span>
                    </a>
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
            className={`text-2xl sm:text-3xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.products.filterBespoke}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bespokeItems.map((service) => {
              const serviceName =
                lang === 'ar' ? service.nameAr : service.nameEn;
              const serviceTag = lang === 'ar' ? service.tagAr : service.tagEn;
              return (
                <article
                  key={service.id}
                  className="rounded-2xl p-6 bg-white dark:bg-[#0E2236] border border-[#0F2A44]/20 dark:border-[#F4EFE4]/20 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-2.5">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[#EFE7D8] text-[#0F2A44] dark:bg-[#173654] dark:text-[#F4EFE4]">
                      {serviceTag}
                    </span>
                    <h3 className="text-xl font-bold text-[#0F2A44] dark:text-[#FAF6EE]">
                      {serviceName}
                    </h3>
                  </div>

                  <a
                    href={VERIFIED_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors whitespace-nowrap"
                  >
                    <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{t.actions.orderViaInstagram}</span>
                  </a>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Custom Orders & Catering Message Composer */}
      <CustomOrdersComposer
        lang={lang}
        initialService={initialService}
        showDeliveryNote
      />
    </div>
  );
}
