
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Progress } from "@/components/ui/progress";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnsProps {
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicleId: string) => void;
}

export const columns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Vehicle>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original.id)}
      />
    ),
  },
];
