
"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/data-table-faceted-filter";
import { VehicleStatus, VehicleType } from "@/lib/types";
import { vehicles } from "@/lib/data";

interface FleetDataTableToolbarProps<TData> {
  table: Table<TData>;
}

const statuses: { value: VehicleStatus; label: string }[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "ON_TRIP", label: "On Trip" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "OUT_OF_SERVICE", label: "Out of Service" },
];

const vehicleTypes = [...new Set(vehicles.map(v => v.type))].map(type => ({
    value: type,
    label: type.replace(/_/g, ' ')
}));


export function FleetDataTableToolbar<TData>({
  table,
}: FleetDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by plate number..."
          value={(table.getColumn("plateNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("plateNumber")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("type") && (
            <DataTableFacetedFilter
                column={table.getColumn("type")}
                title="Type"
                options={vehicleTypes}
            />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
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
