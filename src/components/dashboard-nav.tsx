
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  BotMessageSquare,
  List,
  Truck,
  Users,
  BarChart3,
  LucideIcon,
  UserCheck,
  FileWarning,
  Car,
  Ship,
  Wind,
  TruckIcon
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/live-map", label: "Live Map", icon: Map },
  { href: "/dashboard/dispatch", label: "Dispatch", icon: BotMessageSquare },
  { href: "/dashboard/jobs", label: "Jobs", icon: List },
  { href: "/dashboard/fleet", label: "Fleet", icon: Truck },
  { href: "/dashboard/drivers", label: "Drivers", icon: Users },
  { href: "/dashboard/driver-app", label: "Driver App", icon: UserCheck },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/incident-report", label: "Incident Report", icon: FileWarning },
  { href: "/dashboard/passenger-app", label: "Passenger App", icon: Car },
  { href: "/dashboard/shipper-portal", label: "Shipper Portal", icon: Ship },
  { href: "/dashboard/heavy-driver-app", label: "Heavy Driver App", icon: TruckIcon },
  { href: "/dashboard/weather", label: "Weather Update", icon: Wind },
];

interface DashboardNavProps {
  onLinkClick?: () => void;
}

export function DashboardNav({ onLinkClick }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-1 px-2 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname.startsWith(item.href) && (item.href === "/dashboard" ? pathname === item.href : true) && "bg-accent text-primary"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
