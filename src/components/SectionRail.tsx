import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export interface SectionNode {
  id: string;
  num: string;
  label: { en: string; vi: string };
}

/**
 * Logical player-first journey:
 * 01 Home -> 02 Combat & Arena -> 03 6 Classes -> 04 World & Lore -> 05 Chronicles -> 06 Media & FAQ
 */
export const SECTION_NODES: SectionNode[] = [
  { id: 'top', num: '01', label: { en: 'Home', vi: 'Trang Chủ' } },
  { id: 'combat', num: '02', label: { en: 'Gameplay', vi: 'Lối Chơi' } },
  { id: 'classes', num: '03', label: { en: 'Classes', vi: '6 Hệ Tướng' } },
  { id: 'world', num: '04', label: { en: 'World & Lore', vi: 'Thế Giới' } },
  { id: 'chronicles', num: '05', label: { en: 'News', vi: 'Tin Tức' } },
  { id: 'media-faq', num: '06', label: { en: 'Start & FAQ', vi: 'Tải & FAQ' } },
];

export function useActiveSection() {
  const [activeId, setActiveId] = useState('top');

  useEffect(() => {
    const elements = SECTION_NODES.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-28% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

export function SectionRail({ activeId }: { activeId: string }) {
  const { lang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  return (
    <>
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0% 50%',
          background: 'linear-gradient(90deg, var(--color-info), var(--color-accent))',
        }}
        className="fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none"
      />

      <aside
        aria-label="Section navigation"
        className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      >
        {SECTION_NODES.map((node) => {
          const isActive = activeId === node.id;
          return (
            <a
              key={node.id}
              href={`#${node.id}`}
              className="group flex items-center gap-2.5 py-0.5"
            >
              <span
                className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md transition-all"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(6px)',
                  backgroundColor: 'var(--color-background-card)',
                  border: '1px solid var(--color-border-emphasized)',
                  color: 'var(--color-text-accent)',
                }}
              >
                {node.num} · {node.label[lang]}
              </span>
              <span
                className="block rounded-full transition-all"
                style={{
                  width: isActive ? '10px' : '6px',
                  height: isActive ? '26px' : '6px',
                  backgroundColor: isActive
                    ? 'var(--color-accent)'
                    : 'var(--color-border-emphasized)',
                  boxShadow: isActive
                    ? '0 0 12px color-mix(in srgb, var(--color-accent) 65%, transparent)'
                    : 'none',
                }}
              />
            </a>
          );
        })}
      </aside>
    </>
  );
}
