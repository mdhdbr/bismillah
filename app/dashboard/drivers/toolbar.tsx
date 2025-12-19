
"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/data-table-faceted-filter";
import { DriverStatus, FatigueLevel } from "@/lib/types";

interface DriverDataTableToolbarProps<TData> {
  table: Table<TData>;
}

const statuses: { value: DriverStatus; label: string }[] = [
  { value: "ON_DUTY", label: "On Duty" },
  { value: "OFF_DUTY", label: "Off Duty" },
  { value: "ON_BREAK", label: "On Break" },
  { value: "FORCED_REST", label: "Forced Rest" },
  { value: "AVAILABLE", label: "Available" },
  { value: "ON_TRIP", label: "On Trip" },
];

const fatigueLevels: { value: FatigueLevel; label: string }[] = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
    { value: "CRITICAL", label: "Critical" },
];


export function DriverDataTableToolbar<TData>({
  table,
}: DriverDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by driver name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("currentStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("currentStatus")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("fatigueLevel") && (
            <DataTableFacetedFilter
                column={table.getColumn("fatigueLevel")}
                title="Fatigue"
                options={fatigueLevels}
            />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
