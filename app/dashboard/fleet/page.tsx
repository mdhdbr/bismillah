
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateVehicleDialog } from "@/components/create-vehicle-dialog";
import type { Vehicle } from "@/lib/types";
import { FleetDataTableToolbar } from "./toolbar";
import { useToast } from "@/hooks/use-toast";
import { useVehiclesStore } from "@/store/vehicles-store";

export default function FleetPage() {
  const { toast } = useToast();
  const { vehicles, addVehicle, updateVehicle, removeVehicle } = useVehiclesStore();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [isAdminMode, setIsAdminMode] = useState(false);

   useEffect(() => {
    const checkAdminMode = () => {
      setIsAdminMode(localStorage.getItem('isAdminMode') === 'true');
    };
    checkAdminMode();
    window.addEventListener('storage', checkAdminMode);
    return () => window.removeEventListener('storage', checkAdminMode);
  }, []);

  const handleCreateNew = () => {
     if (!isAdminMode) {
        toast({
            title: "Action Disabled",
            description: "Please add new vehicles through the 'Data' page or enable Admin Mode.",
            variant: "destructive"
        });
        return;
    }
    setSelectedVehicle(null);
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
     if (!isAdminMode) {
        toast({
            title: "Action Disabled",
            description: "Please edit vehicle details through the 'Data' page or enable Admin Mode.",
            variant: "destructive"
        });
        return;
     }
    setSelectedVehicle(vehicle);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = (vehicleId: string) => {
     if (!isAdminMode) {
        toast({
            title: "Action Disabled",
            description: "Please delete records from the 'Data' page or enable Admin Mode.",
            variant: "destructive"
        });
        return;
     }
    if (!window.confirm("Are you sure you want to delete this vehicle?")) {
        return;
    }
    removeVehicle(vehicleId);
    toast({ title: "Vehicle Deleted" });
  };

  const handleDialogSubmit = (vehicleData: Vehicle) => {
    const isEditing = vehicles.some(v => v.id === vehicleData.id);
    if (isEditing) {
        updateVehicle(vehicleData);
    } else {
        addVehicle(vehicleData);
    }
    setSelectedVehicle(null);
  };

  return (
    <div>
      <PageHeader 
        title="Fleet Management" 
        description={isAdminMode ? "Admin Mode: Full access enabled." : "Oversee vehicles with active data records. To add or edit, use the Data page."}
        action={
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        }
      />
      <DataTable 
        columns={columns({ onEdit: handleEdit, onDelete: handleDelete })} 
        data={vehicles}
        toolbar={FleetDataTableToolbar}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <CreateVehicleDialog 
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onVehicleSubmit={handleDialogSubmit}
        vehicle={selectedVehicle}
      />
    </div>
  );
}
