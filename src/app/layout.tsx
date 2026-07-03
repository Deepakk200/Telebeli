import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/providers";
import { siteConfig } from "@/config/site";
import "./globals.css";

/* Tri-voice type system, self-hosted latin variable fonts (visual-identity-v2 §1).
   TODO(type): named-direction stand-ins until licensed faces are procured —
   Source Serif 4 ≈ Signifier/Tiempos class, Instrument Sans ≈ Söhne/Diatype
   class, JetBrains Mono ≈ Berkeley Mono class. Swap the files, keep the wiring. */
const serif = localFont({
  src: "../fonts/source-serif-4-latin.woff2",
  variable: "--font-serif-face",
  weight: "200 900",
  display: "swap",
  preload: false, // superseded as the hero LCP face by the geometric display font
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});
const sans = localFont({
  src: "../fonts/instrument-sans-latin.woff2",
  variable: "--font-sans-face",
  weight: "400 700",
  display: "swap",
  preload: true, // body voice
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
const mono = localFont({
  src: "../fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono-face",
  weight: "100 800",
  display: "swap",
  preload: false, // evidence voice — below the fold, never render-critical
  fallback: ["ui-monospace", "Consolas", "monospace"],
  adjustFontFallback: false,
});
/* Marketing display voice — rounded geometric (Poppins), self-hosted, latin
   subset. The approved landing image (docs/design-assets/landing-page-approved.png)
   is the authority for marketing type and makes this the heading face, superseding
   the editorial serif on the marketing surface per the implementation authority
   rules (approved image > older type docs). It is the hero-headline LCP face, so
   it — not the serif — is preloaded. */
const display = localFont({
  src: [
    { path: "../fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display-face",
  display: "swap",
  preload: true, // marketing hero headline (LCP) is set in this face
  fallback: ["ui-rounded", "Segoe UI", "system-ui", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI voice agent",
    "voice AI platform",
    "AI call center",
    "conversational AI",
    "automated phone calls",
    "24/7 AI receptionist",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
        {process.env.VERCEL ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
