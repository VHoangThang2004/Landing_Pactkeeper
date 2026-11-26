import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@astryxdesign/core/Button';
import { IconButton } from '@astryxdesign/core/IconButton';
import { useLanguage } from '../i18n/LanguageContext';
import { useThemeMode } from '../context/ThemeModeContext';
import { SECTION_NODES } from './SectionRail';

interface NavbarProps {
  activeId: string;
  onDownloadClick: () => void;
}

export function Navbar({ activeId, onDownloadClick }: NavbarProps) {
  const { lang, toggleLang, t } = useLanguage();
  const { mode, toggleMode } = useThemeMode();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? 'color-mix(in srgb, var(--color-background-surface) 92%, transparent)'
          : 'color-mix(in srgb, var(--color-background-body) 58%, transparent)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid var(--color-border-emphasized)'
          : '1px solid color-mix(in srgb, var(--color-border) 55%, transparent)',
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
            <span className="pk-brand-title font-extrabold text-lg md:text-xl pk-gold-text block">
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

        {/* Desktop Editorial Nav with Sliding Active Underline */}
        <nav className="hidden lg:flex items-center gap-1">
          {SECTION_NODES.map((node) => {
            const isActive = activeId === node.id;
            return (
              <a
                key={node.id}
                href={`#${node.id}`}
                className="relative px-3.5 py-2 text-sm font-semibold transition-colors"
                style={{
                  color: isActive ? 'var(--color-text-accent)' : 'var(--color-text-primary)',
                  opacity: isActive ? 1 : 0.78,
                }}
              >
                <span>{node.label[lang]}</span>
                {isActive && (
                  <motion.span
                    layoutId="pk-nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute left-3 right-3 bottom-0 h-[2px] rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
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
            icon={<Languages className="w-4 h-4" />}
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
          className="lg:hidden px-4 py-5 space-y-2.5"
          style={{
            backgroundColor: 'var(--color-background-surface)',
            borderBottom: '1px solid var(--color-border-emphasized)',
          }}
        >
          {SECTION_NODES.map((node) => (
            <a
              key={node.id}
              href={`#${node.id}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2 text-base font-semibold"
              style={{
                color:
                  activeId === node.id ? 'var(--color-text-accent)' : 'var(--color-text-primary)',
              }}
            >
              <span>{node.label[lang]}</span>
              <span className="font-mono text-xs opacity-60">{node.num}</span>
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
