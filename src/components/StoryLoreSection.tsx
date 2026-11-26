import { Badge } from '@astryxdesign/core/Badge';
import { STORY_CHAPTERS } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';

export function StoryLoreSection() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="story"
      className="py-20 md:py-28 relative"
      style={{
        backgroundColor: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="pk-eyebrow">{t.story.eyebrow}</span>
          <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-3">
            {t.story.title}
          </h2>
          <p className="pk-text-muted mt-4 text-base sm:text-lg leading-relaxed">
            {t.story.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {STORY_CHAPTERS.map((chapter) => (
            <article
              key={chapter.id}
              className="group pk-card overflow-hidden transition-all hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#070A14]">
                <img
                  src={chapter.image}
                  alt={chapter.title[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant="yellow" label={chapter.tag} />
                </div>
              </div>
              <div className="p-6">
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {chapter.title[lang]}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {chapter.summary[lang]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
