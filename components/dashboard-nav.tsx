
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
  TruckIcon,
  MessageSquare,
  Binary,
  Locate,
  Package,
  Settings,
  LifeBuoy,
  Fingerprint,
  FileText,
  DollarSign,
  ShieldAlert,
  Fuel,
  Database,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
    {
        title: 'Main',
        items: [
            { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ]
    },
    {
        title: 'Operations',
        items: [
            { href: "/fleet/tracking", label: "Fleet Tracking", icon: Locate },
            { href: "/dashboard/live-map", label: "Live Map", icon: Map },
            { href: "/dashboard/dispatch", label: "Dispatch", icon: BotMessageSquare },
            { href: "/dashboard/jobs", label: "Jobs", icon: List },
            { href: "/dashboard/sms", label: "SMS", icon: MessageSquare },
        ]
    },
    {
        title: 'Management',
        items: [
            { href: "/dashboard/fleet", label: "Fleet", icon: Truck },
            { href: "/dashboard/drivers", label: "Drivers", icon: Users },
            { href: "/dashboard/compliance", label: "Data", icon: Database },
            { href: "/dashboard/products", label: "Products", icon: Package },
            { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
            { href: "/dashboard/incident-report", label: "Incident Report", icon: FileWarning },
            { href: "/dashboard/invoice", label: "Invoice", icon: FileText },
            { href: "/dashboard/price", label: "Pricing", icon: DollarSign },
        ]
    },
    {
        title: 'Simulations',
        items: [
            { href: "/dashboard/driver-app", label: "Driver App", icon: UserCheck },
            { href: "/dashboard/heavy-driver-app", label: "Heavy Driver App", icon: TruckIcon },
            { href: "/dashboard/passenger-app", label: "Passenger App", icon: Car },
            { href: "/dashboard/shipper-portal", label: "Shipper Portal", icon: Ship },
        ]
    },
    {
        title: 'System',
        items: [
             { href: "/dashboard/weather", label: "Weather Update", icon: Wind },
             { href: "/dashboard/architecture", label: "Architecture", icon: Binary },
             { href: "/dashboard/settings", label: "Settings", icon: Settings },
             { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
        ]
    }
]

interface DashboardNavProps {
  onLinkClick?: () => void;
}

export function DashboardNav({ onLinkClick }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium">
      {navGroups.map((group, groupIndex) => (
        <div key={group.title}>
          {groupIndex > 0 && <Separator className="my-2" />}
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.title}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === item.href && "bg-accent text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
