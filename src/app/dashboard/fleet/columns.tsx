
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Progress } from "@/components/ui/progress";

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plate Number" />
    ),
    cell: ({ row }) => <div className="font-medium text-primary">{row.getValue("plateNumber")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "driver",
    accessorFn: row => row.driver?.user.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => row.original.driver?.user.name || <span className="text-muted-foreground">Unassigned</span>,
  },
  {
    accessorKey: "currentFuel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fuel Level" />
    ),
    cell: ({ row }) => {
        const fuel = row.getValue("currentFuel") as number;
        return (
            <div className="flex items-center gap-2">
                <Progress value={fuel} className="w-24 h-2" />
                <span>{fuel}%</span>
            </div>
        )
    },
  },
  {
    accessorKey: "nextMaintenance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Service" />
    ),
    cell: ({ row }) => {
        const date = row.getValue("nextMaintenance") as string | undefined;
        return date ? new Date(date).toLocaleDateString() : "N/A"
    },
  },
  {
    id: "awaitingJobs",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Awaiting Jobs" />
    ),
    cell: ({ row }) => {
        // Placeholder logic
        const awaiting = Math.floor(Math.random() * 5);
        return <div className="text-center">{awaiting > 0 ? awaiting : "-"}</div>
    },
  }
];
