import { useState, useEffect } from 'react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@astryxdesign/core/Button';
import { IconButton } from '@astryxdesign/core/IconButton';
import { useLanguage } from '../i18n/LanguageContext';
import { useThemeMode } from '../context/ThemeModeContext';

interface NavbarProps {
  onDownloadClick: () => void;
}

export function Navbar({ onDownloadClick }: NavbarProps) {
  const { lang, toggleLang, t } = useLanguage();
  const { mode, toggleMode } = useThemeMode();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#mechanics', label: t.nav.mechanics },
    { href: '#classes', label: t.nav.classes },
    { href: '#modes', label: t.nav.modes },
    { href: '#story', label: t.nav.story },
    { href: '#fairness', label: t.nav.fairness },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? 'color-mix(in srgb, var(--color-background-surface) 90%, transparent)'
          : 'color-mix(in srgb, var(--color-background-body) 72%, transparent)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled
          ? '1px solid var(--color-border-emphasized)'
          : '1px solid var(--color-border)',
        boxShadow: scrolled ? 'var(--shadow-med)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Official Royal Crest Brand */}
        <a href="#top" className="flex items-center gap-3 group shrink-0">
          <div
            className="relative w-11 h-11 rounded-xl flex items-center justify-center p-1 transition-transform group-hover:scale-105"
            style={{
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border-emphasized)',
              boxShadow: 'var(--shadow-low)',
            }}
          >
            <img
              src="/assets/ui/pactkeeper_logo.png"
              alt="Pactkeeper Royal Crest"
              className="w-full h-full object-contain pixel-art pk-logo-glow"
            />
          </div>
          <div className="leading-tight">
            <span className="font-display font-extrabold tracking-wider text-lg md:text-xl pk-gold-text block">
              PACTKEEPER
            </span>
            <span
              className="text-[10px] font-mono uppercase tracking-[0.2em] hidden sm:block"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              2-Player Strategy RPG
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold transition-colors hover:opacity-100 opacity-80"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions: Theme Toggle (Parchment Light / Royal Dark), Language Toggle, Astryx Primary CTA */}
        <div className="flex items-center gap-2.5">
          <IconButton
            variant="secondary"
            size="sm"
            label={mode === 'dark' ? 'Switch to Parchment Light Mode' : 'Switch to Royal Dark Mode'}
            icon={mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            onClick={toggleMode}
          />

          <Button
            variant="secondary"
            size="sm"
            onClick={toggleLang}
            icon={
              <img
                src={lang === 'en' ? '/assets/ui/UK_Lang.png' : '/assets/ui/VN_Lang.png'}
                alt={lang.toUpperCase()}
                className="w-4 h-4 object-contain"
              />
            }
            label={lang.toUpperCase()}
          />

          <div className="hidden sm:block pk-primary-cta">
            <Button
              variant="primary"
              size="sm"
              onClick={onDownloadClick}
              icon={<Download className="w-4 h-4" />}
              label={t.nav.download}
            />
          </div>

          <div className="lg:hidden">
            <IconButton
              variant="secondary"
              size="sm"
              label="Toggle Menu"
              icon={mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              onClick={() => setMobileOpen((v) => !v)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden px-4 py-5 space-y-3"
          style={{
            backgroundColor: 'var(--color-background-surface)',
            borderBottom: '1px solid var(--color-border-emphasized)',
          }}
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 pk-primary-cta">
            <Button
              variant="primary"
              size="md"
              width="100%"
              onClick={() => {
                setMobileOpen(false);
                onDownloadClick();
              }}
              icon={<Download className="w-4 h-4" />}
              label={t.nav.download}
            />
          </div>
        </div>
      )}
    </header>
  );
}
