import {
  LayoutDashboard,
  PhoneCall,
  Bot,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { title: string; href: string; icon: LucideIcon };

export const dashboardNavItems: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Calls", href: "/dashboard/calls", icon: PhoneCall },
  { title: "Agents", href: "/dashboard/agents", icon: Bot },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];
