import { Trophy, Swords, Users, BookOpen } from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { RANK_TIERS } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';

export function ModesAndRankingSection() {
  const { t } = useLanguage();
  const modeIcons = [Trophy, Swords, Users, BookOpen];

  return (
    <section
      id="modes"
      className="py-20 md:py-28 relative"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="pk-eyebrow">{t.modes.eyebrow}</span>
          <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-3">
            {t.modes.title}
          </h2>
          <p className="pk-text-muted mt-4 text-base sm:text-lg leading-relaxed">
            {t.modes.subtitle}
          </p>
        </div>

        {/* 4 Game Mode Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {t.modes.list.map((mode, idx) => {
            const Icon = modeIcons[idx];
            return (
              <Card key={mode.name} variant="default" padding={5} width="100%">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--color-accent-muted)',
                      color: 'var(--color-icon-accent)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="neutral" label={mode.tag} />
                </div>
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {mode.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {mode.desc}
                </p>
              </Card>
            );
          })}
        </div>

        {/* 7-Tier Ranked Ladder */}
        <Card variant="default" padding={6} width="100%">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3
              className="font-display font-bold text-2xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t.modes.ladderTitle}
            </h3>
            <p className="text-sm mt-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              {t.modes.ladderSub}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {RANK_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl p-4 text-center flex flex-col items-center justify-between transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--color-background-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 mb-3"
                  style={{
                    borderColor: tier.color,
                    color: tier.color,
                    backgroundColor: `${tier.color}1C`,
                  }}
                >
                  {tier.badge}
                </div>
                <div
                  className="font-bold text-xs sm:text-sm leading-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {tier.name}
                </div>
                <div
                  className="text-[11px] font-mono mt-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {tier.lp}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
