import type { SVGProps } from "react";

/**
 * Custom monoline icon system (visual-identity-v2 §Iconography). 24px grid,
 * 1.75px stroke, 2px keyline margin, round caps — one optical weight across
 * the set. Named ESM exports tree-shake per glyph; no icon font, no library.
 *
 * A11y contract: no `label` → decorative (aria-hidden); pass `label` for
 * meaningful icons (role="img" + aria-label). Icon-only controls must still
 * carry their own text label.
 */
export type IconProps = SVGProps<SVGSVGElement> & {
  /** Rendered box. Optical grid stays 24 — strokes scale crisply. */
  size?: 16 | 18 | 20 | 24;
  /** Accessible name. Omit for decorative icons (default: hidden from SR). */
  label?: string;
};

export function Icon({ size = 24, label, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  );
}

/* ------------------------------- Core UI ------------------------------- */

export function IconX(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </Icon>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 12h12" />
    </Icon>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9.5l6 6 6-6" />
    </Icon>
  );
}

export function IconChevronUp(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 14.5l6-6 6 6" />
    </Icon>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 6l6 6-6 6" />
    </Icon>
  );
}

/** Plain circle — radio indicators fill it via `fill-current`. */
export function IconCircle(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
    </Icon>
  );
}

export function IconCircleCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 5-5.5" />
    </Icon>
  );
}

export function IconCircleX(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </Icon>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M12 11.5V16" />
    </Icon>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4L21.5 19.5h-19L12 4z" />
      <path d="M12 10v4M12 17h.01" />
    </Icon>
  );
}

/** Quarter arc — pair with `animate-spin` for loading. */
export function IconLoader(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3a9 9 0 0 1 9 9" />
    </Icon>
  );
}

/* -------------------- Annotation family (DNA-1/DNA-2) ------------------- */

/** A node sitting on the call-timeline hairline. */
export function IconTimelineNode(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h6.5M15.5 12H22" />
      <circle cx="12" cy="12" r="3.5" />
    </Icon>
  );
}

/** An event marker rising off the baseline. */
export function IconEventMarker(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 19h18M12 19v-8" />
      <circle cx="12" cy="8" r="2.5" />
    </Icon>
  );
}

/** Score annotation tag. */
export function IconScoreTag(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6h11.5L20 12l-4.5 6H4V6z" />
      <path d="M8 12h4" />
    </Icon>
  );
}

/**
 * Handoff between agents. Two-color by design: the passing arrow carries
 * --state-handoff (the reclaimed violet is reserved for exactly this).
 */
export function IconHandoff(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="5.5" cy="12" r="2.75" />
      <circle cx="18.5" cy="12" r="2.75" />
      <path d="M9.5 12h4M11.5 9.5L14 12l-2.5 2.5" stroke="var(--state-handoff)" />
    </Icon>
  );
}

/** Escalation to a human — rise out of the flow. */
export function IconEscalate(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 19L19 5M9 5h10v10" />
    </Icon>
  );
}

/** Inspect the evidence beneath. */
export function IconInspect(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.75 15.75L21 21" />
    </Icon>
  );
}
