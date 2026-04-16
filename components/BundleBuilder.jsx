'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { getBundleTier } from '@/lib/cart';
import styles from './BundleBuilder.module.css';

const MAX = 7;
const MILESTONES = [
  { items: 3, label: '10% off', reward: '10% off your order', pct: (3 / MAX) * 100 },
  { items: 5, label: '15% off', reward: '15% off your order', pct: (5 / MAX) * 100 },
  { items: 7, label: 'Free delivery', reward: '15% off + free delivery', pct: 100 },
];

export default function BundleBuilder() {
  const { cart } = useStore();
  const [active, setActive] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(null);
  const prevRef = useRef(0);

  const lineCount = cart.filter(l => l.type === 'product').length;
  const fillPct = Math.min((lineCount / MAX) * 100, 100);
  const tier = getBundleTier(cart);

  useEffect(() => {
    const prev = prevRef.current;
    if (lineCount > prev) {
      for (const m of MILESTONES) {
        if (prev < m.items && lineCount >= m.items) {
          setJustUnlocked(m.items);
          const t = setTimeout(() => setJustUnlocked(null), 3500);
          prevRef.current = lineCount;
          return () => clearTimeout(t);
        }
      }
    }
    prevRef.current = lineCount;
  }, [lineCount]);

  if (!active) {
    return (
      <div className={styles.teaser}>
        <div className={styles.teaserLeft}>
          <h2 className={styles.teaserTitle}>Build Your Bundle & Save</h2>
          <p className={styles.teaserSub}>Mix and match items — the more you add, the more you unlock.</p>
          <ul className={styles.teaserList}>
            {MILESTONES.map(m => (
              <li key={m.items} className={styles.teaserItem}>
                <span className={styles.teaserBullet}>{m.items}</span>
                <span>{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className={styles.startBtn} onClick={() => setActive(true)}>
          <span className={styles.startBtnArrow}>▶</span>
          Start Building Your Bundle
        </button>
      </div>
    );
  }

  const nextMilestone = MILESTONES.find(m => lineCount < m.items);
  const nudge = nextMilestone
    ? `${nextMilestone.items - lineCount} more item${nextMilestone.items - lineCount !== 1 ? 's' : ''} to unlock ${nextMilestone.label}`
    : 'Maximum savings unlocked! You\'re all set.';

  return (
    <div className={`${styles.builder} ${justUnlocked ? styles.celebrating : ''}`}>
      <div className={styles.builderHeader}>
        <span className={styles.builderTitle}>Bundle Builder</span>
        {tier && (
          <span className={styles.tierBadge} key={tier.minLines}>
            {tier.freeDelivery ? '15% off + Free delivery' : `${tier.discountPercent}% off unlocked!`}
          </span>
        )}
      </div>

      {justUnlocked && (
        <div className={styles.unlockBanner} key={justUnlocked}>
          <span className={styles.unlockIcon}>🎉</span>
          {MILESTONES.find(m => m.items === justUnlocked)?.reward} unlocked!
        </div>
      )}

      <div className={styles.progressWrap}>
        {MILESTONES.map(m => (
          <div
            key={m.items}
            className={`${styles.badge} ${lineCount >= m.items ? styles.badgeUnlocked : ''} ${justUnlocked === m.items ? styles.badgeJustUnlocked : ''}`}
            style={{ left: `${m.pct}%` }}
          >
            {m.label}
          </div>
        ))}

        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${fillPct}%` }} />
          {MILESTONES.map(m => (
            <div
              key={m.items}
              className={`${styles.tick} ${lineCount >= m.items ? styles.tickUnlocked : ''} ${justUnlocked === m.items ? styles.tickJustUnlocked : ''}`}
              style={{ left: `${m.pct}%` }}
            />
          ))}
        </div>

        {MILESTONES.map(m => (
          <div
            key={m.items}
            className={`${styles.countLabel} ${lineCount >= m.items ? styles.countLabelUnlocked : ''}`}
            style={{ left: `${m.pct}%` }}
          >
            {m.items} items
          </div>
        ))}
      </div>

      <p className={`${styles.nudge} ${!nextMilestone ? styles.nudgeComplete : ''}`}>
        {nudge}
      </p>
    </div>
  );
}
