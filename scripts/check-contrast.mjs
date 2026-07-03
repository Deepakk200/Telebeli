/**
 * WCAG AA gate for the approved marketing (Light) palette. Converts the OKLCH
 * token values from globals.css to sRGB and asserts text pairs clear 4.5:1.
 * Keep the values here in sync with :root in src/app/globals.css.
 */
function oklchToSrgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return lin.map((x) => {
    const c = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    return Math.min(1, Math.max(0, c));
  });
}
const lum = (rgb) => {
  const [r, g, b] = rgb.map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
/* Alpha-composite an sRGB fg over bg (what axe measures for translucent
   washes like accent-wash = accent @8%). */
const blend = (fgRgb, bgRgb, a) => fgRgb.map((c, i) => a * c + (1 - a) * bgRgb[i]);
const srgb = (c) => oklchToSrgb(...c);
const ratioRgb = (fgRgb, bgRgb) => {
  const l1 = lum(fgRgb);
  const l2 = lum(bgRgb);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

const paper = [0.975, 0.009, 286];
const surface = [0.995, 0.004, 286];
const ink = [0.23, 0.045, 274];
const inkMuted = [0.52, 0.028, 274];
const inkFaint = [0.54, 0.022, 274];
const onAccent = [0.99, 0.005, 286];
const accent = [0.52, 0.2, 266];
const gradFrom = [0.55, 0.2, 262];
const gradTo = [0.53, 0.24, 300];
const stateResolved = [0.5, 0.09, 155];
const stateFlag = [0.52, 0.1, 40];

// Composited washes (as rendered): accent-wash = accent @8%; success badge bg
// = state-resolved @15% over surface.
const washOnPaper = blend(srgb(accent), srgb(paper), 0.08);
const washOnSurface = blend(srgb(accent), srgb(surface), 0.08);
const successWash = blend(srgb(stateResolved), srgb(surface), 0.15);

// [name, fgRgb, bgRgb, min] — AA body text is 4.5:1 (mockup text is small, so
// the 3:1 large-text carve-out never applies).
const checks = [
  ["heading ink / paper", srgb(ink), srgb(paper), 4.5],
  ["body ink-muted / paper", srgb(inkMuted), srgb(paper), 4.5],
  ["body ink-muted / surface", srgb(inkMuted), srgb(surface), 4.5],
  ["tertiary ink-faint / paper", srgb(inkFaint), srgb(paper), 4.5],
  ["tertiary ink-faint / surface", srgb(inkFaint), srgb(surface), 4.5],
  ["CTA text / accent", srgb(onAccent), srgb(accent), 4.5],
  ["CTA text / gradient-from", srgb(onAccent), srgb(gradFrom), 4.5],
  ["CTA text / gradient-to", srgb(onAccent), srgb(gradTo), 4.5],
  ["accent text / accent-wash on paper", srgb(accent), washOnPaper, 4.5],
  ["accent text / accent-wash on surface", srgb(accent), washOnSurface, 4.5],
  ["accent text / paper", srgb(accent), srgb(paper), 4.5],
  ["success text / success-wash", srgb(stateResolved), successWash, 4.5],
  ["success text / surface", srgb(stateResolved), srgb(surface), 4.5],
  // Badge variants (badge.tsx): state text on its 10% wash over surface.
  ["resolved badge text / wash", srgb(stateResolved), blend(srgb(stateResolved), srgb(surface), 0.1), 4.5],
  ["flag badge text / wash", srgb(stateFlag), blend(srgb(stateFlag), srgb(surface), 0.1), 4.5],
  // Call widget: translucent white text over the deep gradient (hero-dashboard).
  ["widget white/70 / widget-from", blend([1, 1, 1], srgb([0.42, 0.17, 268]), 0.7), srgb([0.42, 0.17, 268]), 4.5],
  ["widget white/70 / widget-to", blend([1, 1, 1], srgb([0.4, 0.2, 302]), 0.7), srgb([0.4, 0.2, 302]), 4.5],
];

let failed = false;
for (const [name, fg, bg, min] of checks) {
  const r = ratioRgb(fg, bg);
  const ok = r >= min;
  if (!ok) failed = true;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}: ${r.toFixed(2)}:1 (min ${min})`);
}
process.exit(failed ? 1 : 0);
