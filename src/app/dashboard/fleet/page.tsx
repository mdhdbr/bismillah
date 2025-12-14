
"use client";

import { useState } from "react";
import { vehicles } from "@/lib/data";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateVehicleDialog } from "@/components/create-vehicle-dialog";

export default function FleetPage() {
  const [isCreateVehicleOpen, setIsCreateVehicleOpen] = useState(false);

  return (
    <div>
      <PageHeader 
        title="Fleet Management" 
        description="Oversee and manage all vehicles in the fleet."
        action={
          <Button onClick={() => setIsCreateVehicleOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        }
      />
      <DataTable columns={columns} data={vehicles} />
      <CreateVehicleDialog
        isOpen={isCreateVehicleOpen}
        onOpenChange={setIsCreateVehicleOpen}
        onVehicleCreated={(newVehicle) => {
          // In a real app, you'd want to refetch the data or add to the state
          console.log("New Vehicle Created:", newVehicle);
          vehicles.unshift(newVehicle); // For demonstration purposes
        }}
      />
    </div>
  );
}
