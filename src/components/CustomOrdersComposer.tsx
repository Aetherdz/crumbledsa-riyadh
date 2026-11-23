import { useState } from 'react';
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
  showDeliveryNote?: boolean;
}

export function CustomOrdersComposer({
  lang,
  showDeliveryNote = false,
}: CustomOrdersComposerProps) {
  const [selectedService, setSelectedService] =
    useState<CustomServiceKey>('inscription');
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

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
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="rounded-2xl p-7 sm:p-9 bg-[#0F2A44] text-[#FAF6EE] border border-[#C9A45C]/30 space-y-7">
      <div className="space-y-2 max-w-2xl">
        <h2
          className={`heading-balance text-2xl sm:text-3xl font-bold text-[#FAF6EE] ${
            lang === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {t.customComposer.title}
        </h2>
        <p className="text-sm sm:text-base text-[#E4DCCD] leading-relaxed">
          {t.customComposer.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left / Start: 3 Verified Service Chips + Free-Text Field Only */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2.5">
            <p className="text-xs font-medium text-[#D8B66E]">
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
                    className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E] ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#081523]'
                        : 'bg-[#143454] text-[#FAF6EE] border border-[#C9A45C]/30 hover:border-[#D8B66E]'
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
              className="block text-xs font-medium text-[#D8B66E]"
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
              className="w-full rounded-xl px-4 py-3 text-sm bg-[#0A1E31] text-[#FAF6EE] placeholder:text-[#C5BDB0]/70 border border-[#C9A45C]/30 focus:border-[#D8B66E] focus:outline-none resize-y"
            />
          </div>
        </div>

        {/* Right / End: Live Composed Preview + Copy + Verified External Links Only */}
        <div className="lg:col-span-5 rounded-xl p-5 bg-[#0A1E31] border border-[#C9A45C]/25 flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-[#D8B66E]">
                {t.customComposer.previewLabel}
              </p>
              <button
                type="button"
                onClick={handleCopyMessage}
                aria-label={
                  copied ? t.actions.messageCopied : t.actions.copyMessage
                }
                title={copied ? t.actions.messageCopied : t.actions.copyMessage}
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-[#143454] text-[#D8B66E] border border-[#C9A45C]/35 hover:bg-[#1A426A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B66E]"
              >
                {copied ? (
                  <Check className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="rounded-lg p-3.5 bg-[#0F2A44]/80 border border-[#C9A45C]/15 text-sm text-[#F4EFE4] whitespace-pre-wrap leading-relaxed min-h-[76px]">
              {composedMessage}
            </div>

            {copied && (
              <p role="status" className="text-xs font-medium text-[#D8B66E]">
                {t.actions.messageCopied}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2 border-t border-[#C9A45C]/20">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#C9A45C] text-[#081523] hover:bg-[#D8B66E] transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>{t.actions.instagramDm}</span>
              </a>

              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-[#C9A45C]/45 text-[#FAF6EE] hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <span>{t.actions.orderHub}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {showDeliveryNote && (
              <p className="text-xs text-[#DFD7C8]">
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
