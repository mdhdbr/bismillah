
"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Car, Construction, Truck } from "lucide-react";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/data-table-faceted-filter";
import { TripStatus, TripType } from "@/lib/types";

interface JobsDataTableToolbarProps<TData> {
  table: Table<TData>;
}

const statuses: { value: TripStatus; label: string }[] = [
    { value: "PENDING", label: "Pending" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "TO_PICKUP", label: "To Pickup" },
    { value: "AT_PICKUP", label: "At Pickup" },
    { value: "POB", label: "POB" },
    { value: "ON_ROUTE", label: "On Route" },
    { value: "AT_DROPOFF", label: "At Dropoff" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "LOADING", label: "Loading" },
    { value: "UNLOADING", label: "Unloading" },
];

const tripTypes: { value: TripType; label: string, icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "PASSENGER", label: "Passenger", icon: Car },
    { value: "SHIPMENT", label: "Shipment", icon: Truck },
    { value: "EQUIPMENT", label: "Equipment", icon: Construction },
];


export function JobsDataTableToolbar<TData>({
  table,
}: JobsDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by Job ID..."
          value={(table.getColumn("jobId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("jobId")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={tripTypes}
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
