const MOTES = [
  { left: '8%', top: '76%', size: 3, delay: '0s', duration: '9s' },
  { left: '16%', top: '62%', size: 4, delay: '2.1s', duration: '11s' },
  { left: '24%', top: '84%', size: 2.5, delay: '1.2s', duration: '8.5s' },
  { left: '34%', top: '70%', size: 3.5, delay: '3.4s', duration: '10s' },
  { left: '46%', top: '82%', size: 3, delay: '0.8s', duration: '9.5s' },
  { left: '58%', top: '68%', size: 4, delay: '4.2s', duration: '12s' },
  { left: '67%', top: '85%', size: 2.5, delay: '1.9s', duration: '8.8s' },
  { left: '76%', top: '64%', size: 3.5, delay: '2.8s', duration: '10.5s' },
  { left: '84%', top: '78%', size: 3, delay: '0.5s', duration: '9.2s' },
  { left: '92%', top: '72%', size: 4, delay: '3.7s', duration: '11.4s' },
];

export function AmbientParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]" aria-hidden="true">
      {MOTES.map((m, idx) => (
        <span
          key={idx}
          className="pk-dust-mote absolute rounded-full"
          style={{
            left: m.left,
            top: m.top,
            width: `${m.size}px`,
            height: `${m.size}px`,
            animationDelay: m.delay,
            animationDuration: m.duration,
            backgroundColor: idx % 3 === 0 ? 'var(--pk-arcane)' : 'var(--pk-gold-glow)',
            boxShadow:
              idx % 3 === 0
                ? '0 0 8px rgba(56, 189, 248, 0.8)'
                : '0 0 8px rgba(242, 191, 78, 0.85)',
          }}
        />
      ))}
    </div>
  );
}
