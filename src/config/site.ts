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
  { title: "Platform", href: "/#capabilities" },
  { title: "Solutions", href: "/#solutions", hasMenu: true },
  { title: "How It Works", href: "/#lifecycle" },
  { title: "Resources", href: "/#faq", hasMenu: true },
] as const;

export const dashboardNav = [
  { title: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Calls", href: "/dashboard/calls", icon: "PhoneCall" },
  { title: "Agents", href: "/dashboard/agents", icon: "Bot" },
  { title: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { title: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

/**
 * Solutions mega-menu IA (P18). Every leaf either points at a real route/anchor
 * (status "live") or renders as a non-interactive "Soon" label (status "soon") —
 * never a dead "#", never a fabricated page or case study. Industries mirror the
 * P09 `industries` set exactly (no unclaimed verticals — Retail/Logistics from
 * the reference IA are intentionally omitted). Capability/lifecycle anchors are
 * defaults; swap for /solutions/<slug> pages here when those pages are built.
 */
export type SolutionsLeaf = { label: string; href?: string; status: "live" | "soon" };
export type SolutionsCategory = { title: string; items: SolutionsLeaf[] };

export const solutionsMenu: SolutionsCategory[] = [
  {
    title: "AI Voice Solutions",
    items: [
      { label: "AI Receptionist", href: "/#capabilities", status: "live" },
      { label: "Customer Support", href: "/#capabilities", status: "live" },
      { label: "Appointment Booking", href: "/#capabilities", status: "live" },
      { label: "Lead Qualification", href: "/#capabilities", status: "live" },
      { label: "AI IVR", href: "/#capabilities", status: "live" },
      { label: "Outbound Calling", href: "/#capabilities", status: "live" },
      { label: "Call Routing", href: "/#lifecycle", status: "live" },
      { label: "Live Human Transfer", href: "/#lifecycle", status: "live" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Healthcare", href: "/#industries", status: "live" },
      { label: "Real Estate", href: "/#industries", status: "live" },
      { label: "Education", href: "/#industries", status: "live" },
      { label: "Finance", href: "/#industries", status: "live" },
      { label: "E-commerce", href: "/#industries", status: "live" },
      { label: "Travel & Hospitality", href: "/#industries", status: "live" },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Integrations", href: "/#integrations", status: "live" },
      { label: "Analytics", href: "/dashboard/analytics", status: "live" },
      { label: "Dashboard", href: "/dashboard", status: "live" },
      { label: "Security", href: "/security", status: "live" },
      { label: "API", status: "soon" },
      { label: "CRM Automation", status: "soon" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "FAQ", href: "/#faq", status: "live" },
      { label: "Documentation", status: "soon" },
      { label: "Case Studies", status: "soon" },
      { label: "Blog", status: "soon" },
    ],
  },
];
