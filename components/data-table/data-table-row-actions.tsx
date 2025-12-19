
"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DataTableRowActions<TData>({
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // This effect runs only on the client-side
    const checkAdminMode = () => {
      const adminStatus = localStorage.getItem('isAdminMode') === 'true';
      setIsAdminMode(adminStatus);
    };

    checkAdminMode();

    // Listen for changes to storage (e.g., from the settings page)
    window.addEventListener('storage', checkAdminMode);
    return () => {
      window.removeEventListener('storage', checkAdminMode);
    };
  }, []);

  if (!isAdminMode) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
