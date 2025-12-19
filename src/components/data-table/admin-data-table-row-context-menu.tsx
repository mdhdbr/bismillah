
"use client";

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Edit, Trash2, Wifi } from "lucide-react";
import type { Driver, Vehicle } from "@/lib/types";

interface AdminDataTableRowContextMenuProps<TData extends { id: string }> {
  item: TData;
  onEdit?: (item: TData) => void;
  onDelete?: (id: string) => void;
  onPing?: (id: string) => void;
}

export function AdminDataTableRowContextMenu<TData extends { id: string }>({
  item,
  onEdit,
  onDelete,
  onPing,
}: AdminDataTableRowContextMenuProps<TData>) {

  const isDriver = (item: any): item is Driver => {
    return 'licenseNumber' in item;
  }

  return (
    <ContextMenuContent className="w-48">
      {onEdit && (
        <ContextMenuItem onSelect={() => onEdit(item)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </ContextMenuItem>
      )}
      {isDriver(item) && onPing && (
        <ContextMenuItem onSelect={() => onPing(item.id)}>
          <Wifi className="mr-2 h-4 w-4" />
          Ping Driver
        </ContextMenuItem>
      )}
      {onDelete && (
        <>
          <ContextMenuSeparator />
          <ContextMenuItem
            onSelect={() => onDelete(item.id)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </>
      )}
    </ContextMenuContent>
  );
}
