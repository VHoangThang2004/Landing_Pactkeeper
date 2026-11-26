import { Download, LogIn, Swords } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { useLanguage } from '../i18n/LanguageContext';

export function HowItWorksSection() {
  const { t } = useLanguage();
  const icons = [Download, LogIn, Swords];

  return (
    <section
      className="py-20 md:py-24 relative"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="pk-eyebrow">{t.howItWorks.eyebrow}</span>
          <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-3">
            {t.howItWorks.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.howItWorks.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Card key={step.num} variant="default" padding={6} width="100%">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
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
                  className="font-display font-bold text-lg mb-2"
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
      </div>
    </section>
  );
}
