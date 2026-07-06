/**
 * Shared inline-SVG faces for the Problem section (P05). Kept in one place
 * because the same friendly-robot and illustrated-human marks recur across the
 * failure schematics (problem-failures.tsx) and the answer visuals
 * (problem-handoff.tsx, problem-prove.tsx).
 *
 * HONESTY RULE: the human agent is a stylised, ILLUSTRATED avatar — never a real
 * or implied person / stock photo. Skin, hair and headset fills are illustration
 * internals (not brand tokens), so they carry literal hex here on purpose.
 */

/** Monoline friendly robot — inherits `currentColor` so callers tint it
 *  (white on the gradient hub, violet on the warm-handoff tile, rose on the
 *  failure tile). Decorative; callers supply the accessible label. */
export function RobotFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      {/* antenna */}
      <circle cx="12" cy="2.4" r="1.1" fill="currentColor" />
      <path d="M12 3.5V5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* ears */}
      <rect x="2.2" y="11" width="2.4" height="4.4" rx="1.2" fill="currentColor" />
      <rect x="19.4" y="11" width="2.4" height="4.4" rx="1.2" fill="currentColor" />
      {/* head */}
      <rect x="4.6" y="5.4" width="14.8" height="13.4" rx="5" stroke="currentColor" strokeWidth="1.6" />
      {/* happy eyes */}
      <circle cx="9.4" cy="11.4" r="1.35" fill="currentColor" />
      <circle cx="14.6" cy="11.4" r="1.35" fill="currentColor" />
      {/* smile */}
      <path d="M9 14.4c1.9 1.7 4.1 1.7 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Warm, smiling, illustrated human agent wearing a headset. Self-contained
 *  colours (skin/hair/headset) — stylised, not a photograph. */
export function AgentFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden className={className}>
      {/* soft warm backdrop */}
      <circle cx="22" cy="22" r="22" fill="#FFF1E8" />
      {/* neck + shoulders */}
      <path d="M11 44c1.6-6 5.7-9 11-9s9.4 3 11 9" fill="#7C3AED" opacity="0.14" />
      {/* face */}
      <circle cx="22" cy="20.5" r="10.5" fill="#F3C6A0" />
      {/* hair */}
      <path d="M11.5 20c0-6.5 4.9-11 10.5-11s10.5 4.5 10.5 11c-2.4-1.8-4.4-2.6-6-2.6-1 2-3.6 3.1-9 3.1-2.6 0-4.6.2-6 .5Z" fill="#5A3B24" />
      {/* eyes */}
      <circle cx="18.4" cy="20.4" r="1.3" fill="#3A2A1E" />
      <circle cx="25.6" cy="20.4" r="1.3" fill="#3A2A1E" />
      {/* smile */}
      <path d="M18 24.4c2.4 2.2 5.6 2.2 8 0" stroke="#B5673A" strokeWidth="1.7" strokeLinecap="round" />
      {/* headset band + cups */}
      <path d="M10.5 22a11.5 11.5 0 0 1 23 0" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="8.2" y="20.5" width="4.2" height="6.6" rx="2.1" fill="#334155" />
      <rect x="31.6" y="20.5" width="4.2" height="6.6" rx="2.1" fill="#334155" />
      {/* mic boom */}
      <path d="M10.3 26.8c0 4 2.6 6.4 7 6.8" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="33.8" r="1.5" fill="#334155" />
    </svg>
  );
}

/** Frowning illustrated caller — the poor-handoff outcome. No headset. */
export function FrownFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden className={className}>
      <circle cx="22" cy="20.5" r="10.5" fill="#F3C6A0" />
      <path d="M11.5 20c0-6.5 4.9-11 10.5-11s10.5 4.5 10.5 11c-2.4-1.8-4.4-2.6-6-2.6-1 2-3.6 3.1-9 3.1-2.6 0-4.6.2-6 .5Z" fill="#4A4A55" />
      {/* worried brows */}
      <path d="M16.2 17.6c1.2-.7 2.4-.7 3.6 0" stroke="#3A2A1E" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M24.2 17.6c1.2-.7 2.4-.7 3.6 0" stroke="#3A2A1E" strokeWidth="1.3" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="18.4" cy="21" r="1.3" fill="#3A2A1E" />
      <circle cx="25.6" cy="21" r="1.3" fill="#3A2A1E" />
      {/* frown */}
      <path d="M18 26.8c2.4-2.2 5.6-2.2 8 0" stroke="#9A5A38" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
