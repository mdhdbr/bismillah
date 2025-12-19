
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Driver } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnsProps {
  onEdit: (driver: Driver) => void;
  onDelete: (driverId: string) => void;
}

export const columns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Driver>[] => [
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
    id: "name",
    accessorFn: row => row.user.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarFallback>{row.original.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <div className="font-medium">{row.original.user.name}</div>
                <div className="text-xs text-muted-foreground">{row.original.user.email}</div>
            </div>
        </div>
    ),
  },
  {
    accessorKey: "licenseNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License No." />
    ),
  },
  {
    accessorKey: "currentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("currentStatus")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "fatigueLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fatigue" />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("fatigueLevel")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "totalDutyHours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duty Hours" />
    ),
    cell: ({ row }) => `${row.getValue("totalDutyHours")} hrs`,
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
