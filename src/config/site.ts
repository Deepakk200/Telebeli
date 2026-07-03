export const siteConfig = {
  name: "Telebeli",
  shortName: "Telebeli",
  url: "https://telebeli.ai",
  tagline: "AI takes calls. You grow.",
  description:
    "Telebeli builds and configures your complete voice AI calling system using Twilio and OpenAI — from infrastructure to personalized dashboards.",
  ogImage: "https://telebeli.ai/og.png",
  email: "hello@telebeli.ai",
  /* Telebeli is an initiative of Sagenex Group (telebeli-poster-2). */
  parent: "Sagenex Group",
  parentTagline: "Innovate. Automate. Elevate.",
  links: {
    twitter: "https://twitter.com/telebeli",
    linkedin: "https://linkedin.com/company/telebeli",
    github: "https://github.com/telebeli",
  },
} as const;

/**
 * The single macro-conversion target ("Book a Demo"). mailto until a scheduling
 * tool is wired; swap the value, not the call sites.
 */
export const bookDemoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Telebeli demo request")}`;

/**
 * Primary nav, in the approved image order. `hasMenu` marks the caret items
 * (Solutions, Resources); their submenus are modeled when the nav is built.
 */
export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Platform", href: "/#platform" },
  { title: "Solutions", href: "/#solutions", hasMenu: true },
  { title: "How It Works", href: "/#how-it-works" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Resources", href: "/#resources", hasMenu: true },
] as const;

export const dashboardNav = [
  { title: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Calls", href: "/dashboard/calls", icon: "PhoneCall" },
  { title: "Agents", href: "/dashboard/agents", icon: "Bot" },
  { title: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { title: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;
