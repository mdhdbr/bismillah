
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Driver } from "@/lib/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { MoreVertical, Edit, Trash2, Copy, Wifi, CheckCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, parseISO } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const isDateExpired = (dateString?: string) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

const formatDate = (dateString?: string) => {
    if (!dateString) return <span className="text-muted-foreground">N/A</span>;
    try {
        const date = parseISO(dateString);
        const isExpired = date < new Date();
        return (
            <span className={isExpired ? "text-destructive font-semibold" : ""}>
                {format(date, 'dd MMM yyyy')}
            </span>
        );
    } catch(e) {
        // Handle cases where dateString might be in DD/MM/YYYY from form submission
        // This is a fallback, data should ideally be consistently ISO
        try {
            const [day, month, year] = dateString.split('/');
            const date = new Date(`${year}-${month}-${day}`);
            const isExpired = date < new Date();
            return (
                 <span className={isExpired ? "text-destructive font-semibold" : ""}>
                    {format(date, 'dd MMM yyyy')}
                </span>
            )
        } catch(err) {
             return <span className="text-muted-foreground">Invalid Date</span>;
        }
    }
};

interface ColumnsProps {
  onEdit: (driver: Driver) => void;
  onDelete: (driverId: string) => void;
  onCopy: (driver: Driver) => void;
  onPing: (driverId: string) => void;
  driverStatus: Record<string, 'online' | 'offline' | 'pinging' | 'idle' | 'ACK' | 'REJECT'>;
}

export const columns = ({ onEdit, onDelete, onCopy, onPing, driverStatus }: ColumnsProps): ColumnDef<Driver>[] => [
  {
    id: "driverName",
    accessorFn: row => row.user.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver Name" />
    ),
    cell: ({ row }) => {
      const status = driverStatus[row.original.id] || 'offline';
      
      const getStatusIndicator = () => {
          switch (status) {
              case 'online':
                  return <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />;
              case 'ACK':
                   return <CheckCircle className="h-4 w-4 text-green-500" />;
              case 'idle':
                  return <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />;
              case 'pinging':
                  return <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />;
              case 'REJECT':
                  return <Ban className="h-4 w-4 text-destructive" />;
              case 'offline':
              default:
                  return <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />;
          }
      };
      
      const getStatusTooltip = () => {
        switch (status) {
            case 'online': return 'Online';
            case 'ACK': return 'Ping Acknowledged';
            case 'REJECT': return 'Ping Rejected';
            case 'idle': return 'Idle';
            case 'pinging': return 'Pinging...';
            case 'offline': default: return 'Offline';
        }
      }

      return (
        <div className="flex items-center gap-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center justify-center h-4 w-4">
                           {getStatusIndicator()}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{getStatusTooltip()}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <span>{row.original.user.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "licenseNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License No." />
    ),
  },
  {
    accessorKey: "licenseExpiry",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License Expiry" />
    ),
    cell: ({ row }) => formatDate(row.original.licenseExpiry),
  },
  {
    id: "vehiclePlate",
    accessorFn: row => row.vehicle?.plateNumber,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Plate" />
    ),
    cell: ({ row }) => row.original.vehicle?.plateNumber || <Badge variant="secondary">Unassigned</Badge>,
  },
  {
    id: "registrationExpiry",
    accessorFn: row => row.vehicle?.registrationExpiry,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reg. Expiry" />
    ),
    cell: ({ row }) => formatDate(row.original.vehicle?.registrationExpiry),
  },
  {
    id: "insuranceExpiry",
    accessorFn: row => row.vehicle?.insuranceExpiry,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ins. Expiry" />
    ),
    cell: ({ row }) => formatDate(row.original.vehicle?.insuranceExpiry),
  },
  {
    id: "nextMaintenance",
    accessorFn: row => row.vehicle?.nextMaintenance,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Service" />
    ),
    cell: ({ row }) => formatDate(row.original.vehicle?.nextMaintenance),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onPing(row.original.id)}>
             <Wifi className="mr-2 h-4 w-4" /> Ping Driver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(row.original)}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(row.original.id)} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
