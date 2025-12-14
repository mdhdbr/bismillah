
"use client";

import { useState } from "react";
import { trips } from "@/lib/data";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateJobDialog } from "@/components/create-job-dialog";

export default function JobsPage() {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  return (
    <div>
      <PageHeader 
        title="Jobs" 
        description="Manage all transportation jobs and assignments."
        action={
          <Button onClick={() => setIsCreateJobOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        }
      />
      <DataTable columns={columns} data={trips} />
      <CreateJobDialog 
        isOpen={isCreateJobOpen} 
        onOpenChange={setIsCreateJobOpen} 
        onJobCreated={(newJob) => {
          // In a real app, you'd want to refetch the data or add to the state
          console.log("New Job Created:", newJob);
          trips.unshift(newJob); // For demonstration purposes
        }} 
      />
    </div>
  );
}
