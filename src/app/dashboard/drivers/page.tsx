
"use client";

import { useState } from "react";
import { drivers } from "@/lib/data";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateDriverDialog } from "@/components/create-driver-dialog";

export default function DriversPage() {
  const [isCreateDriverOpen, setIsCreateDriverOpen] = useState(false);

  return (
    <div>
       <PageHeader 
        title="Driver Management" 
        description="View and manage all drivers in your organization."
        action={
          <Button onClick={() => setIsCreateDriverOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        }
      />
      <DataTable columns={columns} data={drivers} />
      <CreateDriverDialog
        isOpen={isCreateDriverOpen}
        onOpenChange={setIsCreateDriverOpen}
        onDriverCreated={(newDriver) => {
          // In a real app, you'd want to refetch the data or add to the state
          console.log("New Driver Created:", newDriver);
          drivers.unshift(newDriver); // For demonstration purposes
        }}
      />
    </div>
  );
}
