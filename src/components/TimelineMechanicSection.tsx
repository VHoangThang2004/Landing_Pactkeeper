import { useState } from 'react';
import { motion } from 'framer-motion';
import { FastForward, RotateCcw, Eye, Zap, Crosshair } from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Divider } from '@astryxdesign/core/Divider';
import { useLanguage } from '../i18n/LanguageContext';

interface SimUnit {
  id: string;
  name: string;
  sprite: string;
  speed: number;
  baseStep: number;
  stepsLeft: number;
  team: 'ally' | 'enemy';
}

const INITIAL_QUEUE: SimUnit[] = [
  { id: 'u1', name: 'Assassin', sprite: '/assets/units/assassin.png', speed: 135, baseStep: 8, stepsLeft: 0, team: 'ally' },
  { id: 'u2', name: 'Archer', sprite: '/assets/units/crossbowman.png', speed: 125, baseStep: 9, stepsLeft: 2, team: 'enemy' },
  { id: 'u3', name: 'Warrior', sprite: '/assets/units/viking.png', speed: 120, baseStep: 9, stepsLeft: 3, team: 'ally' },
  { id: 'u4', name: 'Physician', sprite: '/assets/units/physician.png', speed: 115, baseStep: 9, stepsLeft: 5, team: 'ally' },
  { id: 'u5', name: 'Tank', sprite: '/assets/units/paladin.png', speed: 105, baseStep: 10, stepsLeft: 7, team: 'enemy' },
];

export function TimelineMechanicSection() {
  const { t } = useLanguage();
  const [queue, setQueue] = useState<SimUnit[]>(INITIAL_QUEUE);
  const [instantCount, setInstantCount] = useState(12);

  const advanceInstant = () => {
    setInstantCount((c) => c + 1);
    setQueue((prev) => {
      const updated = prev.map((u) => ({
        ...u,
        stepsLeft: u.stepsLeft === 0 ? u.baseStep : u.stepsLeft - 1,
      }));
      return updated.sort((a, b) => a.stepsLeft - b.stepsLeft || b.speed - a.speed);
    });
  };

  const resetSim = () => {
    setQueue(INITIAL_QUEUE);
    setInstantCount(12);
  };

  const hasReady = queue.some((u) => u.stepsLeft === 0);
  const pillarIcons = [Eye, Zap, Crosshair];

  return (
    <section
      id="mechanics"
      className="py-20 md:py-28 relative"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="pk-eyebrow">{t.timeline.eyebrow}</span>
          <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-3">
            {t.timeline.title}
          </h2>
          <p className="pk-text-muted mt-4 text-base sm:text-lg leading-relaxed">
            {t.timeline.subtitle}
          </p>
        </div>

        {/* Interactive Timeline Simulator Card */}
        <div className="mb-12">
          <Card variant="default" padding={6} width="100%">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--color-accent-muted)',
                    border: '1px solid var(--color-border-emphasized)',
                  }}
                >
                  <img
                    src={hasReady ? '/assets/ui/OpenedEye.png' : '/assets/ui/ClosedEye.png'}
                    alt="Time Sight Eye"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: 'var(--color-text-accent)' }}
                    >
                      INSTANT #{instantCount} ({(instantCount * 0.3).toFixed(1)}s)
                    </span>
                    {hasReady && <Badge variant="warning" label={t.timeline.readyTag} />}
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {t.timeline.stepHint}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="pk-primary-cta">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={advanceInstant}
                    icon={<FastForward className="w-4 h-4" />}
                    label={t.timeline.advanceBtn}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={resetSim}
                  icon={<RotateCcw className="w-4 h-4" />}
                  label={t.timeline.resetBtn}
                />
              </div>
            </div>

            <Divider />

            {/* Ready Queue Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
              {queue.map((unit) => {
                const isReady = unit.stepsLeft === 0;
                return (
                  <motion.div
                    layout
                    key={unit.id}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="rounded-xl p-3.5 transition-all"
                    style={{
                      backgroundColor: isReady
                        ? 'var(--color-accent-muted)'
                        : 'var(--color-background-surface)',
                      border: isReady
                        ? '1px solid var(--color-accent)'
                        : '1px solid var(--color-border)',
                      boxShadow: isReady ? 'var(--shadow-low)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                      <Badge
                        variant={unit.team === 'ally' ? 'info' : 'error'}
                        label={unit.team === 'ally' ? 'P1' : 'P2'}
                      />
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        SPD {unit.speed}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--color-background-muted)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <img
                          src={unit.sprite}
                          alt={unit.name}
                          className="w-9 h-9 object-contain pixel-art"
                        />
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-sm font-bold truncate"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {unit.name}
                        </div>
                        <div
                          className="text-xs font-mono font-bold"
                          style={{
                            color: isReady
                              ? 'var(--color-text-accent)'
                              : 'var(--color-text-secondary)',
                          }}
                        >
                          {isReady ? '0 (ACT NOW)' : `${unit.stepsLeft} ${t.timeline.waitingTag}`}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 3-Color Tactical Grid Legend */}
            <div
              className="mt-6 pt-5 flex flex-wrap items-center justify-center gap-5 text-xs font-medium"
              style={{
                borderTop: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-sky-500/80 border border-sky-400" />
                <span>{t.timeline.legendMove}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-500/80 border border-rose-400" />
                <span>{t.timeline.legendAttack}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-500/80 border border-amber-400" />
                <span>{t.timeline.legendBuff}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.timeline.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            return (
              <Card key={pillar.title} variant="default" padding={5} width="100%">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'var(--color-accent-muted)',
                    color: 'var(--color-icon-accent)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {pillar.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
