
"use client";

import { useState, useEffect } from "react";
import { conversations } from "@/lib/data";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateDriverDialog } from "@/components/create-driver-dialog";
import type { Driver, Conversation, Message } from "@/lib/types";
import { DriverDataTableToolbar } from "./toolbar";
import { useToast } from "@/hooks/use-toast";
import { useDriversStore } from "@/store/drivers-store";

export default function DriversPage() {
  const { toast } = useToast();
  const { drivers, addDriver, updateDriver, removeDriver } = useDriversStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBroadcastDialogOpen, setIsBroadcastDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
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
        description: "Please add new drivers through the 'Data' page or enable Admin Mode.",
        variant: "destructive"
        });
        return;
    }
    setSelectedDriver(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (driver: Driver) => {
     if (!isAdminMode) {
        toast({
        title: "Action Disabled",
        description: "Please edit driver details through the 'Data' page or enable Admin Mode.",
        variant: "destructive"
        });
        return;
    }
    setSelectedDriver(driver);
    setIsDialogOpen(true);
  };

  const handleDelete = (driverId: string) => {
    if (!isAdminMode) {
        toast({
            title: "Action Disabled",
            description: "Please delete from the 'Data' page or enable Admin Mode.",
            variant: "destructive"
        });
        return;
    }
    if (!window.confirm("Are you sure you want to delete this driver? This action cannot be undone.")) {
      return;
    }
    removeDriver(driverId);
    toast({ title: "Driver Deleted" });
  };

  const handleDialogSubmit = (driverData: Driver) => {
    const isEditing = drivers.some(d => d.id === driverData.id);
    if (isEditing) {
        updateDriver(driverData);
    } else {
        addDriver(driverData);
    }
    setSelectedDriver(null);
  };
  
  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <div>
       <PageHeader 
        title="Driver Management" 
        description={isAdminMode ? "Admin Mode: Full access enabled." : "View and manage all drivers. To add or edit, use the Data page."}
        action={
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        }
      />
      <DataTable 
        columns={columns({ onEdit: handleEdit, onDelete: handleDelete })} 
        data={drivers} 
        toolbar={DriverDataTableToolbar}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

       <CreateDriverDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onDriverSubmit={handleDialogSubmit}
        driver={selectedDriver}
       />
    </div>
  );
}
