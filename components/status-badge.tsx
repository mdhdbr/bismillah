"use client";

import { cn } from "@/lib/utils";
import type { TripStatus, VehicleStatus, DriverStatus, FatigueLevel } from "@/lib/types";

type Status = TripStatus | VehicleStatus | DriverStatus | FatigueLevel;

const statusConfig: Record<Status, { color: string; label: string }> = {
  // Vehicle Status
  AVAILABLE: { color: "bg-green-100 text-green-800", label: "Available" },
  ASSIGNED: { color: "bg-blue-100 text-blue-800", label: "Assigned" },
  ON_TRIP: { color: "bg-primary/10 text-primary", label: "On Trip" },
  MAINTENANCE: { color: "bg-yellow-100 text-yellow-800", label: "Maintenance" },
  OUT_OF_SERVICE: { color: "bg-red-100 text-red-800", label: "Out of Service" },

  // Trip Status
  PENDING: { color: "bg-gray-100 text-gray-800", label: "Pending" },
  ACCEPTED: { color: "bg-blue-100 text-blue-800", label: "Accepted" },
  TO_PICKUP: { color: "bg-indigo-100 text-indigo-800", label: "To Pickup" },
  AT_PICKUP: { color: "bg-amber-100 text-amber-800", label: "At Pickup" },
  POB: { color: "bg-purple-100 text-purple-800", label: "POB" },
  ON_ROUTE: { color: "bg-sky-100 text-sky-800", label: "On Route" },
  AT_DROPOFF: { color: "bg-amber-100 text-amber-800", label: "At Dropoff" },
  UNLOADING: { color: "bg-orange-100 text-orange-800", label: "Unloading" },
  COMPLETED: { color: "bg-green-100 text-green-800", label: "Completed" },
  CANCELLED: { color: "bg-red-100 text-red-800", label: "Cancelled" },
  LOADING: { color: "bg-yellow-100 text-yellow-800", label: "Loading" },
  AT_WORK: { color: "bg-blue-100 text-blue-800", label: "At Work" },
  EMPTY: { color: "bg-gray-100 text-gray-800", label: "Empty" },
  ARRIVED: { color: "bg-teal-100 text-teal-800", label: "Arrived" },
  BOARDED: { color: "bg-purple-100 text-purple-800", label: "Boarded" },


  // Driver Status
  ON_DUTY: { color: "bg-green-100 text-green-800", label: "On Duty" },
  OFF_DUTY: { color: "bg-gray-100 text-gray-800", label: "Off Duty" },
  ON_BREAK: { color: "bg-yellow-100 text-yellow-800", label: "On Break" },
  FORCED_REST: { color: "bg-red-100 text-red-800", label: "Forced Rest" },

  // Fatigue Levels
  LOW: { color: "bg-green-100 text-green-800", label: "Low" },
  MEDIUM: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
  HIGH: { color: "bg-orange-100 text-orange-800", label: "High" },
  CRITICAL: { color: "bg-red-100 text-red-800", label: "Critical" },
};

type StatusBadgeProps = {
  status: Status;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
};

export function StatusBadge({ status, size = "md", className, dot = true }: StatusBadgeProps) {
  const config = statusConfig[status] || { color: "bg-gray-100 text-gray-800", label: status };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
  };

  const dotColorMap: Record<string, string> = {
    "bg-green-100 text-green-800": "bg-green-500",
    "bg-blue-100 text-blue-800": "bg-blue-500",
    "bg-primary/10 text-primary": "bg-primary",
    "bg-yellow-100 text-yellow-800": "bg-yellow-500",
    "bg-red-100 text-red-800": "bg-red-500",
    "bg-gray-100 text-gray-800": "bg-gray-500",
    "bg-indigo-100 text-indigo-800": "bg-indigo-500",
    "bg-purple-100 text-purple-800": "bg-purple-500",
    "bg-sky-100 text-sky-800": "bg-sky-500",
    "bg-amber-100 text-amber-800": "bg-amber-500",
    "bg-orange-100 text-orange-800": "bg-orange-500",
    "bg-teal-100 text-teal-800": "bg-teal-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        config.color,
        sizes[size],
        className
      )}
    >
      {dot && <span className={cn("w-2 h-2 rounded-full mr-1.5", dotColorMap[config.color] || 'bg-gray-500')} />}
      {config.label}
    </span>
  );
}
