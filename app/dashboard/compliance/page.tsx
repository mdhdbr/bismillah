
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Driver } from "@/lib/types";
import { columns } from "./columns";
import { ComplianceDialog } from "./dialog";
import { socketService } from "@/lib/services/socketService";
import { useRouter } from "next/navigation";
import { useDriversStore } from "@/store/drivers-store";
import { useVehiclesStore } from "@/store/vehicles-store";

type DriverStatusState = Record<string, 'online' | 'offline' | 'pinging' | 'idle' | 'ACK' | 'REJECT'>;

export default function DataPage() {
  const { toast } = useToast();
  const router = useRouter();
  
  const { drivers, addDriver, updateDriver, removeDriver } = useDriversStore();
  const { addVehicle, updateVehicle, removeVehicle } = useVehiclesStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [driverStatus, setDriverStatus] = useState<DriverStatusState>({});

  useEffect(() => {
    // Initialize status and connect to Socket.IO
    const initialStatus: DriverStatusState = {};
    drivers.forEach(d => {
      initialStatus[d.id] = 'offline';
    });
    setDriverStatus(initialStatus);

    // Simulate dispatcher login and get a token
    const dispatcherId = "dispatcher-admin-01";
    const dispatcherRole = "DISPATCHER";
    socketService.connect(dispatcherId, dispatcherRole);

    const handlePong = (data: { from: string, lat?: number, lng?: number }) => {
      const driver = drivers.find(d => d.id === data.from);
      if (driver) {
        setDriverStatus(prev => ({...prev, [data.from]: 'online'}));
        
        let toastDescription = `${driver.user.name} responded to ping.`;
        let toastAction;

        if (data.lat && data.lng) {
          toastDescription = `Location for ${driver.user.name} received.`;
          toastAction = (
            <Button variant="outline" size="sm" onClick={() => router.push(`/fleet/tracking?lat=${data.lat}&lng=${data.lng}`)}>
              Show on Map
            </Button>
          )
        }

        toast({ 
          title: "Driver Online", 
          description: toastDescription,
          action: toastAction,
        });
      }
    };
    
    const handleLocationUpdate = (data: { userId: string, lat: number, lng: number }) => {
        const driver = drivers.find(d => d.id === data.userId);
        if (driver) {
             setDriverStatus(prev => ({...prev, [data.userId]: 'online'}));
            toast({ 
                title: "Location Received", 
                description: `Updated location for ${driver.user.name} received.`,
                action: (
                    <Button variant="outline" size="sm" onClick={() => router.push(`/fleet/tracking?lat=${data.lat}&lng=${data.lng}`)}>
                        Show on Map
                    </Button>
                )
            });
        }
    };

    const handlePingResponse = (data: {userId: string, response: 'ACK' | 'REJECT', pingId: string}) => {
        setDriverStatus(prev => ({...prev, [data.userId]: data.response}));
    }

    socketService.on('pong', handlePong);
    socketService.on('location-update', handleLocationUpdate);
    socketService.on('ping-response', handlePingResponse);

    const handleConnect = () => {
        // Initial check for who is online
        socketService.emit('get-online-users', (onlineUsers: Record<string, { lastSeen: number, platform: string }>) => {
        setDriverStatus(prev => {
            const newStatus: DriverStatusState = {};
            // Set all to offline first
            Object.keys(prev).forEach(id => newStatus[id] = 'offline');

            // Update based on server response
            Object.keys(onlineUsers).forEach(userId => {
            if (newStatus[userId] !== undefined) {
                const diff = Date.now() - onlineUsers[userId].lastSeen;
                if (diff < 30000) {
                    newStatus[userId] = 'online';
                } else if (diff < 90000) {
                    newStatus[userId] = 'idle';
                } else {
                    newStatus[userId] = 'offline';
                }
            }
            });
            return newStatus;
        });
        });
    };

    const handleUserConnected = ({userId}: {userId: string}) => {
       if (driverStatus[userId] !== undefined) {
          setDriverStatus(prev => ({...prev, [userId]: 'online'}));
       }
    };

    const handleUserDisconnected = ({userId}: {userId: string}) => {
       if (driverStatus[userId] !== undefined) {
          setDriverStatus(prev => ({...prev, [userId]: 'offline'}));
       }
    };
    
    const handleStatusUpdate = (updates: Record<string, { lastSeen: number, platform: string }>) => {
        setDriverStatus(prev => {
            const newStatus = {...prev};
            Object.keys(updates).forEach(userId => {
                if (newStatus[userId] !== undefined) {
                    const diff = Date.now() - updates[userId].lastSeen;
                    if (diff < 30000) {
                        newStatus[userId] = 'online';
                    } else if (diff < 90000) {
                        newStatus[userId] = 'idle';
                    } else {
                        newStatus[userId] = 'offline';
                    }
                }
            });
            return newStatus;
        });
    };

    socketService.on('connect', handleConnect);
    socketService.on('user-connected', handleUserConnected);
    socketService.on('user-disconnected', handleUserDisconnected);
    socketService.on('status-update', handleStatusUpdate);

    // Cleanup on unmount
    return () => {
      socketService.off('pong', handlePong);
      socketService.off('location-update', handleLocationUpdate);
      socketService.off('ping-response', handlePingResponse);
      socketService.off('user-connected', handleUserConnected);
      socketService.off('user-disconnected', handleUserDisconnected);
      socketService.off('status-update', handleStatusUpdate);
      socketService.off('connect', handleConnect);
      socketService.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drivers, toast, router]);

  const handleCreateNew = () => {
    setSelectedDriver(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDialogOpen(true);
  };

  const handleDelete = (driverId: string) => {
    if (!window.confirm("Are you sure you want to delete this record? This also removes any assigned vehicle.")) {
      return;
    }
    const driverToRemove = drivers.find(d => d.id === driverId);
    if (driverToRemove?.vehicleId) {
        removeVehicle(driverToRemove.vehicleId);
    }
    removeDriver(driverId);
    toast({ title: "Record Deleted" });
  };

  const handleCopy = (driver: Driver) => {
    const newDriver: Driver = {
      ...driver,
      id: `driver-${Date.now()}`,
      userId: `user-${Date.now()}`,
      user: {
        ...driver.user,
        id: `user-${Date.now()}`,
        email: `copy_${driver.user.email}`
      },
      licenseNumber: `${driver.licenseNumber}-COPY`,
      vehicle: undefined,
      vehicleId: undefined,
    };
    setSelectedDriver(newDriver);
    setIsDialogOpen(true);
  };
  
  const handlePing = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) return;

    if (!socketService.isConnected()) {
      toast({ variant: "destructive", title: "Socket Disconnected", description: "Cannot ping driver. Check connection." });
      return;
    }

    setDriverStatus(prev => ({...prev, [driverId]: 'pinging'}));
    toast({ title: "Pinging Driver", description: `Sending ping to ${driver.user.name}...` });
    
    const pingId = `ping-${Date.now()}`;
    socketService.emit("ping-user", { targetUserId: driverId, from: socketService.getUserId(), pingId });
    
    setTimeout(() => {
        setDriverStatus(currentStatus => {
            if (currentStatus[driverId] === 'pinging') {
                 // Revert to a default status if no response, letting heartbeat correct it later.
                 return {...currentStatus, [driverId]: 'offline' };
            }
            return currentStatus;
        });
    }, 5000); // 5-second timeout for the "pinging" state.
  }

  const handleDialogSubmit = (driverData: Driver) => {
    const isEditing = drivers.some(d => d.id === driverData.id);

    if (isEditing) {
      updateDriver(driverData);
      if (driverData.vehicle) {
        updateVehicle(driverData.vehicle);
      }
      toast({ title: "Data Record Updated", description: `Record for ${driverData.user.name} has been updated.` });
    } else {
      addDriver(driverData);
      if (driverData.vehicle) {
        addVehicle(driverData.vehicle);
      }
      toast({ title: "Data Record Added", description: `New record for ${driverData.user.name} has been added.` });
    }
    setSelectedDriver(null);
  };

  return (
    <>
      <PageHeader
        title="Data Management"
        description="Master source for driver licenses, vehicle registrations, and service records."
        action={
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        }
      />
      <DataTable
        columns={columns({ onEdit: handleEdit, onDelete: handleDelete, onCopy: handleCopy, onPing: handlePing, driverStatus })}
        data={drivers}
      />
      <ComplianceDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleDialogSubmit}
        driver={selectedDriver}
      />
    </>
  );
}
