import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COPY, VERIFIED_FAQS, type Language } from '../data/crumbledData';

interface FaqAccordionProps {
  lang: Language;
}

export function FaqAccordion({ lang }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(VERIFIED_FAQS[0].id);
  const t = COPY[lang];

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
      <div className="space-y-1.5 border-b border-[#0F2A44]/10 dark:border-[#C9A45C]/15 pb-5">
        <h2
          className={`heading-balance text-2xl sm:text-3xl font-bold text-[#0F2A44] dark:text-[#FAF6EE] ${
            lang === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {t.home.faqTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#0F2A44]/75 dark:text-[#F4EFE4]/75">
          {t.home.faqSubtitle}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0E2236] border border-[#0F2A44]/10 dark:border-[#C9A45C]/15 divide-y divide-[#0F2A44]/10 dark:divide-[#C9A45C]/15">
        {VERIFIED_FAQS.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          return (
            <div key={item.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 text-start flex items-center justify-between gap-4 hover:bg-[#0F2A44]/[0.025] dark:hover:bg-white/[0.03] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C9A45C]"
                >
                  <span className="text-base font-semibold text-[#0F2A44] dark:text-[#FAF6EE]">
                    {lang === 'ar' ? item.questionAr : item.questionEn}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border border-[#0F2A44]/15 dark:border-[#C9A45C]/30 text-[#0F2A44] dark:text-[#D8B66E] transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180 bg-[#0F2A44] text-[#D8B66E] dark:bg-[#173654]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div
                  id={panelId}
                  className="px-6 pb-5 pt-0.5 text-sm sm:text-base text-[#0F2A44]/80 dark:text-[#F4EFE4]/80 leading-relaxed"
                >
                  {lang === 'ar' ? item.answerAr : item.answerEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
