export const siteConfig = {
  name: "TeleBeli",
  shortName: "TeleBeli",
  url: "https://telebeli.com",
  tagline: "Voice AI you can watch working",
  description:
    "TeleBeli runs enterprise voice agents on your phone lines and shows you every call as it happens — resolving on their own, escalating to a human when they should, and never failing in silence.",
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
  { title: "Security", href: "/security" },
] as const;

export const dashboardNav = [
  { title: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Calls", href: "/dashboard/calls", icon: "PhoneCall" },
  { title: "Agents", href: "/dashboard/agents", icon: "Bot" },
  { title: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { title: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;
