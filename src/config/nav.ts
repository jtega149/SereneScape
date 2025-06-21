import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Brain, Headphones, Wind, Sparkles, SunMoon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Meditations",
    href: "/meditations",
    icon: Brain, // or Lotus / Smile
  },
  {
    title: "Soundscapes",
    href: "/soundscapes",
    icon: Headphones, // or Music2 / Waves
  },
  {
    title: "Breathing",
    href: "/breathing",
    icon: Wind, // or AirVent
  },
  {
    title: "Affirmations",
    href: "/affirmations",
    icon: Sparkles, // or Quote
  },
];

export const siteConfig = {
  name: "SereneScape",
  description: "Find your calm. Your personal guide to mindfulness and relaxation.",
  url: "https://serenescape.app", // Replace with actual URL
  logo: SunMoon, // Or a custom SVG logo component
};
