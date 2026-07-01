export const siteConfig = {
  name: "TeleBeli",
  shortName: "TeleBeli",
  url: "https://telebeli.com",
  tagline: "AI voice agents that answer every call",
  description:
    "TeleBeli runs enterprise-grade AI voice agents that handle inbound and outbound calls 24/7 — sub-400ms responses, human handoff, and every conversation logged.",
  ogImage: "https://telebeli.com/og.png",
  email: "hello@telebeli.com",
  links: {
    twitter: "https://twitter.com/telebeli",
    linkedin: "https://linkedin.com/company/telebeli",
    github: "https://github.com/telebeli",
  },
} as const;

export const mainNav = [
  { title: "Platform", href: "/#platform" },
  { title: "How it works", href: "/#how-it-works" },
  { title: "Pricing", href: "/#pricing" },
  { title: "FAQ", href: "/#faq" },
] as const;

export const dashboardNav = [
  { title: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Calls", href: "/dashboard/calls", icon: "PhoneCall" },
  { title: "Agents", href: "/dashboard/agents", icon: "Bot" },
  { title: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { title: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;
