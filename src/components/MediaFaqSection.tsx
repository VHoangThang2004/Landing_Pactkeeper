import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  Download,
  Expand,
  HelpCircle,
  Images,
  LogIn,
  Monitor,
  Rocket,
  Swords,
} from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { HERO_SLIDES } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';

interface MediaFaqSectionProps {
  onDownloadClick: () => void;
  onGalleryClick: (index: number) => void;
}

type HubTab = 'gallery' | 'quickstart' | 'faq';

export function MediaFaqSection({ onDownloadClick, onGalleryClick }: MediaFaqSectionProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<HubTab>('quickstart');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stepIcons = [Download, LogIn, Swords];

  const tabs: { id: HubTab; icon: typeof Images; label: { en: string; vi: string } }[] = [
    { id: 'quickstart', icon: Rocket, label: { en: 'Quick Start & Specs', vi: 'Bắt Đầu & Cấu Hình' } },
    { id: 'gallery', icon: Images, label: { en: 'Media Gallery (6)', vi: 'Thư Viện Ảnh (6)' } },
    { id: 'faq', icon: HelpCircle, label: { en: 'FAQ', vi: 'Câu Hỏi Thường Gặp' } },
  ];

  return (
    <section
      id="media-faq"
      className="py-20 md:py-28 relative"
      style={{
        backgroundColor: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + 3 Hub Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
          <div>
            <span className="pk-eyebrow">
              06 · {lang === 'vi' ? 'THƯ VIỆN, CẤU HÌNH & HỎI ĐÁP' : 'MEDIA, SPECS & FAQ'}
            </span>
            <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-2">
              {activeTab === 'gallery'
                ? lang === 'vi'
                  ? 'Thư Viện Hình Ảnh Trong Game'
                  : 'In-Game Media & Art Gallery'
                : activeTab === 'quickstart'
                  ? t.howItWorks.title
                  : t.faq.title}
            </h2>
          </div>

          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl self-start lg:self-auto"
            style={{
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {tabs.map((tab) => {
              const selected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  style={{
                    color: selected
                      ? 'var(--color-on-accent)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  {selected && (
                    <motion.span
                      layoutId="pk-media-hub-tab"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                  )}
                  <Icon className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10">{tab.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => onGalleryClick(idx)}
                  className="group relative rounded-2xl overflow-hidden pk-card text-left cursor-pointer"
                >
                  <div className="relative aspect-[16/10] bg-[#070A14] overflow-hidden">
                    <img
                      src={slide.src}
                      alt={slide.caption[lang]}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/85 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="yellow" label={slide.tag} />
                    </div>
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/65 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Expand className="w-4 h-4" />
                    </span>
                    <p className="absolute bottom-3 inset-x-4 text-sm font-bold text-white truncate">
                      {slide.caption[lang]}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === 'quickstart' && (
            <motion.div
              key="quickstart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-3 gap-5">
                {t.howItWorks.steps.map((step, i) => {
                  const Icon = stepIcons[i];
                  return (
                    <Card key={step.num} variant="default" padding={5} width="100%">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: 'var(--color-accent-muted)',
                            border: '1px solid var(--color-border-emphasized)',
                            color: 'var(--color-icon-accent)',
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className="font-mono font-black text-3xl opacity-25"
                          style={{ color: 'var(--color-text-accent)' }}
                        >
                          {step.num}
                        </span>
                      </div>
                      <h3
                        className="font-display font-bold text-lg mb-1.5"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {step.desc}
                      </p>
                    </Card>
                  );
                })}
              </div>

              <Card variant="default" padding={6} width="100%">
                <div className="flex items-center gap-3 mb-4">
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
                <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.faq.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl p-3.5"
                      style={{
                        backgroundColor: 'var(--color-background-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <dt
                        className="text-[11px] font-mono uppercase"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {spec.label}
                      </dt>
                      <dd
                        className="text-sm font-semibold mt-1"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="max-w-3xl mx-auto space-y-3"
            >
              {t.faq.items.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={item.q} className="pk-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Royal Crest CTA Banner */}
        <div className="mt-20 relative rounded-3xl overflow-hidden pk-crest-frame">
          <img
            src="/assets/story/bg_c0_heavenly_eye.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-18"
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
