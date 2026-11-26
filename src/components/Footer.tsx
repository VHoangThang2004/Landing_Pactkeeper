import { Divider } from '@astryxdesign/core/Divider';
import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="py-12"
      style={{
        backgroundColor: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border-emphasized)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-8 pb-8">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/ui/pactkeeper_logo.png"
                alt="Pactkeeper Crest"
                className="w-10 h-10 object-contain pixel-art pk-logo-glow"
              />
              <span className="font-display font-extrabold text-lg pk-gold-text tracking-wider">
                PACTKEEPER
              </span>
            </div>
            <p
              className="text-sm max-w-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t.footer.tagline}
            </p>
          </div>

          <div
            className="md:col-span-7 space-y-2 text-xs sm:text-sm md:text-right"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {t.footer.capstone}
            </p>
            <p>{t.footer.team}</p>
            <p className="opacity-80">{t.footer.supervisor}</p>
          </div>
        </div>

        <Divider />

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-5 font-medium">
            <a href="#mechanics" className="hover:underline">
              {t.nav.mechanics}
            </a>
            <a href="#classes" className="hover:underline">
              {t.nav.classes}
            </a>
            <a href="#modes" className="hover:underline">
              {t.nav.modes}
            </a>
            <a href="#faq" className="hover:underline">
              {t.nav.faq}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
