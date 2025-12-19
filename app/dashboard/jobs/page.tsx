
"use client";

import { useState, useMemo } from "react";
import { conversations } from "@/lib/data";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare } from "lucide-react";
import { CreateJobDialog } from "@/components/create-job-dialog";
import { JobsDataTableToolbar } from "./toolbar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { BroadcastMessageDialog } from "@/components/broadcast-message-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Trip, Message, Conversation } from "@/lib/types";
import { JobNotesDialog } from "@/components/job-notes-dialog";
import { useTripsStore } from "@/store/trips-store";
import { useDriversStore } from "@/store/drivers-store";
import { useVehiclesStore } from "@/store/vehicles-store";

export default function JobsPage() {
  const { toast } = useToast();
  const { trips, addTrip, updateTrip } = useTripsStore();
  const { drivers, updateDriver } = useDriversStore();
  const { vehicles, updateVehicle } = useVehiclesStore();

  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isBroadcastDialogOpen, setIsBroadcastDialogOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const activeJobs = useMemo(() => {
    return trips.filter(trip => trip.status !== 'COMPLETED' && trip.status !== 'CANCELLED');
  }, [trips]);


  const handleJobCreated = (newJob: Trip) => {
    addTrip(newJob);

    // When a new job is created, update the status of the assigned driver and vehicle
    if (newJob.driverId) {
      const driverToUpdate = drivers.find(d => d.id === newJob.driverId);
      if (driverToUpdate) {
        updateDriver({ ...driverToUpdate, currentStatus: "ASSIGNED" });
      }
    }
    if (newJob.vehicleId) {
       const vehicleToUpdate = vehicles.find(v => v.id === newJob.vehicleId);
      if (vehicleToUpdate) {
        updateVehicle({ ...vehicleToUpdate, status: "ASSIGNED" });
      }
    }

    toast({
      title: "Job Created Successfully",
      description: `Job ID ${newJob.jobId} has been added and assigned.`,
    });
  };
  
  const handleBroadcastSubmit = ({ subject, message }: { subject: string; message: string }) => {
    const selectedIndices = Object.keys(rowSelection).map(Number);
    const selectedJobs = selectedIndices.map(index => trips[index]);

    let driversMessagedCount = 0;
    const broadcastContent = `Regarding Job(s): ${subject}\n\n${message}`;

    selectedJobs.forEach(job => {
      if (job.driver) {
        driversMessagedCount++;
        let conversation = conversations.find(c => c.contactName === job.driver!.user.name);
        
        const newMessage: Message = {
          id: `msg-${Date.now()}-${job.driver!.id}`,
          sender: 'me',
          content: broadcastContent,
          timestamp: new Date().toISOString(),
        };

        if (conversation) {
          conversation.messages.push(newMessage);
          conversation.lastMessage = broadcastContent;
          conversation.lastMessageTime = newMessage.timestamp;
          conversation.isUnread = false;
        } else {
          const newConversation: Conversation = {
            id: `conv-${Date.now()}-${job.driver!.id}`,
            contactName: job.driver!.user.name,
            contactType: 'Driver',
            lastMessage: broadcastContent,
            lastMessageTime: newMessage.timestamp,
            messages: [newMessage],
            isUnread: false,
          };
          conversations.unshift(newConversation);
        }
      }
    });


    toast({
      title: "Broadcast Sent!",
      description: `Your message has been sent to ${driversMessagedCount} driver(s).`,
    });
    setIsBroadcastDialogOpen(false);
    setRowSelection({});
  };

  const handleOpenNotes = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsNotesDialogOpen(true);
  };
  
  const handleNotesSubmit = (updatedTripData: Trip) => {
    const originalTrip = trips.find(t => t.id === updatedTripData.id);
    
    // First, update the trip itself
    updateTrip(updatedTripData);

    // If status changed, update driver/vehicle accordingly
    if (originalTrip?.status !== updatedTripData.status) {
        const isJobFinished = updatedTripData.status === 'COMPLETED' || updatedTripData.status === 'CANCELLED';
        
        if (isJobFinished) {
            // Free up driver and vehicle, making them available
            if (originalTrip?.driverId) {
                const driverToUpdate = drivers.find(d => d.id === originalTrip.driverId);
                if(driverToUpdate) updateDriver({ ...driverToUpdate, currentStatus: "AVAILABLE" });
            }
            if (originalTrip?.vehicleId) {
                const vehicleToUpdate = vehicles.find(v => v.id === originalTrip.vehicleId);
                if(vehicleToUpdate) updateVehicle({ ...vehicleToUpdate, status: "AVAILABLE" });
            }
            toast({
                title: "Job Finished",
                description: `Job ${updatedTripData.jobId} moved to invoicing. Driver and vehicle are now available.`
            });
        } else {
            // Mark driver and vehicle as on-trip for any other active status
            if (originalTrip?.driverId) {
                const driverToUpdate = drivers.find(d => d.id === originalTrip.driverId);
                if(driverToUpdate) updateDriver({ ...driverToUpdate, currentStatus: "ON_TRIP" });
            }
            if (originalTrip?.vehicleId) {
                const vehicleToUpdate = vehicles.find(v => v.id === originalTrip.vehicleId);
                if(vehicleToUpdate) updateVehicle({ ...vehicleToUpdate, status: "ON_TRIP" });
            }
            toast({
                title: "Job Updated",
                description: `Job ${updatedTripData.jobId} status has been updated.`
            });
        }
    }


    
    setIsNotesDialogOpen(false);
    setSelectedTrip(null);
  };

  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <div>
      <PageHeader 
        title="Active Jobs" 
        description="Manage all current transportation jobs and assignments."
        action={
          <Button onClick={() => setIsCreateJobOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        }
      />
      <ContextMenu>
        <ContextMenuTrigger>
          <DataTable 
            columns={columns({ onOpenNotes: handleOpenNotes })} 
            data={activeJobs} 
            toolbar={JobsDataTableToolbar}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem 
            onSelect={() => setIsBroadcastDialogOpen(true)}
            disabled={selectedRowCount === 0}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Broadcast Message ({selectedRowCount} selected)
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <CreateJobDialog 
        isOpen={isCreateJobOpen} 
        onOpenChange={setIsCreateJobOpen} 
        onJobCreated={handleJobCreated} 
      />
      <BroadcastMessageDialog
        isOpen={isBroadcastDialogOpen}
        onOpenChange={setIsBroadcastDialogOpen}
        selectedVehiclesCount={selectedRowCount}
        onSubmit={handleBroadcastSubmit}
      />
      <JobNotesDialog
        isOpen={isNotesDialogOpen}
        onOpenChange={setIsNotesDialogOpen}
        trip={selectedTrip}
        onSubmit={handleNotesSubmit}
      />
    </div>
  );
}
