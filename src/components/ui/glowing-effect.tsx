/**
 * @deprecated Glow is banned by the approved identity (no-glow rule). This
 * renders nothing; it exists only because landing/features.tsx (deferred to
 * its section milestone) still imports it. Delete both together in M-features.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GlowingEffect(_props: {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}) {
  return null;
}
