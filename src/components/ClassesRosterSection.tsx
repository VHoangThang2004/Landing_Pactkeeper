import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Footprints,
  Shield,
  Sparkles,
  Swords,
} from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { TRINKETS, UNIT_CLASSES } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';

type RosterFilter = 'all' | 'starter' | 'unlock';
type DossierTab = 'overview' | 'skills' | 'armory';

export function ClassesRosterSection() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<RosterFilter>('all');
  const [selectedId, setSelectedId] = useState(UNIT_CLASSES[0].id);
  const [dossierTab, setDossierTab] = useState<DossierTab>('overview');
  const [gridMode, setGridMode] = useState<'move' | 'attack'>('move');

  const visibleUnits = UNIT_CLASSES.filter((u) => {
    if (filter === 'starter') return u.starter;
    if (filter === 'unlock') return !u.starter;
    return true;
  });

  const activeUnit =
    visibleUnits.find((u) => u.id === selectedId) ?? visibleUnits[0] ?? UNIT_CLASSES[0];
  const currentIdx = visibleUnits.findIndex((u) => u.id === activeUnit.id);

  const cycleUnit = (delta: number) => {
    if (visibleUnits.length <= 1) return;
    const nextIdx = (currentIdx + delta + visibleUnits.length) % visibleUnits.length;
    setSelectedId(visibleUnits[nextIdx].id);
  };

  const highlightedSet = new Set(
    (gridMode === 'move' ? activeUnit.moveSkill.cells : activeUnit.attackCells).map(
      ([r, c]) => `${r}-${c}`,
    ),
  );

  const filterLabels: Record<RosterFilter, { en: string; vi: string }> = {
    all: { en: 'All Classes (6)', vi: 'Tất Cả (6)' },
    starter: { en: 'Free at Login (5)', vi: 'Tặng Sẵn (5)' },
    unlock: { en: 'Collectible (1)', vi: 'Mở Khóa (1)' },
  };

  const dossierLabels: Record<DossierTab, { en: string; vi: string }> = {
    overview: { en: 'Overview & Passive', vi: 'Tổng Quan & Nội Tại' },
    skills: { en: 'Skills & 5×5 Grid', vi: 'Kỹ Năng & Bàn Cờ 5×5' },
    armory: { en: 'Armory & Trinkets', vi: 'Vũ Khí & Trinket' },
  };

  return (
    <section
      id="classes"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      {/* Oversized Theatrical Watermark */}
      <div className="absolute inset-x-0 top-24 flex justify-center overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeUnit.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="pk-watermark text-[18vw] lg:text-[150px] whitespace-nowrap"
          >
            {activeUnit.name.en.split(' ')[0]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
          <div>
            <span className="pk-eyebrow">03 · {t.classes.eyebrow}</span>
            <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-2">
              {t.classes.title}
            </h2>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl self-start lg:self-auto"
            style={{
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {(Object.keys(filterLabels) as RosterFilter[]).map((key) => {
              const selected = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setFilter(key);
                    const nextList = UNIT_CLASSES.filter((u) =>
                      key === 'starter' ? u.starter : key === 'unlock' ? !u.starter : true,
                    );
                    if (nextList[0] && !nextList.some((u) => u.id === selectedId)) {
                      setSelectedId(nextList[0].id);
                    }
                  }}
                  className="relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  style={{
                    color: selected
                      ? 'var(--color-on-accent)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  {selected && (
                    <motion.span
                      layoutId="pk-roster-filter"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                  )}
                  <span className="relative z-10">{filterLabels[key][lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-Stage Character Card */}
        <Card variant="default" padding={6} width="100%">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Theatrical Character Pedestal */}
            <div className="lg:col-span-5 flex flex-col items-center text-center relative">
              <div
                className="relative w-full max-w-[320px] aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${activeUnit.accentColor}2A 0%, var(--color-background-surface) 72%)`,
                  border: '1px solid var(--color-border-emphasized)',
                }}
              >
                {/* Prev / Next Arrows on Pedestal */}
                {visibleUnits.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => cycleUnit(-1)}
                      aria-label="Previous class"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: 'var(--color-background-card)',
                        border: '1px solid var(--color-border-emphasized)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => cycleUnit(1)}
                      aria-label="Next class"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: 'var(--color-background-card)',
                        border: '1px solid var(--color-border-emphasized)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeUnit.id}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.92, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-52 h-52 flex items-center justify-center"
                  >
                    <img
                      src={activeUnit.frame}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain opacity-90"
                    />
                    <img
                      src={activeUnit.sprite}
                      alt={activeUnit.name[lang]}
                      className="relative w-36 h-36 object-contain pixel-art drop-shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-3 left-3">
                  <Badge
                    variant={activeUnit.starter ? 'success' : 'warning'}
                    label={activeUnit.starter ? t.classes.starterBadge : t.classes.unlockBadge}
                  />
                </div>
                <div className="absolute bottom-3 inset-x-3 flex justify-center">
                  <span
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-background-card)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    0{currentIdx + 1} / 0{visibleUnits.length}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <h3
                  className="font-display font-bold text-2xl sm:text-3xl"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {activeUnit.name[lang]}
                </h3>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: 'var(--color-text-accent)' }}
                >
                  {activeUnit.role[lang]}
                </p>
              </div>
            </div>

            {/* Right Multi-Tab Tactical Dossier */}
            <div className="lg:col-span-7 space-y-5">
              {/* Sub-Tab Switcher */}
              <div
                className="flex flex-wrap items-center gap-1 p-1 rounded-xl"
                style={{
                  backgroundColor: 'var(--color-background-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {(Object.keys(dossierLabels) as DossierTab[]).map((tab) => {
                  const selected = dossierTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setDossierTab(tab)}
                      className="relative flex-1 min-w-[120px] px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      style={{
                        color: selected
                          ? 'var(--color-on-accent)'
                          : 'var(--color-text-secondary)',
                      }}
                    >
                      {selected && (
                        <motion.span
                          layoutId="pk-dossier-subtab"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          className="absolute inset-0 rounded-lg"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                      )}
                      <span className="relative z-10">{dossierLabels[tab][lang]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeUnit.id}-${dossierTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="min-h-[300px]"
                >
                  {dossierTab === 'overview' && (
                    <div className="space-y-4">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'HP', val: activeUnit.stats.hp, color: 'var(--color-text-success)' },
                          { label: 'SPEED', val: activeUnit.stats.speed, color: 'var(--color-text-accent)' },
                          { label: 'SP POOL', val: activeUnit.stats.sp, color: 'var(--color-text-info)' },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className="rounded-xl p-4 text-center"
                            style={{
                              backgroundColor: 'var(--color-background-surface)',
                              border: '1px solid var(--color-border)',
                            }}
                          >
                            <div
                              className="text-[11px] uppercase font-mono"
                              style={{ color: 'var(--color-text-secondary)' }}
                            >
                              {s.label}
                            </div>
                            <div
                              className="text-lg font-mono font-bold mt-1"
                              style={{ color: s.color }}
                            >
                              {s.val}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Passive Highlight */}
                      <div
                        className="rounded-xl p-5"
                        style={{
                          backgroundColor: 'var(--color-accent-muted)',
                          border: '1px solid var(--color-border-emphasized)',
                        }}
                      >
                        <div
                          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold mb-2"
                          style={{ color: 'var(--color-text-accent)' }}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {t.classes.passiveLabel}: {activeUnit.passive.name}
                          </span>
                        </div>
                        <p
                          className="text-sm sm:text-base leading-relaxed"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {activeUnit.passive.description[lang]}
                        </p>
                      </div>

                      {/* Quick Skill Summary */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div
                          className="rounded-xl p-4"
                          style={{
                            backgroundColor: 'var(--color-background-surface)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <div
                            className="flex items-center gap-2 text-xs font-mono font-bold mb-1"
                            style={{ color: 'var(--color-text-info)' }}
                          >
                            <Footprints className="w-4 h-4" />
                            <span>{activeUnit.moveSkill.name}</span>
                          </div>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {activeUnit.moveSkill.description[lang]}
                          </p>
                        </div>

                        <div
                          className="rounded-xl p-4"
                          style={{
                            backgroundColor: 'var(--color-background-surface)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span
                              className="flex items-center gap-2 text-xs font-mono font-bold"
                              style={{ color: 'var(--color-text-accent)' }}
                            >
                              <Shield className="w-4 h-4" />
                              {activeUnit.classSkill.name}
                            </span>
                            <Badge variant="yellow" label={`${activeUnit.classSkill.spCost} SP`} />
                          </div>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {activeUnit.classSkill.description[lang]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {dossierTab === 'skills' && (
                    <div className="grid sm:grid-cols-12 gap-5 items-center">
                      <div className="sm:col-span-6 space-y-3">
                        <div
                          className="rounded-xl p-4"
                          style={{
                            backgroundColor: 'var(--color-background-surface)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <div
                            className="text-xs font-mono font-bold mb-1"
                            style={{ color: 'var(--color-text-info)' }}
                          >
                            {t.classes.moveLabel}
                          </div>
                          <div
                            className="font-bold text-sm mb-1"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {activeUnit.moveSkill.name}
                          </div>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {activeUnit.moveSkill.description[lang]}
                          </p>
                        </div>

                        <div
                          className="rounded-xl p-4"
                          style={{
                            backgroundColor: 'var(--color-background-surface)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span
                              className="text-xs font-mono font-bold"
                              style={{ color: 'var(--color-text-accent)' }}
                            >
                              {t.classes.classSkillLabel}
                            </span>
                            <Badge
                              variant="yellow"
                              label={`${activeUnit.classSkill.spCost} SP · ${activeUnit.classSkill.type}`}
                            />
                          </div>
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <img
                              src={activeUnit.classSkill.icon}
                              alt={activeUnit.classSkill.name}
                              className="w-8 h-8 rounded p-1 object-contain"
                              style={{ backgroundColor: 'var(--color-background-muted)' }}
                            />
                            <span
                              className="font-bold text-sm"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {activeUnit.classSkill.name}
                            </span>
                          </div>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {activeUnit.classSkill.description[lang]}
                          </p>
                        </div>
                      </div>

                      {/* 5x5 Pattern Visualizer */}
                      <div
                        className="sm:col-span-6 rounded-xl p-4"
                        style={{
                          backgroundColor: 'var(--color-background-surface)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Button
                            variant={gridMode === 'move' ? 'primary' : 'secondary'}
                            size="sm"
                            width="100%"
                            onClick={() => setGridMode('move')}
                            label={t.classes.patternToggleMove}
                          />
                          <Button
                            variant={gridMode === 'attack' ? 'primary' : 'secondary'}
                            size="sm"
                            width="100%"
                            onClick={() => setGridMode('attack')}
                            label={t.classes.patternToggleAttack}
                          />
                        </div>

                        <div className="grid grid-cols-5 gap-1.5 max-w-[215px] mx-auto">
                          {Array.from({ length: 25 }).map((_, idx) => {
                            const r = Math.floor(idx / 5);
                            const c = idx % 5;
                            const isCenter = r === 2 && c === 2;
                            const isTarget = highlightedSet.has(`${r}-${c}`);
                            return (
                              <div
                                key={idx}
                                className="aspect-square rounded-md flex items-center justify-center transition-colors"
                                style={{
                                  backgroundColor: isCenter
                                    ? 'var(--color-accent-muted)'
                                    : isTarget
                                      ? gridMode === 'move'
                                        ? 'var(--color-info-muted)'
                                        : 'var(--color-error-muted)'
                                      : 'var(--color-background-muted)',
                                  border: isCenter
                                    ? '1px solid var(--color-accent)'
                                    : isTarget
                                      ? gridMode === 'move'
                                        ? '1px solid var(--color-info)'
                                        : '1px solid var(--color-error)'
                                      : '1px solid var(--color-border)',
                                }}
                              >
                                {isCenter && (
                                  <img
                                    src={activeUnit.sprite}
                                    alt=""
                                    className="w-6 h-6 object-contain pixel-art"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {dossierTab === 'armory' && (
                    <div className="space-y-4">
                      <div>
                        <div
                          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold mb-2.5"
                          style={{ color: 'var(--color-text-error)' }}
                        >
                          <Swords className="w-4 h-4" />
                          <span>{t.classes.weaponsLabel}</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {activeUnit.weapons.map((w) => (
                            <div
                              key={w.name}
                              className="flex items-center gap-3 p-3.5 rounded-xl"
                              style={{
                                backgroundColor: 'var(--color-background-surface)',
                                border: '1px solid var(--color-border)',
                              }}
                            >
                              <img
                                src={w.icon}
                                alt={w.name}
                                className="w-10 h-10 rounded-lg p-1.5 object-contain shrink-0"
                                style={{ backgroundColor: 'var(--color-background-muted)' }}
                              />
                              <div className="min-w-0">
                                <div
                                  className="text-sm font-bold truncate"
                                  style={{ color: 'var(--color-text-primary)' }}
                                >
                                  {w.name}
                                </div>
                                <div
                                  className="text-xs"
                                  style={{ color: 'var(--color-text-secondary)' }}
                                >
                                  {w.skill} ·{' '}
                                  <span
                                    className="font-mono font-semibold"
                                    style={{ color: 'var(--color-text-accent)' }}
                                  >
                                    {w.bonus}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div
                          className="text-xs font-mono uppercase tracking-wider font-bold mb-2.5"
                          style={{ color: 'var(--color-text-accent)' }}
                        >
                          {t.classes.trinketsTitle}
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {TRINKETS.map((tr) => (
                            <div
                              key={tr.name}
                              className="p-3 rounded-xl space-y-1.5"
                              style={{
                                backgroundColor: 'var(--color-background-surface)',
                                border: '1px solid var(--color-border)',
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={tr.icon}
                                  alt={tr.name}
                                  className="w-7 h-7 rounded p-1 object-contain"
                                  style={{ backgroundColor: 'var(--color-background-muted)' }}
                                />
                                <span
                                  className="text-xs font-bold"
                                  style={{ color: 'var(--color-text-primary)' }}
                                >
                                  {tr.name}
                                </span>
                                <Badge variant="yellow" label={tr.sp} />
                              </div>
                              <p
                                className="text-[11px] leading-relaxed"
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                {tr.effect[lang]}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Card>

        {/* Bottom Portrait Rail Selector */}
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
          {visibleUnits.map((unit) => {
            const selected = unit.id === activeUnit.id;
            return (
              <button
                key={unit.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSelectedId(unit.id)}
                className="group relative flex items-center gap-2.5 p-2.5 rounded-xl transition-all cursor-pointer"
                style={{
                  backgroundColor: selected
                    ? 'var(--color-accent-muted)'
                    : 'var(--color-background-card)',
                  border: selected
                    ? '1px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                  boxShadow: selected ? 'var(--shadow-low)' : 'none',
                }}
              >
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <img
                    src={unit.frame}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain opacity-85"
                  />
                  <img
                    src={unit.sprite}
                    alt={unit.name[lang]}
                    className="relative w-7 h-7 object-contain pixel-art group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <div
                    className="text-xs font-bold truncate"
                    style={{
                      color: selected ? 'var(--color-text-accent)' : 'var(--color-text-primary)',
                    }}
                  >
                    {unit.name.en.split(' ')[0]}
                  </div>
                  <div
                    className="text-[10px] font-mono truncate"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    SPD {unit.stats.speed.split('/')[0].trim()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
