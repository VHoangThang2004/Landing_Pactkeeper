import { useState } from 'react';
import { ChevronDown, Monitor, Download } from 'lucide-react';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { useLanguage } from '../i18n/LanguageContext';

interface SystemReqAndFaqSectionProps {
  onDownloadClick: () => void;
}

export function SystemReqAndFaqSection({ onDownloadClick }: SystemReqAndFaqSectionProps) {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 relative"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="pk-eyebrow">{t.faq.eyebrow}</span>
          <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-3">
            {t.faq.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* System Specs */}
          <div className="lg:col-span-5">
            <Card variant="default" padding={6} width="100%">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-accent-muted)',
                    color: 'var(--color-icon-accent)',
                  }}
                >
                  <Monitor className="w-5 h-5" />
                </div>
                <h3
                  className="font-display font-bold text-xl"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {t.faq.specsTitle}
                </h3>
              </div>
              <dl>
                {t.faq.specs.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1"
                    style={{
                      borderTop: idx === 0 ? 'none' : '1px solid var(--color-border)',
                    }}
                  >
                    <dt
                      className="text-xs font-mono uppercase"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {spec.label}
                    </dt>
                    <dd
                      className="text-sm font-semibold sm:text-right"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {t.faq.items.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={item.q} className="pk-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span
                      className="font-semibold text-sm sm:text-base"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      style={{ color: 'var(--color-icon-accent)' }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-4 pt-3 text-sm leading-relaxed"
                      style={{
                        borderTop: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Conversion CTA Banner with Official Royal Crest */}
        <div className="mt-20 relative rounded-3xl overflow-hidden pk-crest-frame">
          <img
            src="/assets/story/bg_c0_heavenly_eye.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--color-background-card) 92%, transparent), color-mix(in srgb, var(--color-background-surface) 84%, transparent))',
            }}
          />
          <div className="relative z-10 px-6 py-12 sm:py-16 text-center max-w-2xl mx-auto">
            <img
              src="/assets/ui/pactkeeper_logo.png"
              alt="Pactkeeper Royal Crest"
              className="w-20 h-20 mx-auto mb-5 object-contain pixel-art pk-logo-glow"
            />
            <h2 className="font-display font-black text-3xl sm:text-4xl pk-gold-text">
              {t.finalCta.title}
            </h2>
            <p
              className="mt-3 text-base sm:text-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t.finalCta.subtitle}
            </p>
            <div className="mt-7 flex justify-center pk-primary-cta">
              <Button
                variant="primary"
                size="lg"
                onClick={onDownloadClick}
                icon={<Download className="w-5 h-5" />}
                label={t.finalCta.btn}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
