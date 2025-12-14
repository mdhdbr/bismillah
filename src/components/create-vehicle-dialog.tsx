
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { drivers } from "@/lib/data";
import { Vehicle, VehicleType, VehicleStatus, VehicleCategory } from "@/lib/types";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const vehicleTypes: VehicleType[] = [
  "SEDAN", "PREMIUM_SEDAN", "LUXURY_CAR", "SUV", "MPV", "MINI_BUS", "LIGHT_BUS", "HEAVY_BUS",
  "TRUCK_3T", "TRUCK_5T", "TRUCK_7T", "TRUCK_10T", "TRUCK_15T",
  "TRAILER", "FLATBED", "CONTAINER_40FT", "CONTAINER_60FT",
  "CRANE_TRAILER", "FORKLIFT", "MOBILE_CRANE", "STATIONARY_EQUIPMENT",
  "BACKHOE_LOADER", "BOBCAT", "DUMP_TRUCK", "WATER_TRUCK", "OTHER"
];

const vehicleStatuses: VehicleStatus[] = ["AVAILABLE", "ASSIGNED", "ON_TRIP", "MAINTENANCE", "OUT_OF_SERVICE"];
const passengerTypes: VehicleType[] = ["SEDAN", "PREMIUM_SEDAN", "LUXURY_CAR", "SUV", "MPV", "MINI_BUS", "LIGHT_BUS", "HEAVY_BUS"];

const getCategory = (type: VehicleType): VehicleCategory => {
  return passengerTypes.includes(type) ? 'PASSENGER' : 'FREIGHT';
}

const formSchema = z.object({
  plateNumber: z.string().min(1, "Plate number is required."),
  type: z.enum(vehicleTypes, { required_error: "Vehicle type is required" }),
  status: z.enum(vehicleStatuses),
  driverId: z.string().optional(),
});

type CreateVehicleFormValues = z.infer<typeof formSchema>;

interface CreateVehicleDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onVehicleCreated: (newVehicle: Vehicle) => void;
}

export function CreateVehicleDialog({ isOpen, onOpenChange, onVehicleCreated }: CreateVehicleDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "AVAILABLE",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        plateNumber: "",
        status: "AVAILABLE",
        type: undefined,
        driverId: undefined,
      });
    }
  }, [isOpen, form]);

  const onSubmit = (values: CreateVehicleFormValues) => {
    setIsSubmitting(true);

    const selectedDriver = drivers.find(d => d.id === values.driverId);

    const newVehicle: Vehicle = {
      id: `vehicle-${Date.now()}`,
      plateNumber: values.plateNumber,
      vin: `VIN-${Date.now().toString().slice(-8)}`,
      type: values.type,
      category: getCategory(values.type),
      capacity: 0, // Default capacity
      currentFuel: 100,
      status: values.status,
      currentLocation: { lat: 24.7136, lng: 46.6753 }, // Default to Riyadh
      driverId: values.driverId,
      driver: selectedDriver,
      nextMaintenance: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    };

    setTimeout(() => {
      onVehicleCreated(newVehicle);
      toast({
        title: "Vehicle Created Successfully",
        description: `Vehicle ${newVehicle.plateNumber} has been added to the fleet.`,
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>Fill in the details to add a new vehicle to the fleet.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1234 ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a vehicle type" /></SelectTrigger></FormControl>
                    <SelectContent>{vehicleTypes.map(type => (<SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>))}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                    <SelectContent>{vehicleStatuses.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Assign a driver (optional)" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="none">Unassigned</SelectItem>
                      {drivers.map(d => (<SelectItem key={d.id} value={d.id}>{d.user.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormItem>
                  <FormLabel>Fuel Level</FormLabel>
                  <FormControl>
                    <Input placeholder="Synced from IoT" disabled />
                  </FormControl>
                </FormItem>
                 <FormItem>
                  <FormLabel>Next Service</FormLabel>
                  <FormControl>
                    <Input placeholder="Synced from Company Records" disabled />
                  </FormControl>
                </FormItem>
            </div>


            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Vehicle"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
