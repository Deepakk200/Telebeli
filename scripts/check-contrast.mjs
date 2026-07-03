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
const ratio = (c1, c2) => {
  const l1 = lum(oklchToSrgb(...c1));
  const l2 = lum(oklchToSrgb(...c2));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

const paper = [0.975, 0.009, 286];
const surface = [0.995, 0.004, 286];
const ink = [0.23, 0.045, 274];
const inkMuted = [0.52, 0.028, 274];
const onAccent = [0.99, 0.005, 286];
const accent = [0.55, 0.2, 266];
const gradFrom = [0.55, 0.2, 262];
const gradTo = [0.53, 0.24, 300];

// [name, fg, bg, min] — AA body text is 4.5:1.
const checks = [
  ["heading ink / paper", ink, paper, 4.5],
  ["body ink-muted / paper", inkMuted, paper, 4.5],
  ["body ink-muted / surface", inkMuted, surface, 4.5],
  ["CTA text / accent", onAccent, accent, 4.5],
  ["CTA text / gradient-from", onAccent, gradFrom, 4.5],
  ["CTA text / gradient-to", onAccent, gradTo, 4.5],
];

let failed = false;
for (const [name, fg, bg, min] of checks) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed = true;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}: ${r.toFixed(2)}:1 (min ${min})`);
}
process.exit(failed ? 1 : 0);
