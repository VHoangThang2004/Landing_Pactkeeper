import { useEffect, useState } from 'react';
import { X, Download, CheckCircle2, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { IconButton } from '@astryxdesign/core/IconButton';
import { HERO_SLIDES } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';

interface GalleryModalProps {
  open: boolean;
  initialIndex: number;
  onClose: () => void;
}

export function GalleryModal({ open, initialIndex, onClose }: GalleryModalProps) {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % HERO_SLIDES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const slide = HERO_SLIDES[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden pk-card-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3 z-20">
          <IconButton
            variant="secondary"
            size="sm"
            label="Close gallery"
            icon={<X className="w-4 h-4" />}
            onClick={onClose}
          />
        </div>

        {/* Main Slide Image */}
        <div className="relative aspect-video bg-[#070A14] flex items-center justify-center">
          <img
            src={slide.src}
            alt={slide.caption[lang]}
            className="w-full h-full object-contain"
          />

          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#F2BF4E] hover:text-[#070A14] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#F2BF4E] hover:text-[#070A14] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption & Thumbnail Strip */}
        <div
          className="p-4 space-y-3"
          style={{
            backgroundColor: 'var(--color-background-card)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <Badge variant="yellow" label={slide.tag} />
              <span
                className="text-sm font-semibold truncate"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {slide.caption[lang]}
              </span>
            </div>
            <span
              className="font-mono text-xs shrink-0"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {index + 1} / {HERO_SLIDES.length}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {HERO_SLIDES.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setIndex(i)}
                className="relative aspect-video rounded-lg overflow-hidden transition-all cursor-pointer"
                style={{
                  border:
                    i === index
                      ? '2px solid var(--color-accent)'
                      : '2px solid transparent',
                  opacity: i === index ? 1 : 0.55,
                }}
              >
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export function DownloadModal({ open, onClose }: DownloadModalProps) {
  const { t } = useLanguage();
  const downloadUrl = (import.meta.env.VITE_DOWNLOAD_URL as string | undefined)?.trim();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 sm:p-7 pk-card-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <IconButton
            variant="ghost"
            size="sm"
            label="Close"
            icon={<X className="w-4 h-4" />}
            onClick={onClose}
          />
        </div>

        <div className="flex items-center gap-3.5 mb-5">
          <div
            className="w-12 h-12 rounded-xl p-1.5 flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--color-accent-muted)',
              border: '1px solid var(--color-border-emphasized)',
            }}
          >
            <img
              src="/assets/ui/pactkeeper_logo.png"
              alt="Pactkeeper"
              className="w-full h-full object-contain pixel-art"
            />
          </div>
          <div>
            <h3
              className="font-display font-bold text-xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t.downloadModal.title}
            </h3>
            <p className="text-xs font-mono" style={{ color: 'var(--color-text-accent)' }}>
              {t.downloadModal.version}
            </p>
          </div>
        </div>

        <div
          className="rounded-xl p-3.5 text-xs leading-relaxed mb-5 flex items-start gap-2.5"
          style={{
            backgroundColor: downloadUrl
              ? 'var(--color-success-muted)'
              : 'var(--color-warning-muted)',
            border: downloadUrl
              ? '1px solid var(--color-border-success)'
              : '1px solid var(--color-border-warning)',
            color: downloadUrl
              ? 'var(--color-on-success-muted)'
              : 'var(--color-on-warning-muted)',
          }}
        >
          {downloadUrl ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{downloadUrl ? t.downloadModal.readyMsg : t.downloadModal.noLinkMsg}</span>
        </div>

        <div className="mb-6">
          <p
            className="text-xs font-mono uppercase tracking-wider mb-2.5"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t.downloadModal.stepsTitle}
          </p>
          <ol className="space-y-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
            {t.downloadModal.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-2.5">
                <span
                  className="font-mono text-xs font-bold mt-0.5"
                  style={{ color: 'var(--color-text-accent)' }}
                >
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={onClose} label={t.downloadModal.closeBtn} />
          {downloadUrl && (
            <div className="pk-primary-cta">
              <Button
                variant="primary"
                size="sm"
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                icon={<Download className="w-4 h-4" />}
                label={t.downloadModal.directBtn}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
