import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Instagram,
} from 'lucide-react';
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

type WizardStep = 1 | 2 | 3;

const WIZARD_COPY = {
  ar: {
    stepOf: (step: WizardStep) => `خطوة ${step} من 3`,
    stepTitles: {
      1: 'اختر نوع الطلب',
      2: 'اكتب تفاصيل طلبك',
      3: 'راجِع وانسخ',
    },
    next: 'التالي',
    back: 'رجوع',
    disclaimer:
      'نسخ التفاصيل لا يعني تأكيد الطلب؛ يُؤكَّد الطلب مع النشاط مباشرة عبر قنوات التواصل أدناه.',
  },
  en: {
    stepOf: (step: WizardStep) => `Step ${step} of 3`,
    stepTitles: {
      1: 'Choose Service Type',
      2: 'Write Your Request Details',
      3: 'Review & Copy',
    },
    next: 'Next',
    back: 'Back',
    disclaimer:
      'Copying details does not confirm your order; orders are confirmed directly with the business through the contact channels below.',
  },
} as const;

export function CustomOrdersComposer({
  lang,
  initialService,
  showDeliveryNote = false,
}: CustomOrdersComposerProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedService, setSelectedService] =
    useState<CustomServiceKey | null>(initialService ?? null);
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      setStep(1);
    }
  }, [initialService]);

  const t = COPY[lang];
  const w = WIZARD_COPY[lang];
  const isRtl = lang === 'ar';
  const NextArrow = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const activeService = selectedService
    ? CUSTOM_SERVICES.find((s) => s.key === selectedService) ?? null
    : null;
  const serviceLabel = activeService
    ? lang === 'ar'
      ? activeService.labelAr
      : activeService.labelEn
    : '';

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
      className="scroll-mt-24 rounded-2xl p-6 sm:p-9 bg-[#0F2A44] text-[#FAF6EE] border-2 border-[#C9A45C]/50 space-y-6"
    >
      {/* Header + Clear Text Progress Indicator */}
      <div className="space-y-4 border-b border-[#FAF6EE]/20 pb-5">
        <div className="space-y-1.5">
          <h2
            className={`heading-balance text-2xl sm:text-3xl font-bold text-[#FAF6EE] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.customComposer.title}
          </h2>
          <p
            aria-live="polite"
            className="text-base sm:text-lg font-semibold text-[#E4C276]"
          >
            <span>{w.stepOf(step)}</span>
            <span aria-hidden="true" className="mx-2 text-[#FAF6EE]/60">
              —
            </span>
            <span className="text-[#FAF6EE]">{w.stepTitles[step]}</span>
          </p>
        </div>

        {/* Visual 3-segment progress bar */}
        <div
          aria-hidden="true"
          className="grid grid-cols-3 gap-2"
        >
          {([1, 2, 3] as const).map((idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-colors ${
                idx <= step ? 'bg-[#D8B464]' : 'bg-[#FAF6EE]/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Choose Service Type (3 Verified Options, Full-Width >=56px Buttons, Single Primary Next CTA) */}
      {step === 1 && (
        <div className="space-y-6">
          <div
            role="group"
            aria-label={w.stepTitles[1]}
            className="flex flex-col gap-3"
          >
            {CUSTOM_SERVICES.map((service) => {
              const isSelected = service.key === selectedService;
              const label = lang === 'ar' ? service.labelAr : service.labelEn;
              return (
                <button
                  key={service.key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedService(service.key);
                    setCopied(false);
                  }}
                  className={`w-full min-h-[56px] px-5 py-3.5 rounded-xl flex items-center justify-between gap-4 text-start text-base sm:text-[17px] font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF6EE] text-[#081523] border-2 border-[#D8B464]'
                      : 'bg-[#143454] text-[#FAF6EE] border-2 border-[#FAF6EE]/35 hover:border-[#E4C276]'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 ${
                      isSelected
                        ? 'bg-[#0F2A44] border-[#0F2A44] text-[#FAF6EE]'
                        : 'border-[#FAF6EE]/50 bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={!selectedService}
              onClick={() => selectedService && setStep(2)}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3 rounded-full inline-flex items-center justify-center gap-2 text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{w.next}</span>
              <NextArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Write Request Details (Single Existing Free-Text Field Only + Back & Next) */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2.5">
            <label
              htmlFor="crumbled-custom-message"
              className="block text-base font-semibold text-[#FAF6EE]"
            >
              {t.customComposer.textLabel}
            </label>
            <textarea
              id="crumbled-custom-message"
              rows={4}
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setCopied(false);
              }}
              placeholder={t.customComposer.textPlaceholder}
              className="w-full rounded-xl px-4 py-3.5 text-base bg-[#0A1E31] text-[#FAF6EE] placeholder:text-[#D9E2EC] border-2 border-[#FAF6EE]/35 focus:border-[#E4C276] resize-y leading-relaxed"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-h-[48px] px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 text-base font-semibold border-2 border-[#FAF6EE]/45 bg-[#143454] text-[#FAF6EE] hover:bg-[#1A426A] transition-colors cursor-pointer whitespace-nowrap"
            >
              <BackArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{w.back}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="min-h-[52px] px-8 py-3 rounded-full inline-flex items-center justify-center gap-2 text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{w.next}</span>
              <NextArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review & Copy (Read-Only Preview, Single Primary Copy CTA with 2s State, Literal Disclaimer, Verified Links Only) */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2.5">
            <p className="text-sm font-semibold text-[#EFE8DC]">
              {t.customComposer.previewLabel}
            </p>
            <div
              role="region"
              aria-label={t.customComposer.previewLabel}
              className="rounded-xl p-4 sm:p-5 bg-[#0A1E31] border-2 border-[#FAF6EE]/25 text-base text-[#FAF6EE] whitespace-pre-wrap leading-relaxed min-h-[88px] select-text"
            >
              {composedMessage}
            </div>
          </div>

          {/* Primary Single CTA: Copy Message (2s Copied state) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={handleCopyMessage}
              aria-live="polite"
              className="w-full sm:w-auto min-h-[54px] px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2.5 text-base font-bold bg-[#D8B464] text-[#081523] hover:bg-[#E5C57B] transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.actions.messageCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.actions.copyMessage}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 text-base font-semibold border-2 border-[#FAF6EE]/45 bg-[#143454] text-[#FAF6EE] hover:bg-[#1A426A] transition-colors cursor-pointer whitespace-nowrap"
            >
              <BackArrow className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{w.back}</span>
            </button>
          </div>

          {/* Literal Disclaimer + Verified Contact Channels Only */}
          <div className="space-y-4 pt-4 border-t border-[#FAF6EE]/20">
            <p className="text-base text-[#EFE8DC] leading-relaxed">
              {w.disclaimer}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={VERIFIED_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-base font-semibold border-2 border-[#E4C276] bg-[#143454] text-[#FAF6EE] hover:bg-[#1A426A] transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.actions.instagramDm}</span>
              </a>

              <a
                href={VERIFIED_LINKS.orderHub}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-base font-semibold border-2 border-[#FAF6EE]/45 bg-transparent text-[#FAF6EE] hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <span>{t.actions.orderHub}</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {showDeliveryNote && (
              <p className="text-sm text-[#EFE8DC]">
                {t.products.deliveryNote}{' '}
                <bdi dir="ltr" className="font-bold text-[#FAF6EE]">
                  {VERIFIED_INFO.deliveryApps.join(' · ')}
                </bdi>
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
