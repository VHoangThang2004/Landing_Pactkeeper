import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Swords, Footprints, Shield } from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { TRINKETS, UNIT_CLASSES } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';

export function ClassesRosterSection() {
  const { lang, t } = useLanguage();
  const [selectedId, setSelectedId] = useState(UNIT_CLASSES[0].id);
  const [gridMode, setGridMode] = useState<'move' | 'attack'>('move');

  const activeUnit = UNIT_CLASSES.find((u) => u.id === selectedId) ?? UNIT_CLASSES[0];
  const highlightedSet = new Set(
    (gridMode === 'move' ? activeUnit.moveSkill.cells : activeUnit.attackCells).map(
      ([r, c]) => `${r}-${c}`,
    ),
  );

  return (
    <section
      id="classes"
      className="py-20 md:py-28 relative"
      style={{
        backgroundColor: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="pk-eyebrow">{t.classes.eyebrow}</span>
          <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-3">
            {t.classes.title}
          </h2>
          <p className="pk-text-muted mt-4 text-base sm:text-lg leading-relaxed">
            {t.classes.subtitle}
          </p>
        </div>

        {/* 6 Class Selector Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
          {UNIT_CLASSES.map((unit) => {
            const selected = unit.id === activeUnit.id;
            return (
              <button
                key={unit.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSelectedId(unit.id)}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer"
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
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img
                    src={unit.frame}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain opacity-85"
                  />
                  <img
                    src={unit.sprite}
                    alt={unit.name[lang]}
                    className="relative w-9 h-9 object-contain pixel-art group-hover:scale-110 transition-transform"
                  />
                </div>
                <span
                  className="text-xs font-bold text-center leading-tight"
                  style={{
                    color: selected ? 'var(--color-text-accent)' : 'var(--color-text-primary)',
                  }}
                >
                  {unit.name.en.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Class Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUnit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <Card variant="default" padding={6} width="100%">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left: Portrait + Stats + 5x5 Reach Grid */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-5">
                    <div
                      className="relative w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{
                        backgroundColor: 'var(--color-background-muted)',
                        border: '1px solid var(--color-border-emphasized)',
                      }}
                    >
                      <img
                        src={activeUnit.frame}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain opacity-90 p-1"
                      />
                      <img
                        src={activeUnit.sprite}
                        alt={activeUnit.name[lang]}
                        className="relative w-16 h-16 object-contain pixel-art"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Badge
                        variant={activeUnit.starter ? 'success' : 'warning'}
                        label={activeUnit.starter ? t.classes.starterBadge : t.classes.unlockBadge}
                      />
                      <h3
                        className="font-display font-bold text-2xl"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {activeUnit.name[lang]}
                      </h3>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-text-accent)' }}
                      >
                        {activeUnit.role[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'HP', val: activeUnit.stats.hp, color: 'var(--color-text-success)' },
                      { label: 'SPEED', val: activeUnit.stats.speed, color: 'var(--color-text-accent)' },
                      { label: 'SP POOL', val: activeUnit.stats.sp, color: 'var(--color-text-info)' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl p-3 text-center"
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
                        <div className="text-base font-mono font-bold mt-0.5" style={{ color: s.color }}>
                          {s.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive 5x5 Reach Pattern */}
                  <div
                    className="rounded-xl p-4"
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

                    <div className="grid grid-cols-5 gap-1.5 max-w-[220px] mx-auto">
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

                {/* Right: Passive, Skills, Weapons */}
                <div className="lg:col-span-7 space-y-4">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: 'var(--color-accent-muted)',
                      border: '1px solid var(--color-border-emphasized)',
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold mb-1.5"
                      style={{ color: 'var(--color-text-accent)' }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {t.classes.passiveLabel}: {activeUnit.passive.name}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {activeUnit.passive.description[lang]}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      className="rounded-xl p-4"
                      style={{
                        backgroundColor: 'var(--color-background-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div
                        className="flex items-center gap-2 text-xs font-mono font-bold mb-1.5"
                        style={{ color: 'var(--color-text-info)' }}
                      >
                        <Footprints className="w-4 h-4" />
                        <span>{t.classes.moveLabel}</span>
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
                          className="flex items-center gap-2 text-xs font-mono font-bold"
                          style={{ color: 'var(--color-text-accent)' }}
                        >
                          <Shield className="w-4 h-4" />
                          {t.classes.classSkillLabel}
                        </span>
                        <Badge
                          variant="yellow"
                          label={`${activeUnit.classSkill.spCost} SP • ${activeUnit.classSkill.type}`}
                        />
                      </div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <img
                          src={activeUnit.classSkill.icon}
                          alt={activeUnit.classSkill.name}
                          className="w-7 h-7 rounded p-1 object-contain"
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

                  {/* Weapons */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: 'var(--color-background-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold mb-3"
                      style={{ color: 'var(--color-text-error)' }}
                    >
                      <Swords className="w-4 h-4" />
                      <span>{t.classes.weaponsLabel}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeUnit.weapons.map((w) => (
                        <div
                          key={w.name}
                          className="flex items-center gap-3 p-3 rounded-lg"
                          style={{
                            backgroundColor: 'var(--color-background-card)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <img
                            src={w.icon}
                            alt={w.name}
                            className="w-9 h-9 rounded-lg p-1.5 object-contain shrink-0"
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
                              {w.skill} •{' '}
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
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Universal Trinkets Strip */}
        <div className="mt-10">
          <Card variant="default" padding={6} width="100%">
            <div className="mb-5">
              <h3
                className="font-display font-bold text-xl"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {t.classes.trinketsTitle}
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {t.classes.trinketsSub}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {TRINKETS.map((tr) => (
                <div
                  key={tr.name}
                  className="flex items-start gap-3.5 p-4 rounded-xl"
                  style={{
                    backgroundColor: 'var(--color-background-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <img
                    src={tr.icon}
                    alt={tr.name}
                    className="w-11 h-11 rounded-lg p-1.5 object-contain shrink-0"
                    style={{ backgroundColor: 'var(--color-background-muted)' }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-bold text-sm"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {tr.name}
                      </span>
                      <Badge variant="yellow" label={tr.sp} />
                    </div>
                    <div
                      className="text-[11px] mt-0.5 mb-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {tr.items}
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {tr.effect[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
