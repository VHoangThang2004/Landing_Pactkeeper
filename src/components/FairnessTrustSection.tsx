import { Scale, Gift, Server, Wifi, ExternalLink } from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { useLanguage } from '../i18n/LanguageContext';

export function FairnessTrustSection() {
  const { t } = useLanguage();
  const icons = [Scale, Gift, Server, Wifi];
  const topupUrl = (import.meta.env.VITE_TOPUP_URL as string | undefined)?.trim();

  return (
    <section
      id="fairness"
      className="py-20 md:py-28 relative"
      style={{
        backgroundColor: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="pk-eyebrow">{t.fairness.eyebrow}</span>
          <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-3">
            {t.fairness.title}
          </h2>
          <p className="pk-text-muted mt-4 text-base sm:text-lg leading-relaxed">
            {t.fairness.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.fairness.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <Card key={card.title} variant="default" padding={5} width="100%">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'var(--color-success-muted)',
                    color: 'var(--color-icon-success)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className="font-display font-bold text-base sm:text-lg mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {card.desc}
                </p>
              </Card>
            );
          })}
        </div>

        {/* PayOS Info Strip */}
        <div className="mt-8 pk-card px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-sm text-center sm:text-left font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t.fairness.topupNote}
          </p>
          {topupUrl ? (
            <Button
              variant="secondary"
              size="sm"
              href={topupUrl}
              target="_blank"
              rel="noreferrer"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              label={t.fairness.topupBtn}
            />
          ) : (
            <Badge variant="success" label="PayOS • VietQR Verified" />
          )}
        </div>
      </div>
    </section>
  );
}
