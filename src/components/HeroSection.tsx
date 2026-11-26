import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  Images,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { HERO_SLIDES } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';
import { AmbientParticles } from './AmbientParticles';

interface HeroSectionProps {
  onDownloadClick: () => void;
  onGalleryClick: (index: number) => void;
}

const SLIDE_INTERVAL_MS = 4600;

export function HeroSection({ onDownloadClick, onGalleryClick }: HeroSectionProps) {
  const { lang, t } = useLanguage();
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const currentSlide = HERO_SLIDES[slideIdx];
  const prevSlide = () =>
    setSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);

  return (
    <section
      id="top"
      className="relative min-h-[96dvh] flex flex-col justify-end pt-28 pb-10 md:pb-14 overflow-hidden"
    >
      {/* Full-Bleed Continuous Ken Burns Game Art Stage */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentSlide.src}
            src={currentSlide.src}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.42, scale: 1.0 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Cinematic Vignette & Theme-Aware Scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, color-mix(in srgb, var(--color-background-body) 94%, transparent) 0%, color-mix(in srgb, var(--color-background-body) 68%, transparent) 55%, color-mix(in srgb, var(--color-background-body) 42%, transparent) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--color-background-body) 72%, transparent) 0%, transparent 35%, color-mix(in srgb, var(--color-background-body) 96%, transparent) 100%)',
          }}
        />
      </div>

      {/* Floating Golden & Arcane Cyan Dust Motes */}
      <AmbientParticles />

      {/* Main Editorial Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left Editorial Identity & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Crest + Index Tag */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1.5 shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-background-card)',
                  border: '1px solid var(--color-border-emphasized)',
                  boxShadow: 'var(--shadow-med)',
                }}
              >
                <img
                  src="/assets/ui/pactkeeper_logo.png"
                  alt="Pactkeeper Royal Crest"
                  className="w-full h-full object-contain pixel-art pk-logo-glow"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="yellow"
                    icon={<Sparkles className="w-3.5 h-3.5" />}
                    label={t.hero.badge}
                  />
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    01 / 06
                  </span>
                </div>
                <p
                  className="text-xs font-mono uppercase tracking-[0.16em]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Unity 6 • ASP.NET Core • Headless 1v1 PvP
                </p>
              </div>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-[56px] leading-[1.12] tracking-tight">
              <span className="block" style={{ color: 'var(--color-text-primary)' }}>
                {t.hero.titleLine1}
              </span>
              <span className="pk-gold-text block mt-1.5">{t.hero.titleLine2}</span>
            </h1>

            <div className="pk-diamond-divider">
              <span className="pk-diamond-divider-node" />
            </div>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <div className="pk-primary-cta">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onDownloadClick}
                  icon={<Download className="w-5 h-5" />}
                  label={`${t.hero.ctaPrimary} · ${t.hero.ctaSub}`}
                />
              </div>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => onGalleryClick(slideIdx)}
                icon={<Images className="w-4 h-4" />}
                label={t.hero.ctaSecondary}
              />
            </div>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-2">
              {t.hero.trust.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-semibold"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <ShieldCheck
                    className="w-4 h-4 shrink-0"
                    style={{ color: 'var(--color-icon-accent)' }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Floating Scene Showcase Deck */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="pk-crest-frame rounded-2xl p-2">
              <div className="relative rounded-xl overflow-hidden bg-[#070A14] aspect-[16/10] group">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentSlide.src}
                    src={currentSlide.src}
                    alt={currentSlide.caption[lang]}
                    initial={{ opacity: 0, scale: 1.07 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.85, ease: 'easeInOut' }}
                    onClick={() => onGalleryClick(slideIdx)}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/92 via-transparent to-[#070A14]/30 pointer-events-none" />

                {/* Top Tag + Expand */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#070A14]/80 backdrop-blur border border-[#F2BF4E]/45 text-[#F2BF4E] font-mono text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                    {currentSlide.tag}
                  </span>

                  <button
                    type="button"
                    onClick={() => onGalleryClick(slideIdx)}
                    aria-label={t.hero.ctaSecondary}
                    className="w-8 h-8 rounded-lg bg-[#070A14]/75 backdrop-blur border border-white/20 text-slate-100 hover:border-[#F2BF4E] hover:text-[#F2BF4E] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Expand className="w-4 h-4" />
                  </button>
                </div>

                {/* Prev / Next */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous scene"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#070A14]/75 border border-white/20 text-white hover:bg-[#F2BF4E] hover:text-[#070A14] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next scene"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#070A14]/75 border border-white/20 text-white hover:bg-[#F2BF4E] hover:text-[#070A14] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Caption + 6 Progress Bars */}
                <div className="absolute bottom-3 inset-x-3.5 space-y-2">
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-300">
                        {t.hero.showcaseCaption}
                      </p>
                      <p className="text-sm font-bold text-white truncate">
                        {currentSlide.caption[lang]}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#F2BF4E] bg-[#070A14]/80 px-2 py-0.5 rounded border border-[#F2BF4E]/35 shrink-0">
                      0{slideIdx + 1} / 0{HERO_SLIDES.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    {HERO_SLIDES.map((s, i) => (
                      <button
                        key={s.src}
                        type="button"
                        onClick={() => setSlideIdx(i)}
                        aria-label={`Scene ${i + 1}`}
                        className="h-1 rounded-full bg-white/25 overflow-hidden cursor-pointer"
                      >
                        {i === slideIdx ? (
                          <motion.div
                            key={`${slideIdx}-${paused}`}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{
                              duration: paused ? 0.2 : SLIDE_INTERVAL_MS / 1000,
                              ease: 'linear',
                            }}
                            className="h-full bg-[#F2BF4E]"
                          />
                        ) : (
                          <div
                            className={`h-full ${
                              i < slideIdx ? 'w-full bg-[#F2BF4E]/60' : 'w-0'
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll-Down Editorial Cue */}
      <div className="relative z-10 mt-10 flex justify-center">
        <a
          href="#combat"
          className="inline-flex flex-col items-center gap-1 text-[11px] font-mono uppercase tracking-[0.25em] opacity-75 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <span>{lang === 'vi' ? 'Cuộn xuống khám phá' : 'Scroll to Explore'}</span>
          <ChevronDown
            className="w-4 h-4 animate-bounce"
            style={{ color: 'var(--color-icon-accent)' }}
          />
        </a>
      </div>
    </section>
  );
}
