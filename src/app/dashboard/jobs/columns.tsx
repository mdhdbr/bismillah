
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Trip, TripType } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { Truck, Car, Construction } from "lucide-react";

const tripTypeConfig: Record<TripType, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    PASSENGER: { label: 'Passenger', icon: Car },
    SHIPMENT: { label: 'Shipment', icon: Truck },
    EQUIPMENT: { label: 'Equipment', icon: Construction },
};


export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "jobId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job ID" />
    ),
    cell: ({ row }) => <div className="font-medium text-primary">{row.getValue("jobId")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
        const type = row.original.type;
        const config = tripTypeConfig[type] || { label: type, icon: Truck };
        return (
            <div className="flex items-center gap-2">
                <config.icon className="h-4 w-4 text-muted-foreground" />
                <span>{config.label}</span>
            </div>
        )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: "vehicle",
    accessorFn: row => row.vehicle?.plateNumber,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => row.original.vehicle?.plateNumber || "N/A",
  },
  {
    id: "driver",
    accessorFn: row => row.driver?.user.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => row.original.driver?.user.name || "N/A",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "scheduledAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scheduled" />
    ),
    cell: ({ row }) => {
      const date = parseISO(row.getValue("scheduledAt"));
      // Format the date in UTC to ensure consistency between server and client
      return formatInTimeZone(date, 'UTC', "dd MMM, hh:mm a 'UTC'");
    },
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    cell: ({ row }) => {
        const distance = row.getValue("distance") as number | undefined;
        return distance ? `${distance.toFixed(1)} km` : "N/A"
    },
  },
  {
    accessorKey: "fare",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fare" />
    ),
    cell: ({ row }) => {
        const fare = row.getValue("fare") as number | undefined;
        return fare ? `${fare.toFixed(2)} SAR` : "N/A"
    },
  },
];
