import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, Newspaper, X } from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { IconButton } from '@astryxdesign/core/IconButton';
import {
  CHRONICLES,
  type ChronicleArticle,
  type ChronicleCategory,
} from '../data/chronicles';
import { useLanguage } from '../i18n/LanguageContext';

type FilterTab = 'all' | ChronicleCategory;

const CATEGORY_LABELS: Record<FilterTab, { en: string; vi: string }> = {
  all: { en: 'All', vi: 'Tất Cả' },
  patch: { en: 'Patch Notes', vi: 'Cập Nhật' },
  event: { en: 'Events', vi: 'Sự Kiện' },
  dev: { en: 'Dev Notes', vi: 'Nhật Ký Dev' },
};

const CATEGORY_BADGE_VARIANT: Record<ChronicleCategory, 'yellow' | 'info' | 'success'> = {
  patch: 'yellow',
  event: 'info',
  dev: 'success',
};

export function ChroniclesSection() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [readingArticle, setReadingArticle] = useState<ChronicleArticle | null>(null);

  const featuredList = CHRONICLES.filter((c) => c.featured);
  const filteredList =
    activeTab === 'all' ? CHRONICLES : CHRONICLES.filter((c) => c.category === activeTab);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedIdx((prev) => (prev + 1) % featuredList.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [featuredList.length]);

  useEffect(() => {
    if (!readingArticle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReadingArticle(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [readingArticle]);

  const activeFeatured = featuredList[featuredIdx] ?? CHRONICLES[0];

  return (
    <section
      id="chronicles"
      className="py-20 md:py-28 relative"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="pk-eyebrow">
              05 · {lang === 'vi' ? 'BẢN TIN & CẬP NHẬT' : 'CHRONICLES & DISPATCHES'}
            </span>
            <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-2">
              {lang === 'vi' ? 'Tin Tức Mới Từ Divine Eye Realm' : 'Latest News & Patch Dispatches'}
            </h2>
          </div>

          {/* Animated Category Tabs */}
          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl self-start md:self-auto"
            style={{
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {(Object.keys(CATEGORY_LABELS) as FilterTab[]).map((tab) => {
              const selected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  style={{
                    color: selected
                      ? 'var(--color-on-accent)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  {selected && (
                    <motion.span
                      layoutId="pk-chronicles-tab"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                  )}
                  <span className="relative z-10">{CATEGORY_LABELS[tab][lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Editorial Split */}
        <div className="grid lg:grid-cols-12 gap-7 items-stretch">
          {/* Left: Featured Carousel */}
          <div className="lg:col-span-6">
            <div
              onClick={() => setReadingArticle(activeFeatured)}
              className="group relative h-full min-h-[340px] rounded-2xl overflow-hidden pk-crest-frame cursor-pointer flex flex-col justify-end"
            >
              <AnimatePresence mode="sync">
                <motion.img
                  key={activeFeatured.id}
                  src={activeFeatured.image}
                  alt={activeFeatured.title[lang]}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/95 via-[#070A14]/45 to-transparent" />

              <div className="relative z-10 p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={CATEGORY_BADGE_VARIANT[activeFeatured.category]}
                    label={CATEGORY_LABELS[activeFeatured.category][lang]}
                  />
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeFeatured.date}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug group-hover:text-[#F2BF4E] transition-colors">
                  {activeFeatured.title[lang]}
                </h3>
                <p className="text-sm text-slate-300 line-clamp-2">
                  {activeFeatured.summary[lang]}
                </p>

                {/* Carousel Dots */}
                <div
                  className="flex items-center gap-2 pt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {featuredList.map((f, i) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFeaturedIdx(i)}
                      aria-label={`Featured ${i + 1}`}
                      className="h-1.5 rounded-full transition-all cursor-pointer"
                      style={{
                        width: i === featuredIdx ? '28px' : '10px',
                        backgroundColor:
                          i === featuredIdx ? '#F2BF4E' : 'rgba(255,255,255,0.3)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tabbed Editorial Article Feed */}
          <div className="lg:col-span-6">
            <Card variant="default" padding={5} width="100%">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="divide-y"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {filteredList.map((article) => (
                    <button
                      key={article.id}
                      type="button"
                      onClick={() => setReadingArticle(article)}
                      className="group w-full py-4 first:pt-1 last:pb-1 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <Badge
                            variant={CATEGORY_BADGE_VARIANT[article.category]}
                            label={CATEGORY_LABELS[article.category][lang]}
                          />
                          <span
                            className="text-xs font-mono"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {article.date}
                          </span>
                        </div>
                        <div
                          className="font-semibold text-sm sm:text-base truncate group-hover:underline"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {article.title[lang]}
                        </div>
                        <p
                          className="text-xs line-clamp-1"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {article.summary[lang]}
                        </p>
                      </div>

                      <ArrowRight
                        className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: 'var(--color-icon-accent)' }}
                      />
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>

      {/* Chronicle Article Reader Modal */}
      {readingArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ backgroundColor: 'var(--color-overlay)' }}
          onClick={() => setReadingArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl pk-card-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[21/9] bg-[#070A14]">
              <img
                src={readingArticle.image}
                alt={readingArticle.title[lang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <IconButton
                  variant="secondary"
                  size="sm"
                  label="Close article"
                  icon={<X className="w-4 h-4" />}
                  onClick={() => setReadingArticle(null)}
                />
              </div>
              <div className="absolute bottom-3 left-5 flex items-center gap-2.5">
                <Badge
                  variant={CATEGORY_BADGE_VARIANT[readingArticle.category]}
                  icon={<Newspaper className="w-3 h-3" />}
                  label={CATEGORY_LABELS[readingArticle.category][lang]}
                />
                <span className="text-xs font-mono text-slate-200">{readingArticle.date}</span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-4">
              <h3
                className="font-display font-bold text-2xl leading-snug"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {readingArticle.title[lang]}
              </h3>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                {readingArticle.body[lang].map((para) => (
                  <p key={para} style={{ color: 'var(--color-text-secondary)' }}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="pt-3 flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setReadingArticle(null)}
                  label={lang === 'vi' ? 'Đóng bài viết' : 'Close Article'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
