import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, Instagram } from 'lucide-react';
import {
  COPY,
  CUSTOM_SERVICES,
  VERIFIED_INFO,
  VERIFIED_LINKS,
  type CustomServiceKey,
  type Language,
} from '../data/crumbledData';

interface CustomOrdersComposerProps {
  lang: Language;
  initialService?: CustomServiceKey;
  showDeliveryNote?: boolean;
}

export function CustomOrdersComposer({
  lang,
  initialService = 'inscription',
  showDeliveryNote = false,
}: CustomOrdersComposerProps) {
  const [selectedService, setSelectedService] =
    useState<CustomServiceKey>(initialService);
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedService(initialService);
  }, [initialService]);

  const t = COPY[lang];
  const activeService =
    CUSTOM_SERVICES.find((s) => s.key === selectedService) ??
    CUSTOM_SERVICES[0];
  const serviceLabel =
    lang === 'ar' ? activeService.labelAr : activeService.labelEn;

  const trimmedText = customText.trim();
  const composedMessage = trimmedText
    ? `${t.customComposer.prefixService} ${serviceLabel}\n${t.customComposer.prefixText} ${trimmedText}`
    : `${t.customComposer.prefixService} ${serviceLabel}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(composedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="custom-composer"
      className="scroll-mt-24 rounded-2xl p-7 sm:p-9 bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#C9A45C]/45 space-y-7"
    >
      <div className="space-y-2 max-w-2xl">
        <h2
          className={`heading-balance text-2xl sm:text-3xl font-bold text-[#FAF6EE] ${
            lang === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {t.customComposer.title}
        </h2>
        <p className="text-sm sm:text-base text-[#E6E0D5] leading-relaxed">
          {t.customComposer.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Start: 3 Verified Service Chips + Free-Text Field Only */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2.5">
            <p className="text-xs font-medium text-[#E6E0D5]">
              {t.customComposer.serviceLabel}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {CUSTOM_SERVICES.map((service) => {
                const isSelected = service.key === selectedService;
                return (
                  <button
                    key={service.key}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedService(service.key);
                      setCopied(false);
                    }}
                    className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#FAF6EE] text-[#081523] border-2 border-[#FAF6EE]'
                        : 'bg-[#143454] text-[#FAF6EE] border-2 border-[#FAF6EE]/25 hover:border-[#FAF6EE]/60'
                    }`}
                  >
                    {lang === 'ar' ? service.labelAr : service.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="crumbled-custom-message"
              className="block text-xs font-medium text-[#E6E0D5]"
            >
              {t.customComposer.textLabel}
            </label>
            <textarea
              id="crumbled-custom-message"
              rows={3}
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setCopied(false);
              }}
              placeholder={t.customComposer.textPlaceholder}
              className="w-full rounded-xl px-4 py-3 text-sm bg-[#0A1E31] text-[#FAF6EE] placeholder:text-[#CBD5E1]/70 border-2 border-[#FAF6EE]/25 focus:border-[#D8B66E] resize-y"
            />
          </div>
        </div>

        {/* End: Live Composed Preview + Clear 2s Copy Button + Verified External Links Only */}
        <div className="lg:col-span-5 rounded-xl p-5 bg-[#0A1E31] border-2 border-[#FAF6EE]/20 flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-[#E6E0D5]">
                {t.customComposer.previewLabel}
              </p>
              <button
                type="button"
                onClick={handleCopyMessage}
                aria-live="polite"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full shrink-0 text-xs font-semibold bg-[#16395C] text-[#FAF6EE] border-2 border-[#FAF6EE]/30 hover:bg-[#1E4A75] transition-colors cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.actions.messageCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.actions.copyMessage}</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-lg p-3.5 bg-[#0F2A44]/90 border border-[#FAF6EE]/15 text-sm text-[#FAF6EE] whitespace-pre-wrap leading-relaxed min-h-[76px]">
              {composedMessage}
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#FAF6EE]/15">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#D4AE5E] text-[#081523] hover:bg-[#E0BE74] transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>{t.actions.instagramDm}</span>
              </a>

              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2 border-[#FAF6EE]/40 text-[#FAF6EE] hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <span>{t.actions.orderHub}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs text-[#E2DDD2] leading-relaxed">
              {t.customComposer.disclaimer}
            </p>

            {showDeliveryNote && (
              <p className="text-xs text-[#CBD5E1]">
                {t.products.deliveryNote}{' '}
                <span dir="ltr" className="font-semibold text-[#FAF6EE]">
                  {VERIFIED_INFO.deliveryApps.join(' · ')}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
