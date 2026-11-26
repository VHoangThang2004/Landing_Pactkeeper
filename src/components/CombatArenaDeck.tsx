import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Crosshair,
  ExternalLink,
  Eye,
  FastForward,
  Gift,
  RotateCcw,
  Scale,
  Server,
  ShieldCheck,
  Swords,
  Trophy,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Divider } from '@astryxdesign/core/Divider';
import { RANK_TIERS } from '../data/gameData';
import { useLanguage } from '../i18n/LanguageContext';

type CombatTab = 'timeline' | 'modes' | 'fairness';

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

export function CombatArenaDeck() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<CombatTab>('timeline');
  const [queue, setQueue] = useState<SimUnit[]>(INITIAL_QUEUE);
  const [instantCount, setInstantCount] = useState(12);
  const [selectedRankIdx, setSelectedRankIdx] = useState(3);

  const topupUrl = (import.meta.env.VITE_TOPUP_URL as string | undefined)?.trim();

  const advanceInstant = () => {
    setInstantCount((c) => c + 1);
    setQueue((prev) =>
      prev
        .map((u) => ({
          ...u,
          stepsLeft: u.stepsLeft === 0 ? u.baseStep : u.stepsLeft - 1,
        }))
        .sort((a, b) => a.stepsLeft - b.stepsLeft || b.speed - a.speed),
    );
  };

  const resetSim = () => {
    setQueue(INITIAL_QUEUE);
    setInstantCount(12);
  };

  const hasReady = queue.some((u) => u.stepsLeft === 0);
  const pillarIcons = [Eye, Zap, Crosshair];
  const modeIcons = [Trophy, Swords, Users, BookOpen];
  const fairnessIcons = [Scale, Gift, Server, Wifi];

  const tabs: { id: CombatTab; icon: typeof Eye; label: { en: string; vi: string } }[] = [
    {
      id: 'timeline',
      icon: Eye,
      label: { en: 'Time Sight (0.3s Instant)', vi: 'Thời Nhãn (0.3s Instant)' },
    },
    {
      id: 'modes',
      icon: Trophy,
      label: { en: '4 Modes & 7-Tier Rank', vi: '4 Chế Độ & 7 Bậc Rank' },
    },
    {
      id: 'fairness',
      icon: ShieldCheck,
      label: { en: 'Fair Play & Server', vi: 'Công Bằng & Server' },
    },
  ];

  return (
    <section
      id="combat"
      className="py-20 md:py-28 relative"
      style={{
        backgroundColor: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Segmented Deck Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
          <div>
            <span className="pk-eyebrow">
              02 · {lang === 'vi' ? 'CƠ CHẾ & ĐẤU TRƯỜNG' : 'COMBAT & ARENA DECK'}
            </span>
            <h2 className="pk-section-title font-bold text-3xl sm:text-4xl mt-2">
              {activeTab === 'timeline'
                ? t.timeline.title
                : activeTab === 'modes'
                  ? t.modes.title
                  : t.fairness.title}
            </h2>
          </div>

          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl self-start lg:self-auto"
            style={{
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {tabs.map((tab) => {
              const selected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  style={{
                    color: selected
                      ? 'var(--color-on-accent)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  {selected && (
                    <motion.span
                      layoutId="pk-combat-deck-tab"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                  )}
                  <Icon className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10">{tab.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="space-y-8"
            >
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

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
                  {queue.map((unit) => {
                    const isReady = unit.stepsLeft === 0;
                    return (
                      <motion.div
                        layout
                        key={unit.id}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="rounded-xl p-3.5"
                        style={{
                          backgroundColor: isReady
                            ? 'var(--color-accent-muted)'
                            : 'var(--color-background-surface)',
                          border: isReady
                            ? '1px solid var(--color-accent)'
                            : '1px solid var(--color-border)',
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
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: 'var(--color-background-muted)',
                              border: '1px solid var(--color-border)',
                            }}
                          >
                            <img
                              src={unit.sprite}
                              alt={unit.name}
                              className="w-8 h-8 object-contain pixel-art"
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

              <div className="grid md:grid-cols-3 gap-5">
                {t.timeline.pillars.map((pillar, i) => {
                  const Icon = pillarIcons[i];
                  return (
                    <Card key={pillar.title} variant="default" padding={5} width="100%">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
                        style={{
                          backgroundColor: 'var(--color-accent-muted)',
                          color: 'var(--color-icon-accent)',
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3
                        className="font-display font-bold text-base sm:text-lg mb-1.5"
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
            </motion.div>
          )}

          {activeTab === 'modes' && (
            <motion.div
              key="modes"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="space-y-8"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {t.modes.list.map((mode, idx) => {
                  const Icon = modeIcons[idx];
                  return (
                    <Card key={mode.name} variant="default" padding={5} width="100%">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: 'var(--color-accent-muted)',
                            color: 'var(--color-icon-accent)',
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge variant="neutral" label={mode.tag} />
                      </div>
                      <h3
                        className="font-display font-bold text-lg mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {mode.name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {mode.desc}
                      </p>
                    </Card>
                  );
                })}
              </div>

              <Card variant="default" padding={6} width="100%">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3
                      className="font-display font-bold text-xl"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {t.modes.ladderTitle}
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {t.modes.ladderSub}
                    </p>
                  </div>
                  <Badge
                    variant="yellow"
                    label={`${RANK_TIERS[selectedRankIdx].name} · ${RANK_TIERS[selectedRankIdx].lp}`}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {RANK_TIERS.map((tier, idx) => {
                    const selected = idx === selectedRankIdx;
                    return (
                      <button
                        key={tier.name}
                        type="button"
                        onClick={() => setSelectedRankIdx(idx)}
                        className="rounded-xl p-4 text-center flex flex-col items-center justify-between transition-all cursor-pointer"
                        style={{
                          backgroundColor: selected
                            ? 'var(--color-accent-muted)'
                            : 'var(--color-background-surface)',
                          border: selected
                            ? '1px solid var(--color-accent)'
                            : '1px solid var(--color-border)',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 mb-3"
                          style={{
                            borderColor: tier.color,
                            color: tier.color,
                            backgroundColor: `${tier.color}1C`,
                          }}
                        >
                          {tier.badge}
                        </div>
                        <div
                          className="font-bold text-xs sm:text-sm leading-tight"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {tier.name}
                        </div>
                        <div
                          className="text-[11px] font-mono mt-1"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {tier.lp}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'fairness' && (
            <motion.div
              key="fairness"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {t.fairness.cards.map((card, i) => {
                  const Icon = fairnessIcons[i];
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

              <div className="pk-card px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
