import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Compass } from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { STORY_CHAPTERS } from '../data/gameData';
import { LORE_CODEX } from '../data/chronicles';
import { useLanguage } from '../i18n/LanguageContext';

type WorldTab = 'chapters' | 'codex';

export function WorldLoreSection() {
  const { lang, t } = useLanguage();
  const [worldTab, setWorldTab] = useState<WorldTab>('chapters');
  const [chapterIdx, setChapterIdx] = useState(0);
  const [codexId, setCodexId] = useState(LORE_CODEX[0].id);

  const activeChapter = STORY_CHAPTERS[chapterIdx] ?? STORY_CHAPTERS[0];
  const activeCodex = LORE_CODEX.find((c) => c.id === codexId) ?? LORE_CODEX[0];

  return (
    <section
      id="world"
      className="py-20 md:py-28 relative"
      style={{
        backgroundColor: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + 2 Mode Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <span className="pk-eyebrow">04 · {t.story.eyebrow}</span>
            <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-2">
              {t.story.title}
            </h2>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl self-start md:self-auto"
            style={{
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {[
              {
                id: 'chapters' as const,
                icon: Compass,
                label: lang === 'vi' ? 'Chiến Dịch (Ch.0 – Ch.3)' : 'Campaign Chapters',
              },
              {
                id: 'codex' as const,
                icon: BookOpen,
                label: lang === 'vi' ? 'Từ Điển Thế Giới' : 'Lore Codex',
              },
            ].map((tab) => {
              const selected = worldTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setWorldTab(tab.id)}
                  className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  style={{
                    color: selected
                      ? 'var(--color-on-accent)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  {selected && (
                    <motion.span
                      layoutId="pk-world-tab"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                  )}
                  <Icon className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {worldTab === 'chapters' ? (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Full-Bleed Scenic Chapter Stage */}
              <div className="relative rounded-2xl overflow-hidden pk-crest-frame min-h-[380px] sm:min-h-[440px] flex items-end">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={activeChapter.id}
                    src={activeChapter.image}
                    alt={activeChapter.title[lang]}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/95 via-[#070A14]/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070A14]/85 via-transparent to-transparent" />

                <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-3">
                  <Badge variant="yellow" label={activeChapter.tag} />
                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-white">
                    {activeChapter.title[lang]}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {activeChapter.summary[lang]}
                  </p>
                </div>
              </div>

              {/* 4 Interactive Chapter Timeline Nodes */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {STORY_CHAPTERS.map((ch, idx) => {
                  const selected = idx === chapterIdx;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setChapterIdx(idx)}
                      className="p-4 rounded-xl text-left transition-all cursor-pointer"
                      style={{
                        backgroundColor: selected
                          ? 'var(--color-accent-muted)'
                          : 'var(--color-background-card)',
                        border: selected
                          ? '1px solid var(--color-accent)'
                          : '1px solid var(--color-border)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="font-mono text-xs font-bold uppercase"
                          style={{ color: 'var(--color-text-accent)' }}
                        >
                          {ch.tag}
                        </span>
                        <span
                          className="font-mono text-[11px]"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          0{idx + 1}
                        </span>
                      </div>
                      <div
                        className="font-display font-bold text-sm leading-snug"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {ch.title[lang]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="codex"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left Codex Selector */}
              <div className="lg:col-span-5 space-y-3">
                {LORE_CODEX.map((entry) => {
                  const selected = entry.id === activeCodex.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setCodexId(entry.id)}
                      className="w-full p-4 rounded-xl text-left flex items-center gap-3.5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selected
                          ? 'var(--color-accent-muted)'
                          : 'var(--color-background-card)',
                        border: selected
                          ? '1px solid var(--color-accent)'
                          : '1px solid var(--color-border)',
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl p-1.5 flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--color-background-surface)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <img
                          src={entry.icon}
                          alt={entry.title[lang]}
                          className="w-full h-full object-contain pixel-art"
                        />
                      </div>
                      <div className="min-w-0">
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-wider block"
                          style={{ color: 'var(--color-text-accent)' }}
                        >
                          {entry.tag}
                        </span>
                        <span
                          className="font-display font-bold text-sm sm:text-base block truncate"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {entry.title[lang]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Codex Detail Pane */}
              <div className="lg:col-span-7">
                <Card variant="default" padding={6} width="100%">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl p-2 flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--color-accent-muted)',
                          border: '1px solid var(--color-border-emphasized)',
                        }}
                      >
                        <img
                          src={activeCodex.icon}
                          alt={activeCodex.title[lang]}
                          className="w-full h-full object-contain pixel-art pk-logo-glow"
                        />
                      </div>
                      <div>
                        <Badge variant="yellow" label={activeCodex.tag} />
                        <h3
                          className="font-display font-bold text-2xl mt-1.5"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {activeCodex.title[lang]}
                        </h3>
                        <p
                          className="text-xs font-mono"
                          style={{ color: 'var(--color-text-accent)' }}
                        >
                          {activeCodex.subtitle[lang]}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-sm sm:text-base leading-relaxed pt-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {activeCodex.description[lang]}
                    </p>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
